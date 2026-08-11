# ArchHub: 건축 전용 워크스페이스 플랫폼

## 1. 목적 및 취지 (Purpose & Intent)

**ArchHub**는 소규모 건축사사무소의 업무 효율성을 극대화하기 위해 기획된 **맞춤형 건축 전용 브라우저 플랫폼**입니다.

최근 건축 업계에서도 법규 검토, 이미지 생성, 사례 연구, 보고서 작성 등 다양한 AI 및 기술 솔루션의 활용도가 높아지고 있습니다. 하지만 이러한 서비스들이 뿔뿔이 흩어져 있어 작업의 흐름이 끊기고, 새로운 툴에 대한 사내 노하우가 파편화되는 문제가 발생합니다.

ArchHub는 이러한 문제점을 해결하기 위해 다음과 같은 목표를 가집니다:
*   **워크플로우의 연속성 확보**: 즐겨찾기(탭)의 형태가 아닌, 여러 SaaS 서비스와 내부 도구들을 하나의 통합된 앱 내에서 유기적으로 연결하여 작업 흐름을 유지합니다.
*   **사내 지식 및 노하우 자산화**: 각 툴을 사용할 때 그에 맞는 '사용 설명서'와 '프롬프트 예시'를 실시간으로 함께 띄워, 팀원 누구나 쉽게 새로운 기술을 습득하고 노하우를 공유할 수 있게 합니다.
*   **유지보수의 용이성**: 웹앱(PWA) 형태로 구축하여 업데이트가 쉽고, 추후 고도화 시 데스크탑 앱(Electron/Tauri)으로의 확장을 염두에 둡니다.

---

## 2. 핵심 구성 요소 (Core Components)

ArchHub는 직관적인 **3-Panel 레이아웃**을 기반으로 작동합니다.

1.  **Sidebar (좌측 패널)**
    *   브라우저의 북마크 및 탭 역할을 하며, 건축 업무 단계(법규 검토, 디자인 베이스 등)에 따라 도구들을 분류합니다. 호버링 및 탭 인디케이터를 지원합니다.
2.  **Main Stage (중앙 패널)**
    *   선택한 SaaS 서비스(예: NotebookLM, Cosmos 등) 또는 내부 도구가 실행되는 메인 작업 공간입니다.
3.  **Help & Manual Bar (우측 패널)**
    *   현재 중앙에 열려있는 서비스와 연동되어, 사내에서 작성한 해당 툴의 사용법, 팁, 주의사항 등을 실시간으로 보여주는 마크다운 뷰어입니다.

### 추가 통합 요소 (+a)
*   **사내 일정 (Calendar)**: 프로젝트 마감일 및 사내 일정을 한눈에 파악.
*   **스크립트 & 리소스 뱅크**: Rhino, SketchUp 등의 유용한 스크립트 코드나 CAD/PNG 소스 링크 모음.
*   **통합 계정 금고 (Vault)**: 공용으로 사용하는 SaaS 서비스들의 계정 정보를 한 곳에서 안전하게 관리.

---

## 3. 기술 스택 (Tech Stack)

불필요한 오버엔지니어링을 배제하고 **속도와 실용성**에 집중한 압축 스택을 사용합니다.
*   **Core**: React + Vite (빠른 빌드와 모듈형 구조)
*   **Routing**: React Router (URL 기반 상태 관리)
*   **State**: `useState` + `localStorage` (가볍고 직관적인 UI 상태 유지)
*   **Styling**: Tailwind CSS (빠른 그리드 레이아웃 구성 및 건축적 미학 달성)
*   **PWA**: `vite-plugin-pwa` (설치형 앱 경험 및 오프라인 매뉴얼 캐싱)
*   **Testing**: Vitest (핵심 비즈니스 로직 중심의 빠르고 가벼운 검증)
*   **Utils**: `react-markdown` (도움말 파싱), `lucide-react` (아이콘), Web Crypto API (계정 암호화)

---

## 4. 프로젝트 구조 (Project Structure)

```
Archub/
├── public/                     # 정적 에셋
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── main.jsx                # 앱 진입점
│   ├── App.jsx                 # 루트 컴포넌트 및 라우팅
│   ├── App.css
│   ├── index.css               # 전역 스타일
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx      # 3-Panel 레이아웃 (Sidebar + Stage + HelpBar)
│   │
│   ├── components/
│   │   ├── Sidebar.jsx         # 좌측 워크플로우 네비게이션
│   │   ├── HelpBar.jsx         # 우측 마크다운 도움말 패널
│   │   └── CalendarWidget.jsx  # 일정 위젯
│   │
│   ├── pages/
│   │   ├── WorkflowDashboard.jsx   # 메인 대시보드
│   │   ├── SaaSViewer.jsx          # SaaS iframe 래퍼
│   │   ├── CalendarPage.jsx        # 일정 페이지
│   │   ├── ResourcesPage.jsx       # 스크립트 & 리소스 뱅크
│   │   └── VaultPage.jsx           # 계정 금고 (암호화)
│   │
│   ├── context/
│   │   └── WorkflowContext.jsx # 전역 워크플로우 상태 관리
│   │
│   └── data/
│       └── workflows.js        # 워크플로우 및 SaaS 목록 데이터
│
├── index.html
├── vite.config.js              # Vite + PWA 빌드 설정
├── eslint.config.js
├── package.json
└── .gitignore
```

---

## 5. KCS 표준시방서 자동화 연동 (KCS Automation Integration)

ArchHub의 **Main Stage**에는 외부 SaaS뿐 아니라 **내부 도구**도 통합됩니다. 그 첫 번째 내부 도구가 **KCS 표준시방서 자동화**입니다.

### 개요

KCS 표준시방서 자동화는 국가건설기준(KCS) API를 호출하여 표준시방서 문서를 **한글(HWP) 파일로 자동 생성**하는 Python FastAPI 백엔드 서비스입니다.

### 연결 구조

```
[ArchHub Frontend]                [KCS Automation Backend]
  src/pages/
  └── KcsAutomationPage.jsx  ──►  FastAPI (main.py)
                                       │
                              ┌────────┴─────────────┐
                              │     services/        │
                              │  kcsc_api_client.py  │──► 국가건설기준 API
                              │  hml_generator.py    │──► HML/HWP 변환
                              │  document_orchestrator│
                              └──────────────────────┘
```

### 리포지토리 분리 현황

| 리포지토리 | 내용 | 링크 |
|-----------|------|------|
| **Archub** (이 리포) | ArchHub 프론트엔드 (React + Vite PWA) | [soltocsh-prog/Archub](https://github.com/soltocsh-prog/Archub) |
| **KCS Automation** | KCS 표준시방서 자동화 백엔드 (Python FastAPI) | [soltocsh-prog/-](https://github.com/soltocsh-prog/-) |

### 로컬 실행 방법

**프론트엔드 (ArchHub)**
```bash
npm install
npm run dev
```

**백엔드 (KCS Automation)**
```bash
cd ../KCS_Automation
pip install -r requirements.txt
uvicorn main:app --reload
```

> 두 서비스를 동시에 실행하면 ArchHub의 KCS 자동화 탭에서 직접 표준시방서 문서를 생성할 수 있습니다.

---

## 6. 핵심 설계 결정 사항 (Key Decisions)

### 6.1. 외부 SaaS Iframe 임베딩과 보안 한계
*   **이슈**: NotebookLM, Pinterest 등 최신 SaaS는 자체 보안 정책(X-Frame-Options, CSP)으로 인해 ArchHub의 `<iframe>` 내부에서 열리는 것을 차단합니다.
*   **현재 결정**: Iframe 차단 서비스의 경우 메인 스테이지에 안내 문구를 띄우고 **[새 창에서 열기]** 버튼을 제공하는 우회 방식을 채택. (사이드바 탭 상태는 유지)
*   **향후 계획**: [Phase 4] Electron/Tauri 기반 데스크탑 앱 전환 시 자체 Webview로 완전 해결 예정.

### 6.2. 통합 계정 금고 (Vault) 설계
*   Same-Origin Policy 상 다른 도메인 iframe에 스크립트 주입이 불가하므로 '비밀번호 자동 주입' 기능은 구현하지 않음.
*   Vault는 **사내 공용 계정 게시판** 및 **툴 관리소** 역할로 정의. 자동 로그인은 브라우저 기본 세션/쿠키 활용.

### 6.3. 동적 워크플로우 아키텍처
*   초기 고정 JSON(`workflows.js`) → **React Context + LocalStorage 기반 동적 상태 관리**로 리팩토링.
*   사용자가 직접 원하는 워크플로우에 SaaS 도구를 추가/삭제 가능.

---

## 7. 개발 로드맵 (Implementation Roadmap)

### ✅ [Phase 1: Low-Level] 인프라 및 껍데기 구축 — **완료**
*   Vite + React Router 환경 세팅 및 Tailwind CSS 연동.
*   3단 그리드 레이아웃 (Sidebar, Main Stage, Help Bar) 완성.
*   사이드바 접힘 로직 및 워크플로우 탭 상태(`localStorage`) 구현.

### ✅ [Phase 2: Mid-Level] 콘텐츠 서빙 및 SaaS 임베딩 — **완료**
*   SaaS 목록 대시보드 연동 및 Iframe 래퍼 컴포넌트(`SaaSViewer`) 제작.
*   보안 제약(X-Frame-Options)이 있는 사이트 대상 예외 처리(`window.open`).
*   우측 매뉴얼 바 컴포넌트(`react-markdown`) 뼈대 구축 및 PWA 기본 설정.

### 🔄 [Phase 3: High-Level] 고급 기능 및 사내 데이터 통합 — **진행 중**
*   ✅ **공용 캘린더 연동**: 복수 구글 캘린더 ID 중첩 렌더링 (`CalendarPage`, `CalendarWidget`)
*   ✅ **스크립트 & 리소스 뱅크 UI**: 아코디언 메뉴, 태그 필터링, 프리미엄 카드 UI (`ResourcesPage`)
*   ✅ **동적 워크플로우 & Vault UI**: Context 기반 툴 추가/삭제, `VaultPage` 구축
*   ⏳ **동적 매뉴얼 (Help Bar)**: 사용자가 직접 각 툴의 마크다운 가이드를 작성·저장하는 기능 **(다음 개발 목표)**
*   ⏳ **KCS 표준시방서 자동화 탭 통합**: 내부 FastAPI 백엔드 연동 (`KcsAutomationPage`)

### ⏳ [Phase 4: Expansion] Electron/Tauri 기반 데스크탑 앱 확장 — **대기**
*   **Iframe 제약 완벽 우회**: 모든 SaaS를 데스크탑 셸 내부에 온전히 렌더링.
*   **OS 레벨 통합**: 글로벌 단축키 지원, 로컬 파일 시스템(CAD/스크립트) 드래그 앤 드롭 직접 연동.
