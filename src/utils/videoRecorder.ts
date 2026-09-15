/**
 * Canvas-based Video Recorder for Reels & Shorts
 * Renders 9:16 vertical animated frames (720x1280 or 1080x1920)
 * with animated text, rain/dust particles, vintage filter, and audio into downloadable video.
 */

import { AudioTrackType, createVintageAudioEngine } from './vintageAudio';

export interface ReelRenderOptions {
  quote: string;
  recipient?: string;
  sender?: string;
  date?: string;
  themeColor?: string;
  musicTrack: AudioTrackType;
  particles: 'dust' | 'rain' | 'petals' | 'none';
  durationSec: number;
  onProgress?: (percent: number) => void;
}

export async function generateReelVideoBlob(options: ReelRenderOptions): Promise<{ blob: Blob; url: string; ext: string }> {
  const width = 720;
  const height = 1280;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  // Setup Audio Engine
  const audioEngine = createVintageAudioEngine(options.musicTrack);
  audioEngine.start();
  const audioDest = audioEngine.getStreamDestination();

  // Setup Canvas Stream
  const canvasStream = canvas.captureStream(30);
  const combinedStream = new MediaStream();

  canvasStream.getVideoTracks().forEach((track) => combinedStream.addTrack(track));
  if (audioDest && audioDest.stream.getAudioTracks().length > 0) {
    audioDest.stream.getAudioTracks().forEach((track) => combinedStream.addTrack(track));
  }

  // Determine supported mime type
  let mimeType = 'video/webm;codecs=vp9,opus';
  let ext = 'webm';
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    mimeType = 'video/webm';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/mp4';
      ext = 'mp4';
    }
  }

  const mediaRecorder = new MediaRecorder(combinedStream, {
    mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
    videoBitsPerSecond: 3500000, // Crisp 3.5 Mbps HD Reel
  });

  const chunks: Blob[] = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      chunks.push(e.data);
    }
  };

  // Particles generator
  const particleCount = options.particles === 'none' ? 0 : options.particles === 'rain' ? 70 : 40;
  const particlesArray = Array.from({ length: particleCount }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    speed: options.particles === 'rain' ? Math.random() * 8 + 6 : Math.random() * 1.5 + 0.5,
    size: options.particles === 'rain' ? Math.random() * 12 + 6 : Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  const totalFrames = options.durationSec * 30;
  let currentFrame = 0;

  return new Promise((resolve, reject) => {
    mediaRecorder.onstop = () => {
      audioEngine.stop();
      const finalBlob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(finalBlob);
      resolve({ blob: finalBlob, url, ext });
    };

    mediaRecorder.onerror = (err) => {
      audioEngine.stop();
      reject(err);
    };

    mediaRecorder.start();

    const renderLoop = () => {
      if (currentFrame >= totalFrames) {
        mediaRecorder.stop();
        return;
      }

      const progress = currentFrame / totalFrames;
      if (options.onProgress) {
        options.onProgress(Math.round(progress * 100));
      }

      // 1. Draw Deep Vintage Canvas Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#120c09');
      bgGrad.addColorStop(0.5, '#1e1411');
      bgGrad.addColorStop(1, '#0c0806');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Vintage Ornate Border Frame
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      ctx.lineWidth = 4;
      ctx.strokeRect(30, 40, width - 60, height - 80);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 50, width - 80, height - 100);

      // Corner gold accents
      const cornerSize = 25;
      ctx.fillStyle = '#d4af37';
      // TL
      ctx.fillRect(25, 35, cornerSize, 4);
      ctx.fillRect(25, 35, 4, cornerSize);
      // TR
      ctx.fillRect(width - 25 - cornerSize, 35, cornerSize, 4);
      ctx.fillRect(width - 29, 35, 4, cornerSize);
      // BL
      ctx.fillRect(25, height - 39, cornerSize, 4);
      ctx.fillRect(25, height - 39 - cornerSize + 4, 4, cornerSize);
      // BR
      ctx.fillRect(width - 25 - cornerSize, height - 39, cornerSize, 4);
      ctx.fillRect(width - 29, height - 39 - cornerSize + 4, 4, cornerSize);

      // 3. Top Postal Stamp
      ctx.save();
      ctx.translate(width - 140, 70);
      ctx.fillStyle = '#fef3c7';
      ctx.fillRect(0, 0, 80, 100);
      ctx.fillStyle = '#802a32';
      ctx.fillRect(4, 4, 72, 92);
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 12px serif';
      ctx.textAlign = 'center';
      ctx.fillText('POST 10P', 40, 24);
      ctx.font = '28px sans-serif';
      ctx.fillText('💌', 40, 60);
      ctx.font = '10px monospace';
      ctx.fillText('1947', 40, 85);
      ctx.restore();

      // Calcutta postmark
      ctx.save();
      ctx.translate(width - 165, 110);
      ctx.strokeStyle = 'rgba(245, 235, 215, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 32, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = '8px monospace';
      ctx.fillStyle = 'rgba(245, 235, 215, 0.6)';
      ctx.textAlign = 'center';
      ctx.fillText('CALCUTTA G.P.O', 0, -5);
      ctx.fillText('SPECIAL POST', 0, 10);
      ctx.restore();

      // 4. Moving Particles / Rain
      if (options.particles !== 'none') {
        particlesArray.forEach((p) => {
          ctx.fillStyle = options.particles === 'rain' ? `rgba(212, 175, 55, ${p.opacity * 0.7})` : `rgba(245, 237, 216, ${p.opacity})`;
          ctx.beginPath();
          if (options.particles === 'rain') {
            ctx.rect(p.x, p.y, 1.5, p.size);
          } else {
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          }
          ctx.fill();

          p.y += p.speed;
          if (options.particles === 'dust') {
            p.x += Math.sin(currentFrame * 0.05) * 0.5;
          }
          if (p.y > height) {
            p.y = 0;
            p.x = Math.random() * width;
          }
        });
      }

      // 5. Film Flicker / Vignette
      const vignette = ctx.createRadialGradient(width / 2, height / 2, 200, width / 2, height / 2, 600);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // 6. Recipient Greeting
      if (options.recipient) {
        ctx.fillStyle = '#d4af37';
        ctx.font = 'italic 28px serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${options.recipient},`, width / 2, 320);
      }

      // 7. Animated Typewriter Quote
      const fullQuote = options.quote;
      // Reveal text across first 65% of the video duration
      const charsToReveal = Math.min(
        fullQuote.length,
        Math.floor((progress / 0.65) * fullQuote.length)
      );
      const revealedText = fullQuote.slice(0, charsToReveal);

      ctx.fillStyle = '#fef9c3';
      ctx.font = 'bold 36px "Noto Serif Bengali", serif';
      ctx.textAlign = 'center';

      // Multi-line word wrap for canvas
      const maxLineWidth = width - 180;
      const words = revealedText.split(' ');
      let line = '';
      const lines: string[] = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxLineWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      const lineHeight = 58;
      const startY = 480 - (lines.length * lineHeight) / 2;

      // Draw subtle shadow for glow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 14;

      lines.forEach((l, i) => {
        ctx.fillText(l.trim(), width / 2, startY + i * lineHeight);
      });
      ctx.shadowBlur = 0;

      // 8. Sender & Date (Fade in after text reveals)
      if (progress > 0.65) {
        const fadeAlpha = Math.min(1, (progress - 0.65) / 0.2);
        ctx.save();
        ctx.globalAlpha = fadeAlpha;

        if (options.sender) {
          ctx.fillStyle = '#f5ebd7';
          ctx.font = 'italic 24px serif';
          ctx.textAlign = 'center';
          ctx.fillText(options.sender, width / 2, 820);
        }

        if (options.date) {
          ctx.fillStyle = '#a89078';
          ctx.font = '18px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(options.date, width / 2, 865);
        }
        ctx.restore();
      }

      // 9. Watermark Badge
      ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
      ctx.font = '12px serif';
      ctx.textAlign = 'center';
      ctx.fillText('REEL CREATE POSTER • VINTAGE REEL', width / 2, height - 70);

      currentFrame++;
      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  });
}
