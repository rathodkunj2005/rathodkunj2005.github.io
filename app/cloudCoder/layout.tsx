import { Metadata } from "next"

export const metadata: Metadata = {
  title: "CloudCoder | Build & Deploy Apps Instantly",
  description: "Generate and deploy full-stack Serverless applications instantly to your AWS account using AI.",
}

export default function CloudCoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full overflow-hidden bg-background text-foreground flex flex-col font-sans">
      {/* 
        This layout isolates the CloudCoder app from the main portfolio navigation and footer.
        It spans the full viewport h-screen and hides overflow.
      */}
      {children}
    </div>
  )
}
