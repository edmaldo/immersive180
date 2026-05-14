'use client'

import Link from 'next/link'

export default function UploadButton() {
  return (
    <Link
      href="/upload"
      className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
    >
      Upload Video
    </Link>
  )
}