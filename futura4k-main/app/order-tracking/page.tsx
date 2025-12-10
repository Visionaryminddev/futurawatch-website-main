"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, Clock, Mail, MessageCircle } from "lucide-react"
import { useTranslate } from "@/hooks/use-translate"
import { useToast } from "@/components/ui/use-toast"

interface OrderStatus {
  id: string
  email: string
  plan: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  date: string
  amount: string
}

export default function OrderTrackingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [orderResult, setOrderResult] = useState<OrderStatus | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const t = useTranslate()
  const { toast } = useToast()

  // Mock order data for demonstration
  const mockOrders: OrderStatus[] = [
    {
      id: "FW-2024-001",
      email: "user@example.com",
      plan: "6 Month Premium",
      status: "completed",
      date: "2024-12-15",
      amount: "€49.99"
    },
    {
      id: "FW-2024-002", 
      email: "customer@test.com",
      plan: "1 Month Premium",
      status: "processing",
      date: "2024-12-16",
      amount: "€19.99"
    }
  ]

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Required",
        description: "Please enter your order ID or email address.",
        variant: "destructive"
      })
      return
    }

    setIsSearching(true)
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = mockOrders.find(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setOrderResult(foundOrder || null)
      setIsSearching(false)
      
      if (!foundOrder) {
        toast({
          title: "Order Not Found",
          description: "No order found with the provided details. Please check and try again.",
          variant: "destructive"
        })
      }
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'pending':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />
      case 'processing':
      case 'pending':
        return <Clock className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const handleContactSupport = () => {
    window.open("https://signal.me/#eu/Td0r6W11XPRx9fPR-VNGX5HtY6UoUyvo779QXjGe85xm6M8wQ3dKa41lh2ep5HDQ", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="mobile-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="responsive-title mb-4">
              Track Your <span className="text-yellow-500">Order</span>
            </h1>
            <p className="responsive-subtitle text-gray-400 max-w-2xl mx-auto">
              Enter your order ID or email address to check the status of your IPTV subscription.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mobile-card bg-gray-900 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-yellow-500 responsive-subtitle text-center">
                Search Your Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter Order ID (e.g., FW-2024-001) or Email Address"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mobile-input bg-gray-800 border-gray-700 text-white w-full"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mobile-button touch-element"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "Searching..." : "Track Order"}
                </Button>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Order ID can be found in your confirmation email or payment receipt
              </p>
            </CardContent>
          </Card>

          {/* Order Result */}
          {orderResult && (
            <Card className="mobile-card bg-gray-900 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-yellow-500 responsive-subtitle">
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 responsive-text">Order Information</h3>
                    <div className="space-y-2 text-gray-300 responsive-text">
                      <p><strong>Order ID:</strong> {orderResult.id}</p>
                      <p><strong>Email:</strong> {orderResult.email}</p>
                      <p><strong>Plan:</strong> {orderResult.plan}</p>
                      <p><strong>Amount:</strong> {orderResult.amount}</p>
                      <p><strong>Date:</strong> {new Date(orderResult.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 responsive-text">Current Status</h3>
                    <Badge className={`${getStatusColor(orderResult.status)} px-3 py-2 text-sm flex items-center w-fit`}>
                      {getStatusIcon(orderResult.status)}
                      <span className="ml-2 capitalize">{orderResult.status}</span>
                    </Badge>
                  </div>
                </div>

                {/* Status Timeline */}
                <div>
                  <h3 className="font-semibold mb-4 responsive-text">Order Timeline</h3>
                  <div className="space-y-4">
                    <div className={`flex items-center p-3 rounded-lg ${orderResult.status === 'completed' ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-800'}`}>
                      <CheckCircle className={`w-5 h-5 mr-3 ${orderResult.status === 'completed' ? 'text-green-500' : 'text-gray-500'}`} />
                      <div>
                        <p className="font-semibold responsive-text">Payment Completed</p>
                        <p className="text-xs text-gray-400">Order confirmed and payment processed</p>
                      </div>
                    </div>
                    <div className={`flex items-center p-3 rounded-lg ${['processing', 'completed'].includes(orderResult.status) ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-gray-800'}`}>
                      <Clock className={`w-5 h-5 mr-3 ${['processing', 'completed'].includes(orderResult.status) ? 'text-yellow-500' : 'text-gray-500'}`} />
                      <div>
                        <p className="font-semibold responsive-text">Account Activation</p>
                        <p className="text-xs text-gray-400">Setting up your IPTV access</p>
                      </div>
                    </div>
                    <div className={`flex items-center p-3 rounded-lg ${orderResult.status === 'completed' ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-800'}`}>
                      <Mail className={`w-5 h-5 mr-3 ${orderResult.status === 'completed' ? 'text-green-500' : 'text-gray-500'}`} />
                      <div>
                        <p className="font-semibold responsive-text">Credentials Sent</p>
                        <p className="text-xs text-gray-400">Login details delivered to your email</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-700">
                  {orderResult.status === 'completed' && (
                    <Button className="bg-green-600 hover:bg-green-700 text-white mobile-button-lg">
                      <Mail className="w-4 h-4 mr-2" />
                      Resend Login Details
                    </Button>
                  )}
                  <Button 
                    onClick={handleContactSupport}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-700 mobile-button-lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="mobile-card bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-500 responsive-subtitle text-center">
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="responsive-text text-gray-300">
                Can&apos;t find your order or need assistance? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleContactSupport}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mobile-button-lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat Support
                </Button>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm text-gray-400">
                  <span>📧 support@futurawatch.com</span>
                  <span className="hidden sm:inline">•</span>
                  <span>⚡ Response time: Under 30 minutes</span>
                  <span className="hidden sm:inline">•</span>
                  <span>🌍 Available 24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}