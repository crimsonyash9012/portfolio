import { useEffect, useRef, useState } from "react";
import ScrollWords from "@/components/ScrollWords";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import { drawBlueprint } from "@/lib/portfolioMark";
import profile from "@/assets/yash-portrait.png";

function Blueprint() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [split, setSplit] = useState(54);

  useEffect(() => {
    const picture = canvas.current;
    if (!picture) return;
    const render = () => drawBlueprint(picture, split / 100);
    const resize = new ResizeObserver(render);
    resize.observe(picture);
    render();
    return () => resize.disconnect();
  }, [split]);

  return (
    <div className="blueprint">
      <canvas ref={canvas} data-scroll-reveal="scale" aria-hidden="true" />
      <div className="blueprint-intro">
        <h3><ScrollWords>From plan</ScrollWords><br /><ScrollWords>to production.</ScrollWords></h3>
        <p data-scroll-reveal="rise">Start with the workflow, then build and test the pieces that make it run.</p>
      </div>
      <div className="blueprint-control" data-scroll-reveal="rise">
        <label htmlFor="blueprint-split">Compare the wireframe and solid mark</label>
        <input
          id="blueprint-split"
          type="range"
          min="0"
          max="100"
          value={split}
          aria-valuetext={`${split}% solid`}
          onChange={(event) => setSplit(Number(event.currentTarget.value))}
        />
        <div className="blueprint-labels" aria-hidden="true"><span>Wireframe</span><span>Solid</span></div>
      </div>
    </div>
  );
}

const About = () => (
  <section id="about" className="about-section" aria-labelledby="about-title">
    <Blueprint />
    <div className="portfolio-section about-content">
      <div>
        <h2 className="section-title" id="about-title"><ScrollWords>About me.</ScrollWords></h2>
        <img className="about-portrait" data-scroll-reveal="scale" src={profile} alt="Yash Kumar Gola" width="882" height="940" loading="lazy" decoding="async" />
      </div>
      <div>
        <p className="about-intro" data-scroll-reveal="rise">
          I’m Yash, a full-stack developer and computer science student at Delhi Technological University.
          I work across React interfaces, backend APIs, and the systems that run them.
        </p>
        <Skills />
        <Services />
      </div>
    </div>
  </section>
);

export default About;
