"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SantaHeader from "@/components/santa-header"
import WishList from "@/components/wish-list"
import SantaChat from "@/components/santa-chat"
import ThemeSelector from "@/components/theme-selector"
import SpiritMeter from "@/components/spirit-meter"
import Snowflakes from "@/components/snowflakes"

export default function Home() {
  const [wishes, setWishes] = useState<string[]>([])
  const [wishInput, setWishInput] = useState("")
  const [theme, setTheme] = useState<"classic" | "snow" | "aurora" | "gingerbread">("classic")

  const spiritPercentage = Math.min((wishes.length / 5) * 100, 100)

  const handleAddWish = () => {
    if (wishInput.trim()) {
      setWishes([...wishes, wishInput])
      setWishInput("")
    }
  }

  return (
    <div style={{ backgroundColor: "#3d2817" }} className="min-h-screen relative overflow-x-hidden">
      <Snowflakes />

      <div className="relative z-10">
        <SantaHeader />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Main content area with parchment scroll effect */}
          <div className="relative">
            {/* Parchment background */}
            <div
              className="rounded-3xl border-8 relative shadow-2xl"
              style={{
                backgroundColor: "#f5ebe0",
                borderColor: "#d4af37",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.1)",
              }}
            >
              <div className="p-8 md:p-12">
                {/* Title Section */}
                <div className="text-center mb-8">
                  <h1 className="text-5xl md:text-6xl font-serif font-bold mb-2" style={{ color: "#2d5016" }}>
                    Crazy Dude's Magical Wish List
                  </h1>
                  <p className="text-xl italic" style={{ color: "#8b6f47" }}>
                    Write your wishes upon the enchanted scroll
                  </p>
                </div>

                {/* Spirit Meter */}
                <div className="mb-8">
                  <SpiritMeter percentage={spiritPercentage} />
                </div>

                {/* Theme Selector */}
                <div className="mb-8">
                  <ThemeSelector currentTheme={theme} onThemeChange={setTheme} spiritPercentage={spiritPercentage} />
                </div>

                {/* Wish Input */}
                <div className="flex gap-2 mb-8">
                  <Input
                    value={wishInput}
                    onChange={(e) => setWishInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddWish()}
                    placeholder="Type your Christmas wish here..."
                    className="flex-1 px-4 py-3 text-lg border-2"
                    style={{ borderColor: "#d4af37", color: "#3d2817" }}
                  />
                  <Button
                    onClick={handleAddWish}
                    className="px-6 font-bold text-lg"
                    style={{ backgroundColor: "#2d5016", color: "#f5ebe0" }}
                  >
                    +
                  </Button>
                </div>

                {/* Wish List */}
                <div className="mb-8">
                  <WishList wishes={wishes} theme={theme} />
                </div>

                {/* Complete List Button */}
                {wishes.length > 0 && (
                  <div className="text-center mb-8">
                    <Button
                      className="px-8 py-3 text-lg font-bold"
                      style={{ backgroundColor: "#c41e3a", color: "#f5ebe0" }}
                    >
                      Complete My List
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Santa Chat Section */}
          <div className="mt-12">
            <SantaChat />
          </div>
        </main>
      </div>
    </div>
  )
}
