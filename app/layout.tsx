import type React from "react"
import type { Metadata } from "next"
import "../src/index.css"

export const metadata: Metadata = {
  title: "Wizournal - Your AI-Powered Magical Journal",
  description: "Transform your daily thoughts into enchanting, AI-enhanced stories",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
