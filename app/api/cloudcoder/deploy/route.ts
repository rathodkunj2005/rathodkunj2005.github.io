import { NextResponse } from "next/server"
import { CloudFormationClient, CreateStackCommand, DescribeStackEventsCommand, StackEvent } from "@aws-sdk/client-cloudformation"
import { S3Client, PutObjectCommand, HeadBucketCommand, CreateBucketCommand } from "@aws-sdk/client-s3"
import JSZip from "jszip"

export const maxDuration = 300; // 5 minute max duration for Vercel

export async function POST(req: Request) {
  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const writeLog = async (msg: string, type: "log" | "event" | "complete" | "error" = "log", url?: string) => {
    const payload = JSON.stringify({ type, message: msg, url }) + "\n"
    await writer.write(encoder.encode(payload))
  }

  // Run deployment process asynchronously so we can stream back immediately
  ;(async () => {
    try {
      const accessKeyId = req.headers.get("X-AWS-Access-Key")
      const secretAccessKey = req.headers.get("X-AWS-Secret-Key")
      const region = req.headers.get("X-AWS-Region") || "us-east-1"
      
      if (!accessKeyId || !secretAccessKey) {
        throw new Error("Missing AWS Credentials")
      }

      await writeLog("Initializing AWS SDK clients...")

      const credentials = { accessKeyId, secretAccessKey }
      const s3 = new S3Client({ region, credentials })
      const cfn = new CloudFormationClient({ region, credentials })

      const { appName, spaCode, lambdaCode, samTemplate } = await req.json()
      const stackName = `cloudcoder-${appName}-${Date.now().toString().slice(-6)}`
      const bucketName = `cloudcoder-artifacts-${accessKeyId.toLowerCase()}-${region}`

      // 1. Ensure artifact bucket exists
      await writeLog(`Checking artifact bucket: ${bucketName}...`)
      try {
        await s3.send(new HeadBucketCommand({ Bucket: bucketName }))
      } catch (e: any) {
        if (e.name === "NotFound") {
          await writeLog("Creating new S3 artifact bucket...")
          await s3.send(new CreateBucketCommand({ Bucket: bucketName }))
        } else {
          throw e
        }
      }

      // 2. Zip Lambda Code
      await writeLog("Zipping Lambda function code locally...")
      const zip = new JSZip()
      zip.file("index.js", lambdaCode)
      zip.file("index.html", spaCode) // We bundle SPA into Lambda zip for simplicity, Lambda can serve it if needed
      const zipBuffer = await zip.generateAsync({ type: "nodebuffer" })

      // 3. Upload to S3
      const artifactKey = `${stackName}/lambda.zip`
      await writeLog(`Uploading artifact to s3://${bucketName}/${artifactKey}...`)
      await s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: artifactKey,
        Body: zipBuffer,
        ContentType: "application/zip"
      }))

      // 4. Inject S3 URI into the SAM Template
      // A naive but effective replacement for local CodeUri
      const preparedTemplate = samTemplate.replace(
        /CodeUri:\s+.*(\r?\n)/g, 
        `CodeUri: s3://${bucketName}/${artifactKey}$1`
      )

      // 5. Trigger CloudFormation
      await writeLog(`Creating CloudFormation stack: ${stackName}...`)
      await cfn.send(new CreateStackCommand({
        StackName: stackName,
        TemplateBody: preparedTemplate,
        Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
      }))

      await writeLog("Stack creation initiated. Monitoring events...")

      // 6. Poll for Stack Events
      let isComplete = false
      let seenEventIds = new Set()
      let liveUrl = ""

      while (!isComplete) {
        await new Promise(resolve => setTimeout(resolve, 5000))
        
        try {
          const eventsRes = await cfn.send(new DescribeStackEventsCommand({ StackName: stackName }))
          const events = eventsRes.StackEvents || []
          
          // Events come newest first. Reverse to process chronological
          const reversedEvents = [...events].reverse()
          reversedEvents.forEach((event: StackEvent) => {
            if (!seenEventIds.has(event.EventId)) {
              seenEventIds.add(event.EventId)
              writeLog(`Event [${event.ResourceType}]: ${event.LogicalResourceId} - ${event.ResourceStatus}`)
              
              if (event.ResourceType === "AWS::CloudFormation::Stack" && event.LogicalResourceId === stackName) {
                if (event.ResourceStatus === "CREATE_COMPLETE") {
                  isComplete = true
                } else if (event.ResourceStatus?.includes("FAILED") || event.ResourceStatus === "ROLLBACK_IN_PROGRESS") {
                  throw new Error(`Stack creation failed: ${event.ResourceStatusReason}`)
                }
              }

              // Extract API Endpoint URL if available
              if (event.ResourceStatus === "CREATE_COMPLETE" && event.ResourceType === "AWS::ApiGateway::RestApi") {
                liveUrl = `https://${event.PhysicalResourceId}.execute-api.${region}.amazonaws.com/Prod/`
              }
            }
          })
        } catch (e: any) {
             if(e.message.includes("does not exist")) {
                 // Stack might drop briefly or be deleted
                 throw new Error("Stack was deleted or not found.")
             } else {
                 console.error("Polling error:", e)
             }
        }
      }

      await writeLog("Deployment successful!", "complete", liveUrl || "https://aws.amazon.com/console/")
      writer.close()

    } catch (e: any) {
      console.error(e)
      await writeLog(e.message, "error")
      writer.close()
    }
  })()

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}
