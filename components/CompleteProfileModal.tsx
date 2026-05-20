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

  const [open, setOpen] = useState(true)
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  async function handleSave() {
    try {
      setLoading(true)

      let avatarUrl: string | null = null

      // Upload avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop()
        const fileName = `${userId}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile, {
            upsert: true,
          })

        if (uploadError) {
          console.error(uploadError)
        } else {
          const {
            data: { publicUrl },
          } = supabase.storage
            .from("avatars")
            .getPublicUrl(fileName)

          avatarUrl = publicUrl
        }
      }

      // Upsert profile
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          full_name: name,
          email,
          avatar_url: avatarUrl,
        })

      if (error) {
        console.error(error)
        return
      }

      setOpen(false)

      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function handleSkip() {
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black p-8 shadow-2xl">
        <h2 className="mb-2 text-2xl font-semibold text-white">
          Welcome to Immersive180
        </h2>

        <p className="mb-6 text-sm text-zinc-400">
          Complete your profile to continue.
        </p>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-5 w-full rounded-xl border border-white/10 bg-zinc-900 p-3 text-white outline-none transition focus:border-violet-500"
        />

        {/* Avatar Upload */}
        <div className="mb-6 flex items-center gap-4">
          <label className="cursor-pointer rounded-xl border border-violet-500/30 bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20">
            Upload Profile Image

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setAvatarFile(e.target.files?.[0] || null)
              }
            />
          </label>

          <button
            type="button"
            onClick={handleSkip}
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Skip for now
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  )
}