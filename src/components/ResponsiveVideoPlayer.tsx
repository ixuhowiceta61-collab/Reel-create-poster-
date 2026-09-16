import React, { useState, useRef, useEffect } from 'react';
import { parseYouTubeUrl, formatTime } from '../utils/videoUtils';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Camera,
  Film,
  Sparkles,
  Tv,
  Repeat,
  Sliders,
  Check,
  Download,
} from 'lucide-react';

export type VideoAspectRatio = '16:9' | '9:16' | '4:3' | '1:1';
export type VideoFilterEffect = 'none' | 'warm-vintage' | 'sepia' | 'bw' | 'film-grain' | 'vhs';

export interface ResponsiveVideoPlayerProps {
  url: string;
  title?: string;
  aspectRatio?: VideoAspectRatio;
  initialFilter?: VideoFilterEffect;
  overlayQuote?: string;
  overlayAuthor?: string;
  onCaptureFrame?: (dataUrl: string) => void;
  className?: string;
}

export const ResponsiveVideoPlayer: React.FC<ResponsiveVideoPlayerProps> = ({
  url,
  title,
  aspectRatio: defaultRatio = '16:9',
  initialFilter = 'warm-vintage',
  overlayQuote,
  overlayAuthor,
  onCaptureFrame,
  className = '',
}) => {
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>(defaultRatio);
  const [filterEffect, setFilterEffect] = useState<VideoFilterEffect>(initialFilter);
  const [showOverlay, setShowOverlay] = useState(Boolean(overlayQuote));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [capturedThumbnail, setCapturedThumbnail] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Parse YouTube
  const ytInfo = parseYouTubeUrl(url);

  // Sync aspect ratio when prop changes
  useEffect(() => {
    if (defaultRatio) setAspectRatio(defaultRatio);
  }, [defaultRatio]);

  // Video element events for HTML5 video
  useEffect(() => {
    const video = videoRef.current;
    if (!video || ytInfo.isYouTube) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => {
      setDuration(video.duration);
      video.volume = volume;
      video.muted = isMuted;
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      if (!isLooping) setIsPlaying(false);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, [url, ytInfo.isYouTube, isLooping, volume, isMuted]);

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  // Replay
  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  // Volume toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    video.muted = nextMuted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val > 0 && isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  // Progress Bar Seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const targetTime = Math.max(0, Math.min(pos * duration, duration));
    video.currentTime = targetTime;
  };

  // Speed
  const handleRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  // Loop toggle
  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.loop = !isLooping;
    }
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Capture frame snapshot
  const handleCaptureFrame = () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCapturedThumbnail(dataUrl);
        if (onCaptureFrame) {
          onCaptureFrame(dataUrl);
        }
      }
    } catch {
      // Ignore cross-origin canvas security exceptions if external host restricts
    }
  };

  // CSS Filter styles for Vintage Look
  const getFilterStyle = (): string => {
    switch (filterEffect) {
      case 'warm-vintage':
        return 'sepia(35%) saturate(115%) contrast(108%) brightness(95%) hue-rotate(-5deg)';
      case 'sepia':
        return 'sepia(80%) saturate(120%) contrast(110%) brightness(92%)';
      case 'bw':
        return 'grayscale(100%) contrast(130%) brightness(90%)';
      case 'film-grain':
        return 'sepia(20%) contrast(115%) brightness(98%)';
      case 'vhs':
        return 'saturate(135%) contrast(115%) hue-rotate(8deg)';
      case 'none':
      default:
        return 'none';
    }
  };

  // Aspect ratio classes
  const getAspectClass = (): string => {
    switch (aspectRatio) {
      case '9:16':
        return 'aspect-[9/16] max-h-[640px] mx-auto';
      case '4:3':
        return 'aspect-[4/3]';
      case '1:1':
        return 'aspect-square max-w-lg mx-auto';
      case '16:9':
      default:
        return 'aspect-video';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl bg-[#140e0b] border-2 border-[#d4af37]/60 shadow-2xl overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Vintage Ornate Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1f1612] border-b border-[#3b2b20] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#802a32] border border-[#d4af37]/40 shadow-sm animate-pulse" />
          <span className="font-serif font-bold text-[#fef08a] tracking-wider uppercase truncate max-w-[180px] sm:max-w-xs">
            {title || (ytInfo.isYouTube ? 'YouTube Cinema' : 'Vintage Theater')}
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#2e2019] text-[#c5a059] text-[10px] font-mono border border-[#4a3627]">
            {aspectRatio}
          </span>
        </div>

        {/* Quick format & filter badges */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Aspect Ratio Switcher Pills */}
          <div className="flex items-center bg-[#18110e] rounded-lg p-0.5 border border-[#3d2e23]">
            {(['16:9', '9:16', '4:3', '1:1'] as VideoAspectRatio[]).map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                title={`Aspect Ratio ${ratio}`}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  aspectRatio === ratio
                    ? 'bg-[#802a32] text-[#fef08a] font-bold shadow-sm'
                    : 'text-[#9e8c79] hover:text-[#fef08a]'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>

          {/* Filter Dropdown Toggle */}
          <button
            type="button"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            title="Vintage Aesthetic Filters"
            className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
              filterEffect !== 'none'
                ? 'bg-[#2a1b15] text-[#fef08a] border-[#d4af37]/50'
                : 'bg-[#18110e] text-[#a39281] border-[#382a20] hover:text-[#fef08a]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden md:inline font-bengali">ভিন্টেজ ইফেক্ট</span>
          </button>
        </div>
      </div>

      {/* Filter Selector Panel (if toggled) */}
      {showFilterMenu && (
        <div className="px-3 py-2 sm:px-4 bg-[#1a120e] border-b border-[#3b2b20] flex flex-wrap items-center gap-1.5 animate-in fade-in duration-150">
          <span className="text-[11px] font-serif text-[#c5a059] uppercase tracking-wider mr-1">
            Vintage Filters:
          </span>
          {[
            { id: 'none', label: 'নরমাল / Original' },
            { id: 'warm-vintage', label: 'ওয়ার্ম ভিন্টেজ (Warm)' },
            { id: 'sepia', label: 'সেপিয়া (1940s)' },
            { id: 'bw', label: 'ব্ল্যাক & হোয়াইট (1920s)' },
            { id: 'film-grain', label: 'ফিল্ম গ্রেইন (35mm)' },
            { id: 'vhs', label: 'রেট্রো ভিএইচএস (VHS)' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setFilterEffect(item.id as VideoFilterEffect);
                setShowFilterMenu(false);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-bengali transition-all cursor-pointer ${
                filterEffect === item.id
                  ? 'bg-[#802a32] text-[#fef08a] font-bold border border-[#d4af37]/50 shadow-sm'
                  : 'bg-[#231713] text-[#cbb8a3] hover:text-[#fef08a] border border-[#382a20]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Video Viewport Container */}
      <div className={`relative w-full ${getAspectClass()} bg-[#080504] flex items-center justify-center overflow-hidden`}>
        {/* Film grain/vignette overlay styling */}
        {filterEffect === 'film-grain' && (
          <div className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px]" />
        )}
        {filterEffect === 'vhs' && (
          <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] [background-size:100%_4px]" />
        )}
        <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.85)]" />

        {/* Vintage Frame Filigree Corners */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none text-[#d4af37]/40 text-xs font-serif select-none">
          ❖
        </div>
        <div className="absolute top-2 right-2 z-10 pointer-events-none text-[#d4af37]/40 text-xs font-serif select-none">
          ❖
        </div>
        <div className="absolute bottom-12 left-2 z-10 pointer-events-none text-[#d4af37]/40 text-xs font-serif select-none">
          ❖
        </div>
        <div className="absolute bottom-12 right-2 z-10 pointer-events-none text-[#d4af37]/40 text-xs font-serif select-none">
          ❖
        </div>

        {/* Condition 1: YouTube Embed */}
        {ytInfo.isYouTube && ytInfo.embedUrl ? (
          <iframe
            src={ytInfo.embedUrl}
            title={title || 'YouTube Video Player'}
            className="w-full h-full border-0"
            style={{ filter: getFilterStyle() }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          /* Condition 2: Direct Video (MP4 / WebM / Blob URL) */
          <video
            ref={videoRef}
            src={url}
            className="w-full h-full object-contain cursor-pointer"
            style={{ filter: getFilterStyle() }}
            onClick={togglePlay}
            playsInline
            loop={isLooping}
          />
        )}

        {/* Center Play Button Overlay for HTML5 video when paused */}
        {!ytInfo.isYouTube && !isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#802a32]/85 hover:bg-[#992c3a] border-2 border-[#d4af37] text-[#fef9c3] flex items-center justify-center shadow-2xl transition-all hover:scale-110 z-20 cursor-pointer backdrop-blur-sm"
          >
            <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 text-[#fef08a] fill-[#fef08a]" />
          </button>
        )}

        {/* Poetic Quote Overlay on Video (if enabled) */}
        {showOverlay && overlayQuote && (
          <div className="absolute bottom-14 left-4 right-4 z-20 pointer-events-none text-center px-4 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-[#d4af37]/30">
            <p className="font-bengali text-sm sm:text-base md:text-lg font-semibold text-[#fef9c3] drop-shadow-md leading-snug">
              “{overlayQuote}”
            </p>
            {overlayAuthor && (
              <p className="text-[11px] font-serif text-[#d4af37] mt-1 tracking-wider">
                — {overlayAuthor}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Controls Bar for HTML5 Video */}
      {!ytInfo.isYouTube && (
        <div className="px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-t from-[#120c09] to-[#1c1410] border-t border-[#3b2b20] space-y-2">
          {/* Scrubber Progress Bar */}
          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="relative w-full h-2 bg-[#2a1d17] hover:h-2.5 rounded-full cursor-pointer transition-all overflow-hidden group"
          >
            <div
              className="h-full bg-gradient-to-r from-[#802a32] via-[#ca8a04] to-[#fef08a] rounded-full relative transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#fef08a] shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Left Controls: Play, Replay, Time, Volume */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 sm:p-2 rounded-lg bg-[#241712] hover:bg-[#34221a] text-[#fef08a] border border-[#453225] transition-all cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={handleReplay}
                className="p-1.5 sm:p-2 rounded-lg bg-[#241712] hover:bg-[#34221a] text-[#cbb8a3] hover:text-[#fef08a] border border-[#453225] transition-all cursor-pointer"
                title="Restart"
                aria-label="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Time display */}
              <div className="font-mono text-[11px] text-[#cbb8a3] tracking-wide select-none">
                <span className="text-[#fef08a]">{formatTime(currentTime)}</span> / {formatTime(duration)}
              </div>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1 text-[#cbb8a3] hover:text-[#fef08a] cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 sm:w-18 accent-[#d4af37] h-1.5 bg-[#2b1e17] rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Right Controls: Loop, Speed, Quote Toggle, Snapshot, Fullscreen */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Overlay quote toggle button */}
              {overlayQuote && (
                <button
                  type="button"
                  onClick={() => setShowOverlay(!showOverlay)}
                  title="Toggle Romantic Quote Overlay"
                  className={`px-2 py-1 rounded text-[11px] font-bengali transition-all cursor-pointer ${
                    showOverlay
                      ? 'bg-[#2f1f1a] text-[#fef08a] border border-[#d4af37]/40'
                      : 'text-[#8c7a68] hover:text-[#fef08a]'
                  }`}
                >
                  উক্তি অন/অফ
                </button>
              )}

              {/* Loop Toggle */}
              <button
                type="button"
                onClick={toggleLoop}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isLooping
                    ? 'bg-[#2a1c17] text-[#fef08a] border-[#d4af37]/40'
                    : 'text-[#8c7a68] border-transparent hover:text-[#fef08a]'
                }`}
                title={isLooping ? 'Loop is On' : 'Loop is Off'}
                aria-label="Toggle loop"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>

              {/* Playback speed selector */}
              <div className="flex items-center bg-[#1a120e] rounded p-0.5 border border-[#382a20]">
                {[1, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => handleRateChange(rate)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                      playbackRate === rate
                        ? 'bg-[#802a32] text-[#fef08a] font-bold'
                        : 'text-[#8c7a68] hover:text-[#fef08a]'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              {/* Capture Snapshot Frame Button */}
              <button
                type="button"
                id="video-capture-frame-btn"
                onClick={handleCaptureFrame}
                className="px-2.5 py-1 rounded-lg bg-[#271914] hover:bg-[#38231c] text-[#fef08a] border border-[#d4af37]/40 hover:border-[#d4af37] text-xs font-bengali font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="ভিডিওর বর্তমান ফ্রেম ক্যাপচার করুন"
              >
                <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="hidden sm:inline">ফ্রেম ক্যাপচার</span>
              </button>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 sm:p-2 rounded-lg bg-[#241712] hover:bg-[#34221a] text-[#cbb8a3] hover:text-[#fef08a] border border-[#453225] transition-all cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                aria-label="Fullscreen"
              >
                {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Captured Snapshot Notification / Action Drawer */}
      {capturedThumbnail && (
        <div className="p-3 bg-[#1d1410] border-t border-[#3b2b20] flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-3">
            <img
              src={capturedThumbnail}
              alt="Video snapshot frame"
              className="w-12 h-12 object-cover rounded-lg border border-[#d4af37]/40 shadow"
            />
            <div>
              <div className="text-xs font-bengali font-bold text-[#fef9c3] flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>ভিডিও থেকে ফ্রেম সফলভাবে ক্যাপচার হয়েছে!</span>
              </div>
              <div className="text-[11px] text-[#a39281] font-sans">
                Snapshot captured at {formatTime(currentTime)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={capturedThumbnail}
              download={`vintage-video-frame-${Date.now()}.jpg`}
              className="px-3 py-1.5 rounded-lg bg-[#802a32] hover:bg-[#962836] text-[#fef9c3] text-xs font-bengali font-semibold flex items-center gap-1.5 border border-[#d4af37]/40 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#fef08a]" />
              <span>ছবি ডাউনলোড</span>
            </a>
            <button
              type="button"
              onClick={() => setCapturedThumbnail(null)}
              className="p-1 text-[#8c7a68] hover:text-[#fef08a] text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
