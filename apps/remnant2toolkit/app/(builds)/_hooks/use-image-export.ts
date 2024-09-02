import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useImageExport() {
  const router = useRouter();

  // iOS does not automatically download images, so we need to
  // make a clickable link available
  const [imageDownloadInfo, setImageDownloadInfo] = useState<{
    imageLink: string;
    imageName: string;
  } | null>(null);

  // Need to show a loading indicator when exporting the image
  const [imageExportLoading, setImageExportLoading] = useState(false);

  // Used to inform the UI when a screenshot is being taken
  // so that it can resize on mobile devices, show logo, and more.
  const [isScreenshotMode, setIsScreenshotMode] = useState<{
    el: HTMLDivElement | null;
    imageFileName: string;
  } | null>();

  function handleClearImageDownloadInfo() {
    setImageDownloadInfo(null);
  }

  function handleImageExport(el: HTMLDivElement | null, imageFileName: string) {
    // We do this to trigger the effect below
    setIsScreenshotMode({ el, imageFileName });
  }
  /**
   * Export the build as an image
   * We do this in a useEffect so that the UI can update,
   * allowing us to show the logo, expand the build on mobile for
   * better screenshots, etc.
   */
  useEffect(() => {
    async function exportImage() {
      setImageExportLoading(false);
      if (!isScreenshotMode) return;
      const { el, imageFileName } = isScreenshotMode;

      if (!el) return;

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) =>
          (clonedDoc.documentElement.dataset.theme = 'dark'),
      });

      const base64Image = canvas.toDataURL('image/png', 1.0).split(',')[1];

      const response = await fetch('/api/imagekit', {
        method: 'POST',
        body: JSON.stringify({
          base64Image,
          imageName: imageFileName,
        }),
      });

      if (!response.ok) {
        toast.error('Failed to upload image to Imgur.');
        return;
      }

      const { imageLink } = await response.json();

      setImageDownloadInfo({
        imageLink,
        imageName: imageFileName,
      });
      setIsScreenshotMode(null);
    }
    if (!isScreenshotMode) return;
    setImageExportLoading(true);
    setTimeout(exportImage, 1000);
  }, [isScreenshotMode, router]);

  return {
    handleClearImageDownloadInfo,
    handleImageExport,
    isScreenshotMode: Boolean(isScreenshotMode),
    showControls: Boolean(isScreenshotMode) === false,
    imageDownloadInfo,
    imageExportLoading,
  };
}
