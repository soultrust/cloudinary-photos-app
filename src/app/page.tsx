'use client'

import { CldImage, CldUploadButton } from 'next-cloudinary'
import { useState } from 'react'

type UploadResult = {
  info: {
    public_id: string
  }
  event: 'success'
}

export default function Home() {
  const [imageId, setImageId] = useState('')

  return (
    <main className="flex min-h-screen flex-col justify-center row-start-2 items-center">
      <CldUploadButton uploadPreset="soultrust-img-gallery" />
      {imageId && (
        <CldImage
          onSuccess={(result: UploadResult) => {
            setImageId(result.info.public_id)
          }}
          width="400"
          height="300"
          src={imageId}
          sizes="100vw"
          alt="description of image"
        />
      )}
    </main>
  )
}
