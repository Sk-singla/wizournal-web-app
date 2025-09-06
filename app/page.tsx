"use client"

import { AuthProvider } from "../src/contexts/AuthContext"
import App from "../src/App"

export default function Page() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
