import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";

export default function SiteHeader() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1100) {
        const focused = document.activeElement;
        const focusedMobileLink =
          focused instanceof HTMLAnchorElement && focused.closest("#mobile-nav")
            ? focused
            : null;
        const focusedToggle = focused === menuButton.current;
        setOpen(false);
        if (focusedMobileLink) {
          const destination = focusedMobileLink.getAttribute("href");
          const desktopLink = Array.from(
            header.current?.querySelectorAll<HTMLAnchorElement>(
              ".desktop-nav a",
            ) ?? [],
          ).find((link) => link.getAttribute("href") === destination);
          const fallback = header.current?.querySelector<HTMLAnchorElement>(
            destination === "#contact" ? ".nav-contact" : ".wordmark",
          );
          (desktopLink ?? fallback)?.focus();
        } else if (focusedToggle)
          header.current
            ?.querySelector<HTMLAnchorElement>(".wordmark")
            ?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onOutside);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  return (
    <header
      className="site-header"
      ref={header}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <a href="#top" className="wordmark" aria-label="Aakash Prathipati, home">
        aakash<span aria-hidden="true"> / </span>prathipati
        <span className="brand-dot" aria-hidden="true">
          .
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <a
            href={`#${item.id}`}
            key={item.id}
            aria-current={active === item.id ? "location" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a
        className="nav-contact"
        href="#contact"
        aria-current={active === "contact" ? "location" : undefined}
      >
        Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <button
        ref={menuButton}
        className="menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {[...navigation, { label: "Contact", id: "contact" }].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  );
}
