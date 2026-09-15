import React from 'react';
import { postcards } from '../data/postcards';
import { PosterPreview } from './PosterPreview';
import { PostcardTemplate, CustomTextStyle } from '../types';
import { Sparkles, Image as ImageIcon, ArrowRight, CheckCircle2, ShieldCheck, Zap, Video, Feather } from 'lucide-react';

interface HeroProps {
  onStartCreating: () => void;
  onExploreGallery: () => void;
  onUseTemplate: (template: PostcardTemplate) => void;
  onOpenReels?: () => void;
  onOpenLetter?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCreating,
  onExploreGallery,
  onUseTemplate,
  onOpenReels,
  onOpenLetter,
}) => {
  const showcaseTemplate = postcards[0]; // Rainy Love

  const showcaseTextStyle: CustomTextStyle = {
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#18120f] via-[#110c0a] to-[#0d0907] border-b border-[#2d2119] pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative ambient lighting elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#802a32]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a1b1d] border border-[#d4af37]/40 shadow-inner">
              <span className="text-base">💌</span>
              <span className="text-xs font-serif text-[#fef08a] font-semibold tracking-wider uppercase">
                Reel Create Poster Archive
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-bengali text-[#fef9c3] leading-tight drop-shadow-md">
              “পুরনো দিনের অনুভূতি, <br />
              <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d77b] to-[#ca8a04] bg-clip-text text-transparent">
                আজকের ভালোবাসার জন্য।
              </span>”
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#d1c2af] font-bengali leading-relaxed max-w-2xl">
              আপনার প্রিয় মানুষটির জন্য তৈরি করুন একটি সুন্দর Vintage Poster।
              রেডিমেড ক্লাসিক প্রেমের উক্তি বেছে নিন, নিজের মনের চিঠি লিখুন এবং হাই-রেজোলিউশনে সংরক্ষণ করুন।
            </p>

            {/* Core 3-Step Flow Indicator: Choose -> Customize -> Download */}
            <div className="p-4 rounded-xl bg-[#18110e]/80 border border-[#382b22] backdrop-blur-sm max-w-xl">
              <div className="flex items-center justify-between text-xs font-bengali text-[#cbb8a3]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#802a32] text-[#fef08a] flex items-center justify-center text-[11px] font-bold border border-[#d4af37]/40">
                    ১
                  </span>
                  <span className="font-semibold text-[#fef9c3]">পোস্টার বাছুন</span>
                </div>
                <span className="text-[#8c7b6c]">→</span>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#802a32] text-[#fef08a] flex items-center justify-center text-[11px] font-bold border border-[#d4af37]/40">
                    ২
                  </span>
                  <span className="font-semibold text-[#fef9c3]">উক্তি কাস্টমাইজ</span>
                </div>
                <span className="text-[#8c7b6c]">→</span>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#802a32] text-[#fef08a] flex items-center justify-center text-[11px] font-bold border border-[#d4af37]/40">
                    ৩
                  </span>
                  <span className="font-semibold text-[#fef9c3]">HD ডাউনলোড</span>
                </div>
              </div>
            </div>

            {/* Creation Modalities: Reels Video / Love Letter / Postcard Image */}
            <div className="grid grid-cols-3 gap-2.5 max-w-xl">
              <button
                type="button"
                id="hero-mode-reels-btn"
                onClick={onOpenReels || onStartCreating}
                className="p-3 rounded-xl bg-[#1e1511] hover:bg-[#2c1d18] border border-[#d4af37]/40 hover:border-[#d4af37] text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#fef08a] font-bold font-bengali">
                  <Video className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
                  <span>রিলস ভিডিও</span>
                </div>
                <div className="text-[10px] text-[#9c8976] mt-0.5">9:16 অ্যানিমেটেড রিল</div>
              </button>

              <button
                type="button"
                id="hero-mode-letter-btn"
                onClick={onOpenLetter || onStartCreating}
                className="p-3 rounded-xl bg-[#1e1511] hover:bg-[#2c1d18] border border-[#d4af37]/40 hover:border-[#d4af37] text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#fef08a] font-bold font-bengali">
                  <Feather className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
                  <span>প্রেমপত্র (Letter)</span>
                </div>
                <div className="text-[10px] text-[#9c8976] mt-0.5">পার্চমেন্ট ও মোমের মোহর</div>
              </button>

              <button
                type="button"
                id="hero-mode-poster-btn"
                onClick={onStartCreating}
                className="p-3 rounded-xl bg-[#1e1511] hover:bg-[#2c1d18] border border-[#d4af37]/40 hover:border-[#d4af37] text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs text-[#fef08a] font-bold font-bengali">
                  <ImageIcon className="w-3.5 h-3.5 text-[#d4af37] group-hover:scale-110 transition-transform" />
                  <span>পোস্টার ইমেজ</span>
                </div>
                <div className="text-[10px] text-[#9c8976] mt-0.5">HD ছবি ও পোস্টকার্ড</div>
              </button>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-primary-cta"
                onClick={onStartCreating}
                className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-[#802a32] via-[#9e2a3b] to-[#591b22] text-[#fef9c3] font-bold text-base font-bengali border border-[#d4af37]/50 shadow-xl shadow-[#802a32]/30 hover:shadow-[#d4af37]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#fef08a] animate-spin" />
                <span>✨ পোস্টার তৈরি করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onExploreGallery}
                className="py-3.5 px-6 rounded-xl bg-[#1c1410] hover:bg-[#281d18] text-[#e3d7c3] hover:text-[#fef08a] font-semibold text-base font-bengali border border-[#3b2d24] hover:border-[#d4af37]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ImageIcon className="w-5 h-5 text-[#d4af37]" />
                <span>🖼️ Vintage Gallery দেখুন</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-[#8c7b6c]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span>কোনো রেজিস্ট্রেশন বা লগইন প্রয়োজন নেই</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#d4af37]" />
                <span>ফ্রি আল্ট্রা HD ডাউনলোড</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>১০০% রেট্রো ও ভিন্টেজ আর্টওয়ার্ক</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Vintage Poster Preview Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#d4af37]/30 to-[#802a32]/30 rounded-2xl blur-sm"></div>

              <div className="relative bg-[#1a120e] rounded-2xl border-2 border-[#d4af37]/60 p-3 sm:p-4 shadow-2xl shadow-black/80">
                <div className="flex items-center justify-between pb-3 px-1 border-b border-[#34261e] mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
                    <span className="font-serif font-bold text-[#fef08a] tracking-wider">LIVE PREVIEW</span>
                  </div>
                  <span className="text-[#a89078] font-mono text-[11px]">POSTCARD ARCHIVE</span>
                </div>

                {/* Render the Poster Component */}
                <PosterPreview
                  template={showcaseTemplate}
                  recipient="প্রিয়তমা"
                  mainQuote={showcaseTemplate.defaultQuote}
                  sender="ইতি, তোমার মেঘবালক"
                  date="শ্রাবণ, ১৩৩২"
                  textStyle={showcaseTextStyle}
                  effect="warm-vintage"
                  aspectRatio="postcard"
                  showStamp={true}
                  showPostmark={true}
                />

                {/* Quick Action under Preview */}
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-xs font-bengali text-[#c5a059]">
                    বৃষ্টির প্রেম (Rainy Love)
                  </span>
                  <button
                    id="hero-use-showcase-btn"
                    onClick={() => onUseTemplate(showcaseTemplate)}
                    className="px-3 py-1.5 rounded-lg bg-[#802a32] hover:bg-[#9c2d3a] text-[#fef9c3] text-xs font-bengali font-semibold border border-[#d4af37]/40 flex items-center gap-1 cursor-pointer"
                  >
                    <span>এই ডিজাইনটি ব্যবহার করুন</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
