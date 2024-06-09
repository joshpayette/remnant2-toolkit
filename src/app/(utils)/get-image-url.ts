export function getImageUrl(imagePath: string): string {
  // if the first character is a /, remove it
  if (imagePath.charAt(0) === '/') {
    imagePath = imagePath.slice(1)
  }

  return `https://${process.env.NEXT_PUBLIC_IMAGE_URL}/${imagePath}`
}
