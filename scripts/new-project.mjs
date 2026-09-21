// 새 작업 폴더를 만든다.  사용법: npm run new -- 폴더이름
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slug = process.argv[2];

if (!slug || !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error("\n  사용법: npm run new -- 폴더이름");
  console.error("  폴더 이름은 주소(URL)로 쓰여서 영어 소문자, 숫자, - 만 쓸 수 있습니다.");
  console.error("  예: npm run new -- rebar-auto-placer\n");
  process.exit(1);
}

const dir = path.join(root, "content", "projects", slug);
if (fs.existsSync(dir)) {
  console.error(`\n  content/projects/${slug} 폴더가 이미 있습니다.\n`);
  process.exit(1);
}

const template = fs.readFileSync(path.join(root, "content", "projects", "_template", "index.md"), "utf8");
const body = template.replace(/^year: \d{4}/m, `year: ${new Date().getFullYear()}`);

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "index.md"), body);

console.log(`
  만들었습니다: content/projects/${slug}/index.md

  다음 순서:
  1. 이 폴더에 이미지를 넣습니다. 대표 이미지는 cover.jpg, 나머지는 01.jpg, 02.jpg …
  2. index.md에서 title, category, year와 본문을 채웁니다.
  3. npm run dev 로 확인한 뒤 커밋하고 push하면 자동으로 배포됩니다.
`);
