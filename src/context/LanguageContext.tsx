import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, LanguageOption } from '../types';
import { GLOBAL_LANGUAGES, getLanguageByCode, isRtlLanguage } from '../data/languages';

interface LanguageContextType {
  language: Language;
  currentLanguage: LanguageOption;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isBn: boolean;
  isRtl: boolean;
  isAutoTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Automatically detect default language based on user location and browser settings
function detectInitialLanguage(): string {
  // 1. Explicit user choice stored in localStorage
  try {
    const saved =
      localStorage.getItem('reel_poster_selected_language') ||
      localStorage.getItem('app_language');
    if (saved && getLanguageByCode(saved)) {
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

  // 3. Browser language check: check all preferred browser languages
  try {
    const userLangs = navigator.languages || [navigator.language];
    for (const rawLang of userLangs) {
      if (!rawLang) continue;
      const normalized = rawLang.toLowerCase();
      const base = normalized.split('-')[0];

      // Exact match check (e.g., zh-CN)
      const exact = GLOBAL_LANGUAGES.find((l) => l.code.toLowerCase() === normalized);
      if (exact) return exact.code;

      // Base language code check (e.g., 'es', 'ar', 'ur', 'fr', 'hi', 'bn')
      const baseMatch = GLOBAL_LANGUAGES.find((l) => l.code.toLowerCase() === base);
      if (baseMatch) return baseMatch.code;
    }
  } catch {}

  // 4. Default to Bangla (বাংলা) for visitors
  return 'bn';
}

// Function to trigger Google Translate dynamic auto-translation on the page
function triggerGoogleTranslation(targetCode: string) {
  try {
    // Map code to Google Translate language format (e.g., 'zh-CN' stays 'zh-CN', otherwise base code)
    const googleLang = targetCode === 'zh-CN' ? 'zh-CN' : targetCode.split('-')[0];

    // Set cookie for Google Translate widget
    const cookiePath = `/auto/${googleLang}`;
    document.cookie = `googtrans=${cookiePath}; path=/;`;
    if (typeof window !== 'undefined' && window.location.hostname) {
      document.cookie = `googtrans=${cookiePath}; path=/; domain=${window.location.hostname};`;
      // Also try parent domain if applicable
      const parts = window.location.hostname.split('.');
      if (parts.length > 2) {
        document.cookie = `googtrans=${cookiePath}; path=/; domain=.${parts.slice(-2).join('.')};`;
      }
    }

    // Trigger existing Google Translate combo box if initialized
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = googleLang;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    }
  } catch (e) {
    console.warn('Google Translate trigger notice:', e);
  }
}

// Rich multilingual dictionary for instant, zero-delay rendering of core UI elements
export const translations: Record<string, Record<string, string>> = {
  // Brand & General
  'brand.name': {
    bn: 'Reel Create Poster',
    en: 'Reel Create Poster',
    es: 'Reel Create Poster',
    ar: 'ريل كرييت بوستر',
    hi: 'रील क्रिएट पोस्टर',
    ur: 'ریل کریٹ پوسٹر',
    fr: 'Reel Create Poster',
    de: 'Reel Create Poster',
  },
  'brand.tagline': {
    bn: 'পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য',
    en: 'Vintage feelings, crafted for modern love',
    es: 'Sentimientos vintage, creados para el amor moderno',
    ar: 'مشاعر كلاسيكية، صُنعت للحب العصري',
    hi: 'पुराने दिनों के एहसास, आज के प्यार के लिए',
    ur: 'پرانے دنوں کے احساسات، آج کی محبت کے لیے',
    fr: 'Des sentiments vintage, créés pour l’amour moderne',
    de: 'Vintage-Gefühle, geschaffen für moderne Liebe',
    fa: 'احساسات قدیمی، ساخته شده برای عشق امروزی',
  },
  'brand.description': {
    bn: 'আপনার প্রিয় মানুষটির জন্য তৈরি করুন একটি সুন্দর Vintage Poster ও প্রেমের চিঠি।',
    en: 'Craft timeless vintage love posters, 9:16 reels videos, and antique letters for your loved ones.',
    es: 'Crea pósteres de amor vintage atemporales, videos reels 9:16 y cartas románticas antiguas.',
    ar: 'اصنع ملصقات حب كلاسيكية خالدة، وفيديوهات ريلز 9:16، ورسائل غرامية أثرية لمن تحب.',
    hi: 'अपने प्रियजनों के लिए विंटेज लव पोस्टर्स, 9:16 रील्स वीडियो और प्रेम पत्र तैयार करें।',
    ur: 'اپنے پیاروں کے لیے لازوال ونٹیج محبت کے پوسٹرز، 9:16 ریلز ویڈیوز اور قدیم خطوط تیار کریں۔',
    fr: 'Créez des affiches d’amour vintage intemporelles, des vidéos reels 9:16 et des lettres romantiques.',
    de: 'Erstellen Sie zeitlose Vintage-Liebesposter, 9:16 Reels-Videos und antike Liebesbriefe.',
  },

  // Navigation Items
  'nav.home': {
    bn: 'হোম',
    en: 'Home',
    es: 'Inicio',
    ar: 'الرئيسية',
    hi: 'होम',
    ur: 'ہوم',
    fr: 'Accueil',
    de: 'Startseite',
    ja: 'ホーム',
    ru: 'Главная',
    tr: 'Ana Sayfa',
    fa: 'خانه',
  },
  'nav.video': {
    bn: 'ভিডিও প্লেয়ার',
    en: 'Video Player',
    es: 'Reproductor de Video',
    ar: 'مشغل الفيديو',
    hi: 'वीडियो प्लेयर',
    ur: 'ویڈیو پلیئر',
    fr: 'Lecteur vidéo',
    de: 'Videoplayer',
    ja: '動画プレイヤー',
    ru: 'Видеоплеер',
    tr: 'Video Oynatıcı',
    fa: 'پخش‌کننده ویدیو',
  },
  'nav.reels': {
    bn: 'রিলস ভিডিও',
    en: 'Reels Studio',
    es: 'Estudio Reels',
    ar: 'استوديو الريلز',
    hi: 'रील्स स्टूडियो',
    ur: 'ریلز اسٹوڈیو',
    fr: 'Studio Reels',
    de: 'Reels Studio',
    fa: 'استودیو ریلز',
  },
  'nav.letter': {
    bn: 'ভিন্টেজ প্রেমপত্র',
    en: 'Love Letter',
    es: 'Carta de Amor',
    ar: 'رسالة حب كلاسيكية',
    hi: 'प्रेम पत्र',
    ur: 'محبت کا خط',
    fr: 'Lettre d’amour',
    de: 'Liebesbrief',
    fa: 'نامه عاشقانه',
  },
  'nav.create': {
    bn: 'পোস্টার তৈরি',
    en: 'Create Poster',
    es: 'Crear Póster',
    ar: 'إنشاء ملصق',
    hi: 'पोस्टर बनाएं',
    ur: 'پوسٹر بنائیں',
    fr: 'Créer une affiche',
    de: 'Poster erstellen',
    fa: 'ساخت پوستر',
  },
  'nav.postcards': {
    bn: 'পোস্টকার্ড ফ্রেম',
    en: 'Postcards',
    es: 'Postales',
    ar: 'البطاقات البريدية',
    hi: 'पोस्टकार्ड्स',
    ur: 'پوسٹ کارڈز',
    fr: 'Cartes postales',
    de: 'Postkarten',
    fa: 'کارت‌پستال‌ها',
  },
  'nav.quotes': {
    bn: 'উক্তি সংগ্রহ',
    en: 'Romantic Quotes',
    es: 'Citas Románticas',
    ar: 'اقتباسات رومانسية',
    hi: 'रोमांटिक उद्धरण',
    ur: 'رومانوی اقوال',
    fr: 'Citations d’amour',
    de: 'Romantische Zitate',
    fa: 'نقل‌قول‌های عاشقانه',
  },
  'nav.gallery': {
    bn: 'গ্যালারি',
    en: 'Gallery',
    es: 'Galería',
    ar: 'المعرض',
    hi: 'गैलरी',
    ur: 'گیلری',
    fr: 'Galerie',
    de: 'Galerie',
    ja: 'ギャラリー',
    ru: 'Галерея',
    tr: 'Galeri',
    fa: 'گالری',
  },
  'nav.categories': {
    bn: 'ক্যাটাগরি',
    en: 'Categories',
    es: 'Categorías',
    ar: 'التصنيفات',
    hi: 'श्रेणियां',
    ur: 'اقسام',
    fr: 'Catégories',
    de: 'Kategorien',
    fa: 'دسته‌بندی‌ها',
  },
  'nav.favorites': {
    bn: 'পছন্দ',
    en: 'Favorites',
    es: 'Favoritos',
    ar: 'المفضلة',
    hi: 'पसंदीदा',
    ur: 'پسندیدہ',
    fr: 'Favoris',
    de: 'Favoriten',
    fa: 'علاقه‌مندی‌ها',
  },
  'nav.search': {
    bn: 'অনুসন্ধান',
    en: 'Search',
    es: 'Buscar',
    ar: 'بحث',
    hi: 'खोजें',
    ur: 'تلاش کریں',
    fr: 'Rechercher',
    de: 'Suchen',
    fa: 'جستجو',
  },
  'nav.search.placeholder': {
    bn: 'উক্তি, পোস্টার বা বিষয় খুঁজুন... (Ctrl+K)',
    en: 'Search quotes, postcards, themes... (Ctrl+K)',
    es: 'Buscar citas, postales, temas... (Ctrl+K)',
    ar: 'ابحث عن الاقتباسات والبطاقات البريدية... (Ctrl+K)',
    hi: 'उद्धरण, पोस्टकार्ड या विषय खोजें... (Ctrl+K)',
    ur: 'اقوال، پوسٹ کارڈز یا موضوع تلاش کریں... (Ctrl+K)',
    fr: 'Rechercher des citations, cartes, thèmes... (Ctrl+K)',
    de: 'Zitate, Postkarten, Themen suchen... (Ctrl+K)',
  },
  'nav.create.cta': {
    bn: 'পোস্টার তৈরি করুন',
    en: 'Create Poster',
    es: 'Crear Póster',
    ar: 'صمم ملصقك الآن',
    hi: 'पोस्टर तैयार करें',
    ur: 'ابھی پوسٹر بنائیں',
    fr: 'Créer une affiche',
    de: 'Poster gestalten',
    fa: 'پوستر بسازید',
  },

  // Hero Section
  'hero.archive_badge': {
    bn: 'ভিন্টেজ পোস্টার ও চিঠি আর্কাইভ',
    en: 'Vintage Poster & Letter Archive',
    es: 'Archivo de Cartas y Pósteres Vintage',
    ar: 'أرشيف الملصقات والرسائل الكلاسيكية',
    hi: 'विंटेज पोस्टर और पत्र संग्रह',
    ur: 'ونٹیج پوسٹرز اور خطوط کا آرکائیو',
    fr: 'Archive de lettres et affiches vintage',
    de: 'Vintage Poster & Liebesbrief-Archiv',
  },
  'hero.headline.part1': {
    bn: '“পুরনো দিনের অনুভূতি,',
    en: '“Vintage Feelings,',
    es: '“Sentimientos Vintage,',
    ar: '“مشاعر الأيام الخوالي،',
    hi: '“पुराने दिनों के एहसास,',
    ur: '“پرانے زمانوں کے احساسات،',
    fr: '“Émotions d’autrefois,',
    de: '“Vintage-Gefühle,',
    fa: '“احساسات روزگاران کهن،',
  },
  'hero.headline.part2': {
    bn: 'আজকের ভালোবাসার জন্য।”',
    en: 'For Modern Love.”',
    es: 'Para el Amor Moderno.”',
    ar: 'لحب العصر الحديث.”',
    hi: 'आज के प्यार के लिए।”',
    ur: 'آج کی سچی محبت کے لیے۔”',
    fr: 'Pour l’amour d’aujourd’hui.”',
    de: 'Für die moderne Liebe.”',
    fa: 'برای عشق دوران معاصر.”',
  },
  'hero.subheadline': {
    bn: 'আপনার মনের অপ্রকাশিত অনুভূতিগুলো রূপ দিন ১৯শ শতকের ভিন্টেজ পোস্টকার্ড, ৯:১৬ অ্যানিমেটেড রিলস ভিডিও ও হাতে লেখা প্রেমপত্রে। সম্পূর্ণ বিনামূল্যে এবং কোনো ওয়াটারমার্ক ছাড়া।',
    en: 'Turn your unspoken romantic thoughts into 19th-century vintage postcards, 9:16 vertical reels videos, and handcrafted letters. 100% free with no watermark.',
    es: 'Transforma tus sentimientos en postales del siglo XIX, videos 9:16 para reels y cartas escritas a mano. 100% gratis y sin marcas de agua.',
    ar: 'حول مشاعرك الرومانسية الصامتة إلى بطاقات بريدية كلاسيكية من القرن التاسع عشر، وفيديوهات ريلز عمودية 9:16، ورسائل يدوية. مجاني 100% وبدون علامة مائية.',
    hi: 'अपनी अनकही रोमांटिक भावनाओं को 19वीं सदी के विंटेज पोस्टकार्ड्स, 9:16 रील्स और प्रेम पत्रों में बदलें। 100% मुफ्त और बिना किसी वॉटरमार्क के।',
    ur: 'اپنے ان کہے رومانوی احساسات کو 19ویں صدی کے ونٹیج پوسٹ کارڈز، 9:16 ریلز ویڈیوز اور ہاتھ سے لکھے خطوط میں بدلیں۔ بالکل مفت اور واٹر مارک کے بغیر۔',
    fr: 'Transformez vos pensées romantiques en cartes postales du 19ème siècle, vidéos 9:16 pour reels et lettres manuscrites. 100% gratuit et sans filigrane.',
    de: 'Verwandeln Sie unausgesprochene Gefühle in Vintage-Postkarten des 19. Jahrhunderts, 9:16 Reels und handgeschriebene Briefe. 100% kostenlos ohne Wasserzeichen.',
  },
  'hero.btn.create': {
    bn: 'পোস্টার তৈরি শুরু করুন',
    en: 'Start Making Poster',
    es: 'Comenzar a Crear',
    ar: 'ابدأ تصميم الملصق',
    hi: 'पोस्टर बनाना शुरू करें',
    ur: 'پوسٹر بنانا شروع کریں',
    fr: 'Commencer l’affiche',
    de: 'Poster erstellen',
    fa: 'شروع ساخت پوستر',
  },
  'hero.btn.reels': {
    bn: '৯:১৬ রিলস ভিডিও',
    en: '9:16 Reels Studio',
    es: 'Estudio Reels 9:16',
    ar: 'استوديو ريلز 9:16',
    hi: '9:16 रील्स स्टूडियो',
    ur: '9:16 ریلز اسٹوڈیو',
    fr: 'Studio Reels 9:16',
    de: '9:16 Reels Studio',
    fa: 'استودیو ریلز ۹:۱۶',
  },
  'hero.btn.letter': {
    bn: 'ভিন্টেজ প্রেমপত্র',
    en: 'Vintage Love Letter',
    es: 'Carta de Amor Vintage',
    ar: 'رسالة غرامية قديمة',
    hi: 'विंटेज प्रेम पत्र',
    ur: 'قدیم رومانوی خط',
    fr: 'Lettre d’amour vintage',
    de: 'Vintage-Liebesbrief',
    fa: 'نامه عاشقانه کهن',
  },
  'hero.btn.explore': {
    bn: 'পোস্টকার্ড দেখুন',
    en: 'Explore Postcards',
    es: 'Explorar Postales',
    ar: 'استكشف البطاقات',
    hi: 'पोस्टकार्ड्स देखें',
    ur: 'پوسٹ کارڈز دیکھیں',
    fr: 'Explorer les cartes',
    de: 'Postkarten entdecken',
    fa: 'مشاهده کارت‌پستال‌ها',
  },
  'hero.feat.free_hd': {
    bn: '১০০% ফ্রি আল্ট্রা-HD এক্সপোর্ট',
    en: '100% Free Ultra-HD Export',
    es: 'Exportación Ultra-HD 100% Gratis',
    ar: 'تصدير مجاني فائق الدقة 100%',
    hi: '100% मुफ्त अल्ट्रा-HD डाउनलोड',
    ur: '100% مفت الٹرا ایچ ڈی ایکسپورٹ',
    fr: 'Export Ultra-HD 100% Gratuit',
    de: '100% Kostenloser Ultra-HD Export',
  },
  'hero.feat.no_watermark': {
    bn: 'কোনো ওয়াটারমার্ক নেই',
    en: 'No Watermark',
    es: 'Sin Marca de Agua',
    ar: 'بدون أي علامة مائية',
    hi: 'कोई वॉटरमार्क नहीं',
    ur: 'کوئی واٹر مارک نہیں',
    fr: 'Sans Filigrane',
    de: 'Kein Wasserzeichen',
  },
  'hero.feat.social_ready': {
    bn: 'ইন্সটাগ্রাম ও ফেসবুক রিলস ফ্রেন্ডলি',
    en: 'Instagram & TikTok Reels Ready',
    es: 'Listo para Reels de Instagram y TikTok',
    ar: 'جاهز لمقاطع تيك توك وإنستغرام',
    hi: 'इंस्टाग्राम और फेसबुक रील्स फ्रेंडली',
    ur: 'انسٹاگرام اور ٹک ٹاک کے لیے موزوں',
    fr: 'Prêt pour Instagram & TikTok',
    de: 'Bereit für Instagram & TikTok',
  },

  // Categories Section
  'cat.title': {
    bn: 'অনুভূতির ক্যাটাগরি',
    en: 'Explore by Mood & Theme',
    es: 'Explorar por Emoción y Tema',
    ar: 'استكشف حسب المزاج والموضوع',
    hi: 'थीम और मूड के अनुसार देखें',
    ur: 'موضوع اور احساسات کے مطابق تلاش کریں',
    fr: 'Explorer par ambiance et thème',
    de: 'Nach Stimmung & Thema entdecken',
  },
  'cat.subtitle': {
    bn: 'আপনার বর্তমান অনুভূতি অনুযায়ী পোস্টার ফ্রেম নির্বাচন করুন',
    en: 'Choose artistic frames designed around emotional moods and vintage aesthetics',
    es: 'Elige marcos artísticos diseñados con estética nostálgica y emociones reales',
    ar: 'اختر إطارات فنية مصممة بلمسات عاطفية وجماليات كلاسيكية عتيقة',
    hi: 'अपनी भावनाओं और विंटेज सुंदरता के अनुसार फ्रेम चुनें',
    ur: 'اپنے دلی جذبات اور ونٹیج خوبصورتی کے مطابق فریمز منتخب کریں',
    fr: 'Choisissez des cadres artistiques selon vos émotions et l’esthétique vintage',
    de: 'Wählen Sie künstlerische Rahmen basierend auf Emotionen und Vintage-Ästhetik',
  },
  'cat.view_all': {
    bn: 'সব ক্যাটাগরি দেখুন',
    en: 'View All Categories',
    es: 'Ver Todas las Categorías',
    ar: 'عرض جميع الفئات',
    hi: 'सभी श्रेणियां देखें',
    ur: 'تمام اقسام دیکھیں',
    fr: 'Voir toutes les catégories',
    de: 'Alle Kategorien anzeigen',
  },

  // Featured Posters
  'featured.title': {
    bn: 'জনপ্রিয় ভিন্টেজ পোস্টার ফ্রেম',
    en: 'Featured Vintage Postcards',
    es: 'Postales Vintage Destacadas',
    ar: 'أبرز البطاقات البريدية الكلاسيكية',
    hi: 'लोकप्रिय विंटेज पोस्टकार्ड्स',
    ur: 'نمایاں ونٹیج پوسٹ کارڈز',
    fr: 'Cartes postales vintage à la une',
    de: 'Ausgewählte Vintage-Postkarten',
  },
  'featured.subtitle': {
    bn: 'সবচেয়ে বেশি ব্যবহৃত প্রেম, বিরহ ও স্মৃতির নস্টালজিক ফ্রেমসমূহ',
    en: 'Most cherished collections of love, monsoon, and nostalgic postcards',
    es: 'Las colecciones más queridas de amor, nostalgia y memorias',
    ar: 'المجموعات الأكثر تفضيلاً للحب والذكريات والحنين العاطفي',
    hi: 'प्यार, बारिश और यादों के सबसे पसंदीदा फ्रेम्स',
    ur: 'محبت، برسات اور یادوں کے سب سے پسندیدہ فریمز',
    fr: 'Les collections les plus appréciées d’amour et de nostalgie',
    de: 'Die beliebtesten Kollektionen voller Liebe und Nostalgie',
  },
  'featured.tab.all': { bn: 'সকল ফ্রেম', en: 'All Frames', es: 'Todos los Marcos', ar: 'كل الإطارات', hi: 'सभी फ्रेम्स', ur: 'تمام فریمز', fr: 'Tous les cadres', de: 'Alle Rahmen' },
  'featured.tab.popular': { bn: 'জনপ্রিয়', en: 'Popular', es: 'Popular', ar: 'الأكثر شعبية', hi: 'लोकप्रिय', ur: 'مقبول', fr: 'Populaire', de: 'Beliebt' },
  'featured.tab.new': { bn: 'নতুন', en: 'New Arrivals', es: 'Novedades', ar: 'وصل حديثاً', hi: 'नए', ur: 'نیا', fr: 'Nouveautés', de: 'Neu' },
  'featured.tab.rainy': { bn: 'বৃষ্টি', en: 'Rainy Monsoon', es: 'Lluvia y Llovizna', ar: 'مطر وشتاء', hi: 'बरसात', ur: 'بارش', fr: 'Pluie', de: 'Regen' },
  'featured.tab.romantic': { bn: 'রোমান্টিক', en: 'Romantic', es: 'Romántico', ar: 'رومانسي', hi: 'रोमांटिक', ur: 'رومانوی', fr: 'Romantique', de: 'Romantisch' },
  'featured.tab.classic': { bn: 'ক্লাসিক', en: 'Classic', es: 'Clásico', ar: 'كلاسيكي', hi: 'क्लासिक', ur: 'کلاسیک', fr: 'Classique', de: 'Klassisch' },
  'featured.use_template': { bn: 'এই ফ্রেমে তৈরি করুন', en: 'Use This Template', es: 'Usar Esta Plantilla', ar: 'استخدم هذا القالب', hi: 'यह फ्रेम चुनें', ur: 'یہ سانچہ استعمال کریں', fr: 'Utiliser ce modèle', de: 'Vorlage verwenden' },
  'featured.explore_all': { bn: 'সব পোস্টার এক্সপ্লোর করুন', en: 'Explore All Postcards', es: 'Explorar Todas las Postales', ar: 'استكشف كافة البطاقات', hi: 'सभी पोस्टकार्ड्स देखें', ur: 'تمام پوسٹ کارڈز دیکھیں', fr: 'Tout explorer', de: 'Alle Postkarten erkunden' },

  // Generator & Download
  'gen.tab.image': { bn: 'পোস্টার ইমেজ', en: 'Photo Poster', es: 'Póster de Foto', ar: 'ملصق الصور', hi: 'फोटो पोस्टर', ur: 'تصویری پوسٹر', fr: 'Affiche Photo', de: 'Foto-Poster' },
  'gen.tab.reels': { bn: '৯:১৬ রিলস ভিডিও', en: '9:16 Reels Video', es: 'Video Reels 9:16', ar: 'فيديو ريلز 9:16', hi: '9:16 रील्स वीडियो', ur: '9:16 ریلز ویڈیو', fr: 'Vidéo Reels 9:16', de: '9:16 Reels Video' },
  'gen.tab.letter': { bn: 'ভিন্টেজ প্রেমপত্র', en: 'Vintage Love Letter', es: 'Carta de Amor Vintage', ar: 'رسالة حب قديمة', hi: 'विंटेج प्रेम पत्र', ur: 'ونٹیج محبت کا خط', fr: 'Lettre d’amour vintage', de: 'Vintage-Liebesbrief' },
  'gen.choose_template': { bn: 'টেমপ্লেট নির্বাচন', en: 'Select Template', es: 'Seleccionar Plantilla', ar: 'اختر القالب', hi: 'टेम्पलेट चुनें', ur: 'سانچہ منتخب کریں', fr: 'Choisir un modèle', de: 'Vorlage wählen' },
  'gen.recipient': { bn: 'প্রাপক (To)', en: 'Recipient (To)', es: 'Destinatario (Para)', ar: 'المستلم (إلى)', hi: 'पाने वाला (To)', ur: 'نام وصول کنندہ (بنام)', fr: 'Destinataire (À)', de: 'Empfänger (An)' },
  'gen.quote': { bn: 'মনের কথা বা উক্তি', en: 'Quote or Message', es: 'Cita o Mensaje', ar: 'الرسالة أو الاقتباس', hi: 'संदेश या उद्धरण', ur: 'دلی پیغام یا قول', fr: 'Message ou Citation', de: 'Botschaft oder Zitat' },
  'gen.sender': { bn: 'প্রেরক (From)', en: 'Sender (From)', es: 'Remitente (De)', ar: 'المرسل (من)', hi: 'भेजने वाला (From)', ur: 'نام بھیجنے والا (از طرف)', fr: 'Expéditeur (De)', de: 'Absender (Von)' },
  'gen.date': { bn: 'তারিখ / ঋতু', en: 'Date / Season', es: 'Fecha / Estación', ar: 'التاريخ / الفصل', hi: 'तारीख / मौसम', ur: 'تاریخ / موسم', fr: 'Date / Saison', de: 'Datum / Jahreszeit' },
  'gen.browse_quotes': { bn: 'উক্তি সংগ্রহ থেকে বেছে নিন', en: 'Browse Quotes Library', es: 'Explorar Biblioteca de Citas', ar: 'تصفح مكتبة الاقتباسات', hi: 'उद्धरण लाइब्रेरी से चुनें', ur: 'اقوال کی لائبریری سے منتخب کریں', fr: 'Parcourir les citations', de: 'Zitate-Bibliothek durchsuchen' },
  'gen.download_btn': { bn: 'HD পোস্টার ডাউনলোড করুন', en: 'Download Ultra-HD Poster', es: 'Descargar Póster Ultra-HD', ar: 'تحميل الملصق بجودة فائقة', hi: 'अल्ट्रा-HD पोस्टर डाउनलोड करें', ur: 'الٹرا ایچ ڈی پوسٹر ڈاؤن لوڈ کریں', fr: 'Télécharger l’affiche Ultra-HD', de: 'Ultra-HD Poster herunterladen' },

  // Download Gate Modal
  'gate.title': { bn: 'আল্ট্রা-HD ওয়াটারমার্কহীন ডাউনলোড', en: 'Ultra-HD No-Watermark Download', es: 'Descarga Ultra-HD sin Marcas', ar: 'تحميل فائق الدقة بدون علامة مائية', hi: 'अल्ट्रा-HD वॉटरमार्क-मुक्त डाउनलोड', ur: 'الٹرا ایچ ڈی بغیر واٹر مارک ڈاؤن لوڈ', fr: 'Téléchargement Ultra-HD sans filigrane', de: 'Ultra-HD Download ohne Wasserzeichen' },
  'gate.btn.ready': { bn: 'এখনই আল্ট্রা-HD ডাউনলোড করুন', en: 'Download Ultra-HD Now', es: 'Descargar Ultra-HD Ahora', ar: 'حمل بجودة فائقة الآن', hi: 'अभी डाउनलोड करें', ur: 'ابھی الٹرا ایچ ڈی ڈاؤن لوڈ کریں', fr: 'Télécharger maintenant', de: 'Jetzt herunterladen' },

  // Library & Pages
  'library.title': { bn: 'ভিন্টেজ পোস্টকার্ড লাইব্রেরি', en: 'Vintage Postcards Library', es: 'Biblioteca de Postales Vintage', ar: 'مكتبة البطاقات البريدية الكلاسيكية', hi: 'विंटेج पोस्टकार्ड लाइब्रेरी', ur: 'ونٹیج پوسٹ کارڈز لائبریری', fr: 'Bibliothèque de cartes postales vintage', de: 'Vintage-Postkarten-Bibliothek' },
  'quotes.title': { bn: 'অমর রোমান্টিক উক্তি সংগ্রহ', en: 'Romantic Quotes Collection', es: 'Colección de Citas Románticas', ar: 'مجموعة الاقتباسات الرومانسية الخالدة', hi: 'अमर रोमांटिक उद्धरण संग्रह', ur: 'لازوال رومانوی اقوال کا مجموعہ', fr: 'Citations d’amour éternelles', de: 'Ewige romantische Zitate' },
  'quotes.use_quote': { bn: 'পোস্টারে ব্যবহার করুন', en: 'Use in Poster', es: 'Usar en Póster', ar: 'استخدم في الملصق', hi: 'पोस्टर में उपयोग करें', ur: 'پوسٹر میں استعمال کریں', fr: 'Utiliser dans l’affiche', de: 'Im Poster verwenden' },
  'quotes.copied': { bn: 'কপি করা হয়েছে!', en: 'Copied to Clipboard!', es: '¡Copiado!', ar: 'تم النسخ بنجاح!', hi: 'कॉपी हो गया!', ur: 'کاپی ہو گیا!', fr: 'Copié !', de: 'Kopiert!' },
  'gallery.title': { bn: 'ভিন্টেজ ভালোবাসার গ্যালারি', en: 'Vintage Love Gallery', es: 'Galería de Amor Vintage', ar: 'معرض الحب الكلاسيكي', hi: 'विंटेج लव गैलरी', ur: 'ونٹیج لو گیلری', fr: 'Galerie d’amour vintage', de: 'Vintage-Liebesgalerie' },
  'categories.title': { bn: 'সকল ক্যাটাগরি', en: 'All Categories', es: 'Todas las Categorías', ar: 'جميع التصنيفات', hi: 'सभी श्रेणियां', ur: 'تمام اقسام', fr: 'Toutes les catégories', de: 'Alle Kategorien' },
  'favorites.title': { bn: 'আপনার পছন্দের তালিকা', en: 'Your Saved Favorites', es: 'Tus Favoritos Guardados', ar: 'قائمتك المفضلة', hi: 'आपकी पसंदीदा सूची', ur: 'آپ کی پسندیدہ فہرست', fr: 'Vos Favoris Enregistrés', de: 'Ihre Gespeicherten Favoriten' },

  // Lang Dropdown labels
  'lang.select_title': { bn: 'ভাষা নির্বাচন করুন', en: 'Select Language', es: 'Seleccionar Idioma', ar: 'اختر اللغة', hi: 'भाषा चुनें', ur: 'زبان منتخب کریں', fr: 'Choisir la langue', de: 'Sprache wählen' },
  'lang.search_placeholder': { bn: 'ভাষা খুঁজুন (যেমন: Spanish, Arabic)...', en: 'Search language (e.g. Spanish, Arabic)...', es: 'Buscar idioma...', ar: 'ابحث عن لغة...', hi: 'भाषा खोजें...', ur: 'زبان تلاش کریں...', fr: 'Rechercher une langue...', de: 'Sprache suchen...' },
  'lang.auto_detected': { bn: 'স্বয়ংক্রিয় সনাক্তকরণ', en: 'Auto-Detected', es: 'Detectado Automáticamente', ar: 'تم الكشف التلقائي', hi: 'स्वतः पहचानी गई', ur: 'خودکار شناخت شدہ', fr: 'Détecté automatiquement', de: 'Automatisch erkannt' },
  'lang.all_tab': { bn: 'সকল ভাষা', en: 'All Languages', es: 'Todos los Idiomas', ar: 'كل اللغات', hi: 'सभी भाषाएं', ur: 'تمام زبانیں', fr: 'Toutes les langues', de: 'Alle Sprachen' },
  'lang.popular_tab': { bn: 'জনপ্রিয়', en: 'Popular', es: 'Populares', ar: 'الشائعة', hi: 'लोकप्रिय', ur: 'مقبول', fr: 'Populaires', de: 'Beliebt' },
  'lang.rtl_tab': { bn: 'RTL ভাষা', en: 'RTL (Right-to-Left)', es: 'RTL (Derecha a Izquierda)', ar: 'لغات اليمين لليسار (RTL)', hi: 'RTL भाषाएं', ur: 'دائیں سے بائیں (RTL)', fr: 'Langues RTL', de: 'RTL-Sprachen' },
  'lang.translating': { bn: 'অনুবাদ করা হচ্ছে...', en: 'Translating page...', es: 'Traduciendo página...', ar: 'جارٍ ترجمة الصفحة...', hi: 'पृष्ठ अनुवादित हो रहा है...', ur: 'صفحہ کا ترجمہ کیا جا رہا ہے...', fr: 'Traduction de la page...', de: 'Seite wird übersetzt...' },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(detectInitialLanguage);
  const [isAutoTranslating, setIsAutoTranslating] = useState<boolean>(false);

  const currentLanguage = getLanguageByCode(language) || {
    code: language,
    name: language.toUpperCase(),
    nativeName: language.toUpperCase(),
    flag: '🌐',
    isRtl: isRtlLanguage(language),
    popular: true,
  };

  const isRtl = isRtlLanguage(language);

  // Apply language, RTL direction, and persistence
  const applyLanguage = useCallback((newLangCode: string, triggerAutoTranslate = true) => {
    setLanguageState(newLangCode);

    // 1. Persistent choice in localStorage
    try {
      localStorage.setItem('reel_poster_selected_language', newLangCode);
      localStorage.setItem('app_language', newLangCode);
    } catch {}

    // 2. DOM & RTL configuration
    const rtl = isRtlLanguage(newLangCode);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLangCode;
      document.documentElement.dir = rtl ? 'rtl' : 'ltr';
      document.body.dir = rtl ? 'rtl' : 'ltr';

      if (rtl) {
        document.documentElement.classList.add('rtl-mode');
      } else {
        document.documentElement.classList.remove('rtl-mode');
      }
    }

    // 3. Dynamic Auto-translation
    if (triggerAutoTranslate) {
      setIsAutoTranslating(true);
      triggerGoogleTranslation(newLangCode);
      setTimeout(() => setIsAutoTranslating(false), 800);
    }
  }, []);

  const setLanguage = (lang: string) => {
    applyLanguage(lang, true);
  };

  const toggleLanguage = () => {
    // Quick toggle between BN and EN
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  // Synchronize on mount and handle initial auto-detected language
  useEffect(() => {
    applyLanguage(language, false);

    // If initial language is neither 'bn' nor 'en', trigger translation once document is ready
    if (language !== 'bn' && language !== 'en') {
      const timer = setTimeout(() => {
        triggerGoogleTranslation(language);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const t = (key: string, fallback?: string): string => {
    const entry = translations[key];
    if (entry) {
      // 1. Exact match (e.g. 'zh-CN')
      if (entry[language]) return entry[language];
      // 2. Base code match (e.g. 'es', 'ar', 'ur')
      const base = language.toLowerCase().split('-')[0];
      if (entry[base]) return entry[base];
      // 3. English or Bengali default fallback
      return entry.en || entry.bn || fallback || key;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage,
        setLanguage,
        toggleLanguage,
        t,
        isBn: language === 'bn',
        isRtl,
        isAutoTranslating,
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
