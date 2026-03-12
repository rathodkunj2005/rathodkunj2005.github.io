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
      
      // -- Step 1: AI Code Generation via API Route --
      const genResponse = await fetch("/api/cloudcoder/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Provider": provider,
          "X-Model-Name": modelName,
          "Authorization": `Bearer ${providerKey}`
        },
        body: JSON.stringify({ prompt: userPrompt })
      })
      
      if (!genResponse.ok) {
        const errText = await genResponse.text()
        throw new Error("Failed to generate code: " + errText)
      }
      
      const { appName, spaCode, lambdaCode, samTemplate } = await genResponse.json()
      
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
        return newMsgs
      })
      
      // -- Step 2: AWS Deployment via SSE stream --
      const searchParams = new URLSearchParams()
      searchParams.set("appName", appName)
      
      const eventSource = new EventSource(`/api/cloudcoder/deploy?${searchParams.toString()}&region=${awsRegion}&ak=${awsAccessKey}&sk=${awsSecretKey}`)
      
      // To pass body in sse, it's tricky. Let's instead save the generated code in localStorage and have the API route read it, OR we just do a fetch POST first that triggers it in KV and returns an ID, then we SSE on that ID.
      // To keep it clean and stateless without a DB: we will use a POST request with NDJSON streaming instead of EventSource so we can send the body.
      
      // We will pivot Step 2 to use a chunked fetch response
      eventSource.close() // discard the EventSource approach, let's use fetch stream
      
      const deployRes = await fetch("/api/cloudcoder/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AWS-Access-Key": awsAccessKey,
          "X-AWS-Secret-Key": awsSecretKey,
          "X-AWS-Region": awsRegion || "us-east-1"
        },
        body: JSON.stringify({ appName, spaCode, lambdaCode, samTemplate })
      })
      
      if (!deployRes.body) throw new Error("No response body from deploy")
      
      const reader = deployRes.body.getReader()
      const decoder = new TextDecoder()
      
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        
        const chunkStr = decoder.decode(value, { stream: true })
        // chunkStr could contain multiple JSON lines
        const lines = chunkStr.split('\n').filter(line => line.trim())
        
        for (const line of lines) {
          try {
            const data = JSON.parse(line)
            if (data.type === "log" || data.type === "event") {
              setMessages(prev => {
                const newMsgs = [...prev]
                const logMsgs = newMsgs[agentMsgIndex].logs || []
                newMsgs[agentMsgIndex] = {
                  ...newMsgs[agentMsgIndex],
                  logs: [...logMsgs, data.message]
                }
                return newMsgs
              })
            }
            if (data.type === "complete") {
              setMessages(prev => {
                const newMsgs = [...prev]
                newMsgs[agentMsgIndex] = {
                  ...newMsgs[agentMsgIndex],
                  status: "complete",
                  liveUrl: data.url,
                  content: "Your app is deployed and live! Let me know if you want to change anything."
                }
                return newMsgs
              })
            }
            if (data.type === "error") {
               throw new Error(data.message)
            }
          } catch (e) {
            console.error("Parse error on chunk:", e)
          }
        }
      }
      
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
