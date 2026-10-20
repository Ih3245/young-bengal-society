import React, { useState } from 'react';
import { useClinical } from '../../context/ClinicalContext';
import {
  exportPapersToMarkdown,
  exportPapersToCSV,
  triggerDownload
} from '../../utils/exportUtils';
import {
  BookOpen,
  Download,
  ExternalLink,
  Plus,
  FileSpreadsheet,
  FileText,
  Search,
  CheckCircle2,
  Users,
  Award,
  Link as LinkIcon
} from 'lucide-react';

export const ResearchMatrix = () => {
  const {
    language,
    researchPapers,
    addResearchPaper,
    teamInfo
  } = useClinical();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Paper Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCitation, setNewCitation] = useState('');
  const [newJournal, setNewJournal] = useState('');
  const [newYear, setNewYear] = useState(2026);
  const [newDoi, setNewDoi] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newStudyDesign, setNewStudyDesign] = useState('');
  const [newCoreFinding, setNewCoreFinding] = useState('');
  const [newResearchGap, setNewResearchGap] = useState('');
  const [newPlatformMapping, setNewPlatformMapping] = useState('');
  const [newStatus, setNewStatus] = useState('INTEGRATED_INTO_ARCHITECTURE');

  // Filter papers
  const filteredPapers = researchPapers.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.citation.toLowerCase().includes(q) ||
      p.platformMapping.toLowerCase().includes(q) ||
      p.journal.toLowerCase().includes(q)
    );
  });

  const handleCreatePaper = (e) => {
    e.preventDefault();
    if (!newTitle || !newCitation) return;

    addResearchPaper({
      title: newTitle,
      citation: newCitation,
      journal: newJournal || 'Independent Journal',
      year: Number(newYear),
      doi: newDoi || 'DOI-PENDING',
      url: newUrl || '#',
      studyDesign: newStudyDesign || 'Empirical study',
      coreFinding: newCoreFinding || 'Key clinical evidence contributing to telepharmacy model.',
      researchGap: newResearchGap || 'Unaddressed digital interoperability gap.',
      platformMapping: newPlatformMapping || 'General System Architecture',
      status: newStatus
    });

    // Reset Form
    setNewTitle('');
    setNewCitation('');
    setNewJournal('');
    setNewDoi('');
    setNewUrl('');
    setNewStudyDesign('');
    setNewCoreFinding('');
    setNewResearchGap('');
    setNewPlatformMapping('');
    setShowAddModal(false);
  };

  const handleExportMarkdown = () => {
    const md = exportPapersToMarkdown(researchPapers, teamInfo);
    triggerDownload(md, 'Capstone_Group3_Literature_Review_Matrix.md', 'text/markdown');
  };

  const handleExportCSV = () => {
    const csv = exportPapersToCSV(researchPapers);
    triggerDownload(csv, 'Capstone_Group3_Literature_Review_Matrix.csv', 'text/csv');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Capstone Team & Research Scope Banner */}
      <section className="clinical-card p-5 bg-white border border-[#141817]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#CFD2CE]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5A605D] uppercase tracking-wider mb-1">
              <span>PORTAL 04</span>
              <span>•</span>
              <span className="font-bold text-[#0F6B53]">ACADEMIC LITERATURE REVIEW MATRIX</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-[#141817]">
              {teamInfo.projectTitle}
            </h1>
            <p className="text-xs text-[#5A605D] mt-1">
              {teamInfo.academicTerm} • {teamInfo.institution}
            </p>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              className="clinical-btn clinical-btn-primary text-xs py-2 px-3 bg-[#0F6B53]"
            >
              <Download className="w-4 h-4" />
              <span>Export Markdown (.md)</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="clinical-btn clinical-btn-secondary text-xs py-2 px-3"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#0F6B53]" />
              <span>Export CSV (.csv)</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="clinical-btn clinical-btn-secondary text-xs py-2 px-3 border-[#141817] shadow-[2px_2px_0px_#141817]"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Research Paper ({researchPapers.length}/10)</span>
            </button>
          </div>
        </div>

        {/* University Capstone Group 3 Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 text-xs">
          {teamInfo.members.map((member, idx) => (
            <div key={idx} className="p-3 bg-[#F4F3EF] border border-[#CFD2CE] rounded">
              <span className="font-mono text-[10px] text-[#5A605D] uppercase block">
                RESEARCHER {idx + 1} • ID: {member.id}
              </span>
              <strong className="text-sm text-[#141817] block mt-0.5">{member.name}</strong>
              <span className="text-[11px] text-[#0F6B53] font-semibold block mt-0.5">{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Paper Counter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A605D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by author, gap, or feature..."
            className="clinical-input w-full pl-9 text-xs"
          />
        </div>

        <span className="font-mono text-xs font-bold text-[#5A605D]">
          Displaying {filteredPapers.length} of {researchPapers.length} Evidence Profiles (Target: 10 Papers)
        </span>
      </div>

      {/* Main Literature Review Evidence Cards Grid */}
      <div className="space-y-5">
        {filteredPapers.map((paper, idx) => (
          <article
            key={paper.id}
            className="clinical-card p-5 bg-white border border-[#141817] shadow-[2px_2px_0px_#141817] hover:shadow-[3px_3px_0px_#141817] transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-[#CFD2CE]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#141817] text-white rounded">
                    {paper.id}
                  </span>
                  <span className="font-mono text-xs text-[#5A605D]">
                    {paper.journal} ({paper.year})
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#E6F3EE] text-[#0F6B53] border border-[#0F6B53] rounded">
                    {paper.status}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold font-display text-[#141817] leading-snug">
                  {paper.title}
                </h2>
                <p className="text-xs text-[#5A605D] mt-0.5 font-medium">
                  {paper.citation}
                </p>
              </div>

              {/* Clickable DOI / PMLR Link */}
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F3EF] border border-[#141817] rounded text-xs font-mono font-bold text-[#141817] hover:bg-[#E8E6DF] transition-all shrink-0"
              >
                <span>DOI: {paper.doi.length > 20 ? paper.doi.slice(0, 18) + '...' : paper.doi}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0F6B53]" />
              </a>
            </div>

            {/* 3-Column Detailed Breakdown: Core Finding, Research Gap, Platform Implementation Mapping */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-3 bg-[#F4F3EF] border border-[#CFD2CE] rounded">
                <span className="font-mono text-[10px] font-bold uppercase text-[#5A605D] block mb-1">
                  CORE FINDING & EVIDENCE
                </span>
                <p className="text-[#141817] leading-relaxed">
                  {paper.coreFinding}
                </p>
              </div>

              <div className="p-3 bg-[#FAECE7] border border-[#C84B24]/40 rounded">
                <span className="font-mono text-[10px] font-bold uppercase text-[#C84B24] block mb-1">
                  IDENTIFIED RESEARCH GAP
                </span>
                <p className="text-[#141817] leading-relaxed">
                  {paper.researchGap}
                </p>
              </div>

              <div className="p-3 bg-[#E6F3EE] border border-[#0F6B53]/40 rounded">
                <span className="font-mono text-[10px] font-bold uppercase text-[#0F6B53] block mb-1">
                  HOW OUR PLATFORM IMPLEMENTS IT
                </span>
                <p className="text-[#141817] font-semibold leading-relaxed">
                  {paper.platformMapping}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Add Paper Modal / Form */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#141817] rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-[4px_4px_0px_#141817]">
            <div className="flex items-center justify-between pb-3 border-b border-[#CFD2CE] mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0F6B53]" />
                <h3 className="font-headline font-bold text-lg text-[#141817]">
                  Add Research Publication (Paper {researchPapers.length + 1} of 10)
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs font-mono font-bold px-2 py-1 bg-[#F4F3EF] border border-[#141817] rounded hover:bg-[#E8E6DF]"
              >
                Close (ESC)
              </button>
            </div>

            <form onSubmit={handleCreatePaper} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#141817] mb-1">
                  Full Paper Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Telepharmacy Interventions in Low-Resource Primary Care..."
                  className="clinical-input w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#141817] mb-1">
                    Citation (Authors & Format)
                  </label>
                  <input
                    type="text"
                    value={newCitation}
                    onChange={(e) => setNewCitation(e.target.value)}
                    placeholder="e.g. Rahman, A., & Hossain, M. (2026)"
                    className="clinical-input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#141817] mb-1">
                    Journal / Conference Venue & Year
                  </label>
                  <input
                    type="text"
                    value={newJournal}
                    onChange={(e) => setNewJournal(e.target.value)}
                    placeholder="e.g. Lancet Regional Health Southeast Asia, 2026"
                    className="clinical-input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#141817] mb-1">
                    DOI or Identifier
                  </label>
                  <input
                    type="text"
                    value={newDoi}
                    onChange={(e) => setNewDoi(e.target.value)}
                    placeholder="e.g. 10.1016/j.lansea.2026.100..."
                    className="clinical-input w-full font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#141817] mb-1">
                    Publication URL
                  </label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://doi.org/..."
                    className="clinical-input w-full font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#141817] mb-1">
                  Core Empirical Finding
                </label>
                <textarea
                  rows="2"
                  value={newCoreFinding}
                  onChange={(e) => setNewCoreFinding(e.target.value)}
                  placeholder="Summarize the quantitative/qualitative finding..."
                  className="clinical-input w-full"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#141817] mb-1">
                  Identified Research Gap in Prior Healthcare Systems
                </label>
                <textarea
                  rows="2"
                  value={newResearchGap}
                  onChange={(e) => setNewResearchGap(e.target.value)}
                  placeholder="What limitation in traditional EHRs or retail pharmacy was identified?"
                  className="clinical-input w-full"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#141817] mb-1">
                  How Our Platform Solves / Maps to this Paper
                </label>
                <textarea
                  rows="2"
                  value={newPlatformMapping}
                  onChange={(e) => setNewPlatformMapping(e.target.value)}
                  placeholder="e.g. Feature 3 (Shared Longitudinal EHR) and Feature 5 (Adherence Tracker)..."
                  className="clinical-input w-full"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="clinical-btn clinical-btn-secondary py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clinical-btn clinical-btn-primary py-2 px-4 bg-[#0F6B53]"
                >
                  Save & Insert into Matrix
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
