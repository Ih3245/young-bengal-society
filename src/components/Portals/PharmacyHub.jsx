import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { AwareBadge } from '../Common/AwareBadge';
import { RxQrCode } from '../Common/RxQrCode';
import {
  Pill,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  Stethoscope,
  TrendingUp,
  Activity,
  FileCheck,
  Check
} from 'lucide-react';

export const PharmacyHub = () => {
  const {
    language,
    patients,
    prescriptions,
    pharmacies,
    bioequivalentPairs,
    stewardshipStats,
    dispensePrescription,
    flagDtpIntervention,
    submitTriageCase,
    setActivePortal,
    whoAwareDb
  } = useClinical();

  // Active pharmacy node
  const activePharmacy = pharmacies[0]; // Khulna Model Pharmacy

  // Walk-In Counter Simulation state
  const [walkInPatientName, setWalkInPatientName] = useState('Nasrin Jahan');
  const [walkInRequestedDrug, setWalkInRequestedDrug] = useState('Cefixime 200mg');
  const [walkInVerifiedToken, setWalkInVerifiedToken] = useState('');
  const [teleTriageInitiated, setTeleTriageInitiated] = useState(false);
  const [selectedGenericSub, setSelectedGenericSub] = useState(null);

  // Filter pending prescriptions ready for pharmacy review
  const pendingRxForDispensing = prescriptions.filter(
    (rx) => rx.status === 'ISSUED' || rx.status === 'APPROVED_MODIFIED'
  );

  const flaggedRx = prescriptions.filter(
    (rx) => rx.status === 'DTP_FLAGGED'
  );

  // Check if requested walk-in drug is Watch or Reserve
  const requestedDrugClass = whoAwareDb[walkInRequestedDrug]?.class || 'WATCH';
  const isStewardshipRestricted = requestedDrugClass === 'WATCH' || requestedDrugClass === 'RESERVE';

  // Check if verified token exists for this patient and drug
  const matchingValidRx = prescriptions.find(
    (rx) =>
      (rx.id === walkInVerifiedToken || rx.patientName.toLowerCase().includes(walkInPatientName.toLowerCase())) &&
      (rx.status === 'ISSUED' || rx.status === 'APPROVED_MODIFIED') &&
      rx.medications.some(m => m.name.toLowerCase().includes(walkInRequestedDrug.toLowerCase().split(' ')[0]))
  );

  const isDispenseUnlocked = !isStewardshipRestricted || matchingValidRx;

  // Handle Walk-In Tele-Triage Handshake
  const handleInitiateWalkInTriage = () => {
    submitTriageCase({
      feverDays: 3,
      temperatureF: 101.4,
      coughType: 'productive',
      hasDysuria: false,
      hasSoreThroat: true,
      narrativeText: `Walk-in patient ${walkInPatientName} at ${activePharmacy.name} counter requesting ${walkInRequestedDrug}. Dispense blocked by AMR stewardship guardrail. Referred for instant physician tele-triage.`,
      source: `${activePharmacy.name} Counter Triage Desk`
    });

    setTeleTriageInitiated(true);
    setTimeout(() => setTeleTriageInitiated(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Pharmacy Identity Header */}
      <section className="clinical-card p-4 sm:p-5 bg-white border border-[#141817]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#0F6B53] flex items-center justify-center text-white border border-[#141817]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5A605D] uppercase tracking-wider">
                <span>PORTAL 03</span>
                <span>•</span>
                <span className="font-bold text-[#0F6B53]">COMMUNITY PHARMACY CLINICAL HUB</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-[#141817]">
                {activePharmacy.name}
              </h1>
              <p className="text-xs text-[#5A605D]">
                Lic: <span className="font-mono font-bold text-[#141817]">{activePharmacy.licenseNo}</span> • Pharmacist: {activePharmacy.pharmacistInCharge} • {activePharmacy.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1.5 bg-[#E6F3EE] text-[#0F6B53] border border-[#0F6B53] rounded flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>WHO STEWARDSHIP GATE: ACTIVE</span>
            </span>
          </div>
        </div>
      </section>

      {/* Feature 5: Regional AMR Surveillance & Stewardship Impact Telemetry Strip */}
      <section className="clinical-card p-4 bg-[#141817] text-white border border-[#141817] shadow-[2px_2px_0px_#0F6B53]">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#5A605D] text-xs">
          <div className="flex items-center gap-2 font-mono">
            <Activity className="w-4 h-4 text-[#0F6B53] animate-pulse" />
            <span className="font-bold text-[#E6F3EE]">REGIONAL AMR & STEWARDSHIP IMPACT TELEMETRY</span>
          </div>
          <span className="text-[10px] font-mono text-[#CFD2CE]">
            BENCHMARKED AGAINST GHOSH ET AL., 2026 (BANGLADESH TRIAL)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2.5 bg-[#1E2422] rounded border border-[#5A605D]/50">
            <span className="text-[10px] font-mono text-[#CFD2CE] block uppercase">
              Non-Rx Self-Medication
            </span>
            <span className="font-mono text-lg font-bold text-[#0F6B53] block mt-0.5">
              4.05% → 0.86%
            </span>
            <span className="text-[9px] text-[#CFD2CE]">78.8% reduction via gate</span>
          </div>

          <div className="p-2.5 bg-[#1E2422] rounded border border-[#5A605D]/50">
            <span className="text-[10px] font-mono text-[#CFD2CE] block uppercase">
              Rx-Backed Dispensing
            </span>
            <span className="font-mono text-lg font-bold text-[#0F6B53] block mt-0.5">
              27.6% → 43.5%+
            </span>
            <span className="text-[9px] text-[#CFD2CE]">Verified closed loop</span>
          </div>

          <div className="p-2.5 bg-[#1E2422] rounded border border-[#5A605D]/50">
            <span className="text-[10px] font-mono text-[#CFD2CE] block uppercase">
              Resolved DTP Interventions
            </span>
            <span className="font-mono text-lg font-bold text-[#E6F3EE] block mt-0.5">
              {stewardshipStats.resolvedDtps} Cases
            </span>
            <span className="text-[9px] text-[#CFD2CE]">Renal & allergy saves</span>
          </div>

          <div className="p-2.5 bg-[#1E2422] rounded border border-[#5A605D]/50">
            <span className="text-[10px] font-mono text-[#CFD2CE] block uppercase">
              Stewardship Locks Enforced
            </span>
            <span className="font-mono text-lg font-bold text-[#C84B24] block mt-0.5">
              {stewardshipStats.stewardshipLocksEnforced} Blocked
            </span>
            <span className="text-[9px] text-[#CFD2CE]">Watch/Reserve retail stops</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Stewardship Lock on Left, Bioequivalent Generic & Dispensing on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Feature 2 Mandatory Antibiotic Stewardship Lock */}
        <div className="lg:col-span-6 space-y-6">
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#C84B24]" />
                <div>
                  <h2 className="font-headline font-bold text-base text-[#141817]">
                    Walk-In Counter Antimicrobial Stewardship Gate
                  </h2>
                  <p className="text-[11px] font-mono text-[#5A605D]">
                    Grounded in Ghosh et al., 2026 (PMLR 317)
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FAECE7] text-[#C84B24] border border-[#C84B24] font-bold rounded">
                MANDATORY LOCK
              </span>
            </div>

            <p className="text-xs text-[#5A605D] leading-relaxed mb-4">
              Simulate a walk-in patient requesting antibiotics without a verified e-Prescription. Watch- and Reserve-class antimicrobials are hard-locked by the stewardship gate, requiring a 1-click tele-triage referral.
            </p>

            <div className="space-y-4 p-4 bg-[#F4F3EF] border border-[#CFD2CE] rounded">
              {/* Patient Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#141817] mb-1">
                  Walk-In Patient Name
                </label>
                <select
                  value={walkInPatientName}
                  onChange={(e) => setWalkInPatientName(e.target.value)}
                  className="clinical-input w-full font-semibold text-xs"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.age}y, {p.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Requested Antimicrobial Drug */}
              <div>
                <label className="block text-xs font-semibold text-[#141817] mb-1">
                  Antimicrobial Agent Requested at Counter
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={walkInRequestedDrug}
                    onChange={(e) => setWalkInRequestedDrug(e.target.value)}
                    className="clinical-input flex-1 font-mono text-xs font-bold"
                  >
                    <optgroup label="WHO WATCH CLASS (Strict Stewardship Lock)">
                      <option value="Cefixime 200mg">Cefixime 200mg Tab (Watch)</option>
                      <option value="Azithromycin 500mg">Azithromycin 500mg Tab (Watch)</option>
                      <option value="Ciprofloxacin 500mg">Ciprofloxacin 500mg Tab (Watch)</option>
                    </optgroup>
                    <optgroup label="WHO ACCESS CLASS (First-Line Narrow)">
                      <option value="Amoxicillin 500mg">Amoxicillin 500mg Cap (Access)</option>
                      <option value="Cephalexin 500mg">Cephalexin 500mg Cap (Access)</option>
                    </optgroup>
                    <optgroup label="WHO RESERVE CLASS (Strict Hospital Lock)">
                      <option value="Meropenem 1g IV">Meropenem 1g IV (Reserve - PROHIBITED)</option>
                    </optgroup>
                  </select>

                  <AwareBadge classification={requestedDrugClass} size="compact" />
                </div>
              </div>

              {/* Verified Rx Token input */}
              <div>
                <label className="block text-xs font-semibold text-[#141817] mb-1">
                  Doctor e-Prescription Token (Optional for Test)
                </label>
                <input
                  type="text"
                  value={walkInVerifiedToken}
                  onChange={(e) => setWalkInVerifiedToken(e.target.value)}
                  placeholder="e.g. RX-BD-2026-48291-N77"
                  className="clinical-input w-full font-mono text-xs"
                />
              </div>

              {/* Stewardship Verdict & Lock Status */}
              <div
                className={`p-3.5 rounded border text-xs ${
                  isDispenseUnlocked
                    ? 'bg-[#E6F3EE] border-[#0F6B53]'
                    : 'bg-[#FAECE7] border-[#C84B24]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold">
                    {isDispenseUnlocked ? (
                      <>
                        <Unlock className="w-4 h-4 text-[#0F6B53]" />
                        <span className="text-[#0F6B53]">DISPENSING AUTHORIZED BY VALID RX TOKEN</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#C84B24]" />
                        <span className="text-[#C84B24]">BLOCKED BY AMR STEWARDSHIP GUARDRAIL</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-[#141817] mt-1.5 leading-relaxed">
                  {isDispenseUnlocked
                    ? `Prescription token validated. Pharmacist is legally clear to dispense ${walkInRequestedDrug}.`
                    : `Selling ${walkInRequestedDrug} (${requestedDrugClass} class) without a doctor e-Prescription is strictly prohibited to combat AMR in South Asia. Initiate doctor tele-triage below.`}
                </p>

                {/* 1-Click Fast-Track Tele-Triage Button */}
                {!isDispenseUnlocked && (
                  <div className="mt-3 pt-2 border-t border-[#C84B24]/30 flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={handleInitiateWalkInTriage}
                      className="clinical-btn clinical-btn-primary flex-1 py-1.5 text-xs bg-[#0F6B53]"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>Initiate Fast-Track Doctor Tele-Triage</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePortal('doctor')}
                      className="clinical-btn clinical-btn-secondary text-xs px-3"
                    >
                      Open Doctor Console
                    </button>
                  </div>
                )}

                {teleTriageInitiated && (
                  <div className="mt-2 text-[11px] font-bold text-[#0F6B53] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Case routed live to Doctor Console queue. Doctor notification dispatched.</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Feature 3: Pharmacist DTP Alert Flagging Desk */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#C84B24]" />
                <div>
                  <h2 className="font-headline font-bold text-base text-[#141817]">
                    Pharmacist Drug Therapy Problem (DTP) Desk
                  </h2>
                  <p className="text-[11px] font-mono text-[#5A605D]">
                    Grounded in Alshahrani et al., 2026 & Klimentidis et al., 2026
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {pendingRxForDispensing.map((rx) => {
                const targetPatient = patients.find(p => p.id === rx.patientId);
                const hasPenicillinConflict =
                  targetPatient?.allergies.some(a => a.toLowerCase().includes('penicillin')) &&
                  rx.medications.some(m => m.name.toLowerCase().includes('amoxicillin'));

                const hasRenalImpairment = (targetPatient?.vitals.eGFR || 100) < 50;

                return (
                  <div
                    key={rx.id}
                    className="p-3.5 bg-[#F4F3EF] border border-[#141817] rounded text-xs space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono font-bold text-[#141817] block">{rx.id}</span>
                        <span className="text-[#5A605D]">Patient: {rx.patientName}</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-white border border-[#CFD2CE] rounded">
                        {rx.status}
                      </span>
                    </div>

                    <div className="p-2 bg-white rounded border border-[#CFD2CE]">
                      <span className="font-bold text-[#141817] block">
                        Rx: {rx.medications[0]?.name} ({rx.medications[0]?.dosage})
                      </span>
                      <span className="text-[11px] text-[#5A605D] block mt-0.5">
                        Patient eGFR: {targetPatient?.vitals.eGFR} mL/min | Allergies: {targetPatient?.allergies.join(', ')}
                      </span>
                    </div>

                    {/* Flag DTP Action */}
                    <div className="pt-1 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          flagDtpIntervention(rx.id, {
                            type: hasRenalImpairment ? 'RENAL_DOSE_IMPAIRMENT' : 'DTP_INTERVENTION',
                            flaggedBy: `${activePharmacy.pharmacistInCharge} (${activePharmacy.name})`,
                            severity: 'HIGH',
                            message: `Pharmacist flagged clinical conflict: Patient eGFR is ${targetPatient?.vitals.eGFR} mL/min. Recommend renal titration or non-cross-reactive alternative.`,
                            recommendedAction: 'Reduce dose by 50% or change agent.'
                          });
                        }}
                        className="clinical-btn clinical-btn-danger flex-1 py-1 text-xs"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Flag DTP & Request Physician Modification</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Feature 4 Bioequivalent Generic Substitution Router & Final Dispense */}
        <div className="lg:col-span-6 space-y-6">
          {/* Feature 4: Bioequivalent Generic Substitution Router (Klimentidis et al., 2026) */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0F6B53]" />
                <div>
                  <h2 className="font-headline font-bold text-base text-[#141817]">
                    Bioequivalent Generic Substitution Router
                  </h2>
                  <p className="text-[11px] font-mono text-[#5A605D]">
                    DGDA Bioequivalence Certified Equivalence Database
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5A605D] leading-relaxed mb-3">
              When a prescribed brand is costly or unavailable, pharmacists can propose a verified bioequivalent generic substitute with transparent price comparison in Bangladeshi Taka (৳ BDT).
            </p>

            <div className="space-y-3">
              {bioequivalentPairs.map((pair, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded border text-xs transition-all ${
                    selectedGenericSub?.originalBrand === pair.originalBrand
                      ? 'bg-[#E6F3EE] border-[#0F6B53] shadow-[2px_2px_0px_#0F6B53]'
                      : 'bg-[#F4F3EF] border-[#CFD2CE]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-[#5A605D] block">ORIGINAL PRESCRIBED BRAND</span>
                      <strong className="text-sm text-[#141817]">{pair.originalBrand}</strong>
                      <span className="text-[11px] text-[#5A605D] block">
                        {pair.originalManufacturer} • <strong className="text-[#141817]">৳{pair.originalPriceBdt.toFixed(2)}/unit</strong>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-[10px] text-[#0F6B53] font-bold block">VERIFIED SUBSTITUTE</span>
                      <strong className="text-sm text-[#0F6B53]">{pair.substituteBrand}</strong>
                      <span className="text-[11px] text-[#0F6B53] font-bold block">
                        ৳{pair.substitutePriceBdt.toFixed(2)}/unit (Save {pair.savingsPercent})
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] font-mono text-[#5A605D] mt-2 pt-2 border-t border-[#CFD2CE]">
                    {pair.bioequivalenceStatus}
                  </p>

                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedGenericSub(pair)}
                      className={`text-xs px-2.5 py-1 rounded font-bold border transition-all ${
                        selectedGenericSub?.originalBrand === pair.originalBrand
                          ? 'bg-[#0F6B53] text-white border-[#0B4E3C]'
                          : 'bg-white text-[#141817] border-[#141817] hover:bg-[#E8E6DF]'
                      }`}
                    >
                      {selectedGenericSub?.originalBrand === pair.originalBrand ? 'Selected for Dispense' : 'Select Substitution'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ready to Dispense Prescription Station */}
          <section className="clinical-card p-5 bg-white border border-[#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#0F6B53]" />
                <h2 className="font-headline font-bold text-base text-[#141817]">
                  Verified Dispensing & Adherence Station
                </h2>
              </div>
            </div>

            {pendingRxForDispensing.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#5A605D] bg-[#F4F3EF] rounded border border-dashed border-[#CFD2CE]">
                No prescriptions currently awaiting dispensing.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRxForDispensing.map((rx) => (
                  <div key={rx.id} className="p-4 bg-[#F4F3EF] border border-[#141817] rounded shadow-[2px_2px_0px_#141817] text-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono font-bold text-[#141817] text-sm block">{rx.id}</span>
                        <span className="text-[#5A605D]">Patient: {rx.patientName} • Issued by {rx.doctorName}</span>
                      </div>
                      <AwareBadge classification={rx.medications[0]?.awareClass} size="compact" />
                    </div>

                    <div className="p-2.5 bg-white rounded border border-[#CFD2CE]">
                      <span className="font-bold text-[#141817] block">
                        Prescribed: {rx.medications[0]?.name}
                      </span>
                      <span className="text-[11px] text-[#5A605D] block">
                        Dosage: {rx.medications[0]?.dosage} ({rx.medications[0]?.duration})
                      </span>
                      {selectedGenericSub && selectedGenericSub.originalBrand === rx.medications[0]?.name && (
                        <div className="mt-1 pt-1 border-t border-[#0F6B53]/30 text-[11px] text-[#0F6B53] font-bold">
                          ✓ Bioequivalent generic selected: {selectedGenericSub.substituteBrand} (Saving ৳{selectedGenericSub.savingsBdt.toFixed(2)})
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        dispensePrescription(
                          rx.id,
                          activePharmacy.id,
                          `Dispensed by ${activePharmacy.pharmacistInCharge}`,
                          selectedGenericSub
                        );
                        setSelectedGenericSub(null);
                      }}
                      className="clinical-btn clinical-btn-primary w-full py-2 text-xs"
                    >
                      <Check className="w-4 h-4" />
                      <span>
                        Authorize Final Dispense & Initialize Adherence Telemetry
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
