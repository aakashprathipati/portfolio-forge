import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/profile";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const mounted = useRef(true);
  const request = useRef(0);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 4000);
    return () => window.clearTimeout(timer);
  }, [status]);
  const copy = async () => {
    const currentRequest = ++request.current;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(profile.email);
      if (mounted.current && currentRequest === request.current)
        setStatus("copied");
    } catch {
      if (mounted.current && currentRequest === request.current)
        setStatus("failed");
    }
  };
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="section-shell">
        <div className="contact-top">
          <p className="eyebrow">CONTACT</p>
        </div>
        <h2 id="contact-title">
          Get in touch.
          <ArrowUpRight className="contact-arrow" aria-hidden="true" />
        </h2>
        <div className="contact-bottom">
          <div className="email-container">
            <div className="email-group">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                type="button"
                onClick={copy}
                aria-label={
                  status === "copied" ? "Email copied" : "Copy email address"
                }
              >
                {status === "copied" ? (
                  <Check size={19} aria-hidden="true" />
                ) : (
                  <Copy size={19} aria-hidden="true" />
                )}
              </button>
            </div>
            <p className="copy-status" role="status" aria-live="polite">
              {status === "copied"
                ? "Email copied to clipboard."
                : status === "failed"
                  ? "Copy unavailable. You can select the email address above."
                  : ""}
            </p>
          </div>
          <div className="social-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
