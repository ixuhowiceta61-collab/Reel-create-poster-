import React, { useState, useEffect } from 'react';
import { ActivePage } from '../types';
import { getFavorites } from '../utils/favorites';
import { Heart, Sparkles, Search, Menu, X, Image as ImageIcon, BookOpen, Layers, Home, Mail, Video, Feather } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenSearch,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const updateFavoriteCount = () => {
    const p = getFavorites('postcards').length;
    const q = getFavorites('quotes').length;
    const g = getFavorites('gallery').length;
    setFavoriteCount(p + q + g);
  };

  useEffect(() => {
    updateFavoriteCount();
    window.addEventListener('favorites-updated', updateFavoriteCount);
    return () => window.removeEventListener('favorites-updated', updateFavoriteCount);
  }, []);

  const navItems = [
    { id: 'home' as ActivePage, labelBn: 'হোম', labelEn: 'Home', icon: Home },
    { id: 'reels' as ActivePage, labelBn: 'রিলস ভিডিও', labelEn: 'Reels', icon: Video },
    { id: 'letter' as ActivePage, labelBn: 'ভিন্টেজ প্রেমপত্র', labelEn: 'Letter', icon: Feather },
    { id: 'create' as ActivePage, labelBn: 'পোস্টার ইমেজ', labelEn: 'Poster', icon: ImageIcon },
    { id: 'quotes' as ActivePage, labelBn: 'উক্তি সংগ্রহ', labelEn: 'Quotes', icon: BookOpen },
    { id: 'gallery' as ActivePage, labelBn: 'গ্যালারি', labelEn: 'Gallery', icon: Mail },
    { id: 'favorites' as ActivePage, labelBn: 'পছন্দ', labelEn: 'Favorites', icon: Heart, badge: favoriteCount },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#130f0d]/90 border-b border-[#342820] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#802a32] to-[#3a1216] border border-[#d4af37]/40 flex items-center justify-center text-2xl shadow-lg shadow-black/40 group-hover:border-[#d4af37]">
              💌
            </div>
            <div>
              <span className="font-serif tracking-wide text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#fef08a] via-[#f7e4be] to-[#ca8a04] bg-clip-text text-transparent">
                Reel Create Poster
              </span>
              <p className="text-[11px] sm:text-xs text-[#c9b79c] font-bengali tracking-wide line-clamp-1">
                পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-[#fef08a] bg-[#2d1b1f] border border-[#d4af37]/30 shadow-inner'
                      : 'text-[#dfd4c0] hover:text-[#fef08a] hover:bg-[#201814]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-[#a39281]'}`} />
                  <span className="font-bengali text-[15px]">{item.labelBn}</span>
                  {Boolean(item.badge && item.badge > 0) && (
                    <span className="ml-1 px-1.5 py-0.2 bg-[#8b263e] text-[#fef3c7] text-[11px] font-bold rounded-full border border-[#fef08a]/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Primary CTA */}
          <div className="flex items-center gap-3">
            {/* Global Search Button */}
            <button
              id="navbar-search-btn"
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg text-[#dfd4c0] hover:text-[#fef08a] hover:bg-[#201814] border border-[#342820] hover:border-[#d4af37]/40 transition-all cursor-pointer flex items-center gap-1.5 text-xs"
              title="উক্তি বা পোস্টার খুঁজুন"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden md:inline text-[#a39281]">অনুসন্ধান</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-[#241a15] text-[#8c7b6c] rounded border border-[#3f3128]">
                Ctrl K
              </kbd>
            </button>

            {/* Create Poster Primary CTA */}
            <button
              id="navbar-create-poster-cta"
              onClick={() => handleNavClick('create')}
              className="relative group overflow-hidden px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#802a32] via-[#942938] to-[#591b22] text-[#fef9c3] font-semibold text-sm border border-[#d4af37]/40 shadow-lg shadow-[#802a32]/25 hover:shadow-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#fef08a] animate-pulse" />
              <span className="font-bengali text-[15px]">পোস্টার তৈরি করুন</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="navbar-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#dfd4c0] hover:text-[#fef08a] hover:bg-[#201814] border border-[#342820] transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#16110f] border-b border-[#3b2d24] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-lg text-left flex items-center gap-2.5 transition-all text-sm cursor-pointer ${
                    isActive
                      ? 'bg-[#2d1b1f] text-[#fef08a] border border-[#d4af37]/40'
                      : 'bg-[#1e1713] text-[#dfd4c0] hover:bg-[#2a201b]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-[#a39281]'}`} />
                  <span className="font-bengali font-medium flex-1">{item.labelBn}</span>
                  {Boolean(item.badge && item.badge > 0) && (
                    <span className="px-1.5 py-0.5 bg-[#8b263e] text-[#fef3c7] text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            id="mobile-nav-create-btn"
            onClick={() => handleNavClick('create')}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#802a32] to-[#591b22] text-[#fef9c3] font-semibold text-center border border-[#d4af37]/40 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#fef08a]" />
            <span className="font-bengali text-base">পোস্টার তৈরি করুন</span>
          </button>
        </div>
      )}
    </header>
  );
};
