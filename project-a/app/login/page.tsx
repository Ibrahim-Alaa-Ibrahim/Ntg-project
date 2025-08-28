"use client"

import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Code, Eye, EyeOff, ArrowLeft, User, Users } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginType, setLoginType] = useState<"parent" | "student">("parent")

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-fun rounded-2xl flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-heading font-bold text-gray-900">
              {loginType === "parent" ? "Welcome Back!" : "Hey There, Coder!"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {loginType === "parent"
                ? "Sign in to manage your child's coding journey"
                : "Sign in to continue your coding adventure"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setLoginType("parent")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  loginType === "parent" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-4 h-4" />
                Parent Login
              </button>
              <button
                onClick={() => setLoginType("student")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  loginType === "student" ? "bg-white text-green-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <User className="w-4 h-4" />
                Student Login
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  {loginType === "parent" ? "Email Address" : "Username or Email"}
                </Label>
                <Input
                  id="email"
                  type={loginType === "parent" ? "email" : "text"}
                  placeholder={loginType === "parent" ? "parent@example.com" : "your-username"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              className={`w-full rounded-xl text-white py-6 ${
                loginType === "parent" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loginType === "parent" ? "Sign In as Parent" : "Sign In as Student"}
            </Button>
{error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-gray-600">
                {loginType === "parent" ? "Don't have an account? " : "Need a parent to create your account? "}
                <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  {loginType === "parent" ? "Create one for free" : "Ask your parent to sign up"}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              loginType === "parent" ? "bg-yellow-400" : "bg-green-400"
            }`}
          >
            <span className="text-3xl">{loginType === "parent" ? "👋" : "🚀"}</span>
          </div>
          <p className="text-gray-600 font-heading">
            CodeBot says: "
            {loginType === "parent" ? "Welcome back, coding family!" : "Ready for another coding adventure?"}"
          </p>
        </div>
      </div>
    </div>
  )
}
