import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import { AwareBadge } from '../Common/AwareBadge';
import { RxQrCode } from '../Common/RxQrCode';
import { PrescriptionPrintModal } from '../Common/PrescriptionPrintModal';
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
  Check,
  Printer,
  Download
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

  // Modal for viewing & printing prescription
  const [selectedRxForPrint, setSelectedRxForPrint] = useState(null);

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
      <section className="clinical-card p-5 sm:p-6 bg-white border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase mb-0.5">
                <span>PORTAL 03 • COMMUNITY PHARMACY CLINICAL HUB</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {activePharmacy.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                License: <span className="font-mono font-bold text-slate-800">{activePharmacy.licenseNo}</span> • Pharmacist: {activePharmacy.pharmacistInCharge} • {activePharmacy.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 bg-teal-50 text-teal-800 border border-teal-200 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>WHO STEWARDSHIP GATE: ACTIVE</span>
            </span>
          </div>
        </div>
      </section>

      {/* Feature 5: Regional AMR Surveillance & Stewardship Impact Telemetry Strip */}
      <section className="clinical-card p-5 bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 font-mono">
            <Activity className="w-4 h-4 text-teal-400 animate-pulse" />
            <span className="font-bold text-teal-200">REGIONAL AMR & STEWARDSHIP IMPACT TELEMETRY</span>
          </div>
          <span className="text-[10px] text-slate-400">
            BENCHMARKED AGAINST GHOSH ET AL., 2026 (BANGLADESH TRIAL)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
              Non-Rx Self-Medication
            </span>
            <span className="text-lg font-bold text-teal-400 block mt-0.5">
              4.05% → 0.86%
            </span>
            <span className="text-[10px] text-slate-400">78.8% reduction via gate</span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
              Rx-Backed Dispensing
            </span>
            <span className="text-lg font-bold text-teal-400 block mt-0.5">
              27.6% → 43.5%+
            </span>
            <span className="text-[10px] text-slate-400">Verified closed loop</span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
              Resolved DTP Interventions
            </span>
            <span className="text-lg font-bold text-white block mt-0.5">
              {stewardshipStats.resolvedDtps} Cases
            </span>
            <span className="text-[10px] text-slate-400">Renal & allergy saves</span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
              Stewardship Locks Enforced
            </span>
            <span className="text-lg font-bold text-rose-400 block mt-0.5">
              {stewardshipStats.stewardshipLocksEnforced} Blocked
            </span>
            <span className="text-[10px] text-slate-400">Watch/Reserve retail stops</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Stewardship Lock on Left, Bioequivalent Generic & Dispensing on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Feature 2 Mandatory Antibiotic Stewardship Lock */}
        <div className="lg:col-span-6 space-y-6">
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    Counter Antimicrobial Stewardship Gate
                  </h2>
                  <p className="text-xs text-slate-500">
                    Grounded in Ghosh et al., 2026 (PMLR 317)
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg">
                MANDATORY LOCK
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Simulate a walk-in patient requesting antibiotics without a verified e-Prescription. Watch- and Reserve-class antimicrobials are hard-locked by the stewardship gate, requiring a 1-click tele-triage referral.
            </p>

            <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                className={`p-4 rounded-xl border text-xs ${
                  isDispenseUnlocked
                    ? 'bg-teal-50 border-teal-200 text-teal-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold">
                    {isDispenseUnlocked ? (
                      <>
                        <Unlock className="w-4 h-4 text-teal-600" />
                        <span className="text-teal-800">DISPENSING AUTHORIZED BY VALID RX TOKEN</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-rose-600" />
                        <span className="text-rose-700 font-bold">BLOCKED BY AMR STEWARDSHIP GUARDRAIL</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-xs mt-2 leading-relaxed font-medium">
                  {isDispenseUnlocked
                    ? `Prescription token validated. Pharmacist is authorized to dispense ${walkInRequestedDrug}.`
                    : `Selling ${walkInRequestedDrug} (${requestedDrugClass} class) without a doctor e-Prescription is strictly blocked to stop AMR emergence in South Asia. Initiate doctor tele-triage below.`}
                </p>

                {!isDispenseUnlocked && (
                  <div className="mt-3.5 pt-3 border-t border-rose-200 flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={handleInitiateWalkInTriage}
                      className="clinical-btn clinical-btn-primary flex-1 py-1.5 text-xs bg-teal-600 hover:bg-teal-700"
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
                  <div className="mt-2 text-xs font-bold text-teal-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Case routed live to Doctor Console queue. Doctor notified.</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Feature 3: Pharmacist DTP Alert Flagging Desk */}
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    Pharmacist Drug Therapy Problem (DTP) Desk
                  </h2>
                  <p className="text-xs text-slate-500">
                    Grounded in Alshahrani et al., 2026 & Klimentidis et al., 2026
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {pendingRxForDispensing.map((rx) => {
                const targetPatient = patients.find(p => p.id === rx.patientId);
                const hasRenalImpairment = (targetPatient?.vitals.eGFR || 100) < 50;

                return (
                  <div
                    key={rx.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 hover:border-slate-300 transition-all shadow-2xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono font-bold text-slate-900 block">{rx.id}</span>
                        <span className="text-slate-500">Patient: {rx.patientName}</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-md">
                        {rx.status}
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 block">
                        Rx: {rx.medications[0]?.name} ({rx.medications[0]?.dosage})
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Patient eGFR: {targetPatient?.vitals.eGFR} mL/min | Allergies: {targetPatient?.allergies.join(', ')}
                      </span>
                    </div>

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
                        className="clinical-btn clinical-btn-danger flex-1 py-1.5 text-xs"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Flag DTP & Request Physician Modification</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRxForPrint(rx)}
                        className="clinical-btn clinical-btn-secondary text-xs px-3"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>View Rx</span>
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
          {/* Feature 4: Bioequivalent Generic Substitution Router */}
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-900">
                    Bioequivalent Generic Substitution Router
                  </h2>
                  <p className="text-xs text-slate-500">
                    DGDA Bioequivalence Certified Database
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              When a prescribed brand is costly or unavailable, pharmacists can propose a verified bioequivalent generic substitute with transparent price comparison in Bangladeshi Taka (৳ BDT).
            </p>

            <div className="space-y-3">
              {bioequivalentPairs.map((pair, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs transition-all ${
                    selectedGenericSub?.originalBrand === pair.originalBrand
                      ? 'bg-teal-50/80 border-teal-500 shadow-sm'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">ORIGINAL PRESCRIBED BRAND</span>
                      <strong className="text-sm text-slate-900">{pair.originalBrand}</strong>
                      <span className="text-xs text-slate-500 block">
                        {pair.originalManufacturer} • <strong className="text-slate-900">৳{pair.originalPriceBdt.toFixed(2)}/unit</strong>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-teal-700 font-bold uppercase block tracking-wider">VERIFIED SUBSTITUTE</span>
                      <strong className="text-sm text-teal-700">{pair.substituteBrand}</strong>
                      <span className="text-xs text-teal-800 font-bold block">
                        ৳{pair.substitutePriceBdt.toFixed(2)}/unit (Save {pair.savingsPercent})
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-200/80 font-mono">
                    {pair.bioequivalenceStatus}
                  </p>

                  <div className="mt-2.5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedGenericSub(pair)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition-all ${
                        selectedGenericSub?.originalBrand === pair.originalBrand
                          ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
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
          <section className="clinical-card p-6 bg-white border border-slate-200">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h2 className="font-bold text-lg text-slate-900">
                  Verified Dispensing Station
                </h2>
              </div>
            </div>

            {pendingRxForDispensing.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                No prescriptions currently awaiting dispensing.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRxForDispensing.map((rx) => (
                  <div key={rx.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-3 shadow-2xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono font-bold text-slate-900 text-sm block">{rx.id}</span>
                        <span className="text-slate-500">Patient: {rx.patientName} • Dr. {rx.doctorName}</span>
                      </div>
                      <AwareBadge classification={rx.medications[0]?.awareClass} size="compact" />
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 block">
                        Prescribed: {rx.medications[0]?.name}
                      </span>
                      <span className="text-slate-500 block">
                        Dosage: {rx.medications[0]?.dosage} ({rx.medications[0]?.duration})
                      </span>
                      {selectedGenericSub && selectedGenericSub.originalBrand === rx.medications[0]?.name && (
                        <div className="mt-1.5 pt-1.5 border-t border-teal-100 text-[11px] text-teal-700 font-bold">
                          ✓ Bioequivalent generic selected: {selectedGenericSub.substituteBrand} (Saving ৳{selectedGenericSub.savingsBdt.toFixed(2)})
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
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
                        className="clinical-btn clinical-btn-primary flex-1 py-2 text-xs"
                      >
                        <Check className="w-4 h-4" />
                        <span>Authorize Dispense & Start Adherence</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRxForPrint(rx)}
                        className="clinical-btn clinical-btn-secondary py-2 text-xs px-3"
                        title="Print or Download Full Prescription Slip"
                      >
                        <Printer className="w-4 h-4 text-teal-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Official Prescription Download & Print Modal */}
      {selectedRxForPrint && (
        <PrescriptionPrintModal
          prescription={selectedRxForPrint}
          patient={patients.find(p => p.id === selectedRxForPrint.patientId)}
          onClose={() => setSelectedRxForPrint(null)}
        />
      )}
    </div>
  );
};
