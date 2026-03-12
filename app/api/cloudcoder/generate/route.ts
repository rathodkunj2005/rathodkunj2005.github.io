import { z } from "zod"
import { generateObject } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const providerStr = req.headers.get("X-Provider") || "openai"
    const modelName = req.headers.get("X-Model-Name") || "gpt-4o"
    const authHeader = req.headers.get("Authorization") || ""
    const apiKey = authHeader.replace("Bearer ", "").trim()

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 401 })
    }

    const { prompt } = await req.json()

    // Dynamically choose provider based on user selection in modal
    let model
    if (providerStr === "anthropic") {
      const anthropic = createAnthropic({ apiKey })
      model = anthropic(modelName)
    } else {
      const openai = createOpenAI({ apiKey })
      model = openai(modelName)
    }

    // Call the model with structured output
    const { object } = await generateObject({
      model,
      system: `You are an expert AWS Serverless Architect. The user will ask for a web application. 
      You must generate three files that make up a production-ready serverless stack:
      1. appName: A short hyphenated name (e.g., my-todo-app).
      2. spaCode: A single file 'index.html' containing a React App using Babel and Tailwind CDN. It should call an API endpoint at '/api'. It must be beautiful and functional.
      3. lambdaCode: A Node.js 20 Lambda function (index.js) handling REST requests. It should use an internal memory-store or DynamoDB (using AWS SDK v3) if requested, but for simplicity default to an in-memory mapped object so it runs immediately. Return proper CORS headers.
      4. samTemplate: An AWS SAM CloudFormation template (template.yaml) that creates:
         - An HTTP API Gateway.
         - A Lambda Function connected to the API Gateway.
         - An S3 Bucket configured for static website hosting (index.html will go here).
         - Output the API Endpoint URL and the Website URL.
         
      Pay extreme attention to valid YAML indentation and AWS resource constraints.`,
      prompt,
      schema: z.object({
        appName: z.string().describe("Short hyphenated name for the CloudFormation stack"),
        spaCode: z.string().describe("The index.html frontend code"),
        lambdaCode: z.string().describe("The Node.js Lambda index.js code"),
        samTemplate: z.string().describe("The AWS SAM YAML template")
      }),
    })

    return NextResponse.json(object)

  } catch (error: any) {
    console.error("AI Generation failed:", error)
    return NextResponse.json({ error: error.message || "Failed to generate architecture" }, { status: 500 })
  }
}
