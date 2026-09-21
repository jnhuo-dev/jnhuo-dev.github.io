# jnhuo-dev.github.io

박준호 포트폴리오. https://jnhuo-dev.github.io/

도면 시트를 모티프로 한 사이트입니다. 작업 목록은 도면 목록표, 각 작업은 한 장의 도면(D-01, B-01, A-01 …), 하단은 표제란입니다.

## 내용 수정

글과 이미지는 모두 [`content/`](content/README.md)에 있습니다. 새 작업 추가 방법도 거기 있습니다.

```bash
npm run new -- 새-폴더-이름
```

## 개발

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # 타입 검사 + 빌드 (content 오류도 여기서 잡힘)
```

| 위치 | 역할 |
|---|---|
| `content/` | 사이트 내용 (프로젝트, 소개) |
| `plugins/content.ts` | `content/`를 읽어 검증하고 `virtual:content` 모듈로 만드는 Vite 플러그인 |
| `src/pages/` | 작업 목록, 작업 상세, 소개, 연락 |
| `src/styles/` | `tokens.css`(색·글꼴), `site.css` |
| `scripts/new-project.mjs` | `npm run new` |

## 배포

`main`에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 빌드해서 GitHub Pages에 올립니다. 저장소 Settings → Pages의 Source는 `GitHub Actions`여야 합니다.
