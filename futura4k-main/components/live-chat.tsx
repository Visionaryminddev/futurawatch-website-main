"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message! Our support team will get back to you shortly. How can we help you with FuturaWatch today?",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputValue("")
  }

  const openChat = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        text: "Welcome to FuturaWatch Support! How can we help you today?",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-[calc(100vw-2rem)] max-w-sm h-[70vh] max-h-96 sm:bottom-6 sm:right-6 sm:w-80 sm:h-96">
          <div className="bg-yellow-500 p-3 rounded-t-lg flex items-center justify-between">
            <div className="font-semibold text-black responsive-text">FuturaWatch Support</div>
            <button onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700 touch-element p-1">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="h-[calc(100%-8rem)] overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-2 rounded-lg responsive-text ${
                    message.isBot ? "bg-gray-800 text-white" : "bg-yellow-500 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded responsive-text focus:outline-none focus:ring-2 focus:ring-yellow-500"
                style={{ fontSize: '16px' }} // Prevents iOS zoom
              />
              <Button onClick={handleSendMessage} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black touch-element">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-4 right-4 z-50 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 touch-element sm:bottom-6 sm:right-6"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </>
  )
}

// Export both default and named export for compatibility
export default LiveChat
