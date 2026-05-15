import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const file = formData.get('video') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `${Date.now()}-${file.name}`

    const storageZone = process.env.BUNNY_STORAGE_ZONE
    const storagePassword = process.env.BUNNY_STORAGE_PASSWORD
    const region = process.env.BUNNY_REGION

    const bunnyBaseUrl = region
  ? `https://${region}.storage.bunnycdn.com`
  : `https://storage.bunnycdn.com`

    const bunnyUrl = `${bunnyBaseUrl}/${storageZone}/${fileName}`

    await axios.put(bunnyUrl, buffer, {
      headers: {
        AccessKey: storagePassword,
        'Content-Type': file.type,
      },
      maxBodyLength: Infinity,
    })

    return NextResponse.json({
      success: true,
      fileName,
      bunnyUrl,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}