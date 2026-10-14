import React from 'react';
import { 
  Heart, Shield, BookOpen, Droplet, Sun, TreePine, 
  Sparkles, CheckCircle2, Award, Users2
} from 'lucide-react';

export function AboutSection() {
  const pillars = [
    {
      icon: Sun,
      title: "রমজান ও খাদ্য সহায়তা",
      desc: "পবিত্র মাহে রমজানে দরিদ্র রোযাদার পরিবারের জন্য এক মাসের প্রয়োজনীয় খাদ্যসামগ্রী ও উন্মুক্ত ইফতার আয়োজন।"
    },
    {
      icon: Heart,
      title: "শীতবস্ত্র ও কম্বল বিতরণ",
      desc: "উত্তরাঞ্চলের তীব্র শীতে সীমান্তবর্তী এবং চরাঞ্চলের অবহেলিত শিশু ও প্রবীণদের মাঝে উষ্ণ পোশাক ও কম্বল প্রদান।"
    },
    {
      icon: Droplet,
      title: "২৪/৭ জরুরি রক্তদান",
      desc: "মুহূর্তের নোটিশে থ্যালাসেমিয়া ও অপারেশনের রোগীদের জন্য স্বেচ্ছায় রক্তদাতা খুঁজে দেওয়ার নিরবচ্ছিন্ন নেটওয়ার্ক।"
    },
    {
      icon: BookOpen,
      title: "সুবিধাবঞ্চিতদের শিক্ষা",
      desc: "পথশিশু ও হতদরিদ্র শিক্ষার্থীদের স্কুলব্যাগ, খাতা-কলম ও নিয়মিত পড়াশোনা চালু রাখতে শিক্ষাবৃত্তি প্রদান।"
    },
    {
      icon: Shield,
      title: "বন্যা ও দুর্যোগ উদ্ধার",
      desc: "সিলেট, ফেনী ও উত্তরাঞ্চলের দুর্যোগকবলিত পানিবন্দি মানুষকে স্পিডবোটে উদ্ধার এবং শুকনা খাদ্য সরবরাহ।"
    },
    {
      icon: TreePine,
      title: "সবুজ বাংলাদেশ অভিযান",
      desc: "পরিবেশের ভারসাম্য রক্ষায় উপকূল ও গ্রামাঞ্চলে ফলজ, বনজ ও ঔষধি গাছের চারা রোপণ ও চারা বিতরণ।"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E3A8A] text-xs font-bold uppercase tracking-wider mb-3">
            আমাদের লক্ষ্য ও পরিচিতি
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E3A8A] tracking-tight mb-4">
            মানুষের হাসিমুখই আমাদের একমাত্র অর্জন
          </h2>
          <p className="text-base text-[#475569] leading-relaxed">
            ২০১৯ সালের এক শীতের সকালে ঢাকা বিশ্ববিদ্যালয়ের কয়েকজন তরুণ শিক্ষার্থীর হাত ধরে যাত্রা শুরু করে ইয়ং বেঙ্গল সোসাইটি। আজ শত শত নিবেদিতপ্রাণ তরুণ-তরুণীর একনিষ্ঠ পরিশ্রমে এটি সারাদেশে বিস্তৃত এক নির্ভরযোগ্য সামাজিক প্ল্যাটফর্মে পরিণত হয়েছে।
          </p>
        </div>

        {/* Narrative & Inception Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="card-warm rounded-2xl p-6 sm:p-8 bg-white border border-[#E8DFD1]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 flex items-center gap-2">
                <Award className="w-6 h-6 text-[#D97706]" />
                কেন আমরা আলাদা ও সম্পূর্ণ ভিন্ন?
              </h3>
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed mb-4">
                আমরা বিশ্বাস করি, সমাজসেবা কেবল নামমাত্র ফটোসেশন নয়। একটি অসহায় পরিবারের এক মাসের মুখে অন্ন তুলে দেওয়া, অপারেশনের টেবিলে এক ব্যাগ রক্ত দিয়ে প্রাণ বাঁচানো কিংবা একজন শিশুর হাতে রঙিন নতুন বই তুলে দেওয়ার আনন্দই আমাদের জ্বালানি।
              </p>
              
              <ul className="space-y-3 pt-2 text-sm text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>কোনো প্রশাসনিক অপচয় নেই:</strong> আপনাদের দেওয়া প্রতিটি টাকা সরাসরি সুবিধাভোগীর ত্রাণ ও উপকরণের ক্রয়ে ব্যয় হয়।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>প্রতিটি কাজের প্রমাণ্য ভিডিও ও ছবি:</strong> যে কেউ যেকোনো সময় ওয়েবসাইটে আমাদের মাঠপর্যায়ের কাজের ইউটিউব ভিডিও ও ছবি সরাসরি দেখতে পারবেন।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>১০০ জন সক্রিয় সদস্যের উন্মুক্ত ডাটা:</strong> সদস্যদের নাম, ফোন, রক্তের গ্রুপ ও পদবি সবার জন্য উন্মুক্ত যাতে স্থানীয় প্রয়োজনে সহজে যোগাযোগ করা যায়।</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Trust Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#1E3A8A] text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <span className="text-amber-300 text-xs font-bold uppercase tracking-wider block mb-2">
                সোসাইটির মূল প্রত্যয়
              </span>
              <blockquote className="text-lg sm:text-xl font-medium italic mb-6 leading-snug">
                "আমরা সমাজ পরিবর্তন করতে পারবো কি না জানি না, কিন্তু অন্তত একটি নিরন্ন মানুষের পেটে ভাত দিতে পারলে সেই মানুষটির পৃথিবী তো কিছুটা হলেও বদলে দেওয়া সম্ভব।"
              </blockquote>
              
              <div className="border-t border-blue-400/30 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">তানভীর আহমেদ চৌধুরী</h4>
                  <p className="text-xs text-blue-200">সভাপতি ও প্রতিষ্ঠাতা, ইয়ং বেঙ্গল সোসাইটি</p>
                </div>
                <div className="text-right text-xs text-blue-200">
                  <span className="font-bold text-amber-300">২০১৯ – বর্তমান</span><br />
                  ৫+ বছরের সেবা
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Activity Pillars */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1E3A8A]">
              সোসাইটির প্রধান কর্মক্ষেত্রসমূহ
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B]">
              বছরজুড়ে আমরা যে সকল সামাজিক ও মানবিক উদ্যোগ বাস্তবায়ন করে থাকি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((item, idx) => (
              <div 
                key={idx}
                className="card-warm card-warm-hover rounded-xl p-6 bg-white border border-[#E8DFD1]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#1E3A8A] mb-4">
                  <item.icon className="w-6 h-6 text-[#1E3A8A]" />
                </div>
                <h4 className="text-lg font-bold text-[#0F172A] mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
