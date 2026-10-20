import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { projects } from "@/data/projects";
import {
  certifications,
  education,
  experience,
  profile,
  toolkit,
} from "@/data/profile";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import ProjectCard from "@/components/ProjectCard";
import CredentialCard from "@/components/CredentialCard";
import portrait from "@/assets/profile-photo.jpg";
import internship from "@/assets/internship-cert.webp";
import { usePageMeta } from "@/hooks/use-page-meta";

function SectionHeading({
  id,
  label,
  title,
}: {
  id: string;
  label: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2 id={id}>{title}</h2>
      </div>
    </div>
  );
}

export default function Portfolio() {
  usePageMeta({
    title: `${profile.name} — ${profile.role}`,
    description: profile.metaDescription,
  });
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" /> AI ENGINEER
            </p>
            <h1 id="hero-title">
              Aakash <br />
              <em>Prathipati.</em>
            </h1>
            <p className="hero-description">{profile.summary}</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#projects">
                Explore projects <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <a className="text-link" href="#contact">
                Get in touch <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="portrait-composition">
            <div className="portrait-frame">
              <img
                src={portrait}
                alt="Aakash Prathipati"
                width="1010"
                height="999"
                loading="eager"
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
              <span className="portrait-cross top-cross" aria-hidden="true">
                +
              </span>
              <span className="portrait-cross bottom-cross" aria-hidden="true">
                +
              </span>
            </div>
            <div className="portrait-caption">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
              >
                <Github size={19} aria-hidden="true" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
              >
                <Linkedin size={19} aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section
          id="projects"
          tabIndex={-1}
          className="section-shell section-space"
          aria-labelledby="projects-title"
        >
          <SectionHeading
            id="projects-title"
            label="01 / SELECTED WORK"
            title="Projects"
          />
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </section>

        <section
          id="experience"
          tabIndex={-1}
          className="experience-section"
          aria-labelledby="experience-title"
        >
          <div className="section-shell section-space">
            <SectionHeading
              id="experience-title"
              label="02 / IN PRACTICE"
              title="Work experience"
            />
            <div className="experience-layout">
              <div className="experience-meta">
                <p className="experience-period">{experience.period}</p>
                <h3>{experience.company}</h3>
                <p>{experience.location}</p>
                <a
                  className="experience-certificate"
                  href={experience.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={internship}
                    alt="GoldLighT Technologies internship completion certificate"
                    width="1011"
                    height="715"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-link">
                    View internship certificate{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
              <div className="experience-body">
                <h3>{experience.role}</h3>
                <ol className="experience-points">
                  {experience.points.map((point, index) => (
                    <li key={point.title}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4>{point.title}</h4>
                        <p>{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          tabIndex={-1}
          className="section-shell section-space"
          aria-labelledby="skills-title"
        >
          <SectionHeading
            id="skills-title"
            label="03 / TECHNICAL TOOLKIT"
            title="Technical skills"
          />
          <div className="toolkit-grid">
            {toolkit.map((group, index) => (
              <article className="toolkit-card" key={group.title}>
                <span className="toolkit-number" aria-hidden="true">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="education"
          tabIndex={-1}
          className="about-section"
          aria-labelledby="education-title"
        >
          <div className="section-shell section-space">
            <SectionHeading
              id="education-title"
              label="04 / ACADEMIC BACKGROUND"
              title="Education"
            />
            <div className="about-layout">
              <div className="education">
                {education.map((item) => (
                  <article key={item.degree}>
                    <p className="education-period">{item.period}</p>
                    <h3>{item.degree}</h3>
                    <p>{item.institution}</p>
                    <p>{item.location}</p>
                    <p className="education-grade">
                      <strong>{item.cgpa}</strong>
                      <span>CGPA</span>
                    </p>
                  </article>
                ))}
              </div>
              <div>
                <div className="languages">
                  <h3>Languages</h3>
                  <ul>
                    <li>
                      English <span>Fluent</span>
                    </li>
                    <li>
                      Telugu <span>Native</span>
                    </li>
                    <li>
                      Hindi <span>Fluent</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="certifications"
          tabIndex={-1}
          className="section-shell section-space"
          aria-labelledby="certifications-title"
        >
          <SectionHeading
            id="certifications-title"
            label="05 / CREDENTIALS"
            title="Certifications"
          />
          <div className="credential-grid">
            {certifications.map((cert) => (
              <CredentialCard certification={cert} key={cert.id} />
            ))}
          </div>
        </section>
        <ContactSection />
      </main>
      <footer className="site-footer section-shell">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top">
          Back to top <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
