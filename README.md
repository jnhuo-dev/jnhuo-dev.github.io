# PARK JUN HO Portfolio System

React, TypeScript, Vite 기반의 데이터 관리형 포트폴리오입니다. 프로젝트 설명은 컴포넌트에 흩어두지 않고 `src/data`에서 관리합니다.

## Structure

```text
src/
  components/
    layout/       # Header, Footer, Layout
    project/      # ProjectCard, ProjectList, ProjectDetail, ProjectMeta, ProjectGallery
    common/       # SectionTitle, Tag, SafeImage
  pages/          # Home, Profile, Architecture, BIM, Development, Contact, ProjectDetailPage
  data/           # profile.ts, projects.ts, navigation.ts, skills.ts
  assets/
    projects/     # 프로젝트별 이미지 폴더
    profile/      # 프로필 이미지
  styles/         # variables.css, global.css
```

## 새 프로젝트 추가

1. `src/assets/projects/새-project-id/` 폴더를 만듭니다.
2. 대표 이미지는 `cover.jpg`로 넣습니다.
3. 상세 이미지는 `image-01.jpg`, `image-02.jpg`처럼 추가합니다.
4. `src/data/projects.ts`에 프로젝트 객체 하나를 추가합니다.
5. `category`, `isFeatured`, `order` 값만 조정하면 각 페이지에 자동 표시됩니다.

`category` 값은 `architecture`, `bim`, `development`, `research`, `archive` 중 하나를 사용합니다. Home의 Featured Work는 `isFeatured: true`, 정렬은 `order` 값으로 제어합니다.

## 관리 위치

- 프로젝트 데이터: `src/data/projects.ts`
- 프로젝트 이미지: `src/assets/projects/{project-id}/`
- Featured 변경: `src/data/projects.ts`의 `isFeatured`, `order`
- 상단 메뉴 수정: `src/data/navigation.ts`
- Profile 내용 수정: `src/data/profile.ts`
- 기술 스택 수정: `src/data/skills.ts`

이미지 경로가 비어 있거나 잘못되어도 `SafeImage`가 placeholder를 표시하므로 페이지가 깨지지 않습니다.

## Run Locally

```powershell
npm install
npm run dev
```

빌드 확인:

```powershell
npm run build
```

## GitHub Pages 배포

이 프로젝트는 Vite가 `src/` 코드를 정적 파일로 빌드한 뒤, GitHub Pages가 `dist/` 결과물을 서빙하는 방식입니다. 루트 `index.html`을 브라우저에서 직접 여는 방식이 아니라, 빌드된 HTML/CSS/JS를 배포합니다.

배포 방식:

1. GitHub 저장소 Settings > Pages로 이동합니다.
2. Build and deployment의 Source를 `GitHub Actions`로 설정합니다.
3. 변경 사항을 `main` 브랜치에 push합니다.
4. `.github/workflows/deploy.yml`이 `npm ci`, `npm run build`를 실행하고 `dist/`를 GitHub Pages에 배포합니다.

배포 후 주소는 보통 아래 형식입니다.

```text
https://jnhuo-dev.github.io/
```

`dist/`는 빌드 산출물이므로 커밋하지 않습니다. 실제 수정은 `src/data`, `src/assets`, `src/components`, `src/pages`에서 하고, GitHub Actions가 배포 파일을 자동 생성합니다.
