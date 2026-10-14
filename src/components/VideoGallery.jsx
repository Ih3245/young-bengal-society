import React, { useState } from 'react';
import { 
  Video, Play, Plus, ExternalLink, Sparkles, CheckCircle2, Film 
} from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';
import { extractYouTubeId } from '../data/activitiesData';

export function VideoGallery({ 
  activities, 
  onWatchVideo, 
  onAddCustomVideo 
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoCategory, setVideoCategory] = useState("রমজান ও খাদ্য সহায়তা");
  const [videoLocation, setVideoLocation] = useState("মাঠপর্যায়ে কার্যক্রম");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  // Extract all activities that have a valid youtubeId or youtubeUrl
  const videoList = activities.filter(a => a.youtubeId || a.youtubeUrl);

  const handleAddVideoSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const extractedId = extractYouTubeId(videoUrl);
    if (!extractedId) {
      setErrorMsg("অনুগ্রহ করে একটি সঠিক ইউটিউব লিংক প্রদান করুন (যেমন: https://www.youtube.com/watch?v=... বা https://youtu.be/...)");
      return;
    }

    if (!videoTitle.trim()) {
      setErrorMsg("ভিডিওটির একটি শিরোনাম লিখুন।");
      return;
    }

    onAddCustomVideo({
      id: `custom-vid-${Date.now()}`,
      title: videoTitle.trim(),
      category: videoCategory,
      location: videoLocation.trim() || "মাঠপর্যায়ে",
      date: "নতুন সংযোজিত ভিডিও",
      dateRaw: new Date().toISOString(),
      year: 2026,
      status: "সম্পন্ন",
      beneficiaries: "ডকুমেন্টারি ও তথ্যচিত্র",
      description: `ইউটিউব ভিডিও ডকুমেন্টারি: ${videoTitle}`,
      youtubeUrl: videoUrl.trim(),
      youtubeId: extractedId,
      photoUrl: `https://img.youtube.com/vi/${extractedId}/hqdefault.jpg`,
      isUpcoming: false
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setShowAddModal(false);
      setVideoUrl("");
      setVideoTitle("");
    }, 1200);
  };

  return (
    <section id="videos" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
              <YoutubeIcon className="w-4 h-4 text-red-600 fill-red-600" />
              <span>ইউটিউব ভিডিও ডকুমেন্টারি আর্কাইভ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] tracking-tight">
              আমাদের কাজের ভিডিও প্রতিবেদন
            </h2>
            <p className="text-sm sm:text-base text-[#475569] mt-2 max-w-2xl">
              প্রতিটি মানবিক কার্যক্রমের স্বচ্ছতা নিশ্চিতে মাঠপর্যায়ের ভিডিওচিত্র ধারণ করে ইউটিউবে সংরক্ষণ করা হয়। আপনি সরাসরি এখানে ভিডিও লিংক যোগ করতে পারবেন।
            </p>
          </div>

          {/* Add YouTube Video Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-sm flex items-center gap-2 self-start md:self-auto active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ ইউটিউব ভিডিও লিংক যোগ করুন</span>
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoList.map((item) => {
            const ytId = item.youtubeId || extractYouTubeId(item.youtubeUrl);
            const thumbUrl = ytId 
              ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              : (item.photoUrl || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80");

            return (
              <div
                key={item.id}
                className="card-warm card-warm-hover rounded-2xl overflow-hidden bg-white border border-[#E8DFD1] flex flex-col group"
              >
                {/* Video Thumbnail with Play Button Overlay */}
                <div 
                  onClick={() => onWatchVideo(ytId, item.title)}
                  className="relative h-52 bg-[#0F172A] cursor-pointer overflow-hidden group/thumb"
                >
                  <img
                    src={thumbUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-90 group-hover/thumb:opacity-100"
                    loading="lazy"
                  />
                  
                  {/* Dark gradient for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Play Icon Circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-red-600 group-hover/thumb:bg-red-700 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                  </div>

                  {/* YouTube Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-[11px] font-bold rounded-md bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                      <YoutubeIcon className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      ইউটিউব
                    </span>
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-medium text-amber-300 block mb-0.5">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-200">
                      {item.location} • {item.date}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors leading-snug line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#E8DFD1] flex items-center justify-between">
                    <button
                      onClick={() => onWatchVideo(ytId, item.title)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      ভিডিওটি প্লে করুন →
                    </button>
                    {item.youtubeUrl && (
                      <a
                        href={item.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#64748B] hover:text-[#1E3A8A] flex items-center gap-1"
                      >
                        ইউটিউবে ওপেন <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Add Custom YouTube Video Link */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#E8DFD1] relative">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1] mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-red-50 text-red-600">
                    <YoutubeIcon className="w-5 h-5 fill-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    নতুন ইউটিউব ভিডিও লিংক যোগ করুন
                  </h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {successMsg ? (
                <div className="py-8 text-center text-emerald-700 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <p className="font-bold text-base">ভিডিওটি সফলভাবে যোগ করা হয়েছে!</p>
                </div>
              ) : (
                <form onSubmit={handleAddVideoSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 text-xs rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1">
                      ইউটিউব ভিডিও লিংক (URL) *
                    </label>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... অথবা https://youtu.be/..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                      required
                    />
                    <p className="text-[11px] text-[#64748B] mt-1">
                      টিপস: ইউটিউব থেকে Share অপশনে গিয়ে Copy Link চেপে এখানে পেস্ট করে দিন।
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#334155] mb-1">
                      ভিডিওর শিরোনাম বা কাজের নাম *
                    </label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="যেমন: কুড়িগ্রামে ৫০০ পরিবারের মাঝে রমজান খাদ্য উপহার ২০২৬"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1">
                        ক্যাটাগরি
                      </label>
                      <select
                        value={videoCategory}
                        onChange={(e) => setVideoCategory(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                      >
                        <option value="রমজান ও খাদ্য সহায়তা">রমজান ও খাদ্য সহায়তা</option>
                        <option value="শীতবস্ত্র বিতরণ">শীতবস্ত্র বিতরণ</option>
                        <option value="ফ্রি মেডিকেল ও রক্তদান">ফ্রি মেডিকেল ও রক্তদান</option>
                        <option value="বন্যা ও দুর্যোগ পুনর্বাসন">বন্যা ও দুর্যোগ পুনর্বাসন</option>
                        <option value="শিক্ষা ও শিশুকল্যাণ">শিক্ষা ও শিশুকল্যাণ</option>
                        <option value="বৃক্ষরোপণ ও পরিবেশ">বৃক্ষরোপণ ও পরিবেশ</option>
                        <option value="সাধারণ ডকুমেন্টারি">সাধারণ ডকুমেন্টারি</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] mb-1">
                        এলাকা / জেলা
                      </label>
                      <input
                        type="text"
                        value={videoLocation}
                        onChange={(e) => setVideoLocation(e.target.value)}
                        placeholder="যেমন: ফেনী / সিলেট / কুড়িগ্রাম"
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-xs"
                    >
                      ভিডিও যুক্ত করুন
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
