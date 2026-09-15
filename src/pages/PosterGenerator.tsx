import React, { useState, useRef, useEffect } from 'react';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import {
  PostcardTemplate,
  RomanticQuote,
  CustomTextStyle,
  VintageEffect,
  AspectRatioFormat,
  TypographyStyle,
  TextPosition,
} from '../types';
import { PosterPreview } from '../components/PosterPreview';
import { QuoteSelector } from '../components/QuoteSelector';
import { CustomTextEditor } from '../components/CustomTextEditor';
import { TextControls } from '../components/TextControls';
import { EffectSelector } from '../components/EffectSelector';
import { FormatSelector } from '../components/FormatSelector';
import { DownloadGateModal } from '../components/DownloadGateModal';
import { exportPosterImage } from '../utils/exporter';
import { getVintageArtworkSvg } from '../utils/artworks';
import { ReelStudio } from '../components/ReelStudio';
import { LetterStudio } from '../components/LetterStudio';
import {
  Sparkles,
  Download,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Video,
  Feather,
  Image as ImageIcon,
} from 'lucide-react';

interface PosterGeneratorProps {
  initialTemplate?: PostcardTemplate;
  initialQuote?: RomanticQuote;
  initialMode?: 'image' | 'reels' | 'letter';
}

const DEFAULT_TEXT_STYLE: CustomTextStyle = {
  fontFamily: 'elegant-bengali',
  fontSize: 20,
  isBold: false,
  isItalic: false,
  textAlign: 'center',
  letterSpacing: 0.02,
  lineHeight: 1.6,
  textColor: '#f5edd8',
  textPosition: 'center',
};

export const PosterGenerator: React.FC<PosterGeneratorProps> = ({
  initialTemplate,
  initialQuote,
  initialMode = 'image',
}) => {
  // Mode: 'image' | 'reels' | 'letter'
  const [mode, setMode] = useState<'image' | 'reels' | 'letter'>(initialMode);

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  // Selected Template
  const [selectedTemplate, setSelectedTemplate] = useState<PostcardTemplate>(
    initialTemplate || postcards[0]
  );

  // Template browser category filter
  const [templateCategory, setTemplateCategory] = useState<string>('সব');
  const [isTemplateBrowserOpen, setIsTemplateBrowserOpen] = useState(true);

  // Postcard texts
  const [recipient, setRecipient] = useState<string>('প্রিয়তমা');
  const [mainQuote, setMainQuote] = useState<string>(
    initialQuote?.text || selectedTemplate.defaultQuote
  );
  const [sender, setSender] = useState<string>('ইতি, তোমার...');
  const [date, setDate] = useState<string>(selectedTemplate.defaultDate || 'শ্রাবণ, ১৩৩২');

  // Text Styling
  const [textStyle, setTextStyle] = useState<CustomTextStyle>(DEFAULT_TEXT_STYLE);

  // Vintage Effect
  const [effect, setEffect] = useState<VintageEffect>('warm-vintage');

  // Aspect Ratio Format
  const [aspectRatio, setAspectRatio] = useState<AspectRatioFormat>('postcard');

  // Stamp toggle
  const [showStamp, setShowStamp] = useState(true);

  // Download Gate Modal state
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Preview container DOM ref for exporting
  const previewRef = useRef<HTMLDivElement>(null);

  // Update if initial props change
  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate);
      if (!initialQuote) {
        setMainQuote(initialTemplate.defaultQuote);
      }
      if (initialTemplate.defaultDate) {
        setDate(initialTemplate.defaultDate);
      }
    }
  }, [initialTemplate]);

  useEffect(() => {
    if (initialQuote) {
      setMainQuote(initialQuote.text);
    }
  }, [initialQuote]);

  // Handle template selection
  const handleSelectTemplate = (template: PostcardTemplate) => {
    setSelectedTemplate(template);
    if (!mainQuote || mainQuote === selectedTemplate.defaultQuote) {
      setMainQuote(template.defaultQuote);
    }
    if (template.defaultDate) {
      setDate(template.defaultDate);
    }
  };

  // Handle quote selection from QuoteSelector
  const handleSelectQuote = (quote: RomanticQuote) => {
    setMainQuote(quote.text);
  };

  // Surprise Me logic
  const handleSurpriseMe = () => {
    const randomTemplate = postcards[Math.floor(Math.random() * postcards.length)];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    const fonts: TypographyStyle[] = [
      'elegant-bengali',
      'handwritten',
      'vintage-serif',
      'typewriter',
      'classic',
      'calligraphy',
      'old-newspaper',
    ];
    const effects: VintageEffect[] = [
      'original',
      'sepia',
      'old-paper',
      'faded',
      'bw',
      'film-grain',
      'dust',
      'scratch',
      'coffee-stain',
      'warm-vintage',
    ];
    const positions: TextPosition[] = ['center', 'top', 'bottom', 'center-left', 'center-right'];
    const colors = ['#f5edd8', '#d4af37', '#fda4af', '#fef08a', '#fed7aa', '#ffffff'];

    const chosenFont = fonts[Math.floor(Math.random() * fonts.length)];
    const chosenEffect = effects[Math.floor(Math.random() * effects.length)];
    const chosenPos = positions[Math.floor(Math.random() * positions.length)];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];

    setSelectedTemplate(randomTemplate);
    setMainQuote(randomQuote.text);
    setEffect(chosenEffect);
    setTextStyle({
      ...DEFAULT_TEXT_STYLE,
      fontFamily: chosenFont,
      textPosition: chosenPos,
      textColor: chosenColor,
      fontSize: 20,
    });
  };

  // Update text style
  const handleUpdateTextStyle = (updated: Partial<CustomTextStyle>) => {
    setTextStyle((prev) => ({ ...prev, ...updated }));
  };

  const handleResetTextStyle = () => {
    setTextStyle(DEFAULT_TEXT_STYLE);
  };

  // Perform actual export using html2canvas
  const handlePerformDownload = async (format: 'png' | 'jpeg') => {
    if (!previewRef.current) return;
    const sanitizedTitle = selectedTemplate.title.toLowerCase().replace(/\s+/g, '-');
    const fileName = `reel-create-poster-${sanitizedTitle}-${Date.now()}`;
    await exportPosterImage({
      element: previewRef.current,
      fileName,
      format,
      scale: 3,
    });
  };

  // Filter templates
  const templateCategories = ['সব', 'প্রেম', 'রোমান্টিক', 'বৃষ্টি', 'প্রেমপত্র', 'Classic Vintage', 'Bengali Vintage'];
  const filteredTemplates = postcards.filter((t) => {
    if (templateCategory === 'সব') return true;
    return t.category === templateCategory;
  });

  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Output Format Mode Selector (Reels / Letter / Image) */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-[#18110e] border border-[#3b2d24] shadow-2xl gap-1">
            <button
              type="button"
              id="mode-switch-reels"
              onClick={() => setMode('reels')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bengali font-bold flex items-center gap-2 transition-all cursor-pointer ${
                mode === 'reels'
                  ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]/50 shadow-lg shadow-[#802a32]/40'
                  : 'text-[#a39281] hover:text-[#fef08a] hover:bg-[#241813]'
              }`}
            >
              <Video className="w-4 h-4 text-[#d4af37]" />
              <span>🎬 রিলস ভিডিও (Reels Video)</span>
            </button>

            <button
              type="button"
              id="mode-switch-letter"
              onClick={() => setMode('letter')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bengali font-bold flex items-center gap-2 transition-all cursor-pointer ${
                mode === 'letter'
                  ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]/50 shadow-lg shadow-[#802a32]/40'
                  : 'text-[#a39281] hover:text-[#fef08a] hover:bg-[#241813]'
              }`}
            >
              <Feather className="w-4 h-4 text-[#d4af37]" />
              <span>📜 ভিন্টেজ প্রেমপত্র (Love Letter)</span>
            </button>

            <button
              type="button"
              id="mode-switch-image"
              onClick={() => setMode('image')}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bengali font-bold flex items-center gap-2 transition-all cursor-pointer ${
                mode === 'image'
                  ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]/50 shadow-lg shadow-[#802a32]/40'
                  : 'text-[#a39281] hover:text-[#fef08a] hover:bg-[#241813]'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-[#d4af37]" />
              <span>🖼️ পোস্টকার্ড ছবি (Postcard Image)</span>
            </button>
          </div>
        </div>

        {/* Render Reel Studio */}
        {mode === 'reels' && <ReelStudio />}

        {/* Render Letter Studio */}
        {mode === 'letter' && <LetterStudio />}

        {/* Render Classic Poster Image Generator */}
        {mode === 'image' && (
          <div>
            {/* Page Title & Breadcrumb */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d2119] pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-serif text-[#d4af37] uppercase tracking-wider mb-1">
                  <span>POSTCARD GENERATOR</span>
                  <span>•</span>
                  <span>HD STUDIO</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold font-bengali text-[#fef9c3]">
                  ভিন্টেজ পোস্টার জেনারেটর
                </h1>
                <p className="text-xs sm:text-sm text-[#a89078] font-bengali mt-1">
                  টেমপ্লেট নির্বাচন করুন, প্রেমের উক্তি সাজান এবং HD কোয়ালিটিতে ডাউনলোড করুন
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="generator-reset-btn"
                  onClick={handleResetTextStyle}
                  className="px-3.5 py-2 rounded-lg bg-[#1c1410] hover:bg-[#2a1d17] border border-[#3b2d24] text-xs font-bengali text-[#c5b5a2] hover:text-[#fef08a] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>রিসেট করুন</span>
                </button>

                {/* Primary Download trigger */}
                <button
                  type="button"
                  id="generator-download-cta"
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#802a32] via-[#9e2a3b] to-[#591b22] text-[#fef9c3] font-bold text-sm font-bengali border border-[#d4af37]/50 shadow-xl shadow-[#802a32]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#fef08a]" />
                  <span>⬇️ HD পোস্টার ডাউনলোড করুন</span>
                </button>
              </div>
            </div>

            {/* Studio Layout: Left Controls, Right Sticky Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column (7 Cols on desktop) */}
              <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: Template Selection */}
            <div className="bg-[#18120e] border border-[#3b2d24] rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#2d221b] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#802a32] text-[#fef08a] flex items-center justify-center text-xs font-bold border border-[#d4af37]/40">
                    ১
                  </span>
                  <h3 className="font-serif text-[#fef08a] font-semibold text-sm">
                    ১. পোস্টার নির্বাচন করুন (Choose Template)
                  </h3>
                </div>

                <button
                  type="button"
                  id="toggle-template-browser-btn"
                  onClick={() => setIsTemplateBrowserOpen(!isTemplateBrowserOpen)}
                  className="text-xs text-[#a89078] hover:text-[#fef08a] flex items-center gap-1 cursor-pointer"
                >
                  <span>{isTemplateBrowserOpen ? 'সংকোচন করুন' : 'সকল টেমপ্লেট দেখুন'}</span>
                  {isTemplateBrowserOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {isTemplateBrowserOpen && (
                <>
                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {templateCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        id={`template-cat-${cat}`}
                        onClick={() => setTemplateCategory(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-bengali whitespace-nowrap transition-all cursor-pointer ${
                          templateCategory === cat
                            ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]'
                            : 'bg-[#1f1713] text-[#a39281] hover:bg-[#2b1f19] border border-transparent'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Template Thumbnails Carousel / Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[280px] overflow-y-auto pr-1">
                    {filteredTemplates.map((tpl) => {
                      const isChosen = selectedTemplate.id === tpl.id;
                      const artworkSvg = getVintageArtworkSvg(tpl.artworkType, tpl.themeColor);
                      return (
                        <button
                          key={tpl.id}
                          type="button"
                          id={`template-thumb-${tpl.id}`}
                          onClick={() => handleSelectTemplate(tpl)}
                          className={`group relative rounded-xl overflow-hidden border text-left transition-all p-1.5 flex flex-col justify-between cursor-pointer ${
                            isChosen
                              ? 'bg-[#2d1b1f] border-[#d4af37] ring-2 ring-[#d4af37]/40 shadow-lg'
                              : 'bg-[#1a1310] border-[#382a20] hover:border-[#802a32]'
                          }`}
                        >
                          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#100b08] mb-1.5">
                            <div
                              className="w-full h-full transform group-hover:scale-105 transition-transform"
                              dangerouslySetInnerHTML={{ __html: artworkSvg }}
                            />
                            {isChosen && (
                              <div className="absolute inset-0 bg-[#802a32]/30 flex items-center justify-center">
                                <span className="w-6 h-6 rounded-full bg-[#d4af37] text-[#1c120c] flex items-center justify-center text-xs font-bold shadow-md">
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bengali text-xs font-bold text-[#fef9c3] line-clamp-1">
                              {tpl.titleBn}
                            </div>
                            <div className="text-[10px] text-[#8c7b6c] font-bengali truncate">
                              {tpl.category}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* STEP 2: Quote Selection & Surprise Me */}
            <QuoteSelector
              currentQuote={mainQuote}
              onSelectQuote={handleSelectQuote}
              onSurpriseMe={handleSurpriseMe}
            />

            {/* STEP 3: Custom Text Editor */}
            <CustomTextEditor
              recipient={recipient}
              setRecipient={setRecipient}
              mainQuote={mainQuote}
              setMainQuote={setMainQuote}
              sender={sender}
              setSender={setSender}
              date={date}
              setDate={setDate}
            />

            {/* STEP 4: Typography & Text Controls */}
            <TextControls
              textStyle={textStyle}
              onChange={handleUpdateTextStyle}
              onReset={handleResetTextStyle}
            />

            {/* STEP 5: Vintage Effects */}
            <EffectSelector
              selectedEffect={effect}
              onSelect={setEffect}
            />

            {/* STEP 6: Social Media Export Size / Aspect Ratio */}
            <FormatSelector
              selectedFormat={aspectRatio}
              onSelect={setAspectRatio}
            />
          </div>

          {/* Sticky Live Preview Column (5 Cols on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            <div className="bg-[#18120e] rounded-2xl border-2 border-[#d4af37]/60 p-4 sm:p-5 shadow-2xl shadow-black/80 space-y-4">
              {/* Preview Header */}
              <div className="flex items-center justify-between border-b border-[#31241b] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="font-serif font-bold text-xs uppercase tracking-wider text-[#fef08a]">
                    LIVE PREVIEW
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[#a89078] flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      id="toggle-stamp-checkbox"
                      checked={showStamp}
                      onChange={(e) => setShowStamp(e.target.checked)}
                      className="rounded accent-[#d4af37]"
                    />
                    <span>ডাকটিকেট (Stamp)</span>
                  </label>
                </div>
              </div>

              {/* The Actual Canvas Component */}
              <div className="relative flex items-center justify-center p-2 bg-[#0e0907] rounded-xl border border-[#2a1d16] overflow-hidden">
                <PosterPreview
                  ref={previewRef}
                  template={selectedTemplate}
                  recipient={recipient}
                  mainQuote={mainQuote}
                  sender={sender}
                  date={date}
                  textStyle={textStyle}
                  effect={effect}
                  aspectRatio={aspectRatio}
                  showStamp={showStamp}
                  showPostmark={showStamp}
                />
              </div>

              {/* Download CTA under Preview */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  id="preview-main-download-btn"
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#802a32] via-[#9e2a3b] to-[#6b1b24] text-[#fef9c3] font-bold font-bengali text-base border border-[#d4af37] shadow-xl shadow-[#802a32]/35 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Download className="w-5 h-5 text-[#fef08a]" />
                  <span>⬇️ HD পোস্টার ডাউনলোড করুন</span>
                </button>
                <p className="text-[11px] text-[#8a7767] text-center font-bengali">
                  ডাউনলোড করার আগে স্পন্সর পেজ উন্মুক্ত হবে • ওয়াটারমার্ক মুক্ত
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* 8-Second Sponsor Gate Download Modal */}
      <DownloadGateModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onPerformDownload={handlePerformDownload}
        posterTitle={`${selectedTemplate.titleBn} (${selectedTemplate.title})`}
      />
    </div>
  );
};
