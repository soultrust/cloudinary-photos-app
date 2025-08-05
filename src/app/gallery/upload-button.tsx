'use client'

import { CldUploadButton, CldImage } from 'next-cloudinary'
import { UploadResult } from '../page'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const UploadButton = () => {
  const router = useRouter()

  return (
    <Button asChild>
      <CldUploadButton
        onSuccess={(result: UploadResult) => {
          setTimeout(() => {
            router.refresh()
          }, 1000)
        }}
        uploadPreset="soultrust-img-gallery"
      >
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <span>Upload</span>
        </div>
      </CldUploadButton>
    </Button>
  )
}

export default UploadButton
