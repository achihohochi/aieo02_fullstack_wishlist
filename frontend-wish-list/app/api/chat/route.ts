import { type NextRequest, NextResponse } from "next/server"

interface ChatRequest {
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const { message } = (await request.json()) as ChatRequest

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    // Forward request to the backend FastAPI server
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8002"

    const response = await fetch(`${backendUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      console.error("Backend error:", await response.text())
      return NextResponse.json({ error: "Failed to get response from backend" }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
