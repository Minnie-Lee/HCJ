# 🎒 Gyeongju School Trip MT Web App

> **"자동차 없이 떠나는 대학생 5인의 1박 2일 경주 수학여행 MT 웹 안내서"**

Google Apps Script(GAS)의 웹 앱(Web App) 배포 기능을 기반으로 구동되는 반응형 싱글 페이지 웹사이트입니다. 복잡한 렌트카 이동 대신 대중교통과 도보를 이용하며, 1인당 10만 원 안팎의 가성비 높은 여행 정보(일정, 이동 동선, 숙소, 식사 플랜, 예산표, 체크리스트)를 브루탈리즘(Brutalism) 감성의 모던한 디자인으로 제공합니다.

---

## 📌 주요 특징

- **Google Apps Script 호스팅**: 별도의 외부 서버나 유료 호스팅 없이 구글 드라이브와 GAS만으로 웹 페이지 무료 배포 가능.
- **모바일 퍼스트 반응형 UI**: PC부터 모바일 화면까지 최적화된 레이아웃 및 터치 스크롤 지원.
- **인터랙티브 DAY 탭 전환**: 자바스크립트로 구현된 가벼운 탭 인터랙션을 통해 1일차/2일차 일정을 직관적으로 확인.
- **직관적인 정보 아키텍처**:
  - **Hero & Ticker**: 트렌디한 타이포그래피와 무한 롤링 티커 배너
  - **Mission Briefing**: 인원(5명), 기간(1박 2일), 교통(No Car), 예산 가이드 요약
  - **Day by Day Schedule**: 시간대별 상세 동선 및 성격별 태그(MOVE, START, FOOD, TOUR, MT 등)
  - **Route Map**: 주요 거점 간 연결 경로 다이어그램
  - **Accommodation & Food**: 가성비 숙소 팁 및 권장 식비 구성
  - **Budget Calculator**: 항목별/1인당/총합 예산 상세 명세
  - **Checklist**: 필수 준비물 및 사전 확인 사항 가이드

---

## 📂 프로젝트 구조

이 프로젝트는 Google Apps Script 환경의 표준적인 단일 템플릿 구조를 따릅니다:

```text
├── Code.gs         # GAS 서버 사이드 엔트리포인트 (doGet 함수)
└── index.html      # HTML 구조 + CSS 스타일링 + 클라이언트 JavaScript (올인원 파일)
```

### 1. `Code.gs`
웹 앱 요청을 처리하는 진입점입니다. `index.html` 파일을 HTML 템플릿으로 컴파일하고 웹 뷰포트에 맞게 렌더링합니다.

```javascript
function doGet() {
  return HtmlService
    .createTemplateFromFile('index')
    .evaluate()
    .setTitle('GYEONGJU SCHOOL TRIP')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

### 2. `index.html`
- **폰트**: Google Fonts (`Inter`, `Black Han Sans`) 적용
- **스타일**: 외부 라이브러리(Bootstrap, Tailwind 등) 없이 순수 CSS(Flexbox, CSS Grid, CSS Variables)로 구현되어 빠른 로딩 속도 보장
- **스크립트**: Vanilla JavaScript 기반의 탭 전환(`showDay()`) 및 모바일 스무스 스크롤 인터랙션

---

## 🚀 배포 및 설치 방법 (Google Apps Script)

### Step 1. 프로젝트 생성
1. [Google Apps Script 대시보드](https://script.google.com/)로 이동합니다.
2. 좌측 상단의 **새 프로젝트** 버튼을 클릭합니다.
3. 프로젝트 제목을 `GYEONGJU_MT_WEBAPP` 등으로 변경합니다.

### Step 2. 코드 복사
1. 기본 생성된 `Code.gs` 파일에 위의 `doGet()` 코드를 붙여넣고 저장(`Ctrl + S` / `Cmd + S`)합니다.
2. 좌측 탐색기에서 **`+` (파일 추가)** 아이콘을 클릭한 뒤 **HTML**을 선택합니다.
3. 파일 이름을 `index`로 지정합니다 (`.html` 확장자는 자동 생성됨).
4. `index.html` 파일에 준비된 전체 소스 코드를 붙여넣고 저장합니다.

### Step 3. 웹 앱으로 배포
1. 편집기 우측 상단의 **배포** > **새 배포**를 클릭합니다.
2. 유형 선택에서 톱니바퀴 아이콘을 누르고 **웹 앱(Web App)**을 선택합니다.
3. 설정을 다음과 같이 구성합니다:
   - **설명**: `v1.0.0 (초기 릴리즈)`
   - **다음 사용자로 실행(Execute as)**: `나(본인 계정)`
   - **액세스 권한이 있는 사용자(Who has access)**: `모든 사용자(Anyone)` (로그인 없이 링크 공유를 위해 권장)
4. **배포** 버튼을 클릭하고 생성된 **웹 앱 URL**을 복사합니다.

---

## 🛠️ 커스터마이징 가이드

- **색상 팔레트 수정**: `index.html`의 `:root` 선택자에서 브랜드 컬러 변수를 손쉽게 수정할 수 있습니다.
  ```css
  :root {
    --black: #111111;
    --white: #f1eee5;
    --yellow: #eaff00; /* 포인트 하이라이트 컬러 */
    --red: #ff3b30;
    --gray: #777777;
  }
  ```
- **일정 및 예산 변경**:
  - `<!-- DAY 01 -->`, `<!-- DAY 02 -->` 하위의 `.schedule-item` 엘리먼트를 추가하거나 시간을 수정할 수 있습니다.
  - `<!-- BUDGET -->` 영역의 `.budget-row` 비용 명세와 총합 수치를 상황에 맞게 갱신할 수 있습니다.

---

## 📱 브라우저 호환성

- Chrome, Safari, Edge, Firefox 최신 버전 지원
- iOS Safari 및 Android 모바일 브라우저 최적화