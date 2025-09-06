"use client"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { apiService } from "../services/api"

export const LoginPage: React.FC = () => {
  React.useEffect(() => {
    // Wake up daemon
    apiService.ping().catch((error) => console.error(error))
  }, [])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login({ email, password })
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your Wizournal account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />

            {error && <div className="text-red-600 text-sm text-center">{error}</div>}

            <Button type="submit" isLoading={isLoading} className="w-full py-3">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Guest Login Card */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Try as Guest</h2>
          <p className="text-gray-600 mb-4 text-center">Explore Wizournal instantly with a guest account.</p>
          <Button
            className="w-full py-2 text-base font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
            onClick={async () => {
              setIsLoading(true)
              setError("")
              try {
                await login({ email: "test@test", password: "test" })
                navigate("/")
              } catch (err: any) {
                setError("Guest login failed")
              } finally {
                setIsLoading(false)
              }
            }}
            disabled={isLoading}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  )
}
