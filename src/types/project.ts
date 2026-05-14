export const projectCategories = [
  "architecture",
  "bim",
  "development",
  "research",
  "archive",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  type: string;
  year: string;
  role: string;
  tools: string[];
  summary: string;
  overview: string;
  problem: string;
  solution: string;
  contribution: string;
  features: string[];
  impact: string;
  coverImage: string;
  images: string[];
  isFeatured: boolean;
  order: number;
  links: ProjectLink[];
};
