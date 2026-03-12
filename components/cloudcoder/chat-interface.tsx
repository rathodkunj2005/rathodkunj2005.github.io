"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, Terminal, Loader2, ArrowUpRight } from "lucide-react"

type Message = {
  role: "user" | "agent"
  content: string
  logs?: string[]
  liveUrl?: string
  status?: "planning" | "building" | "deploying" | "complete" | "error"
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Hi! What do you want to build and deploy to AWS today? Tell me the functionality and I'll generate the React frontend, Lambda backend, and SAM template."
    }
  ])
  const [input, setInput] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isDeploying) return
    
    const userPrompt = input.trim()
    setInput("")
    
    // 1. Add User Message
    setMessages(prev => [...prev, { role: "user", content: userPrompt }])
    
    // 2. Add empty Agent Message indicating status
    const agentMsgIndex = messages.length + 1
    
    setMessages(prev => [...prev, { 
      role: "agent", 
      content: "Planning architecture...", 
      status: "planning",
      logs: []
    }])
    
    setIsDeploying(true)
    
    try {
      // Extract credentials from session
      const provider = sessionStorage.getItem("cc_provider") || "openai"
      const modelName = sessionStorage.getItem("cc_model_name") || "gpt-4o"
      const providerKey = sessionStorage.getItem("cc_provider_key") || ""
      const awsAccessKey = sessionStorage.getItem("cc_aws_access_key") || ""
      const awsSecretKey = sessionStorage.getItem("cc_aws_secret_key") || ""
      const awsRegion = sessionStorage.getItem("cc_aws_region") || "us-east-1"
      
      if (!providerKey || !awsAccessKey) {
        throw new Error("Missing credentials. Please configure environment.")
      }
      
      // -- Step 1: AI Code Generation via direct provider call --
      let generatedApp: any;
      
      const systemPrompt = `You are an expert AWS Serverless Architect. The user will ask for a web application. 
      You must generate three files that make up a production-ready serverless stack. Only return a JSON object with:
      - appName: string (Short hyphenated name)
      - spaCode: string (The index.html frontend code using React, Babel, and Tailwind CDN)
      - lambdaCode: string (The Node.js Lambda index.js code to handle REST)
      - samTemplate: string (The AWS SAM YAML template)
      Ensure your output is strictly valid JSON without markdown wrapping.`;

      if (provider === "openai") {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${providerKey}`
          },
          body: JSON.stringify({
            model: modelName,
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ]
          })
        });
        if (!res.ok) throw new Error("OpenAI API error: " + await res.text());
        const data = await res.json();
        generatedApp = JSON.parse(data.choices[0].message.content);
      } else if (provider === "anthropic") {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": providerKey,
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true"
          },
          body: JSON.stringify({
            model: modelName,
            max_tokens: 4000,
            system: systemPrompt,
            messages: [{ role: "user", content: userPrompt }]
          })
        });
        if (!res.ok) throw new Error("Anthropic API error: " + await res.text());
        const data = await res.json();
        // Extract JSON from Claude's response (which usually wraps in ```json ... ``` despite instructions)
        let content = data.content[0].text;
        if (content.includes("```json")) {
           content = content.split("```json")[1].split("```")[0];
        } else if (content.includes("```")) {
           content = content.split("```")[1].split("```")[0];
        }
        generatedApp = JSON.parse(content);
      } else if (provider === "google") {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${providerKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            contents: [{
              role: "user",
              parts: [{ text: userPrompt }]
            }],
            generationConfig: {
              responseMimeType: "application/json"
            }
          })
        });
        if (!res.ok) throw new Error("Google Gemini API error: " + await res.text());
        const data = await res.json();
        let content = data.candidates[0].content.parts[0].text;
        if (content.includes("```json")) {
           content = content.split("```json")[1].split("```")[0];
        } else if (content.includes("```")) {
           content = content.split("```")[1].split("```")[0];
        }
        generatedApp = JSON.parse(content);
      }

      const { appName, spaCode, lambdaCode, samTemplate } = generatedApp;
      
      setMessages(prev => {
        const newMsgs = [...prev]
        newMsgs[agentMsgIndex] = {
          ...newMsgs[agentMsgIndex],
          content: `Generated Architecture for \`${appName}\``,
          status: "deploying",
          logs: [
            "✓ Generated React SPA (index.html)",
            "✓ Generated Lambda handler (index.js)",
            "✓ Generated SAM CloudFormation template (template.yaml)",
            "Uploading to S3 and deploying CloudFormation stack..."
          ]
        }
        return newMsgs;
      });

      // -- Step 2: AWS Deployment direct from browser via JS SDK --
      const { CloudFormationClient, CreateStackCommand, DescribeStackEventsCommand } = await import("@aws-sdk/client-cloudformation");
      const { S3Client, PutObjectCommand, HeadBucketCommand, CreateBucketCommand } = await import("@aws-sdk/client-s3");
      const JSZip = (await import("jszip")).default;

      const credentials = { accessKeyId: awsAccessKey, secretAccessKey: awsSecretKey };
      const s3 = new S3Client({ region: awsRegion, credentials });
      const cfn = new CloudFormationClient({ region: awsRegion, credentials });

      const stackName = `cloudcoder-${appName}-${Date.now().toString().slice(-6)}`;
      const bucketName = `cloudcoder-artifacts-${awsAccessKey.toLowerCase()}-${awsRegion}`;

      const addLog = (msg: string) => {
        setMessages(prev => {
          const newMsgs = [...prev]
          const logMsgs = newMsgs[agentMsgIndex].logs || []
          newMsgs[agentMsgIndex] = {
            ...newMsgs[agentMsgIndex],
            logs: [...logMsgs, msg]
          }
          return newMsgs
        })
      };

      addLog(`Checking artifact bucket: ${bucketName}...`);
      try {
        await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
      } catch (e: any) {
        if (e.name === "NotFound") {
          addLog("Creating new S3 artifact bucket...");
          await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
        } else {
          throw e;
        }
      }

      addLog("Zipping Lambda function code locally...");
      const zip = new JSZip();
      zip.file("index.js", lambdaCode);
      zip.file("index.html", spaCode);
      const zipBuffer = await zip.generateAsync({ type: "uint8array" });

      const artifactKey = `${stackName}/lambda.zip`;
      addLog(`Uploading artifact to s3://${bucketName}/${artifactKey}...`);
      await s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: artifactKey,
        Body: zipBuffer,
        ContentType: "application/zip"
      }));

      const preparedTemplate = samTemplate.replace(
        /CodeUri:\s+.*(\r?\n)/g, 
        `CodeUri: s3://${bucketName}/${artifactKey}$1`
      );

      addLog(`Creating CloudFormation stack: ${stackName}...`);
      await cfn.send(new CreateStackCommand({
        StackName: stackName,
        TemplateBody: preparedTemplate,
        Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
      }));

      addLog("Stack creation initiated. Monitoring events...");

      let isComplete = false;
      let seenEventIds = new Set();
      let liveUrl = "";

      while (!isComplete) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        try {
          const eventsRes = await cfn.send(new DescribeStackEventsCommand({ StackName: stackName }));
          const events = eventsRes.StackEvents || [];
          
          const reversedEvents = [...events].reverse();
          reversedEvents.forEach(event => {
            if (!seenEventIds.has(event.EventId)) {
              seenEventIds.add(event.EventId);
              addLog(`Event [${event.ResourceType}]: ${event.LogicalResourceId} - ${event.ResourceStatus}`);
              
              if (event.ResourceType === "AWS::CloudFormation::Stack" && event.LogicalResourceId === stackName) {
                if (event.ResourceStatus === "CREATE_COMPLETE") {
                  isComplete = true;
                } else if (event.ResourceStatus?.includes("FAILED") || event.ResourceStatus === "ROLLBACK_IN_PROGRESS") {
                  throw new Error(`Stack creation failed: ${event.ResourceStatusReason}`);
                }
              }

              if (event.ResourceStatus === "CREATE_COMPLETE" && event.ResourceType === "AWS::ApiGateway::RestApi") {
                liveUrl = `https://${event.PhysicalResourceId}.execute-api.${awsRegion}.amazonaws.com/Prod/`;
              }
            }
          });
        } catch (e: any) {
             if(e.message && e.message.includes("does not exist")) {
                 throw new Error("Stack was deleted or not found.")
             } else if (e.message && e.message.includes("failed")) {
                 throw e;
             } else {
                 console.error("Polling warning:", e);
             }
        }
      }

      setMessages(prev => {
        const newMsgs = [...prev]
        newMsgs[agentMsgIndex] = {
          ...newMsgs[agentMsgIndex],
          status: "complete",
          liveUrl: liveUrl || `https://${awsRegion}.console.aws.amazon.com/cloudformation/`,
          content: "Your app is deployed and live! Let me know if you want to change anything."
        }
        return newMsgs
      });
      
    } catch (e: any) {
      setMessages(prev => {
        const newMsgs = [...prev]
        newMsgs[agentMsgIndex] = {
          ...newMsgs[agentMsgIndex],
          status: "error",
          content: `Error: ${e.message}`,
          logs: [...(newMsgs[agentMsgIndex].logs || []), `Deployment Failed: ${e.message}`]
        }
        return newMsgs
      })
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative max-w-4xl mx-auto w-full border-l border-r border-border/40 shadow-2xl">
      {/* Header */}
      <div className="h-14 border-b bg-card/50 flex items-center px-4 font-mono text-sm tracking-tight text-foreground/80">
        CloudCoder Environment
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${
              msg.role === "user" 
              ? "bg-accent text-accent-foreground" 
              : "bg-secondary text-secondary-foreground border border-border"
            }`}>
              <div className="leading-relaxed whitespace-pre-wrap text-sm">{msg.content}</div>
              
              {/* Deploy Logs UI */}
              {msg.logs && msg.logs.length > 0 && (
                <div className="mt-4 bg-background rounded-lg border p-3 font-mono text-xs text-muted-foreground overflow-hidden">
                  <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-wider text-primary">
                    <Terminal className="w-3 h-3" /> Event Log
                  </div>
                  <div className="space-y-1 max-h-[200px] overflow-y-auto pr-2">
                    {msg.logs.map((log, li) => (
                      <div key={li} className="flex">
                        <span className="opacity-50 select-none mr-2">{'>'}</span>
                        <span className="text-emerald-500/80">{log}</span>
                      </div>
                    ))}
                    {msg.status === "deploying" && (
                      <div className="flex items-center text-primary/70 mt-2">
                        <Loader2 className="w-3 h-3 mr-2 animate-spin" /> waiting on CloudFormation...
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Live URL Link */}
              {msg.status === "complete" && msg.liveUrl && (
                <div className="mt-4 flex">
                  <a href={msg.liveUrl} target="_blank" rel="noopener noreferrer" 
                     className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors text-primary">
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    Open Live App
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t bg-card/50 backdrop-blur-md">
        <div className="flex items-end gap-2 bg-background border rounded-2xl p-2 shadow-sm focus-within:ring-1 ring-accent transition-all">
          <textarea 
            className="flex-1 min-h-[44px] max-h-[200px] bg-transparent resize-none outline-none text-sm px-3 py-3 w-full"
            placeholder="Build me a to-do list with a priority flag (high/low)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            disabled={!input.trim() || isDeploying} 
            onClick={handleSend}
            variant="default"
            size="icon" 
            className="rounded-xl h-[44px] w-[44px] shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isDeploying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        <div className="text-center mt-2 text-[10px] text-muted-foreground font-mono">
          CloudCoder deploys real infrastructure to your AWS via CloudFormation.
        </div>
      </div>
    </div>
  )
}
