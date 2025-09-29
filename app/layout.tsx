import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MVP Builder - Build Products with AI',
  description: 'A step-by-step wizard to help non-technical people build products using AI. Define your product, set preferences, and get detailed prompts for building with Claude Code.',
  keywords: ['MVP', 'AI', 'product development', 'Claude Code', 'wizard', 'builder'],
  authors: [{ name: 'MVP Builder' }],
  robots: 'index, follow',
  openGraph: {
    title: 'MVP Builder - Build Products with AI',
    description: 'A step-by-step wizard to help non-technical people build products using AI.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MVP Builder - Build Products with AI',
    description: 'A step-by-step wizard to help non-technical people build products using AI.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
