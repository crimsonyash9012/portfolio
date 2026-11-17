import { ArrowUpRight } from "lucide-react";

const Navigation = () => (
  <header className="masthead">
    <a className="masthead-name" href="#home" aria-label="Yash Kumar Gola, home">
      <span className="brand-mark" aria-hidden="true" />
    </a>
    <nav className="masthead-nav" aria-label="Main navigation">
      <a href="#projects">Work</a>
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#contact">Contact</a>
    </nav>
    <a className="pill masthead-cta" href="#contact">Get in touch <ArrowUpRight aria-hidden="true" /></a>
  </header>
);

export default Navigation;
