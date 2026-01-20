"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Magnetic } from "@/components/ui/magnetic"

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, label: "Email", value: "kunj.rathod@utah.edu", href: "mailto:kunj.rathod@utah.edu" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", value: "linkedin.com/in/rathodkunj", href: "https://www.linkedin.com/in/rathodkunj/" },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", value: "github.com/rathodkunj2005", href: "https://github.com/rathodkunj2005" },
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Contact Info */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-medium">Get in Touch</h2>
          <p className="text-muted-foreground">
            I'm currently open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </div>

        <div className="space-y-4">
          {contactInfo.map((item, index) => (
            <Magnetic key={index}>
              <a
                href={item.href}
                target={item.href.startsWith('http') ? "_blank" : undefined}
                rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 p-4 rounded-xl bg-background/40 hover:bg-background/80 border border-transparent hover:border-border/50 transition-all duration-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 text-primary transition-colors">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</p>
                  <p className="text-base font-medium group-hover:text-primary transition-colors flex items-center gap-1">
                    {item.value}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </p>
                </div>
              </a>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>I'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative group">
                <motion.label
                  initial={false}
                  animate={{
                    y: focusedField === "name" || formState.name ? -24 : 0,
                    scale: focusedField === "name" || formState.name ? 0.85 : 1,
                    color: focusedField === "name" ? "var(--primary)" : "var(--muted-foreground)"
                  }}
                  className="absolute left-3 top-2.5 text-muted-foreground/70 pointer-events-none origin-left transition-colors"
                >
                  Full Name
                </motion.label>
                <Input
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="pt-6 pb-2 h-14 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative group">
                <motion.label
                  initial={false}
                  animate={{
                    y: focusedField === "email" || formState.email ? -24 : 0,
                    scale: focusedField === "email" || formState.email ? 0.85 : 1,
                    color: focusedField === "email" ? "var(--primary)" : "var(--muted-foreground)"
                  }}
                  className="absolute left-3 top-2.5 text-muted-foreground/70 pointer-events-none origin-left transition-colors"
                >
                  Email Address
                </motion.label>
                <Input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="pt-6 pb-2 h-14 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative group">
                <motion.label
                  initial={false}
                  animate={{
                    y: focusedField === "message" || formState.message ? -24 : 0,
                    scale: focusedField === "message" || formState.message ? 0.85 : 1,
                    color: focusedField === "message" ? "var(--primary)" : "var(--muted-foreground)"
                  }}
                  className="absolute left-3 top-2.5 text-muted-foreground/70 pointer-events-none origin-left transition-colors"
                >
                  Message
                </motion.label>
                <Textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="pt-8 min-h-[120px] bg-background/50 border-border/50 focus:border-primary/50 transition-all resize-none"
                  required
                />
              </div>
            </div>

            <Magnetic>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-medium transition-all"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Sending...
                    </motion.div>
                  ) : isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center text-green-100"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Message Sent
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </Magnetic>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

