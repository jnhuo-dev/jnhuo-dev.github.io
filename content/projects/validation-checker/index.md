---
title: Validation Checker
category: development
year: 2024
summary: IFC로 내보내기 전에 ID 오류와 철골 보 레벨 오류를 잡아내는 애드인.
type: Revit 애드인
role: 개인 프로젝트
tools: [C#, Revit API, WPF]
featured: true
order: 1
captions:
  cover.jpg: ID Validation Checker(왼쪽)와 Steel Beam Level Validation Checker(오른쪽)
---

Revit 모델을 IFC로 내보낸 뒤에 오류를 발견하면, 원인이 된 요소를 Revit에서 다시 찾아야 한다. 그래서 내보내기 전에 자주 생기는 두 가지 오류를 미리 찾아 고칠 수 있게 만들었다.

## ID Validation Checker

존재하지 않는 Revit ID를 매개변수 값으로 가진 요소를 찾는다. 프로젝트의 거푸집, 구조 기둥·벽·보, 커튼월 요소를 불러와 요소ID 매개변수 값을 `Doc.GetElement()`로 확인하고, 결과가 null이면 그리드뷰에 오류 요소로 표시한다.

## Steel Beam Level Validation Checker

일반 구조 보를 Steel Fabrication Shape 보로 변환하면, 조절해 둔 z Offset 값이 IFC 뷰어에 반영되지 않는다. 그래서 Revit과 IFC 뷰어에서 보의 Z값이 다르게 보인다. 이런 보를 찾아 붉은색으로 표시하고, '레벨 오류 해결' 버튼으로 바로 고칠 수 있게 했다.

두 검사 모두 목록에서 항목을 더블클릭하면 해당 요소를 선택·격리·확대해서 모델 안에서 바로 확인할 수 있다.
