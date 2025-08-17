import UploadButton from './upload-button'
import cloudinary from 'cloudinary'
import { CloudinaryImage } from './cloudinary-image'

export type SearchResult = {
  public_id: string
  tags: string[]
}

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression('resource_type:image')
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(30)
    .execute()) as { resources: SearchResult[] }

  const MAX_COLUMNS = 4

  function getColumns(colIndex: number) {
    return results.resources.filter(
      (resource, idx) => idx % MAX_COLUMNS === colIndex,
    )
  }

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
            (column, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                {column.map((result) => (
                  <CloudinaryImage
                    key={result.public_id}
                    imageData={result}
                    width="400"
                    height="300"
                    alt="an image of something"
                  />
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
