import ImageKit from 'imagekit'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const res = await request.json()
  const { imageName, base64Image } = res

  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_CLIENT_ID ?? '',
      privateKey: process.env.IMAGEKIT_CLIENT_SECRET ?? '',
      urlEndpoint: 'https://ik.imagekit.io/remnant2toolkit/',
    })

    const response = await imagekit.upload({
      file: base64Image,
      fileName: `${imageName}`,
      folder: 'build-uploads',
      useUniqueFileName: true,
    })

    const { url } = response

    return Response.json({ success: true, imageLink: url })
  } catch (e) {
    console.error(e)
    return Response.json({ success: false, error: e })
  }
}
