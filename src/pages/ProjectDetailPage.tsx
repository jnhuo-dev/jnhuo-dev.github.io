import { Link, useParams } from "react-router-dom";
import ProjectDetail from "../components/project/ProjectDetail";
import { getProjectById } from "../data/projects";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <section className="section page-section">
        <div className="container">
          <p className="empty-state">해당 ID의 프로젝트를 찾을 수 없습니다.</p>
          <Link className="btn btn-secondary" to="/">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <div className="container">
        <ProjectDetail project={project} />
      </div>
    </section>
  );
}
