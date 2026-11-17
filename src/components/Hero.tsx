import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { drawHeroMark } from "@/lib/portfolioMark";

const beats = [
  { text: "Start with the workflow.", start: 0.12, end: 0.38 },
  { text: "Connect the moving parts.", start: 0.38, end: 0.65 },
  { text: "Ship with tests in place.", start: 0.65, end: 0.94 },
];

const Hero = () => {
  const journey = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const degrees = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = journey.current;
    const screen = stage.current;
    const picture = canvas.current;
    const counter = degrees.current;
    if (!section || !screen || !picture || !counter) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0 };
    let frame = 0;
    let lastProgress = -1;
    let lastWidth = 0;
    let lastHeight = 0;

    const render = () => {
      frame = 0;
      const travel = section.offsetHeight - screen.offsetHeight;
      const progress = travel > 0 && !reducedMotion.matches
        ? Math.min(1, Math.max(0, (screen.getBoundingClientRect().top - section.getBoundingClientRect().top) / travel))
        : 0;

      if (progress !== lastProgress) {
        screen.dataset.beat = String(progress < 0.12 ? 0 : progress < 0.38 ? 1 : progress < 0.65 ? 2 : 3);
        screen.style.setProperty("--paper-reveal", String(Math.max(0, (progress - 0.88) / 0.12)));
        screen.style.setProperty("--opening-opacity", String(Math.max(0, Math.min(1, (0.12 - progress) / 0.075))));
        beats.forEach(({ start, end }, index) => {
          const alpha = Math.max(0, Math.min(1, (progress - start) / 0.05, (end - progress) / 0.05));
          screen.style.setProperty(`--beat-${index + 1}`, String(alpha));
        });
        counter.textContent = String(Math.round(progress * 180)).padStart(3, "0") + "°";
        lastProgress = progress;
      }

      drawHeroMark(picture, progress, reducedMotion.matches ? { x: 0, y: 0 } : pointer);
      lastWidth = picture.clientWidth;
      lastHeight = picture.clientHeight;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const scroll = () => {
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) schedule();
    };

    const move = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      const rect = screen.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    };

    const leave = () => {
      pointer.x = 0;
      pointer.y = 0;
      schedule();
    };

    const resize = new ResizeObserver(() => {
      if (picture.clientWidth !== lastWidth || picture.clientHeight !== lastHeight) schedule();
    });
    resize.observe(picture);
    screen.addEventListener("pointermove", move);
    screen.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { capture: true, passive: true });
    reducedMotion.addEventListener("change", schedule);
    render();

    return () => {
      resize.disconnect();
      screen.removeEventListener("pointermove", move);
      screen.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll, true);
      reducedMotion.removeEventListener("change", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero-journey" id="home" ref={journey} aria-labelledby="hero-title">
      <div className="hero-stage" ref={stage} data-beat="0">
        <canvas className="hero-canvas" ref={canvas} aria-hidden="true" />

        <div className="hero-meta">
          <p>Full-stack developer</p>
          <p>Delhi, India · UTC+5:30</p>
        </div>

        <h1 className="hero-display hero-opening" id="hero-title">
          <span className="sr-only">Yash Kumar Gola. </span>
          <span className="hero-line hero-line-start">I design systems.</span>{" "}
          <span className="hero-line hero-line-end">I build them.</span>
        </h1>

        <div className="hero-beats" aria-hidden="true">
          {beats.map(({ text }, index) => (
            <p className="hero-beat" data-line={index + 1} key={text}>{text}</p>
          ))}
        </div>

        <p className="hero-statement hero-opening">
          I’m Yash Kumar Gola. I build web apps and APIs for AI and research workflows.
        </p>

        <a className="hero-scroll" href="#projects">
          <span className="hero-degrees" ref={degrees} aria-hidden="true">000°</span>
          <span>Scroll to explore <ArrowDown aria-hidden="true" /></span>
        </a>

        <a className="pill pill-filled hero-cta" href="#contact">
          Get in touch <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="hero-paper-reveal" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Hero;
