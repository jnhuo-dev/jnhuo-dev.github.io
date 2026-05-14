import { categoryLabels } from "../../data/projects";
import type { Project } from "../../types/project";
import Tag from "../common/Tag";

type ProjectMetaProps = {
  project: Project;
  compact?: boolean;
};

export default function ProjectMeta({ project, compact = false }: ProjectMetaProps) {
  const items = compact
    ? [categoryLabels[project.category], project.year]
    : [categoryLabels[project.category], project.type, project.year, project.role];

  return (
    <div className="project-meta">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}
