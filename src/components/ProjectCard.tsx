import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { PortfolioProject } from "@/data/projects";
import { projectDestination } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";

export default function ProjectCard({
  project,
}: {
  project: PortfolioProject;
}) {
  const { href: destination, hosted: external } = projectDestination(project);
  const titleId = `project-title-${project.slug}`;
  return (
    <article className="project-card">
      <Link
        id={`project-${project.slug}`}
        className="project-link"
        to={destination}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-labelledby={titleId}
      >
        <div className="project-image-link">
          <ProjectVisual theme={project.theme} label={project.label} />
          <span className="project-open" aria-hidden="true">
            <ArrowUpRight size={22} />
          </span>
        </div>
        <div className="project-info">
          <p className="eyebrow">{project.category}</p>
          <h3 id={titleId}>
            {project.name}
            <ArrowUpRight size={21} aria-hidden="true" />
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </h3>
          <p className="project-description">{project.description}</p>
          <ul className="tags" aria-label={`${project.name} technologies`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
