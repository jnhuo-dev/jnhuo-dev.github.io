import { Link } from "react-router-dom";
import SafeImage from "../components/common/SafeImage";
import ProjectList from "../components/project/ProjectList";
import { getFeaturedProjects } from "../data/projects";
import { profile } from "../data/profile";
import { skillGroups } from "../data/skills";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <section className="hero">
        <SafeImage
          className="hero-visual"
          src={featuredProjects[0]?.coverImage}
          alt={`${featuredProjects[0]?.title ?? profile.name} project image`}
          title={featuredProjects[0]?.title ?? profile.name}
          loading="eager"
        />
        <div className="container hero-inner">
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.headline}</p>
          <p className="hero-copy">{profile.intro}</p>
          <div className="hero-actions" aria-label="주요 이동">
            <Link className="btn btn-primary" to="/development">
              View Projects
            </Link>
            <Link className="btn btn-secondary" to="/contact">
              Contact
            </Link>
          </div>
          <div className="hero-signals" aria-label="핵심 역량">
            {profile.heroSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="section-kicker">Featured Work</span>
              <h2>Data-managed portfolio system.</h2>
              <p className="section-lead">
                BIM, Revit Add-in, 건축 설계 프로젝트를 하나의 데이터 구조로 관리합니다.
              </p>
            </div>
          </div>
          <ProjectList projects={featuredProjects} featured />
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="category-band">
            <Link to="/architecture">
              <span>01</span>
              <strong>Architecture</strong>
            </Link>
            <Link to="/bim">
              <span>02</span>
              <strong>BIM</strong>
            </Link>
            <Link to="/development">
              <span>03</span>
              <strong>Development</strong>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section-kicker">Skills</span>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <span className="info-label">{group.title}</span>
                <h2>{group.subtitle}</h2>
                <div className="tag-list">
                  {group.skills.map((skill) => (
                    <span className="tag" key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
