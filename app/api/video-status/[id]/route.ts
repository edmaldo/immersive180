import { NextRequest, NextResponse } from "next/server"

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
    const res = await fetch(
      `https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos/${id}`,
      {
        headers: {
          AccessKey:
            process.env.BUNNY_API_KEY!,
        },

        cache: "no-store",
      }
    )

    const data = await res.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch Bunny status",
      },
      { status: 500 }
    )
  }
}