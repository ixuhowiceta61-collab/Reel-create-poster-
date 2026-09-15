import React from 'react';
import { VintageEffect } from '../types';
import { Sparkles } from 'lucide-react';

interface EffectSelectorProps {
  selectedEffect: VintageEffect;
  onSelect: (effect: VintageEffect) => void;
}

export const EffectSelector: React.FC<EffectSelectorProps> = ({
  selectedEffect,
  onSelect,
}) => {
  const effects: { id: VintageEffect; labelBn: string; labelEn: string; desc: string }[] = [
    { id: 'original', labelBn: 'অরিজিনাল', labelEn: 'Original', desc: 'স্বাভাবিক ভিন্টেজ' },
    { id: 'sepia', labelBn: 'সেপিয়া', labelEn: 'Sepia', desc: 'সোনালী পুরনো আভা' },
    { id: 'old-paper', labelBn: 'পুরনো কাগজ', labelEn: 'Old Paper', desc: 'হলুদাভ পার্চমেন্ট' },
    { id: 'faded', labelBn: 'বিবর্ণ স্মৃতি', labelEn: 'Faded', desc: 'ধূসর স্মৃতির ছোঁয়া' },
    { id: 'bw', labelBn: 'সাদাকালো', labelEn: 'Black & White', desc: 'ক্লাসিক একরঙা' },
    { id: 'film-grain', labelBn: 'ফিল্ম গ্রেইন', labelEn: 'Film Grain', desc: 'রেট্রো সিনেমা লুক' },
    { id: 'dust', labelBn: 'ধূলিকণা', labelEn: 'Dust & Vintage', desc: 'আর্কাইভাল ফ্লেক্স' },
    { id: 'scratch', labelBn: 'স্ক্র্যাচ', labelEn: 'Scratch', desc: 'পুরনো নেগেটিভ' },
    { id: 'coffee-stain', labelBn: 'কফির দাগ', labelEn: 'Coffee Stain', desc: 'চিঠিতে কফির ছোঁয়া' },
    { id: 'warm-vintage', labelBn: 'উষ্ণ ভিন্টেজ', labelEn: 'Warm Vintage', desc: 'গোধূলির মৃদু আলো' },
  ];

  return (
    <div className="bg-[#18120e] border border-[#3b2d24] rounded-xl p-4 sm:p-5 text-[#f4ecd8] space-y-3">
      <div className="flex items-center justify-between border-b border-[#2d221b] pb-2.5">
        <h4 className="font-serif text-[#fef08a] font-semibold text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>ভিন্টেজ ইফেক্টস (Vintage Effects)</span>
        </h4>
        <span className="text-[11px] text-[#8c7b6c]">১০টি নান্দনিক শৈলী</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {effects.map((ef) => (
          <button
            key={ef.id}
            type="button"
            id={`effect-${ef.id}`}
            onClick={() => onSelect(ef.id)}
            className={`p-2.5 rounded-lg border text-left transition-all text-xs cursor-pointer ${
              selectedEffect === ef.id
                ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37] shadow-sm'
                : 'bg-[#1e1713] text-[#cfbeaa] border-[#382b22] hover:border-[#802a32]'
            }`}
          >
            <div className="font-bengali font-semibold text-xs truncate">{ef.labelBn}</div>
            <div className="text-[10px] opacity-70 font-mono">{ef.labelEn}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
