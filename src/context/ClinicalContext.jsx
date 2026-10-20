import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  WHO_AWARE_DATABASE,
  INITIAL_PATIENTS,
  INITIAL_PRESCRIPTIONS,
  COMMUNITY_PHARMACIES,
  BIOEQUIVALENT_PAIRS,
  INITIAL_RESEARCH_PAPERS,
  CAPSTONE_TEAM_INFO
} from '../data/initialClinicalData';
import { evaluateClinicalTriage } from '../utils/triageEngine';
import { evaluateClinicalSafety } from '../utils/cdsEngine';

const ClinicalContext = createContext(null);

const STORAGE_KEYS = {
  PRESCRIPTIONS: 'clinical_prescriptions_v2',
  PATIENTS: 'clinical_patients_v2',
  TRIAGE_QUEUE: 'clinical_triage_queue_v2',
  RESEARCH_PAPERS: 'clinical_research_papers_v2',
  AUDIT_LOG: 'clinical_audit_log_v2',
  STATS: 'clinical_stewardship_stats_v2'
};

const BROADCAST_CHANNEL_NAME = 'clinical_care_broadcast_channel';

export const ClinicalProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' | 'bn'
  const [activePortal, setActivePortal] = useState('patient'); // 'patient' | 'doctor' | 'pharmacy' | 'research'
  const [activePatientId, setActivePatientId] = useState('PT-2026-901');

  // Load or fallback to initial dataset
  const [patients, setPatients] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
    } catch {
      return INITIAL_PATIENTS;
    }
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
      return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
    } catch {
      return INITIAL_PRESCRIPTIONS;
    }
  });

  const [triageQueue, setTriageQueue] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRIAGE_QUEUE);
      return saved ? JSON.parse(saved) : [
        {
          id: 'TQ-901',
          patientId: 'PT-2026-901',
          patientName: 'Nasrin Jahan',
          age: 34,
          vitals: { temp: '101.4 °F', bp: '118/76', feverDays: 4, cough: 'productive' },
          tier: 'AMBER',
          source: 'Walk-In Counter (Khulna Model Pharmacy)',
          narrative: 'High fever for 4 days with purulent yellow sputum. Antibiotic requested at counter; locked by stewardship protocol.',
          createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          status: 'PENDING_DOCTOR_CONSULT'
        }
      ];
    } catch {
      return [];
    }
  });

  const [researchPapers, setResearchPapers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESEARCH_PAPERS);
      return saved ? JSON.parse(saved) : INITIAL_RESEARCH_PAPERS;
    } catch {
      return INITIAL_RESEARCH_PAPERS;
    }
  });

  const [auditLog, setAuditLog] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOG);
      return saved ? JSON.parse(saved) : [
        { id: 'LOG-01', time: '10:05 AM', text: 'System initialized with WHO AWaRe 2026 Classification Engine.', type: 'SYSTEM' },
        { id: 'LOG-02', time: '10:14 AM', text: 'DTP Alert flagged: Abdul Malek (eGFR 38 mL/min) requires renal dose reduction for Ciprofloxacin.', type: 'DTP' },
        { id: 'LOG-03', time: '10:22 AM', text: 'Stewardship Lock triggered: Cefixime 200mg OTC request blocked at Khulna Model Pharmacy.', type: 'LOCK' }
      ];
    } catch {
      return [];
    }
  });

  const [stewardshipStats, setStewardshipStats] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      return saved ? JSON.parse(saved) : {
        selfMedReduction: '4.05% → 0.86%',
        prescriptionBackedDispense: '27.6% → 43.5%+',
        resolvedDtps: 18,
        stewardshipLocksEnforced: 64,
        accessVsWatchRatio: '68% Access / 32% Watch'
      };
    } catch {
      return {
        selfMedReduction: '4.05% → 0.86%',
        prescriptionBackedDispense: '27.6% → 43.5%+',
        resolvedDtps: 18,
        stewardshipLocksEnforced: 64,
        accessVsWatchRatio: '68% Access / 32% Watch'
      };
    }
  });

  // Broadcast channel for multi-tab live sync
  const channel = useMemo(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    }
    return null;
  }, []);

  const broadcastMessage = useCallback((action, payload) => {
    if (channel) {
      channel.postMessage({ action, payload, sender: Date.now() });
    }
  }, [channel]);

  // Synchronize incoming broadcast messages
  useEffect(() => {
    if (!channel) return;

    const handleMessage = (event) => {
      const { action, payload } = event.data || {};
      if (!action) return;

      if (action === 'SYNC_ALL') {
        if (payload.prescriptions) setPrescriptions(payload.prescriptions);
        if (payload.triageQueue) setTriageQueue(payload.triageQueue);
        if (payload.auditLog) setAuditLog(payload.auditLog);
        if (payload.stewardshipStats) setStewardshipStats(payload.stewardshipStats);
      } else if (action === 'ADD_TRIAGE') {
        setTriageQueue((prev) => [payload, ...prev.filter(t => t.id !== payload.id)]);
      } else if (action === 'UPDATE_RX') {
        setPrescriptions((prev) => [payload, ...prev.filter(r => r.id !== payload.id)]);
      } else if (action === 'APPEND_LOG') {
        setAuditLog((prev) => [payload, ...prev.slice(0, 49)]);
      }
    };

    channel.onmessage = handleMessage;
    return () => {
      channel.onmessage = null;
    };
  }, [channel]);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRESCRIPTIONS, JSON.stringify(prescriptions));
      localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
      localStorage.setItem(STORAGE_KEYS.TRIAGE_QUEUE, JSON.stringify(triageQueue));
      localStorage.setItem(STORAGE_KEYS.RESEARCH_PAPERS, JSON.stringify(researchPapers));
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOG, JSON.stringify(auditLog));
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stewardshipStats));
    } catch (e) {
      console.warn("Storage sync error", e);
    }
  }, [prescriptions, patients, triageQueue, researchPapers, auditLog, stewardshipStats]);

  const addAuditLog = useCallback((text, type = 'INFO') => {
    const newEntry = {
      id: `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      text,
      type
    };
    setAuditLog((prev) => [newEntry, ...prev.slice(0, 49)]);
    broadcastMessage('APPEND_LOG', newEntry);
  }, [broadcastMessage]);

  // Current selected patient object
  const activePatient = useMemo(() => {
    return patients.find(p => p.id === activePatientId) || patients[0];
  }, [patients, activePatientId]);

  // Submit Triage Case (Feature 1)
  const submitTriageCase = useCallback((triageInput) => {
    const verdict = evaluateClinicalTriage(triageInput);

    const newCase = {
      id: `TQ-${Date.now()}`,
      patientId: activePatient.id,
      patientName: activePatient.name,
      patientAge: activePatient.age,
      vitals: {
        temp: `${triageInput.temperatureF} °F`,
        bp: `${triageInput.systolicBp}/${triageInput.diastolicBp}`,
        feverDays: triageInput.feverDays,
        cough: triageInput.coughType
      },
      tier: verdict.tier,
      verdict,
      narrative: triageInput.narrativeText,
      source: triageInput.source || 'Patient Portal App',
      createdAt: new Date().toISOString(),
      status: verdict.tier === 'GREEN' ? 'RESOLVED_SELF_CARE' : 'PENDING_DOCTOR_CONSULT'
    };

    if (verdict.tier !== 'GREEN') {
      setTriageQueue((prev) => [newCase, ...prev]);
      broadcastMessage('ADD_TRIAGE', newCase);
      addAuditLog(`Triage Alert: ${activePatient.name} evaluated as ${verdict.tier} Tier (${verdict.label}). Routed to Doctor Consult queue.`, verdict.tier === 'RED' ? 'EMERGENCY' : 'TRIAGE');
    } else {
      addAuditLog(`Triage Completed: ${activePatient.name} evaluated as GREEN Tier (Self-Care). Antibiotic prohibited.`, 'OTC');
    }

    return { verdict, caseRecord: newCase };
  }, [activePatient, broadcastMessage, addAuditLog]);

  // Issue Digital e-Prescription (Feature 2)
  const issuePrescription = useCallback(({
    patientId,
    patientName,
    diagnosis,
    medications,
    clinicalNotes,
    originatingTriageId
  }) => {
    const rxToken = `RX-BD-2026-${Math.floor(10000 + Math.random() * 90000)}-${patientName.split(' ')[0].toUpperCase()}`;
    const hash = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);

    const newRx = {
      id: rxToken,
      patientId,
      patientName,
      doctorId: 'DOC-BMDC-48291',
      doctorName: 'Dr. Anisur Rahman, MBBS, FCPS',
      doctorHospital: 'Khulna Medical College & Hospital',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      status: 'ISSUED',
      medications,
      clinicalNotes,
      hash,
      qrPayload: `COU-RX:${rxToken}:${medications[0]?.generic || 'MED'}:${hash.substring(0, 6)}`
    };

    setPrescriptions((prev) => [newRx, ...prev]);

    // If this fulfills a pending triage case, mark it resolved
    if (originatingTriageId) {
      setTriageQueue((prev) =>
        prev.map(t => t.id === originatingTriageId ? { ...t, status: 'RESOLVED_WITH_RX', issuedRxId: rxToken } : t)
      );
    }

    addAuditLog(`Digital e-Prescription ${rxToken} signed by Dr. Anisur Rahman for ${patientName} (${diagnosis}). WHO AWaRe classification verified.`, 'RX_ISSUED');
    broadcastMessage('UPDATE_RX', newRx);
    return newRx;
  }, [addAuditLog, broadcastMessage]);

  // Pharmacist Flag Drug Therapy Problem (DTP) (Feature 3)
  const flagDtpIntervention = useCallback((rxId, dtpData) => {
    let targetPatientName = '';
    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id === rxId) {
          targetPatientName = rx.patientName;
          return {
            ...rx,
            status: 'DTP_FLAGGED',
            dtpAlert: {
              ...dtpData,
              flaggedAt: new Date().toISOString()
            }
          };
        }
        return rx;
      })
    );

    addAuditLog(`DTP Intervention Flagged for ${rxId} (${targetPatientName}): ${dtpData.message}`, 'DTP');
    broadcastMessage('SYNC_ALL', { prescriptions });
  }, [addAuditLog, broadcastMessage, prescriptions]);

  // Doctor Resolve DTP (Feature 3)
  const resolveDtp = useCallback((rxId, resolutionType, updatePayload, doctorNote) => {
    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id === rxId) {
          const updatedMeds = resolutionType === 'UPDATE_MED' && updatePayload
            ? rx.medications.map((m, idx) => idx === 0 ? { ...m, ...updatePayload } : m)
            : rx.medications;

          return {
            ...rx,
            status: 'APPROVED_MODIFIED',
            medications: updatedMeds,
            clinicalNotes: `${rx.clinicalNotes} | [DTP Resolution: ${resolutionType}]: ${doctorNote}`,
            dtpResolution: {
              resolvedAt: new Date().toISOString(),
              resolutionType,
              doctorNote
            }
          };
        }
        return rx;
      })
    );

    setStewardshipStats((prev) => ({
      ...prev,
      resolvedDtps: prev.resolvedDtps + 1
    }));

    addAuditLog(`DTP Resolved on Rx ${rxId} by Physician: ${resolutionType} (${doctorNote})`, 'DTP_RESOLVED');
  }, [addAuditLog]);

  // Pharmacy Dispense Prescription (Feature 2 & 4)
  const dispensePrescription = useCallback((rxId, pharmacyId, pharmacistNotes, genericSubstituted = null) => {
    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id === rxId) {
          const finalMeds = genericSubstituted
            ? rx.medications.map(m => m.name === genericSubstituted.originalBrand ? {
                ...m,
                name: `${genericSubstituted.substituteBrand} (Bioequivalent Generic Substitution)`,
                genericSubstituted: true,
                savingsBdt: genericSubstituted.savingsBdt
              } : m)
            : rx.medications;

          return {
            ...rx,
            status: 'DISPENSED',
            dispensedAt: new Date().toISOString(),
            dispensedPharmacy: pharmacyId,
            pharmacistNotes,
            medications: finalMeds,
            adherenceCourse: {
              totalDays: 5,
              totalDoses: 10,
              dosesTaken: 1,
              currentDay: 1,
              lastDoseTimestamp: new Date().toISOString(),
              adverseReactionsReported: []
            }
          };
        }
        return rx;
      })
    );

    setStewardshipStats((prev) => ({
      ...prev,
      stewardshipLocksEnforced: prev.stewardshipLocksEnforced + 1
    }));

    addAuditLog(`Prescription ${rxId} verified & dispensed by community pharmacist. Adherence Course initialized.`, 'DISPENSED');
  }, [addAuditLog]);

  // Log Adherence Dose (Feature 5)
  const logAdherenceDose = useCallback((rxId) => {
    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id === rxId && rx.adherenceCourse) {
          const newDosesTaken = Math.min(rx.adherenceCourse.totalDoses, rx.adherenceCourse.dosesTaken + 1);
          const newCurrentDay = Math.min(rx.adherenceCourse.totalDays, Math.floor(newDosesTaken / 2) + 1);
          return {
            ...rx,
            adherenceCourse: {
              ...rx.adherenceCourse,
              dosesTaken: newDosesTaken,
              currentDay: newCurrentDay,
              lastDoseTimestamp: new Date().toISOString()
            }
          };
        }
        return rx;
      })
    );
    addAuditLog(`Adherence Dose Logged for ${rxId}. Telemetry synced to pharmacy surveillance.`, 'ADHERENCE');
  }, [addAuditLog]);

  // Report Adverse Drug Reaction (Feature 5)
  const reportAdverseReaction = useCallback((rxId, reactionText) => {
    setPrescriptions((prev) =>
      prev.map((rx) => {
        if (rx.id === rxId && rx.adherenceCourse) {
          const newEntry = {
            timestamp: new Date().toISOString(),
            reaction: reactionText,
            actionTaken: "Under review by community pharmacist & physician."
          };
          return {
            ...rx,
            adherenceCourse: {
              ...rx.adherenceCourse,
              adverseReactionsReported: [newEntry, ...rx.adherenceCourse.adverseReactionsReported]
            }
          };
        }
        return rx;
      })
    );
    addAuditLog(`ADR Reported on Rx ${rxId}: "${reactionText}". Real-time alert dispatched to Pharmacist.`, 'ADR_ALERT');
  }, [addAuditLog]);

  // Add Research Paper (Portal 04)
  const addResearchPaper = useCallback((paper) => {
    const newPaper = {
      ...paper,
      id: `PAPER-0${researchPapers.length + 1}`,
      verifiedInCapStone: true,
      status: paper.status || 'UNDER_EVALUATION'
    };
    setResearchPapers((prev) => [...prev, newPaper]);
    addAuditLog(`Research Matrix Updated: Added Paper 0${researchPapers.length + 1} (${newPaper.title})`, 'RESEARCH');
  }, [researchPapers.length, addAuditLog]);

  // Reset to seed data
  const resetToSeedData = useCallback(() => {
    setPatients(INITIAL_PATIENTS);
    setPrescriptions(INITIAL_PRESCRIPTIONS);
    setResearchPapers(INITIAL_RESEARCH_PAPERS);
    setAuditLog([
      { id: 'LOG-RESET', time: new Date().toLocaleTimeString(), text: 'System reset to verified Bangladesh clinical seed dataset.', type: 'SYSTEM' }
    ]);
    setActivePatientId('PT-2026-901');
    localStorage.clear();
  }, []);

  // Simulate Acute Cross-Portal Clinical Event
  const simulateAcuteScenario = useCallback(() => {
    const acuteCase = {
      feverDays: 3,
      temperatureF: 101.8,
      coughType: 'productive',
      hasDysuria: true,
      hasSoreThroat: true,
      systolicBp: 110,
      diastolicBp: 72,
      pulse: 88,
      narrativeText: 'গত ৩ দিন ধরে তীব্র প্রস্রাবে জ্বালাপোড়া ও জ্বর। ফার্মেসি থেকে সিপ্রোফ্লক্সাসিন নিতে চাই।',
      source: 'Khulna Model Pharmacy Walk-In Counter'
    };
    submitTriageCase(acuteCase);
    setActivePortal('doctor');
    addAuditLog('Simulated Acute Case: Patient seeking Watch-class antibiotic at counter. Directed to Doctor Console.', 'SIMULATION');
  }, [submitTriageCase, addAuditLog]);

  const value = {
    language,
    setLanguage,
    activePortal,
    setActivePortal,
    patients,
    activePatientId,
    setActivePatientId,
    activePatient,
    prescriptions,
    triageQueue,
    researchPapers,
    auditLog,
    stewardshipStats,
    pharmacies: COMMUNITY_PHARMACIES,
    bioequivalentPairs: BIOEQUIVALENT_PAIRS,
    teamInfo: CAPSTONE_TEAM_INFO,
    whoAwareDb: WHO_AWARE_DATABASE,
    // Actions
    submitTriageCase,
    issuePrescription,
    flagDtpIntervention,
    resolveDtp,
    dispensePrescription,
    logAdherenceDose,
    reportAdverseReaction,
    addResearchPaper,
    resetToSeedData,
    simulateAcuteScenario,
    evaluateClinicalSafety
  };

  return (
    <ClinicalContext.Provider value={value}>
      {children}
    </ClinicalContext.Provider>
  );
};

export const useClinical = () => {
  const context = useContext(ClinicalContext);
  if (!context) {
    throw new Error('useClinical must be used within ClinicalProvider');
  }
  return context;
};
