'use client'

import { useState } from 'react'

export default function CreatorUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]

    setSelectedFile(file)
    setMessage('')
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a video file.')
      return
    }

    try {
      setIsUploading(true)
      setMessage('Uploading...')

      const formData = new FormData()
      formData.append('video', selectedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setMessage('Upload successful!')
      setSelectedFile(null)
    } catch (error: any) {
      setMessage(error.message || 'Something went wrong.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-full max-w-xl rounded-2xl border border-gray-800 bg-black p-6 text-white">
      <h2 className="mb-4 text-2xl font-bold">
        Upload VR Video
      </h2>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-4 block w-full"
      />

      {selectedFile && (
        <p className="mb-4 text-sm text-gray-400">
          {selectedFile.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="rounded-lg bg-white px-4 py-2 text-black"
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-300">
          {message}
        </p>
      )}
    </div>
  )
}