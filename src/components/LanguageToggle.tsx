import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  showIcon = true,
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#1a120f] border border-[#3e2e25] text-xs shadow-inner ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      {showIcon && (
        <span className="pl-1.5 pr-0.5 text-[#a39281]">
          <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
        </span>
      )}

      <button
        type="button"
        id="lang-toggle-bn"
        onClick={() => setLanguage('bn')}
        className={`px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer text-xs font-medium ${
          language === 'bn'
            ? 'bg-gradient-to-r from-[#802a32] to-[#591b22] text-[#fef08a] font-bold shadow-sm border border-[#d4af37]/40'
            : 'text-[#9e8c7c] hover:text-[#f4ecd8] hover:bg-[#2c201a]'
        }`}
        title="বাংলা ভাষা নির্বাচন করুন"
        aria-pressed={language === 'bn'}
      >
        বাংলা
      </button>

      <span className="text-[#4a3a30] text-[10px] select-none">|</span>

      <button
        type="button"
        id="lang-toggle-en"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer text-xs font-medium ${
          language === 'en'
            ? 'bg-gradient-to-r from-[#802a32] to-[#591b22] text-[#fef08a] font-bold shadow-sm border border-[#d4af37]/40'
            : 'text-[#9e8c7c] hover:text-[#f4ecd8] hover:bg-[#2c201a]'
        }`}
        title="Switch to English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
};
