"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Key } from "lucide-react"

export function SettingsModal() {
  const [open, setOpen] = useState(false)
  
  const [provider, setProvider] = useState("openai")
  const [modelName, setModelName] = useState("gpt-4o")
  const [providerKey, setProviderKey] = useState("")
  const [awsAccessKey, setAwsAccessKey] = useState("")
  const [awsSecretKey, setAwsSecretKey] = useState("")
  const [awsRegion, setAwsRegion] = useState("us-east-1")

  // Only run on client mounting
  useEffect(() => {
    const hasKeys = sessionStorage.getItem("cc_aws_access_key") && sessionStorage.getItem("cc_provider_key")
    if (!hasKeys) {
      setOpen(true)
    }
  }, [])

  const handleSave = () => {
    if (!providerKey || !awsAccessKey || !awsSecretKey || !awsRegion) {
      alert("Please fill in all fields.")
      return
    }

    // Since this is a public portfolio, we strictly store this in temporary browser session
    sessionStorage.setItem("cc_provider", provider)
    sessionStorage.setItem("cc_model_name", modelName)
    sessionStorage.setItem("cc_provider_key", providerKey)
    sessionStorage.setItem("cc_aws_access_key", awsAccessKey)
    sessionStorage.setItem("cc_aws_secret_key", awsSecretKey)
    sessionStorage.setItem("cc_aws_region", awsRegion)

    setOpen(false)
    window.dispatchEvent(new Event("credentialsUpdated"))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-background border-border" onInteractOutside={(e) => {
        // Prevent closing if we don't have credentials
        const hasKeys = sessionStorage.getItem("cc_aws_access_key") && sessionStorage.getItem("cc_provider_key")
        if (!hasKeys) {
          e.preventDefault()
        }
      }}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-accent" />
            Configure Environment
          </DialogTitle>
          <DialogDescription>
            Enter your API credentials to begin. These are stored locally in your browser's session storage and are never saved to a database.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>AI Provider</Label>
             <Select value={provider} onValueChange={(val) => {
               setProvider(val)
               setModelName(val === "openai" ? "gpt-4o" : "claude-3-5-sonnet-latest")
             }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Model</Label>
            <Select value={modelName} onValueChange={setModelName}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {provider === "openai" ? (
                  <>
                    <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                    <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                    <SelectItem value="o1-preview">o1-preview</SelectItem>
                    <SelectItem value="o1-mini">o1-mini</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="claude-3-5-sonnet-latest">claude-3-5-sonnet-latest</SelectItem>
                    <SelectItem value="claude-3-opus-latest">claude-3-opus-latest</SelectItem>
                    <SelectItem value="claude-3-haiku-20240307">claude-3-haiku-20240307</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>{provider === "openai" ? "OpenAI" : "Anthropic"} API Key</Label>
            <Input 
              type="password" 
              value={providerKey} 
              onChange={(e) => setProviderKey(e.target.value)} 
              placeholder="sk-..." 
            />
          </div>
          <div className="h-px bg-border my-2" />
          <div className="grid gap-2">
            <Label>AWS Access Key ID</Label>
            <Input 
              type="text" 
              value={awsAccessKey} 
              onChange={(e) => setAwsAccessKey(e.target.value)} 
              placeholder="AKIA..." 
            />
          </div>
          <div className="grid gap-2">
            <Label>AWS Secret Access Key</Label>
            <Input 
              type="password" 
              value={awsSecretKey} 
              onChange={(e) => setAwsSecretKey(e.target.value)} 
            />
          </div>
          <div className="grid gap-2">
            <Label>AWS Region</Label>
            <Input 
              type="text" 
              value={awsRegion} 
              onChange={(e) => setAwsRegion(e.target.value)} 
              placeholder="e.g. us-east-1" 
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Save Credentials
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
