import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SSD_Tourist_App',
  description: 'This a tourist app with AI support to help users get more information about their present location or target location of visit',
  manifest: '/manifest.json',
  themeColor: '#04192f',
  keywords: ['ai', 'tour guide', 'tourism', 'travel', 'trip advisor', 'trip'],
  robots: "index, follow",
  icons: [
    { rel: "icon", url: "/favicon.ico", href: "/favicon.ico", sizes: "16x16", type: "image/x-icon"},
    { rel: "shortcut icon", url: "/icon.png", href: "/icon.png", sizes: "192x192", type: "image/png"},
    { rel: "icon", url: "/icon.png", href: "/icon.png", sizes: "192x192", type: "image/png"},
    { rel: "icon", url: "/icon2x.png", href: "/icon2x.png", sizes: "256x256", type: "image/png" },
    { rel: "icon", url: "/icon3x.png", href: "/icon3x.png", sizes: "384x384", type: "image/png" },
    { rel: "icon", url: "/icon4x.png", href: "/icon4x.png", sizes: "512x512", type: "image/png" },
    { rel: "apple-touch-icon", url: "/icon.png", href: "/icon.png", sizes: "192x192", type: "image/png" },
    { rel: "apple-touch-icon", url: "/icon2x.png", href: "/icon2x.png", sizes: "256x256", type: "image/png" },
    { rel: "apple-touch-icon", url: "/icon3x.png", href: "/icon3x.png", sizes: "384x384", type: "image/png" },
    { rel: "apple-touch-icon", url: "/icon4x.png", href: "/icon4x.png", sizes: "512x512", type: "image/png" }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
