import salesforce from "@/assets/salesforce-cert.webp";
import aviatrix from "@/assets/aviatrix-cert.webp";
import automation from "@/assets/automation-cert.webp";
import oracle from "@/assets/oracle-cert.webp";
import quantum from "@/assets/quantum-certificate.webp";
import quantumOriginal from "@/assets/quantum-certificate.png";

export const profile = {
  name: "Aakash Prathipati",
  role: "AI Engineer",
  metaDescription:
    "AI Engineer Aakash Prathipati builds computer vision, generative AI, data engineering, and security analytics systems. Explore projects and experience.",
  email: "aakashprathipatipvt@gmail.com",
  github: "https://github.com/aakashprathipati",
  linkedin: "https://www.linkedin.com/in/aakash-prathipati-431616344/",
  summary:
    "I build computer vision, generative AI, and data engineering systems for medical imaging, geospatial analysis, and security analytics.",
};

export const navigation = [
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Education", id: "education" },
  { label: "Certifications", id: "certifications" },
] as const;

export const experience = {
  certificateUrl:
    "https://drive.google.com/file/d/1JXWM7_SNdktCeCLXVV88TTLkSdrHcYfR/view?usp=sharing",
  company: "Gold Light Technologies",
  role: "Research Programmer Intern",
  period: "July – November 2025",
  location: "Bengaluru, India",
  points: [
    {
      title: "AI across two domains",
      description:
        "Engineered and deployed flood assessment and cancer detection systems, converting satellite and medical imagery into actionable intelligence.",
    },
    {
      title: "Pixel-level segmentation",
      description:
        "Trained specialized PyTorch models for precise semantic segmentation in disaster management and healthcare diagnostics.",
    },
    {
      title: "Human-readable reasoning",
      description:
        "Implemented a logic layer that translates AI outputs into clear reports and recommendations.",
    },
    {
      title: "Modular architecture",
      description:
        "Decoupled frontend, backend, and model layers so models could be updated without disrupting production.",
    },
    {
      title: "Reliable deployment",
      description:
        "Used containerization strategies to improve reliability across environments and reduce deployment pipeline complexity.",
    },
  ],
};

export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Koneru Lakshmaiah University",
    location: "Vijayawada",
    period: "2022 – 2026",
    cgpa: "8.9",
  },
  {
    degree: "BBA in Finance",
    institution: "Koneru Lakshmaiah University",
    location: "Vijayawada",
    period: "2023 – 2026",
    cgpa: "8.3",
  },
];

export const skillAreas = [
  "Full Stack Web Development",
  "AI & Machine Learning",
  "Data Analysis",
  "Data Engineering",
  "DevOps",
  "Cloud Computing",
];

export const certifications = [
  {
    id: "oracle",
    imageWidth: 1165,
    imageHeight: 900,
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle University",
    date: "2026",
    image: oracle,
    link: "https://drive.google.com/file/d/1HMzb2IqoUbRzgWf_cun50E6kLAbzv5W2/view?usp=sharing",
  },
  {
    id: "quantum",
    imageWidth: 1165,
    imageHeight: 900,
    title: "Quantum Fundamentals",
    issuer: "Amaravati Quantum Valley · Qubitech · WISER",
    date: "February 2026",
    image: quantum,
    link: quantumOriginal,
  },
  {
    id: "automation",
    imageWidth: 1160,
    imageHeight: 900,
    title: "Certified Essentials Automation Professional",
    issuer: "Automation Anywhere",
    date: "July 2025",
    image: automation,
    link: "https://certificates.automationanywhere.com/37aae1ab-3b31-4d4d-b6d1-f7220b1a0792#acc.JzOA8UNd",
  },
  {
    id: "aviatrix",
    imageWidth: 1165,
    imageHeight: 900,
    title: "Multicloud Network Associate",
    issuer: "Aviatrix",
    date: "January 2025",
    image: aviatrix,
    link: "https://drive.google.com/file/d/1d5Q9jUpM7l9igA23RtyP9AoQH3jJuYeu/view?usp=sharing",
  },
  {
    id: "salesforce",
    imageWidth: 1200,
    imageHeight: 670,
    title: "AI Associate",
    issuer: "Salesforce",
    date: "October 2024",
    image: salesforce,
    link: "https://drive.google.com/file/d/1DkEzuJMdsSZOovWNu9V4qVC2IFTfTA2y/view?usp=sharing",
  },
];
