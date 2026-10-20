// Initial Clinical Dataset grounded in published 2026 research
// Focus: Bangladesh (LMICs) Community Pharmacy Integration & Southern European Primary Care Models

export const WHO_AWARE_DATABASE = {
  // ACCESS CLASS: First-line, narrow spectrum, lowest resistance potential
  "Amoxicillin 500mg": {
    class: "ACCESS",
    generic: "Amoxicillin",
    form: "Capsule",
    standardDose: "500mg TID (every 8h) for 5-7 days",
    indication: "Uncomplicated bacterial URTI, dental abscess, mild CAP",
    description: "First-choice narrow spectrum beta-lactam with low resistance selection pressure.",
    renalAdjustment: "If eGFR < 30 mL/min, reduce frequency to BID (every 12h)."
  },
  "Cephalexin 500mg": {
    class: "ACCESS",
    generic: "Cephalexin",
    form: "Capsule",
    standardDose: "500mg QID for 7 days",
    indication: "Skin and soft tissue infections, streptococcal pharyngitis",
    description: "First-generation oral cephalosporin.",
    renalAdjustment: "Reduce dose if eGFR < 50 mL/min."
  },
  "Doxycycline 100mg": {
    class: "ACCESS",
    generic: "Doxycycline",
    form: "Capsule",
    standardDose: "100mg BID on day 1, then 100mg daily",
    indication: "Atypical pneumonia, scrub typhus, chlamydial infection",
    description: "Tetracycline class; no renal dose adjustment required.",
    renalAdjustment: "Safe in renal impairment without dose adjustment."
  },
  "Metronidazole 400mg": {
    class: "ACCESS",
    generic: "Metronidazole",
    form: "Tablet",
    standardDose: "400mg TID for 5-7 days",
    indication: "Anaerobic dental/intra-abdominal infections, amoebiasis",
    description: "High oral bioavailability with low cost.",
    renalAdjustment: "Reduce dose by 50% if severe renal impairment (eGFR < 10)."
  },
  "Nitrofurantoin 100mg SR": {
    class: "ACCESS",
    generic: "Nitrofurantoin SR",
    form: "Sustained Release Capsule",
    standardDose: "100mg BID for 5 days",
    indication: "Acute uncomplicated cystitis (UTI)",
    description: "High urinary concentration, minimal systemic absorption.",
    renalAdjustment: "Contraindicated if eGFR < 30 mL/min (lack of efficacy & neurotoxicity risk)."
  },

  // WATCH CLASS: Higher resistance potential, critically important for human medicine
  "Azithromycin 500mg": {
    class: "WATCH",
    generic: "Azithromycin",
    form: "Tablet",
    standardDose: "500mg OD for 3-5 days",
    indication: "Atypical respiratory infections, enteric fever, chlamydia",
    description: "Frequently over-prescribed for self-limiting viral coughs; subject to stewardship lock.",
    renalAdjustment: "Caution in severe renal impairment (eGFR < 10 mL/min)."
  },
  "Cefixime 200mg": {
    class: "WATCH",
    generic: "Cefixime",
    form: "Tablet / Capsule",
    standardDose: "200mg BID or 400mg OD for 7 days",
    indication: "Complicated UTI, typhoid fever, gonococcal infections",
    description: "3rd generation oral cephalosporin; high driver of ESBL resistance in South Asia.",
    renalAdjustment: "If eGFR < 20 mL/min, administer 200mg once daily."
  },
  "Ciprofloxacin 500mg": {
    class: "WATCH",
    generic: "Ciprofloxacin",
    form: "Film-Coated Tablet",
    standardDose: "500mg BID for 7-14 days",
    indication: "Pyelonephritis, complicated intra-abdominal infections, typhoid",
    description: "Fluoroquinolone; high resistance rate (>70% in Bangladesh clinical isolates).",
    renalAdjustment: "If eGFR 30-50 mL/min: 250-500mg q12h; If eGFR < 30: 250-500mg q18-24h."
  },
  "Levofloxacin 500mg": {
    class: "WATCH",
    generic: "Levofloxacin",
    form: "Tablet",
    standardDose: "500mg OD for 7-10 days",
    indication: "Community-acquired pneumonia, acute pyelonephritis",
    description: "Broad-spectrum fluoroquinolone.",
    renalAdjustment: "If eGFR 20-49 mL/min: initial 500mg then 250mg q24h."
  },

  // RESERVE CLASS: Last resort, restricted to life-threatening multidrug-resistant pathogens
  "Meropenem 1g IV": {
    class: "RESERVE",
    generic: "Meropenem",
    form: "Vial for Injection",
    standardDose: "1g IV TID (every 8h)",
    indication: "Severe nosocomial sepsis, febrile neutropenia, MDR Klebsiella",
    description: "Hospital-only ultra-broad spectrum carbapenem; strictly locked from community retail.",
    renalAdjustment: "eGFR 26-50: 1g q12h; eGFR 10-25: 500mg q12h; eGFR < 10: 500mg q24h."
  },
  "Linezolid 600mg": {
    class: "RESERVE",
    generic: "Linezolid",
    form: "Tablet / Infusion",
    standardDose: "600mg BID for 10-14 days",
    indication: "Documented MRSA pneumonia or VRE bacteremia",
    description: "Synthetic oxazolidinone; preserved for confirmed multi-resistant Gram-positive strains.",
    renalAdjustment: "No dose adjustment required, but monitor for myelosuppression."
  },
  "Colistin 1-2M IU": {
    class: "RESERVE",
    generic: "Colistimethate Sodium",
    form: "Vial for Injection",
    standardDose: "9 Million IU loading, then maintenance",
    indication: "Pan-drug resistant Acinetobacter / Pseudomonas",
    description: "Last-ditch antibiotic with high nephrotoxicity; absolutely prohibited for retail dispensing.",
    renalAdjustment: "Strict therapeutic drug monitoring and renal titration required."
  }
};

export const INITIAL_PATIENTS = [
  {
    id: "PT-2026-901",
    name: "Nasrin Jahan",
    nameBn: "নাসরীন জাহান",
    age: 34,
    gender: "Female",
    phone: "+880 1712-489021",
    location: "Daulatpur, Khulna",
    vitals: {
      bp: "118/76 mmHg",
      pulse: 82,
      temp: "101.4 °F",
      eGFR: 98, // Normal renal function
      weightKg: 58,
      respRate: 18
    },
    allergies: ["Penicillin (Severe Angioedema & Rash)"],
    chronicConditions: ["None reported"],
    activeMeds: ["Cetirizine 10mg PRN"],
    caseSummary: "Presents with acute high-grade fever (101.4°F) for 4 days, productive cough with purulent yellow sputum, and bilateral throat pain. Walked into community pharmacy requesting strong antibiotic."
  },
  {
    id: "PT-2026-902",
    name: "Abdul Malek",
    nameBn: "আব্দুল মালেক",
    age: 62,
    gender: "Male",
    phone: "+880 1819-330192",
    location: "Shibbari Mor, Khulna",
    vitals: {
      bp: "148/92 mmHg",
      pulse: 76,
      temp: "99.2 °F",
      eGFR: 38, // CKD Stage 3b - Significant Renal Impairment
      weightKg: 71,
      respRate: 16
    },
    allergies: ["Sulfonamides / Cotrimoxazole (Urticaria)"],
    chronicConditions: ["Type-2 Diabetes Mellitus (HbA1c 7.6%)", "Hypertension", "Chronic Kidney Disease (Stage 3b)"],
    activeMeds: ["Metformin 500mg OD", "Losartan 50mg OD", "Atorvastatin 10mg OD"],
    caseSummary: "Dysuria, urinary hesitancy, and suprapubic discomfort for 2 days. Requesting Ciprofloxacin over-the-counter. Renally compromised patient (eGFR 38 mL/min) requiring dose adjustment or alternative."
  },
  {
    id: "PT-2026-903",
    name: "Tanvir Ahmed",
    nameBn: "তানভীর আহমেদ",
    age: 26,
    gender: "Male",
    phone: "+880 1914-772019",
    location: "Boyra, Khulna",
    vitals: {
      bp: "122/78 mmHg",
      pulse: 72,
      temp: "98.6 °F",
      eGFR: 104,
      weightKg: 65,
      respRate: 14
    },
    allergies: ["No Known Drug Allergies (NKDA)"],
    chronicConditions: ["None"],
    activeMeds: ["None"],
    caseSummary: "Clear runny nose, sneezing, mild scratchy throat for 24 hours. Requesting Azithromycin 500mg to 'stop cold fast'. Clear viral upper respiratory tract infection candidate for non-antibiotic symptomatic self-care (Green Triage)."
  },
  {
    id: "PT-2026-904",
    name: "Fatema Begum",
    nameBn: "ফাতেমা বেগম",
    age: 58,
    gender: "Female",
    phone: "+880 1621-994411",
    location: "Rupsha, Khulna",
    vitals: {
      bp: "92/58 mmHg", // Hypotension / Sepsis sign
      pulse: 118, // Tachycardia
      temp: "103.8 °F", // High fever
      eGFR: 48,
      weightKg: 62,
      respRate: 28 // Tachypnea
    },
    allergies: ["No Known Drug Allergies (NKDA)"],
    chronicConditions: ["Hypertension"],
    activeMeds: ["Amlodipine 5mg OD"],
    caseSummary: "Severe acute chills, rigor, right costovertebral flank tenderness, vomiting, altered alertness. SIRS criteria positive (sepsis red-flag). Immediate hospital emergency referral required."
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: "RX-BD-2026-48291-N77",
    patientId: "PT-2026-901",
    patientName: "Nasrin Jahan",
    doctorId: "DOC-BMDC-48291",
    doctorName: "Dr. Anisur Rahman, MBBS, FCPS",
    doctorHospital: "Khulna Medical College & Hospital",
    date: "2026-10-20",
    diagnosis: "Acute Bacterial Sinusitis / Purulent Pharyngitis",
    status: "ISSUED", // ISSUED, DTP_FLAGGED, APPROVED_MODIFIED, DISPENSED
    medications: [
      {
        name: "Cefixime 200mg",
        generic: "Cefixime",
        strength: "200mg",
        awareClass: "WATCH",
        dosage: "1 Capsule Twice Daily (q12h) after meals",
        duration: "5 days",
        quantity: 10,
        instructions: "Complete full 5-day course even if fever resolves."
      },
      {
        name: "Paracetamol 500mg",
        generic: "Paracetamol",
        strength: "500mg",
        awareClass: "OTC",
        dosage: "1 Tablet 3 times daily as needed for pain/fever",
        duration: "3 days",
        quantity: 10,
        instructions: "Max 4g/day. Take with water."
      }
    ],
    clinicalNotes: "Patient has documented Penicillin allergy (angioedema). Avoid Amoxicillin/Augmentin. Selected 3rd gen cephalosporin Cefixime with low cross-reactivity risk under clinical observation.",
    hash: "a4f89d31c0e7b27419e761d5",
    qrPayload: "COU-RX:48291-N77:CEF200:5D:SHA256"
  },
  {
    id: "RX-BD-2026-61902-M38",
    patientId: "PT-2026-902",
    patientName: "Abdul Malek",
    doctorId: "DOC-BMDC-61902",
    doctorName: "Dr. Farhana Chowdhury, MBBS, MD (Nephrology)",
    doctorHospital: "Shaheed Sheikh Abu Naser Specialized Hospital",
    date: "2026-10-19",
    diagnosis: "Complicated Urinary Tract Infection (Male)",
    status: "DTP_FLAGGED",
    medications: [
      {
        name: "Ciprofloxacin 500mg",
        generic: "Ciprofloxacin",
        strength: "500mg",
        awareClass: "WATCH",
        dosage: "1 Tablet Twice Daily (q12h)",
        duration: "7 days",
        quantity: 14,
        instructions: "Drink plenty of water. Avoid antacids within 2 hours."
      }
    ],
    dtpAlert: {
      type: "RENAL_DOSE_IMPAIRMENT",
      flaggedBy: "Kazi Farhan Ahmed, R.Ph (Khulna Model Pharmacy)",
      flaggedAt: "2026-10-20T10:14:00Z",
      severity: "HIGH",
      message: "Patient baseline eGFR is 38 mL/min (CKD Stage 3b). Standard Ciprofloxacin 500mg BID exceeds renal clearance capacity (renal accumulation & CNS toxicity risk).",
      recommendedAction: "Reduce Ciprofloxacin dose to 250mg BID, or switch to Nitrofurantoin SR / Fosfomycin."
    },
    clinicalNotes: "Initial empirical prescription before renal review.",
    hash: "b19e48c109f257a3e47bc991",
    qrPayload: "COU-RX:61902-M38:CIP500:7D:RENAL_HOLD"
  },
  {
    id: "RX-BD-2026-48291-T12",
    patientId: "PT-2026-903",
    patientName: "Tanvir Ahmed",
    doctorId: "DOC-BMDC-48291",
    doctorName: "Dr. Anisur Rahman, MBBS, FCPS",
    doctorHospital: "Khulna Medical College & Hospital",
    date: "2026-10-17",
    diagnosis: "Bacterial Streptococcal Pharyngitis (Confirmed)",
    status: "DISPENSED",
    dispensedAt: "2026-10-17T14:30:00Z",
    dispensedPharmacy: "Khulna Model Pharmacy (License DGDA-KH-8821)",
    medications: [
      {
        name: "Amoxicillin 500mg",
        generic: "Amoxicillin",
        strength: "500mg",
        awareClass: "ACCESS",
        dosage: "1 Capsule 3 times daily (every 8h)",
        duration: "5 days",
        quantity: 15,
        instructions: "Must be taken for all 5 days to prevent rheumatic complications."
      }
    ],
    adherenceCourse: {
      totalDays: 5,
      totalDoses: 15,
      dosesTaken: 9,
      currentDay: 3,
      lastDoseTimestamp: "2026-10-20T08:00:00Z",
      adverseReactionsReported: [
        {
          timestamp: "2026-10-19T19:20:00Z",
          reaction: "Mild abdominal cramping and loose stools",
          actionTaken: "Pharmacist advised taking capsule with food or yoghurt; symptoms stable."
        }
      ]
    },
    hash: "f77c28e901a44e59103bd04e",
    qrPayload: "COU-RX:48291-T12:AMX500:5D:DISPENSED"
  }
];

export const COMMUNITY_PHARMACIES = [
  {
    id: "PHARM-KH-01",
    name: "Khulna Model Pharmacy",
    nameBn: "খুলনা মডেল ফার্মেসি",
    address: "Daulatpur Main Road, Khulna",
    distanceKm: 0.4,
    phone: "+880 1711-209844",
    licenseNo: "DGDA-KH-8821/A",
    pharmacistInCharge: "Kazi Farhan Ahmed, B.Pharm, R.Ph (Reg #B-9140)",
    status: "OPEN_VERIFIED",
    inventory: [
      { drug: "Amoxicillin 500mg", brand: "Moxacil (Square)", stock: 120, unitPriceBdt: 12.50, awareClass: "ACCESS" },
      { drug: "Amoxicillin 500mg (Generic)", brand: "G-Amoxicillin (Gonoshasthaya)", stock: 350, unitPriceBdt: 4.80, awareClass: "ACCESS" },
      { drug: "Cefixime 200mg", brand: "Cef-3 (Square)", stock: 45, unitPriceBdt: 45.00, awareClass: "WATCH" },
      { drug: "Cefixime 200mg (Generic)", brand: "Triocim (Incepta)", stock: 80, unitPriceBdt: 32.00, awareClass: "WATCH" },
      { drug: "Ciprofloxacin 500mg", brand: "Ciprocin (Square)", stock: 90, unitPriceBdt: 14.00, awareClass: "WATCH" },
      { drug: "Azithromycin 500mg", brand: "Zimax (Square)", stock: 65, unitPriceBdt: 35.00, awareClass: "WATCH" },
      { drug: "Paracetamol 500mg", brand: "Napa (Beximco)", stock: 800, unitPriceBdt: 1.20, awareClass: "OTC" }
    ]
  },
  {
    id: "PHARM-KH-02",
    name: "Lazz Pharma Clinical Node",
    nameBn: "লাজ ফার্মা ক্লিনিক্যাল নোড",
    address: "Shibbari Mor Crossing, Khulna",
    distanceKm: 1.2,
    phone: "+880 1819-440211",
    licenseNo: "DGDA-LP-4419/B",
    pharmacistInCharge: "Sumaiya Akter, M.Pharm, R.Ph (Reg #A-7412)",
    status: "OPEN_VERIFIED",
    inventory: [
      { drug: "Amoxicillin 500mg", brand: "Moxacil (Square)", stock: 85, unitPriceBdt: 12.50, awareClass: "ACCESS" },
      { drug: "Cefixime 200mg", brand: "Cef-3 (Square)", stock: 30, unitPriceBdt: 45.00, awareClass: "WATCH" },
      { drug: "Ciprofloxacin 500mg", brand: "Neofloxin (Beximco)", stock: 110, unitPriceBdt: 15.00, awareClass: "WATCH" },
      { drug: "Azithromycin 500mg", brand: "Zimax (Square)", stock: 40, unitPriceBdt: 35.00, awareClass: "WATCH" },
      { drug: "Paracetamol 500mg", brand: "Ace (Square)", stock: 600, unitPriceBdt: 1.20, awareClass: "OTC" }
    ]
  },
  {
    id: "PHARM-KH-03",
    name: "Popular Med Corner",
    nameBn: "পপুলার মেড কর্নার",
    address: "Hospital Gate, Boyra, Khulna",
    distanceKm: 2.1,
    phone: "+880 1912-780442",
    licenseNo: "DGDA-PMC-3108/C",
    pharmacistInCharge: "Md. Rafiqul Islam, Diploma in Pharmacy, R.Ph",
    status: "OPEN_VERIFIED",
    inventory: [
      { drug: "Amoxicillin 500mg", brand: "Tycil (Incepta)", stock: 200, unitPriceBdt: 11.00, awareClass: "ACCESS" },
      { drug: "Cefixime 200mg", brand: "Denvar (Beximco)", stock: 15, unitPriceBdt: 44.00, awareClass: "WATCH" },
      { drug: "Ciprofloxacin 500mg", brand: "Ciprocin (Square)", stock: 40, unitPriceBdt: 14.00, awareClass: "WATCH" },
      { drug: "Paracetamol 500mg", brand: "Napa (Beximco)", stock: 450, unitPriceBdt: 1.20, awareClass: "OTC" }
    ]
  }
];

export const BIOEQUIVALENT_PAIRS = [
  {
    originalBrand: "Moxacil 500mg",
    originalManufacturer: "Square Pharmaceuticals Ltd.",
    originalPriceBdt: 12.50,
    substituteBrand: "G-Amoxicillin 500mg",
    substituteManufacturer: "Gonoshasthaya Pharmaceuticals",
    substitutePriceBdt: 4.80,
    savingsBdt: 7.70,
    savingsPercent: "61.6%",
    activeGeneric: "Amoxicillin Trihydrate BP 500mg",
    dosageForm: "Capsule",
    bioequivalenceStatus: "Verified DGDA Bioequivalence Cert #BE-2025-104 (AUC & Cmax 90% CI within 80-125%)",
    clinicalNote: "Full therapeutic equivalence with substantial cost reduction for low-resource patients."
  },
  {
    originalBrand: "Zimax 500mg",
    originalManufacturer: "Square Pharmaceuticals Ltd.",
    originalPriceBdt: 35.00,
    substituteBrand: "Azithromycin G-Pharm 500mg",
    substituteManufacturer: "Gonoshasthaya Pharmaceuticals",
    substitutePriceBdt: 18.00,
    savingsBdt: 17.00,
    savingsPercent: "48.6%",
    activeGeneric: "Azithromycin Dihydrate USP 500mg",
    dosageForm: "Film-Coated Tablet",
    bioequivalenceStatus: "Verified DGDA Bioequivalence Cert #BE-2024-88",
    clinicalNote: "Bioequivalent generic providing identical AUC plasma curve."
  },
  {
    originalBrand: "Cef-3 200mg",
    originalManufacturer: "Square Pharmaceuticals Ltd.",
    originalPriceBdt: 45.00,
    substituteBrand: "Triocim 200mg",
    substituteManufacturer: "Incepta Pharmaceuticals Ltd.",
    substitutePriceBdt: 32.00,
    savingsBdt: 13.00,
    savingsPercent: "28.9%",
    activeGeneric: "Cefixime Trihydrate USP 200mg",
    dosageForm: "Capsule",
    bioequivalenceStatus: "Verified DGDA Bioequivalence Cert #BE-2025-412",
    clinicalNote: "GMP audited facility bioequivalent match."
  }
];

// Pre-loaded Academic Literature Review Matrix (Portal 04)
export const INITIAL_RESEARCH_PAPERS = [
  {
    id: "PAPER-01",
    citation: "Klimentidis, D., Babar, Z. U. D., Petrides, M., & Peletidi, A. (2026)",
    title: "From transaction to transformation: a binational perspective on integrating community pharmacy into the digital health ecosystem of Southern European health systems",
    journal: "Journal of Pharmaceutical Policy and Practice, 19(1), 2677777",
    year: 2026,
    doi: "10.1080/20523211.2026.2677777",
    url: "https://doi.org/10.1080/20523211.2026.2677777",
    studyDesign: "Binational comparative qualitative & policy review (Greece & Cyprus)",
    coreFinding: "Community pharmacies in Southern Europe utilize electronic prescribing primarily as an administrative and billing transaction tool, suffering from unidirectional communication, lack of shared Electronic Health Record (EHR) access, and absent clinical feedback loops between doctors and pharmacists.",
    researchGap: "No live technical architecture exists that integrates shared clinical records, bidirectional Drug Therapy Problem (DTP) interventions, and verified generic substitution into standard community pharmacy workflow.",
    platformMapping: "Feature 3 (Shared Longitudinal Patient EHR Snapshot & Bidirectional DTP Loop) and Feature 4 (Bioequivalent Generic Substitution Router).",
    verifiedInCapStone: true,
    status: "INTEGRATED_INTO_ARCHITECTURE"
  },
  {
    id: "PAPER-02",
    citation: "Alshahrani, A. M., Vasudevan, R., Hmlan, A., Assiri, A. M., Asiri, A. M., Asiri, O. A. M., & Mashni, A. A. (2026)",
    title: "Digital Transformation and Team-Based Care: Pharmacists in Multidisciplinary Models – A Narrative Review",
    journal: "Journal of Multidisciplinary Healthcare, 19, 576298",
    year: 2026,
    doi: "10.2147/JMDH.S576298",
    url: "https://doi.org/10.2147/JMDH.S576298",
    studyDesign: "Comprehensive narrative review of multidisciplinary clinical healthcare models",
    coreFinding: "Transitioning community and hospital pharmacists into multidisciplinary clinical teams via telepharmacy, shared EHRs, and AI-enabled Clinical Decision Support (CDS) significantly lowers medication errors, improves chronic disease management, and boosts patient adherence.",
    researchGap: "Existing EHR software isolates pharmacy counters from acute telemetry and post-dispensing longitudinal adherence tracking, leaving pharmacists with no structured channel to alert physicians of renal dose conflicts or adverse drug reactions.",
    platformMapping: "Feature 3 (Automated CDS Alert Engine for DDI & Renal Impairment) and Feature 5 (Automated Post-Dispensing Day-3/Day-5 Adherence & ADR Follow-up).",
    verifiedInCapStone: true,
    status: "INTEGRATED_INTO_ARCHITECTURE"
  },
  {
    id: "PAPER-03",
    citation: "Ghosh, E., Rahman, M. J., Ahamed, S., Salwa, M., Foyez, T., & Mamun, K. A. (2026)",
    title: "Integrating AI-Driven Triage into Digital Pharmacy Systems for Rational Antibiotic Use in Low-Resource Settings",
    journal: "Proceedings of The Second AAAI Bridge Program on AI for Medicine and Healthcare, PMLR 317:102–109",
    year: 2026,
    doi: "PMLR:v317:ghosh26a",
    url: "https://proceedings.mlr.press/v317/ghosh26a.html",
    studyDesign: "Cluster quasi-experimental implementation across 28 community pharmacies in rural & peri-urban Bangladesh",
    coreFinding: "Deploying a digital pharmacy triage and instant teleconsultation platform reduced non-prescription antibiotic self-medication from 4.05% down to 0.86% and elevated prescription-backed dispensing from 27.6% to 43.5%, proposing a hybrid ML/LLM symptom classification framework.",
    researchGap: "Paper establishes field proof in Bangladesh pharmacies but highlights the need for deterministic red-flag emergency safety rails, bilingual Bangla/English symptom comprehension, and integrated WHO AWaRe classification locks.",
    platformMapping: "Feature 1 (Hybrid AI Symptom Checker & Red-Flag Triage Engine), Feature 2 (Mandatory WHO AWaRe Watch/Reserve Stewardship Lock), and Regional Telemetry Strip.",
    verifiedInCapStone: true,
    status: "INTEGRATED_INTO_ARCHITECTURE"
  }
];

export const CAPSTONE_TEAM_INFO = {
  projectTitle: "Unified Digital Healthcare Platform Connecting Patients, Doctors, and Pharmacies",
  subtitle: "Closed-Loop Clinical Care, e-Prescribing & Rational Antibiotic Stewardship in Low-Resource & Primary Care Networks",
  groupNumber: "Group 3",
  academicTerm: "Capstone Senior Thesis — Academic Session 2025–2026",
  members: [
    { name: "Md. Ibrahim Hussain", id: "242002129", role: "Clinical Systems Architect & Full-Stack Lead" },
    { name: "Md Leon Ahammed", id: "242002039", role: "AI Triage Engine & Telepharmacy Specialist" },
    { name: "Jakaria Hoque", id: "242002012", role: "Clinical Decision Support & Stewardship Analyst" }
  ],
  institution: "Department of Computer Science & Engineering / Biomedical Informatics",
  supervisor: "Faculty Advisory Committee — Digital Health & Telemedicine Laboratory"
};
