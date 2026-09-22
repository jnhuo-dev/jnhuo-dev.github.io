/**
 * content/ 폴더를 읽어 `virtual:content` 모듈을 만드는 Vite 플러그인.
 *
 * content/projects/<폴더>/index.md  → 프로젝트 1개 (폴더 안의 이미지는 자동 연결)
 * content/profile/index.md          → 소개 페이지
 *
 * 필수값이 빠지거나 형식이 틀리면 어느 파일이 문제인지 알려주고 빌드를 멈춘다.
 */
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { Marked } from "marked";
import { parse as parseYaml } from "yaml";
import type { Plugin } from "vite";
import type { Category, Entry, Figure, Profile, Project, ProjectLink, Video } from "virtual:content";

const VIRTUAL_ID = "virtual:content";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif|svg)$/i;
const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

// 목록에 표시되는 순서이자 도면번호 앞글자
const CATEGORIES: Category[] = [
  { id: "development", code: "D", label: "개발" },
  { id: "bim", code: "B", label: "BIM" },
  { id: "architecture", code: "A", label: "건축 설계" },
];

const PROJECT_KEYS = [
  "title", "category", "year", "type", "role", "tools", "summary", "award",
  "featured", "draft", "order", "cover", "captions", "links",
];
const TEMPLATE_TITLE = "작업 이름";
const TEMPLATE_SUMMARY = "목록과 미리보기에 나오는 한 줄 설명";
// 본문이 이보다 길면(공백 제외 글자 수) 글 읽기 중심 레이아웃을 쓴다.
const LONG_TEXT = 1500;

const PROFILE_KEYS = [
  "name", "nameEn", "role", "intro", "description", "email", "github", "contactNote",
  "career", "education", "experience", "certificates", "awards", "skills",
];

class ContentError extends Error {}

type Ctx = {
  root: string;
  isBuild: boolean;
  imports: string[];
  importIds: Map<string, string>;
  warn: (message: string) => void;
};

export default function contentPlugin(): Plugin {
  let root = process.cwd();
  let isBuild = false;

  return {
    name: "portfolio-content",
    configResolved(config) {
      root = config.root;
      isBuild = config.command === "build";
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      try {
        return generateModule({
          root,
          isBuild,
          imports: [],
          importIds: new Map(),
          warn: (message) => this.warn(message),
        });
      } catch (error) {
        if (error instanceof ContentError) this.error(error.message);
        throw error;
      }
    },
    // 페이지 제목과 링크 미리보기(카톡·링크드인·검색) 문구를 소개 파일에서 가져와 index.html에 넣는다.
    transformIndexHtml() {
      const meta = readSiteMeta(root);
      const title = escapeHtml(meta.title);
      const description = escapeHtml(meta.description);
      return [
        { tag: "title", children: title, injectTo: "head-prepend" },
        { tag: "meta", attrs: { name: "description", content: description }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:title", content: title }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:description", content: description }, injectTo: "head" },
      ];
    },
    configureServer(server) {
      const contentDir = path.join(root, "content");
      server.watcher.add(contentDir);
      const onChange = (file: string) => {
        const rel = path.relative(contentDir, file);
        if (rel.startsWith("..") || path.isAbsolute(rel)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      for (const event of ["add", "change", "unlink", "addDir", "unlinkDir"] as const) {
        server.watcher.on(event, onChange);
      }
    },
  };
}

function generateModule(ctx: Ctx) {
  const contentDir = path.join(ctx.root, "content");
  const projects = loadProjects(ctx, path.join(contentDir, "projects"));
  const profile = loadProfile(ctx, path.join(contentDir, "profile"));
  const builtAt = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/\.\s?/g, ".")
    .replace(/\.$/, "");

  const data = JSON.stringify({ categories: CATEGORIES, projects, profile, builtAt });
  // 이미지 자리표시자를 import한 변수로 바꿔서 Vite가 해시된 경로를 넣게 한다.
  const body = data.replace(/__IMG_(img\d+)__/g, '" + $1 + "');

  return [
    ...ctx.imports,
    `const data = ${body};`,
    "export const categories = data.categories;",
    "export const projects = data.projects;",
    "export const profile = data.profile;",
    "export const builtAt = data.builtAt;",
  ].join("\n");
}

/* ───────── projects ───────── */

function loadProjects(ctx: Ctx, dir: string): Project[] {
  if (!fs.existsSync(dir)) return [];

  const loaded: (Project & { sortYear: number; order: number })[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name.startsWith(".")) continue;

    const folder = path.join(dir, entry.name);
    const file = findFile(folder, "index.md");
    if (!file) {
      ctx.warn(`${relPath(ctx, folder)} 폴더에 index.md가 없어서 건너뜁니다.`);
      continue;
    }
    if (!SLUG_RE.test(entry.name)) {
      fail(ctx, file, `폴더 이름 "${entry.name}"은 주소(URL)로 쓰입니다. 영어 소문자, 숫자, - 만 써주세요. 예: my-project`);
    }

    const { data, body } = readFrontmatter(ctx, file);
    warnUnknownKeys(ctx, file, data, PROJECT_KEYS);

    const title = requireString(ctx, file, data, "title", "작업 이름");
    const category = data.category;
    if (!CATEGORIES.some((c) => c.id === category)) {
      fail(ctx, file, `category에는 ${CATEGORIES.map((c) => c.id).join(", ")} 중 하나를 써주세요. (지금 값: ${String(category ?? "없음")})`);
    }
    const year = data.year == null ? "" : String(data.year).trim();
    const years = year.match(/\d{4}/g);
    if (!years) fail(ctx, file, `year에 연도를 써주세요. 예: 2024 또는 2023-2024 (지금 값: ${year || "없음"})`);

    const draft = asBool(data.draft);
    if (draft && ctx.isBuild) continue;

    // 템플릿 문구를 그대로 두고 배포하는 것을 막는다.
    if (!draft) {
      if (title === TEMPLATE_TITLE) fail(ctx, file, `title이 템플릿 문구("${TEMPLATE_TITLE}") 그대로입니다.`);
      if (optionalString(data.summary) === TEMPLATE_SUMMARY) {
        fail(ctx, file, `summary가 템플릿 문구("${TEMPLATE_SUMMARY}") 그대로입니다. 한 줄 설명을 쓰거나 줄을 지워주세요.`);
      }
    }

    const images = listImages(folder);
    const usedInBody = new Set<string>();
    const videosInBody = new Set<string>();
    const html = renderMarkdown(ctx, file, folder, images, body, usedInBody, videosInBody);

    const links = asLinks(ctx, file, data.links);
    const videos: Video[] = [];
    for (const link of links) {
      const video = youtube(link.url);
      if (video && !videosInBody.has(video.id) && !videos.some((v) => v.src === video.src)) {
        videos.push({ src: video.src, label: link.label });
      }
    }

    // 캡션은 확장자가 달라도(image-01.jpg ↔ image-01.png) 같은 이름이면 연결한다.
    const captions = asStringMap(ctx, file, data.captions, "captions");
    for (const name of Object.keys(captions)) {
      if (!matchImage(images, stripExt(name))) ctx.warn(`${relPath(ctx, file)}: captions의 "${name}" 이미지를 폴더에서 찾을 수 없습니다.`);
    }
    const captionFor = (name: string) =>
      captions[name] ??
      Object.entries(captions).find(([key]) => stripExt(key).toLowerCase() === stripExt(name).toLowerCase())?.[1];
    const figure = (name: string): Figure => ({
      src: imageToken(ctx, path.join(folder, name)),
      name,
      caption: captionFor(name),
      ...measure(path.join(folder, name)),
    });

    let coverName: string | undefined;
    if (data.cover != null) {
      coverName = matchImage(images, String(data.cover));
      if (!coverName) fail(ctx, file, `cover에 적은 "${data.cover}" 이미지를 폴더에서 찾을 수 없습니다.`);
    } else {
      coverName = images.find((name) => /^cover\./i.test(name)) ?? images.find((name) => !usedInBody.has(name));
    }

    loaded.push({
      slug: entry.name,
      no: "",
      title,
      category: category as Project["category"],
      year,
      type: optionalString(data.type),
      role: optionalString(data.role),
      tools: asStringList(ctx, file, data.tools, "tools"),
      summary: optionalString(data.summary),
      award: optionalString(data.award),
      featured: asBool(data.featured),
      draft,
      cover: coverName ? figure(coverName) : undefined,
      figures: images.filter((name) => name !== coverName && !usedInBody.has(name)).map(figure),
      videos,
      html,
      long: html.replace(/<[^>]+>/g, "").replace(/\s+/g, "").length > LONG_TEXT,
      links,
      sortYear: Math.max(...years.map(Number)),
      order: optionalString(data.order) ? Number(data.order) || 0 : Number.MAX_SAFE_INTEGER,
    });
  }

  // 분류 순서 → 최신 연도 → order → 이름 순으로 정렬하고 도면번호를 매긴다.
  const sorted: Project[] = [];
  for (const category of CATEGORIES) {
    const items = loaded
      .filter((p) => p.category === category.id)
      .sort((a, b) => b.sortYear - a.sortYear || a.order - b.order || a.title.localeCompare(b.title, "ko"));
    items.forEach(({ sortYear: _y, order: _o, ...project }, index) => {
      sorted.push({ ...project, no: `${category.code}-${String(index + 1).padStart(2, "0")}` });
    });
  }
  return sorted;
}

/* ───────── profile ───────── */

function loadProfile(ctx: Ctx, dir: string): Profile {
  const file = findFile(dir, "index.md");
  if (!file) throw new ContentError(`[content] content/profile/index.md 파일이 필요합니다.`);

  const { data, body } = readFrontmatter(ctx, file);
  warnUnknownKeys(ctx, file, data, PROFILE_KEYS);

  const images = listImages(dir);
  const photo = images.find((name) => /^photo\./i.test(name)) ?? images[0];

  return {
    name: requireString(ctx, file, data, "name", "이름"),
    nameEn: optionalString(data.nameEn),
    role: optionalString(data.role),
    intro: optionalString(data.intro),
    email: optionalString(data.email),
    github: optionalString(data.github),
    contactNote: optionalString(data.contactNote),
    photo: photo ? imageToken(ctx, path.join(dir, photo)) : undefined,
    html: renderMarkdown(ctx, file, dir, images, body, new Set(), new Set()),
    career: asEntries(ctx, file, data.career, "career"),
    education: asEntries(ctx, file, data.education, "education"),
    experience: asEntries(ctx, file, data.experience, "experience"),
    certificates: asEntries(ctx, file, data.certificates, "certificates"),
    awards: asEntries(ctx, file, data.awards, "awards"),
    skills: Object.entries(asObject(ctx, file, data.skills, "skills")).map(([group, items]) => ({
      group,
      items: asStringList(ctx, file, items, `skills.${group}`),
    })),
  };
}

function readSiteMeta(root: string) {
  const ctx: Ctx = { root, isBuild: false, imports: [], importIds: new Map(), warn: () => {} };
  const file = findFile(path.join(root, "content", "profile"), "index.md");
  if (!file) throw new ContentError(`[content] content/profile/index.md 파일이 필요합니다.`);

  const { data } = readFrontmatter(ctx, file);
  const name = requireString(ctx, file, data, "name", "이름");
  const role = optionalString(data.role);
  return {
    title: role ? `${name} | ${role}` : name,
    description: optionalString(data.description) ?? optionalString(data.intro) ?? "",
  };
}

/* ───────── markdown ───────── */

function renderMarkdown(
  ctx: Ctx,
  file: string,
  folder: string,
  images: string[],
  body: string,
  usedInBody: Set<string>,
  videosInBody: Set<string>,
) {
  if (!body.trim()) return "";

  const errors: string[] = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      // 유튜브 주소만 있는 줄은 그 자리에 영상 플레이어로 바꾼다.
      paragraph({ tokens }) {
        const parts = tokens.filter((token) => !(token.type === "text" && !token.raw.trim()));
        const link = parts.length === 1 && parts[0].type === "link" ? parts[0] : undefined;
        const video = link ? youtube(link.href) : undefined;
        if (!video) return false;
        videosInBody.add(video.id);
        return `<div class="video"><iframe src="${escapeHtml(video.src)}" title="YouTube 영상" ${IFRAME_ATTRS}></iframe></div>\n`;
      },
      image({ href, text }) {
        let src = href;
        if (!/^([a-z]+:|\/\/)/i.test(href)) {
          const name = matchImage(images, decodeURI(href).replace(/^\.\//, ""));
          if (!name) {
            errors.push(`본문에 넣은 이미지 "${href}"를 폴더에서 찾을 수 없습니다.`);
            return "";
          }
          usedInBody.add(name);
          src = imageToken(ctx, path.join(folder, name));
        }
        const caption = text ? `<span class="inline-fig__caption">${escapeHtml(text)}</span>` : "";
        return `<span class="inline-fig"><img src="${src}" alt="${escapeHtml(text)}" loading="lazy">${caption}</span>`;
      },
      link({ href, tokens }) {
        const label = this.parser.parseInline(tokens);
        const external = /^https?:/i.test(href);
        return `<a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>${label}</a>`;
      },
    },
  });

  const html = marked.parse(body, { async: false });
  if (errors.length) fail(ctx, file, errors.join("\n  → "));
  return html;
}

/* ───────── youtube ───────── */

const IFRAME_ATTRS =
  'loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen';

/** 유튜브 주소(youtu.be, watch?v=, shorts 등)를 재생용 주소로 바꾼다. 유튜브가 아니면 undefined. */
function youtube(url: string) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }

  const host = parsed.hostname.replace(/^(www\.|m\.|music\.)/, "");
  let id: string | undefined;
  if (host === "youtu.be") {
    id = parsed.pathname.split("/")[1];
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id = parsed.pathname === "/watch" ? parsed.searchParams.get("v") ?? undefined : parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
  }
  if (!id || !/^[\w-]{11}$/.test(id)) return undefined;

  const start = toSeconds(parsed.searchParams.get("t") ?? parsed.searchParams.get("start"));
  // 쿠키를 남기지 않는 유튜브 주소를 쓴다.
  return { id, src: `https://www.youtube-nocookie.com/embed/${id}${start ? `?start=${start}` : ""}` };
}

/** "90", "90s", "1m30s", "1h2m3s" → 초 */
function toSeconds(value: string | null) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return Number(value);
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return 0;
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

/* ───────── helpers ───────── */

function readFrontmatter(ctx: Ctx, file: string) {
  const raw = fs.readFileSync(file, "utf8").replace(/^﻿/, "");
  const match = raw.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!match) fail(ctx, file, "파일 맨 위에 --- 줄로 감싼 기본 정보가 있어야 합니다. content/projects/_template/index.md를 참고하세요.");

  let data: unknown;
  try {
    // 모든 값을 글자 그대로 읽는다. (기본 방식은 2020.10을 숫자 2020.1로 바꿔버린다)
    data = parseYaml(match[1], { schema: "failsafe" }) ?? {};
  } catch (error) {
    fail(
      ctx,
      file,
      `기본 정보(--- 사이) 형식 오류: ${(error as Error).message}\n  → 값 안에 콜론(:)이나 #이 들어가면 "따옴표"로 감싸주세요.`,
    );
  }
  if (typeof data !== "object" || Array.isArray(data)) fail(ctx, file, "기본 정보는 `이름: 값` 형태로 써주세요.");

  return { data: data as Record<string, unknown>, body: raw.slice(match[0].length) };
}

function imageToken(ctx: Ctx, absPath: string) {
  let id = ctx.importIds.get(absPath);
  if (!id) {
    id = `img${ctx.importIds.size}`;
    ctx.importIds.set(absPath, id);
    const importPath = `/${path.relative(ctx.root, absPath).split(path.sep).join("/")}`;
    ctx.imports.push(`import ${id} from ${JSON.stringify(importPath)};`);
  }
  return `__IMG_${id}__`;
}

function measure(absPath: string) {
  try {
    const { width, height, orientation } = imageSize(fs.readFileSync(absPath));
    if (!width || !height) return {};
    // 세로로 찍은 사진(EXIF 회전)은 가로세로를 바꿔준다.
    return orientation && orientation >= 5 ? { width: height, height: width } : { width, height };
  } catch {
    return {};
  }
}

function listImages(folder: string) {
  return fs
    .readdirSync(folder)
    .filter((name) => IMAGE_RE.test(name))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

// Windows는 대소문자를 구분하지 않지만 배포 서버(Linux)는 구분하므로, 실제 파일 이름으로 맞춘다.
function matchImage(images: string[], name: string) {
  const lower = name.toLowerCase();
  return images.find((image) => image.toLowerCase() === lower || stripExt(image).toLowerCase() === lower);
}

function findFile(folder: string, name: string) {
  if (!fs.existsSync(folder)) return undefined;
  const found = fs.readdirSync(folder).find((entry) => entry.toLowerCase() === name);
  return found ? path.join(folder, found) : undefined;
}

function stripExt(name: string) {
  return name.replace(/\.[^.]+$/, "");
}

function requireString(ctx: Ctx, file: string, data: Record<string, unknown>, key: string, label: string) {
  const value = optionalString(data[key]);
  if (!value) fail(ctx, file, `${key}(${label}) 값이 필요합니다.`);
  return value;
}

function asBool(value: unknown) {
  return value === true || String(value).trim().toLowerCase() === "true";
}

function optionalString(value: unknown) {
  if (value == null) return undefined;
  const text = String(value).trim();
  return text || undefined;
}

function asStringList(ctx: Ctx, file: string, value: unknown, key: string): string[] {
  if (value == null) return [];
  if (typeof value === "string") return value.split(",").map((s) => s.trim()).filter(Boolean);
  if (!Array.isArray(value)) fail(ctx, file, `${key}는 [A, B, C] 형태의 목록으로 써주세요.`);
  return value.map((item) => String(item).trim()).filter(Boolean);
}

function asObject(ctx: Ctx, file: string, value: unknown, key: string): Record<string, unknown> {
  if (value == null) return {};
  if (typeof value !== "object" || Array.isArray(value)) fail(ctx, file, `${key}는 \`이름: 값\` 형태로 써주세요.`);
  return value as Record<string, unknown>;
}

function asStringMap(ctx: Ctx, file: string, value: unknown, key: string) {
  const map: Record<string, string> = {};
  for (const [k, v] of Object.entries(asObject(ctx, file, value, key))) {
    if (v != null) map[k] = String(v);
  }
  return map;
}

function asLinks(ctx: Ctx, file: string, value: unknown): ProjectLink[] {
  return Object.entries(asStringMap(ctx, file, value, "links")).map(([label, url]) => ({ label, url }));
}

function asEntries(ctx: Ctx, file: string, value: unknown, key: string): Entry[] {
  if (value == null) return [];
  if (!Array.isArray(value)) fail(ctx, file, `${key}는 - 로 시작하는 목록으로 써주세요.`);
  return value.map((item, index) => {
    if (typeof item === "string") return { title: item };
    const obj = asObject(ctx, file, item, `${key}[${index + 1}]`);
    const title = optionalString(obj.title);
    if (!title) fail(ctx, file, `${key}의 ${index + 1}번째 항목에 title이 필요합니다.`);
    return { period: optionalString(obj.period), title, text: optionalString(obj.text) };
  });
}

function warnUnknownKeys(ctx: Ctx, file: string, data: Record<string, unknown>, known: string[]) {
  for (const key of Object.keys(data)) {
    if (!known.includes(key)) {
      ctx.warn(`${relPath(ctx, file)}: 알 수 없는 항목 "${key}" (오타인지 확인하세요. 쓸 수 있는 항목: ${known.join(", ")})`);
    }
  }
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function relPath(ctx: Ctx, file: string) {
  return path.relative(ctx.root, file).split(path.sep).join("/");
}

function fail(ctx: Ctx, file: string, message: string): never {
  throw new ContentError(`[content] ${relPath(ctx, file)}\n  → ${message}`);
}
