import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    /*
      AUTH
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
      FORM DATA
    */

    const formData = await req.formData()

    const file = formData.get("file") as File

    const title =
      (formData.get("title") as string) ||
      file.name

    const description =
      (formData.get(
        "description"
      ) as string) || ""

    const price = Number(
      formData.get("price") || 0
    )

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    /*
      CREATE VIDEO ON BUNNY
    */

    const createVideoRes = await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos`,
      {
        method: "POST",
        headers: {
          AccessKey:
            process.env.BUNNY_API_KEY!,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }
    )

    if (!createVideoRes.ok) {
      throw new Error(
        "Failed to create Bunny video"
      )
    }

    const bunnyVideo =
      await createVideoRes.json()

    /*
      UPLOAD FILE TO BUNNY
    */

    const uploadRes = await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos/${bunnyVideo.guid}`,
      {
        method: "PUT",
        headers: {
          AccessKey:
            process.env.BUNNY_API_KEY!,
          "Content-Type":
            "application/octet-stream",
        },
        body: file,
      }
    )

    if (!uploadRes.ok) {
      throw new Error(
        "Bunny upload failed"
      )
    }

    /*
      SAVE VIDEO ROW
    */

    const { data, error } =
      await supabase
        .from("videos")
        .insert({
          creator_id: user.id,

          bunny_video_id:
            bunnyVideo.guid,

          title,

          description,

          price,

          thumbnail_url: null,

          duration: null,
        })
        .select()
        .single()

    if (error) {
      console.error(error)

      return NextResponse.json(
        {
          error:
            "Failed to insert video",
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,

      video: data,
    })
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          error.message ||
          "Upload failed",
      },
      { status: 500 }
    )
  }
}