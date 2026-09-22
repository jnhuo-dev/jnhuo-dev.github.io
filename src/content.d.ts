// plugins/content.ts가 content/ 폴더로부터 만들어내는 모듈의 타입
declare module "virtual:content" {
  export type CategoryId = "development" | "bim" | "architecture";

  export type Category = {
    id: CategoryId;
    code: string;
    label: string;
  };

  export type Figure = {
    src: string;
    name: string;
    caption?: string;
    width?: number;
    height?: number;
  };

  export type Video = {
    /** 재생용 유튜브 주소 */
    src: string;
    label: string;
  };

  export type ProjectLink = {
    label: string;
    url: string;
  };

  export type Project = {
    slug: string;
    /** 도면번호. 예: D-01 */
    no: string;
    title: string;
    category: CategoryId;
    year: string;
    type?: string;
    role?: string;
    tools: string[];
    summary?: string;
    award?: string;
    featured: boolean;
    draft: boolean;
    cover?: Figure;
    figures: Figure[];
    /** links에 들어 있는 유튜브 영상 (본문에 이미 넣은 영상은 제외) */
    videos: Video[];
    html: string;
    /** 본문이 길면 글 읽기 중심 레이아웃 */
    long: boolean;
    links: ProjectLink[];
  };

  export type Entry = {
    period?: string;
    title: string;
    text?: string;
  };

  export type Profile = {
    name: string;
    nameEn?: string;
    role?: string;
    intro?: string;
    email?: string;
    github?: string;
    contactNote?: string;
    photo?: string;
    html: string;
    career: Entry[];
    education: Entry[];
    experience: Entry[];
    certificates: Entry[];
    awards: Entry[];
    skills: { group: string; items: string[] }[];
  };

  export const categories: Category[];
  export const projects: Project[];
  export const profile: Profile;
  export const builtAt: string;
}
