import { v2 as cloudinary } from 'cloudinary'

const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

const isCloudinaryConfigured =
  cloudinaryConfig.cloud_name &&
  cloudinaryConfig.api_key &&
  cloudinaryConfig.api_secret

if (isCloudinaryConfigured) {
  cloudinary.config(cloudinaryConfig)
}

export async function POST(req: Request) {
  if (!isCloudinaryConfigured) {
    console.error('Cloudinary configuration missing:')
    console.error('- Cloud Name:', !!cloudinaryConfig.cloud_name)
    console.error('- API Key:', !!cloudinaryConfig.api_key)
    console.error('- API Secret:', !!cloudinaryConfig.api_secret)

    return new Response(
      JSON.stringify({
        error: 'Cloudinary not configured properly. Check server logs.',
      }),
      { status: 500 }
    )
  }

  try {
    const { paramsToSign } = await req.json()

    if (!paramsToSign) {
      return new Response(
        JSON.stringify({ error: 'paramsToSign is required' }),
        { status: 400 }
      )
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    )

    return new Response(JSON.stringify({ signature }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error signing Cloudinary params:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate signature' }),
      { status: 500 }
    )
  }
}
