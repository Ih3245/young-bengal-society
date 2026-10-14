import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';

export function VideoPlayerModal({ videoId, videoTitle, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!videoId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#0F172A] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-700 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2.5 truncate pr-4">
            <div className="p-1.5 rounded-lg bg-red-600 text-white">
              <YoutubeIcon className="w-4 h-4 fill-white" />
            </div>
            <h3 className="text-sm sm:text-base font-bold truncate">
              {videoTitle || "ইউটিউব ভিডিও ডকুমেন্টারি প্রতিবেদন"}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 flex items-center gap-1"
              title="ইউটিউবে সরাসরি দেখুন"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-base font-bold"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Iframe Container (16:9 Aspect Ratio) */}
        <div className="relative pb-[56.25%] h-0 bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={videoTitle || "Young Bengal Society Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>

        {/* Footer info note */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>ইয়ং বেঙ্গল সোসাইটি অফিসিয়াল ভিডিও ডকুমেন্টেশন</span>
          <span className="text-amber-400">Young Bengal Society © ২০১৯-২০২৬</span>
        </div>
      </div>
    </div>
  );
}
