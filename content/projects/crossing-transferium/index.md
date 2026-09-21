---
title: Crossing Transferium
category: bim
year: 2019
summary: 수서역 일대 환승 주차장을 BIM으로 설계하고 분석한 공동 프로젝트.
type: BIM 설계
role: 공동 작업 — 모델링, 렌더링, 파사드 디자인
award: 2019 BIM AWARDS 우수상
tools: [Revit, Rhino, Grasshopper, Lumion, Navisworks, Robot Structural Analysis, BIM Server]
captions:
  cover.jpg: 프롤로그, Front Loading System(IPD), 동선 다이어그램
  image-01.jpg: 메인 뷰 — 수서역 환승센터 정면
  image-02.jpg: 뷰 A–F — 지상 주차장, 메인 출입구, 버스 정류장, 지하 광장, 외부 광장, 조경 구역
  image-03.jpg: BIM Map, 매스 스터디, 태양에너지 분석, Grasshopper 파사드
  image-04.jpg: 건축·구조·설비 설계, BIM Server, 시공 시뮬레이션, 간섭 검토
---

BIM을 활용한 공용주차장 설계. 환승 주차장에 주차 기능 외에 사람들이 활동할 수 있는 프로그램을 한 지점에 모아 공간 낭비를 줄이고, 서로 다른 위계의 교통시설을 입체적으로 연결하는 복합 환승시설을 제안했다.

핵심은 공동 서버 접속으로 IPD를 실현해 Front Loading 방식으로 계획하고 실행한 것이다. 건축·구조·설비 모델을 하나로 통합해 해석과 시뮬레이션을 했다.

- **매스 스터디** — Revit 에너지 분석으로 풍배도(속도·빈도)를 얻고, Flow Design에 적용해 매스 결정
- **태양에너지 분석** — 일평균 약 86,444kWh의 유입량을 계산하고, 시간별 예측으로 조명 조절에 활용
- **Grasshopper 파사드** — 주차장 외벽 마감재 패턴을 디자인하고, GhPython으로 바람에 따라 움직이는 패널 스크립트 작성
- **구조·설비** — Robot Structural Analysis로 구조 계산, Fz 값이 큰 부분의 기둥 두께 변경
- **BIM Server** — IFC로 변환한 모델을 불러와 구조·설비·건축 요소를 query로 따로 호출
- **Navisworks** — Timeliner로 시공 과정 시뮬레이션, Clash Detective로 분야 간 간섭 확인

## 맡은 부분

공동 작업이며, 나는 이미지·패널 제작(Illustrator, Photoshop), Revit·Rhino 모델링, Lumion 렌더링, Grasshopper 비정형 파사드 디자인, 3D 프린트 프로토타입 제작을 맡았다.
