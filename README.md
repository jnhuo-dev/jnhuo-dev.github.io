# 포트폴리오 웹사이트

현대적이고 반응형인 포트폴리오 웹사이트입니다. HTML, CSS, JavaScript를 사용하여 제작되었으며, GitHub Pages를 통해 호스팅할 수 있습니다.

## 🚀 기능

- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **현대적인 UI/UX**: 깔끔하고 직관적인 인터페이스
- **부드러운 애니메이션**: 스크롤 기반 애니메이션과 호버 효과
- **모바일 친화적**: 햄버거 메뉴와 터치 최적화
- **SEO 최적화**: 메타 태그와 시맨틱 HTML 구조

## 📱 섹션 구성

1. **홈**: 인사말과 프로필 소개
2. **소개**: 자기소개와 경력 통계
3. **기술스택**: Frontend, Backend, Tools 분류
4. **프로젝트**: 포트폴리오 프로젝트 소개
5. **연락처**: 연락 정보와 메시지 폼

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript**: ES6+, DOM 조작, 이벤트 처리
- **Font Awesome**: 아이콘 라이브러리
- **Google Fonts**: Noto Sans KR 폰트

## 📁 파일 구조

```
portfolio/
├── index.html          # 메인 HTML 파일
├── styles.css          # CSS 스타일시트
├── script.js           # JavaScript 기능
└── README.md           # 프로젝트 설명서
```

## 🚀 GitHub Pages 배포 방법

### 1. GitHub 저장소 생성
1. GitHub에서 새 저장소를 생성합니다
2. 저장소 이름을 `username.github.io`로 설정합니다 (username은 본인의 GitHub 사용자명)

### 2. 파일 업로드
1. 이 프로젝트의 모든 파일을 저장소에 업로드합니다
2. `index.html`이 루트 디렉토리에 있어야 합니다

### 3. GitHub Pages 활성화
1. 저장소 설정(Settings)으로 이동
2. Pages 섹션에서 Source를 "Deploy from a branch"로 설정
3. Branch를 "main"으로, 폴더를 "/ (root)"로 설정
4. Save 클릭

### 4. 배포 확인
- 몇 분 후 `https://username.github.io`에서 사이트를 확인할 수 있습니다

## 🎨 커스터마이징

### 색상 변경
`styles.css`에서 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #fbbf24;
    --text-color: #333;
    --background-color: #f9fafb;
}
```

### 내용 수정
- `index.html`에서 텍스트 내용을 수정
- 프로필 정보, 프로젝트, 기술스택 등을 개인 정보로 변경
- 연락처 정보 업데이트

### 이미지 추가
- 프로필 사진을 추가하려면 `profile-avatar` 클래스의 아이콘을 `<img>` 태그로 교체
- 프로젝트 이미지를 추가하려면 `project-image` 클래스의 아이콘을 이미지로 교체

## 📱 반응형 브레이크포인트

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 767px 이하

## 🔧 추가 기능 구현

### 폼 기능
현재 연락처 폼은 프론트엔드만 구현되어 있습니다. 실제 메일 전송을 원한다면:

1. **Formspree** 사용 (무료)
2. **Netlify Forms** 사용
3. **자체 백엔드** 구현

### 분석 도구
- Google Analytics 추가
- Google Search Console 등록

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

버그 리포트나 기능 제안은 언제든 환영합니다!

---

**만든이**: [본인의 이름]
**연락처**: [본인의 이메일]
**GitHub**: [본인의 GitHub 프로필]
