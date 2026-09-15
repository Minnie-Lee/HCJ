# ⚾ 야구팬 수요조사 웹 폼 (GAS & Google Sheets)

> **Google Apps Script(GAS)**와 **Google Sheets**를 연동하여 야구팬들의 관람 빈도, 응원 구단, 선호/비선호 이유를 실시간으로 수집하고 저장하는 반응형 서베이 웹 애플리케이션입니다.  
> 별도의 유료 서버나 데이터베이스 구축 없이 구글 생태계 내에서 손쉽게 배포 및 운영할 수 있습니다.

---

## 📌 목차 (Table of Contents)

1. [프로젝트 소개](#-프로젝트-소개)
2. [주요 기능](#-주요-기능)
3. [기술 스택 & 아키텍처](#-기술-스택--아키텍처)
4. [UI 디자인 시스템](#-ui-디자인-시스템)
5. [파일 구조](#-파일-구조)
6. [설정 및 배포 가이드](#-설정-및-배포-가이드)
7. [데이터 저장 구조 (스프레드시트 헤더)](#-데이터-저장-구조-스프레드시트-헤더)
8. [코드 동작 원리](#-코드-동작-원리)
9. [자주 묻는 질문 & 트러블슈팅](#-자주-묻는-질문--트러블슈팅)

---

## 📖 프로젝트 소개

- **목적**: KBO 리그 10개 구단 및 야구 문화에 대한 일반 대중과 팬들의 수요, 시청 빈도, 선호/비선호 이유를 간편하게 설문 수집.
- **특징**:
  - 스포츠 감성을 담은 네이비(`Navy`) & 레드(`Red`) 포인트 테마의 카드 UI.
  - 비동기 RPC 통신(`google.script.run`)을 통한 매끄러운 화면 전환(페이지 새로고침 없음).
  - PC 및 스마트폰 환경에 최적화된 반응형 폼 레이아웃.
  - 설문 제출 후 다시 초기화하여 다음 참여자가 연속 작성 가능.

---

## ✨ 주요 기능

| 기능 | 설명 |
| :--- | :--- |
| **KBO 10개 구단 선택 지원** | 드롭다운 셀렉트 박스를 통해 10개 구단 및 '해당 없음' 선택 지원 |
| **관람 빈도별 분류** | '매일 챙겨본다'부터 '거의 보지 않는다'까지 체계적인 시청 패턴 수집 |
| **선택형 심층 질문** | 야구를 좋아하는 이유(장점) 및 보지 않는 이유(이탈 요인)를 자유 기술형 텍스트에어리어로 수집 |
| **중복 제출 방지** | 제출 즉시 버튼 비활성화(`disabled`) 및 '제출 중...' 텍스트 표시 |
| **비동기 시트 행 자동 추가** | GAS `SpreadsheetApp.appendRow`를 통한 즉각적인 6개 열 자동 누적 |
| **원클릭 재신청 (홈으로)** | 제출 완료 후 결과 안내 화면에서 '홈으로' 클릭 시 폼 리셋 및 재입력 화면 전환 |

---

## 🛠️ 기술 스택 & 아키텍처

### 기술 스택
- **Backend**: Google Apps Script (JavaScript Engine V8)
- **Database / Storage**: Google Sheets
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Typography**: Apple SD Gothic Neo, Noto Sans KR

### 아키텍처 다이어그램
```
[사용자 설문 폼 (index.html)]
          │
          ▼  (submit 이벤트 발생 & 버튼 Lock)
[클라이언트 JS : google.script.run]
          │
          ▼  (비동기 RPC 호출)
[GAS 백엔드 : saveData(formData)]
          │
          ▼  (SpreadsheetApp.openByUrl & appendRow)
[구글 스프레드시트 (시트 최하단 행 추가)]
          │
          ▼  (return { success: true })
[클라이언트 콜백: withSuccessHandler]
          │
          ▼
[결과 화면 노출: "감사합니다! 🎉"]
```

---

## 🎨 UI 디자인 시스템

- **스포티 & 트러스티(Sporty & Trusty) 컬러 테마**:
  - `Primary Color`: `#041E42` (정통 클래식 딥 네이비 - 메인 타이틀, 버튼 텍스트, 포커스 테두리)
  - `Accent / Point Color`: `#DC0330` (강렬한 베이스볼 레드 - 제출 버튼 및 그림자 강조)
  - `Hover Accent`: `#B80025` (제출 버튼 호버 컬러)
  - `Background`: `#F0F4F8` (눈이 편안하고 깔끔한 쿨 그레이-블루 톤)
  - `Form Border`: `#E2E8F0` (은은하고 현대적인 입력 필드 보더)
- **인터랙션**:
  - 16px의 넉넉한 버튼 패딩 및 마우스 호버 트랜지션 적용.
  - 반응형 카드 레이아웃(최대 너비 `450px`)으로 한 손 모바일 터치 최적화.

---

## 📂 파일 구조

Google Apps Script 프로젝트 편집기 구성:

```plaintext
📁 야구팬-수요조사-시스템/
├── Code.gs             # doGet() 웹 앱 렌더링 및 saveData() 데이터베이스 적재 처리
├── index.html          # 설문조사 입력 폼 UI, CSS 스타일시트, 비동기 스크립트 (index_4.html)
└── README.md           # 프로젝트 매뉴얼 및 배포 가이드
```

---

## 📊 데이터 저장 구조 (스프레드시트 헤더)

구글 스프레드시트를 생성하고 첫 번째 행(Header)을 아래와 같이 구성합니다:

| 열 | 컬럼 헤더 이름 | 설명 |
| :---: | :--- | :--- |
| **A열** | `이름` | 응답자 성명 |
| **B열** | `전화번호` | 응답자 연락처 (010-0000-0000) |
| **C열** | `야구를 얼마나 자주 보시나요?` | 관람 빈도 (매일, 주 2~3회, 월 1~2회, 거의 안 봄) |
| **D열** | `어느 팀 팬이신가요?` | 응원 구단 (10개 구단 또는 '해당 없음') |
| **E열** | `좋아하는 이유를 간단하게 적어보세요.` | 좋아하는 이유 (응원 문화, 선수 등) |
| **F열** | `안보신다면 이유를 말씀해주세요.` | 비선호 요인 (규칙 어려움, 경기 시간 등 / 생략 가능) |

---

## 🚀 설정 및 배포 가이드

### 1단계: 저장용 구글 스프레드시트 생성
1. [Google Sheets](https://sheets.new)에 접속하여 새 스프레드시트를 만듭니다.
2. 1행에 위의 **헤더(A1 ~ F1)**를 입력합니다.
3. 웹 브라우저 상단 주소창에서 **스프레드시트 전체 URL**을 복사합니다.

---

### 2단계: Google Apps Script 프로젝트 생성 & 코드 설정
1. 스프레드시트 상단 메뉴에서 **[확장 프로그램] > [Apps Script]**를 클릭합니다.
2. 기본 생성된 `Code.gs`에 아래 코드를 붙여넣고, `SPREADSHEET_URL` 변수에 1단계에서 복사한 URL을 입력합니다.

```javascript
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('야구팬 수요조사')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function saveData(data) {
  try {
    // ⚠️ 복사한 스프레드시트 URL을 여기에 붙여넣으세요.
    var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit"; 
    
    var sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getActiveSheet();
    
    // 헤더 순서: 이름, 전화번호, 관람빈도, 구단, 좋아하는 이유, 안보는 이유
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

---

### 3단계: HTML 파일 추가
1. Apps Script 편집기 좌측의 파일 목록에서 **`+` (파일 추가) > [HTML]**을 선택합니다.
2. 파일 이름은 반드시 **`index`**로 입력합니다 (`.html`은 자동 부여).
3. `index_4.html`의 전체 소스코드를 복사하여 붙여넣은 뒤 저장(`Ctrl + S` / `Cmd + S`)합니다.

---

### 4단계: 웹 앱 배포 (Deploy)
1. 편집기 우측 상단의 **[배포] > [새 배포]**를 클릭합니다.
2. 유형 선택(톱니바퀴) 아이콘을 눌러 **[웹 앱(Web app)]**을 선택합니다.
3. 배포 설정을 다음과 같이 지정합니다:
   - **설명**: `야구팬 수요조사 폼 v1.0`
   - **다음 사용자로 실행**: **`나 (내 Google 계정)`**
   - **액세스 권한이 있는 사용자**: **`모든 사용자 (Anyone)`**  
     *(중요: 설문 참여자가 구글 로그인 없이 바로 제출할 수 있도록 설정)*
4. **[배포]** 버튼 클릭 후, 팝업되는 계정 권한 승인 창에서 `고급` > `...으로 이동(안전하지 않음)`을 눌러 스프레드시트 쓰기 권한을 승인합니다.
5. 발급된 **웹 앱 URL (`https://script.google.com/macros/s/.../exec`)**을 복사하여 설문 대상자들에게 배포합니다.

---

## 🔍 코드 동작 원리

### 1. 프론트엔드 데이터 수집 & 잠금 (`index.html`)
```javascript
// 버튼 비활성화 (중복 제출 원천 차단)
var submitBtn = document.getElementById('submit-btn');
submitBtn.disabled = true;
submitBtn.innerText = '제출 중...';

// 6개 필드 데이터 직렬화 객체화
var formData = {
  name: document.getElementById('name').value,
  phone: document.getElementById('phone').value,
  frequency: document.getElementById('frequency').value,
  team: document.getElementById('team').value,
  reasonLike: document.getElementById('reasonLike').value,
  reasonDislike: document.getElementById('reasonDislike').value
};
```

### 2. 구글 비동기 RPC 통신
```javascript
google.script.run
  .withSuccessHandler(function(response) {
    if (response.success) {
      // 폼을 숨기고 감사 완료 메시지 카드 표시
      document.getElementById('form-container').style.display = 'none';
      document.getElementById('result-message').style.display = 'block';
    } else {
      alert('오류가 발생했습니다: ' + response.error);
      submitBtn.disabled = false;
      submitBtn.innerText = '확인';
    }
  })
  .withFailureHandler(function(err) {
    alert('네트워크 오류: ' + err);
    submitBtn.disabled = false;
    submitBtn.innerText = '확인';
  })
  .saveData(formData); // GAS 백엔드 함수 호출
```

---

## ❓ 자주 묻는 질문 & 트러블슈팅

**Q1. 코드를 고쳤는데 배포된 웹 앱 주소에 수정사항이 반영되지 않습니다.**  
👉 GAS 웹 앱은 코드 수정 후 반드시 **[배포] > [배포 관리] > [수정(연필 아이콘)] > 버전: [새 버전] 선택 > [배포]**를 진행해야 최신 코드가 실서버에 반영됩니다.

**Q2. 설문 제출 시 권한 오류(`Exception: You do not have permission...`)가 발생합니다.**  
👉 `Code.gs`에 입력된 스프레드시트 URL이 올바른지 확인하고, 해당 구글 스프레드시트에 작성자 계정이 편집자 권한을 가지고 있는지 확인해주세요.

**Q3. 응답 제출 시간을 함께 기록하고 싶습니다.**  
👉 `Code.gs`의 `saveData` 함수 내에서 아래 코드로 한국 시간 타임스탬프를 생성한 후 `appendRow` 맨 앞에 넣어주시면 됩니다:
```javascript
var timestamp = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
sheet.appendRow([timestamp, data.name, data.phone, data.frequency, data.team, data.reasonLike, data.reasonDislike]);
```

---

## 📄 라이선스 (License)

이 프로젝트는 **MIT License**를 따릅니다. 누구나 자유롭게 수정 및 비상업적/상업적 용도로 활용할 수 있습니다.