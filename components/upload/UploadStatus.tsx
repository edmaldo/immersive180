"use client"

import {
  Loader2,
  CheckCircle2,
  X,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

import { useRouter } from "next/navigation"

interface UploadStatusProps {
  videoId: string
  title: string
  initialStatus?: string
  onClose?: () => void
}

export default function UploadStatus({
  videoId,
  title,
  onClose,
}: UploadStatusProps) {

  const router = useRouter()
  
  const [progress, setProgress] =
    useState(0)

  const [ready, setReady] =
    useState(false)

  const [thumbnail, setThumbnail] =
    useState<string | null>(null)

  const [duration, setDuration] =
    useState<string>("00:00")

  useEffect(() => {
    let interval: NodeJS.Timeout

    async function pollStatus() {
      try {
        const res = await fetch(
          `/api/video-status/${videoId}`,
          {
            cache: "no-store",
          }
        )

        const data =
          await res.json()

        console.log(
          "BUNNY STATUS:",
          data
        )

        /*
          PROGRESS
        */

        const currentProgress =
          Number(
            data.encodeProgress || 0
          )

        setProgress(currentProgress)

        /*
          THUMBNAIL
        */

        setThumbnail(
          data.thumbnailUrl || null
        )

        /*
          DURATION
        */

        const totalSeconds =
          Math.floor(
            data.duration || 0
          )

        const mins =
          Math.floor(
            totalSeconds / 60
          )

        const secs =
          totalSeconds % 60

        setDuration(
          `${String(mins).padStart(
            2,
            "0"
          )}:${String(secs).padStart(
            2,
            "0"
          )}`
        )

        /*
          READY
        */

        if (
          currentProgress >= 100
        ) {
          setReady(true)

          setProgress(100)

          clearInterval(interval)
        }
      } catch (err) {
        console.error(err)
      }
    }

    pollStatus()

    interval = setInterval(
      pollStatus,
      3000
    )

    return () =>
      clearInterval(interval)
  }, [videoId])

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] shadow-2xl">
      {/* TOP BAR */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Upload Status
          </h2>

          <p className="text-sm text-zinc-500">
            {ready
              ? "Video processing completed"
              : "Encoding your video"}
          </p>
        </div>

        {ready && (
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <X className="h-4 w-4" />

            Close Window
          </button>
        )}
      </div>

      {/* VIDEO */}
      <div className="aspect-video bg-black">
        {ready ? (
          <iframe
            src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${videoId}`}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          />
            ) : (
              <img
                src={thumbnail || "/placeholders/immersive180_tn.png"}
                alt={title}
                className="h-full w-full object-cover opacity-80"
              />
            )}
      </div>

      {/* CONTENT */}
      <div className="space-y-6 p-8">
        {/* STATUS */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {ready ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
            )}

            <span className="font-medium text-white">
              {ready
                ? "Video Ready"
                : "Processing Video"}
            </span>
          </div>

          <span className="text-sm font-medium text-zinc-300">
            {progress}%
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="relative h-4 overflow-hidden rounded-full bg-zinc-800">
          {/* glow */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-violet-500/30 blur-md transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

          {/* actual bar */}
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* META */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-sm text-zinc-500">
              Title
            </p>

            <p className="mt-2 font-medium text-white">
              {title}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-sm text-zinc-500">
              Duration
            </p>

            <p className="mt-2 font-medium text-white">
              {duration}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}