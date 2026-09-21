import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { builtAt, findProject, profile, sheets } from "../lib/content";

const ZONES = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const project = pathname.startsWith("/projects/") ? findProject(pathname.split("/")[2]) : undefined;
  const sheetNo = project?.no ?? sheets.find((sheet) => sheet.path === pathname)?.no ?? "G-00";

  return (
    <div className="frame">
      <div className="sheet">
        <div className="zones" aria-hidden="true">
          {ZONES.map((zone) => (
            <span key={zone}>{zone}</span>
          ))}
        </div>
        <Masthead pathname={pathname} />
        <main className="main">
          <Outlet />
        </main>
        <TitleBlock sheetNo={sheetNo} />
      </div>
    </div>
  );
}

function Masthead({ pathname }: { pathname: string }) {
  return (
    <header className="masthead">
      <Link className="masthead__name" to="/">
        <strong>{profile.name}</strong>
        {profile.nameEn ? <span>{profile.nameEn}</span> : null}
      </Link>
      {profile.role ? <p className="masthead__role">{profile.role}</p> : null}
      <nav className="masthead__nav" aria-label="주요 메뉴">
        {sheets.map((sheet) => {
          const active = sheet.path === "/" ? pathname === "/" || pathname.startsWith("/projects/") : pathname === sheet.path;
          return (
            <NavLink key={sheet.path} to={sheet.path} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined}>
              <small>{sheet.no}</small>
              {sheet.label}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}

function TitleBlock({ sheetNo }: { sheetNo: string }) {
  const githubHandle = profile.github?.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "");

  return (
    <footer className="titleblock">
      <div className="tb tb--name">
        <span className="tb__label">설계</span>
        <span className="tb__value">
          <strong>{profile.name}</strong> {profile.nameEn ? <span className="tb__en">{profile.nameEn}</span> : null}
        </span>
      </div>
      {profile.role ? (
        <div className="tb">
          <span className="tb__label">분야</span>
          <span className="tb__value">{profile.role}</span>
        </div>
      ) : null}
      {profile.email ? (
        <div className="tb">
          <span className="tb__label">이메일</span>
          <a className="tb__value" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      ) : null}
      {profile.github ? (
        <div className="tb">
          <span className="tb__label">GitHub</span>
          <a className="tb__value" href={profile.github} target="_blank" rel="noreferrer">
            {githubHandle}
          </a>
        </div>
      ) : null}
      <div className="tb">
        <span className="tb__label">개정일</span>
        <span className="tb__value mono">{builtAt}</span>
      </div>
      <div className="tb tb--no">
        <span className="tb__label">도면번호</span>
        <strong className="tb__value mono">{sheetNo}</strong>
      </div>
    </footer>
  );
}
