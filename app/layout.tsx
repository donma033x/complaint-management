import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "舆鹰@词盾 - 网络内容管理平台",
  description: "专业的网络内容投诉词管理工具",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    apple: "/fidrua-logo.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 py-2 px-2">
          <p className="text-xs text-slate-500 text-center">Copyright © 2025 Don, All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  )
}
