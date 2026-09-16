/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActivePage, PostcardTemplate, RomanticQuote, GalleryItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { FeaturedPosters } from './components/FeaturedPosters';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Pages
import { PosterGenerator } from './pages/PosterGenerator';
import { PostcardsLibrary } from './pages/PostcardsLibrary';
import { QuoteLibrary } from './pages/QuoteLibrary';
import { VintageGalleryPage } from './pages/VintageGalleryPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { StaticPages } from './pages/StaticPages';
import { VideoStudioPage } from './pages/VideoStudioPage';

// Components & Modals
import { AddVideoModal } from './components/AddVideoModal';
import { ResponsiveVideoPlayer } from './components/ResponsiveVideoPlayer';

// Icons & Data
import { postcards } from './data/postcards';
import { quotes } from './data/quotes';
import { Sparkles, Heart, Clock, Download, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

const categoryQueryMap: Record<string, string> = {
  rainy: 'বৃষ্টি',
  romantic: 'রোমান্টিক',
  sad: 'বিরহ',
  night: 'রাতের অনুভূতি',
  classic: 'Classic Vintage',
  letter: 'প্রেমপত্র',
  bengali: 'Bengali Vintage',
  love: 'প্রেম',
  missing: 'মিস করা',
  propose: 'প্রপোজ',
  unrequited: 'একতরফা প্রেম',
  anniversary: 'Anniversary',
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedTemplateForGen, setSelectedTemplateForGen] = useState<PostcardTemplate>(postcards[0]);
  const [selectedQuoteForGen, setSelectedQuoteForGen] = useState<RomanticQuote | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [homeFeaturedVideo, setHomeFeaturedVideo] = useState<string>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );

  // Parse URL search parameters on initial load (supports sitemap deep links)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page') as ActivePage | null;
      const categoryParam = params.get('category');
      const templateParam = params.get('template');
      const quoteParam = params.get('quote');

      if (templateParam) {
        const foundTemplate = postcards.find((p) => p.id.toLowerCase() === templateParam.toLowerCase());
        if (foundTemplate) {
          setSelectedTemplateForGen(foundTemplate);
          setActivePage('create');
          return;
        }
      }

      if (quoteParam) {
        const foundQuote = quotes.find((q) => q.id.toLowerCase() === quoteParam.toLowerCase());
        if (foundQuote) {
          setSelectedQuoteForGen(foundQuote);
          setActivePage('create');
          return;
        }
      }

      if (categoryParam) {
        const mappedCategory = categoryQueryMap[categoryParam.toLowerCase()] || categoryParam;
        setSelectedCategory(mappedCategory);
        setActivePage('categories');
        return;
      }

      const validPages: ActivePage[] = [
        'home',
        'video',
        'create',
        'reels',
        'letter',
        'postcards',
        'quotes',
        'gallery',
        'categories',
        'favorites',
        'privacy',
        'terms',
        'contact',
      ];
      if (pageParam && validPages.includes(pageParam)) {
        setActivePage(pageParam);
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Keyboard shortcut Ctrl+K or Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Use a template directly in generator
  const handleUseTemplate = (template: PostcardTemplate) => {
    setSelectedTemplateForGen(template);
    setActivePage('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Use a quote in generator
  const handleUseQuote = (quote: RomanticQuote) => {
    setSelectedQuoteForGen(quote);
    setActivePage('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select category from Category Section
  const handleSelectCategory = (catBn: string) => {
    setSelectedCategory(catBn);
    setActivePage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When an item is picked from Global Search
  const handleSelectGalleryFromSearch = () => {
    setActivePage('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] flex flex-col font-sans selection:bg-[#802a32] selection:text-[#fef08a]">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activePage === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onStartCreating={() => {
                setActivePage('create');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenReels={() => {
                setActivePage('reels');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenLetter={() => {
                setActivePage('letter');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenVideoModal={() => setIsVideoModalOpen(true)}
              onOpenVideoStudio={() => {
                setActivePage('video');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreGallery={() => {
                setActivePage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onUseTemplate={handleUseTemplate}
            />

            {/* Category Browser Section */}
            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              onViewAllCategories={() => {
                setActivePage('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Posters Tabs */}
            <FeaturedPosters
              onUseTemplate={handleUseTemplate}
              onExploreAll={() => {
                setActivePage('postcards');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Add Video / Preview Interactive Showcase Section on Homepage */}
            <section className="py-16 bg-[#110c09] border-y border-[#34251e] relative overflow-hidden">
              <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#802a32]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 -right-20 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Information & Actions */}
                  <div className="lg:col-span-5 space-y-5 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#271914] border border-[#d4af37]/40 text-xs font-serif text-[#fef08a] font-semibold tracking-wider uppercase">
                      <span>🎬</span>
                      <span>VIDEO SUPPORT & PREVIEW</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold font-bengali text-[#fef9c3] leading-snug">
                      ভিডিও যোগ করুন ও ভিন্টেজ থিমে উপভোগ করুন
                    </h2>

                    <p className="text-xs sm:text-sm text-[#bcaaa0] font-bengali leading-relaxed">
                      যে কোনো YouTube লিংক পেস্ট করুন অথবা আপনার ফোন/কম্পিউটার থেকে MP4/WebM ভিডিও আপলোড করে তাৎক্ষণিক প্রিভিউ দেখুন। রেট্রো ফিল্ম ফিল্টার, রোমান্টিক সাবটাইটেল এবং ফ্রেম ক্যাপচারের সুবিধা।
                    </p>

                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center gap-2 text-xs text-[#d1c2af] font-bengali">
                        <span className="w-5 h-5 rounded-full bg-[#802a32] text-[#fef08a] flex items-center justify-center text-[10px] font-bold">✓</span>
                        <span>YouTube URL এবং সরাসরি MP4/WebM ভিডিও ফাইল সাপোর্ট</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#d1c2af] font-bengali">
                        <span className="w-5 h-5 rounded-full bg-[#802a32] text-[#fef08a] flex items-center justify-center text-[10px] font-bold">✓</span>
                        <span>১৬:৯, ৯:১৬ রিলস, ৪:৩ রেট্রো টিভি ও ১:১ স্কয়ার ফরম্যাট</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#d1c2af] font-bengali">
                        <span className="w-5 h-5 rounded-full bg-[#802a32] text-[#fef08a] flex items-center justify-center text-[10px] font-bold">✓</span>
                        <span>ভিডিও ফ্রেম ক্যাপচার করে পোস্টকার্ড তৈরি বা ডাউনলোড</span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        id="home-open-video-modal-btn"
                        onClick={() => setIsVideoModalOpen(true)}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#802a32] via-[#942938] to-[#591b22] text-[#fef9c3] font-bengali font-bold text-xs sm:text-sm border border-[#d4af37]/40 shadow-lg shadow-[#802a32]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>🎬 নতুন ভিডিও যোগ / প্রিভিউ</span>
                      </button>

                      <button
                        type="button"
                        id="home-open-video-studio-btn"
                        onClick={() => {
                          setActivePage('video');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-3 rounded-xl bg-[#1e1511] hover:bg-[#2c1e18] text-[#fef08a] font-bengali font-semibold text-xs sm:text-sm border border-[#3f2f25] hover:border-[#d4af37]/50 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>থিয়েটার স্টুডিও খুলুন</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Live Responsive Player Preview on Homepage */}
                  <div className="lg:col-span-7">
                    <div className="p-2 sm:p-3 rounded-2xl bg-[#19110d] border border-[#3b2b20] shadow-2xl">
                      <ResponsiveVideoPlayer
                        url={homeFeaturedVideo}
                        title="Vintage Window Reverie"
                        aspectRatio="16:9"
                        initialFilter="warm-vintage"
                        overlayQuote="ভালোবাসা রয়ে যায় প্রতিটি বৃষ্টির ফোঁটায় ও স্মৃতির সুরভীতে..."
                        overlayAuthor="— রিল ক্রিয়েট পোস্টার"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Emotional Bengali Vintage Quote Banner */}
            <section className="py-16 bg-gradient-to-r from-[#18110e] via-[#241518] to-[#18110e] border-y border-[#34251e] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#802a32]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
                <span className="text-3xl">💌</span>
                <blockquote className="font-bengali text-xl sm:text-2xl md:text-3xl font-bold text-[#fef9c3] leading-relaxed italic">
                  “তোমাকে পাওয়ার জন্য নয়, তোমাকে একদিন ভালোবেসেছিলাম—শুধু ভালোবাসার প্রয়োজনে।”
                </blockquote>
                <p className="text-sm text-[#c5a059] font-serif tracking-widest uppercase">
                  — অমর প্রেমপত্র সংগ্রহ • REEL CREATE POSTER
                </p>
                <div className="pt-2">
                  <button
                    id="banner-explore-quotes-btn"
                    onClick={() => {
                      setActivePage('quotes');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#1a120f] hover:bg-[#281c17] text-[#fef08a] border border-[#d4af37]/40 text-xs sm:text-sm font-bengali font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <BookOpen className="w-4 h-4 text-[#d4af37]" />
                    <span>আরও রোমান্টিক উক্তি পড়ুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* How It Works Guide */}
            <section className="py-16 bg-[#0f0b09] border-b border-[#291e17]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
                  <div className="text-xs font-serif text-[#d4af37] tracking-widest uppercase font-semibold">
                    SIMPLE 3-STEP PROCESS
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-bengali text-[#fef9c3]">
                    কীভাবে পোস্টার তৈরি করবেন?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#a39281] font-bengali">
                    কোনো জটিলতা ছাড়াই মাত্র কয়েক সেকেন্ডে আপনার মনের পোস্টকার্ড প্রস্তুত করুন
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="bg-[#18110e] border border-[#34271e] rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#802a32] text-[#fef08a] flex items-center justify-center font-serif text-xl font-bold border border-[#d4af37]/40 shadow-md">
                        ০১
                      </div>
                      <h3 className="font-bengali text-lg font-bold text-[#fef9c3]">
                        ১. পোস্টার বাছুন
                      </h3>
                      <p className="font-bengali text-xs sm:text-sm text-[#b5a392] leading-relaxed">
                        প্রেম, বিরহ, বৃষ্টি কিংবা রেট্রো থিমের শত শত প্রি-ডিজাইনড ভিন্টেজ আর্টওয়ার্ক থেকে আপনার পছন্দের ফ্রেমটি নির্বাচন করুন।
                      </p>
                    </div>
                    <div className="text-[11px] text-[#c5a059] font-mono">Select Vintage Template</div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-[#18110e] border border-[#34271e] rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#802a32] text-[#fef08a] flex items-center justify-center font-serif text-xl font-bold border border-[#d4af37]/40 shadow-md">
                        ০২
                      </div>
                      <h3 className="font-bengali text-lg font-bold text-[#fef9c3]">
                        ২. উক্তি নির্বাচন বা লিখুন
                      </h3>
                      <p className="font-bengali text-xs sm:text-sm text-[#b5a392] leading-relaxed">
                        প্রস্তুত করা রোমান্টিক উক্তি বেছে নিন অথবা নিজের মনের অব্যক্ত কথা, প্রাপক ও প্রেরকের নাম যুক্ত করে ফন্ট সাজান।
                      </p>
                    </div>
                    <div className="text-[11px] text-[#c5a059] font-mono">Customize Romantic Words</div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-[#18110e] border border-[#34271e] rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#802a32] text-[#fef08a] flex items-center justify-center font-serif text-xl font-bold border border-[#d4af37]/40 shadow-md">
                        ০৩
                      </div>
                      <h3 className="font-bengali text-lg font-bold text-[#fef9c3]">
                        ৩. ফ্রি HD ডাউনলোড
                      </h3>
                      <p className="font-bengali text-xs sm:text-sm text-[#b5a392] leading-relaxed">
                        স্পন্সর দেখে কয়েক সেকেন্ডের মধ্যে ক্রিস্প আল্ট্রা-HD রেজোলিউশনে ওয়াটারমার্কহীন পোস্টকার্ড ডাউনলোড করে প্রিয়জনকে পাঠান।
                      </p>
                    </div>
                    <div className="text-[11px] text-[#c5a059] font-mono">Instant HD Download</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Dedicated Video Studio & Player View */}
        {activePage === 'video' && (
          <VideoStudioPage
            onOpenReelsStudio={() => {
              setActivePage('reels');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGeneratorWithSnapshot={() => {
              setActivePage('create');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Generator View */}
        {activePage === 'create' && (
          <PosterGenerator
            initialTemplate={selectedTemplateForGen}
            initialQuote={selectedQuoteForGen}
            initialMode="image"
          />
        )}

        {/* Reels Video Studio View */}
        {activePage === 'reels' && (
          <PosterGenerator
            initialTemplate={selectedTemplateForGen}
            initialQuote={selectedQuoteForGen}
            initialMode="reels"
          />
        )}

        {/* Vintage Love Letter View */}
        {activePage === 'letter' && (
          <PosterGenerator
            initialTemplate={selectedTemplateForGen}
            initialQuote={selectedQuoteForGen}
            initialMode="letter"
          />
        )}

        {/* Postcards Library View */}
        {activePage === 'postcards' && (
          <PostcardsLibrary onUseTemplate={handleUseTemplate} />
        )}

        {/* Quotes Collection View */}
        {activePage === 'quotes' && (
          <QuoteLibrary onUseQuoteInGenerator={handleUseQuote} />
        )}

        {/* Vintage Quote Gallery View */}
        {activePage === 'gallery' && <VintageGalleryPage />}

        {/* Categories View */}
        {activePage === 'categories' && (
          <CategoriesPage
            onUseTemplate={handleUseTemplate}
            selectedCategory={selectedCategory}
            onSelectCategory={(catBn) => setSelectedCategory(catBn)}
          />
        )}

        {/* Favorites View */}
        {activePage === 'favorites' && (
          <FavoritesPage
            onUseTemplate={handleUseTemplate}
            onUseQuote={handleUseQuote}
            onGoHome={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Static Legal & Contact Pages */}
        {(activePage === 'privacy' || activePage === 'terms' || activePage === 'contact') && (
          <StaticPages page={activePage} />
        )}
      </main>

      {/* Global Search Modal (supports Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPostcard={handleUseTemplate}
        onSelectQuote={handleUseQuote}
        onSelectGallery={handleSelectGalleryFromSearch}
      />

      {/* Add Video / Preview Modal (accessible globally) */}
      <AddVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSelectVideo={(url) => {
          setHomeFeaturedVideo(url);
          setActivePage('video');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
