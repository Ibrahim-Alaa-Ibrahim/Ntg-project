"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Lock, ArrowLeft, Gift, Clock, Star, Users } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const planDetails = {
  "free-trial": {
    name: "Free Trial",
    price: "$0.00",
    period: "7 days",
    icon: Gift,
    color: "bg-green-500",
  },
  monthly: {
    name: "Monthly Plan",
    price: "$19.99",
    period: "per month",
    icon: Clock,
    color: "bg-blue-500",
  },
  quarterly: {
    name: "Quarterly Plan",
    price: "$49.99",
    period: "per 3 months",
    originalPrice: "$59.97",
    savings: "$9.98",
    icon: Star,
    color: "bg-purple-500",
  },
  annual: {
    name: "Annual Plan",
    price: "$159.99",
    period: "per year",
    originalPrice: "$239.88",
    savings: "$79.89",
    icon: Star,
    color: "bg-yellow-500",
  },
  family: {
    name: "Family Plan",
    price: "$29.99",
    period: "per month",
    icon: Users,
    color: "bg-pink-500",
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") || "monthly"
  const plan = planDetails[planId as keyof typeof planDetails] || planDetails.monthly

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    agreeTerms: false,
    agreeMarketing: false,
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      window.location.href = `/confirmation?plan=${planId}&email=${formData.email}`
    }, 2000)
  }

  const IconComponent = plan.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L2C</span>
              </div>
              <span className="font-fredoka font-bold text-2xl text-gray-800">Learn2Code</span>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Pricing</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardTitle className="font-fredoka text-2xl">Order Summary</CardTitle>
                <CardDescription className="text-blue-100">Review your selected plan</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-fredoka font-bold text-xl text-gray-800">{plan.name}</h3>
                    <p className="text-gray-600">{plan.period}</p>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">{plan.originalPrice || plan.price}</span>
                  </div>
                  {plan.savings && (
                    <div className="flex justify-between text-green-600">
                      <span>Savings</span>
                      <span>-{plan.savings}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total</span>
                    <span>{plan.price}</span>
                  </div>
                </div>

                {plan.savings && (
                  <Badge className="w-full justify-center mt-4 bg-green-100 text-green-800 border-green-200">
                    You save {plan.savings}!
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 text-green-600 mb-3">
                  <Lock className="w-5 h-5" />
                  <span className="font-semibold">Secure Checkout</span>
                </div>
                <p className="text-sm text-gray-600">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect
                  your data.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-fredoka text-2xl text-gray-800">Payment Information</CardTitle>
                <CardDescription>Complete your purchase to start learning today!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmEmail">Confirm Email</Label>
                      <Input
                        id="confirmEmail"
                        type="email"
                        value={formData.confirmEmail}
                        onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">Payment Method</h3>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg bg-blue-50">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Credit/Debit Card</span>
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-800">Billing Address</h3>
                    <div>
                      <Label htmlFor="billingAddress">Street Address</Label>
                      <Input
                        id="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="agreeTerms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onCheckedChange={(checked) => handleInputChange("agreeMarketing", checked as boolean)}
                      />
                      <Label htmlFor="agreeMarketing" className="text-sm">
                        I'd like to receive updates about new courses and features
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6"
                    disabled={isProcessing || !formData.agreeTerms}
                  >
                    {isProcessing ? "Processing..." : `Complete Purchase - ${plan.price}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
