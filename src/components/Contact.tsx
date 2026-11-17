import { ArrowUpRight } from "lucide-react";
import ScrollWords from "@/components/ScrollWords";

const email = "yashkrgola9012@gmail.com";

const profiles = [
  { name: "GitHub", url: "https://github.com/crimsonyash9012" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/yash-kumar-gola-480940282" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~01d3b996bcec5064ad" },
];

const Contact = () => (
  <section id="contact" className="portfolio-section contact-section" aria-labelledby="contact-title">
    <div className="contact-meta" data-scroll-reveal="rise"><p>Yash Kumar Gola</p><p>Delhi, India · UTC+5:30</p></div>
    <h2 className="contact-display" id="contact-title">
      <ScrollWords>Something</ScrollWords>{" "}<ScrollWords>worth building?</ScrollWords>
    </h2>
    <a className="contact-email" data-scroll-reveal="rise" href={`mailto:${email}`}>
      <span>{email}</span><ArrowUpRight aria-hidden="true" />
    </a>
    <div className="contact-links">
      <nav aria-label="Footer navigation" data-scroll-reveal="rise">
        <p className="small-label">Explore</p>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
        </ul>
      </nav>
      <div data-scroll-reveal="rise">
        <p className="small-label">Connect</p>
        <ul>
          {profiles.map(({ name, url }) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {name} <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Contact;
