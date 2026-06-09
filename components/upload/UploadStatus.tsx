"use client"

import {
  CheckCircle2,
  Loader2,
  Clock3,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

interface UploadStatusProps {
  videoId: string
  title: string
}

export default function UploadStatus({
  videoId,
  title,
}: UploadStatusProps) {
  const [progress, setProgress] =
    useState(0)

  const [ready, setReady] =
    useState(false)

  const [thumbnail, setThumbnail] =
    useState<string | null>(null)

  const [duration, setDuration] =
    useState<number | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    async function pollStatus() {
      try {
        const res = await fetch(
          `/api/video-status/${videoId}`
        )

        const data = await res.json()

        setProgress(
          data.encodeProgress || 0
        )

        setDuration(
          data.duration || null
        )

        setThumbnail(
          data.thumbnailUrl || null
        )

        if (data.ready) {
          setReady(true)

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
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
      {/* MEDIA */}
      <div className="aspect-video bg-black">
        {ready ? (
          <iframe
            src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${videoId}`}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
          />
        ) : thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover opacity-60"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="space-y-6 p-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {ready ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
            )}

            <span className="font-medium">
              {ready
                ? "Video Ready"
                : "Encoding Video"}
            </span>
          </div>

          <span className="text-sm text-zinc-400">
            {progress}%
          </span>
        </div>

        {/* PROGRESS */}
        <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* META */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-5">
            <p className="text-sm text-zinc-500">
              Video Title
            </p>

            <p className="mt-2 font-medium">
              {title}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-5">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Clock3 className="h-4 w-4" />

              Duration
            </div>

            <p className="mt-2 font-medium">
              {duration
                ? `${Math.floor(
                    duration / 60
                  )}:${String(
                    duration % 60
                  ).padStart(2, "0")}`
                : "Processing"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}