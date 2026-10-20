import { ArrowUpRight } from "lucide-react";
import type { certifications } from "@/data/profile";
type Certification = (typeof certifications)[number];

export default function CredentialCard({
  certification: cert,
}: {
  certification: Certification;
}) {
  const titleId = `credential-title-${cert.id}`;
  const actionId = `credential-action-${cert.id}`;
  return (
    <article className="credential-card">
      <a
        className="credential-link"
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-labelledby={`${titleId} ${actionId}`}
      >
        <div className="credential-image">
          <img
            src={cert.image}
            alt=""
            loading="lazy"
            decoding="async"
            width={cert.imageWidth}
            height={cert.imageHeight}
          />
          <span aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="credential-info">
          <p className="eyebrow">{cert.issuer}</p>
          <h3 id={titleId}>{cert.title}</h3>
          <p className="credential-date">{cert.date}</p>
          <span id={actionId} className="text-link">
            {cert.id === "quantum" ? "View certificate" : "View credential"}
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </span>
        </div>
      </a>
    </article>
  );
}
