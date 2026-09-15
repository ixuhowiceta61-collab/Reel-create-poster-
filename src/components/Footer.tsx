import React from 'react';
import { ActivePage } from '../types';
import { APP_INFO } from '../data/config';
import { Heart, Sparkles, Mail, Shield, FileText, HelpCircle } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0807] border-t border-[#2d221b] text-[#c9b79c] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#251c16]">
          {/* Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💌</span>
              <span className="font-serif text-2xl font-bold text-[#fef08a] tracking-wide">
                {APP_INFO.name}
              </span>
            </div>
            <p className="font-bengali text-lg text-[#f4ecd8] italic">
              “{APP_INFO.tagline}”
            </p>
            <p className="text-sm text-[#9c8976] max-w-md leading-relaxed">
              একটি আধুনিক ও মার্জিত ভিন্টেজ পোস্টকার্ড প্ল্যাটফর্ম—যেখানে প্রতিটি অক্ষরের ভেতর লুকিয়ে থাকে না বলা ভালোবাসার স্মৃতি আর পুরনো দিনের খাঁটি অনুভূতি।
            </p>
            <div className="flex items-center gap-2 text-xs text-[#a89078] pt-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span>HD কোয়ালিটি এক্সপোর্ট • সম্পূর্ণ প্রি-ডিজাইনড আর্টওয়ার্ক</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-[#fef08a] font-semibold text-base mb-4 tracking-wider uppercase text-xs border-b border-[#3d2e24] pb-2">
              ন্যাভিগেশন (Navigation)
            </h4>
            <ul className="space-y-2.5 text-sm font-bengali">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => handleNav('home')}
                  className="hover:text-[#fef08a] transition-colors cursor-pointer text-left"
                >
                  হোম পেজ (Home)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-postcards"
                  onClick={() => handleNav('postcards')}
                  className="hover:text-[#fef08a] transition-colors cursor-pointer text-left"
                >
                  পোস্টার সংগ্রহ (Postcards)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-quotes"
                  onClick={() => handleNav('quotes')}
                  className="hover:text-[#fef08a] transition-colors cursor-pointer text-left"
                >
                  রোমান্টিক উক্তি (Quotes)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-gallery"
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#fef08a] transition-colors cursor-pointer text-left"
                >
                  ভিন্টেজ গ্যালারি (Gallery)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-create"
                  onClick={() => handleNav('create')}
                  className="hover:text-[#fef08a] text-[#e5a93c] flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  পোস্টার জেনারেটর (Generator)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="font-serif text-[#fef08a] font-semibold text-base mb-4 tracking-wider uppercase text-xs border-b border-[#3d2e24] pb-2">
              নীতিমালা ও সহায়তা
            </h4>
            <ul className="space-y-2.5 text-sm font-bengali">
              <li>
                <button
                  id="footer-nav-privacy"
                  onClick={() => handleNav('privacy')}
                  className="hover:text-[#fef08a] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-[#a89078]" />
                  Privacy Policy (গোপনীয়তা)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-terms"
                  onClick={() => handleNav('terms')}
                  className="hover:text-[#fef08a] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#a89078]" />
                  Terms & Conditions (শর্তাবলী)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#fef08a] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#a89078]" />
                  Contact (যোগাযোগ)
                </button>
              </li>
              <li className="pt-2 text-xs text-[#8c7a68]">
                স্পন্সর ও বিজ্ঞাপনের জন্য যোগাযোগ করুন:
                <div className="text-[#fef08a] font-mono mt-0.5">{APP_INFO.contactEmail}</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8a7767] gap-4">
          <p>
            © {APP_INFO.currentYear} Reel Create Poster. সর্বস্বত্ব সংরক্ষিত। পুরনো দিনের ভালোবাসার স্মারক।
          </p>
          <div className="flex items-center gap-2">
            <span>নির্মিত হয়েছে গভীর অনুরাগে</span>
            <Heart className="w-3.5 h-3.5 text-[#dc2626] fill-[#dc2626]" />
            <span>সকল চিরন্তন প্রেমিকের জন্য</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
