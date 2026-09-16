import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isBn: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Automatically detect default language based on user location and browser settings
function detectInitialLanguage(): Language {
  // 1. Explicit user choice stored in localStorage
  try {
    const saved = localStorage.getItem('app_language');
    if (saved === 'bn' || saved === 'en') {
      return saved;
    }
  } catch {}

  // 2. Location / Timezone check: Bangladesh visitors use Asia/Dhaka
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (
      timeZone &&
      (timeZone === 'Asia/Dhaka' ||
        timeZone.toLowerCase().includes('dhaka') ||
        timeZone.toLowerCase().includes('bangladesh'))
    ) {
      return 'bn';
    }
  } catch {}

  // 3. Browser language check: Bengali speakers
  try {
    const langs = navigator.languages || [navigator.language];
    for (const lang of langs) {
      if (lang && lang.toLowerCase().startsWith('bn')) {
        return 'bn';
      }
    }
  } catch {}

  // 4. Default for all other international visitors
  return 'en';
}

export const translations: Record<string, { bn: string; en: string }> = {
  // Brand & General
  'brand.name': {
    bn: 'Reel Create Poster',
    en: 'Reel Create Poster',
  },
  'brand.tagline': {
    bn: 'পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য',
    en: 'Vintage feelings, crafted for modern love',
  },
  'brand.description': {
    bn: 'আপনার প্রিয় মানুষটির জন্য তৈরি করুন একটি সুন্দর Vintage Poster ও প্রেমের চিঠি।',
    en: 'Craft timeless vintage love posters, 9:16 reels videos, and antique letters for your loved ones.',
  },

  // Navigation Items
  'nav.home': { bn: 'হোম', en: 'Home' },
  'nav.reels': { bn: 'রিলস ভিডিও', en: 'Reels Video' },
  'nav.letter': { bn: 'ভিন্টেজ প্রেমপত্র', en: 'Love Letter' },
  'nav.create': { bn: 'পোস্টার তৈরি', en: 'Create Poster' },
  'nav.postcards': { bn: 'পোস্টকার্ড ফ্রেম', en: 'Postcards' },
  'nav.quotes': { bn: 'উক্তি সংগ্রহ', en: 'Romantic Quotes' },
  'nav.gallery': { bn: 'গ্যালারি', en: 'Gallery' },
  'nav.categories': { bn: 'ক্যাটাগরি', en: 'Categories' },
  'nav.favorites': { bn: 'পছন্দ', en: 'Favorites' },
  'nav.search': { bn: 'অনুসন্ধান', en: 'Search' },
  'nav.search.placeholder': { bn: 'উক্তি, পোস্টার বা বিষয় খুঁজুন... (Ctrl+K)', en: 'Search quotes, postcards, themes... (Ctrl+K)' },
  'nav.create.cta': { bn: 'পোস্টার তৈরি করুন', en: 'Create Poster' },

  // Hero Section
  'hero.archive_badge': { bn: 'ভিন্টেজ পোস্টার ও চিঠি আর্কাইভ', en: 'Vintage Poster & Letter Archive' },
  'hero.headline.part1': { bn: '“পুরনো দিনের অনুভূতি,', en: '“Vintage Feelings,' },
  'hero.headline.part2': { bn: 'আজকের ভালোবাসার জন্য।”', en: 'For Modern Love.”' },
  'hero.subheadline': {
    bn: 'আপনার মনের অপ্রকাশিত অনুভূতিগুলো রূপ দিন ১৯শ শতকের ভিন্টেজ পোস্টকার্ড, ৯:১৬ অ্যানিমেটেড রিলস ভিডিও ও হাতে লেখা প্রেমপত্রে। সম্পূর্ণ বিনামূল্যে এবং কোনো ওয়াটারমার্ক ছাড়া।',
    en: 'Turn your unspoken romantic thoughts into 19th-century vintage postcards, 9:16 vertical reels videos, and handcrafted letters. 100% free with no watermark.',
  },
  'hero.btn.create': { bn: 'পোস্টার তৈরি শুরু করুন', en: 'Start Making Poster' },
  'hero.btn.reels': { bn: '৯:১৬ রিলস ভিডিও', en: '9:16 Reels Studio' },
  'hero.btn.letter': { bn: 'ভিন্টেজ প্রেমপত্র', en: 'Vintage Love Letter' },
  'hero.btn.explore': { bn: 'পোস্টকার্ড দেখুন', en: 'Explore Postcards' },
  'hero.feat.free_hd': { bn: '১০০% ফ্রি আল্ট্রা-HD এক্সপোর্ট', en: '100% Free Ultra-HD Export' },
  'hero.feat.no_watermark': { bn: 'কোনো ওয়াটারমার্ক নেই', en: 'No Watermark' },
  'hero.feat.social_ready': { bn: 'ইন্সটাগ্রাম ও ফেসবুক রিলস ফ্রেন্ডলি', en: 'Instagram & Facebook Reels Ready' },
  'hero.stat.templates': { bn: '১৬+ ভিন্টেজ ফ্রেম', en: '16+ Vintage Frames' },
  'hero.stat.quotes': { bn: '২২+ রোমান্টিক উক্তি', en: '22+ Romantic Quotes' },
  'hero.stat.quality': { bn: '৪K ক্রিস্প কোয়ালিটি', en: '4K Ultra Quality' },

  // Categories Section
  'cat.title': { bn: 'অনুভূতির ক্যাটাগরি', en: 'Explore by Mood & Theme' },
  'cat.subtitle': { bn: 'আপনার বর্তমান অনুভূতি অনুযায়ী পোস্টার ফ্রেম নির্বাচন করুন', en: 'Choose artistic frames designed around emotional moods and vintage aesthetics' },
  'cat.view_all': { bn: 'সব ক্যাটাগরি দেখুন', en: 'View All Categories' },
  'cat.posters_count': { bn: 'টি পোস্টার', en: 'Postcards' },

  // Featured Posters
  'featured.title': { bn: 'জনপ্রিয় ভিন্টেজ পোস্টার ফ্রেম', en: 'Featured Vintage Postcards' },
  'featured.subtitle': { bn: 'সবচেয়ে বেশি ব্যবহৃত প্রেম, বিরহ ও স্মৃতির নস্টালজিক ফ্রেমসমূহ', en: 'Most cherished collections of love, monsoon, and nostalgic postcards' },
  'featured.tab.all': { bn: 'সকল ফ্রেম', en: 'All Frames' },
  'featured.tab.popular': { bn: 'জনপ্রিয়', en: 'Popular' },
  'featured.tab.new': { bn: 'নতুন', en: 'New Arrivals' },
  'featured.tab.rainy': { bn: 'বৃষ্টি', en: 'Rainy' },
  'featured.tab.romantic': { bn: 'রোমান্টিক', en: 'Romantic' },
  'featured.tab.classic': { bn: 'ক্লাসিক', en: 'Classic' },
  'featured.use_template': { bn: 'এই ফ্রেমে তৈরি করুন', en: 'Use This Template' },
  'featured.explore_all': { bn: 'সব পোস্টার এক্সপ্লোর করুন', en: 'Explore All Postcards' },

  // Quote Banner
  'banner.quote': {
    bn: '“তোমাকে পাওয়ার জন্য নয়, তোমাকে একদিন ভালোবেসেছিলাম—শুধু ভালোবাসার প্রয়োজনে।”',
    en: '“I did not love you to possess you; I loved you simply because love needed to exist.”',
  },
  'banner.author': {
    bn: '— অমর প্রেমপত্র সংগ্রহ • REEL CREATE POSTER',
    en: '— Eternal Love Letter Collection • REEL CREATE POSTER',
  },
  'banner.read_more': { bn: 'আরও রোমান্টিক উক্তি পড়ুন', en: 'Read More Romantic Quotes' },

  // How It Works
  'how.eyebrow': { bn: 'সহজ ৩টি ধাপ', en: 'SIMPLE 3-STEP PROCESS' },
  'how.title': { bn: 'কীভাবে পোস্টার তৈরি করবেন?', en: 'How to Create Your Poster?' },
  'how.subtitle': { bn: 'কোনো জটিলতা ছাড়াই মাত্র কয়েক সেকেন্ডে আপনার মনের পোস্টকার্ড প্রস্তুত করুন', en: 'Create your emotional vintage postcard in just seconds without any hassle' },
  'how.step1.title': { bn: '১. পোস্টার বাছুন', en: '1. Select a Template' },
  'how.step1.desc': { bn: 'প্রেম, বিরহ, বৃষ্টি কিংবা রেট্রো থিমের শত শত প্রি-ডিজাইনড ভিন্টেজ আর্টওয়ার্ক থেকে আপনার পছন্দের ফ্রেমটি নির্বাচন করুন।', en: 'Choose from handcrafted vintage artworks spanning love, rainy nostalgia, letter, and retro aesthetics.' },
  'how.step2.title': { bn: '২. উক্তি নির্বাচন বা লিখুন', en: '2. Personalize Words' },
  'how.step2.desc': { bn: 'প্রস্তুত করা রোমান্টিক উক্তি বেছে নিন অথবা নিজের মনের অব্যক্ত কথা, প্রাপক ও প্রেরকের নাম যুক্ত করে ফন্ট সাজান।', en: 'Pick a famous romantic quote or type your heartfelt message, recipient name, sender note, and date.' },
  'how.step3.title': { bn: '৩. ফ্রি HD ডাউনলোড', en: '3. Instant Free Download' },
  'how.step3.desc': { bn: 'স্পন্সর দেখে কয়েক সেকেন্ডের মধ্যে ক্রিস্প আল্ট্রা-HD রেজোলিউশনে ওয়াটারমার্কহীন পোস্টকার্ড ডাউনলোড করে প্রিয়জনকে পাঠান।', en: 'Unlock crystal clear 4K Ultra-HD resolution with no watermark and send it to your loved one.' },

  // Generator Studio
  'gen.tab.image': { bn: 'পোস্টার ইমেজ', en: 'Photo Poster' },
  'gen.tab.reels': { bn: '৯:১৬ রিলস ভিডিও', en: '9:16 Reels Video' },
  'gen.tab.letter': { bn: 'ভিন্টেজ প্রেমপত্র', en: 'Vintage Love Letter' },
  'gen.choose_template': { bn: 'টেমপ্লেট নির্বাচন', en: 'Select Template' },
  'gen.recipient': { bn: 'প্রাপক (To)', en: 'Recipient (To)' },
  'gen.recipient.placeholder': { bn: 'যেমন: প্রিয়তমা / প্রিয় নীলা', en: 'e.g., My Love / Dearest' },
  'gen.quote': { bn: 'মনের কথা বা উক্তি', en: 'Quote or Message' },
  'gen.quote.placeholder': { bn: 'আপনার মনের না বলা কথা এখানে লিখুন...', en: 'Write your heartfelt vintage words here...' },
  'gen.sender': { bn: 'প্রেরক (From)', en: 'Sender (From)' },
  'gen.sender.placeholder': { bn: 'যেমন: ইতি, তোমার আমি', en: 'e.g., Yours Forever' },
  'gen.date': { bn: 'তারিখ / ঋতু', en: 'Date / Season' },
  'gen.date.placeholder': { bn: 'যেমন: শ্রাবণ, ১৩৩২ / বাদল দিন', en: 'e.g., Autumn, 1952 / Rainy Evening' },
  'gen.browse_quotes': { bn: 'উক্তি সংগ্রহ থেকে বেছে নিন', en: 'Browse Quotes Library' },
  'gen.typography': { bn: 'ফন্ট ও টাইপোগ্রাফি', en: 'Typography & Style' },
  'gen.borders': { bn: 'বর্ডার স্টাইল', en: 'Border Style' },
  'gen.filters': { bn: 'ভিন্টেজ ইফেক্ট', en: 'Vintage Texture Filter' },
  'gen.aspect_ratio': { bn: 'আকার ও অনুপাত', en: 'Aspect Ratio' },
  'gen.download_btn': { bn: 'HD পোস্টার ডাউনলোড করুন', en: 'Download Ultra-HD Poster' },
  'gen.exporting': { bn: 'পোস্টার তৈরি হচ্ছে...', en: 'Exporting High-Res Poster...' },
  'gen.reels.audio': { bn: 'ব্যাকগ্রাউন্ড মিউজিক', en: 'Background Music' },
  'gen.reels.export': { bn: 'রিলস ভিডিও এক্সপোর্ট', en: 'Export Reels Video' },

  // Download Gate Modal
  'gate.title': { bn: 'আল্ট্রা-HD ওয়াটারমার্কহীন ডাউনলোড', en: 'Ultra-HD No-Watermark Download' },
  'gate.subtitle': { bn: 'বিনামূল্যে হাই-রেজোলিউশন পোস্টার পেতে নিচের স্পন্সর বাটনে ক্লিক করুন', en: 'Click the sponsor button below to unlock free high-resolution download' },
  'gate.btn.unlock': { bn: 'স্পন্সর ওপেন করে ডাউনলোড আনলক করুন (৮ সেকেন্ড)', en: 'Open Sponsor to Unlock Download (8s)' },
  'gate.countdown': { bn: 'সেকেন্ড অপেক্ষা করুন...', en: 'seconds remaining...' },
  'gate.btn.ready': { bn: 'এখনই আল্ট্রা-HD ডাউনলোড করুন', en: 'Download Ultra-HD Now' },
  'gate.format.png': { bn: 'ক্রিস্প PNG (উচ্চমান)', en: 'Crisp PNG (Recommended)' },
  'gate.format.jpeg': { bn: 'স্ট্যান্ডার্ড JPEG', en: 'Standard JPEG' },

  // Postcards Library Page
  'library.title': { bn: 'ভিন্টেজ পোস্টকার্ড লাইব্রেরি', en: 'Vintage Postcards Library' },
  'library.subtitle': { bn: 'সকল নস্টালজিক পোস্টকার্ডের সংগ্রহশালা। যেকোনো ফ্রেম দিয়ে তৈরি করুন আপনার ভালোবাসার ছবি।', en: 'Browse our complete nostalgic archive. Choose any frame to create your romantic artwork.' },
  'library.search': { bn: 'নাম বা ট্যাগ দিয়ে পোস্টকার্ড খুঁজুন...', en: 'Search postcards by title, tags or theme...' },

  // Quotes Library Page
  'quotes.title': { bn: 'অমর রোমান্টিক উক্তি সংগ্রহ', en: 'Romantic Quotes Collection' },
  'quotes.subtitle': { bn: 'প্রেম, বিরহ, বৃষ্টি ও স্মৃতিময় ভালোবাসার হৃদয়ছোঁয়া উক্তি। যেকোনো উক্তি সরাসরি আপনার পোস্টারে ব্যবহার করুন।', en: 'Heartfelt quotes of timeless love, monsoon, and separation. Use any quote directly on your poster.' },
  'quotes.search': { bn: 'উক্তি বা লেখক খুঁজুন...', en: 'Search quotes or authors...' },
  'quotes.use_quote': { bn: 'পোস্টারে ব্যবহার করুন', en: 'Use in Poster' },
  'quotes.copied': { bn: 'কপি করা হয়েছে!', en: 'Copied to Clipboard!' },
  'quotes.copy': { bn: 'কপি করুন', en: 'Copy Quote' },

  // Gallery Page
  'gallery.title': { bn: 'ভিন্টেজ ভালোবাসার গ্যালারি', en: 'Vintage Love Gallery' },
  'gallery.subtitle': { bn: 'ঐতিহাসিক প্রেমপত্র, বৃষ্টি ও স্টেশনের স্মৃতিবিজড়িত নির্বাচিত আর্টওয়ার্ক প্রদর্শনী।', en: 'Curated showcase of historical love letters, rain showers, and nostalgic platform memories.' },

  // Categories Page
  'categories.title': { bn: 'সকল ক্যাটাগরি', en: 'All Categories' },
  'categories.subtitle': { bn: 'আপনার অনুভূতির সাথে মেলানো পোস্টার থিম খুঁজে নিন', en: 'Discover poster themes matched directly to your current emotional feeling' },

  // Favorites Page
  'favorites.title': { bn: 'আপনার পছন্দের তালিকা', en: 'Your Saved Favorites' },
  'favorites.subtitle': { bn: 'আপনার বুকমার্ক করা পোস্টকার্ড ও রোমান্টিক উক্তি', en: 'Your bookmarked postcards, quotes, and gallery items' },
  'favorites.empty': { bn: 'কোনো প্রিয় আইটেম সেভ করা নেই', en: 'No favorite items saved yet' },
  'favorites.explore_btn': { bn: 'পোস্টকার্ড দেখতে যান', en: 'Explore Postcards' },

  // Footer & Legal
  'footer.quick_links': { bn: 'প্রয়োজনীয় লিংক', en: 'Quick Links' },
  'footer.categories': { bn: 'ক্যাটাগরি', en: 'Categories' },
  'footer.legal': { bn: 'আইনি তথ্য', en: 'Legal & Info' },
  'footer.privacy': { bn: 'প্রাইভেসি পলিসি', en: 'Privacy Policy' },
  'footer.terms': { bn: 'ব্যবহারের শর্তাবলি', en: 'Terms of Service' },
  'footer.contact': { bn: 'যোগাযোগ', en: 'Contact Us' },
  'footer.copyright': {
    bn: '© ২০২৬ Reel Create Poster. সর্বস্বত্ব সংরক্ষিত। পুরনো দিনের ভালোবাসা ও স্মৃতির জন্য নিবেদিত।',
    en: '© 2026 Reel Create Poster. All rights reserved. Dedicated to vintage romance and cherished memories.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('app_language', lang);
    } catch {}
    // Update HTML lang attribute for accessibility and SEO
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const entry = translations[key];
    if (entry) {
      return entry[language] || fallback || entry.bn;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isBn: language === 'bn',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
