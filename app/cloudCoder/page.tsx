"use client"

import { useState, useEffect } from "react"
import { SettingsModal } from "@/components/cloudcoder/settings-modal"
import { Sidebar } from "@/components/cloudcoder/sidebar"
import { ChatInterface } from "@/components/cloudcoder/chat-interface"

export default function CloudCoderPage() {
  const [hasCredentials, setHasCredentials] = useState<boolean>(false)
  const [isClient, setIsClient] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
    
    // Check if we have credentials in sessionStorage
    const checkCredentials = () => {
      const awsAccessKey = sessionStorage.getItem("cc_aws_access_key")
      const providerKey = sessionStorage.getItem("cc_provider_key")
      if (awsAccessKey && providerKey) {
        setHasCredentials(true)
      } else {
        setHasCredentials(false)
      }
    }
    
    checkCredentials()
    
    // Listen for custom event from modal
    window.addEventListener("credentialsUpdated", checkCredentials)
    return () => window.removeEventListener("credentialsUpdated", checkCredentials)
  }, [])

  if (!isClient) {
    return <div className="h-screen w-full flex items-center justify-center bg-background">Loading...</div>
  }

  return (
    <main className="flex h-full w-full overflow-hidden">
      {!hasCredentials && <SettingsModal />}
      
      {/* Sidebar - App Catalog */}
      <Sidebar />
      
      {/* Main Chat & Deploy Area */}
      <ChatInterface />
    </main>
  )
}
