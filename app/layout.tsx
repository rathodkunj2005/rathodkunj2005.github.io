import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kunj Rathod - AI Engineer & Researcher',
  description: 'Full-Stack Software Engineering Intern at Microsoft Azure Data. Specializing in AI/ML, RAG systems, and cloud technologies.',
  keywords: ['AI', 'Machine Learning', 'Computer Science', 'Microsoft Azure', 'React', 'Python', 'Software Development'],
  authors: [{ name: 'Kunj Rathod' }],
  openGraph: {
    title: 'Kunj Rathod - AI Engineer & Researcher',
    description: 'Full-Stack Software Engineering Intern at Microsoft Azure Data specializing in AI/ML and cloud technologies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-accent/20 selection:text-accent-foreground">{children}</body>
    </html>
  )
}
