"use client"

interface ThemeSelectorProps {
  currentTheme: "classic" | "snow" | "aurora" | "gingerbread"
  onThemeChange: (theme: "classic" | "snow" | "aurora" | "gingerbread") => void
  spiritPercentage: number
}

interface ThemeInfo {
  name: string
  icon: string
  unlocksAt: number
  description: string
}

const themes: Record<"classic" | "snow" | "aurora" | "gingerbread", ThemeInfo> = {
  classic: {
    name: "Classic",
    icon: "🎄",
    unlocksAt: 0,
    description: "The timeless Christmas tree",
  },
  snow: {
    name: "Snow",
    icon: "❄️",
    unlocksAt: 20,
    description: "Unlock at 20% spirit",
  },
  aurora: {
    name: "Aurora",
    icon: "🌌",
    unlocksAt: 60,
    description: "Unlock at 60% spirit",
  },
  gingerbread: {
    name: "Gingerbread",
    icon: "🍪",
    unlocksAt: 100,
    description: "Unlock at 100% spirit",
  },
}

export default function ThemeSelector({ currentTheme, onThemeChange, spiritPercentage }: ThemeSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4" style={{ color: "#2d5016" }}>
        Theme Unlocking System
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.keys(themes) as Array<"classic" | "snow" | "aurora" | "gingerbread">).map((themeKey) => {
          const theme = themes[themeKey]
          const isUnlocked = spiritPercentage >= theme.unlocksAt
          const isSelected = currentTheme === themeKey

          return (
            <button
              key={themeKey}
              onClick={() => isUnlocked && onThemeChange(themeKey)}
              disabled={!isUnlocked}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                isSelected ? "ring-2 ring-offset-2" : ""
              } ${isUnlocked ? "cursor-pointer hover:shadow-lg" : "opacity-50 cursor-not-allowed"}`}
              style={{
                borderColor: isSelected ? "#2d5016" : "#d4af37",
                backgroundColor: isUnlocked ? "#fff9f0" : "#f0f0f0",
                color: isUnlocked ? "#3d2817" : "#999",
                ringColor: "#2d5016",
              }}
            >
              <div className="text-3xl mb-2">{theme.icon}</div>
              <div className="font-bold text-sm">{theme.name}</div>
              <div className="text-xs">
                {isUnlocked ? (
                  <span style={{ color: "#2d5016" }}>✓ Unlocked</span>
                ) : (
                  <span>Unlock at {theme.unlocksAt}%</span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
