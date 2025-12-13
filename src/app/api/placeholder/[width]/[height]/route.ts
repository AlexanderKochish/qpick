import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ width: string; height: string }> }
) {
  const { width: widthParam, height: heightParam } = await params
  const width = Number(widthParam) || 300
  const height = Number(heightParam) || 300

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
