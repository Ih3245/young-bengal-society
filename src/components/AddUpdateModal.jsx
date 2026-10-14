import React, { useState } from 'react';
import { 
  X, CalendarPlus, Image, MapPin, 
  Users, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';
import { activityCategories, extractYouTubeId } from '../data/activitiesData';

export function AddUpdateModal({ isOpen, onClose, onAddActivity }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("রমজান ও খাদ্য সহায়তা");
  const [date, setDate] = useState("১৫ মার্চ ২০২৬");
  const [year, setYear] = useState(2026);
  const [status, setStatus] = useState("আসন্ন");
  const [location, setLocation] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("");
  const [leadMember, setLeadMember] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim() || !location.trim() || !description.trim()) {
      setErrorMsg("অনুগ্রহ করে শিরোনাম, এলাকা এবং বিবরণ পূরণ করুন।");
      return;
    }

    const ytId = extractYouTubeId(youtubeUrl);
    const newAct = {
      id: `act-custom-${Date.now()}`,
      title: title.trim(),
      category: category,
      date: date.trim() || new Date().toLocaleDateString('bn-BD'),
      dateRaw: new Date().toISOString(),
      year: Number(year) || 2026,
      status: status,
      location: location.trim(),
      beneficiaries: beneficiaries.trim() || "সুবিধাবঞ্চিত মানুষ",
      leadMember: leadMember.trim() || "স্বেচ্ছাসেবক দল",
      description: description.trim(),
      photoUrl: photoUrl.trim() || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"),
      youtubeUrl: youtubeUrl.trim(),
      youtubeId: ytId,
      isUpcoming: status === "আসন্ন"
    };

    onAddActivity(newAct);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8DFD1] relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD1] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#EFF6FF] text-[#1E3A8A]">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                নতুন মানবিক কাজ বা আপডেট যোগ করুন
              </h3>
              <p className="text-xs text-[#64748B]">
                প্রতিদিনের কাজ ও ভবিষ্যৎ পরিকল্পনা এখানে তাৎক্ষণিক আপডেট করা যাবে
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg text-lg font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 text-center text-emerald-800 space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h4 className="text-xl font-bold">কার্যক্রমটি সফলভাবে যোগ করা হয়েছে!</h4>
            <p className="text-sm text-[#475569]">
              ওয়েবসাইটের কার্যক্রম অ্যালবাম ও লাইভ টাইমলাইনে এটি যুক্ত হয়েছে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                কার্যক্রমের শিরোনাম *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: কুড়িগ্রাম চরাঞ্চলে মাহে রমজানের খাদ্য ও ইফতার উপহার বিতরণ ২০২৬"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
            </div>

            {/* Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                >
                  {activityCategories.filter(c => c !== "সকল কার্যক্রম").map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  কাজের অবস্থা (Status)
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                >
                  <option value="আসন্ন">আসন্ন পরিকল্পনা (Upcoming)</option>
                  <option value="চলমান">বর্তমানে চলমান (Ongoing)</option>
                  <option value="সম্পন্ন">সফলভাবে সম্পন্ন (Completed)</option>
                </select>
              </div>
            </div>

            {/* Date & Year & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  তারিখ
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="যেমন: ১৫ মার্চ ২০২৬"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  বছর
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2026"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  এলাকা / জেলা *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="যেমন: কুড়িগ্রাম, চিলমারী"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                  required
                />
              </div>
            </div>

            {/* Beneficiaries & Team Lead */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  সুবিধাভোগী মানুষের সংখ্যা
                </label>
                <input
                  type="text"
                  value={beneficiaries}
                  onChange={(e) => setBeneficiaries(e.target.value)}
                  placeholder="যেমন: ৫০০ পরিবার / ১,০০০ মানুষ"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  তত্ত্বাবধানে / দায়িত্বপ্রাপ্ত সদস্য
                </label>
                <input
                  type="text"
                  value={leadMember}
                  onChange={(e) => setLeadMember(e.target.value)}
                  placeholder="যেমন: কামরুল হাসান সানি (ত্রাণ সম্পাদক)"
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>
            </div>

            {/* Media URLs: YouTube & Photo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1 flex items-center gap-1">
                  <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                  ইউটিউব ভিডিও লিংক (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1 flex items-center gap-1">
                  <Image className="w-3.5 h-3.5 text-[#1E3A8A]" />
                  ছবির লিংক / Photo URL (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                কাজের বিস্তারিত বিবরণ ও ডকুমেন্টেশন *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="এই কার্যক্রমে কী কী বিতরণ করা হয়েছে বা হবে, কীভাবে বাস্তবায়ন করা হয়েছে তার বিস্তারিত লিখুন..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
            </div>

            {/* Modal Buttons */}
            <div className="pt-4 border-t border-[#E8DFD1] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl shadow-xs"
              >
                সংরক্ষণ ও পাবলিশ করুন
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
