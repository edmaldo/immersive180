"use client"

import {
  Upload,
  X,
  Loader2,
} from "lucide-react"

import {
  useRef,
  useState,
} from "react"

import { useRouter } from "next/navigation"

export default function UploadModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()

  const fileInputRef =
    useRef<HTMLInputElement>(null)

  const [uploading, setUploading] =
    useState(false)

  const [progress, setProgress] =
    useState(0)

  const [title, setTitle] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [price, setPrice] =
    useState(0)

  if (!open) return null

  async function handleFile(
    file: File
  ) {
    try {
      setUploading(true)

      /*
        VALIDATION
      */

      if (
        !file.type.startsWith(
          "video/"
        )
      ) {
        alert(
          "Please upload a video file."
        )

        return
      }

      /*
        FORM DATA
      */

      const formData = new FormData()

      formData.append("file", file)

      formData.append(
        "title",
        title || file.name
      )

      formData.append(
        "description",
        description
      )

      formData.append(
        "price",
        String(price)
      )

      /*
        XHR FOR PROGRESS
      */

      const xhr = new XMLHttpRequest()

      xhr.open(
        "POST",
        "/api/upload"
      )

      xhr.upload.onprogress = (
        event
      ) => {
        if (
          event.lengthComputable
        ) {
          const percent =
            Math.round(
              (event.loaded /
                event.total) *
                100
            )

          setProgress(percent)
        }
      }

      xhr.onload = () => {
        const data = JSON.parse(
          xhr.responseText
        )

        if (xhr.status >= 400) {
          console.error(data)

          alert(
            data.error ||
              "Upload failed"
          )

          setUploading(false)

          return
        }

        /*
          REDIRECT
        */

        router.push(
          `/dashboard/uploads/${data.video.bunny_video_id}`
        )
      }

      xhr.onerror = () => {
        alert("Upload failed")

        setUploading(false)
      }

      xhr.send(formData)
    } catch (err) {
      console.error(err)

      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#1f1f1f]">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Upload VR Video
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-6 p-8">
          {/* DROPZONE */}
          <button
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={uploading}
            className="flex w-full flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-black/30 px-8 py-20 transition hover:border-violet-500"
          >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900">
              {uploading ? (
                <Loader2 className="h-10 w-10 animate-spin text-violet-400" />
              ) : (
                <Upload className="h-10 w-10 text-zinc-400" />
              )}
            </div>

            <h3 className="text-lg font-medium text-white">
              {uploading
                ? "Uploading Video..."
                : "Select Video"}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              MP4, MOV, VR180
            </p>
          </button>

          {/* PROGRESS */}
          {uploading && (
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>
                  Uploading to Bunny
                </span>

                <span>
                  {progress}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-violet-500 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* FORM */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Video title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3 text-white outline-none"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="min-h-[120px] w-full rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3 text-white outline-none"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full rounded-2xl border border-zinc-800 bg-black/30 px-4 py-3 text-white outline-none"
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="video/*"
            onChange={(e) => {
              const file =
                e.target.files?.[0]

              if (file) {
                handleFile(file)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}