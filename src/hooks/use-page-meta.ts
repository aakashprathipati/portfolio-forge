import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  noIndex?: boolean;
}

export function usePageMeta(meta: PageMeta | null) {
  const title = meta?.title;
  const description = meta?.description;
  const noIndex = meta?.noIndex ?? false;
  useEffect(() => {
    if (!title || !description) return;
    const previousTitle = document.title;
    const updates = [
      ["name", "description", description],
      ["name", "robots", noIndex ? "noindex, follow" : "index, follow"],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
    ];
    const restore = updates.map(([attribute, name, content]) => {
      const existing = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${name}"]`,
      );
      const element = existing ?? document.createElement("meta");
      const previousContent = element.getAttribute("content");
      element.setAttribute(attribute, name);
      element.content = content;
      if (!existing) document.head.append(element);
      return () => {
        if (!existing) element.remove();
        else if (previousContent === null) element.removeAttribute("content");
        else element.content = previousContent;
      };
    });
    document.title = title;
    return () => {
      document.title = previousTitle;
      restore.forEach((reset) => reset());
    };
  }, [title, description, noIndex]);
}
