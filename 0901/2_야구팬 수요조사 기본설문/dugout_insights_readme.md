# ⚾ DUGOUT INSIGHTS - 야구팬 수요조사 웹 폼 (GAS & Google Sheets)

> **Google Apps Script(GAS)**와 **Google Sheets**를 연동하여 프로야구 팬들의 관람 패턴, 응원 구단, 선호 요인을 체계적으로 수집하는 **멀티스텝(Multi-step) 반응형 서베이 웹 애플리케이션**입니다.
> 
> 별도의 유료 웹 호스팅이나 복잡한 백엔드 서버 없이 구글 생태계 내에서 무료로 배포하고 즉시 실무에 활용할 수 있습니다.

---

## 📌 목차 (Table of Contents)

1. [프로젝트 개요](#-프로젝트-개요)
2. [주요 화면 및 UX 플로우](#-주요-화면-및-ux-플로우)
3. [주요 기능](#-주요-기능)
4. [기술 스택 & 아키텍처](#-기술-스택--아키텍처)
5. [데이터 저장 구조 (구글 시트 헤더)](#-데이터-저장-구조-구글-시트-헤더)
6. [설정 및 배포 가이드](#-설정-및-배포-가이드)
7. [핵심 코드 동작 원리](#-핵심-코드-동작-원리)
8. [자주 묻는 질문 & 트러블슈팅](#-자주-묻는-질문--트러블슈팅)
9. [라이선스](#-라이선스)

---

## 📖 프로젝트 개요

* **프로젝트명**: DUGOUT INSIGHTS 야구팬 수요조사 시스템
* **목적**: KBO 리그 10개 구단 및 야구 직관 문화에 대한 대중의 시청 빈도, 응원 구단, 팬 이탈/유입 원인을 수집하여 인사이트 도출.
* **디자인 콘셉트**: 딥 네이비(`Deep Navy`, `#030B17`)와 클래식 스포츠 레드(`Accent Red`, `#D90429`)를 조합한 프리미엄 구단 멤버십 스타일.

---

## 🖥️ 주요 화면 및 UX 플로우

본 프로젝트는 페이지 새로고침 없는 **단일 페이지 애플리케이션(SPA)** 형태로 구현되어 있습니다.

```
[Screen 1: 공식 팬 패널 랜딩]
    │  "설문 시작하기 ➔" 클릭
    ▼
[Screen 2: 3단계 멀티스텝 서베이]
    ├─ Step 1: 팬 프로필 입력 (이름, 연락처)
    ├─ Step 2: 10개 구단 그리드 선택 & 관람 빈도
    └─ Step 3: 정성 의견 작성 (선호/비선호 사유)
    │  "제출하기 ✓" 클릭 (비동기 데이터 전송)
    ▼
[Screen 3: 완료 & 리워드 티켓]
    ├─ 참여 요약 정보 (포인트 적립 등)
    └─ 야구장 매점 2,000원 할인권 쿠폰 UI (QR/바코드)
```

---

## ✨ 주요 기능

| 구분 | 주요 기능 | 상세 설명 |
| :--- | :--- | :--- |
| **UX/UI** | **3단계 멀티스텝 폼** | 상단 프로그레스 바(33% ➔ 66% ➔ 100%)와 연동된 자연스러운 스텝 이동 |
| **인터랙션** | **10개 구단 인터랙티브 카드** | SSG, LG, 두산, 삼성, 롯데, KIA, KT, 한화, 키움, NC 및 '해당 없음' 클릭 선택 지원 |
| **검증** | **프론트엔드 유효성 검사** | Step 1 필수 정보(이름, 휴대폰 번호) 미입력 시 다음 단계 진행 차단 |
| **안정성** | **중복 제출 방지 Lock** | 제출 즉시 버튼 텍스트 변경(`제출 중...`) 및 비활성화(`disabled`) 처리 |
| **백엔드** | **Google Apps Script 연동** | `google.script.run` RPC를 통해 구글 스프레드시트 최하단에 즉시 데이터 적재 |
| **리워드** | **보상 티켓 렌더링** | 참여율 제고를 위한 디지털 할인 쿠폰 티켓 UI 및 참여 결과 피드백 화면 제공 |

---

## 🛠️ 기술 스택 & 아키텍처

### 기술 스택
* **Backend**: Google Apps Script (V8 Runtime)
* **Database**: Google Sheets
* **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6)
* **Web Fonts**: Google Fonts (`Cinzel`, `Noto Sans KR`)

### 통신 아키텍처 다이어그램

```
[클라이언트 브라우저 (index_5.html)]
         │
         │  1. form submit (버튼 Lock & 데이터 직렬화)
         ▼
[비동기 RPC 통신 : google.script.run]
         │
         │  2. saveData(formData) 호출
         ▼
[GAS 백엔드 (Code.gs)]
         │
         │  3. SpreadsheetApp.openByUrl() & appendRow()
         ▼
[Google Sheets (데이터베이스 최하단 행 누적)]
         │
         │  4. return { success: true }
         ▼
[클라이언트 콜백 (onSuccessSubmit)]
         │
         ▼
[화면 전환 : 리워드 쿠폰 티켓 노출]
```

---

## 📊 데이터 저장 구조 (구글 시트 헤더)

연동할 구글 스프레드시트의 1행(Header)을 아래와 같이 설정합니다:

| 열 | 컬럼 헤더 이름 | 매핑 데이터 키 | 예시 |
| :---: | :--- | :--- | :--- |
| **A열** | `이름` | `data.name` | 홍길동 |
| **B열** | `전화번호` | `data.phone` | 010-1234-5678 |
| **C열** | `야구를 얼마나 자주 보시나요?` | `data.frequency` | 매일 챙겨본다 |
| **D열** | `어느 팀 팬이신가요?` | `data.team` | KIA 타이거즈 |
| **E열** | `좋아하는 이유를 간단하게 적어보세요.` | `data.reasonLike` | 선수들의 열정과 직관 응원 문화가 좋아서 |
| **F열** | `안보신다면 이유를 말씀해주세요.` | `data.reasonDislike` | 경기 시간이 다소 길어서 |

---

## 🚀 설정 및 배포 가이드

### 1단계: 저장용 스프레드시트 생성
1. [Google Sheets](https://sheets.new)에서 새 스프레드시트를 생성합니다.
2. 1행(A1~F1)에 위의 헤더 명칭을 입력합니다.
3. 브라우저 주소창에서 **스프레드시트 전체 URL**을 복사합니다.

### 2단계: Apps Script 프로젝트 생성 및 코드 작성
1. 스프레드시트 상단 메뉴에서 **[확장 프로그램] > [Apps Script]**를 클릭합니다.
2. `Code.gs` 파일에 아래 백엔드 코드를 붙여넣고, 복사한 시트 URL을 넣습니다.

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('DUGOUT INSIGHTS - 야구팬 수요조사')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function saveData(data) {
  try {
    // ⚠️ 본인의 구글 스프레드시트 URL로 교체하세요.
    var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit"; 
    
    var sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getActiveSheet();
    
    sheet.appendRow([
      data.name, 
      data.phone, 
      data.frequency, 
      data.team, 
      data.reasonLike, 
      data.reasonDislike
    ]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}
```

### 3단계: HTML 파일 추가
1. 좌측 메뉴의 `+` (파일 추가) 버튼 > **[HTML]**을 선택합니다.
2. 파일 이름에 **`index`**를 입력합니다 (`index.html`로 자동 생성).
3. `index_5.html`의 소스 코드를 전체 복사하여 붙여넣고 저장(`Ctrl + S` / `Cmd + S`)합니다.

### 4단계: 웹 앱 배포 (Deployment)
1. 우측 상단 **[배포] > [새 배포]**를 클릭합니다.
2. 유형 선택(톱니바퀴 아이콘)에서 **[웹 앱]**을 선택합니다.
3. 배포 속성을 지정합니다:
   * **설명**: `DUGOUT INSIGHTS 설문 폼 v1.0`
   * **다음 사용자로 실행**: **`나 (내 Google 계정)`**
   * **액세스 권한이 있는 사용자**: **`모든 사용자 (Anyone)`** *(중요: 로그인 없이 익명 참여 가능하도록 설정)*
4. **[배포]**를 누른 뒤 권한 검토 팝업이 뜨면 **[고급] > [안전하지 않은 페이지로 이동]**을 클릭하여 스프레드시트 접근 권한을 승인합니다.
5. 발급된 **웹 앱 URL**을 배포하여 설문을 진행합니다.

---

## 🔍 핵심 코드 동작 원리

### 1. 구단 선택 인터랙션 (`selectTeam`)
```javascript
function selectTeam(elem, teamName) {
  // 기존 선택 해제 및 새로운 선택 활성화
  var allCards = document.querySelectorAll('.team-card');
  allCards.forEach(function(card) {
    card.classList.remove('selected');
  });
  elem.classList.add('selected');
  selectedTeam = teamName;
}
```

### 2. 비동기 데이터 송신 및 로컬 환경 분기
```javascript
// GAS 실서버 환경과 로컬 브라우저 디버깅 환경을 모두 지원
if (typeof google !== 'undefined' && google.script && google.script.run) {
  google.script.run
    .withSuccessHandler(function(res) {
      if (res.success) {
        onSuccessSubmit();
      } else {
        alert('오류가 발생했습니다: ' + res.error);
        nextBtn.disabled = false;
        nextBtn.innerText = '제출하기 ✓';
      }
    })
    .withFailureHandler(function(err) {
      alert('오류가 발생했습니다: ' + err);
      nextBtn.disabled = false;
      nextBtn.innerText = '제출하기 ✓';
    })
    .saveData(formData);
} else {
  // 로컬 단독 실행 테스트 시 가상 제출 처리
  setTimeout(function() {
    onSuccessSubmit();
  }, 600);
}
```

---

## ❓ 자주 묻는 질문 & 트러블슈팅

**Q1. 코드를 수정했는데 배포 링크에 반영되지 않습니다.**  
👉 Google Apps Script는 코드 수정 후 반드시 **[배포] > [배포 관리] > [수정(연필 아이콘)] > 버전: [새 버전] 선택 > [배포]**를 거쳐야 실제 웹 앱 URL에 변경사항이 적용됩니다.

**Q2. 제출 시 권한 오류(`Exception: You do not have permission...`)가 발생합니다.**  
👉 `Code.gs`의 `SPREADSHEET_URL`이 올바른지 확인하고, 해당 스프레드시트를 소유한 구글 계정으로 배포를 진행했는지 점검해 주세요.

**Q3. 응답 일시(타임스탬프)를 함께 기록하고 싶습니다.**  
👉 `Code.gs`의 `saveData` 함수 내부에서 날짜를 생성한 후 `appendRow` 맨 앞에 넣어주시면 됩니다:
```javascript
var timestamp = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
sheet.appendRow([timestamp, data.name, data.phone, data.frequency, data.team, data.reasonLike, data.reasonDislike]);
```

---

## 📄 라이선스 (License)

이 프로젝트는 **MIT License**를 따릅니다. 비상업적/상업적 목적 모두 자유롭게 수정 및 배포할 수 있습니다.