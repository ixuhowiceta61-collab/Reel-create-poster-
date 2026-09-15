import React, { useState, useEffect, useRef } from 'react';
import { SPONSOR_URL, SPONSOR_COUNTDOWN_SECONDS } from '../data/config';
import { X, ExternalLink, Lock, CheckCircle2, Download, AlertCircle } from 'lucide-react';

interface DownloadGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPerformDownload: (format: 'png' | 'jpeg') => Promise<void>;
  posterTitle?: string;
}

export const DownloadGateModal: React.FC<DownloadGateModalProps> = ({
  isOpen,
  onClose,
  onPerformDownload,
  posterTitle = 'Vintage Poster',
}) => {
  const [hasOpenedSponsor, setHasOpenedSponsor] = useState(false);
  const [countdown, setCountdown] = useState<number>(SPONSOR_COUNTDOWN_SECONDS);
  const [isReady, setIsReady] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpeg'>('png');
  const [popupBlockedWarning, setPopupBlockedWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset state whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setHasOpenedSponsor(false);
      setCountdown(SPONSOR_COUNTDOWN_SECONDS);
      setIsReady(false);
      setIsExporting(false);
      setPopupBlockedWarning(false);
      setErrorMessage(null);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Handle countdown when sponsor is opened
  useEffect(() => {
    if (hasOpenedSponsor && countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsReady(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasOpenedSponsor, countdown]);

  if (!isOpen) return null;

  const handleOpenSponsor = () => {
    setPopupBlockedWarning(false);
    try {
      const openedWindow = window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');
      if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
        // In case the browser strictly blocked the popup
        setPopupBlockedWarning(true);
      }
    } catch (e) {
      console.warn('Popup blocker error', e);
      setPopupBlockedWarning(true);
    }

    // Start 8s countdown regardless so user is not stuck
    setHasOpenedSponsor(true);
    setCountdown(SPONSOR_COUNTDOWN_SECONDS);
  };

  const handleDownloadNow = async () => {
    if (!isReady || isExporting) return;
    setIsExporting(true);
    setErrorMessage(null);
    try {
      await onPerformDownload(selectedFormat);
      // After successful export, wait 1 second and close
      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 1200);
    } catch (err: unknown) {
      console.error('Download execution failed', err);
      setIsExporting(false);
      const errMsg = err instanceof Error ? err.message : 'ডাউনলোড সম্পন্ন করা সম্ভব হয়নি। আবার চেষ্টা করুন।';
      setErrorMessage(errMsg);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1b1411] to-[#0f0b09] rounded-2xl border border-[#d4af37]/40 p-6 sm:p-8 shadow-2xl shadow-black text-[#f5ebd7] overflow-hidden">
        {/* Ornate corner filigree accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#d4af37]/40 pointer-events-none rounded-tl"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#d4af37]/40 pointer-events-none rounded-tr"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#d4af37]/40 pointer-events-none rounded-bl"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#d4af37]/40 pointer-events-none rounded-br"></div>

        {/* Close Button */}
        <button
          id="close-sponsor-modal-btn"
          onClick={onClose}
          disabled={isExporting}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#9c8976] hover:text-[#fef08a] hover:bg-[#2e1f18] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Vintage Mail / Postcard icon */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#802a32]/40 border border-[#d4af37]/40 text-2xl shadow-inner mb-1">
            💌
          </div>
          <div className="text-[11px] tracking-widest text-[#d4af37] uppercase font-serif font-semibold">
            POSTCARD READY
          </div>
          <h3
            id="download-modal-title"
            className="text-xl sm:text-2xl font-bold font-bengali text-[#fef9c3]"
          >
            আপনার পোস্টার প্রস্তুত
          </h3>
          <p className="text-xs sm:text-sm text-[#bcaaa0] font-bengali">
            {posterTitle} • HD কোয়ালিটি
          </p>
        </div>

        {/* Instruction Message */}
        <div className="bg-[#140e0b] border border-[#3b2d24] rounded-xl p-4 text-center mb-6 space-y-3">
          <p className="font-bengali text-sm text-[#f5ebd7] leading-relaxed">
            {!isReady ? (
              hasOpenedSponsor ? (
                'Sponsor Page খোলা হয়েছে। অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন।'
              ) : (
                <>
                  ডাউনলোড চালু করার আগে <span className="text-[#fef08a] font-semibold">Sponsor Page</span> দেখুন।
                </>
              )
            ) : (
              <span className="text-[#86efac] font-medium">
                আপনার হাই-রেজোলিউশন পোস্টার এখন ডাউনলোডের জন্য সম্পূর্ণ প্রস্তুত!
              </span>
            )}
          </p>

          {/* Sponsor Open Button */}
          {!hasOpenedSponsor && (
            <button
              id="open-sponsor-page-btn"
              onClick={handleOpenSponsor}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5d061] to-[#ca8a04] text-[#1c120c] font-bold font-bengali text-base shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/35 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-5 h-5 text-[#1c120c]" />
              <span>👁️ Sponsor দেখুন</span>
            </button>
          )}

          {/* Popup blocker warning if needed */}
          {popupBlockedWarning && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#451a03]/60 border border-[#b45309]/50 text-left text-xs text-[#fef08a] font-bengali">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#f59e0b] mt-0.5" />
              <span>Sponsor Page খুলতে আপনার browser popup permission প্রয়োজন হতে পারে। টাইমার চালু রয়েছে।</span>
            </div>
          )}

          {/* Countdown Display & Status Indicator */}
          {hasOpenedSponsor && !isReady && (
            <div className="py-3 flex flex-col items-center justify-center space-y-2">
              <div className="relative w-16 h-16 rounded-full border-2 border-[#d4af37]/40 flex items-center justify-center bg-[#241712]">
                <span className="text-2xl font-bold font-mono text-[#fef08a]">
                  {countdown < 10 ? `0${countdown}` : countdown}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#eab308] font-bengali">
                <span className="w-2 h-2 rounded-full bg-[#eab308] animate-ping"></span>
                <span>Download প্রস্তুত হচ্ছে...</span>
              </div>
            </div>
          )}

          {/* Ready State Stamp */}
          {isReady && (
            <div className="py-2 flex items-center justify-center gap-2 text-sm font-semibold text-[#4ade80] font-bengali">
              <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
              <span>✓ READY (✅ Download Ready)</span>
            </div>
          )}
        </div>

        {/* Format Selector (PNG / JPG) */}
        <div className="mb-5">
          <label className="block text-xs font-serif text-[#c5a059] uppercase tracking-wider mb-2 font-medium">
            Format নির্বাচন করুন:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="format-select-png"
              onClick={() => setSelectedFormat('png')}
              className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                selectedFormat === 'png'
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                  : 'bg-[#18110e] text-[#a39281] border-[#382b22] hover:border-[#802a32]'
              }`}
            >
              HD PNG (ক্রিস্প কোয়ালিটি)
            </button>
            <button
              type="button"
              id="format-select-jpg"
              onClick={() => setSelectedFormat('jpeg')}
              className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                selectedFormat === 'jpeg'
                  ? 'bg-[#802a32] text-[#fef08a] border-[#d4af37]'
                  : 'bg-[#18110e] text-[#a39281] border-[#382b22] hover:border-[#802a32]'
              }`}
            >
              HD JPG (কম্প্যাক্ট সাইজ)
            </button>
          </div>
        </div>

        {/* Error message if export fails */}
        {errorMessage && (
          <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-[#450a0a]/80 border border-[#dc2626]/60 text-xs text-[#fca5a5] font-bengali">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#ef4444] mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Button: Locked or Download Now */}
        <div>
          {!isReady ? (
            <button
              id="locked-download-btn"
              disabled
              className="w-full py-3.5 px-4 rounded-xl bg-[#261c18] border border-[#443329] text-[#716155] font-semibold font-bengali text-base flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <Lock className="w-4 h-4 text-[#716155]" />
              <span>🔒 Download Locked</span>
            </button>
          ) : (
            <button
              id="execute-download-btn"
              onClick={handleDownloadNow}
              disabled={isExporting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#802a32] via-[#9e2a3b] to-[#6b1b24] text-[#fef9c3] font-bold font-bengali text-base border border-[#d4af37] shadow-xl shadow-[#802a32]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
            >
              {isExporting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#fef08a] border-t-transparent rounded-full animate-spin"></span>
                  <span>এক্সপোর্ট করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-[#fef08a]" />
                  <span>⬇️ DOWNLOAD NOW ({selectedFormat.toUpperCase()})</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Subtext info */}
        <p className="text-[11px] text-[#756557] text-center mt-4">
          পোস্টারে কোনো ওয়াটারমার্ক থাকবে না। হাই-ডেফিনিশন ফরম্যাটে এক্সপোর্ট হবে।
        </p>
      </div>
    </div>
  );
};
