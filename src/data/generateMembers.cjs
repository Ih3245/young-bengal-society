const fs = require('fs');
const path = require('path');

const firstNamesMale = [
  { bn: "তানভীর", en: "Tanvir" }, { bn: "রবিউল", en: "Robiul" }, { bn: "আরিফুল", en: "Ariful" },
  { bn: "নাজমুল", en: "Nazmul" }, { bn: "জহিরুল", en: "Zahirul" }, { bn: "সাইদুর", en: "Saidur" },
  { bn: "আব্দুল্লাহ", en: "Abdullah" }, { bn: "মেহেদী", en: "Mehedi" }, { bn: "কামরুল", en: "Kamrul" },
  { bn: "আসিফ", en: "Asif" }, { bn: "ইমরান", en: "Imran" }, { bn: "শাহাদাত", en: "Shahadat" },
  { bn: "শাকিল", en: "Shakil" }, { bn: "রেজওয়ান", en: "Rezwan" }, { bn: "মাহমুদ", en: "Mahmud" },
  { bn: "ফারহান", en: "Farhan" }, { bn: "তৌফিক", en: "Towfiq" }, { bn: "আফজাল", en: "Afzal" },
  { bn: "সোহেল", en: "Sohel" }, { bn: "রায়হান", en: "Rayhan" }, { bn: "মোস্তফা", en: "Mostafa" },
  { bn: "সালাউদ্দিন", en: "Salahuddin" }, { bn: "নাঈম", en: "Nayeem" }, { bn: "শরিফুল", en: "Shoriful" },
  { bn: "মিজানুর", en: "Mizanur" }, { bn: "শামসুল", en: "Shamsul" }, { bn: "রাকিব", en: "Rakib" },
  { bn: "হাসান", en: "Hasan" }, { bn: "জুবায়ের", en: "Zubair" }, { bn: "আতিকুর", en: "Atiqur" },
  { bn: "সাদ্দাম", en: "Saddam" }, { bn: "খোরশেদ", en: "Khorshed" }, { bn: "ফয়সাল", en: "Faisal" },
  { bn: "ওয়াহিদ", en: "Wahid" }, { bn: "তারেক", en: "Tarek" }, { bn: "শাহীন", en: "Shaheen" },
  { bn: "বোরহান", en: "Borhan" }, { bn: "মাসুম", en: "Masum" }, { bn: "সজিব", en: "Sajib" },
  { bn: "লিমন", en: "Limon" }, { bn: "আনোয়ার", en: "Anwar" }, { bn: "শফিক", en: "Shafiq" }
];

const firstNamesFemale = [
  { bn: "ফাহমিদা", en: "Fahmida" }, { bn: "মাহমুদা", en: "Mahmuda" }, { bn: "সুরাইয়া", en: "Suraiya" },
  { bn: "তাসনিম", en: "Tasnim" }, { bn: "নুসরাত", en: "Nusrat" }, { bn: "সায়মা", en: "Sayma" },
  { bn: "সাদিয়া", en: "Sadia" }, { bn: "ফারজানা", en: "Farzana" }, { bn: "উম্মে", en: "Umme" },
  { bn: "তানজিলা", en: "Tanjila" }, { bn: "জেরিন", en: "Zerin" }, { bn: "আফসানা", en: "Afsana" },
  { bn: "রুমানা", en: "Rumana" }, { bn: "সাবরিনা", en: "Sabrina" }, { bn: "নাজনীন", en: "Naznin" },
  { bn: "মারিয়া", en: "Maria" }, { bn: "শারমিন", en: "Sharmin" }, { bn: "রোকেয়া", en: "Rokeya" },
  { bn: "সুমাইয়া", en: "Sumaiya" }, { bn: "মৌসুমি", en: "Moushumi" }, { bn: "জান্নাতুল", en: "Jannatul" }
];

const lastNames = [
  { bn: "আহমেদ চৌধুরী", en: "Ahmed Chowdhury" }, { bn: "হাসান শুভ", en: "Hasan Shuvo" },
  { bn: "ইসলাম ভূঁইয়া", en: "Islam Bhuiyan" }, { bn: "আক্তার নিপা", en: "Akter Nipa" },
  { bn: "হক শাকিল", en: "Haque Shakil" }, { bn: "ফয়সাল", en: "Faisal" },
  { bn: "জান্নাত সুমি", en: "Jannat Sumi" }, { bn: "ইসলাম রাজু", en: "Islam Raju" },
  { bn: "রহমান সজিব", en: "Rahman Sajib" }, { bn: "আল মামুন", en: "Al Mamun" },
  { bn: "জাহান ইভা", en: "Jahan Eva" }, { bn: "হাসান রিয়াদ", en: "Hasan Riad" },
  { bn: "হাসান সানি", en: "Hasan Sunny" }, { bn: "ইকবাল শান্ত", en: "Iqbal Shanto" },
  { bn: "জাহান ইতি", en: "Jahan Iti" }, { bn: "হোসাইন সবুজ", en: "Hossain Sobuj" },
  { bn: "হোসেন আকাশ", en: "Hossain Akash" }, { bn: "আক্তার রিতু", en: "Akter Ritu" },
  { bn: "আহমেদ রোমান", en: "Ahmed Roman" }, { bn: "করিম বাবু", en: "Karim Babu" },
  { bn: "সুলতানা নদী", en: "Sultana Nodi" }, { bn: "খান পলাশ", en: "Khan Palash" },
  { bn: "উদ্দিন রাসেল", en: "Uddin Russel" }, { bn: "আলমগীর", en: "Alamgir" },
  { bn: "মিয়া সুমন", en: "Mia Sumon" }, { bn: "মাহমুদ দ্বীপ", en: "Mahmud Dwip" },
  { bn: "মীর জাহিদ", en: "Mir Zahid" }, { bn: "চৌধুরী রবিন", en: "Chowdhury Robin" },
  { bn: "শিকদার অপু", en: "Shikder Opu" }, { bn: "তালুকদার সজল", en: "Talukder Sojol" }
];

const coreLeadership = [
  {
    nameBn: "তানভীর আহমেদ চৌধুরী",
    nameEn: "Tanvir Ahmed Chowdhury",
    roleBn: "সভাপতি ও প্রতিষ্ঠাতা",
    roleEn: "President & Founder",
    wingBn: "কেন্দ্রীয় নির্বাহী পরিষদ",
    wingEn: "Central Executive Council",
    blood: "B+",
    district: "ঢাকা",
    upazila: "ধানমন্ডি",
    phone: "+880 1711-234567",
    email: "tanvir.president@youngbengalsociety.org",
    joinYear: 2019,
    status: "সক্রিয় সভাপতি",
    projects: 64,
    gender: "male",
    bio: "সোসাইটির প্রতিষ্ঠাতা। সুবিধাবঞ্চিত শিশুদের শিক্ষা ও জরুরি মানবিক ত্রাণের রূপকার।"
  },
  {
    nameBn: "রবিউল হাসান শুভ",
    nameEn: "Robiul Hasan Shuvo",
    roleBn: "সাধারণ সম্পাদক",
    roleEn: "General Secretary",
    wingBn: "কেন্দ্রীয় নির্বাহী পরিষদ",
    wingEn: "Central Executive Council",
    blood: "O+",
    district: "চট্টগ্রাম",
    upazila: "পাহাড়তলী",
    phone: "+880 1819-345678",
    email: "robiul.gs@youngbengalsociety.org",
    joinYear: 2019,
    status: "সক্রিয় সদস্য",
    projects: 58,
    gender: "male",
    bio: "মাঠপর্যায়ের ত্রাণ বিতরণ ও সমন্বয়ের প্রধান। ৫+ বছর ধরে নিরবচ্ছিন্নভাবে স্বেচ্ছাসেবা দিচ্ছেন।"
  },
  {
    nameBn: "ডাঃ আসিফ ইকবাল",
    nameEn: "Dr. Asif Iqbal",
    roleBn: "স্বাস্থ্য ও রক্তদান বিষয়ক সম্পাদক",
    roleEn: "Health & Blood Donation Secretary",
    wingBn: "স্বাস্থ্য ও রক্তদান উইং",
    wingEn: "Health & Blood Donation Wing",
    blood: "O-",
    district: "সিলেট",
    upazila: "সদর",
    phone: "+880 1712-456789",
    email: "dr.asif@youngbengalsociety.org",
    joinYear: 2020,
    status: "সক্রিয় সদস্য",
    projects: 47,
    gender: "male",
    bio: "ফ্রি মেডিকেল ক্যাম্প ও ২৪ ঘণ্টা জরুরি রক্তদান হেল্পলাইনের প্রধান সমন্বয়ক।"
  },
  {
    nameBn: "ফাহমিদা সুলতানা নিপা",
    nameEn: "Fahmida Sultana Nipa",
    roleBn: "সহ-সভাপতি (নারী ও শিশুকল্যাণ)",
    roleEn: "Vice President (Women & Child Welfare)",
    wingBn: "কেন্দ্রীয় নির্বাহী পরিষদ",
    wingEn: "Central Executive Council",
    blood: "A+",
    district: "রাজশাহী",
    upazila: "বোয়ালিয়া",
    phone: "+880 1913-567890",
    email: "fahmida.vp@youngbengalsociety.org",
    joinYear: 2019,
    status: "সক্রিয় সদস্য",
    projects: 52,
    gender: "female",
    bio: "নারী উন্নয়ন ও সুবিধাবঞ্চিত শিশুদের পুষ্টি প্রকল্পের প্রধান রূপকার।"
  },
  {
    nameBn: "মেহেদী হাসান রিয়াদ",
    nameEn: "Mehedi Hasan Riad",
    roleBn: "তথ্য ও প্রযুক্তি সম্পাদক",
    roleEn: "IT & Digital Media Secretary",
    wingBn: "আইটি ও প্রেস মিডিয়া উইং",
    wingEn: "IT & Media Wing",
    blood: "AB+",
    district: "ঢাকা",
    upazila: "মিরপুর",
    phone: "+880 1614-678901",
    email: "mehedi.it@youngbengalsociety.org",
    joinYear: 2020,
    status: "সক্রিয় সদস্য",
    projects: 41,
    gender: "male",
    bio: "সোসাইটির ডিজিটাল প্ল্যাটফর্ম, তথ্যভাণ্ডার ও ইউটিউব ডকুমেন্টারি বিভাগের সার্বিক তত্ত্বাবধায়ক।"
  },
  {
    nameBn: "কামরুল হাসান সানি",
    nameEn: "Kamrul Hasan Sunny",
    roleBn: "ত্রাণ ও দুর্যোগ ব্যবস্থাপনা সম্পাদক",
    roleEn: "Relief & Disaster Management Secretary",
    wingBn: "ত্রাণ ও পুনর্বাসন উইং",
    wingEn: "Relief & Rehabilitation Wing",
    blood: "A+",
    district: "বগুড়া",
    upazila: "সদর",
    phone: "+880 1715-789012",
    email: "kamrul.relief@youngbengalsociety.org",
    joinYear: 2020,
    status: "সক্রিয় সদস্য",
    projects: 50,
    gender: "male",
    bio: "সিলেট, কুড়িগ্রাম ও ফেনীর সাম্প্রতিক বন্যায় উদ্ধার অভিযান ও শুকনা খাবার বিতরণের সমন্বয়কারী।"
  },
  {
    nameBn: "নুসরাত জাহান ইতি",
    nameEn: "Nusrat Jahan Iti",
    roleBn: "শিক্ষা ও সামাজিক উন্নয়ন সম্পাদক",
    roleEn: "Education & Social Development Secretary",
    wingBn: "শিক্ষা ও প্রশিক্ষণ উইং",
    wingEn: "Education & Training Wing",
    blood: "B+",
    district: "ময়মনসিংহ",
    upazila: "সদর",
    phone: "+880 1816-890123",
    email: "nusrat.edu@youngbengalsociety.org",
    joinYear: 2021,
    status: "সক্রিয় সদস্য",
    projects: 38,
    gender: "female",
    bio: "বস্তির শিশুদের মাঝে বিনা মূল্যে বর্ণমালা পাঠশালা ও স্কুলব্যাগ বিতরণ প্রকল্পের পরিচালক।"
  },
  {
    nameBn: "সাইদুর রহমান সজিব",
    nameEn: "Saidur Rahman Sajib",
    roleBn: "অর্থ ও তহবিল সম্পাদক (কোষাধ্যক্ষ)",
    roleEn: "Treasurer & Finance Secretary",
    wingBn: "কেন্দ্রীয় নির্বাহী পরিষদ",
    wingEn: "Central Executive Council",
    blood: "O+",
    district: "কুমিল্লা",
    upazila: "আদর্শ সদর",
    phone: "+880 1717-901234",
    email: "saidur.finance@youngbengalsociety.org",
    joinYear: 2019,
    status: "সক্রিয় সদস্য",
    projects: 46,
    gender: "male",
    bio: "সোসাইটির ফান্ড ও স্বচ্ছ হিসাব নিকাশ অডিট ব্যবস্থাপনা করেন।"
  },
  {
    nameBn: "ইমরান হোসাইন সবুজ",
    nameEn: "Imran Hossain Sobuj",
    roleBn: "পরিবেশ ও বৃক্ষরোপণ সম্পাদক",
    roleEn: "Environment & Climate Action Secretary",
    wingBn: "পরিবেশ ও জলবায়ু উইং",
    wingEn: "Environment & Climate Wing",
    blood: "A-",
    district: "খুলনা",
    upazila: "সোনাডাঙ্গা",
    phone: "+880 1918-012345",
    email: "imran.green@youngbengalsociety.org",
    joinYear: 2021,
    status: "সক্রিয় সদস্য",
    projects: 35,
    gender: "male",
    bio: "১০,০০০+ বৃক্ষরোপণ অভিযান ও উপকূলীয় বাঁধ রক্ষা সবুজ প্রকল্পের ফিল্ড ইনচার্জ।"
  },
  {
    nameBn: "প্রফেসর ড. মুমিনুল ইসলাম",
    nameEn: "Prof. Dr. Mominul Islam",
    roleBn: "প্রধান উপদেষ্টা",
    roleEn: "Chief Advisor",
    wingBn: "উপদেষ্টা পরিষদ",
    wingEn: "Advisory Council",
    blood: "B+",
    district: "ঢাকা",
    upazila: "উত্তরা",
    phone: "+880 1710-112233",
    email: "advisory.mominul@youngbengalsociety.org",
    joinYear: 2019,
    status: "প্রধান উপদেষ্টা",
    projects: 55,
    gender: "male",
    bio: "ঢাকা বিশ্ববিদ্যালয়ের প্রবীণ শিক্ষাবিদ ও সমাজসেবক। সোসাইটির নীতি ও পরিকল্পনা উপদেষ্টা।"
  }
];

const generalRoles = [
  { roleBn: "যুগ্ম সাধারণ সম্পাদক", roleEn: "Joint Secretary", wingBn: "কেন্দ্রীয় নির্বাহী পরিষদ", wingEn: "Central Executive Council" },
  { roleBn: "সাংগঠনিক সম্পাদক", roleEn: "Organizing Secretary", wingBn: "কেন্দ্রীয় নির্বাহী পরিষদ", wingEn: "Central Executive Council" },
  { roleBn: "দপ্তর সম্পাদক", roleEn: "Office Secretary", wingBn: "দপ্তর ও প্রশাসনিক সেল", wingEn: "Office & Administration Cell" },
  { roleBn: "প্রচার ও মিডিয়া সমন্বয়ক", roleEn: "Publicity & Media Coordinator", wingBn: "আইটি ও প্রেস মিডিয়া উইং", wingEn: "IT & Media Wing" },
  { roleBn: "ত্রাণ ও খাদ্য বিতরণ সমন্বয়ক", roleEn: "Food & Relief Coordinator", wingBn: "ত্রাণ ও পুনর্বাসন উইং", wingEn: "Relief & Rehabilitation Wing" },
  { roleBn: "রক্তদান সেল কো-অর্ডিনেটর", roleEn: "Blood Cell Coordinator", wingBn: "স্বাস্থ্য ও রক্তদান উইং", wingEn: "Health & Blood Donation Wing" },
  { roleBn: "শিক্ষা ও পাঠশালা কো-অর্ডিনেটর", roleEn: "Education Coordinator", wingBn: "শিক্ষা ও প্রশিক্ষণ উইং", wingEn: "Education & Training Wing" },
  { roleBn: "জেলা প্রধান সমন্বয়ক", roleEn: "District Chief Coordinator", wingBn: "মাঠপর্যায় আঞ্চলিক সেল", wingEn: "Regional Field Cell" },
  { roleBn: "উপজেলা সমন্বয়ক", roleEn: "Upazila Coordinator", wingBn: "মাঠপর্যায় আঞ্চলিক সেল", wingEn: "Regional Field Cell" },
  { roleBn: "কার্যনির্বাহী সদস্য", roleEn: "Executive Member", wingBn: "কেন্দ্রীয় নির্বাহী পরিষদ", wingEn: "Central Executive Council" },
  { roleBn: "আজীবন সদস্য ও পৃষ্ঠপোষক", roleEn: "Life Member & Patron", wingBn: "উপদেষ্টা পরিষদ", wingEn: "Advisory Council" },
  { roleBn: "সিনিয়র ভলান্টিয়ার লিডার", roleEn: "Senior Volunteer Leader", wingBn: "তরুণ স্বেচ্ছাসেবক ব্রিগেড", wingEn: "Youth Volunteer Brigade" },
  { roleBn: "মাঠপর্যায় স্বেচ্ছাসেবক", roleEn: "Field Volunteer", wingBn: "তরুণ স্বেচ্ছাসেবক ব্রিগেড", wingEn: "Youth Volunteer Brigade" },
  { roleBn: "জরুরি রেসকিউ টিম সদস্য", roleEn: "Emergency Rescue Member", wingBn: "ত্রাণ ও পুনর্বাসন উইং", wingEn: "Relief & Rehabilitation Wing" },
  { roleBn: "লজিস্টিক ও পরিবহন সমন্বয়ক", roleEn: "Logistics Coordinator", wingBn: "দপ্তর ও প্রশাসনিক সেল", wingEn: "Office & Administration Cell" }
];

const districtsList = [
  { dist: "ঢাকা", upa: "মোহাম্মদপুর" }, { dist: "ঢাকা", upa: "মিরপুর" }, { dist: "ঢাকা", upa: "উত্তরা" }, { dist: "ঢাকা", upa: "ধানমন্ডি" },
  { dist: "চট্টগ্রাম", upa: "পাঁচলাইশ" }, { dist: "চট্টগ্রাম", upa: "কোতোয়ালী" }, { dist: "চট্টগ্রাম", upa: "হালিশহর" },
  { dist: "সিলেট", upa: "কোতোয়ালী" }, { dist: "সিলেট", upa: "দক্ষিণ সুরমা" }, { dist: "সুনামগঞ্জ", upa: "ছাতক" },
  { dist: "রাজশাহী", upa: "মতিহার" }, { dist: "রাজশাহী", upa: "রাজপাড়া" }, { dist: "বগুড়া", upa: "সদর" },
  { dist: "খুলনা", upa: "খালিশপুর" }, { dist: "খুলনা", upa: "দৌলতপুর" }, { dist: "কুষ্টিয়া", upa: "কুমারখালী" },
  { dist: "বরিশাল", upa: "সদর" }, { dist: "পটুয়াখালী", upa: "গলাচিপা" }, { dist: "ভোলা", upa: "চরফ্যাশন" },
  { dist: "রংপুর", upa: "সদর" }, { dist: "কুড়িগ্রাম", upa: "চিলমারী" }, { dist: "দিনাজপুর", upa: "বিরল" },
  { dist: "ময়মনসিংহ", upa: "সদর" }, { dist: "নেত্রকোণা", upa: "মোহনগঞ্জ" }, { dist: "জামালপুর", upa: "মেলান্দহ" },
  { dist: "কুমিল্লা", upa: "চৌদ্দগ্রাম" }, { dist: "নোয়াখালী", upa: "বেগমগঞ্জ" }, { dist: "ফেনী", upa: "ফুলগাজী" },
  { dist: "কক্সবাজার", upa: "উখিয়া" }, { dist: "টাঙ্গাইল", upa: "ঘাটাইল" }, { dist: "গাজীপুর", upa: "টঙ্গী" }
];

const bloodGroups = ["A+", "A+", "B+", "B+", "O+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
const statuses = ["সক্রিয় সদস্য", "সক্রিয় সদস্য", "সক্রিয় সদস্য", "স্বেচ্ছাসেবক", "স্বেচ্ছাসেবক", "আজীবন সদস্য", "উপদেষ্টা"];

const bios = [
  "রমজান খাদ্য বিতরণ ও ইফতার মাহফিল ব্যবস্থাপনায় নিয়মিত অংশগ্রহণ করেন।",
  "বন্যার্তদের উদ্ধার ও নিরাপদ আশ্রয়কেন্দ্রে সহায়তা কার্যক্রমে নিবেদিত প্রাণ।",
  "জরুরি প্রয়োজনে ৫+ বার নিজ উদ্যোগে রক্তদান করেছেন এবং অন্যদের উৎসাহিত করেন।",
  "শীতবস্ত্র সংগ্রহ ও প্রত্যন্ত চরাঞ্চলে বিতরণে দায়িত্ব পালন করেছেন।",
  "সুবিধাবঞ্চিত শিশুদের জন্য খাতা-কলম ও স্কুল ড্রেস সংগ্রহ অভিযানে যুক্ত।",
  "বৃক্ষরোপণ কর্মসূচিতে সক্রিয় ভূমিকা পালন ও চারা বিতরণ তদারকি করেন।",
  "সোসাইটির ফ্রি ফ্রাইডে মেডিকেল ক্যাম্প আয়োজনের অন্যতম চালিকাশক্তি।",
  "জরুরি ত্রাণ তহবিল সংগ্রহ ও হিসাব নিকাশে সহায়তা করেন।",
  "তরুণ প্রজন্মকে মাদক ও অপরাধমুক্ত রাখার সচেতনতামূলক প্রচারণায় যুক্ত।",
  "সোসাইটির ডিজিটাল কনটেন্ট, আলোকচিত্র ও সোশ্যাল মিডিয়ায় প্রচার সহায়তা দেন।"
];

const members = [...coreLeadership];

// Generate up to 100
let idCounter = 11;
const totalTarget = 100;

for (let i = 11; i <= totalTarget; i++) {
  const isFemale = (i % 4 === 0 || i % 7 === 0);
  const firstArr = isFemale ? firstNamesFemale : firstNamesMale;
  const firstName = firstArr[(i * 3 + 7) % firstArr.length];
  const lastName = lastNames[(i * 5 + 11) % lastNames.length];

  const fullNameBn = `${firstName.bn} ${lastName.bn}`;
  const fullNameEn = `${firstName.en} ${lastName.en}`;

  const roleObj = generalRoles[(i * 7) % generalRoles.length];
  const distObj = districtsList[(i * 11) % districtsList.length];
  const blood = bloodGroups[(i * 13) % bloodGroups.length];
  const status = statuses[(i * 17) % statuses.length];
  const joinYear = 2019 + (i % 8); // 2019 to 2026
  const projects = 5 + (i * 3) % 45;
  const bio = bios[i % bios.length];

  const phonePrefix = ["17", "18", "19", "16", "13"][i % 5];
  const phoneRand = String(100000 + ((i * 47913) % 899999));
  const phone = `+880 ${phonePrefix}${phoneRand.slice(0, 2)}-${phoneRand.slice(2)}`;

  const cleanEn = fullNameEn.toLowerCase().replace(/[^a-z]/g, '').slice(0, 10);
  const email = `${cleanEn}${i}@youngbengalsociety.org`;

  members.push({
    id: `YBS-${joinYear}-${String(i).padStart(3, '0')}`,
    nameBn: fullNameBn,
    nameEn: fullNameEn,
    roleBn: roleObj.roleBn,
    roleEn: roleObj.roleEn,
    wingBn: roleObj.wingBn,
    wingEn: roleObj.wingEn,
    blood: blood,
    district: distObj.dist,
    upazila: distObj.upa,
    phone: phone,
    email: email,
    joinYear: joinYear,
    status: status,
    projects: projects,
    gender: isFemale ? "female" : "male",
    bio: bio
  });
}

// Add ID to coreLeadership as well
for (let j = 0; j < 10; j++) {
  members[j].id = `YBS-${members[j].joinYear}-${String(j + 1).padStart(3, '0')}`;
}

const fileContent = `// ইয়ং বেঙ্গল সোসাইটি (Young Bengal Society)
// সম্পূর্ণ ১০০ জন নিবন্ধিত সদস্য ও উপদেষ্টার পূর্ণাঙ্গ ডেটাসেট
// প্রতিটি সদস্যের নাম (বাংলা/ইংরেজি), পদবি, উইং, রক্তের গ্রুপ, জেলা, ফোন, ইমেইল, যোগদানের বছর এবং অবদান সংরক্ষিত।

export const membersData = ${JSON.stringify(members, null, 2)};

export const bloodGroupsList = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const wingsList = [
  "All",
  "কেন্দ্রীয় নির্বাহী পরিষদ",
  "ত্রাণ ও পুনর্বাসন উইং",
  "স্বাস্থ্য ও রক্তদান উইং",
  "আইটি ও প্রেস মিডিয়া উইং",
  "শিক্ষা ও প্রশিক্ষণ উইং",
  "পরিবেশ ও জলবায়ু উইং",
  "তরুণ স্বেচ্ছাসেবক ব্রিগেড",
  "উপদেষ্টা পরিষদ",
  "মাঠপর্যায় আঞ্চলিক সেল"
];
`;

fs.writeFileSync(path.join(__dirname, 'membersData.js'), fileContent, 'utf8');
console.log(`Successfully generated ${members.length} member profiles in membersData.js`);
