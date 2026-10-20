import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

interface Position {
  top: number;
  left: number;
  focusId: string | null;
  width: number;
  height: number;
}

export default function NavigationEffects() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, Position>());
  const previousPath = useRef(location.pathname);
  const positionKey = `${location.key}:${location.pathname}${location.search}${location.hash}`;

  useLayoutEffect(() => {
    const { pathname, hash } = location;
    const routeChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    const saved = positions.current.get(positionKey);
    const remember = () => {
      positions.current.set(positionKey, {
        top: window.scrollY,
        left: window.scrollX,
        width: window.innerWidth,
        height: window.innerHeight,
        focusId:
          document.activeElement instanceof HTMLElement
            ? document.activeElement.id || null
            : null,
      });
      if (positions.current.size > 100)
        positions.current.delete(positions.current.keys().next().value!);
    };
    // Capture before a link changes the DOM, and preserve the last scroll position.
    document.addEventListener("click", remember, true);
    window.addEventListener("scroll", remember, { passive: true });
    const frame = requestAnimationFrame(() => {
      if (navigationType === "POP" && saved) {
        const target = saved.focusId
          ? document.getElementById(saved.focusId)
          : document.getElementById("main");
        if (
          target &&
          (saved.width !== window.innerWidth ||
            saved.height !== window.innerHeight)
        )
          target.scrollIntoView({ behavior: "instant", block: "center" });
        else
          window.scrollTo({
            top: saved.top,
            left: saved.left,
            behavior: "instant",
          });
        target?.focus({ preventScroll: true });
      } else if (hash) {
        let id = hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {
          /* Malformed fragments must not break navigation. */
        }
        const target = document.getElementById(id);
        target?.scrollIntoView({ behavior: "auto", block: "start" });
        target?.focus({ preventScroll: true });
      } else if (routeChanged) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }
      remember();
    });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", remember, true);
      window.removeEventListener("scroll", remember);
    };
  }, [location, navigationType, positionKey]);
  return null;
}
