'use client'

import { CloudinaryImage } from '@/app/gallery/cloudinary-image'
import type { SearchResult } from '@/app/gallery/page'
import { ReactNode } from 'react'

const MAX_COLUMNS = 4

export const ImageGrid = ({
  images,
  getImage,
}: {
  images: SearchResult[]
  getImage: (imageData: SearchResult) => ReactNode
}) => {
  function getColumns(colIndex: number) {
    console.log(images)
    return images.filter((resource, idx) => idx % MAX_COLUMNS === colIndex)
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
        (column, idx) => (
          <div key={idx} className="flex flex-col gap-4">
            {column.map(getImage)}
          </div>
        ),
      )}
    </div>
  )
}
