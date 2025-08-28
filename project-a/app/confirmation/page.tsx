"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, CreditCard, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const planDetails = {
  "free-trial": {
    name: "Free Trial",
    price: "$0.00",
    period: "7 days",
    nextBilling: "No billing required",
  },
  monthly: {
    name: "Monthly Plan",
    price: "$19.99",
    period: "per month",
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  },
  quarterly: {
    name: "Quarterly Plan",
    price: "$49.99",
    period: "per 3 months",
    nextBilling: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  },
  annual: {
    name: "Annual Plan",
    price: "$159.99",
    period: "per year",
    nextBilling: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  },
  family: {
    name: "Family Plan",
    price: "$29.99",
    period: "per month",
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  },
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "monthly"
  const email = searchParams.get("email") || "user@example.com"
  const plan = planDetails[planId as keyof typeof planDetails] || planDetails.monthly

  const [orderNumber] = useState(() => "LC" + Math.random().toString(36).substr(2, 9).toUpperCase())

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    const receiptData = `
Learn2Code Receipt
Order #: ${orderNumber}
Plan: ${plan.name}
Amount: ${plan.price}
Date: ${new Date().toLocaleDateString()}
Email: ${email}
Next Billing: ${plan.nextBilling}
    `

    const blob = new Blob([receiptData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Learn2Code-Receipt-${orderNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L2C</span>
            </div>
            <span className="font-fredoka font-bold text-2xl text-gray-800">Learn2Code</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-gray-800 mb-4">Welcome to Learn2Code! 🎉</h1>
          <p className="text-xl text-gray-600 mb-6">Your subscription is now active and ready to go!</p>
          <Badge className="bg-green-100 text-green-800 border-green-200 text-lg px-4 py-2">Order #{orderNumber}</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka text-2xl text-gray-800 flex items-center space-x-2">
                <CreditCard className="w-6 h-6" />
                <span>Order Details</span>
              </CardTitle>
              <CardDescription>Your subscription information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan</span>
                <span className="font-semibold">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-semibold text-green-600">{plan.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Billing Cycle</span>
                <span className="font-semibold">{plan.period}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Date</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-gray-600">Next Billing Date</span>
                <span className="font-semibold">{plan.nextBilling}</span>
              </div>

              <Button
                onClick={handleDownloadReceipt}
                variant="outline"
                className="w-full mt-4 flex items-center space-x-2 bg-transparent"
              >
                <Download className="w-4 h-4" />
                <span>Download Receipt</span>
              </Button>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="font-fredoka text-2xl text-gray-800 flex items-center space-x-2">
                <Mail className="w-6 h-6" />
                <span>What's Next?</span>
              </CardTitle>
              <CardDescription>Get started with your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Check Your Email</h4>
                    <p className="text-sm text-gray-600">
                      We've sent a welcome email to {email} with your login details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Set Up Child Profiles</h4>
                    <p className="text-sm text-gray-600">
                      Create profiles for your children and choose their learning paths.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Start Learning!</h4>
                    <p className="text-sm text-gray-600">Browse our courses and begin the coding adventure.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/student/dashboard">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3 flex items-center space-x-2">
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/parent/dashboard">
            <Button variant="outline" className="text-lg px-8 py-3 bg-transparent">
              Go to Parent Dashboard
            </Button>
          </Link>
        </div>

        {/* Support Information */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">Need Help Getting Started?</h3>
            <p className="text-gray-600 mb-4">Our support team is here to help you and your child succeed!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">Contact Support</Button>
              <Button variant="outline">View Help Center</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
