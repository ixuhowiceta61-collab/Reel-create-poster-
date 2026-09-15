import React, { useState, useEffect, useRef } from 'react';
import { romanticQuotes } from '../data/quotes';
import { AudioTrackType, createVintageAudioEngine, AudioEngine } from '../utils/vintageAudio';
import { generateReelVideoBlob } from '../utils/videoRecorder';
import { exportPosterImage } from '../utils/exporter';
import { DownloadGateModal } from './DownloadGateModal';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Video,
  Download,
  Sparkles,
  CloudRain,
  Film,
  Music,
  Clock,
  Heart,
  Share2,
} from 'lucide-react';

export const ReelStudio: React.FC = () => {
  const [quote, setQuote] = useState<string>(
    'তুমি আমার সেই না-বলা কবিতা, যা আমি প্রতিটি নিঃশ্বাসে অনুভব করি।'
  );
  const [recipient, setRecipient] = useState<string>('প্রিয়তমা');
  const [sender, setSender] = useState<string>('চিরকাল তোমারই');
  const [date, setDate] = useState<string>('শ্রাবণ, ১৩৩২');

  // Video & Audio Config
  const [musicTrack, setMusicTrack] = useState<AudioTrackType>('rain-piano');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [particleType, setParticleType] = useState<'rain' | 'dust' | 'none'>('rain');
  const [durationSec, setDurationSec] = useState<number>(8);

  // Animation playback state
  const [isPlayingPreview, setIsPlayingPreview] = useState(true);
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 1
  const [revealedChars, setRevealedChars] = useState(0);

  // Video recording status
  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const [downloadBlobUrl, setDownloadBlobUrl] = useState<string | null>(null);
  const [isDownloadGateOpen, setIsDownloadGateOpen] = useState(false);
  const [downloadType, setDownloadType] = useState<'video' | 'image'>('video');

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const audioEngineRef = useRef<AudioEngine | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Handle preview animation loop
  useEffect(() => {
    let active = true;
    startTimeRef.current = Date.now();

    const loop = () => {
      if (!active) return;
      if (isPlayingPreview) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const prog = (elapsed % durationSec) / durationSec;
        setPlaybackProgress(prog);

        // Calculate typewriter text
        const revealPhase = Math.min(1, prog / 0.65);
        const chars = Math.floor(revealPhase * quote.length);
        setRevealedChars(chars);
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      active = false;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlayingPreview, durationSec, quote]);

  // Audio Engine Lifecycle
  useEffect(() => {
    if (isPlayingAudio && musicTrack !== 'none') {
      audioEngineRef.current = createVintageAudioEngine(musicTrack);
      audioEngineRef.current.start();
    } else {
      if (audioEngineRef.current) {
        audioEngineRef.current.stop();
        audioEngineRef.current = null;
      }
    }
    return () => {
      if (audioEngineRef.current) {
        audioEngineRef.current.stop();
        audioEngineRef.current = null;
      }
    };
  }, [isPlayingAudio, musicTrack]);

  const handleToggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  const handleReplay = () => {
    startTimeRef.current = Date.now();
    setPlaybackProgress(0);
    setRevealedChars(0);
    setIsPlayingPreview(true);
  };

  const handleSelectRandomQuote = () => {
    const random = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
    setQuote(random.text);
    handleReplay();
  };

  // Perform Video or Image Download via Gate Modal
  const handlePerformDownload = async (format: 'png' | 'jpeg') => {
    if (downloadType === 'video') {
      setIsRecording(true);
      setRecordProgress(0);
      try {
        const result = await generateReelVideoBlob({
          quote,
          recipient,
          sender,
          date,
          musicTrack,
          particles: particleType,
          durationSec,
          onProgress: (p) => setRecordProgress(p),
        });

        // Trigger file download
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `vintage-love-reel-${Date.now()}.${result.ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setIsRecording(false);
      } catch (err) {
        setIsRecording(false);
        throw err;
      }
    } else {
      // Export 9:16 Still Reel Image
      if (!previewContainerRef.current) return;
      await exportPosterImage({
        element: previewContainerRef.current,
        fileName: `vintage-reel-still-${Date.now()}`,
        format,
        scale: 3,
      });
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#0c0806] text-[#f4ecd8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201411] border border-[#d4af37]/40 text-xs font-serif text-[#fef08a] uppercase">
            <Video className="w-3.5 h-3.5" />
            <span>9:16 VINTAGE REELS & VIDEO CREATOR</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali text-[#fef9c3]">
            রিলস ও অ্যানিমেটেড ভিডিও স্টুডিও (Reels Video)
          </h1>
          <p className="text-sm text-[#b5a392] font-bengali">
            ইনস্টাগ্রাম রিলস ও টিকটকের জন্য বৃষ্টিভেজা অ্যানিমেটেড টাইপরাইটার ও ভিন্টেজ মিউজিক সহ ভিডিও তৈরি করুন।
          </p>
        </div>

        {/* 2-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 9:16 Video Player Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Reel Frame Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-2xl overflow-hidden border-4 border-[#d4af37]/70 shadow-2xl shadow-black bg-[#140e0b]">
              <div
                ref={previewContainerRef}
                className="relative w-full h-full p-6 flex flex-col justify-between select-none overflow-hidden"
              >
                {/* Vintage Texture Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#18100d] via-[#211612] to-[#0d0907] pointer-events-none" />

                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

                {/* Ornate Gold Frame Lines */}
                <div className="absolute inset-3 border border-[#d4af37]/35 rounded-xl pointer-events-none" />
                <div className="absolute inset-4 border border-[#d4af37]/15 rounded-lg pointer-events-none" />

                {/* Animated Particles / Rain Simulation */}
                {particleType === 'rain' && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                    <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(212,175,55,0.3)_50%,transparent_100%)] animate-pulse" />
                  </div>
                )}
                {particleType === 'dust' && (
                  <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#f5ebd7_1px,transparent_1px)] [background-size:24px_24px] animate-ping" />
                )}

                {/* Top Section: Stamp & Recipient */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-[#d4af37] uppercase">
                      REEL POST • ARCHIVE
                    </span>
                    {recipient && (
                      <div className="text-sm sm:text-base font-serif italic text-[#fef08a]">
                        {recipient},
                      </div>
                    )}
                  </div>

                  {/* Postal Stamp */}
                  <div className="w-12 h-14 bg-[#fdfbf7] p-1 border border-dashed border-[#8c7353] rounded shadow transform rotate-3 flex flex-col items-center justify-center text-[7px] text-[#1c120c]">
                    <span className="font-serif font-bold text-[#802a32]">POST</span>
                    <span className="text-base">💌</span>
                    <span className="font-mono text-[6px]">10P</span>
                  </div>
                </div>

                {/* Middle: Typewriter Quote Content */}
                <div className="relative z-10 text-center my-auto px-2 space-y-4">
                  <div className="text-xl sm:text-2xl font-bold font-bengali text-[#fef9c3] leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    “{quote.slice(0, revealedChars)}”
                    {revealedChars < quote.length && (
                      <span className="inline-block w-1.5 h-5 ml-1 bg-[#fef08a] animate-pulse align-middle" />
                    )}
                  </div>
                </div>

                {/* Bottom: Sender, Date & Brand Seal */}
                <div className="relative z-10 text-center space-y-2">
                  <div
                    className={`transition-opacity duration-700 ${
                      playbackProgress > 0.65 ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="text-sm font-serif italic text-[#fef08a]">{sender}</div>
                    <div className="text-[11px] font-mono text-[#a89078] mt-0.5">{date}</div>
                  </div>

                  <div className="pt-2 border-t border-[#d4af37]/20 flex items-center justify-between text-[8px] font-mono text-[#8c7b6c]">
                    <span>REEL CREATE POSTER</span>
                    <span>HD 9:16 VERTICAL</span>
                  </div>
                </div>

                {/* Progress Bar inside reel */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#241712]">
                  <div
                    className="h-full bg-gradient-to-r from-[#d4af37] to-[#fef08a] transition-all duration-100"
                    style={{ width: `${playbackProgress * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Video Player Controls (Play/Pause, Audio, Replay) */}
            <div className="w-full max-w-[380px] mt-4 flex items-center justify-between bg-[#16100d] border border-[#3b2d24] p-3 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                  className="w-10 h-10 rounded-xl bg-[#802a32] text-[#fef08a] flex items-center justify-center hover:scale-105 transition-all cursor-pointer shadow"
                  title={isPlayingPreview ? 'Pause' : 'Play'}
                >
                  {isPlayingPreview ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={handleReplay}
                  className="w-10 h-10 rounded-xl bg-[#241813] text-[#d4af37] hover:text-[#fef08a] flex items-center justify-center transition-all cursor-pointer"
                  title="পুনরায় দেখুন (Replay)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Sound toggle */}
              <button
                type="button"
                onClick={handleToggleAudio}
                className={`px-3 py-2 rounded-xl text-xs font-bengali font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-[#d4af37] text-[#1c120c]'
                    : 'bg-[#241813] text-[#a39281] hover:text-[#fef08a]'
                }`}
              >
                {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{isPlayingAudio ? 'সুর চালু' : 'সুর শুনুন'}</span>
              </button>

              <div className="text-xs font-mono text-[#a89078]">
                {Math.round(playbackProgress * durationSec)}s / {durationSec}s
              </div>
            </div>

            {/* Export Action Buttons */}
            <div className="w-full max-w-[380px] mt-4 space-y-2">
              <button
                type="button"
                id="export-video-reel-btn"
                disabled={isRecording}
                onClick={() => {
                  setDownloadType('video');
                  setIsDownloadGateOpen(true);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#802a32] via-[#942938] to-[#591b22] text-[#fef9c3] font-bold text-base font-bengali border border-[#d4af37] shadow-xl shadow-[#802a32]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isRecording ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#fef08a] border-t-transparent rounded-full animate-spin" />
                    <span>ভিডিও তৈরি হচ্ছে ({recordProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5 text-[#fef08a]" />
                    <span>🎬 রিলস ভিডিও ডাউনলোড করুন (HD Reel)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="export-image-reel-btn"
                onClick={() => {
                  setDownloadType('image');
                  setIsDownloadGateOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1a120e] text-[#d4c3b2] hover:text-[#fef08a] font-medium text-xs font-bengali border border-[#3b2d24] hover:border-[#802a32] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#d4af37]" />
                <span>🖼️ শুধু ৯:১৬ পোস্টার ছবি হিসেবে ডাউনলোড করুন</span>
              </button>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-6 space-y-5 font-bengali">
            {/* 1. Quote & Words Editor */}
            <div className="bg-[#16100d] rounded-2xl border border-[#3b2d24] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-serif text-[#d4af37] uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>রিলসের বাণী ও উক্তি</span>
                </div>
                <button
                  type="button"
                  onClick={handleSelectRandomQuote}
                  className="text-xs text-[#fef08a] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>অন্য উক্তি আনুন</span>
                </button>
              </div>

              <div>
                <label className="block text-xs text-[#c5a059] mb-1">মূল রোমান্টিক উক্তি (Quote)</label>
                <textarea
                  rows={3}
                  value={quote}
                  onChange={(e) => {
                    setQuote(e.target.value);
                    handleReplay();
                  }}
                  className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl p-3 text-sm text-[#fef9c3] focus:border-[#d4af37] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-[#c5a059] mb-1">সম্বোধন</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl px-3 py-2 text-xs text-[#fef9c3] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#c5a059] mb-1">প্রেরক</label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl px-3 py-2 text-xs text-[#fef9c3] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#c5a059] mb-1">তারিখ</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl px-3 py-2 text-xs text-[#fef9c3] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Audio & Atmosphere Controls */}
            <div className="bg-[#16100d] rounded-2xl border border-[#3b2d24] p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-serif text-[#d4af37] uppercase">
                <Music className="w-4 h-4" />
                <span>ভিন্টেজ সাউন্ড ও আবহ সুর (Audio)</span>
              </div>

              {/* Music selection */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'rain-piano', label: '🌧️ বৃষ্টি ও পিয়ানো', desc: 'Rain & Gentle Chimes' },
                  { id: 'vinyl-acoustic', label: '📻 গ্রামোফোন ক্র্যাকল', desc: 'Gramophone Vinyl' },
                  { id: 'ambient-flute', label: '🪈 রোমান্টিক বাঁশির সুর', desc: 'Melodic Ambient' },
                  { id: 'typewriter', label: '⌨️ টাইপরাইটার ক্লিক', desc: 'Rhythmic Typing' },
                ].map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => {
                      setMusicTrack(track.id as AudioTrackType);
                      setIsPlayingAudio(true);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      musicTrack === track.id
                        ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                        : 'bg-[#1e1612] text-[#d4c3b2] border-[#382a20] hover:bg-[#281d17]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#fef9c3]">{track.label}</div>
                    <div className="text-[10px] text-[#9c8976]">{track.desc}</div>
                  </button>
                ))}
              </div>

              {/* Particle Effects (Rain / Dust) */}
              <div>
                <label className="block text-xs text-[#c5a059] mb-2">চলন্ত কণা ও এফেক্ট (Atmosphere):</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rain', label: '🌧️ ঝুম বৃষ্টি (Rain)' },
                    { id: 'dust', label: '✨ ভিন্টেজ ধূলিকণা' },
                    { id: 'none', label: 'স্থির (None)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setParticleType(p.id as typeof particleType)}
                      className={`py-2 px-2 rounded-xl text-xs border text-center transition-all cursor-pointer ${
                        particleType === p.id
                          ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                          : 'bg-[#1e1612] text-[#a39281] border-[#382b22] hover:bg-[#281d17]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration selection */}
              <div>
                <label className="block text-xs text-[#c5a059] mb-2">ভিডিওর দৈর্ঘ্য (Duration):</label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 8, 10].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        setDurationSec(sec);
                        handleReplay();
                      }}
                      className={`py-2 rounded-xl text-xs border text-center transition-all cursor-pointer ${
                        durationSec === sec
                          ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                          : 'bg-[#1e1612] text-[#a39281] border-[#382b22] hover:bg-[#281d17]'
                      }`}
                    >
                      {sec} সেকেন্ড (Reel)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Gate Modal for High-Res Download */}
      <DownloadGateModal
        isOpen={isDownloadGateOpen}
        onClose={() => setIsDownloadGateOpen(false)}
        onPerformDownload={handlePerformDownload}
        posterTitle={downloadType === 'video' ? 'রিলস অ্যানিমেটেড ভিডিও (9:16 HD Reel)' : 'রিলস পোস্টার ছবি'}
      />
    </div>
  );
};
