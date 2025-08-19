'use client'

import { Heart } from '@/components/icons/heart'
import { CldImage, CldImageProps } from 'next-cloudinary'
import { setAsFavoriteAction } from '../app/gallery/actions'
import { useState, useTransition } from 'react'
import { SearchResult } from '../app/gallery/page'
import { FullHeart } from '@/components/icons/full-heart'
import { ImageMenu } from './image-menu'

export function CloudinaryImage(
  props: {
    imageData: SearchResult
    onUnheart?: (unheartedResource: SearchResult) => void
  } & Omit<CldImageProps, 'src'>,
) {
  const [transition, startTransition] = useTransition()
  const { width, height, alt, imageData, onUnheart } = props
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes('favorite'),
  )

  return (
    <div className="relative">
      <CldImage
        src={imageData.public_id}
        width={width}
        height={height}
        alt={alt}
      />
      {isFavorited ? (
        <FullHeart
          className="absolute top-2 left-2 hover:text-white text-red-500 cursor-pointer"
          onClick={() => {
            onUnheart?.(imageData)
            setIsFavorited(false)
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false)
            })
          }}
        />
      ) : (
        <Heart
          className="absolute top-2 left-2 hover:color-red-500 cursor-pointer"
          onClick={() => {
            setIsFavorited(true)
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true)
            })
          }}
        />
      )}
      <ImageMenu image={imageData} />
    </div>
  )
}
