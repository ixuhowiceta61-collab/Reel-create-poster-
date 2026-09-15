import React, { useState, useRef } from 'react';
import { vintageLetters, VintageLetterTemplate } from '../data/letters';
import { exportPosterImage } from '../utils/exporter';
import { DownloadGateModal } from './DownloadGateModal';
import { Download, Sparkles, Heart, Mail, RotateCcw, Feather, BookOpen, Layers } from 'lucide-react';

export const LetterStudio: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<VintageLetterTemplate>(vintageLetters[0]);
  const [salutation, setSalutation] = useState(selectedTemplate.salutation);
  const [body, setBody] = useState(selectedTemplate.body);
  const [closing, setClosing] = useState(selectedTemplate.closing);
  const [signature, setSignature] = useState(selectedTemplate.signature);
  const [date, setDate] = useState(selectedTemplate.date);
  const [sealColor, setSealColor] = useState<'burgundy' | 'gold' | 'emerald' | 'navy'>(selectedTemplate.sealColor);
  const [paperTexture, setPaperTexture] = useState<'parchment' | 'antique-sepia' | 'rose-paper' | 'burnt-edge'>(selectedTemplate.paperTexture);
  const [fontChoice, setFontChoice] = useState<'serif' | 'handwritten' | 'classic' | 'typewriter'>('handwritten');
  const [isEnvelopeMode, setIsEnvelopeMode] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const letterRef = useRef<HTMLDivElement>(null);

  const handleApplyTemplate = (tpl: VintageLetterTemplate) => {
    setSelectedTemplate(tpl);
    setSalutation(tpl.salutation);
    setBody(tpl.body);
    setClosing(tpl.closing);
    setSignature(tpl.signature);
    setDate(tpl.date);
    setSealColor(tpl.sealColor);
    setPaperTexture(tpl.paperTexture);
  };

  const handlePerformDownload = async (format: 'png' | 'jpeg') => {
    if (!letterRef.current) return;
    const fileName = `vintage-love-letter-${Date.now()}`;
    await exportPosterImage({
      element: letterRef.current,
      fileName,
      format,
      scale: 3,
    });
  };

  // Texture styles
  const getPaperBg = () => {
    switch (paperTexture) {
      case 'antique-sepia':
        return 'bg-[#211611] text-[#faedd9] border-[#d4af37]/60';
      case 'rose-paper':
        return 'bg-[#25151b] text-[#fce7f3] border-[#f43f5e]/50';
      case 'burnt-edge':
        return 'bg-[#18110e] text-[#f5ebd7] border-[#8c5e39] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]';
      case 'parchment':
      default:
        return 'bg-[#1c1410] text-[#fbf1dc] border-[#c5a059]/50';
    }
  };

  const getFontFamily = () => {
    switch (fontChoice) {
      case 'handwritten':
        return "'Galada', cursive";
      case 'classic':
        return "'Anek Bangla', sans-serif";
      case 'typewriter':
        return "'Courier Prime', monospace";
      case 'serif':
      default:
        return "'Noto Serif Bengali', serif";
    }
  };

  const getSealBg = () => {
    switch (sealColor) {
      case 'gold':
        return 'bg-gradient-to-br from-[#d4af37] via-[#ca8a04] to-[#854d0e] text-[#1c120c] border-[#fef08a]';
      case 'emerald':
        return 'bg-gradient-to-br from-[#059669] via-[#047857] to-[#064e3b] text-[#ecfdf5] border-[#a7f3d0]';
      case 'navy':
        return 'bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#172554] text-[#eff6ff] border-[#93c5fd]';
      case 'burgundy':
      default:
        return 'bg-gradient-to-br from-[#991b1b] via-[#7f1d1d] to-[#450a0a] text-[#fef2f2] border-[#fca5a5]';
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#0d0907] text-[#f4ecd8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201411] border border-[#d4af37]/40 text-xs font-serif text-[#fef08a] uppercase">
            <Feather className="w-3.5 h-3.5" />
            <span>AUTHENTIC VINTAGE LOVE LETTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali text-[#fef9c3]">
            ভিন্টেজ প্রেমপত্র স্টুডিও (Love Letter)
          </h1>
          <p className="text-sm text-[#b5a392] font-bengali">
            পুরনো পার্চমেন্ট কাগজ, মোমের মোহর (Wax Seal) ও ঝরা কালির হস্তাক্ষরে ভালোবাসার চিরকূট তৈরি করুন।
          </p>
        </div>

        {/* Studio Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Letter Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 mb-4 bg-[#16100d] p-1.5 rounded-xl border border-[#382a20]">
              <button
                type="button"
                onClick={() => setIsEnvelopeMode(false)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bengali font-semibold transition-all cursor-pointer ${
                  !isEnvelopeMode
                    ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]/50 shadow-md'
                    : 'text-[#a39281] hover:text-[#fef08a]'
                }`}
              >
                📜 খোলা প্রেমপত্র (Full Letter)
              </button>
              <button
                type="button"
                onClick={() => setIsEnvelopeMode(true)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bengali font-semibold transition-all cursor-pointer ${
                  isEnvelopeMode
                    ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]/50 shadow-md'
                    : 'text-[#a39281] hover:text-[#fef08a]'
                }`}
              >
                ✉️ ভিন্টেজ খাম (Vintage Envelope)
              </button>
            </div>

            {/* Canvas Container */}
            <div className="w-full max-w-lg shadow-2xl relative">
              <div
                ref={letterRef}
                id="vintage-letter-export"
                className={`relative rounded-2xl border-4 p-8 sm:p-10 shadow-2xl transition-all duration-300 overflow-hidden ${getPaperBg()}`}
                style={{
                  minHeight: isEnvelopeMode ? '340px' : '580px',
                  fontFamily: getFontFamily(),
                }}
              >
                {/* Paper Aging & Crease Lines */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-[#d4af37]/15 pointer-events-none" />

                {/* Subtle paper horizontal ruled lines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.05]"
                  style={{
                    backgroundImage: 'linear-gradient(#f5edd8 1px, transparent 1px)',
                    backgroundSize: '100% 32px',
                  }}
                />

                {!isEnvelopeMode ? (
                  /* Full Open Letter */
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    {/* Top Header: Date & Calcutta Stamp */}
                    <div className="flex items-start justify-between border-b border-[#d4af37]/20 pb-4">
                      <div>
                        <div className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                          PREMPATRA • ARCHIVE
                        </div>
                        <div className="text-xs text-[#a89078] font-mono mt-0.5">{date}</div>
                      </div>

                      {/* Ornate Postal Seal */}
                      <div className="w-12 h-14 bg-[#140e0b] border-2 border-dashed border-[#d4af37]/60 rounded p-1 text-center flex flex-col items-center justify-center">
                        <span className="text-[7px] text-[#d4af37] font-serif">CALCUTTA</span>
                        <span className="text-sm">💌</span>
                        <span className="text-[6px] text-[#a89078] font-mono">10 PAISE</span>
                      </div>
                    </div>

                    {/* Salutation (সম্বোধন) */}
                    <div className="text-xl sm:text-2xl font-bold text-[#fef9c3] italic">
                      {salutation},
                    </div>

                    {/* Letter Body (মূল অনুভূতি) */}
                    <div className="text-base sm:text-lg leading-relaxed text-[#fef9c3] font-bengali tracking-wide whitespace-pre-line drop-shadow">
                      {body}
                    </div>

                    {/* Closing & Signature */}
                    <div className="pt-6 flex flex-col items-end text-right space-y-1">
                      <div className="text-xs sm:text-sm text-[#d4af37] italic font-serif">
                        {closing}
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-[#fef08a]">
                        {signature}
                      </div>
                    </div>

                    {/* Authentic Wax Seal (মোমের সিল) positioned at bottom */}
                    <div className="pt-4 flex items-center justify-between border-t border-[#d4af37]/20">
                      <div className="text-[9px] font-serif text-[#a89078] tracking-widest uppercase">
                        REEL CREATE POSTER • ORIGINAL LETTER
                      </div>

                      {/* Wax Seal Stamp */}
                      <div
                        className={`w-12 h-12 rounded-full border-2 shadow-lg flex items-center justify-center transform rotate-6 scale-105 select-none ${getSealBg()}`}
                        title="Authentic Wax Seal"
                      >
                        <Heart className="w-5 h-5 fill-current opacity-90" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Folded Vintage Envelope View */
                  <div className="relative z-10 flex flex-col justify-between h-full py-6 space-y-6">
                    {/* Envelope Flap Lines */}
                    <div className="flex items-center justify-between border-b-2 border-dashed border-[#d4af37]/30 pb-3">
                      <div className="text-xs font-mono text-[#d4af37] tracking-wider">
                        BY AIR MAIL / বিশেষ ডাক
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-12 bg-[#802a32] border border-[#d4af37] rounded flex flex-col items-center justify-center text-[7px] text-[#fef08a]">
                          <span>POST</span>
                          <span>💌</span>
                        </div>
                      </div>
                    </div>

                    {/* Recipient on Envelope */}
                    <div className="p-4 bg-[#120c09]/60 rounded-xl border border-[#d4af37]/25 space-y-1">
                      <div className="text-[10px] uppercase font-serif text-[#d4af37]">প্রাপক (To):</div>
                      <div className="text-lg font-bold text-[#fef9c3]">{salutation}</div>
                      <div className="text-xs text-[#a89078] font-mono">ঠিকানা: হৃদয়ের অন্তস্থল, স্মৃতি লেন</div>
                    </div>

                    {/* Center Wax Seal */}
                    <div className="flex items-center justify-center pt-2">
                      <div
                        className={`w-14 h-14 rounded-full border-2 shadow-2xl flex items-center justify-center transform -rotate-3 scale-110 select-none cursor-pointer ${getSealBg()}`}
                        onClick={() => setIsEnvelopeMode(false)}
                      >
                        <Heart className="w-6 h-6 fill-current" />
                      </div>
                    </div>

                    <div className="text-center text-xs text-[#a89078] font-bengali">
                      প্রেরক: <span className="text-[#fef08a]">{signature}</span> • {date}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Download Trigger */}
            <div className="mt-6 w-full max-w-lg">
              <button
                type="button"
                id="download-letter-btn"
                onClick={() => setIsDownloadOpen(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#802a32] via-[#942938] to-[#591b22] text-[#fef9c3] font-bold text-base font-bengali border border-[#d4af37] shadow-xl shadow-[#802a32]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5 text-[#fef08a]" />
                <span>চিঠিটি ডাউনলোড করুন (HD Download)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Pre-written Letters Selector */}
            <div className="bg-[#16100d] rounded-2xl border border-[#3b2d24] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-serif text-[#d4af37] uppercase">
                  <BookOpen className="w-4 h-4" />
                  <span>PRE-WRITTEN LETTERS</span>
                </div>
                <span className="text-[11px] text-[#8c7b6c]">{vintageLetters.length} টি চিঠি</span>
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-52 overflow-y-auto pr-1">
                {vintageLetters.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedTemplate.id === tpl.id
                        ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                        : 'bg-[#1e1612] text-[#d4c3b2] border-[#382a20] hover:bg-[#281d17]'
                    }`}
                  >
                    <div className="text-xs font-bold font-bengali text-[#fef9c3]">{tpl.titleBn}</div>
                    <div className="text-[11px] text-[#9c8976] truncate mt-0.5">“{tpl.body}”</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Text Content Fields */}
            <div className="bg-[#16100d] rounded-2xl border border-[#3b2d24] p-5 space-y-4 font-bengali">
              <div className="flex items-center gap-2 text-xs font-serif text-[#d4af37] uppercase">
                <Feather className="w-4 h-4" />
                <span>আপনার মনের কথা লিখুন</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#c5a059] mb-1">সম্বোধন (Salutation)</label>
                  <input
                    type="text"
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl px-3 py-2 text-sm text-[#fef9c3] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#c5a059] mb-1">তারিখ (Vintage Date)</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl px-3 py-2 text-sm text-[#fef9c3] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#c5a059] mb-1">প্রেমপত্রের মূল বক্তব্য (Letter Body)</label>
                <textarea
                  rows={5}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl p-3 text-sm text-[#fef9c3] focus:border-[#d4af37] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#c5a059] mb-1">উপসংহার (Closing)</label>
                  <input
                    type="text"
                    value={closing}
                    onChange={(e) => setClosing(e.target.value)}
                    className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl px-3 py-2 text-sm text-[#fef9c3] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#c5a059] mb-1">প্রেরকের নাম (Signature)</label>
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full bg-[#1e1612] border border-[#3b2c21] rounded-xl px-3 py-2 text-sm text-[#fef9c3] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Paper & Wax Seal Customization */}
            <div className="bg-[#16100d] rounded-2xl border border-[#3b2d24] p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-serif text-[#d4af37] uppercase">
                <Layers className="w-4 h-4" />
                <span>কাগজের ধরন ও মোমের মোহর</span>
              </div>

              {/* Paper Texture */}
              <div>
                <label className="block text-xs text-[#c5a059] font-bengali mb-2">কাগজের আবহ (Paper Style):</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'parchment', label: '📜 Antique Parchment' },
                    { id: 'antique-sepia', label: '☕ Sepia Brown' },
                    { id: 'rose-paper', label: '🌹 Rose Paper' },
                    { id: 'burnt-edge', label: '🔥 Burnt Edge' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaperTexture(p.id as typeof paperTexture)}
                      className={`py-2 px-3 rounded-xl text-xs font-bengali border transition-all cursor-pointer ${
                        paperTexture === p.id
                          ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                          : 'bg-[#1e1612] text-[#bda996] border-[#382b22] hover:bg-[#281d17]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wax Seal Color */}
              <div>
                <label className="block text-xs text-[#c5a059] font-bengali mb-2">মোমের মোহরের রঙ (Wax Seal):</label>
                <div className="flex items-center gap-3">
                  {[
                    { id: 'burgundy', label: 'Crimson Burgundy', color: '#991b1b' },
                    { id: 'gold', label: 'Imperial Gold', color: '#ca8a04' },
                    { id: 'emerald', label: 'Deep Emerald', color: '#047857' },
                    { id: 'navy', label: 'Royal Navy', color: '#1e40af' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSealColor(s.id as typeof sealColor)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bengali border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        sealColor === s.id ? 'border-[#d4af37] ring-1 ring-[#d4af37]' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: s.color }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-white/70"></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Choice */}
              <div>
                <label className="block text-xs text-[#c5a059] font-bengali mb-2">হস্তাক্ষর ও ফন্ট (Handwriting):</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'handwritten', label: 'ঝরা হস্তাক্ষর (Galada)' },
                    { id: 'serif', label: 'ভিন্টেজ সেরিফ (Noto Serif)' },
                    { id: 'classic', label: 'সহজ বাংলা (Anek Bangla)' },
                    { id: 'typewriter', label: 'টাইপরাইটার (Typewriter)' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFontChoice(f.id as typeof fontChoice)}
                      className={`py-2 px-3 rounded-xl text-xs font-bengali border transition-all cursor-pointer ${
                        fontChoice === f.id
                          ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                          : 'bg-[#1e1612] text-[#bda996] border-[#382b22] hover:bg-[#281d17]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Second Sponsor Download Gate Modal */}
      <DownloadGateModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onPerformDownload={handlePerformDownload}
        posterTitle={`ভিন্টেজ প্রেমপত্র (${salutation})`}
      />
    </div>
  );
};
