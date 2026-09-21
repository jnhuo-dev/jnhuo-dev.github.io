import { useEffect } from "react";
import { categories, profile, projects, type Project } from "virtual:content";

export { builtAt, categories, profile, projects } from "virtual:content";

/** 사이트 공통 시트. 작업은 D-01 같은 번호, 나머지 페이지는 G 번호를 쓴다. */
export const sheets = [
  { path: "/", no: "G-00", label: "작업" },
  { path: "/profile", no: "G-01", label: "소개" },
  { path: "/contact", no: "G-02", label: "연락" },
];

export const projectGroups = categories
  .map((category) => ({ ...category, projects: projects.filter((p) => p.category === category.id) }))
  .filter((group) => group.projects.length > 0);

export const categoryOf = (project: Project) => categories.find((c) => c.id === project.category)!;

export const findProject = (slug?: string) => projects.find((p) => p.slug === slug);

export function neighbors(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return { prev: projects[index - 1], next: projects[index + 1] };
}

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${profile.name}` : `${profile.name} | ${profile.role ?? "Portfolio"}`;
  }, [title]);
}
