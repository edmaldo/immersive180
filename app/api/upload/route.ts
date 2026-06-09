import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const BUNNY_LIBRARY_ID =
  process.env.BUNNY_LIBRARY_ID!

const BUNNY_API_KEY =
  process.env.BUNNY_API_KEY!

export async function POST(req: Request) {
  const supabase =
  await createClient()

const {
  data: { user },
} = await supabase.auth.getUser()

if (!user) {
  return NextResponse.json(
    {
      error: "Unauthorized",
    },
    {
      status: 401,
    }
  )
}
  try {
    const formData =
      await req.formData()

    const file =
      formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      )
    }

    /*
      STEP 1:
      CREATE VIDEO OBJECT
    */

    const createRes = await fetch(
      `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos`,
      {
        method: "POST",
        headers: {
          AccessKey:
            BUNNY_API_KEY,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title: file.name,
        }),
      }
    )

    const bunnyVideo =
      await createRes.json()

    const videoId =
      bunnyVideo.guid

    /*
      STEP 2:
      UPLOAD VIDEO FILE
    */

    const uploadRes = await fetch(
      `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos/${videoId}`,
      {
        method: "PUT",
        headers: {
          AccessKey:
            BUNNY_API_KEY,
          "Content-Type":
            "application/octet-stream",
        },
        body: await file.arrayBuffer(),
      }
    )

    if (!uploadRes.ok) {
      return NextResponse.json(
        {
          error:
            "Failed uploading to Bunny",
        },
        {
          status: 500,
        }
      )
    }

    /*
      STEP 3:
      CREATE SUPABASE ROW
    */

    const { data, error } =
      await supabase
        .from("videos")
        .insert({
          creator_id: user.id,

          bunny_video_id:
            videoId,

          title: file.name,

          description: "",

          price: 0,

          status: "uploading",
        })
        .select()
        .single()

    if (error) {
      console.error(error)

      return NextResponse.json(
        {
          error:
            "Failed creating DB row",
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      success: true,
      video: data,
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    )
  }
}