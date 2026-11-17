import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const PointerDot = () => {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const root = document.documentElement;
    const mouse = window.matchMedia("(any-hover: hover) and (any-pointer: fine) and (forced-colors: none)");
    const activeClass = "portfolio-dot-active";

    const hide = () => {
      root.classList.remove(activeClass);
      delete dot.dataset.pressed;
    };

    const update = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !mouse.matches) {
        hide();
        return;
      }

      dot.style.translate = `${event.clientX}px ${event.clientY}px`;
      dot.toggleAttribute("data-pressed", event.buttons !== 0);
      root.classList.add(activeClass);
    };

    const leave = (event: PointerEvent) => {
      if (event.relatedTarget === null) hide();
    };

    const pointerEvents = ["pointermove", "pointerdown", "pointerup"] as const;
    for (const type of pointerEvents) {
      window.addEventListener(type, update, { passive: true, capture: true });
    }
    window.addEventListener("pointerout", leave, true);
    window.addEventListener("pointercancel", hide, true);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", hide);
    mouse.addEventListener("change", hide);

    return () => {
      hide();
      for (const type of pointerEvents) window.removeEventListener(type, update, true);
      window.removeEventListener("pointerout", leave, true);
      window.removeEventListener("pointercancel", hide, true);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", hide);
      mouse.removeEventListener("change", hide);
    };
  }, []);

  return createPortal(<div className="portfolio-pointer-dot" aria-hidden="true" ref={dotRef} />, document.body);
};

export default PointerDot;
