import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(
  req: Request,
  { params }: { params: { width: string; height: string } }
) {
  const width = Number(params.width) || 300
  const height = Number(params.height) || 300

  const filePath = path.join(process.cwd(), 'public', 'no-image.jpg')
  const fileBuffer = await readFile(filePath)

  const resized = await sharp(fileBuffer)
    .resize(width, height)
    .jpeg()
    .toBuffer()

  return new NextResponse(new Uint8Array(resized), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000',
    },
  })
}
