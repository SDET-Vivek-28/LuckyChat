import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LuckyChat - Your Talking Dog AI Assistant',
  description: 'Meet Lucky, your friendly AI dog assistant who helps you find information quickly. A tribute to a beloved companion. Powered by Appvik.',
  keywords: ['AI Assistant', 'Chat Bot', 'Talking Dog', 'Information Helper', 'LuckyChat', 'Appvik'],
  authors: [{ name: 'Appvik' }],
  robots: 'index, follow',
}

export const viewport: Viewport = {
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
      <body className="gradient-bg min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
} 