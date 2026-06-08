import { createClient } from "@/lib/supabase/server"

import UploadStatus from "@/components/upload/UploadStatus"

import { notFound } from "next/navigation"

export default async function UploadPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()

  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("bunny_video_id", id)
    .single()

  if (!video) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            {video.title}
          </h1>

          <p className="mt-3 text-zinc-400">
            Upload and processing status
          </p>
        </div>

        <UploadStatus
          videoId={video.bunny_video_id}
          title={video.title}
          initialStatus={video.status}
        />
      </div>
    </main>
  )
}