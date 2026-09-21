---
title: HBIM
category: bim
year: 2023
summary: 전통 목조건축의 부재를 하나하나 패밀리로 만들고, 기와는 알고리즘으로 생성한 HBIM 모델.
type: 역사건축 BIM
tools: [Revit, Rhino, Grasshopper]
featured: true
captions:
  cover.jpg: HBIM 모델
  image-01.jpg: Rhino 부재 모델링과 Grasshopper 기와 생성 알고리즘
---

Historical Building Information Modeling. 모든 부재를 각각 하나의 패밀리로 만들어, 패밀리마다 고유의 수리이력 데이터가 들어가도록 했다.

부재 형상은 Rhino로 모델링해 부재별로 DWG로 저장하고, Revit 패밀리 파일에서 DWG를 불러와 패밀리로 만든 뒤 프로젝트 파일에서 조립했다.

모델링하기 가장 어려운 기와는 Grasshopper로 풀었다. 지붕 외곽 형상에 맞춰 커브를 그려 알고리즘에 넣으면 기와가 자동으로 만들어진다. 외곽선만 있으면 되기 때문에 다른 프로젝트에서도 다시 쓸 수 있다.
