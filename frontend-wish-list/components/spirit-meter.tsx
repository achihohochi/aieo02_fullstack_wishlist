"use client"

interface SpiritMeterProps {
  percentage: number
}

export default function SpiritMeter({ percentage }: SpiritMeterProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold" style={{ color: "#2d5016" }}>
          Christmas Spirit Meter
        </h3>
        <span className="text-lg font-bold" style={{ color: "#2d5016" }}>
          {Math.round(percentage)}%
        </span>
      </div>

      <div
        className="w-full h-8 rounded-full border-2 relative overflow-hidden"
        style={{ borderColor: "#d4af37", backgroundColor: "#fff9f0" }}
      >
        <div
          className="h-full bg-gradient-to-r transition-all duration-500 flex items-center justify-center"
          style={{
            width: `${percentage}%`,
            backgroundImage: "linear-gradient(to right, #2d5016, #4a7c2c)",
          }}
        >
          {/* Sparkle elements */}
          {Array.from({ length: Math.ceil(percentage / 10) }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${(i + 1) * (10 / (Math.ceil(percentage / 10) + 1)) * 10}%`,
                animation: "sparkle 0.6s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
