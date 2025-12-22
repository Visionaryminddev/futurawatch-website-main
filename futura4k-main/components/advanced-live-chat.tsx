"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export function AdvancedLiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for contacting FuturaWatch! How can we help you today?",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputValue("")
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 border border-gray-700 rounded-lg shadow-xl w-80 h-96">
          <div className="bg-yellow-500 p-3 rounded-t-lg flex items-center justify-between">
            <div className="font-semibold text-black">FuturaWatch Support</div>
            <button onClick={() => setIsOpen(false)} className="text-black">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${message.isBot ? "bg-gray-800 text-white" : "bg-yellow-500 text-black"}`}
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
                className="flex-1 bg-gray-800 text-white px-3 py-2 rounded text-sm focus:outline-none"
              />
              <Button onClick={handleSendMessage} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </>
  )
}

export default AdvancedLiveChat
