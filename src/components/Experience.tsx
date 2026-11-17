import ScrollWords from "@/components/ScrollWords";

const roles = [
  {
    title: "Software Development Intern",
    company: "Oasis.io",
    period: "May – Jul 2026",
    highlights: [
      "Improved reliability for a FastAPI and PostgreSQL service by adding dependency health checks, request tracing, Sentry alerts, and pre-release smoke tests.",
      "Grew the automated test suite from 8 to 44 modules and the database migration history from 1 to 14 migrations.",
      "Moved background processing to Celery and Redis workers and reduced unnecessary LLM calls with confidence-based triage and caching.",
    ],
  },
  {
    title: "Freelance Software Developer",
    company: "Oasis.io via Upwork",
    period: "Feb – Apr 2026",
    highlights: [
      "Integrated nine research search providers behind one interface with database-backed deduplication and rate-limit handling for NCBI imports.",
      "Built a transactional reset for systematic reviews that preserves source evidence and audit history across nine tables.",
      "Replaced an N+1 pattern that issued about 100 queries per dashboard load with batched aggregates.",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="portfolio-section split-section" aria-labelledby="experience-title">
    <h2 className="section-title" id="experience-title"><ScrollWords>Experience</ScrollWords></h2>
    <div className="experience-list">
      {roles.map(({ title, company, period, highlights }) => (
        <article className="experience-entry" data-scroll-reveal="rise" key={title}>
          <div className="experience-meta">
            <p>{company}</p>
            <p>{period} · Remote</p>
          </div>
          <h3>{title}</h3>
          <ul>
            {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default Experience;
