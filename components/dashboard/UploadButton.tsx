"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

import UploadModal from "@/components/upload/UploadModal"

export default function UploadButton() {
  const [uploadModalOpen, setUploadModalOpen] =
    useState(false)

  return (
    <>
      <button
        onClick={() => setUploadModalOpen(true)}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-4
          py-3
          text-zinc-300
          transition
          hover:bg-zinc-900
          hover:text-white
        "
      >
        <Upload className="h-[18px] w-[18px]" />

        <span className="text-sm font-medium">
          Upload
        </span>
      </button>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </>
  )
}