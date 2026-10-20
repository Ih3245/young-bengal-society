// Academic Literature Matrix Exporter (Markdown & CSV)

export function exportPapersToMarkdown(papers = [], teamInfo = {}) {
  let md = `# ${teamInfo.projectTitle || "Digital Healthcare Platform"} — Literature Review Evidence Matrix\n\n`;
  md += `**University Capstone Team (Group 3):**\n`;
  if (teamInfo.members) {
    teamInfo.members.forEach((m) => {
      md += `- ${m.name} (ID: ${m.id}) — *${m.role}*\n`;
    });
  }
  md += `\n**Academic Session:** ${teamInfo.academicTerm || "2025–2026"}\n`;
  md += `**Export Timestamp:** ${new Date().toISOString()}\n\n`;
  md += `## Evidence Synthesis Summary\n\n`;
  md += `This matrix maps foundational and recent 2026 research publications to the architectural and algorithmic components of the Unified Digital Healthcare Platform.\n\n`;
  md += `| ID | Year | Primary Citation | Journal / Venue | Platform Implementation Mapping | Status |\n`;
  md += `|:---|:---|:---|:---|:---|:---|\n`;

  papers.forEach((p) => {
    md += `| **${p.id}** | ${p.year} | ${p.citation} | *${p.journal}* | ${p.platformMapping} | \`${p.status}\` |\n`;
  });

  md += `\n---\n\n## Detailed Paper Profiles & Research Gap Analysis\n\n`;

  papers.forEach((p, idx) => {
    md += `### [${idx + 1}] ${p.title}\n`;
    md += `- **Citation:** ${p.citation}\n`;
    md += `- **Journal / Venue:** ${p.journal} (${p.year})\n`;
    md += `- **Identifier (DOI/URL):** [${p.doi}](${p.url})\n`;
    md += `- **Study Design:** ${p.studyDesign || "Empirical study"}\n`;
    md += `- **Core Finding:** ${p.coreFinding}\n`;
    md += `- **Identified Gap in Prior Systems:** ${p.researchGap}\n`;
    md += `- **How Our Platform Solves It:** ${p.platformMapping}\n`;
    md += `- **Implementation Status:** ${p.status}\n\n`;
  });

  return md;
}

export function exportPapersToCSV(papers = []) {
  const headers = [
    "ID",
    "Year",
    "Citation",
    "Title",
    "Journal_Venue",
    "DOI_or_Identifier",
    "URL",
    "Study_Design",
    "Core_Finding",
    "Research_Gap",
    "Platform_Implementation_Mapping",
    "Status"
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const stringVal = String(val).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const rows = papers.map((p) => [
    p.id,
    p.year,
    p.citation,
    p.title,
    p.journal,
    p.doi,
    p.url,
    p.studyDesign,
    p.coreFinding,
    p.researchGap,
    p.platformMapping,
    p.status
  ]);

  const csvContent = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(","))
  ].join("\n");

  return csvContent;
}

export function triggerDownload(content, filename, mimeType = "text/plain;charset=utf-8;") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
