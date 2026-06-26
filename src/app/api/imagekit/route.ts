import ImageKit from '@imagekit/nodejs';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await request.json();
  const { imageName, base64Image } = res;

  try {
    const imagekit = new ImageKit({
      privateKey: process.env.IMAGEKIT_CLIENT_SECRET ?? '',
    });

    const response = await imagekit.files.upload({
      file: base64Image,
      fileName: `${imageName}`,
      folder: 'build-uploads-temp',
      useUniqueFileName: true,
    });

    const { url } = response;

    return Response.json({ success: true, imageLink: url });
  } catch (e) {
    console.error(e);
    return Response.json({ success: false, error: e });
  }
}
