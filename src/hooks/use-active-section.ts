import { useEffect, useState } from "react";

const sectionIds = [
  "projects",
  "experience",
  "skills",
  "education",
  "certifications",
  "contact",
];

export function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const boundary = Math.min(window.innerHeight * 0.35, 240);
      let current: string | null = null;
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= boundary)
          current = id;
      }
      if (
        document.documentElement.scrollHeight > window.innerHeight &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 3
      )
        current = "contact";
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return active;
}
