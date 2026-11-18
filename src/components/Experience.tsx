import { ArrowUpRight } from "lucide-react";
import ScrollWords from "@/components/ScrollWords";

type Role = {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  certificateUrl?: string;
};

const roles: Role[] = [
  {
    title: "Software Development Intern",
    company: "Oasis.io",
    period: "May – Jul 2026",
    location: "Remote",
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
    location: "Remote",
    highlights: [
      "Integrated nine research search providers behind one interface with database-backed deduplication and rate-limit handling for NCBI imports.",
      "Built a transactional reset for systematic reviews that preserves source evidence and audit history across nine tables.",
      "Replaced an N+1 pattern that issued about 100 queries per dashboard load with batched aggregates.",
    ],
  },
  {
    title: "Machine Learning Intern",
    company: "Mahakalinfra Esolution Private Limited",
    period: "Dec 2025 – Jan 2026",
    location: "Remote",
    certificateUrl: "https://drive.google.com/file/d/1VsZVJ4pNq8KmWDlxl0mvqNTk8SGRDneU/view",
    highlights: [
      "Built a real-time traffic monitoring system that classified 26 vehicle types and estimated axle counts with a YOLOv8 fisheye model and Intel OpenVINO CPU inference.",
      "Reduced truck–SUV classification errors by about 30% by tuning size-ratio filters and confidence thresholds for each vehicle class.",
      "Eliminated more than half of duplicate vehicle counts in slow and close-up traffic using spatial and temporal deduplication.",
    ],
  },
  {
    title: "App Development Intern",
    company: "Woohl",
    period: "Sep – Nov 2025",
    location: "Delhi, India · On-site · Full-time",
    certificateUrl: "https://drive.google.com/file/d/1RBYTeEghj7JSOVEX7inhT7pIvae0Vb1A/view",
    highlights: [
      "Built responsive mobile screens and reusable widgets in Flutter and Dart for Android and iOS.",
      "Implemented navigation flows and UI state management to keep screens responsive and maintainable.",
      "Collaborated with the team to deliver seven screens and features, using Git for version control.",
    ],
  },
  {
    title: "Artificial Intelligence Research Intern",
    company: "Delhi Technological University",
    period: "Jun – Jul 2024",
    location: "New Delhi, India",
    certificateUrl: "https://drive.google.com/file/d/1z3KGkAgo8Mz_Cned0yCVljXC2ZYKjtDq/view",
    highlights: [
      "Analyzed more than 100,000 histopathology images and nine public single-cell RNA sequencing datasets, using image augmentation for deep learning analysis.",
      "Applied training techniques including GELU activation, dropout, learning-rate scheduling, noise injection, gradient clipping, and custom loss functions.",
      "Improved average model accuracy from 74.8% to 85.7%.",
    ],
  },
];

const Experience = () => (
  <section id="experience" className="portfolio-section split-section" aria-labelledby="experience-title">
    <h2 className="section-title" id="experience-title"><ScrollWords>Experience</ScrollWords></h2>
    <div className="experience-list">
      {roles.map(({ title, company, period, location, highlights, certificateUrl }) => (
        <article className="experience-entry" data-scroll-reveal="rise" key={title}>
          <div className="experience-meta">
            <p>{company}</p>
            <p>{period} · {location}</p>
          </div>
          <h3>{title}</h3>
          <ul>
            {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
          {certificateUrl && (
            <a
              className="text-link experience-certificate"
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${company} internship certificate`}
            >
              View certificate <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </article>
      ))}
    </div>
  </section>
);

export default Experience;
