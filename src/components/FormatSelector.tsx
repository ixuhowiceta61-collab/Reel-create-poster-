import React from 'react';
import { AspectRatioFormat } from '../types';
import { Share2, Smartphone, Square, Layout, MessageCircle } from 'lucide-react';

interface FormatSelectorProps {
  selectedFormat: AspectRatioFormat;
  onSelect: (format: AspectRatioFormat) => void;
}

export const FormatSelector: React.FC<FormatSelectorProps> = ({
  selectedFormat,
  onSelect,
}) => {
  const formats: {
    id: AspectRatioFormat;
    nameBn: string;
    nameEn: string;
    ratio: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'postcard',
      nameBn: 'ভিন্টেজ পোস্টকার্ড',
      nameEn: 'Postcard (4:3)',
      ratio: '4:3',
      icon: Layout,
    },
    {
      id: 'square',
      nameBn: 'ইনস্টাগ্রাম স্কয়ার',
      nameEn: 'Instagram Square (1:1)',
      ratio: '1:1',
      icon: Square,
    },
    {
      id: 'story',
      nameBn: 'ইনস্টাগ্রাম স্টোরি',
      nameEn: 'Instagram Story (9:16)',
      ratio: '9:16',
      icon: Smartphone,
    },
    {
      id: 'facebook',
      nameBn: 'ফেসবুক পোস্ট',
      nameEn: 'Facebook Post (1.91:1)',
      ratio: '1.91:1',
      icon: Share2,
    },
    {
      id: 'whatsapp',
      nameBn: 'হোয়াটসঅ্যাপ স্ট্যাটাস',
      nameEn: 'WhatsApp Status (9:16)',
      ratio: '9:16',
      icon: MessageCircle,
    },
  ];

  return (
    <div className="bg-[#18120e] border border-[#3b2d24] rounded-xl p-4 sm:p-5 text-[#f4ecd8] space-y-3">
      <div className="flex items-center justify-between border-b border-[#2d221b] pb-2.5">
        <h4 className="font-serif text-[#fef08a] font-semibold text-sm flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#d4af37]" />
          <span>সোশ্যাল মিডিয়া এক্সপোর্ট সাইজ (Export Format)</span>
        </h4>
        <span className="text-[11px] text-[#8c7b6c]">স্বয়ংক্রিয় অনুপাত সমন্বয়</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {formats.map((fmt) => {
          const Icon = fmt.icon;
          const isSelected = selectedFormat === fmt.id;
          return (
            <button
              key={fmt.id}
              type="button"
              id={`format-btn-${fmt.id}`}
              onClick={() => onSelect(fmt.id)}
              className={`p-2.5 rounded-lg border text-left transition-all text-xs cursor-pointer flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37] shadow-sm'
                  : 'bg-[#1e1713] text-[#cfbeaa] border-[#382b22] hover:border-[#802a32]'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#fef08a]' : 'text-[#a39281]'}`} />
                <span className="font-mono text-[10px] bg-[#120c09] px-1.5 py-0.5 rounded border border-[#33241b]">
                  {fmt.ratio}
                </span>
              </div>
              <div>
                <div className="font-bengali font-semibold text-xs leading-tight truncate">
                  {fmt.nameBn}
                </div>
                <div className="text-[10px] opacity-70 font-mono mt-0.5 truncate">{fmt.nameEn}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
