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
      bunnyData.encodeProgress || 0

    const ready =
      bunnyData.status === 3

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

        title:
          bunnyData.title || null,
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