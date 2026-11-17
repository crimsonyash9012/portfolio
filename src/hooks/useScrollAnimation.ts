import { useEffect, type RefObject } from "react";

const desktopLayout = "(min-width: 761px)";
const prefersReducedMotion = "(prefers-reduced-motion: reduce)";

export function useScrollAnimation(viewportRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !("IntersectionObserver" in window)) return;

    const targets = [...viewport.querySelectorAll<HTMLElement>("[data-scroll-reveal]")];
    const desktop = window.matchMedia(desktopLayout);
    const reducedMotion = window.matchMedia(prefersReducedMotion);
    let observer: IntersectionObserver | undefined;

    function observe() {
      observer?.disconnect();
      if (reducedMotion.matches) return;

      const root = desktop.matches ? viewport : null;
      const bounds = root?.getBoundingClientRect();
      const top = bounds?.top ?? 0;
      const height = bounds?.height ?? window.innerHeight;
      const revealLine = top + height - Math.min(56, height * 0.08);

      observer = new IntersectionObserver((entries, currentObserver) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio === 0) continue;
          const target = entry.target as HTMLElement;
          target.dataset.revealState = "entered";
          currentObserver.unobserve(target);
        }
      }, { root, rootMargin: `0px 0px -${Math.min(56, height * 0.08)}px 0px`, threshold: 0.015 });

      // Group geometry reads before writes so setting up reveals takes one layout pass.
      const items = targets.map((target) => ({
        target,
        pending: target.dataset.revealState !== "entered" &&
          target.getBoundingClientRect().top >= revealLine,
      }));
      for (const { target, pending } of items) {
        target.dataset.revealState = pending ? "pending" : "entered";
        if (pending) observer.observe(target);
      }
    }

    observe();
    desktop.addEventListener("change", observe);
    reducedMotion.addEventListener("change", observe);

    return () => {
      observer?.disconnect();
      desktop.removeEventListener("change", observe);
      reducedMotion.removeEventListener("change", observe);
      for (const target of targets) delete target.dataset.revealState;
    };
  }, [viewportRef]);
}

export function useSmoothPortfolioScroll(viewportRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const viewport = viewportRef.current;
    const frame = viewport?.parentElement;
    if (!viewport || !frame) return;

    const desktop = window.matchMedia(desktopLayout);
    const reducedMotion = window.matchMedia(prefersReducedMotion);
    let animationFrame = 0;
    let goal = 0;
    let position = 0;
    let lastWritten = 0;
    let lastTime = 0;

    const stop = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const step = (time: number) => {
      if (Math.abs(viewport.scrollTop - lastWritten) > 1) {
        stop();
        return;
      }

      const elapsed = Math.min(Math.max(0, time - lastTime), 40);
      const remaining = goal - position;
      lastTime = time;

      if (Math.abs(remaining) < 0.75) {
        viewport.scrollTo({ top: goal, behavior: "instant" });
        animationFrame = 0;
        return;
      }

      position += remaining * (1 - Math.exp(-elapsed / 69));
      viewport.scrollTo({ top: position, behavior: "instant" });
      lastWritten = viewport.scrollTop;
      animationFrame = window.requestAnimationFrame(step);
    };

    const wheel = (event: WheelEvent) => {
      const { deltaMode, deltaX, deltaY } = event;
      if (!desktop.matches || reducedMotion.matches || event.defaultPrevented ||
          !event.cancelable || event.ctrlKey || event.shiftKey ||
          Math.abs(deltaX) >= Math.abs(deltaY) ||
          (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]"))) {
        return;
      }

      const { scrollHeight, clientHeight, scrollTop } = viewport;
      if (animationFrame && Math.abs(scrollTop - lastWritten) > 1) stop();

      const unit = deltaMode === WheelEvent.DOM_DELTA_LINE ? 18
        : deltaMode === WheelEvent.DOM_DELTA_PAGE ? clientHeight : 1;
      const startingPoint = animationFrame ? goal : scrollTop;
      const next = Math.min(scrollHeight - clientHeight, Math.max(0, startingPoint + deltaY * unit));
      if (!animationFrame && next === scrollTop) return;

      event.preventDefault();
      goal = next;
      if (!animationFrame) {
        position = lastWritten = scrollTop;
        lastTime = performance.now();
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    frame.addEventListener("wheel", wheel, { passive: false });
    frame.addEventListener("pointerdown", stop, { passive: true });
    frame.addEventListener("keydown", stop);
    window.addEventListener("hashchange", stop);
    desktop.addEventListener("change", stop);
    reducedMotion.addEventListener("change", stop);

    return () => {
      stop();
      frame.removeEventListener("wheel", wheel);
      frame.removeEventListener("pointerdown", stop);
      frame.removeEventListener("keydown", stop);
      window.removeEventListener("hashchange", stop);
      desktop.removeEventListener("change", stop);
      reducedMotion.removeEventListener("change", stop);
    };
  }, [viewportRef]);
}
