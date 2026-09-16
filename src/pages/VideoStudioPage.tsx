import React, { useState, useRef } from 'react';
import { ResponsiveVideoPlayer, VideoAspectRatio, VideoFilterEffect } from '../components/ResponsiveVideoPlayer';
import { parseYouTubeUrl, isDirectVideoUrl, formatFileSize, SAMPLE_VINTAGE_VIDEOS, SampleVintageVideo } from '../utils/videoUtils';
import {
  Film,
  Upload,
  Link,
  Play,
  RotateCcw,
  Sparkles,
  Camera,
  Check,
  AlertCircle,
  FileVideo,
  Download,
  ArrowRight,
  Tv,
  Layers,
  Heart,
  Sliders,
  Type,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VideoStudioPageProps {
  onOpenGeneratorWithSnapshot?: (snapshotUrl: string) => void;
  onOpenReelsStudio?: () => void;
}

export const VideoStudioPage: React.FC<VideoStudioPageProps> = ({
  onOpenGeneratorWithSnapshot,
  onOpenReelsStudio,
}) => {
  const { language, t } = useLanguage();

  // Tabs: 'url' | 'upload' | 'samples'
  const [activeInputTab, setActiveInputTab] = useState<'url' | 'upload' | 'samples'>('url');

  // Video state
  const [inputUrl, setInputUrl] = useState('');
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [currentVideoTitle, setCurrentVideoTitle] = useState('Rain on Vintage Window');
  const [currentSourceType, setCurrentSourceType] = useState<'direct' | 'youtube' | 'uploaded'>('direct');

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Player configuration
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>('16:9');
  const [filterEffect, setFilterEffect] = useState<VideoFilterEffect>('warm-vintage');
  const [overlayQuote, setOverlayQuote] = useState('তুমি আমার সেই প্রিয় চিঠি, যা সময় কখনো ম্লান করতে পারে না।');
  const [overlayAuthor, setOverlayAuthor] = useState('ইতি, তোমার রাতজাগা পাখি');
  const [isQuoteOverlayActive, setIsQuoteOverlayActive] = useState(true);

  // Snapshot State
  const [capturedSnapshot, setCapturedSnapshot] = useState<string | null>(null);

  // Handle URL Apply
  const handleApplyUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) return;

    const yt = parseYouTubeUrl(trimmed);
    const isDirect = isDirectVideoUrl(trimmed);

    if (!yt.isYouTube && !isDirect && !trimmed.startsWith('http')) {
      alert(language === 'bn' ? 'অনুগ্রহ করে একটি সঠিক ভিডিও লিংক বা YouTube URL দিন।' : 'Please enter a valid video link or YouTube URL.');
      return;
    }

    setCurrentVideoUrl(trimmed);
    setCurrentVideoTitle(yt.isYouTube ? 'YouTube Cinema' : 'Web Video');
    setCurrentSourceType(yt.isYouTube ? 'youtube' : 'direct');
    setUploadedFile(null);
  };

  // Handle Local File Selection
  const handleFileSelect = (file: File) => {
    setUploadError(null);
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    if (!validTypes.includes(file.type) && !/\.(mp4|webm|ogg|mov)$/i.test(file.name)) {
      setUploadError(
        language === 'bn'
          ? 'শুধুমাত্র MP4, WebM অথবা OGG ফরম্যাটের ভিডিও নির্বাচন করুন।'
          : 'Please select an MP4, WebM, or OGG video.'
      );
      return;
    }

    if (file.size > 80 * 1024 * 1024) {
      setUploadError(
        language === 'bn'
          ? 'ভিডিও সাইজ ৮০ মেগাবাইটের বেশি। দ্রুত প্রিভিউয়ের জন্য তুলনামূলক ছোট ভিডিও দিন।'
          : 'File size exceeds 80MB. For faster previews, please use smaller clips.'
      );
      return;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      setUploadedFile(file);
      setCurrentVideoUrl(objectUrl);
      setCurrentVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
      setCurrentSourceType('uploaded');
    } catch {
      setUploadError(language === 'bn' ? 'ভিডিও লোড করা যায়নি।' : 'Could not load video.');
    }
  };

  // Sample Selection
  const handleSelectSample = (sample: SampleVintageVideo) => {
    setCurrentVideoUrl(sample.url);
    setCurrentVideoTitle(language === 'bn' ? sample.titleBn : sample.title);
    setCurrentSourceType(sample.sourceType);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a1a1d] border border-[#d4af37]/40 shadow-inner">
            <Film className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-xs font-serif text-[#fef08a] font-semibold tracking-wider uppercase">
              VINTAGE THEATER & VIDEO PLAYER
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-bengali text-[#fef9c3] leading-tight drop-shadow-md">
            {language === 'bn' ? 'ভিন্টেজ ভিডিও প্লেয়ার ও প্রিভিউ স্টুডিও' : 'Vintage Video Player & Preview Studio'}
          </h1>

          <p className="text-sm sm:text-base text-[#cbb8a3] font-bengali leading-relaxed max-w-2xl mx-auto">
            {language === 'bn'
              ? 'যেকোনো YouTube লিংক পেস্ট করুন অথবা আপনার প্রিয় শর্ট MP4/WebM ভিডিও আপলোড করে রেট্রো ভিন্টেজ ফ্রেম, অ্যানালগ ফিল্টার ও রোমান্টিক উক্তির সাথে উপভোগ করুন।'
              : 'Paste any YouTube URL or upload a short local MP4/WebM video file to watch with authentic vintage frames, retro analog filters, and romantic quote overlays.'}
          </p>
        </div>

        {/* Main Workspace: Left Controls / Right Responsive Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Options & Customization Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Input Selection Tabs Card */}
            <div className="bg-[#18110e] border border-[#3b2b20] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#312219] pb-3">
                <span className="text-xs font-serif text-[#c5a059] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-[#d4af37]" />
                  <span>{language === 'bn' ? '১. ভিডিও সোর্স নির্বাচন' : '1. Choose Video Source'}</span>
                </span>
                <span className="text-[11px] font-mono text-[#8c7a68] uppercase">
                  {currentSourceType}
                </span>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-[#120c09] p-1 rounded-xl border border-[#2e2017]">
                <button
                  type="button"
                  onClick={() => setActiveInputTab('url')}
                  className={`py-2 px-1 rounded-lg text-xs font-bengali font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeInputTab === 'url'
                      ? 'bg-[#802a32] text-[#fef08a] shadow-sm'
                      : 'text-[#9c8976] hover:text-[#fef08a]'
                  }`}
                >
                  <Link className="w-3 h-3" />
                  <span>{language === 'bn' ? 'লিংক / YT' : 'URL Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveInputTab('upload')}
                  className={`py-2 px-1 rounded-lg text-xs font-bengali font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeInputTab === 'upload'
                      ? 'bg-[#802a32] text-[#fef08a] shadow-sm'
                      : 'text-[#9c8976] hover:text-[#fef08a]'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>{language === 'bn' ? 'আপলোড' : 'Upload'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveInputTab('samples')}
                  className={`py-2 px-1 rounded-lg text-xs font-bengali font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeInputTab === 'samples'
                      ? 'bg-[#802a32] text-[#fef08a] shadow-sm'
                      : 'text-[#9c8976] hover:text-[#fef08a]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'bn' ? 'নমুনা' : 'Samples'}</span>
                </button>
              </div>

              {/* Tab 1: URL Input */}
              {activeInputTab === 'url' && (
                <form onSubmit={handleApplyUrl} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs text-[#cbb8a3] mb-1 font-bengali">
                      {language === 'bn' ? 'YouTube অথবা ডিরেক্ট MP4 ভিডিও লিংক:' : 'Paste YouTube or Direct MP4 link:'}
                    </label>
                    <input
                      type="url"
                      id="studio-video-url-input"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... অথবা .mp4"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#120c09] border border-[#443124] text-[#fef9c3] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all placeholder:text-[#6e5d50]"
                    />
                  </div>

                  <button
                    type="submit"
                    id="studio-apply-url-btn"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#802a32] to-[#591b22] hover:from-[#9c2d3a] hover:to-[#6d2029] text-[#fef9c3] font-bengali font-bold text-xs sm:text-sm border border-[#d4af37]/40 flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                  >
                    <Play className="w-4 h-4 fill-current text-[#fef08a]" />
                    <span>{language === 'bn' ? 'ভিডিও লোড ও প্রিভিউ করুন' : 'Load & Preview Video'}</span>
                  </button>

                  <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-[#8c7b6c]">
                    <span>দ্রুত লিংক:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setInputUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                        setCurrentVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                        setCurrentVideoTitle('Vintage 1980s Track');
                        setCurrentSourceType('youtube');
                      }}
                      className="px-2 py-0.5 rounded bg-[#241712] hover:bg-[#322019] text-[#d4af37] border border-[#3e2c20] cursor-pointer"
                    >
                      YouTube
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setInputUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                        setCurrentVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                        setCurrentVideoTitle('Rain & Vintage Window');
                        setCurrentSourceType('direct');
                      }}
                      className="px-2 py-0.5 rounded bg-[#241712] hover:bg-[#322019] text-[#d4af37] border border-[#3e2c20] cursor-pointer"
                    >
                      Rain MP4
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 2: Local File Upload */}
              {activeInputTab === 'upload' && (
                <div className="space-y-3 pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="studio-file-video-input"
                  />

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileSelect(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
                      isDragging
                        ? 'border-[#d4af37] bg-[#2d1b1f]'
                        : 'border-[#4a3627] hover:border-[#d4af37]/60 bg-[#140e0b] hover:bg-[#1f1511]'
                    }`}
                  >
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#802a32]/40 border border-[#d4af37]/40 flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5 text-[#fef08a]" />
                    </div>
                    <div className="font-bengali font-bold text-xs sm:text-sm text-[#fef9c3]">
                      {language === 'bn' ? 'লোকাল ভিডিও নির্বাচন বা ড্রপ করুন' : 'Click to browse or drop local video'}
                    </div>
                    <div className="text-[11px] text-[#a89582] mt-0.5">
                      MP4 / WebM / OGG (Max 80MB)
                    </div>

                    {uploadedFile && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#271914] border border-[#d4af37]/40 text-xs text-[#fef08a]">
                        <FileVideo className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span className="font-mono truncate max-w-[160px]">{uploadedFile.name}</span>
                        <span className="text-[#a89582]">({formatFileSize(uploadedFile.size)})</span>
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-200 text-xs flex items-center gap-2 font-bengali">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Preset Samples */}
              {activeInputTab === 'samples' && (
                <div className="space-y-2 pt-1">
                  {SAMPLE_VINTAGE_VIDEOS.map((sample) => {
                    const isCurrent = currentVideoUrl === sample.url;
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => handleSelectSample(sample)}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isCurrent
                            ? 'bg-[#291a1e] border-[#d4af37] shadow-md'
                            : 'bg-[#140e0b] border-[#38281e] hover:border-[#d4af37]/40 hover:bg-[#1e1511]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#281a14] text-[#c5a059] border border-[#443023]">
                              {sample.tag}
                            </span>
                            {isCurrent && <span className="text-[11px] text-[#fef08a] font-bold">✓ Selected</span>}
                          </div>
                          <div className="font-bengali font-bold text-xs sm:text-sm text-[#fef9c3] mt-1">
                            {language === 'bn' ? sample.titleBn : sample.title}
                          </div>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-[#802a32] text-[#fef08a] flex items-center justify-center shrink-0 border border-[#d4af37]/30">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Customization: Filters, Aspect Ratio & Quote Overlay */}
            <div className="bg-[#18110e] border border-[#3b2b20] rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#312219] pb-3">
                <span className="text-xs font-serif text-[#c5a059] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#d4af37]" />
                  <span>{language === 'bn' ? '২. ভিন্টেজ ফিল্টার ও অনুপাত' : '2. Filters & Framing'}</span>
                </span>
              </div>

              {/* Aspect Ratio Selector */}
              <div>
                <label className="block text-xs text-[#cbb8a3] mb-1.5 font-bengali">
                  স্ক্রিন অনুপাত (Aspect Ratio):
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: '16:9', label: '16:9', desc: 'Widescreen' },
                    { id: '9:16', label: '9:16', desc: 'Reels / Shorts' },
                    { id: '4:3', label: '4:3', desc: 'Classic TV' },
                    { id: '1:1', label: '1:1', desc: 'Square' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setAspectRatio(r.id as VideoAspectRatio)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        aspectRatio === r.id
                          ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]/60 shadow'
                          : 'bg-[#120c09] text-[#9c8a78] border-[#34241a] hover:text-[#fef08a]'
                      }`}
                    >
                      <div className="font-mono font-bold text-xs">{r.label}</div>
                      <div className="text-[9px] opacity-75">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vintage Visual Filters */}
              <div>
                <label className="block text-xs text-[#cbb8a3] mb-1.5 font-bengali">
                  রেট্রো ইফেক্ট (Retro Film Filters):
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'none', label: 'নরমাল' },
                    { id: 'warm-vintage', label: 'ওয়ার্ম ভিন্টেজ' },
                    { id: 'sepia', label: '১৯৪০ সেপিয়া' },
                    { id: 'bw', label: '১৯২০ ব্ল্যাক & হোয়াইট' },
                    { id: 'film-grain', label: '৩৫মিমি ফিল্ম' },
                    { id: 'vhs', label: 'রেট্রো ভিএইচএস' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFilterEffect(f.id as VideoFilterEffect)}
                      className={`py-2 px-1 rounded-xl text-xs font-bengali transition-all cursor-pointer ${
                        filterEffect === f.id
                          ? 'bg-[#802a32] text-[#fef08a] font-bold border border-[#d4af37]/60'
                          : 'bg-[#120c09] text-[#9c8a78] border border-[#34241a] hover:text-[#fef08a]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Poetic Subtitle Overlay */}
              <div className="pt-2 border-t border-[#312219] space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-[#cbb8a3] font-bengali flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>ভিডিওর ওপর রোমান্টিক উক্তি (Subtitle Overlay):</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsQuoteOverlayActive(!isQuoteOverlayActive)}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-all cursor-pointer ${
                      isQuoteOverlayActive
                        ? 'bg-[#291914] text-[#fef08a] border-[#d4af37]/40'
                        : 'bg-[#120c09] text-[#8c7a68] border-[#312219]'
                    }`}
                  >
                    {isQuoteOverlayActive ? 'ON' : 'OFF'}
                  </button>
                </div>

                {isQuoteOverlayActive && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={overlayQuote}
                      onChange={(e) => setOverlayQuote(e.target.value)}
                      placeholder="রোমান্টিক উক্তি লিখুন..."
                      className="w-full px-3 py-2 rounded-lg bg-[#120c09] border border-[#3b2b20] text-xs text-[#fef9c3] focus:border-[#d4af37] focus:outline-none font-bengali"
                    />
                    <input
                      type="text"
                      value={overlayAuthor}
                      onChange={(e) => setOverlayAuthor(e.target.value)}
                      placeholder="ইতি, প্রেরকের নাম..."
                      className="w-full px-3 py-2 rounded-lg bg-[#120c09] border border-[#3b2b20] text-xs text-[#fef9c3] focus:border-[#d4af37] focus:outline-none font-bengali"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Responsive Video Player Theater Showcase */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#18110e] border border-[#3b2b20] rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#312219] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-pulse" />
                  <span className="text-xs font-serif text-[#fef08a] tracking-wider uppercase font-bold">
                    VINTAGE THEATER PREVIEW
                  </span>
                </div>
                <span className="text-xs text-[#c5a059] font-mono">
                  {aspectRatio} • {filterEffect}
                </span>
              </div>

              {/* Live Responsive Video Player */}
              <ResponsiveVideoPlayer
                url={currentVideoUrl}
                title={currentVideoTitle}
                aspectRatio={aspectRatio}
                initialFilter={filterEffect}
                overlayQuote={isQuoteOverlayActive ? overlayQuote : undefined}
                overlayAuthor={isQuoteOverlayActive ? overlayAuthor : undefined}
                onCaptureFrame={(dataUrl) => setCapturedSnapshot(dataUrl)}
              />

              {/* Quick Action Buttons Under Player */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {onOpenReelsStudio && (
                  <button
                    type="button"
                    onClick={onOpenReelsStudio}
                    className="p-3 rounded-xl bg-[#231713] hover:bg-[#312019] text-[#fef08a] border border-[#443125] text-xs font-bengali font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Film className="w-4 h-4 text-[#d4af37]" />
                    <span>৯:১৬ রিলস ভিডিও স্টুডিওতে যান</span>
                  </button>
                )}

                <div className="p-3 rounded-xl bg-[#231713] border border-[#443125] text-xs font-bengali text-[#cbb8a3] flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>ভিডিও চলাকালীন 'ফ্রেম ক্যাপচার' বোতামে ক্লিক করে ছবি সেভ করুন।</span>
                </div>
              </div>

              {/* Captured Frame Showcase & Conversion to Postcard */}
              {capturedSnapshot && (
                <div className="p-4 rounded-xl bg-[#211611] border border-[#d4af37]/40 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bengali font-bold text-[#fef9c3] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>ক্যাপচার করা ভিডিও ফ্রেম প্রস্তুত</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setCapturedSnapshot(null)}
                      className="text-xs text-[#9c8976] hover:text-[#fef08a]"
                    >
                      মুছে দিন
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={capturedSnapshot}
                      alt="Captured video snapshot"
                      className="w-full sm:w-40 h-28 object-cover rounded-lg border border-[#4a3627] shadow"
                    />

                    <div className="space-y-2 w-full">
                      <p className="text-xs font-bengali text-[#cbb8a3]">
                        এই ফ্রেমটি ডাউনলোড করতে পারেন অথবা সরাসরি এটি দিয়ে ভিন্টেজ প্রেমের পোস্টকার্ড তৈরি করতে পারেন!
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <a
                          href={capturedSnapshot}
                          download={`vintage-video-frame-${Date.now()}.jpg`}
                          className="px-3.5 py-1.5 rounded-lg bg-[#802a32] hover:bg-[#962836] text-[#fef9c3] text-xs font-bengali font-semibold flex items-center gap-1.5 border border-[#d4af37]/40 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-[#fef08a]" />
                          <span>ছবি ডাউনলোড</span>
                        </a>

                        {onOpenGeneratorWithSnapshot && (
                          <button
                            type="button"
                            onClick={() => onOpenGeneratorWithSnapshot(capturedSnapshot)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#2e1f18] hover:bg-[#3d2a20] text-[#fef08a] text-xs font-bengali font-semibold flex items-center gap-1.5 border border-[#d4af37]/40 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>পোস্টকার্ড তৈরিতে ব্যবহার করুন</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
