"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface Message {
  role: "user" | "santa"
  content: string
}

export default function SantaChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "santa",
      content: "Ho ho ho! Welcome to my workshop! I'm so glad you're here. What's on your mind this Christmas season?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      // Call the backend API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from Santa")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "santa", content: data.reply }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "santa",
          content:
            "Oh no! It seems my sleigh's communication system is having trouble. Ho ho ho, try again in a moment!",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      className="p-6 rounded-xl border-4"
      style={{
        backgroundColor: "#f5ebe0",
        borderColor: "#d4af37",
      }}
    >
      <h2 className="text-3xl font-bold mb-4" style={{ color: "#2d5016" }}>
        Chat with Santa 🎅
      </h2>

      <div
        className="mb-4 h-96 overflow-y-auto rounded-lg p-4 space-y-4"
        style={{
          backgroundColor: "#fff9f0",
          borderColor: "#d4af37",
          border: "2px solid #d4af37",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-xs px-4 py-2 rounded-lg"
              style={{
                backgroundColor: message.role === "user" ? "#2d5016" : "#c41e3a",
                color: "#f5ebe0",
              }}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: "#c41e3a", color: "#f5ebe0" }}>
              <span>Santa is typing</span>
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
          placeholder="Ask Santa a question..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 border-2"
          style={{ borderColor: "#d4af37", color: "#3d2817" }}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="px-6 font-bold"
          style={{ backgroundColor: "#2d5016", color: "#f5ebe0" }}
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </Card>
  )
}
