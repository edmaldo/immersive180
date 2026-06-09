"use client"

import {
  Upload,
  X,
  Loader2,
  ImagePlus,
  Check,
} from "lucide-react"

import {
  useRef,
  useState,
  useEffect,
} from "react"

import { useRouter } from "next/navigation"

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)

  return `${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`
}

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

  const thumbnailInputRef =
    useRef<HTMLInputElement>(null)

  const [stage, setStage] = useState<
    "select" | "uploading"
  >("select")

  const [uploading, setUploading] =
    useState(false)

  const [progress, setProgress] =
    useState(0)

  const [title, setTitle] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [price, setPrice] =
    useState("")

  const [duration, setDuration] =
    useState("00:00")

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null)

  const [thumbnail, setThumbnail] =
    useState<string | null>(null)

  const [videoId, setVideoId] =
    useState<string | null>(null)

  useEffect(() => {
  if (open) {
    document.body.style.overflow =
      "hidden"
  } else {
    document.body.style.overflow =
      "auto"
  }

  return () => {
    document.body.style.overflow =
      "auto"
  }
}, [open])

  const canSubmit =
    title.trim() &&
    description.trim() &&
    price.trim()

  if (!open) return null

  async function extractDuration(
    file: File
  ) {
    return new Promise<number>(
      (resolve) => {
        const video =
          document.createElement(
            "video"
          )

        video.preload = "metadata"

        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(
            video.src
          )

          resolve(video.duration)
        }

        video.src =
          URL.createObjectURL(file)
      }
    )
  }

  async function handleFile(
    file: File
  ) {
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

    setSelectedFile(file)

    const localDuration =
      await extractDuration(file)

    setDuration(
      formatDuration(localDuration)
    )

    setTitle(
      file.name.replace(/\.[^/.]+$/, "")
    )

    setStage("uploading")

    uploadVideo(file)
  }

  async function uploadVideo(
    file: File
  ) {
    try {
      setUploading(true)

      const formData =
        new FormData()

      formData.append("file", file)

      const xhr =
        new XMLHttpRequest()

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
          alert(
            data.error ||
              "Upload failed"
          )

          return
        }

        setVideoId(
          data.video.bunny_video_id
        )

        setUploading(false)
      }

      xhr.onerror = () => {
        alert("Upload failed")
      }

      xhr.send(formData)
    } catch (err) {
      console.error(err)
    }
  }

  async function completeUpload() {
    if (!videoId) return

    const res = await fetch(
      `/api/video-status/${videoId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
        }),
      }
    )

    if (!res.ok) {
      alert(
        "Failed to save metadata"
      )

      return
    }

    router.push(
      `/dashboard/uploads/${videoId}`
    )
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 p-6 backdrop-blur-xl">
      <div className="relative mx-auto my-10 w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#111111] shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/5 px-8 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Upload VR
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Publish immersive 180°
              content
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SELECT SCREEN */}
        {stage === "select" && (
        <div className="flex items-center justify-center p-10">
          <button
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="group relative flex h-[50vh] min-h-[240px] w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-[42px] border border-dashed border-zinc-700 bg-gradient-to-br from-zinc-900 via-[#111111] to-black transition-all duration-300 hover:border-violet-500 hover:bg-zinc-900"
          >
            {/* GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-90" />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <Upload className="h-12 w-12 text-zinc-300" />
              </div>

              <h3 className="text-3xl font-semibold tracking-tight text-white">
                Drag & Drop VR Videos
              </h3>

              <p className="mt-3 text-base text-zinc-500">
                MP4 • MOV • VR180
              </p>
            </div>
          </button>
        </div>
        )}

        {/* UPLOAD STATUS SCREEN */}
        {stage === "uploading" && (
          <div className="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* LEFT */}
            <div>
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black">
                <div className="aspect-video">
                  {selectedFile && (
                    <video
                      src={URL.createObjectURL(
                        selectedFile
                      )}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* STATUS */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {uploading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
                    ) : (
                      <Check className="h-5 w-5 text-green-400" />
                    )}

                    <span className="font-medium text-white">
                      {uploading
                        ? "Encoding video..."
                        : "Upload complete"}
                    </span>
                  </div>

                  <span className="text-sm text-zinc-400">
                    {progress}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition focus:border-violet-500"
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition focus:border-violet-500"
                />

                <input
                  type="number"
                  placeholder="Price in Dollars"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none transition focus:border-violet-500"
                />

                {/* META */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-xs uppercase tracking-wide text-zinc-500">
                    Duration
                  </p>

                  <p className="mt-2 text-lg font-medium text-white">
                    {duration}
                  </p>
                </div>

                {/* THUMBNAIL */}
                <button
                  onClick={() =>
                    thumbnailInputRef.current?.click()
                  }
                  className="flex h-[140px] items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-white/[0.02] transition hover:border-violet-500"
                >
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt="thumbnail"
                      className="h-full w-full rounded-3xl object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <ImagePlus className="mx-auto mb-3 h-8 w-8 text-zinc-500" />

                      <p className="text-sm text-zinc-400">
                        Upload Thumbnail
                      </p>
                    </div>
                  )}
                </button>
              </div>

              {/* COMPLETE BUTTON */}
              <button
                disabled={!canSubmit}
                onClick={completeUpload}
                className={`mt-8 h-14 rounded-2xl text-sm font-semibold transition ${
                  canSubmit
                    ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:scale-[1.02]"
                    : "cursor-not-allowed bg-zinc-800 text-zinc-500"
                }`}
              >
                Complete Upload
              </button>
            </div>
          </div>
        )}

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

        <input
          ref={thumbnailInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file =
              e.target.files?.[0]

            if (file) {
              setThumbnail(
                URL.createObjectURL(file)
              )
            }
          }}
        />
      </div>
    </div>
  )
}