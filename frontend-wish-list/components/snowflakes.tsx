"use client"

import { useEffect, useState } from "react"

interface Snowflake {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  swayAmount: number
}

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    const generateSnowflakes = () => {
      const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        swayAmount: Math.random() * 30 + 20,
      }))
      setSnowflakes(flakes)
    }

    generateSnowflakes()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animation: `falling-snow ${flake.duration}s linear ${flake.delay}s infinite, sway 3s ease-in-out ${flake.delay}s infinite`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  )
}
