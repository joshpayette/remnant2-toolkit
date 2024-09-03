export function getImageUrl(imagePath: string): string {
  let newImagePath = imagePath;

  // if the first character is a /, remove it
  if (imagePath.startsWith('/')) {
    newImagePath = imagePath.slice(1);
  }

  return `https://${process.env.NEXT_PUBLIC_IMAGE_URL}/${newImagePath}`;
}
