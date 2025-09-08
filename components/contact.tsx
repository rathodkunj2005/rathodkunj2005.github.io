"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setName("")
    setEmail("")
    setMessage("")

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "kunj.rathod@utah.edu",
      href: "mailto:kunj.rathod@utah.edu",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+1 (385) 202-8879",
      href: "tel:+13852028879",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Salt Lake City, UT",
      href: "#",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/rathodkunj",
      href: "https://www.linkedin.com/in/rathodkunj/",
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      value: "github.com/rathodkunj2005",
      href: "https://github.com/rathodkunj2005",
    },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Contact Information */}
      <Card className="glass-card interactive-card">
        <CardHeader>
          <CardTitle className="text-2xl mb-2">Get In Touch</CardTitle>
          <CardDescription className="text-lg">
            Let's collaborate on innovative AI solutions and discuss exciting opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-6">
            {contactInfo.map((item, index) => (
              <li key={index} className="group">
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <p className="text-base font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="glass-card interactive-card">
        <CardHeader>
          <CardTitle className="text-2xl mb-2">Send a Message</CardTitle>
          <CardDescription className="text-lg">
            I'll get back to you within 24 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                Full Name
              </label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="glass transition-all duration-300 focus:scale-105"
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="glass transition-all duration-300 focus:scale-105"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                Message
              </label>
              <Textarea 
                id="message" 
                rows={5} 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                required 
                className="glass transition-all duration-300 focus:scale-105 resize-none"
                placeholder="Tell me about your project or how I can help..."
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full interactive-button glass-nav text-lg py-6"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
            {isSubmitted && (
              <div className="flex items-center gap-2 text-green-500 animate-fade-in">
                <CheckCircle className="h-5 w-5" />
                <p className="text-sm font-medium">
                  Thank you for your message! I'll get back to you soon.
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

