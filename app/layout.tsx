import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Poppins } from 'next/font/google'
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

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kunj Rathod - AI Engineer & Computer Science Student',
  description: 'Computer Science student at University of Utah specializing in AI/ML, cloud technologies, and software development. Experience with AWS, LLMs, and full-stack development.',
  keywords: ['AI', 'Machine Learning', 'Computer Science', 'AWS', 'React', 'Python', 'Software Development'],
  authors: [{ name: 'Kunj Rathod' }],
  openGraph: {
    title: 'Kunj Rathod - AI Engineer & Computer Science Student',
    description: 'Computer Science student at University of Utah specializing in AI/ML, cloud technologies, and software development.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${poppins.variable}`}>
      <body className="font-inter antialiased">{children}</body>
    </html>
  )
}
