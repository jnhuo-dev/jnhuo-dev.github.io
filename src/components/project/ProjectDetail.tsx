import type { Project } from "../../types/project";
import Tag from "../common/Tag";
import ProjectGallery from "./ProjectGallery";
import ProjectMeta from "./ProjectMeta";

type ProjectDetailProps = {
  project: Project;
};

const detailSections = [
  ["Overview", "overview"],
  ["Problem", "problem"],
  ["Solution", "solution"],
  ["My Contribution", "contribution"],
  ["Result / Impact", "impact"],
] as const;

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="project-detail">
      <header className="project-detail__head">
        <div>
          <ProjectMeta project={project} />
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
        <aside className="project-detail__facts" aria-label="프로젝트 요약">
          <div>
            <span>Role</span>
            <strong>{project.role}</strong>
          </div>
          <div>
            <span>Tools</span>
            <div className="tag-list">
              {project.tools.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </div>
          </div>
          {project.links.length > 0 ? (
            <div>
              <span>Links</span>
              <div className="project-links">
                {project.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </header>

      <ProjectGallery project={project} />

      <div className="detail-grid">
        {detailSections.map(([label, key]) => (
          <section className="detail-block" key={key}>
            <h2>{label}</h2>
            <p>{project[key]}</p>
          </section>
        ))}
        <section className="detail-block detail-block--features">
          <h2>Key Features</h2>
          <ul className="feature-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
