import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function NotFound() {
  usePageMeta({
    title: "Page not found — Aakash Prathipati",
    description:
      "This page could not be found. Return to Aakash Prathipati's AI engineering portfolio to explore projects, experience, and credentials.",
    noIndex: true,
  });
  return (
    <main id="main" tabIndex={-1} className="project-placeholder">
      <Link to="/" className="text-link">
        <ArrowLeft size={18} aria-hidden="true" /> Back to portfolio
      </Link>
      <div>
        <p className="eyebrow">404 / PAGE NOT FOUND</p>
        <h1>This page isn’t here.</h1>
        <p>
          The address may have changed. Return to the portfolio to explore the
          projects, experience, and credentials.
        </p>
        <span className="placeholder-mark" aria-hidden="true">
          ✳
        </span>
      </div>
      <Link to="/#projects" className="text-link">
        Explore projects <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
