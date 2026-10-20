import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects, projectDestination } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import ProjectExplorer from "@/components/ProjectExplorer";
import ProjectVisual from "@/components/ProjectVisual";
import NotFound from "./NotFound";
import { profile } from "@/data/profile";
import { usePageMeta } from "@/hooks/use-page-meta";
import "@/case-study.css";

const sections = [
  ["overview", "Overview"],
  ["architecture", "Architecture"],
  ["explore", "Interactive example"],
  ["decisions", "Design decisions"],
  ["validation", "Validation & next steps"],
] as const;

export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  const study = project ? caseStudies[project.slug] : null;
  const destination = project ? projectDestination(project) : null;
  usePageMeta(
    project && study
      ? {
          title: `${project.name} — Aakash Prathipati`,
          description: `${project.category.split(" / ")[1]} case study by Aakash Prathipati. Explore the architecture, design decisions, and interactive example.`,
        }
      : null,
  );
  if (!project || !destination || !study) return <NotFound />;
  const nextProject = projects[(index + 1) % projects.length];
  return (
    <div
      className={`case-study case-${project.theme}`}
      id="case-top"
      tabIndex={-1}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="case-header section-shell">
        <Link to="/#projects" className="text-link">
          <ArrowLeft size={18} aria-hidden="true" /> Back to selected work
        </Link>
        <Link
          to="/"
          className="case-signature"
          aria-label="Aakash Prathipati, home"
        >
          Aakash Prathipati
        </Link>
      </header>
      <main id="main" tabIndex={-1}>
        <div className="case-hero section-shell">
          <div>
            <p className="eyebrow">
              {project.category} · ENGINEERING CASE STUDY
            </p>
            <h1>{project.name}</h1>
            <p className="case-summary">{study.summary}</p>
            <ul className="tags" aria-label="Project technologies">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="case-actions">
              <a className="button button-dark" href="#explore">
                Explore the example{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              {destination.hosted && (
                <a
                  className="text-link"
                  href={destination.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open project <ArrowUpRight size={17} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
          <div className="case-hero-visual">
            <ProjectVisual theme={project.theme} label={project.label} />
            <p>
              System focus <span>{project.category.split(" / ")[1]}</span>
            </p>
          </div>
        </div>
        <div className="case-layout section-shell">
          <aside className="case-sidebar">
            <nav aria-label="Case study contents">
              <p className="eyebrow">ON THIS PAGE</p>
              {sections.map(([id, label], i) => (
                <a href={`#${id}`} key={id}>
                  <span aria-hidden="true">0{i + 1}</span>
                  {label}
                </a>
              ))}
            </nav>
          </aside>
          <div className="case-content">
            <section
              id="overview"
              tabIndex={-1}
              className="case-section"
              aria-labelledby="overview-title"
            >
              <p className="eyebrow">01 / THE PROBLEM</p>
              <h2 id="overview-title">{study.headline}</h2>
              <p className="case-problem">{study.problem}</p>
              <p>{study.approach}</p>
              <div className="case-deliverables">
                {study.deliverables.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section
              id="architecture"
              tabIndex={-1}
              className="case-section"
              aria-labelledby="architecture-title"
            >
              <p className="eyebrow">02 / SYSTEM DESIGN</p>
              <h2 id="architecture-title">Follow the data.</h2>
              <p>
                Each stage produces an artifact the next stage can inspect. This
                diagram organizes the architecture described in the
                implementation notes.
              </p>
              <ol className="architecture-flow">
                {study.stages.map((stage, i) => (
                  <li key={stage.title}>
                    <span className="stage-number">0{i + 1}</span>
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                    <span className="stage-artifact">{stage.artifact}</span>
                  </li>
                ))}
              </ol>
              <h3 className="case-subheading">The stack, by responsibility</h3>
              <dl className="stack-list">
                {study.stack.map((item) => (
                  <div key={item.layer}>
                    <dt>{item.layer}</dt>
                    <dd>
                      <strong>{item.tools}</strong>
                      <p>{item.purpose}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
            <section
              id="explore"
              tabIndex={-1}
              className="case-section"
              aria-labelledby="explore-title"
            >
              <p className="eyebrow">03 / HANDS-ON</p>
              <h2 id="explore-title">Explore the mechanics.</h2>
              <p>
                A small working illustration of one central idea. Controls
                update the output locally; the full application and its model
                services are not running inside this portfolio.
              </p>
              <ProjectExplorer theme={project.theme} />
            </section>
            <section
              id="decisions"
              tabIndex={-1}
              className="case-section"
              aria-labelledby="decisions-title"
            >
              <p className="eyebrow">04 / ENGINEERING RATIONALE</p>
              <h2 id="decisions-title">Why these boundaries matter.</h2>
              <div className="decision-list">
                {study.decisions.map((item, i) => (
                  <article key={item.title}>
                    <span aria-hidden="true">0{i + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section
              id="validation"
              tabIndex={-1}
              className="case-section"
              aria-labelledby="validation-title"
            >
              <p className="eyebrow">05 / EVALUATION PLAN</p>
              <h2 id="validation-title">What needs to be proven.</h2>
              <p>
                These are the validation priorities for the described system,
                not a claim that benchmark results have been collected.
              </p>
              <div className="validation-grid">
                {study.checks.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
              <div className="case-limit">
                <h3>Scope & evidence</h3>
                <p>{study.limits}</p>
              </div>
              <div className="case-next-steps">
                <h3>Next engineering steps</h3>
                <ul>
                  {study.next.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <details className="technical-references">
                <summary>Technical references</summary>
                <p>
                  Background on the underlying techniques, rather than evidence
                  of this project’s results.
                </p>
                <ul>
                  {study.references.map((reference) => (
                    <li key={reference.url}>
                      <a
                        className="text-link"
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {reference.title}
                        <ArrowUpRight size={16} aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </section>
          </div>
        </div>
        <section
          className="case-next section-shell"
          aria-labelledby="next-project-title"
        >
          <div>
            <p className="eyebrow">CONTINUE EXPLORING</p>
            <h2 id="next-project-title">Next project</h2>
          </div>
          <Link to={`/projects/${nextProject.slug}`}>
            <span>{nextProject.name}</span>
            <ArrowRight size={28} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <footer className="case-footer section-shell">
        <Link className="text-link" to="/#projects">
          <ArrowLeft size={17} aria-hidden="true" /> All projects
        </Link>
        <a className="text-link" href={`mailto:${profile.email}`}>
          Discuss this project <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <a className="text-link" href="#case-top">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}
