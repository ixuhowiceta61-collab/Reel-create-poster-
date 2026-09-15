import html2canvas from 'html2canvas-pro';
import { toPng, toJpeg } from 'html-to-image';

export interface ExportOptions {
  element: HTMLElement;
  fileName: string;
  format: 'png' | 'jpeg';
  scale?: number;
}

export async function exportPosterImage({
  element,
  fileName,
  format,
  scale = 3, // High-resolution default
}: ExportOptions): Promise<void> {
  let dataUrl = '';

  // Try exporting with html2canvas-pro (which supports oklab/oklch/color-4)
  try {
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpeg' ? 0.95 : 1.0;
    dataUrl = canvas.toDataURL(mimeType, quality);
  } catch (canvasErr) {
    console.warn('html2canvas-pro export failed or had error, trying html-to-image fallback:', canvasErr);

    // Robust fallback using native browser SVG foreignObject rendering via html-to-image
    try {
      const options = {
        pixelRatio: scale,
        cacheBust: true,
        quality: format === 'jpeg' ? 0.95 : 1.0,
      };

      if (format === 'jpeg') {
        dataUrl = await toJpeg(element, options);
      } else {
        dataUrl = await toPng(element, options);
      }
    } catch (fallbackErr) {
      console.error('Fallback export also failed:', fallbackErr);
      throw canvasErr || fallbackErr;
    }
  }

  if (!dataUrl) {
    throw new Error('Could not generate image data URL');
  }

  // Trigger browser download
  const downloadLink = document.createElement('a');
  downloadLink.href = dataUrl;
  downloadLink.download = `${fileName}.${format === 'jpeg' ? 'jpg' : 'png'}`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
