'use client'

import { Heart } from '@/components/icons/heart'
import { CldImage, CldImageProps } from 'next-cloudinary'
import { setAsFavoriteAction } from './actions'
import { useState, useTransition } from 'react'
import { SearchResult } from './page'
import { FullHeart } from '@/components/icons/full-heart'

export function CloudinaryImage(
  props: {
    imagedata: SearchResult
    onUnheart?: (unheartedResource: SearchResult) => void
  } & Omit<CldImageProps, 'src'>,
) {
  const [transition, startTransition] = useTransition()
  const { imagedata, onUnheart } = props
  const [isFavorited, setIsFavorited] = useState(
    imagedata.tags.includes('favorite'),
  )
  return (
    <div className="relative">
      <CldImage {...props} src={imagedata.public_id} />
      {isFavorited ? (
        <FullHeart
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
          onClick={() => {
            onUnheart?.(imagedata)
            setIsFavorited(false)
            startTransition(() => {
              setAsFavoriteAction(imagedata.public_id, false)
            })
          }}
        />
      ) : (
        <Heart
          className="absolute top-2 right-2 hover:color-red-500 cursor-pointer"
          onClick={() => {
            setIsFavorited(true)
            startTransition(() => {
              setAsFavoriteAction(imagedata.public_id, true)
            })
          }}
        />
      )}
    </div>
  )
}
