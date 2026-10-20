import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects, projectDestination } from "@/data/projects";
import NotFound from "./NotFound";
import { profile } from "@/data/profile";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Project() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const destination = project ? projectDestination(project) : null;
  usePageMeta(
    project
      ? {
          title: `${project.name} — Aakash Prathipati`,
          description: destination?.hosted
            ? `Explore ${project.name}, a project by Aakash Prathipati, at its hosted address.`
            : `The project page for ${project.name} is coming soon. Explore Aakash Prathipati's portfolio for the project overview.`,
          noIndex: true,
        }
      : null,
  );
  if (!project || !destination) return <NotFound />;
  return (
    <main id="main" tabIndex={-1} className="project-placeholder">
      <Link to="/#projects" className="text-link">
        <ArrowLeft size={18} aria-hidden="true" /> Back to selected work
      </Link>
      <div>
        <p className="eyebrow">PROJECT / {project.category.split(" / ")[1]}</p>
        <h1>{project.name}</h1>
        <p>
          {destination.hosted
            ? "This project is available at its hosted address."
            : "This project page is coming soon."}
        </p>
        {destination.hosted && (
          <a
            className="button button-dark hosted-project-link"
            href={destination.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open project <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        <span className="placeholder-mark" aria-hidden="true">
          ✳
        </span>
      </div>
      <a className="text-link" href={`mailto:${profile.email}`}>
        Get in touch <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
