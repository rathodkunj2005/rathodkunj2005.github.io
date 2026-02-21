"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

function StatCounter({ value, label }: { value: string; label: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col items-center gap-0.5"
        >
            <span className="text-2xl md:text-3xl font-serif font-medium text-foreground">
                {value}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest text-center">
                {label}
            </span>
        </motion.div>
    )
}

export function HeroContent() {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 max-w-4xl mx-auto space-y-10">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.28 }
                    }
                }}
                className="space-y-6"
            >
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="inline-flex items-center rounded-full border border-primary/10 bg-secondary/30 px-3 py-1 text-xs font-mono text-primary backdrop-blur-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    Incoming Software Engineer @ Microsoft Azure Data · Jan 2026
                </motion.div>

                <motion.h1
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-foreground"
                >
                    Kunj Rathod
                </motion.h1>

                <motion.p
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed"
                >
                    CS Researcher &amp; AI Engineer at the University of Utah.{" "}
                    <br className="hidden md:block" />
                    Building AI systems from{" "}
                    <span className="text-foreground font-medium">HIPAA-compliant hospital platforms</span>{" "}
                    to{" "}
                    <span className="text-foreground font-medium">spatial memory for embodied agents</span>{" "}
                    and{" "}
                    <span className="text-foreground font-medium">materials discovery pipelines</span>.
                </motion.p>
            </motion.div>

            {/* Stat Counters */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex items-center gap-8 md:gap-12"
            >
                <StatCounter value="10M+" label="Docs Indexed" />
                <div className="h-8 w-px bg-border/50" />
                <StatCounter value="40%" label="Latency Reduced" />
                <div className="h-8 w-px bg-border/50" />
                <StatCounter value="1M+" label="Entities Managed" />
            </motion.div>

            {/* CTAs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-4"
            >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="lg" className="rounded-full px-8 h-12 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="#experience">Explore Work</Link>
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-sm font-medium backdrop-blur-sm bg-background/50 border-primary/20 hover:bg-background/80">
                        <a href="/cv_kunj_rathod.pdf" target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            Download CV
                        </a>
                    </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild variant="ghost" size="lg" className="rounded-full px-8 h-12 text-sm font-medium hover:bg-background/60">
                        <Link href="#contact">Get In Touch</Link>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export function ScrollIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary/20 to-primary/50" />
        </motion.div>
    )
}
