import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    /*
      AUTH USER
    */

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    /*
      GET FILE
    */

    const formData = await req.formData()

    const file = formData.get("file") as File

    const title = formData.get("title") as string

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    /*
      CREATE BUNNY VIDEO
    */

    const createVideoRes = await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos`,
      {
        method: "POST",
        headers: {
          AccessKey: process.env.BUNNY_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }
    )

    const bunnyVideo = await createVideoRes.json()

    /*
      UPLOAD FILE TO BUNNY
    */

    const uploadRes = await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos/${bunnyVideo.guid}`,
      {
        method: "PUT",
        headers: {
          AccessKey: process.env.BUNNY_API_KEY!,
          "Content-Type": "application/octet-stream",
        },
        body: file,
      }
    )

    if (!uploadRes.ok) {
      throw new Error("Upload failed")
    }

    /*
      SAVE TO SUPABASE
    */
    const { data: videoRow, error } =
      await supabase
        .from("videos")
        .insert({
          creator_id: user.id,

          bunny_video_id: bunnyVideo.guid,

          title,

          status: "processing",
        })
        .select()
        .single()

    if (error) {
      console.error(error)

      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      )
    }

    /*
      SUCCESS
    */

    return NextResponse.json({
      success: true,

      bunnyVideoId: bunnyVideo.guid,

      video: videoRow,
    })
} catch (error: any) {
  console.error("UPLOAD API ERROR:")
  console.error(error)

  return NextResponse.json(
    {
      error: error.message || "Upload failed",
    },
    { status: 500 }
  )
}
}