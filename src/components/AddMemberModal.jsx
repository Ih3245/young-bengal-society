import React, { useState } from 'react';
import { 
  X, UserPlus, Droplet, Phone, Mail, 
  MapPin, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { bloodGroupsList, wingsList } from '../data/membersData';

export function AddMemberModal({ isOpen, onClose, onAddMember }) {
  const [nameBn, setNameBn] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [roleBn, setRoleBn] = useState("সক্রিয় সদস্য");
  const [wingBn, setWingBn] = useState("তরুণ স্বেচ্ছাসেবক ব্রিগেড");
  const [blood, setBlood] = useState("B+");
  const [district, setDistrict] = useState("ঢাকা");
  const [upazila, setUpazila] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [joinYear, setJoinYear] = useState(2026);
  const [status, setStatus] = useState("সক্রিয় সদস্য");
  const [bio, setBio] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!nameBn.trim() || !phone.trim() || !district.trim()) {
      setErrorMsg("অনুগ্রহ করে সদস্যের নাম, ফোন নম্বর ও জেলা প্রদান করুন।");
      return;
    }

    const newMember = {
      id: `YBS-${joinYear}-${String(Math.floor(100 + Math.random() * 900))}`,
      nameBn: nameBn.trim(),
      nameEn: nameEn.trim() || nameBn.trim(),
      roleBn: roleBn.trim(),
      roleEn: "Executive Volunteer",
      wingBn: wingBn,
      wingEn: "Social Welfare Wing",
      blood: blood,
      district: district.trim(),
      upazila: upazila.trim(),
      phone: phone.trim(),
      email: email.trim() || `member${Date.now().toString().slice(-4)}@youngbengalsociety.org`,
      joinYear: Number(joinYear) || 2026,
      status: status,
      projects: 1,
      gender: "male",
      bio: bio.trim() || "ইয়ং বেঙ্গল সোসাইটির সক্রিয় স্বেচ্ছাসেবক হিসেবে মানবসেবায় যুক্ত হয়েছেন।"
    };

    onAddMember(newMember);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[#E8DFD1] relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD1] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#EFF6FF] text-[#1E3A8A]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                নতুন সদস্য নিবন্ধন / যুক্ত করুন
              </h3>
              <p className="text-xs text-[#64748B]">
                ইয়ং বেঙ্গল সোসাইটির ডিজিটাল ডাটাবেজে নতুন সদস্য অন্তর্ভুক্তি
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
            <h4 className="text-xl font-bold">সদস্য সফলভাবে নিবন্ধিত হয়েছে!</h4>
            <p className="text-sm text-[#475569]">
              সদস্য তালিকা ও ডিজিটাল আইডি কার্ডে নামটি যুক্ত হয়েছে।
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

            {/* Name Bn & En */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  সদস্যের নাম (বাংলায়) *
                </label>
                <input
                  type="text"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="যেমন: সাকিব আল হাসান"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  নাম (ইংরেজিতে)
                </label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g., Sakib Al Hasan"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
              </div>
            </div>

            {/* Role & Wing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  পদবি
                </label>
                <input
                  type="text"
                  value={roleBn}
                  onChange={(e) => setRoleBn(e.target.value)}
                  placeholder="যেমন: মাঠপর্যায় সমন্বয়ক / সক্রিয় সদস্য"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  উইং / সেল
                </label>
                <select
                  value={wingBn}
                  onChange={(e) => setWingBn(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                >
                  {wingsList.filter(w => w !== "All").map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blood & Join Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1 flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-red-600" />
                  রক্তের গ্রুপ *
                </label>
                <select
                  value={blood}
                  onChange={(e) => setBlood(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                >
                  {bloodGroupsList.filter(b => b !== "All").map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  যোগদানের বছর
                </label>
                <input
                  type="number"
                  value={joinYear}
                  onChange={(e) => setJoinYear(e.target.value)}
                  placeholder="2026"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>
            </div>

            {/* District & Upazila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  জেলা *
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="যেমন: ঢাকা / চট্টগ্রাম / সিলেট"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  উপজেলা / এলাকা
                </label>
                <input
                  type="text"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  placeholder="যেমন: ধানমন্ডি / মিরপুর / সদর"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  মোবাইল নম্বর *
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1711-..."
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  ইমেইল এড্রেস
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="member@gmail.com"
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
                />
              </div>
            </div>

            {/* Short Bio */}
            <div>
              <label className="block text-xs font-bold text-[#334155] mb-1">
                সংক্ষিপ্ত পরিচিতি বা সামাজিক অবদান
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                placeholder="যেমন: জরুরি রক্তদান ও রমজান ত্রাণ বিতরণে অংশ নেন..."
                className="w-full px-3.5 py-2 text-sm bg-[#FAF7F2] border border-[#CBD5E1] rounded-xl text-[#0F172A]"
              />
            </div>

            {/* Submit */}
            <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#1E3A8A] hover:bg-[#1E40AF] rounded-xl shadow-xs"
              >
                সদস্য নিবন্ধন সম্পন্ন করুন
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
