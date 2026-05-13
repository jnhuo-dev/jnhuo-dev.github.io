# PARK JUN HO Portfolio Website

정적 HTML, CSS, JavaScript로 구성한 개인 포트폴리오 웹사이트입니다.

## Structure

```text
index.html              # 페이지 구조
style.css               # 전체 스타일
script.js               # 필터, 프로젝트 상세, 모바일 메뉴
src/data/projects.js    # 프로젝트 데이터
images/                 # 프로필 및 프로젝트 이미지
images/projects/        # 프로젝트 이미지 추가 위치
```

## Edit Project Data

프로젝트 제목, 설명, 역할, 도구, 상세 내용은 `src/data/projects.js`에서 수정합니다.

각 프로젝트는 아래 필드를 사용합니다.

```js
{
  id,
  title,
  subtitle,
  category,
  categorySlug,
  group,
  order,
  role,
  tools,
  summary,
  overview,
  problem,
  solution,
  contribution,
  features,
  impact,
  images
}
```

## Add Images

프로젝트 이미지는 `images/projects/`에 넣고, `src/data/projects.js`의 `images` 배열에 연결합니다.

```js
images: [
  {
    src: "images/projects/jhslab-main.jpg",
    alt: "JHSLab Add-in main screen"
  }
]
```

이미지가 비어 있으면 사이트에는 프로젝트명과 `Image will be added later` placeholder가 표시됩니다.

## Run Locally

정적 사이트라 빌드 단계는 없습니다. 로컬 확인은 아래처럼 실행하면 됩니다.

```powershell
python -m http.server 5173
```

브라우저에서 `http://localhost:5173`을 엽니다.
