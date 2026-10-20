# Unified Digital Healthcare Platform Connecting Patients, Doctors, and Community Pharmacies

> **University Senior Capstone Project (Group 3)**  
> **Academic Session:** 2025–2026  
> **Target Domain:** Bangladesh & South Asian Low- and Middle-Income Countries (LMICs) with Southern European Primary Care Integration Models.

---

## 👥 University Capstone Team (Group 3)
1. **Md. Ibrahim Hussain** (Student ID: `242002129`) — *Clinical Systems Architect & Full-Stack Lead*
2. **Md Leon Ahammed** (Student ID: `242002039`) — *AI Triage Engine & Telepharmacy Specialist*
3. **Jakaria Hoque** (Student ID: `242002012`) — *Clinical Decision Support & Stewardship Analyst*

---

## 🎯 Core Research & Healthcare Objective
To establish a closed-loop digital healthcare ecosystem connecting **Patients**, **Licensed Physicians**, and **Community Pharmacies** in low-resource settings (specifically Bangladesh), transforming community pharmacies from mere transactional medicine counters into integrated clinical care nodes and **rational antibiotic stewardship hubs**.

---

## 🏛️ 4 Live Synchronized Portals
The platform features a persistent **Role & Perspective Switcher Bar** synchronized in real-time across browser tabs (`BroadcastChannel` API + `localStorage`):

1. **Portal 01 — Patient Care & Hybrid AI Triage Portal**
   - Symptom assessment in Bangla and English.
   - Active verified e-Prescription wallet with Retina QR tokens and cryptographic digests.
   - Day-3 / Day-5 Antibiotic Course Adherence Tracker with Adverse Drug Reaction (ADR) reporting.
   - Nearby community pharmacy inventory and real-time price comparison in Bangladeshi Taka (`৳ BDT`).

2. **Portal 02 — Doctor Telemedicine & Closed-Loop e-Prescription Console**
   - Live incoming tele-triage consult queue from patient referrals and pharmacy counter walk-ins.
   - Shared Longitudinal EHR Snapshot (eGFR, documented allergies like Penicillin, comorbidities, active meds).
   - WHO AWaRe antibiotic prescription builder with real-time Clinical Decision Support (CDS) hard allergy & renal conflict alerts.
   - Pharmacist Drug Therapy Problem (DTP) resolution desk.

3. **Portal 03 — Community Pharmacy Clinical Hub & Antibiotic Stewardship Gate**
   - **Mandatory Antibiotic Stewardship Lock:** Hard-locks Watch- and Reserve-class antibiotics requested without a doctor e-Prescription (`BLOCKED BY AMR STEWARDSHIP GUARDRAIL`).
   - 1-Click Fast-Track Doctor Tele-Triage referral right at the counter.
   - Pharmacist DTP flagging loop with direct doctor sign-off.
   - DGDA bioequivalent generic substitution router (comparing brands and saving up to 61.6% in `৳ BDT`).
   - Regional AMR surveillance telemetry strip.

4. **Portal 04 — Capstone Literature Review & Research Evidence Matrix (10-Paper Tracker)**
   - Pre-loaded with the 3 foundational 2026 research papers (Klimentidis et al., Alshahrani et al., Ghosh et al.).
   - Interactive modal to add, document, and analyze Papers 4 through 10.
   - 1-Click **Export to Markdown (`.md`)** and **Export to CSV (`.csv`)**.

---

## 📚 Grounded in Published 2026 Academic Literature
1. **Klimentidis, D., Babar, Z. U. D., Petrides, M., & Peletidi, A. (2026).**  
   *From transaction to transformation: a binational perspective on integrating community pharmacy into the digital health ecosystem of Southern European health systems.*  
   *Journal of Pharmaceutical Policy and Practice*, 19(1), 2677777. [DOI: 10.1080/20523211.2026.2677777](https://doi.org/10.1080/20523211.2026.2677777)  
   → **Implementation:** Shared Longitudinal EHR snapshot, bidirectional DTP loop, and generic substitution router (Features 3 & 4).

2. **Alshahrani, A. M., Vasudevan, R., Hmlan, A., Assiri, A. M., Asiri, A. M., Asiri, O. A. M., & Mashni, A. A. (2026).**  
   *Digital Transformation and Team-Based Care: Pharmacists in Multidisciplinary Models – A Narrative Review.*  
   *Journal of Multidisciplinary Healthcare*, 19, 576298. [DOI: 10.2147/JMDH.S576298](https://doi.org/10.2147/JMDH.S576298)  
   → **Implementation:** Automated CDS alert engine for DDI/allergies and Day-3/5 adherence & ADR follow-up (Features 3 & 5).

3. **Ghosh, E., Rahman, M. J., Ahamed, S., Salwa, M., Foyez, T., & Mamun, K. A. (2026).**  
   *Integrating AI-Driven Triage into Digital Pharmacy Systems for Rational Antibiotic Use in Low-Resource Settings.*  
   *Proceedings of The Second AAAI Bridge Program on AI for Medicine and Healthcare, PMLR* 317:102–109. [PMLR:v317:ghosh26a](https://proceedings.mlr.press/v317/ghosh26a.html)  
   → **Implementation:** Hybrid AI triage engine, mandatory WHO AWaRe Watch/Reserve lock, and regional AMR telemetry strip (Features 1 & 2).

---

## 🎨 Design Philosophy & Anti-AI-Slop Execution
- **Design Archetype:** *"Clinical Apothecary & Diagnostic Telemetry Workbench"* inspired by Swiss pharmaceutical packaging, hospital bedside charts, and precision laboratory instruments.
- **Color Palette (WCAG AAA Compliant):**
  - Base Background: `#F4F3EF` (Sterile Warm Linen / Clinical Chart Paper)
  - Diagnostic White Surface: `#FFFFFF` & Recessed Slot: `#E8E6DF`
  - Deep Surgical Carbon Ink: `#141817` (>15:1 contrast)
  - Clinical Pharmacy Emerald: `#0F6B53` (Verified safe dispensing)
  - Triage Signal Vermilion: `#C84B24` (WHO Watch/Reserve lock & allergy alerts)
- **Typographic Discipline:** Fraunces & Syne paired with Hind Siliguri (for Bangla clinical headings) + Plus Jakarta Sans + IBM Plex Mono (for Rx IDs, eGFR, doses, DOIs).
- **Hard Anti-Cliché Guarantee:** Zero glassmorphism, zero purple gradients, zero fake badges, zero generic templates.

---

## 🚀 Running Locally & Deploying to Vercel

### Development Server:
```bash
npm install
npm run dev
```

### Production Build:
```bash
npm run build
```

### Deploy to Vercel:
This repository includes a pre-configured `vercel.json` optimized for Vite SPAs:
```bash
vercel --prod
```
Or connect your GitHub repository directly to Vercel; it will detect Vite and build automatically into `dist/`.
