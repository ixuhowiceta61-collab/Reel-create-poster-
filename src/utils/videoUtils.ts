export interface YouTubeInfo {
  isYouTube: boolean;
  videoId: string | null;
  embedUrl: string | null;
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function parseYouTubeUrl(url: string): YouTubeInfo {
  if (!url || typeof url !== 'string') {
    return { isYouTube: false, videoId: null, embedUrl: null };
  }

  const trimmed = url.trim();

  // Match youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const regExp =
    /(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|attribution_link\?.*v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);

  if (match && match[1]) {
    const videoId = match[1];
    return {
      isYouTube: true,
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
    };
  }

  return { isYouTube: false, videoId: null, embedUrl: null };
}

/**
 * Checks if a URL or MIME type represents a direct HTML5 video
 */
export function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('blob:') || url.startsWith('data:video/')) return true;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export interface SampleVintageVideo {
  id: string;
  title: string;
  titleBn: string;
  sourceType: 'youtube' | 'direct';
  url: string;
  tag: string;
  description: string;
  descriptionBn: string;
}

export const SAMPLE_VINTAGE_VIDEOS: SampleVintageVideo[] = [
  {
    id: 'sample-rain',
    title: 'Rain on Vintage Window',
    titleBn: 'বৃষ্টিভেজা জানালার কাঁচ',
    sourceType: 'direct',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tag: 'Rain / বাদল দিন',
    description: 'Calm raindrops against an ancient romantic window with warm reflections.',
    descriptionBn: 'ভিন্টেজ কাঁচের জানালায় বৃষ্টির ফোঁটা ও স্নিগ্ধ রোমান্টিক আবহ।',
  },
  {
    id: 'sample-nature',
    title: 'Vintage Forest Reverie',
    titleBn: 'অরণ্যের মায়াবী আলো',
    sourceType: 'direct',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    tag: 'Classic / রেট্রো',
    description: 'Gentle nature scene with warm golden sunlight filtering through trees.',
    descriptionBn: 'গাছের পাতার ফাঁক দিয়ে ছড়িয়ে পড়া নরম সোনালী রোদ।',
  },
  {
    id: 'sample-silent',
    title: '1920s Vintage Reel Romance',
    titleBn: '১৯২০-এর রেট্রো রিলস',
    sourceType: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tag: 'Cinema / চলচ্চিত্র',
    description: 'Nostalgic golden era atmosphere with analog film grain and warmth.',
    descriptionBn: 'নস্টালজিক স্বর্ণালী যুগের আবেদন ও সিনেমাটিক ফিল।',
  },
];
