import React, { useState } from 'react';
import { 
  HeartHandshake, Copy, Check, ShieldCheck, Heart, 
  HelpCircle, CreditCard, Building2, Smartphone, AlertCircle
} from 'lucide-react';

export function DonationSection() {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const paymentMethods = [
    {
      id: "bkash",
      title: "বিকাশ (bKash) পার্সোনাল / মার্চেন্ট",
      type: "মোবাইল ব্যাংকিং",
      number: "01711234567",
      counter: "রেফারেন্স: YBS",
      bgColor: "bg-pink-50 border-pink-200 text-pink-900",
      accent: "text-pink-600"
    },
    {
      id: "nagad",
      title: "নগদ (Nagad) পার্সোনাল",
      type: "মোবাইল ব্যাংকিং",
      number: "01819345678",
      counter: "রেফারেন্স: Ramadan26",
      bgColor: "bg-orange-50 border-orange-200 text-orange-900",
      accent: "text-orange-600"
    },
    {
      id: "rocket",
      title: "রকেট (Rocket) পার্সোনাল",
      type: "মোবাইল ব্যাংকিং",
      number: "01711234567-9",
      counter: "রেফারেন্স: Donate",
      bgColor: "bg-purple-50 border-purple-200 text-purple-900",
      accent: "text-purple-600"
    }
  ];

  const packages = [
    {
      amount: "১,৫০০ ৳",
      title: "রমজান খাদ্য প্যাকেজ",
      desc: "১টি দরিদ্র পরিবারের পুরো রমজান মাসের চাল, ডাল, তেল, চিনি, মুড়ি ও ছোলা সামগ্রী।"
    },
    {
      amount: "৩৫০ ৳",
      title: "১টি উন্নত কম্বল উপহার",
      desc: "উত্তরের তীব্র শীতে কাঁপতে থাকা একজন অসহায় বৃদ্ধ বা পথশিশুর জন্য শীতের উষ্ণতা।"
    },
    {
      amount: "১,২০০ ৳",
      title: "১ শিশুর বার্ষিক শিক্ষা ব্যাগ",
      desc: "সুবিধাবঞ্চিত শিক্ষার্থীর জন্য স্কুলব্যাগ, খাতা, কলম, জ্যামিতি বক্স ও পোশাক সহায়তা।"
    },
    {
      amount: "যেকোনো পরিমাণ",
      title: "সাধারণ মানবিক ত্রাণ তহবিল",
      desc: "বন্যা, জরুরি অপারেশন ও হঠাৎ চিকিৎসা সহায়তায় তাৎক্ষণিক ফান্ড হিসেবে ব্যবহৃত হয়।"
    }
  ];

  return (
    <section id="donate" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] text-xs font-bold uppercase tracking-wider mb-2">
            স্বচ্ছ তহবিল ও সহযোগিতা
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] tracking-tight mb-4">
            আপনার সামান্য সহযোগিতায় বাঁচবে একটি অসহায় প্রাণ
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            ইয়ং বেঙ্গল সোসাইটিতে প্রতিটি টাকার সম্পূর্ণ দায়বদ্ধতা ও জবাবদিহিতা নিশ্চিত করা হয়। আপনার কষ্টার্জিত অনুদানের শতভাগ সরাসরি মাঠপর্যায়ে প্রকৃত হকদারের ঘরে পৌঁছে দেওয়া হয়।
          </p>
        </div>

        {/* Impact Packages Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="card-warm rounded-2xl p-5 bg-white border border-[#E8DFD1] hover:border-[#1E3A8A]/50 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black text-[#1E3A8A] block mb-1">
                  {pkg.amount}
                </span>
                <h4 className="text-base font-bold text-[#0F172A] mb-2">
                  {pkg.title}
                </h4>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {pkg.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E8DFD1] text-[11px] text-[#B45309] font-semibold">
                পবিত্র রমজান ও সামাজিক কল্যাণ
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Mobile Banking Options */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#1E3A8A]" />
              মোবাইল ব্যাংকিং নম্বরসমূহ (সহজ কপি করুন)
            </h3>

            <div className="space-y-3">
              {paymentMethods.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border ${m.bgColor} flex items-center justify-between gap-3 shadow-xs`}
                >
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider opacity-75">
                      {m.type}
                    </div>
                    <div className="text-base sm:text-lg font-extrabold text-[#0F172A]">
                      {m.title}
                    </div>
                    <div className="text-sm font-mono font-bold tracking-wider mt-0.5">
                      নম্বর: {m.number}
                    </div>
                    <div className="text-xs opacity-70 mt-0.5">
                      {m.counter}
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(m.number, m.id)}
                    className="px-3.5 py-2 text-xs font-bold bg-white text-[#0F172A] hover:bg-slate-100 rounded-xl shadow-xs border border-black/10 flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>নম্বর কপি</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#64748B] italic">
              * টাকা পাঠানোর পর আপনার নাম ও অনুদানের উদ্দেশ্য জানিয়ে <strong>01711234567</strong> নম্বরে একটি কনফার্মেশন SMS দেওয়ার জন্য অনুরোধ করা হচ্ছে।
            </p>
          </div>

          {/* Bank Account Details */}
          <div className="lg:col-span-5">
            <div className="card-warm rounded-2xl p-6 bg-white border border-[#E8DFD1] shadow-xs">
              <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-[#1E3A8A]" />
                অফিসিয়াল ব্যাংক একাউন্ট বিবরণ
              </h3>

              <div className="space-y-2.5 text-xs text-[#334155] bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD1]">
                <div className="flex justify-between py-1 border-b border-[#E8DFD1]">
                  <span className="text-[#64748B]">হিসাবের নাম:</span>
                  <span className="font-bold text-[#0F172A]">YOUNG BENGAL SOCIETY</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8DFD1]">
                  <span className="text-[#64748B]">ব্যাংকের নাম:</span>
                  <span className="font-bold text-[#0F172A]">ইসলামী ব্যাংক বাংলাদেশ পিএলসি</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8DFD1]">
                  <span className="text-[#64748B]">একাউন্ট নম্বর:</span>
                  <span className="font-mono font-bold text-[#1E3A8A] text-sm">2050 3480 2001 9840</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E8DFD1]">
                  <span className="text-[#64748B]">শাখা:</span>
                  <span className="font-medium text-[#0F172A]">ধানমন্ডি শাখা, ঢাকা</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#64748B]">রাউটিং নম্বর:</span>
                  <span className="font-mono font-medium text-[#0F172A]">125261159</span>
                </div>
              </div>

              {/* Fund Safety Assurance */}
              <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  ইয়ং বেঙ্গল সোসাইটির কেন্দ্রীয় অডিট কমিটি দ্বারা প্রতি বছর হিসাব নিরীক্ষা করা হয় এবং সমস্ত হিসাব সদস্যদের উপস্থিতিতে সাধারণ সভায় উপস্থাপন করা হয়।
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
