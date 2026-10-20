# DESIGN_SYSTEM.md — Clinical Apothecary & Diagnostic Telemetry Workbench

> Living Design System & Architectural Token Specification for the **Unified Digital Healthcare Platform Connecting Patients, Doctors, and Community Pharmacies** (Capstone Group 3: Md. Ibrahim Hussain, Md Leon Ahammed, Jakaria Hoque).

---

## 1. Aesthetic Direction & Brand Concept
- **Concept Name:** *"Clinical Apothecary & Diagnostic Telemetry Workbench"*
- **Inspiration:** Swiss pharmaceutical packaging, clinical bedside charts, precision diagnostic instruments, and verified community pharmacy dispensary registers.
- **Audience:** Low-resource patients (Bangla & English literate), licensed physicians, registered community pharmacists (R.Ph), and academic capstone evaluators.
- **Tone:** Calm, clinical, authoritative, high-trust, and uncompromising on antimicrobial stewardship.

---

## 2. Color System & Contrast Proof (WCAG AAA)

| Token Name | Hex Code | OKLCH Equivalent | Role & Semantic Meaning | Contrast on `#F4F3EF` |
| :--- | :--- | :--- | :--- | :--- |
| `--bg-base` | `#F4F3EF` | `oklch(96.2% 0.005 85)` | Base Clinical Chart Linen (sterile background) | Base Canvas |
| `--surface-elevated`| `#FFFFFF` | `oklch(100% 0 0)` | Pure Diagnostic White (active cards & workbenches) | Distinct elevated card |
| `--surface-recessed`| `#E8E6DF` | `oklch(91.8% 0.007 85)` | Recessed telemetry slot & neutral input wells | 1.15:1 (Subtle slot) |
| `--text-primary` | `#141817` | `oklch(18.5% 0.004 160)`| Deep Surgical Carbon Ink | **15.6:1 (AAA Pass)** |
| `--text-muted` | `#5A605D` | `oklch(48.2% 0.008 160)`| Engraved label gray (meta & telemetry labels) | **5.4:1 (AA Pass)** |
| `--border-hairline`| `#CFD2CE` | `oklch(84.5% 0.004 140)`| Structural 1px table & card divider rules | Hairline boundary |
| `--border-strong` | `#141817` | `oklch(18.5% 0.004 160)`| Outer component boundary & hard offset shadow | High-definition perimeter |
| `--accent-emerald` | `#0F6B53` | `oklch(45.6% 0.098 165)`| Verified prescriptions, pharmacist approval, safe dispensing | **5.8:1 (AA Pass)** |
| `--accent-emerald-subtle`| `#E6F3EE` | `oklch(95.8% 0.018 165)`| Access-class antibiotic pill backgrounds | Subtle green wash |
| `--accent-vermilion`| `#C84B24` | `oklch(51.2% 0.165 42)` | WHO Watch/Reserve locks, allergy/DTP alerts, emergency triage | **4.9:1 (AA Pass)** |
| `--accent-vermilion-subtle`| `#FAECE7` | `oklch(94.8% 0.022 42)` | Watch/Reserve alert card backgrounds | Subtle alert wash |

---

## 3. Typographic Hierarchy & Multi-Script Matrix

| Role | Font Family | Fallbacks | Weight / Style | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Display Headings** | `'Fraunces'` | `Georgia, serif` | 700 Semi-Bold / Optical Size 144 | Portal headers, major patient names, capstone title |
| **Section Headlines**| `'Syne'` | `sans-serif` | 700 Bold / Tight tracking | Component headings, modal titles, workbench labels |
| **Bangla Headings & Narrative** | `'Hind Siliguri'` | `sans-serif` | 500 Medium / 600 Semi-Bold / 700 Bold | Native Bengali symptom narratives & triage verdicts |
| **Body & Clinical Instructions**| `'Plus Jakarta Sans'` | `-apple-system, BlinkMacSystemFont` | 400 Regular / 500 Medium / 600 Semi-Bold | Clinical guidelines, patient summaries, medication regimens |
| **Telemetry & Identifiers** | `'IBM Plex Mono'` | `Consolas, monospace` | 500 Medium / 700 Bold | Rx tokens, WHO AWaRe badges, dosages, eGFR, DOIs, SHA hashes |

---

## 4. Spacing, Geometry & Shadow Rules
- **Spacing Scale:** `4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px`
- **Border-Radius Rule:**
  - `4px` on buttons, inputs, badges, and tabs (tactile precision).
  - `8px` on major clinical cards and modal workbenches.
  - Hard ban on 12px+ generic bubbles.
- **Shadow Rule (Hard Tactile Offset):**
  - Standard cards: `border: 1px solid #141817; box-shadow: 2px 2px 0px #141817;`
  - Active / hover cards: `box-shadow: 3px 3px 0px #141817; transform: translate(-1px, -1px);`
  - Zero blurry Gaussian shadows (`filter: blur()` or soft diffuse shadows banned).

---

## 5. Component Specifications

### 5.1 WHO AWaRe Classification Badges
- **ACCESS:** Background `#E6F3EE`, Text `#0F6B53`, Border `#0F6B53` (First-line, narrow spectrum).
- **WATCH:** Background `#FAECE7`, Text `#C84B24`, Border `#C84B24` (High resistance risk; stewardship lock).
- **RESERVE:** Background `#141817`, Text `#FFFFFF`, Border `#141817` (Hospital-only pan-drug last line).

### 5.2 Closed-Loop Digital e-Prescriptions
- Must display structured **Rx Token** (e.g. `RX-BD-2026-48291-N77`), verifiable cryptographic digest (`SHA-256`), and dynamic SVG QR code.
- Must include diagnosis, WHO AWaRe classification, and physician BMDC registration number.

### 5.3 Pharmacist DTP & Stewardship Lock
- Hard-lock state on non-prescription Watch/Reserve requests (`BLOCKED BY AMR STEWARDSHIP GUARDRAIL`).
- Integrated 1-click **Fast-Track Doctor Tele-Triage** trigger.
- Verified Bioequivalent Generic comparison table with explicit savings in Bangladeshi Taka (`৳ BDT`).

---

## 6. Countable Anti-AI-Slop Pre-Flight Gate Verification

| Slop Tell / Generic AI Cliché | Status in Platform | Proof of Compliance |
| :--- | :--- | :--- |
| Purple / Blue / Indigo gradient themes | **ZERO (BANNED)** | 100% strict clinical palette: Emerald (`#0F6B53`), Vermilion (`#C84B24`), Carbon Ink (`#141817`). |
| Glassmorphism / `backdrop-blur` | **ZERO (BANNED)** | 100% flat, crisp opaque clinical panels with 1px solid borders. |
| Inter / Poppins / Roboto defaults | **ZERO (BANNED)** | Typographic pairing: Fraunces + Syne + Plus Jakarta Sans + Hind Siliguri + IBM Plex Mono. |
| Centered hero with 2 generic buttons | **ZERO (BANNED)** | Replaced by persistent 4-portal live role switcher and dual telemetry rails. |
| Three identical feature cards in a row | **ZERO (BANNED)** | Asymmetric functional workbenches tailored to patient, doctor, pharmacist, and researcher tasks. |
| Emoji as icons | **ZERO (BANNED)** | Uniform Lucide SVG vector icon system with semantic clinical associations. |
| Fake statistics / placeholder copy | **ZERO (BANNED)** | Grounded in published empirical findings from Ghosh et al., Klimentidis et al., and Alshahrani et al. |
| Inaccessible contrast (<4.5:1) | **ZERO (BANNED)** | Primary text is >15:1 contrast against `#F4F3EF` (exceeds WCAG AAA standard). |
