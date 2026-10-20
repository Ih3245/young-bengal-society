// Clinical Decision Support (CDS) Alert Engine
// Grounded in Alshahrani et al., 2026 & Klimentidis et al., 2026

export function evaluateClinicalSafety({
  patient,
  prescribedMeds = []
}) {
  const alerts = [];

  if (!patient || !prescribedMeds.length) {
    return alerts;
  }

  const allergies = patient.allergies || [];
  const eGFR = patient.vitals?.eGFR ?? 90;
  const activeMeds = patient.activeMeds || [];

  prescribedMeds.forEach((med) => {
    const medNameLower = (med.name || med.generic || "").toLowerCase();

    // 1. ALLERGY CONFLICT ENGINE
    allergies.forEach((allergy) => {
      const allergyLower = allergy.toLowerCase();

      // Penicillin Cross-Reactivity
      if (allergyLower.includes("penicillin")) {
        if (medNameLower.includes("amoxicillin") || medNameLower.includes("ampicillin") || medNameLower.includes("augmentin") || medNameLower.includes("cloxacillin")) {
          alerts.push({
            id: `ALLERGY-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            type: "ALLERGY_CONFLICT",
            severity: "CRITICAL",
            title: "CRITICAL ALLERGY CONFLICT: Beta-Lactam Anaphylaxis Risk",
            message: `Patient has documented allergy: "${allergy}". Prescribed medication "${med.name}" is a penicillin beta-lactam. Severe risk of anaphylaxis or angioedema.`,
            recommendation: "Discontinue immediately. Switch to a non-beta-lactam alternative (e.g., Azithromycin, Doxycycline, or non-cross-reactive cephalosporin under specialist supervision)."
          });
        }
      }

      // Sulfa Cross-Reactivity
      if (allergyLower.includes("sulfa") || allergyLower.includes("sulfonamide")) {
        if (medNameLower.includes("cotrimoxazole") || medNameLower.includes("bactrim") || medNameLower.includes("sulfamethoxazole")) {
          alerts.push({
            id: `ALLERGY-SULFA-${Date.now()}`,
            type: "ALLERGY_CONFLICT",
            severity: "CRITICAL",
            title: "CRITICAL ALLERGY CONFLICT: Sulfonamide Hypersensitivity",
            message: `Patient has documented allergy: "${allergy}". Prescribed medication "${med.name}" contains sulfonamides.`,
            recommendation: "Cancel and replace with an alternative antimicrobial class."
          });
        }
      }
    });

    // 2. RENAL DOSE ADJUSTMENT (eGFR)
    if (eGFR < 50) {
      if (medNameLower.includes("ciprofloxacin")) {
        alerts.push({
          id: `RENAL-CIPRO-${Date.now()}`,
          type: "RENAL_DOSE_IMPAIRMENT",
          severity: "HIGH",
          title: "RENAL CLEARANCE WARNING: Ciprofloxacin Dose Titration Needed",
          message: `Patient baseline eGFR is ${eGFR} mL/min (moderate-to-severe renal impairment). Normal 500mg BID exceeds clearance threshold, risking neurotoxicity and crystalluria.`,
          recommendation: `Titrate Ciprofloxacin dose down to 250mg BID (every 12 hours) or 500mg every 24 hours. Monitor serum creatinine.`
        });
      }

      if (medNameLower.includes("cefixime") && eGFR < 30) {
        alerts.push({
          id: `RENAL-CEF-${Date.now()}`,
          type: "RENAL_DOSE_IMPAIRMENT",
          severity: "MODERATE",
          title: "RENAL CLEARANCE WARNING: Cefixime Accumulation",
          message: `Patient baseline eGFR is ${eGFR} mL/min. Cephalosporin clearance is reduced.`,
          recommendation: `Limit Cefixime to 200mg once daily (OD).`
        });
      }

      if (medNameLower.includes("nitrofurantoin") && eGFR < 30) {
        alerts.push({
          id: `RENAL-NITRO-${Date.now()}`,
          type: "CONTRAINDICATION",
          severity: "HIGH",
          title: "CONTRAINDICATION: Nitrofurantoin in Severe Renal Impairment",
          message: `Patient baseline eGFR is ${eGFR} mL/min (<30 mL/min). Nitrofurantoin fails to achieve therapeutic urinary concentrations and carries severe peripheral neuropathy risk.`,
          recommendation: "Contraindicated. Switch to parenteral or alternative oral agent (e.g. Fosfomycin)."
        });
      }
    }

    // 3. DRUG-DRUG INTERACTIONS (DDI)
    activeMeds.forEach((activeMed) => {
      const activeLower = activeMed.toLowerCase();

      // Ciprofloxacin + Multivalent cations / Antacids
      if (medNameLower.includes("ciprofloxacin") && (activeLower.includes("antacid") || activeLower.includes("calcium") || activeLower.includes("iron"))) {
        alerts.push({
          id: `DDI-CIPRO-ANTACID-${Date.now()}`,
          type: "DRUG_INTERACTION",
          severity: "MODERATE",
          title: "DRUG INTERACTION: Chelation & Reduced Bioavailability",
          message: `Ciprofloxacin chelates with polyvalent cations in ${activeMed}, reducing antibiotic absorption by up to 85%.`,
          recommendation: "Space administration: take Ciprofloxacin 2 hours before or 6 hours after cation-containing agents."
        });
      }

      // Metformin + Contrast or Fluoroquinolones (Dysglycemia risk)
      if (activeLower.includes("metformin") && medNameLower.includes("ciprofloxacin")) {
        alerts.push({
          id: `DDI-MET-CIP-${Date.now()}`,
          type: "DRUG_INTERACTION",
          severity: "LOW",
          title: "DRUG INTERACTION: Fluoroquinolone Dysglycemia Risk",
          message: `Co-administration of Ciprofloxacin with Metformin may exacerbate hypoglycemia or blood glucose fluctuation in diabetic patients.`,
          recommendation: "Instruct patient to monitor capillary blood glucose closely during the antibiotic course."
        });
      }
    });
  });

  return alerts;
}
