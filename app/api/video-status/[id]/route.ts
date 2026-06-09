import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params

  try {
    /*
      FETCH FROM BUNNY
    */

    const bunnyRes = await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos/${id}`,
      {
        headers: {
          AccessKey:
            process.env.BUNNY_API_KEY!,
        },

        cache: "no-store",
      }
    )

    if (!bunnyRes.ok) {
      throw new Error(
        "Failed Bunny fetch"
      )
    }

    const bunnyData =
      await bunnyRes.json()

    /*
      STATUS INFO
    */

      const encodeProgress =
        Number(
          bunnyData.encodeProgress || 0
        )

      const ready =
        encodeProgress >= 100

    /*
      THUMBNAIL
    */

    const thumbnailUrl = `https://vz-${process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID}.b-cdn.net/${id}/thumbnail.jpg`

    /*
      UPDATE SUPABASE
    */

    const supabase =
      await createClient()

      await supabase
        .from("videos")
        .update({
          duration:
            bunnyData.length || null,

          thumbnail_url:
            thumbnailUrl,

          status: ready
            ? "uploaded"
            : "processing",
        })
        .eq(
          "bunny_video_id",
          id
        )

    return NextResponse.json({
      ready,

      status: bunnyData.status,

      encodeProgress,

      duration:
        bunnyData.length,

      thumbnailUrl,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch status",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {
  const { id } = await params

  try {
    const body =
      await req.json()

    const {
      title,
      description,
      price,
    } = body

    const supabase =
      await createClient()

    /*
      UPDATE DATABASE
    */

    const { error } =
      await supabase
        .from("videos")
        .update({
          title,
          description,
          price,
          status: "processing",
        })
        .eq(
          "bunny_video_id",
          id
        )

    if (error) {
      console.error(error)

      return NextResponse.json(
        {
          error:
            "Failed updating video",
        },
        {
          status: 500,
        }
      )
    }

    /*
      UPDATE BUNNY TITLE
    */

    await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos/${id}`,
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

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        error:
          "Failed updating metadata",
      },
      {
        status: 500,
      }
    )
  }
}