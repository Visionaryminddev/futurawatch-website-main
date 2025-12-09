"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <Card className="bg-gray-900 border-gray-800 max-w-md w-full">
            <CardHeader className="text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle className="text-yellow-500">Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-400">We encountered an unexpected error. Please try refreshing the page.</p>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="text-left">
                  <summary className="cursor-pointer text-yellow-500 mb-2">Error Details</summary>
                  <pre className="text-xs text-red-400 bg-black p-2 rounded overflow-auto">
                    {this.state.error.message}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <div className="flex gap-2 justify-center">
                <Button onClick={this.resetError} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={() => window.location.reload()} variant="outline" className="border-gray-600">
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
