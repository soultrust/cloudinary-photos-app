'use client'

import { CldUploadButton, CldImage } from 'next-cloudinary'
import { useState } from 'react'

export type UploadResult = {
  info: {
    public_id: string
  }
  event: 'success'
}

export default function Home() {
  const [imageId, setImageId] = useState(null)
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex min-h-screen justify-between p-24 items-center">
        <CldUploadButton
          className="text-white"
          onSuccess={(result: UploadResult) => {
            setImageId(result.info.public_id)
          }}
          uploadPreset="soultrust-img-gallery"
        />
        {imageId && (
          <CldImage
            width="400"
            height="300"
            src={imageId}
            sizes="100vw"
            alt="Description of my image"
          />
        )}
      </main>
    </div>
  )
}
