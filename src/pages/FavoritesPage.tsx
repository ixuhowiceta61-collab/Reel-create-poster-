import React, { useState, useEffect } from 'react';
import { postcards } from '../data/postcards';
import { quotes } from '../data/quotes';
import { gallery } from '../data/gallery';
import { PostcardTemplate, RomanticQuote } from '../types';
import { getFavorites, removeFavorite } from '../utils/favorites';
import { PosterCard } from '../components/PosterCard';
import { Heart, Sparkles, BookOpen, Mail, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesPageProps {
  onUseTemplate: (template: PostcardTemplate) => void;
  onUseQuote: (quote: RomanticQuote) => void;
  onGoHome: () => void;
}

type FavTab = 'postcards' | 'quotes' | 'gallery';

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  onUseTemplate,
  onUseQuote,
  onGoHome,
}) => {
  const [activeTab, setActiveTab] = useState<FavTab>('postcards');
  const [favPostcardIds, setFavPostcardIds] = useState<string[]>([]);
  const [favQuoteIds, setFavQuoteIds] = useState<string[]>([]);
  const [favGalleryIds, setFavGalleryIds] = useState<string[]>([]);

  const loadFavs = () => {
    setFavPostcardIds(getFavorites('postcards'));
    setFavQuoteIds(getFavorites('quotes'));
    setFavGalleryIds(getFavorites('gallery'));
  };

  useEffect(() => {
    loadFavs();
    window.addEventListener('favorites-updated', loadFavs);
    return () => window.removeEventListener('favorites-updated', loadFavs);
  }, []);

  const handleRemovePostcard = (id: string) => {
    removeFavorite('postcards', id);
    loadFavs();
  };

  const handleRemoveQuote = (id: string) => {
    removeFavorite('quotes', id);
    loadFavs();
  };

  const handleRemoveGallery = (id: string) => {
    removeFavorite('gallery', id);
    loadFavs();
  };

  const savedPostcards = postcards.filter((p) => favPostcardIds.includes(p.id));
  const savedQuotes = quotes.filter((q) => favQuoteIds.includes(q.id));
  const savedGallery = gallery.filter((g) => favGalleryIds.includes(g.id));

  const totalFavs = savedPostcards.length + savedQuotes.length + savedGallery.length;

  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2a171a] border border-[#d4af37]/40 text-xs font-serif text-[#f87171] uppercase">
            <Heart className="w-3.5 h-3.5 fill-[#f87171]" />
            <span>SAVED COLLECTION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali text-[#fef9c3]">
            আমার পছন্দের সংগ্রহশালা
          </h1>
          <p className="text-sm text-[#b5a392] font-bengali">
            আপনার হৃদয়ে ছুঁয়ে যাওয়া সংরক্ষিত পোস্টার, উক্তি ও ভিন্টেজ আর্টওয়ার্ক।
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            type="button"
            id="fav-tab-postcards"
            onClick={() => setActiveTab('postcards')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'postcards'
                ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37] shadow-lg shadow-[#802a32]/25'
                : 'bg-[#18120e] text-[#b5a392] hover:text-[#fef08a] border border-[#34271e]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>পোস্টার ({savedPostcards.length})</span>
          </button>

          <button
            type="button"
            id="fav-tab-quotes"
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37] shadow-lg shadow-[#802a32]/25'
                : 'bg-[#18120e] text-[#b5a392] hover:text-[#fef08a] border border-[#34271e]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>উক্তি ({savedQuotes.length})</span>
          </button>

          <button
            type="button"
            id="fav-tab-gallery"
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bengali font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37] shadow-lg shadow-[#802a32]/25'
                : 'bg-[#18120e] text-[#b5a392] hover:text-[#fef08a] border border-[#34271e]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>গ্যালারি ({savedGallery.length})</span>
          </button>
        </div>

        {/* Content based on Active Tab */}
        {totalFavs === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto bg-[#16100d] border border-[#34261e] rounded-2xl p-8 space-y-4">
            <span className="text-4xl">💌</span>
            <h3 className="font-bengali text-xl font-bold text-[#fef9c3]">
              এখনো কোনো পছন্দ সংরক্ষণ করা হয়নি
            </h3>
            <p className="font-bengali text-sm text-[#a39281] leading-relaxed">
              পোস্টার লাইব্রেরি বা উক্তি সংগ্রহ ব্রাউজ করার সময় হার্ট (❤️) আইকনে ক্লিক করে সহজেই পছন্দের তালিকায় যোগ করতে পারেন।
            </p>
            <button
              onClick={onGoHome}
              className="px-5 py-2.5 rounded-xl bg-[#802a32] text-[#fef9c3] font-bengali text-sm font-semibold border border-[#d4af37]/40 inline-flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>পোস্টার খুঁজুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Postcards tab */}
            {activeTab === 'postcards' && (
              <>
                {savedPostcards.length === 0 ? (
                  <div className="py-12 text-center text-sm font-bengali text-[#8c7b6c]">
                    কোনো সংরক্ষিত পোস্টার নেই।
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedPostcards.map((template) => (
                      <div key={template.id} className="relative">
                        <PosterCard
                          template={template}
                          onUseTemplate={onUseTemplate}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Quotes tab */}
            {activeTab === 'quotes' && (
              <>
                {savedQuotes.length === 0 ? (
                  <div className="py-12 text-center text-sm font-bengali text-[#8c7b6c]">
                    কোনো সংরক্ষিত উক্তি নেই।
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedQuotes.map((q) => (
                      <div
                        key={q.id}
                        className="bg-[#18120e] rounded-2xl border border-[#3b2d24] p-5 shadow-xl flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bengali font-semibold bg-[#120c09] text-[#fef08a] border border-[#382b22]">
                              {q.category}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveQuote(q.id)}
                              className="p-1.5 rounded-lg text-[#8c7b6c] hover:text-[#ef4444] transition-colors cursor-pointer"
                              title="সরিয়ে ফেলুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="font-bengali text-base text-[#f5ebd7] leading-relaxed italic">
                            “{q.text}”
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#291e17] flex items-center justify-between">
                          <span className="text-xs text-[#8c7b6c] font-bengali">
                            {q.author}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUseQuote(q)}
                            className="px-3 py-1.5 rounded-lg bg-[#802a32] hover:bg-[#9e2a3b] text-[#fef9c3] text-xs font-bengali font-semibold border border-[#d4af37]/30 flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" />
                            <span>পোস্টারে নিন</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Gallery tab */}
            {activeTab === 'gallery' && (
              <>
                {savedGallery.length === 0 ? (
                  <div className="py-12 text-center text-sm font-bengali text-[#8c7b6c]">
                    কোনো সংরক্ষিত গ্যালারি আর্টওয়ার্ক নেই।
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedGallery.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#18120e] rounded-2xl border border-[#3b2d24] p-5 shadow-xl space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-sm font-bold text-[#fef9c3]">
                            {item.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveGallery(item.id)}
                            className="p-1.5 rounded-lg text-[#8c7b6c] hover:text-[#ef4444] transition-colors cursor-pointer"
                            title="সরিয়ে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bengali text-sm text-[#f5ebd7] italic">
                          “{item.quote}”
                        </p>
                        <div className="text-xs text-[#d4af37] font-serif pt-1">
                          {item.category}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
