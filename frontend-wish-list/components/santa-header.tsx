"use client"

export default function SantaHeader() {
  return (
    <div className="relative z-20 pt-8 text-center">
      <div className="flex justify-center mb-6">
        <div
          className="w-64 h-64 rounded-full flex items-center justify-center border-8 shadow-lg overflow-hidden"
          style={{
            borderColor: "#d4af37",
            backgroundColor: "#f5ebe0",
          }}
        >
          <img src="/images/santa.png" alt="Cool Santa with sunglasses" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
