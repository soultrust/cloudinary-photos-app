'use client'
import { Heart } from '@/components/icons/heart'
import { CldImage } from 'next-cloudinary'
import { setAsFavoriteAction } from './actions'
import { useTransition } from 'react'
import { SearchResult } from './page'
import { FullHeart } from '@/components/icons/full-heart'

export function CloudinaryImage(
  props: any & { imageData: SearchResult; path: string },
) {
  const [transition, startTransition] = useTransition()
  const { imagedata } = props
  const isFavorited = imagedata.tags.includes('favorite')
  return (
    <div className="relative">
      <CldImage {...props} src={imagedata.public_id} />
      {isFavorited ? (
        <FullHeart
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
          onClick={() => {
            startTransition(() => {
              setAsFavoriteAction(imagedata.public_id, false, props.path)
            })
          }}
        />
      ) : (
        <Heart
          className="absolute top-2 right-2 hover:color-red-500 cursor-pointer"
          onClick={() => {
            startTransition(() => {
              setAsFavoriteAction(imagedata.public_id, true, props.path)
            })
          }}
        />
      )}
    </div>
  )
}
