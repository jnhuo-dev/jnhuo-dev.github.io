import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";

type ProjectListProps = {
  projects: Project[];
  featured?: boolean;
  emptyMessage?: string;
};

export default function ProjectList({
  projects,
  featured = false,
  emptyMessage = "표시할 프로젝트가 없습니다.",
}: ProjectListProps) {
  if (projects.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className={featured ? "project-grid project-grid--featured" : "project-grid"}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} featured={featured} />
      ))}
    </div>
  );
}
