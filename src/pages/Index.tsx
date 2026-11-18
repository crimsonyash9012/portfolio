import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PointerDot from "@/components/PointerDot";
import { useScrollAnimation, useSmoothPortfolioScroll } from "@/hooks/useScrollAnimation";
import "./portfolio.css";

const Index = () => {
  const viewport = useRef<HTMLDivElement>(null);
  useScrollAnimation(viewport);
  useSmoothPortfolioScroll(viewport);

  return (
    <div className="portfolio-frame">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="portfolio" role="region" aria-label="Portfolio" tabIndex={0} ref={viewport}>
        <Navigation />
        <main id="main" tabIndex={-1}>
          <Hero viewportRef={viewport} />
          <Projects />
          <About />
          <Experience />
          <Testimonial />
          <Contact />
        </main>
        <Footer />
      </div>
      <PointerDot />
    </div>
  );
};

export default Index;
