import { Link } from "react-router-dom";
import type { Project } from "../../types/project";
import SafeImage from "../common/SafeImage";
import ProjectMeta from "./ProjectMeta";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <article className={`project-card ${featured ? "project-card--featured" : ""}`}>
      <Link className="project-card__media" to={`/projects/${project.id}`} aria-label={`${project.title} 상세 보기`}>
        <SafeImage src={project.coverImage} alt={`${project.title} cover image`} title={project.title} />
      </Link>

      <div className="project-card__body">
        <ProjectMeta project={project} compact />
        <div>
          <h2 className="project-card__title">
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </h2>
          <p className="project-card__summary">{project.summary}</p>
        </div>
        <p className="project-card__tools">{project.tools.slice(0, 5).join(" · ")}</p>
      </div>
    </article>
  );
}
