"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function CompleteProfileModal({
  userId,
  email,
}: {
  userId: string
  email: string
}) {
    
    const supabase = createClient()
    
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)

    await supabase.from("profiles").insert({
      id: userId,
      full_name: name,
      email,
    })

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black p-8">
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Welcome to Immersive180
        </h2>

        <p className="mb-6 text-sm text-zinc-400">
          What should we call you?
        </p>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-xl border border-white/10 bg-zinc-900 p-3 text-white outline-none"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:opacity-90"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  )
}