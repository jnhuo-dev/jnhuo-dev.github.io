---
title: AutoLevel Creator
category: development
year: 2024
summary: 서버에 저장된 현장별 레벨 정보로 Revit 레벨과 평면도를 만드는 애드인.
type: Revit 애드인
role: 기획 · 개발
tools: [C#, Revit API]
featured: true
order: 3
captions:
  cover.jpg: 레벨 및 뷰 생성 창(왼쪽)과 애드인으로 생성한 레벨(오른쪽)
---

서버에 저장된 현장별 레벨 정보를 불러와 Revit 레벨을 만드는 애드인. 프로젝트 초기에 레벨을 손으로 입력하면 값이 틀리거나 빠지기 쉬운데, 이 과정을 창 하나에서 끝낼 수 있게 했다.

- Elevation 값 또는 Height 값을 기준으로 레벨 생성
- 레벨과 그리드 길이를 모델 객체의 바운더리에 맞춰 조절
- 생성한 레벨로 구조·건축·천장 평면도를 만들고 뷰 템플릿 지정
