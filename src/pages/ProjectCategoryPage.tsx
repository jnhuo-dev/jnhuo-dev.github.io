import SectionTitle from "../components/common/SectionTitle";
import ProjectList from "../components/project/ProjectList";
import { categoryLabels, getProjectsByCategory } from "../data/projects";
import type { ProjectCategory } from "../types/project";

type ProjectCategoryPageProps = {
  category: ProjectCategory;
  title: string;
  description: string;
};

export default function ProjectCategoryPage({ category, title, description }: ProjectCategoryPageProps) {
  const projects = getProjectsByCategory(category);

  return (
    <section className="section page-section">
      <div className="container">
        <SectionTitle eyebrow={categoryLabels[category]} title={title} description={description} />
        <ProjectList
          projects={projects}
          emptyMessage={`${categoryLabels[category]} 카테고리에 등록된 프로젝트가 없습니다.`}
        />
      </div>
    </section>
  );
}
