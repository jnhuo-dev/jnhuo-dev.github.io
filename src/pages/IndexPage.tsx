import { useState } from "react";
import { Link } from "react-router-dom";
import { profile, projectGroups, projects, useDocumentTitle } from "../lib/content";

export default function IndexPage() {
  useDocumentTitle();

  const initial = projects.find((p) => p.featured) ?? projects[0];
  const [activeSlug, setActiveSlug] = useState(initial?.slug);
  const active = projects.find((p) => p.slug === activeSlug) ?? initial;

  return (
    <>
      <section className="intro">
        {profile.intro ? <p className="intro__text">{profile.intro}</p> : null}
        <dl className="intro__count">
          <div>
            <dt>전체</dt>
            <dd className="mono">{projects.length}</dd>
          </div>
          {projectGroups.map((group) => (
            <div key={group.id}>
              <dt>{group.label}</dt>
              <dd className="mono">{group.projects.length}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="index" aria-label="작업 목록">
        <div className="index__list">
          <div className="index__head" aria-hidden="true">
            <span>도면번호</span>
            <span>작업명</span>
            <span>유형</span>
            <span>연도</span>
          </div>

          {projectGroups.map((group) => (
            <div className="index__group" key={group.id}>
              <h2 className="index__group-title">
                <span className="mono">{group.code}</span>
                {group.label}
              </h2>
              <ol>
                {group.projects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      to={`/projects/${project.slug}`}
                      className={`index__row${project.slug === active?.slug ? " is-active" : ""}`}
                      onMouseEnter={() => setActiveSlug(project.slug)}
                      onFocus={() => setActiveSlug(project.slug)}
                    >
                      <span className="index__no mono">{project.no}</span>
                      <span className="index__title">
                        {project.title}
                        {project.featured ? <span className="index__mark" title="대표 작업" aria-label="대표 작업">●</span> : null}
                        {project.draft ? <span className="badge">초안</span> : null}
                      </span>
                      <span className="index__type">{project.type}</span>
                      <span className="index__year mono">{project.year}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <p className="legend">
            <span className="index__mark">●</span> 대표 작업
          </p>
        </div>

        {active ? (
          <aside className="preview" aria-hidden="true">
            <div className="preview__sheet">
              {projects.map((project) =>
                project.cover ? (
                  <img
                    key={project.slug}
                    src={project.cover.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={project.slug === active.slug ? "is-visible" : undefined}
                  />
                ) : null,
              )}
              {active.cover ? null : (
                <div className="hatch">
                  <span>이미지 준비 중</span>
                </div>
              )}
            </div>
            <div className="preview__caption">
              <span className="mono">{active.no}</span>
              <div>
                <strong>{active.title}</strong>
                {active.summary ? <p>{active.summary}</p> : null}
                {active.award ? <p className="preview__award">{active.award}</p> : null}
                {active.tools.length > 0 ? <p className="preview__tools">{active.tools.join(" / ")}</p> : null}
              </div>
            </div>
          </aside>
        ) : null}
      </section>
    </>
  );
}
