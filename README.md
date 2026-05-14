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
