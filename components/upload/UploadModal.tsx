"use client"

import { X, Upload } from "lucide-react"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function UploadModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploading, setUploading] = useState(false)

  const router = useRouter()

  if (!open) return null

  async function handleFileSelect(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setUploading(true)

      const formData = new FormData()

      formData.append("file", file)
      formData.append("title", file.name)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      /*
        Redirect to progress page
      */

      router.push(
        `/dashboard/uploads/${data.bunnyVideoId}`
      )
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-5xl rounded-3xl bg-[#1f1f1f] border border-white/10 overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Upload videos
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-col items-center justify-center py-28 px-8">
          <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-black/30">
            <Upload className="h-14 w-14 text-zinc-400" />
          </div>

          <h3 className="text-xl text-white font-medium mb-3">
            Drag and drop video files to upload
          </h3>

          <p className="text-zinc-500 mb-8 text-sm">
            Your videos will be private until published
          </p>

          <button
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={uploading}
            className="
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-medium
              text-black
              transition
              hover:bg-zinc-200
            "
          >
            {uploading
              ? "Uploading..."
              : "Select files"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            hidden
            onChange={handleFileSelect}
          />
        </div>
      </div>
    </div>
  )
}