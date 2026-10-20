// Hybrid AI Symptom Checker & Red-Flag Triage Engine
// Grounded in Ghosh et al., 2026 (PMLR 317:102-109) & WHO IMCI / Sepsis Guidelines

export function evaluateClinicalTriage({
  feverDays = 0,
  temperatureF = 98.6,
  coughType = "none", // none, dry, productive, hemoptysis
  hasDysuria = false,
  hasSoreThroat = false,
  hasShortnessOfBreath = false,
  hasAlteredMentalState = false,
  systolicBp = 120,
  diastolicBp = 80,
  pulse = 75,
  age = 30,
  isPregnant = false,
  comorbidities = [],
  narrativeText = ""
}) {
  const narrativeLower = (narrativeText || "").toLowerCase();
  const flags = [];
  const banglaSymptomMatches = [];

  // Bangla keyword NLP recognition
  if (narrativeLower.includes("রক্ত") || narrativeLower.includes("blood") || narrativeLower.includes("hemoptysis")) {
    hasShortnessOfBreath = true;
    banglaSymptomMatches.push("Hemoptysis / Blood in sputum detected");
  }
  if (narrativeLower.includes("শ্বাসকষ্ট") || narrativeLower.includes("দম বন্ধ") || narrativeLower.includes("shortness of breath")) {
    hasShortnessOfBreath = true;
    banglaSymptomMatches.push("Shortness of breath / Dyspnea detected");
  }
  if (narrativeLower.includes("অ্যান্টিবায়োটিক") || narrativeLower.includes("antibiotic")) {
    flags.push("Patient explicitly seeking antibiotic at community pharmacy counter");
  }
  if (narrativeLower.includes("প্রস্রাবে জ্বালাপোড়া") || narrativeLower.includes("dysuria") || narrativeLower.includes("burning")) {
    hasDysuria = true;
    banglaSymptomMatches.push("Dysuria / Burning micturition reported");
  }
  if (narrativeLower.includes("গলা ব্যথা") || narrativeLower.includes("sore throat")) {
    hasSoreThroat = true;
  }
  if (narrativeLower.includes("হলুদ কফ") || narrativeLower.includes("yellow sputum") || narrativeLower.includes("পুরুলেন্ট")) {
    coughType = "productive";
    banglaSymptomMatches.push("Purulent sputum reported");
  }

  // 1. DETERMINISTIC RED-FLAG EVALUATION (EMERGENCY / SEPSIS)
  const isSirsPositive = (temperatureF > 103.0 || temperatureF < 96.0) && (pulse > 100 || systolicBp < 95);
  const isEmergency = 
    coughType === "hemoptysis" ||
    hasShortnessOfBreath ||
    hasAlteredMentalState ||
    temperatureF >= 103.5 ||
    systolicBp < 90 ||
    isSirsPositive;

  if (isEmergency) {
    return {
      tier: "RED",
      label: "EMERGENCY / SEPSIS RED-FLAG",
      labelBn: "জরুরি সতর্কতা / সেপসিস অ্যালার্ট (তাৎক্ষণিক হাসপাতাল রেফারেল)",
      severityScore: 92,
      recommendation: "Immediate referral to secondary/tertiary hospital emergency department. Hard stop on OTC dispensing or delay.",
      clinicalJustification: `Severe red flags identified: ${[
        temperatureF >= 103.5 ? `Severe hyperthermia (${temperatureF}°F)` : null,
        hasShortnessOfBreath ? "Acute respiratory distress / dyspnea" : null,
        coughType === "hemoptysis" ? "Hemoptysis (bloody sputum)" : null,
        systolicBp < 90 ? `Hypotension (${systolicBp}/${diastolicBp} mmHg - septic shock risk)` : null,
        hasAlteredMentalState ? "Altered mental status / lethargy" : null,
        isSirsPositive ? "SIRS criteria positive" : null
      ].filter(Boolean).join("; ")}.`,
      protocol: {
        selfCareBlocked: true,
        stewardshipAction: "HARD_BLOCK_SELF_MEDICATION",
        immediateStep: "Transfer to emergency room; oxygen support and intravenous access protocol.",
        teleDoctorQueueEligible: false,
        emergencyHotline: "999 / Khulna Medical College Hospital ER"
      },
      banglaMatches: banglaSymptomMatches
    };
  }

  // 2. AMBER EVALUATION (FAST-TRACK TELE-DOCTOR REFERRAL)
  const isAmber =
    feverDays >= 3 ||
    (temperatureF >= 100.4 && feverDays >= 2) ||
    hasDysuria ||
    (coughType === "productive" && feverDays >= 2) ||
    (hasSoreThroat && temperatureF >= 101.0) ||
    isPregnant ||
    comorbidities.includes("Chronic Kidney Disease (CKD)") ||
    comorbidities.includes("Type-2 Diabetes Mellitus") ||
    age < 5 ||
    age > 65;

  if (isAmber) {
    return {
      tier: "AMBER",
      label: "FAST-TRACK TELE-DOCTOR REFERRAL REQUIRED",
      labelBn: "ডাক্তার টেলি-পরামর্শ প্রয়োজন (অ্যান্টিবায়োটিক লক সক্রিয়)",
      severityScore: 68,
      recommendation: "Probable bacterial or high-risk infection requiring physician clinical evaluation and digital e-Prescription.",
      clinicalJustification: `Symptoms warrant professional medical assessment: ${[
        feverDays >= 3 ? `Prolonged fever (${feverDays} days)` : null,
        hasDysuria ? "Urinary tract symptoms (dysuria)" : null,
        coughType === "productive" ? "Productive cough with potential lower respiratory involvement" : null,
        temperatureF >= 100.4 ? `Documented pyrexia (${temperatureF}°F)` : null,
        comorbidities.length ? `Underlying comorbidities: ${comorbidities.join(", ")}` : null
      ].filter(Boolean).join("; ")}. Non-prescription antibiotic dispensing is strictly blocked by AMR stewardship protocol.`,
      protocol: {
        selfCareBlocked: false,
        stewardshipAction: "RESTRICT_ANTIBIOTIC_REQUIRE_RX",
        immediateStep: "Initiate 1-Click Fast-Track Telemedicine Consultation with licensed physician.",
        teleDoctorQueueEligible: true,
        suggestedInterimCare: "Stay hydrated, paracetamol 500mg for fever relief pending physician consultation."
      },
      banglaMatches: banglaSymptomMatches
    };
  }

  // 3. GREEN EVALUATION (OTC / SYMPTOMATIC SELF-CARE)
  return {
    tier: "GREEN",
    label: "OTC / SYMPTOMATIC SELF-CARE PROTOCOL",
    labelBn: "লক্ষণভিত্তিক স্ব-যত্ন (অ্যান্টিবায়োটিক প্রয়োজন নেই)",
    severityScore: 24,
    recommendation: "Self-limiting viral syndrome. Antibiotics are clinically ineffective and counter-indicated.",
    clinicalJustification: `Duration is short (${feverDays} days), vital signs are within normal limits (Temp: ${temperatureF}°F), and no red flags or systemic signs are present. Typical etiology is viral rhinitis or pharyngitis.`,
    protocol: {
      selfCareBlocked: false,
      stewardshipAction: "NON_ANTIBIOTIC_COUNSELING",
      immediateStep: "Dispense symptomatic OTC medications with structured pharmacist counseling.",
      teleDoctorQueueEligible: false,
      suggestedRegimen: [
        { item: "Paracetamol 500mg", instruction: "1 tablet every 6-8 hours as needed for pain or fever (max 4g/day)" },
        { item: "Warm Saline Gargle", instruction: "1/2 tsp salt in warm water, gargle 3 times daily for sore throat" },
        { item: "Oral Rehydration Salt (ORS)", instruction: "Ensure fluid balance and hydration" },
        { item: "Steam Inhalation", instruction: "For nasal congestion relief without systemic decongestants" }
      ],
      redFlagWarning: "If fever persists past 3 days, breathing becomes labored, or pain intensifies, return immediately for physician consultation."
    },
    banglaMatches: banglaSymptomMatches
  };
}
