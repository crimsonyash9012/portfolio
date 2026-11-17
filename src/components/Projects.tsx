import { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import ScrollWords from "@/components/ScrollWords";
import oasisPreview from "@/assets/oasis-preview.webp";

const projects = [
  {
    id: "atlas",
    name: "Human Atlas",
    kind: "Personal project",
    summary: "AI-assisted reflection and knowledge graphs",
    description: "A reflection platform that turns written narratives into versioned knowledge graphs. Users can trace AI suggestions to source evidence and review them before they change the graph.",
    detail: "The API uses retry-safe writes, workspace-level access controls, and 32 automated tests covering the main workflows.",
    stack: "React / TypeScript / Fastify / PostgreSQL / Redis",
    action: "View source",
    href: "https://github.com/crimsonyash9012/human_atlas",
  },
  {
    id: "oasis",
    name: "OASIS",
    kind: "Client work",
    summary: "Evidence synthesis for systematic reviews",
    description: "An AI-assisted evidence synthesis platform for researchers. I built research database integrations and contributed to PRISMA workflows and study management for systematic reviews.",
    detail: "My work included a transactional workflow reset that preserves source evidence and audit history, plus dashboard query optimization.",
    stack: "FastAPI / PostgreSQL / Celery / Redis / Docker",
    action: "Read client feedback",
    href: "#testimonial",
  },
] as const;

type Project = typeof projects[number];

function ProjectVisual({ project }: { project: Project }) {
  if (project.id === "oasis") {
    return (
      <div className="project-visual oasis-visual">
        <img src={oasisPreview} alt="OASIS landing page with its evidence synthesis dashboard" width="1468" height="715" loading="lazy" />
      </div>
    );
  }

  return (
    <div className="project-visual atlas-visual" role="img" aria-label="Human Atlas workflow. Narrative and source evidence inform a proposed knowledge graph for the user to review.">
      <div className="atlas-brand" aria-hidden="true"><span />Human Atlas</div>
      <div className="atlas-flow" aria-hidden="true">
        <div className="atlas-node atlas-source">Narrative</div>
        <ArrowRight className="atlas-arrow atlas-arrow-first" />
        <div className="atlas-node atlas-graph">Proposed graph</div>
        <ArrowRight className="atlas-arrow atlas-arrow-last" />
        <div className="atlas-node atlas-review">User review</div>
        <div className="atlas-evidence">Source evidence</div>
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const navigatingToFeedback = useRef(false);

  const restoreFocus = (event: Event) => {
    if (!navigatingToFeedback.current) return;

    navigatingToFeedback.current = false;
    event.preventDefault();
    document.getElementById("testimonial")?.focus({ preventScroll: true });
  };

  return (
    <li className="project-row">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="project-trigger" data-scroll-reveal="rise" type="button">
            <span className="project-name">{project.name}</span>
            <span className="project-info">
              <span className="small-label">{project.kind}</span>
              <span>{project.summary}</span>
              <span className="project-open">Open preview <ArrowUpRight aria-hidden="true" /></span>
            </span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="project-overlay" />
          <Dialog.Content className="project-dialog" onCloseAutoFocus={restoreFocus}>
            <div className="project-dialog-bar">
              <span className="small-label">{project.kind}</span>
              <Dialog.Close className="pill project-close"><X aria-hidden="true" /> Close</Dialog.Close>
            </div>
            <div className="project-dialog-body">
              <ProjectVisual project={project} />
              <div className="project-dialog-copy">
                <Dialog.Title className="section-title">{project.name}</Dialog.Title>
                <Dialog.Description>{project.description}</Dialog.Description>
                <p>{project.detail}</p>
                <p className="small-label">{project.stack}</p>
                {project.id === "atlas" ? (
                  <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                    {project.action} <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  <Dialog.Close asChild>
                    <a className="text-link" href={project.href} onClick={() => { navigatingToFeedback.current = true; }}>
                      {project.action} <ArrowRight aria-hidden="true" />
                    </a>
                  </Dialog.Close>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </li>
  );
}

const Projects = () => (
  <section id="projects" className="portfolio-section work-section" aria-labelledby="projects-title">
    <div className="section-heading">
      <h2 className="section-title" id="projects-title"><ScrollWords>Selected work.</ScrollWords></h2>
      <p data-scroll-reveal="rise">Two projects across AI and research software. Open a project to see how it works.</p>
    </div>

    <ul className="project-index">
      {projects.map((project) => <ProjectRow key={project.id} project={project} />)}
    </ul>

    <a className="text-link project-more" data-scroll-reveal="rise" href="https://github.com/crimsonyash9012" target="_blank" rel="noopener noreferrer">
      More on GitHub <ArrowUpRight aria-hidden="true" />
    </a>
  </section>
);

export default Projects;
