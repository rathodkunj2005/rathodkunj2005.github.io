"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroContent() {
    return (
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 max-w-4xl mx-auto space-y-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.3
                        }
                    }
                }}
                className="space-y-6"
            >
                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="inline-flex items-center rounded-full border border-primary/10 bg-secondary/30 px-3 py-1 text-xs font-mono text-primary backdrop-blur-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    Incoming Software Engineer @ Microsoft Azure Data
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
                    Computer Science Researcher & AI Engineer. <br className="hidden md:block" />
                    Crafting AI systems at the intersection of <span className="text-foreground font-medium">Material Science</span> and <span className="text-foreground font-medium">Biotechnology</span>.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-4"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button asChild size="lg" className="rounded-full px-8 h-12 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Link href="#experience">Explore Work</Link>
                    </Button>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-sm font-medium backdrop-blur-sm bg-background/50 border-primary/20 hover:bg-background/80">
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
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary/20 to-primary/50"></div>
        </motion.div>
    )
}
