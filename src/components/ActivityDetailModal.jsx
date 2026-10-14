import React from 'react';
import { 
  X, Calendar, MapPin, Users, Video, 
  Tag, Heart, CheckCircle2, Share2 
} from 'lucide-react';

export function ActivityDetailModal({ activity, onClose, onWatchVideo }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E8DFD1] relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E8DFD1] bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#1E3A8A] text-white">
              {activity.category}
            </span>
            <span 
              className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                activity.status === "আসন্ন"
                  ? "bg-amber-500 text-white animate-pulse"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {activity.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg text-lg font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Main Photo with YouTube Badge if available */}
          {activity.photoUrl && (
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-[#E8DFD1] shadow-xs">
              <img
                src={activity.photoUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              {activity.youtubeId && (
                <button
                  onClick={() => {
                    onClose();
                    onWatchVideo(activity.youtubeId, activity.title);
                  }}
                  className="absolute bottom-4 right-4 px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Video className="w-4 h-4 fill-white" />
                  <span>ইউটিউব ভিডিও দেখুন</span>
                </button>
              )}
            </div>
          )}

          {/* Title & Metadata */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-snug mb-2">
              {activity.title}
            </h2>
            {activity.titleEn && (
              <p className="text-sm text-[#64748B] font-medium mb-4">
                {activity.titleEn}
              </p>
            )}

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] text-xs">
              <div>
                <span className="text-[#64748B] block mb-0.5">তারিখ:</span>
                <span className="font-bold text-[#0F172A] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  {activity.date}
                </span>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">স্থান:</span>
                <span className="font-bold text-[#0F172A] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  {activity.location}
                </span>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">সুবিধাভোগী:</span>
                <span className="font-bold text-[#1E3A8A] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {activity.beneficiaries}
                </span>
              </div>
              <div>
                <span className="text-[#64748B] block mb-0.5">দায়িত্বে:</span>
                <span className="font-bold text-[#0F172A] truncate block">
                  {activity.leadMember || "স্বেচ্ছাসেবক দল"}
                </span>
              </div>
            </div>
          </div>

          {/* Full Narrative */}
          <div>
            <h3 className="text-base font-bold text-[#0F172A] mb-2">
              কার্যক্রমের বিস্তারিত প্রতিবেদন:
            </h3>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed whitespace-pre-line">
              {activity.description}
            </p>
          </div>

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="pt-4 border-t border-[#E8DFD1] flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#64748B]" />
              {activity.tags.map(t => (
                <span key={t} className="px-2.5 py-1 text-xs rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] text-[#475569]">
                  #{t}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-[#E8DFD1] bg-[#FAF7F2] flex items-center justify-between">
          <span className="text-xs text-[#64748B]">
            ইয়ং বেঙ্গল সোসাইটি অফিসিয়াল আর্কাইভ
          </span>

          <div className="flex items-center gap-2">
            {activity.youtubeId && (
              <button
                onClick={() => {
                  onClose();
                  onWatchVideo(activity.youtubeId, activity.title);
                }}
                className="px-3.5 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 flex items-center gap-1.5 transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span>ভিডিও চালান</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl shadow-xs"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
