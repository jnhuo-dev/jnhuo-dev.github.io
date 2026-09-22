import type { MouseEvent, ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Fig from "../components/Fig";
import VideoFig from "../components/VideoFig";
import { categoryOf, findProject, neighbors, useDocumentTitle } from "../lib/content";

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = findProject(slug);
  useDocumentTitle(project?.title);

  if (!project) {
    return (
      <div className="empty">
        <p>해당 작업을 찾을 수 없습니다.</p>
        <Link to="/">작업 목록으로</Link>
      </div>
    );
  }

  const category = categoryOf(project);
  const { prev, next } = neighbors(project.slug);
  const coverOffset = project.cover ? 1 : 0;

  // 본문의 [링크](#/projects/...)를 새로고침 없이 이동시킨다.
  const onProseClick = (event: MouseEvent<HTMLDivElement>) => {
    const href = (event.target as HTMLElement).closest("a")?.getAttribute("href");
    if (href?.startsWith("#/")) {
      event.preventDefault();
      navigate(href.slice(1));
    }
  };

  return (
    <article className="dwg">
      <nav className="crumbs" aria-label="현재 위치">
        <Link to="/">작업 목록</Link>
        <span aria-hidden="true">/</span>
        <span>{category.label}</span>
        <span aria-hidden="true">/</span>
        <span className="mono">{project.no}</span>
      </nav>

      <header className="dwg__head">
        <p className="dwg__no">
          <span className="mono">{project.no}</span>
          {project.draft ? <span className="badge">초안 — 배포 시 숨김</span> : null}
        </p>
        <h1>{project.title}</h1>
        {project.summary ? <p className="dwg__lead">{project.summary}</p> : null}
      </header>

      <div className={`dwg__body${project.long ? " dwg__body--long" : ""}`}>
        {project.cover || project.videos.length > 0 ? (
          <div className="dwg__cover">
            {project.cover ? <Fig figure={project.cover} index={1} alt={project.title} eager /> : null}
            {project.videos.map((video) => (
              <VideoFig key={video.src} video={video} title={project.title} />
            ))}
          </div>
        ) : null}

        <div className="dwg__notes">
          <dl className="spec">
            <SpecRow label="분류">{category.label}</SpecRow>
            {project.type ? <SpecRow label="유형">{project.type}</SpecRow> : null}
            <SpecRow label="연도">
              <span className="mono">{project.year}</span>
            </SpecRow>
            {project.role ? <SpecRow label="역할">{project.role}</SpecRow> : null}
            {project.award ? (
              <SpecRow label="수상">
                <span className="spec__award">{project.award}</span>
              </SpecRow>
            ) : null}
            {project.tools.length > 0 ? <SpecRow label="도구">{project.tools.join(" / ")}</SpecRow> : null}
            {project.links.length > 0 ? (
              <SpecRow label="링크">
                {project.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="spec__link">
                    {link.label} ↗
                  </a>
                ))}
              </SpecRow>
            ) : null}
          </dl>
          {project.html ? (
            <div className="prose" onClick={onProseClick} dangerouslySetInnerHTML={{ __html: project.html }} />
          ) : null}
        </div>

        {project.figures.length > 0 || !project.cover ? (
          <div className="dwg__figs">
            {project.figures.map((figure, i) => (
              <Fig key={figure.name} figure={figure} index={i + 1 + coverOffset} alt={project.title} />
            ))}
            {!project.cover && project.figures.length === 0 ? <Fig index={1} alt={project.title} /> : null}
          </div>
        ) : null}
      </div>

      <nav className="sheet-nav" aria-label="이전·다음 작업">
        {prev ? (
          <Link to={`/projects/${prev.slug}`} className="sheet-nav__prev">
            <small className="mono">← {prev.no}</small>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/projects/${next.slug}`} className="sheet-nav__next">
            <small className="mono">{next.no} →</small>
            <span>{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
