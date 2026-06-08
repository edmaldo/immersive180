"use client"

import {
  CheckCircle2,
  Loader2,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function UploadStatus({
  videoId,
  title,
  initialStatus,
}: {
  videoId: string
  title: string
  initialStatus: string
}) {
  const [progress, setProgress] =
    useState(0)

  const [ready, setReady] =
    useState(false)

useEffect(() => {
  let interval: NodeJS.Timeout

  async function fetchStatus() {
    try {
      const res = await fetch(
        `/api/video-status/${videoId}`
      )

      const data = await res.json()

      const currentProgress =
        data.encodeProgress || 0

      setProgress(currentProgress)

      const finished =
        data.status === 3 ||
        currentProgress >= 100

      if (finished) {
        setReady(true)

        /*
          STOP POLLING
        */

        clearInterval(interval)

        return
      }
    } catch (err) {
      console.error(err)
    }
  }

  /*
    INITIAL FETCH
  */

  fetchStatus()

  /*
    START POLLING
  */

  interval = setInterval(
    fetchStatus,
    3000
  )

  /*
    CLEANUP
  */

  return () => clearInterval(interval)
}, [videoId])

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950">
      {/* PLAYER */}
      <div className="aspect-video bg-black">
        {ready ? (
          <iframe
            src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}/${videoId}`}
            loading="lazy"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <Loader2 className="mb-5 h-12 w-12 animate-spin text-violet-400" />

            <h2 className="text-2xl font-semibold">
              Encoding Video
            </h2>

            <p className="mt-2 text-zinc-500">
              Bunny.net is processing
              your immersive video.
            </p>
          </div>
        )}
      </div>

      {/* STATUS */}
      <div className="p-8">
        <div className="mb-4 flex items-center justify-between">
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

          <span className="text-zinc-400">
            {progress}%
          </span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-violet-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* INFO */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-5">
            <p className="text-sm text-zinc-500">
              Video Title
            </p>

            <p className="mt-2 font-medium">
              {title}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-5">
            <p className="text-sm text-zinc-500">
              Status
            </p>

            <p className="mt-2 font-medium capitalize">
              {ready
                ? "ready"
                : initialStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}