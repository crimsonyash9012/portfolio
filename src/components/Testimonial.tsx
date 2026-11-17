import ScrollWords from "@/components/ScrollWords";

const Testimonial = () => (
  <section id="testimonial" tabIndex={-1} className="portfolio-section testimonial-section" aria-labelledby="testimonial-title">
    <h2 className="small-label" id="testimonial-title" data-scroll-reveal="rise">Client feedback</h2>
    <div className="testimonial">
      <p className="testimonial-pull" aria-hidden="true">
        <span className="testimonial-quote-mark" data-scroll-reveal="rise">“</span>
        <ScrollWords>Valuable</ScrollWords><br /><ScrollWords>contributions</ScrollWords>
      </p>
      <figure data-scroll-reveal="glide">
        <blockquote>
          “Yash made valuable contributions to the development of OASIS, including research database integrations, PRISMA workflows, and study-management functionality.”
        </blockquote>
        <figcaption>
          <span className="testimonial-stars" aria-hidden="true">★★★★★</span>
          <span>5.0 out of 5 · OASIS client on Upwork</span>
        </figcaption>
      </figure>
    </div>
    <dl className="portfolio-metrics">
      <div data-scroll-reveal="rise"><dt>Research search providers integrated for OASIS</dt><dd>9</dd></div>
      <div data-scroll-reveal="rise"><dt>Automated tests covering Human Atlas workflows</dt><dd>32</dd></div>
      <div data-scroll-reveal="rise"><dt>OASIS client rating on Upwork</dt><dd>5.0</dd></div>
    </dl>
  </section>
);

export default Testimonial;
