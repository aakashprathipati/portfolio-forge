export interface PortfolioProject {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  theme: "pathology" | "flood" | "pipeline" | "security";
  label: string;
  url: string | null;
}

export function projectDestination(project: PortfolioProject) {
  if (project.url?.trim()) {
    try {
      const url = new URL(project.url.trim());
      if (url.protocol === "https:" || url.protocol === "http:")
        return { href: url.href, hosted: true };
    } catch {
      /* Keep incomplete URL edits on the local placeholder. */
    }
  }
  return { href: `/projects/${project.slug}`, hosted: false };
}

export const projects: PortfolioProject[] = [
  {
    slug: "pathology-diagnostics",
    name: "AI-Powered Pathology Diagnostic System",
    category: "01 / COMPUTER VISION",
    description:
      "Pixel-level delineation of pathological biomarkers with nnU-Net and PyTorch. An AI diagnostic layer turns raw scans into insights for clinical decision support.",
    tags: ["nnU-Net", "PyTorch", "Medical imaging"],
    theme: "pathology",
    url: null,
    label: "SCAN → SEGMENT → INTERPRET",
  },
  {
    slug: "flood-mapping",
    name: "Geospatial AI for Real-Time Flood Mapping",
    category: "02 / GEOSPATIAL AI",
    description:
      "DeepLabV3+ with Atrous Spatial Pyramid Pooling maps flood zones from multispectral satellite data. Synthetic Aperture Radar (SAR) imagery supports tracking even through cloud cover.",
    tags: ["DeepLabV3+", "ASPP", "SAR imagery"],
    theme: "flood",
    url: null,
    label: "OBSERVE → MAP → RESPOND",
  },
  {
    slug: "intelligent-etl",
    name: "Automated ETL & Predictive Structuring Pipeline",
    category: "03 / DATA ENGINEERING",
    description:
      "A Llama 3 schema-on-read pipeline transforms unstructured datasets into relational architectures. A staging-to-production framework preserves data lineage with Django ORM and Pandas.",
    tags: ["Llama 3", "Django ORM", "Pandas"],
    theme: "pipeline",
    url: null,
    label: "INGEST → NORMALIZE → VALIDATE",
  },
  {
    slug: "security-analytics",
    name: "AI-Driven Security Analytics & Threat Intelligence",
    category: "04 / SECURITY ANALYTICS",
    description:
      "Regex-based ingestion brings fragmented logs into a unified threat-tracking schema. Semantic intelligence separates attack vectors from routine anomalies and produces readable security audits.",
    tags: ["Python", "Regex", "Semantic intelligence"],
    theme: "security",
    url: null,
    label: "PARSE → CORRELATE → EXPLAIN",
  },
];
