import React from 'react';
import { 
  Heart, MapPin, Phone, Mail, 
  Share2, ShieldCheck, ArrowUp, Droplet, Users 
} from 'lucide-react';
import { FacebookIcon, YoutubeIcon } from './BrandIcons';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#172554] text-white pt-16 pb-12 border-t-4 border-[#1E3A8A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-blue-900/60">
          
          {/* Col 1: About Organization (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white text-[#1E3A8A] flex items-center justify-center font-black text-sm shadow-md">
                YBS
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                  ইয়ং বেঙ্গল সোসাইটি
                </h3>
                <p className="text-xs text-blue-200">
                  Young Bengal Society • প্রতিষ্ঠা ২০১৯
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
              ইয়ং বেঙ্গল সোসাইটি একটি সম্পূর্ণ অরাজনৈতিক ও অলাভজনক স্বেচ্ছাসেবী যুব সংগঠন। দেশের সুবিধাবঞ্চিত, দুর্যোগপীড়িত ও ছিন্নমূল মানুষের মুখে হাসি ফোটাতে একঝাঁক নিঃস্বার্থ তরুণের সার্বক্ষণিক মানবকল্যাণ প্রচেষ্টা।
            </p>

            <div className="pt-2 text-xs text-amber-300 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>নিবন্ধন নং: YBS-DH-২০১৯/৮৪ (সমাজসেবা অধিদপ্তর)</span>
            </div>
          </div>

          {/* Col 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-100">
              <li>
                <a href="#about" className="hover:text-white transition-colors">আমাদের লক্ষ্য ও দর্শন</a>
              </li>
              <li>
                <a href="#activities" className="hover:text-white transition-colors">মানবিক কার্যক্রম ও ছবি</a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-white transition-colors">ধারাবাহিক টাইমলাইন</a>
              </li>
              <li>
                <a href="#members" className="hover:text-white transition-colors flex items-center gap-1.5">
                  ১০০ সদস্য ডাটাবেজ
                  <span className="px-1.5 py-0.2 text-[10px] bg-blue-600 rounded font-bold">১০০</span>
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-white transition-colors">ইউটিউব ভিডিও ডকুমেন্টারি</a>
              </li>
              <li>
                <a href="#blood-drive" className="hover:text-white text-red-300 transition-colors flex items-center gap-1">
                  <Droplet className="w-3 h-3 text-red-400 fill-red-400" />
                  জরুরি রক্তদান সেল
                </a>
              </li>
              <li>
                <a href="#donate" className="hover:text-white transition-colors">অনুদান ও বিকাশ সহায়তা</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Initiatives (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              চলমান প্রধান সেবাসমূহ
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>পবিত্র মাহে রমজানে খাদ্য ও ইফতার উপহার বিতরণ</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>উত্তরাঞ্চলে শীতবস্ত্র ও উষ্ণতার পরশ অভিযান</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>বন্যা ও প্রাকৃতিক দুর্যোগে উদ্ধার অভিযান</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>সুবিধাবঞ্চিত শিশুদের বর্ণমালা পাঠশালা ও বৃত্তি</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span>দেশজুড়ে বৃক্ষরোপণ ও সবুজায়ন প্রজেক্ট</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
              কেন্দ্রীয় কার্যালয় ও যোগাযোগ
            </h4>
            
            <div className="space-y-2.5 text-xs text-blue-100">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>বাড়ী নং ১২, রোড নং ৭, ধানমন্ডি, ঢাকা - ১২০৫, বাংলাদেশ</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>হটলাইন: <strong>+880 1711-234567</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>info@youngbengalsociety.org</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] text-blue-200 block mb-2 font-medium">
                সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত থাকুন:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-800 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                  title="ফেসবুক পেইজ"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-red-700 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
                  title="ইউটিউব চ্যানেল"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="#donate"
                  className="px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-amber-900" />
                  সহায়তা করুন
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <p>
            © ২০১৯–২০২৬ <strong className="text-white">ইয়ং বেঙ্গল সোসাইটি (Young Bengal Society)</strong>. সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-4">
            <span className="text-blue-300">
              Vercel হোস্টিংয়ের জন্য প্রস্তুত
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center gap-1"
              title="উপরে যান"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
