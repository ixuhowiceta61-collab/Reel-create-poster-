import { LanguageOption } from '../types';
export type { LanguageOption };

export const GLOBAL_LANGUAGES: LanguageOption[] = [
  // Primary Language
  { code: 'bn', name: 'Bangla (Bengali)', nativeName: 'বাংলা', flag: '🇧🇩', region: 'Bangladesh', popular: true },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'Global', popular: true },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', isRtl: true, region: 'Middle East', popular: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Europe/Americas', popular: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'Asia', popular: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', isRtl: true, region: 'Asia', popular: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'Europe', popular: true },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Europe', popular: true },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', region: 'Americas/Europe', popular: true },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Europe/Asia', popular: true },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Asia', popular: true },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'Asia', popular: true },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '中文(简体)', flag: '🇨🇳', region: 'Asia', popular: true },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Europe/Asia', popular: true },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Europe', popular: true },
  
  // RTL Languages
  { code: 'fa', name: 'Persian (Farsi)', nativeName: 'فارسی', flag: '🇮🇷', isRtl: true, region: 'Middle East', popular: true },
  
  // Other Major Global Languages
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', region: 'Asia', popular: false },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', region: 'Asia', popular: false },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', region: 'Asia', popular: false },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'Europe', popular: false },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'Europe', popular: false },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', region: 'Asia', popular: false },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', region: 'Africa', popular: false },
  { code: 'tl', name: 'Filipino (Tagalog)', nativeName: 'Filipino', flag: '🇵🇭', region: 'Asia', popular: false },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', region: 'Europe', popular: false },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', region: 'Europe', popular: false },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', region: 'Europe', popular: false },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', region: 'Europe', popular: false },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Asia', popular: false },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Asia', popular: false },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'Asia', popular: false },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', region: 'Asia', popular: false },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'Asia', popular: false },
];

export const RTL_LANGUAGES = new Set(['ar', 'ur', 'fa', 'ps', 'yi', 'sd']);

export function isRtlLanguage(code: string): boolean {
  if (!code) return false;
  const base = code.split('-')[0].toLowerCase();
  return RTL_LANGUAGES.has(base);
}

export function getLanguageByCode(code: string): LanguageOption | undefined {
  if (!code) return undefined;
  const normalized = code.toLowerCase();
  const base = normalized.split('-')[0];
  return (
    GLOBAL_LANGUAGES.find((l) => l.code.toLowerCase() === normalized) ||
    GLOBAL_LANGUAGES.find((l) => l.code.toLowerCase() === base)
  );
}
