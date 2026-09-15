import React, { useState, useRef } from 'react';
import { gallery } from '../data/gallery';
import { GalleryItem } from '../types';
import { getVintageArtworkSvg } from '../utils/artworks';
import { isFavorite, toggleFavorite } from '../utils/favorites';
import { DownloadGateModal } from '../components/DownloadGateModal';
import { exportPosterImage } from '../utils/exporter';
import { Mail, Search, Heart, Eye, Download, X } from 'lucide-react';

export const VintageGalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);
  const [downloadingItem, setDownloadingItem] = useState<GalleryItem | null>(null);
  const [, setFavUpdateTick] = useState(0);

  const galleryExportRef = useRef<HTMLDivElement>(null);

  const categories = ['সব', 'Vintage Love', 'Romantic', 'Classic Vintage', 'Love Letter', 'Memories', 'Bengali Vintage'];

  const filteredItems = gallery.filter((item) => {
    const matchesCat = selectedCategory === 'সব' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.quoteEn && item.quoteEn.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleToggleFav = (id: string) => {
    toggleFavorite('gallery', id);
    setFavUpdateTick((prev) => prev + 1);
  };

  const handleInitiateDownload = (item: GalleryItem) => {
    setDownloadingItem(item);
  };

  const handlePerformDownload = async (format: 'png' | 'jpeg') => {
    if (!downloadingItem || !galleryExportRef.current) return;
    const sanitizedTitle = downloadingItem.title.toLowerCase().replace(/\s+/g, '-');
    const fileName = `reel-create-gallery-${sanitizedTitle}-${Date.now()}`;
    await exportPosterImage({
      element: galleryExportRef.current,
      fileName,
      format,
      scale: 3,
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0907] text-[#f4ecd8] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#201411] border border-[#d4af37]/40 text-xs font-serif text-[#fef08a] uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>PRE-DESIGNED ARTWORK GALLERY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-bengali text-[#fef9c3]">
            ভিন্টেজ কোট গ্যালারি (Vintage Quote Gallery)
          </h1>
          <p className="text-sm text-[#b5a392] font-bengali">
            আগে থেকেই নিখুঁতভাবে তৈরি আর্টওয়ার্ক ও ভিন্টেজ পোস্টকার্ড। সরাসরি দেখুন এবং উচ্চ রেজোলিউশনে ডাউনলোড করুন।
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#16100d] border border-[#382a20] rounded-2xl p-4 sm:p-5 mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                id="gallery-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="গ্যালারি আর্টওয়ার্ক খুঁজুন..."
                className="w-full bg-[#1e1713] border border-[#3b2d24] rounded-xl pl-10 pr-4 py-2 text-sm text-[#fef9c3] placeholder-[#736153] focus:outline-none focus:border-[#d4af37] font-bengali"
              />
              <Search className="w-4 h-4 text-[#a39281] absolute left-3.5 top-3" />
            </div>

            <div className="text-xs text-[#8c7b6c] font-bengali">
              মোট আর্টওয়ার্ক: <span className="text-[#fef08a] font-bold">{filteredItems.length}</span> টি
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`gallery-cat-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bengali whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#802a32] text-[#fef08a] border border-[#d4af37]'
                    : 'bg-[#201814] text-[#a89078] hover:bg-[#2c201a] border border-[#34271e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const fav = isFavorite('gallery', item.id);
            const artworkSvg = getVintageArtworkSvg(item.artworkType, item.themeColor);

            return (
              <div
                key={item.id}
                className="group relative bg-[#18120e] rounded-2xl border border-[#3b2d24] hover:border-[#d4af37]/60 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-black/60 transition-all flex flex-col justify-between"
              >
                {/* Visual Canvas Area */}
                <div className="relative w-full aspect-[4/3] bg-[#120c09] overflow-hidden">
                  <div
                    className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    dangerouslySetInnerHTML={{ __html: artworkSvg }}
                  />

                  {/* Aesthetic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18120e] via-transparent to-black/40 pointer-events-none" />

                  {/* Embedded Quote inside art container */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-center items-center text-center pointer-events-none">
                    <p
                      className="font-bengali text-base sm:text-lg text-[#fef9c3] font-bold leading-relaxed max-w-xs"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}
                    >
                      “{item.quote}”
                    </p>
                    {item.quoteEn && (
                      <span className="text-[11px] font-serif text-[#d4af37] italic mt-1 opacity-90 drop-shadow">
                        {item.quoteEn}
                      </span>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#130f0d]/85 text-[#fef08a] border border-[#d4af37]/40 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    type="button"
                    id={`fav-gallery-${item.id}`}
                    onClick={() => handleToggleFav(item.id)}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md ${
                      fav
                        ? 'bg-[#802a32] text-[#f87171] border border-[#f87171]'
                        : 'bg-[#18120e]/80 text-[#d1c2af] hover:text-[#f87171] border border-[#443329] hover:border-[#802a32]'
                    }`}
                    title={fav ? 'পছন্দ থেকে সরান' : 'পছন্দে যোগ করুন'}
                  >
                    <Heart className={`w-4 h-4 ${fav ? 'fill-[#f87171]' : ''}`} />
                  </button>
                </div>

                {/* Info & Actions */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-t border-[#291e17] gap-3">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#fef9c3] group-hover:text-[#fef08a] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="text-[11px] text-[#8c7b6c]">HD Artwork • আর্ট পিস</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id={`view-gallery-${item.id}`}
                      onClick={() => setPreviewItem(item)}
                      className="p-2 rounded-lg bg-[#201713] hover:bg-[#2c201a] text-[#cfbeaa] hover:text-[#fef08a] border border-[#3b2d24] transition-colors cursor-pointer"
                      title="ফুলস্ক্রিন দেখুন"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      id={`download-gallery-${item.id}`}
                      onClick={() => handleInitiateDownload(item)}
                      className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#802a32] to-[#591b22] hover:from-[#9e2a3b] hover:to-[#6d2028] text-[#fef9c3] text-xs font-bengali font-semibold border border-[#d4af37]/40 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#fef08a]" />
                      <span>ডাউনলোড</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Preview Modal */}
      {previewItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative w-full max-w-xl bg-[#18110e] rounded-2xl border-2 border-[#d4af37]/60 p-6 shadow-2xl shadow-black text-[#f4ecd8] space-y-4">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-[#9c8976] hover:text-[#fef08a] hover:bg-[#2e1f18]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="text-xs font-serif text-[#d4af37] tracking-widest uppercase">
                {previewItem.category}
              </span>
              <h3 className="text-xl font-bold font-bengali text-[#fef9c3]">
                {previewItem.title}
              </h3>
            </div>

            {/* Poster Canvas */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-4 border-[#c5a059] shadow-xl bg-[#120c09]">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: getVintageArtworkSvg(previewItem.artworkType, previewItem.themeColor),
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 flex flex-col justify-center items-center text-center p-6">
                <p className="font-bengali text-lg sm:text-xl text-[#fef9c3] font-bold leading-relaxed">
                  “{previewItem.quote}”
                </p>
                {previewItem.quoteEn && (
                  <span className="text-xs font-serif text-[#d4af37] italic mt-2">
                    {previewItem.quoteEn}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#8c7b6c]">HD প্রস্তুত আর্টওয়ার্ক</span>
              <button
                onClick={() => {
                  const itm = previewItem;
                  setPreviewItem(null);
                  handleInitiateDownload(itm);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#802a32] to-[#591b22] text-[#fef9c3] font-bold text-sm font-bengali border border-[#d4af37] flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Download className="w-4 h-4 text-[#fef08a]" />
                <span>ডাউনলোড করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden off-screen export container for Gallery Items */}
      {downloadingItem && (
        <div className="fixed -left-[9999px] top-0 pointer-events-none">
          <div
            ref={galleryExportRef}
            style={{ width: '800px', height: '600px' }}
            className="relative bg-[#15100d] border-8 border-double border-[#d4af37] overflow-hidden"
          >
            <div
              className="absolute inset-0 w-full h-full"
              dangerouslySetInnerHTML={{
                __html: getVintageArtworkSvg(downloadingItem.artworkType, downloadingItem.themeColor),
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/65 flex flex-col justify-center items-center text-center p-12">
              <p
                className="font-bengali text-3xl text-[#fef9c3] font-bold leading-relaxed max-w-lg"
                style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9)' }}
              >
                “{downloadingItem.quote}”
              </p>
              {downloadingItem.quoteEn && (
                <span className="text-sm font-serif text-[#d4af37] italic mt-3 tracking-wide">
                  {downloadingItem.quoteEn}
                </span>
              )}
            </div>
            <div className="absolute bottom-4 right-6 text-xs font-serif text-[#d4af37] opacity-75">
              REEL CREATE POSTER • ARCHIVE
            </div>
          </div>
        </div>
      )}

      {/* 8-Second Sponsor Gate Modal for Gallery Item Downloads */}
      <DownloadGateModal
        isOpen={Boolean(downloadingItem)}
        onClose={() => setDownloadingItem(null)}
        onPerformDownload={handlePerformDownload}
        posterTitle={downloadingItem?.title || 'Vintage Artwork'}
      />
    </div>
  );
};
