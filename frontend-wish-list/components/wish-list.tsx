"use client"

interface WishListProps {
  wishes: string[]
  theme: "classic" | "snow" | "aurora" | "gingerbread"
}

export default function WishList({ wishes, theme }: WishListProps) {
  const getVerdictForWish = (wish: string): "NICE" | "NAUGHTY" => {
    // Simple sentiment-based logic
    const naughtyKeywords = ["hurt", "bad", "evil", "destroy", "steal"]
    const hasNaughtyKeyword = naughtyKeywords.some((keyword) => wish.toLowerCase().includes(keyword))
    return hasNaughtyKeyword ? "NAUGHTY" : "NICE"
  }

  if (wishes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl italic" style={{ color: "#8b6f47" }}>
          No wishes yet. Add one to get started!
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6" style={{ color: "#2d5016" }}>
        Your Wishes ✨
      </h3>

      <div className="space-y-4">
        {wishes.map((wish, index) => {
          const verdict = getVerdictForWish(wish)
          const isNice = verdict === "NICE"

          return (
            <div
              key={index}
              className="p-4 rounded-lg border-2 flex items-start gap-4"
              style={{
                borderColor: "#d4af37",
                backgroundColor: theme === "aurora" ? "#e8f4f8" : "#fff9f0",
              }}
            >
              <div
                className="text-2xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center rounded"
                style={{
                  backgroundColor: "#d4af37",
                  color: "#3d2817",
                }}
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <p className="text-lg mb-2" style={{ color: "#3d2817" }}>
                  {wish}
                </p>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#8b6f47" }}>Santa's verdict:</span>
                  <span
                    className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 ${
                      isNice ? "text-white" : "text-white"
                    }`}
                    style={{
                      backgroundColor: isNice ? "#2d5016" : "#c41e3a",
                    }}
                  >
                    {isNice ? "✓" : "🔥"} {verdict}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
