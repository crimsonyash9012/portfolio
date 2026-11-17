import { ArrowUp } from "lucide-react";

const Footer = () => (
  <footer className="portfolio-footer">
    <small data-scroll-reveal="rise">© {new Date().getFullYear()} Yash Kumar Gola</small>
    <a className="text-link" data-scroll-reveal="rise" href="#home">Back to top <ArrowUp aria-hidden="true" /></a>
  </footer>
);

export default Footer;
