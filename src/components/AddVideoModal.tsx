import React, { useState, useRef } from 'react';
import { ResponsiveVideoPlayer, VideoAspectRatio, VideoFilterEffect } from './ResponsiveVideoPlayer';
import { parseYouTubeUrl, isDirectVideoUrl, formatFileSize, SAMPLE_VINTAGE_VIDEOS, SampleVintageVideo } from '../utils/videoUtils';
import {
  X,
  Upload,
  Link,
  Film,
  Sparkles,
  Check,
  AlertCircle,
  Play,
  RotateCcw,
  FileVideo,
  ExternalLink,
  Type,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVideo?: (videoUrl: string, title?: string) => void;
  initialUrl?: string;
}

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onSelectVideo,
  initialUrl = '',
}) => {
  const { language, t } = useLanguage();

  // Tabs: 'url' | 'upload' | 'samples'
  const [activeTab, setActiveTab] = useState<'url' | 'upload' | 'samples'>('url');

  // Input states
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [urlTitle, setUrlTitle] = useState('');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>(
    initialUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [activeVideoTitle, setActiveVideoTitle] = useState('Vintage Sample Video');

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Video customization options
  const [overlayQuote, setOverlayQuote] = useState('তুমি আমার চিরন্তন অনুভূতির সুর...');
  const [overlayAuthor, setOverlayAuthor] = useState('ইতি, চিরকালের ভালোবাসা');
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>('16:9');
  const [filterEffect, setFilterEffect] = useState<VideoFilterEffect>('warm-vintage');

  if (!isOpen) return null;

  // Handle URL submit
  const handleApplyUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) return;

    const yt = parseYouTubeUrl(trimmed);
    const isDirect = isDirectVideoUrl(trimmed);

    if (!yt.isYouTube && !isDirect && !trimmed.startsWith('http')) {
      alert(language === 'bn' ? 'অনুগ্রহ করে একটি সঠিক ভিডিও লিংক বা YouTube URL দিন।' : 'Please provide a valid video URL or YouTube link.');
      return;
    }

    setActiveVideoUrl(trimmed);
    setActiveVideoTitle(urlTitle.trim() || (yt.isYouTube ? 'YouTube Video' : 'Online Video'));
    if (onSelectVideo) {
      onSelectVideo(trimmed, urlTitle.trim());
    }
  };

  // Handle Local File Upload
  const handleFileSelection = (file: File) => {
    setUploadError(null);

    // Validate type
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    if (!validTypes.includes(file.type) && !/\.(mp4|webm|ogg|mov)$/i.test(file.name)) {
      setUploadError(
        language === 'bn'
          ? 'শুধুমাত্র MP4, WebM বা OGG ভিডিও ফাইল নির্বাচন করুন।'
          : 'Please select an MP4, WebM, or OGG video file.'
      );
      return;
    }

    // Size check (warn if > 60MB for smooth browser performance)
    if (file.size > 80 * 1024 * 1024) {
      setUploadError(
        language === 'bn'
          ? 'ফাইল সাইজ খুব বড়। মসৃণ প্রিভিউয়ের জন্য ৮০ মেগাবাইট বা ছোট ফাইল আপলোড করুন।'
          : 'File is too large. Please upload files under 80MB for smooth playback.'
      );
      return;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      setUploadedFile(file);
      setActiveVideoUrl(objectUrl);
      setActiveVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
      if (onSelectVideo) {
        onSelectVideo(objectUrl, file.name);
      }
    } catch {
      setUploadError(language === 'bn' ? 'ভিডিও লোড করতে সমস্যা হয়েছে।' : 'Failed to load video file.');
    }
  };

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  // Select a preset sample
  const handleSelectSample = (sample: SampleVintageVideo) => {
    setActiveVideoUrl(sample.url);
    setActiveVideoTitle(language === 'bn' ? sample.titleBn : sample.title);
    if (onSelectVideo) {
      onSelectVideo(sample.url, sample.title);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#160f0c] border-2 border-[#d4af37]/60 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#1e1511] border-b border-[#3d2c20]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#802a32] border border-[#d4af37]/40 flex items-center justify-center text-lg shadow">
              🎬
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-bengali text-[#fef9c3]">
                {language === 'bn' ? 'ভিডিও যোগ করুন ও প্রিভিউ দেখুন' : 'Add Video / Preview'}
              </h2>
              <p className="text-[11px] sm:text-xs text-[#a89582] font-sans">
                {language === 'bn' ? 'YouTube লিংক পেস্ট করুন বা লোকাল MP4/WebM ফাইল আপলোড করুন' : 'Paste YouTube link or upload local MP4/WebM video'}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="close-add-video-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg bg-[#271a14] text-[#a89582] hover:text-[#fef08a] hover:bg-[#38251c] transition-all cursor-pointer border border-[#422e22]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two Columns on Large screens, Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Navigation Tabs: URL / Upload / Samples */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#34241a] pb-3">
            <button
              type="button"
              id="tab-video-url"
              onClick={() => setActiveTab('url')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bengali font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]/50 shadow-md'
                  : 'bg-[#1e1511] text-[#a89582] hover:text-[#fef08a] border border-[#34241a]'
              }`}
            >
              <Link className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{language === 'bn' ? 'ভিডিও লিংক / YouTube' : 'Video URL / YouTube'}</span>
            </button>

            <button
              type="button"
              id="tab-video-upload"
              onClick={() => setActiveTab('upload')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bengali font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]/50 shadow-md'
                  : 'bg-[#1e1511] text-[#a89582] hover:text-[#fef08a] border border-[#34241a]'
              }`}
            >
              <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{language === 'bn' ? 'ফাইল আপলোড (MP4/WebM)' : 'Upload Video File'}</span>
            </button>

            <button
              type="button"
              id="tab-video-samples"
              onClick={() => setActiveTab('samples')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bengali font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'samples'
                  ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]/50 shadow-md'
                  : 'bg-[#1e1511] text-[#a89582] hover:text-[#fef08a] border border-[#34241a]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{language === 'bn' ? 'ভিন্টেজ নমুনা ক্লিপ' : 'Sample Vintage Clips'}</span>
            </button>
          </div>

          {/* Tab Content 1: URL Input */}
          {activeTab === 'url' && (
            <form onSubmit={handleApplyUrl} className="space-y-3 bg-[#1c1410] p-4 rounded-xl border border-[#38281e]">
              <div>
                <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-1.5">
                  {language === 'bn' ? 'ভিডিও লিংক (YouTube অথবা সরাসরি MP4/WebM URL)' : 'Video URL (YouTube or direct MP4/WebM link)'}
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    id="input-video-url-field"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... অথবা .mp4 লিংক"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#140e0b] border border-[#443124] text-[#fef9c3] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition-all placeholder:text-[#6e5d50]"
                  />
                  <button
                    type="submit"
                    id="btn-apply-video-url"
                    className="px-5 py-2.5 rounded-xl bg-[#802a32] hover:bg-[#992c3a] text-[#fef08a] font-bengali font-bold text-xs sm:text-sm border border-[#d4af37]/40 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{language === 'bn' ? 'প্লে করুন' : 'Load Video'}</span>
                  </button>
                </div>
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-[#9c8a78]">
                <span>{language === 'bn' ? 'উদাহরণ লিংক:' : 'Quick examples:'}</span>
                <button
                  type="button"
                  onClick={() => {
                    setInputUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                    setActiveVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
                    setActiveVideoTitle('Classic YouTube Clip');
                  }}
                  className="px-2 py-0.5 rounded bg-[#271b15] hover:bg-[#38261e] text-[#d4af37] border border-[#3e2c20] cursor-pointer"
                >
                  YouTube
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInputUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                    setActiveVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                    setActiveVideoTitle('Rain & Vintage Window');
                  }}
                  className="px-2 py-0.5 rounded bg-[#271b15] hover:bg-[#38261e] text-[#d4af37] border border-[#3e2c20] cursor-pointer"
                >
                  Direct MP4
                </button>
              </div>
            </form>
          )}

          {/* Tab Content 2: Local File Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelection(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="file-video-input"
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#d4af37] bg-[#2d1b1f]'
                    : 'border-[#4a3627] hover:border-[#d4af37]/60 bg-[#19110d] hover:bg-[#221612]'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-[#802a32]/40 border border-[#d4af37]/40 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-[#fef08a]" />
                </div>
                <h3 className="font-bengali font-bold text-sm sm:text-base text-[#fef9c3]">
                  {language === 'bn' ? 'ভিডিও ফাইল ড্রপ করুন অথবা ক্লিক করে নির্বাচন করুন' : 'Drop video file here or click to browse'}
                </h3>
                <p className="text-xs text-[#a89582] mt-1 font-sans">
                  MP4, WebM, OGG (সর্বোচ্চ ৮০MB • মোবাইলেও কার্যকর)
                </p>

                {uploadedFile && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#281a14] border border-[#d4af37]/40 text-xs text-[#fef08a]">
                    <FileVideo className="w-4 h-4 text-[#d4af37]" />
                    <span className="font-mono">{uploadedFile.name}</span>
                    <span className="text-[#a89582]">({formatFileSize(uploadedFile.size)})</span>
                  </div>
                )}
              </div>

              {uploadError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-red-200 text-xs flex items-center gap-2 font-bengali">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{uploadError}</span>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 3: Preset Samples */}
          {activeTab === 'samples' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SAMPLE_VINTAGE_VIDEOS.map((sample) => {
                const isCurrent = activeVideoUrl === sample.url;
                return (
                  <div
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-[#291a1e] border-[#d4af37] shadow-lg shadow-[#802a32]/30'
                        : 'bg-[#1c1410] border-[#38281e] hover:border-[#d4af37]/40 hover:bg-[#241914]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#c5a059] mb-1">
                        <span>{sample.tag}</span>
                        {isCurrent && <span className="text-[#fef08a] font-bold">✓ Active</span>}
                      </div>
                      <h4 className="font-bengali font-bold text-sm text-[#fef9c3]">
                        {language === 'bn' ? sample.titleBn : sample.title}
                      </h4>
                      <p className="text-xs text-[#9e8c79] font-bengali mt-1 line-clamp-2">
                        {language === 'bn' ? sample.descriptionBn : sample.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="mt-3 w-full py-1.5 rounded-lg bg-[#271b16] hover:bg-[#802a32] text-[#fef08a] text-xs font-bengali font-semibold flex items-center justify-center gap-1.5 transition-all border border-[#443124]"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{language === 'bn' ? 'প্লে প্রিভিউ' : 'Play Clip'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Live Responsive Video Player Preview Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif text-[#d4af37] tracking-wider uppercase font-semibold flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'লাইভ ভিডিও প্রিভিউ' : 'Live Video Player'}</span>
              </span>
              <span className="text-[11px] text-[#a89582] font-mono truncate max-w-[200px]">
                {activeVideoTitle}
              </span>
            </div>

            {/* The Responsive Video Player */}
            <ResponsiveVideoPlayer
              url={activeVideoUrl}
              title={activeVideoTitle}
              aspectRatio={aspectRatio}
              initialFilter={filterEffect}
              overlayQuote={overlayQuote}
              overlayAuthor={overlayAuthor}
            />
          </div>

          {/* Video Subtitle / Romantic Overlay Controls */}
          <div className="p-4 rounded-xl bg-[#19120e] border border-[#38281e] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                <Type className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ভিডিওর উপর রোমান্টিক উক্তি (Subtitle Overlay)' : 'Romantic Quote Overlay'}</span>
              </span>
              <span className="text-[10px] text-[#9c8a78]">ঐচ্ছিক (Optional)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#b5a392] mb-1 font-bengali">
                  উক্তি / ভালোবাসার বাণী:
                </label>
                <input
                  type="text"
                  value={overlayQuote}
                  onChange={(e) => setOverlayQuote(e.target.value)}
                  placeholder="উক্তি লিখুন..."
                  className="w-full px-3 py-2 rounded-lg bg-[#120d0a] border border-[#3b2b20] text-xs text-[#fef9c3] focus:border-[#d4af37] focus:outline-none font-bengali"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#b5a392] mb-1 font-bengali">
                  লেখক / প্রেরক:
                </label>
                <input
                  type="text"
                  value={overlayAuthor}
                  onChange={(e) => setOverlayAuthor(e.target.value)}
                  placeholder="ইতি, তোমার নাম..."
                  className="w-full px-3 py-2 rounded-lg bg-[#120d0a] border border-[#3b2b20] text-xs text-[#fef9c3] focus:border-[#d4af37] focus:outline-none font-bengali"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#1a120e] border-t border-[#34241a] flex items-center justify-between">
          <div className="text-[11px] text-[#8c7b6c] hidden sm:block">
            {language === 'bn' ? 'ভিডিও প্রিভিউ সম্পূর্ণ মোবাইল ও রেসপনসিভ ফ্রেন্ডলি' : 'Fully mobile-ready & responsive preview'}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              id="modal-done-btn"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#802a32] to-[#591b22] hover:from-[#9c2d3a] hover:to-[#6d2029] text-[#fef9c3] text-xs sm:text-sm font-bengali font-bold border border-[#d4af37]/40 shadow-lg cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-[#fef08a]" />
              <span>{language === 'bn' ? 'ঠিক আছে / বন্ধ করুন' : 'Done / Close'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
