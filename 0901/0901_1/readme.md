# 🌸 교육자료 신청 웹 폼 (GAS & Google Sheets)

> Google Apps Script(GAS)를 기반으로 구글 스프레드시트와 실시간 연동되는 간편 교육자료 신청 웹 애플리케이션입니다.  
> 사용자가 웹 페이지에서 입력한 신청 정보(이름, 이메일, 메시지)를 백엔드 서버 없이 구글 시트에 안전하게 자동 저장합니다.

---

## 📌 목차 (Table of Contents)

1. [프로젝트 소개](#-프로젝트-소개)
2. [주요 기능](#-주요-기능)
3. [기술 스택 & 아키텍처](#-기술-스택--아키텍처)
4. [파일 구조](#-파일-구조)
5. [설치 및 배포 가이드](#-설치-및-배포-가이드)
6. [코드 상세 분석](#-코드-상세-분석)
7. [커스터마이징 및 확장 팁](#-커스터마이징-및-확장-팁)
8. [자주 묻는 질문 & 트러블슈팅](#-자주-묻는-질문--트러블슈팅)

---

## 📖 프로젝트 소개

- **개발 배경**: 오프라인 또는 온라인 강의/세미나 종료 후 수강생들에게 교육자료를 배포하기 위해 신청자 명단을 빠르게 수집할 목적으로 제작되었습니다.
- **특징**:
  - 별도의 호스팅 서버나 유료 데이터베이스 구축 없이 Google 계정만으로 즉시 운영 가능.
  - 따뜻하고 친근한 피치 코랄(Peach Coral) 톤의 반응형 모바일 최적화 카드 UI 제공.
  - 비동기 통신(`google.script.run`)을 사용하여 페이지 새로고침 없이 즉각적인 제출 및 성공 메시지 전환 지원.

---

## ✨ 주요 기능

| 기능 | 설명 |
| :--- | :--- |
| **실시간 시트 저장** | 수강생이 입력한 이름, 이메일, 전할 말을 구글 스프레드시트의 새 행(`appendRow`)에 즉시 추가 |
| **비동기 데이터 제출** | 페이지 리로드 없이 클라이언트와 GAS 백엔드 간 비동기 RPC 통신 수행 |
| **중복 제출 방지** | 제출 클릭 시 버튼 비활성화(`disabled`) 및 로딩 텍스트('제출 중...') 표시 |
| **동적 화면 전환** | 입력 완료 시 폼이 사라지고 따뜻한 수료/격려 메시지 카드가 표시됨 |
| **초기화 및 재신청** | '다시 신청하기(뒤로가기)' 버튼을 통해 폼 리셋 후 다른 사람의 재신청 가능 |
| **모바일 반응형 UI** | 스마트폰 화면에서도 터치하기 편한 넉넉한 입력창 크기와 폰트 규격 적용 |

---

## 🛠️ 기술 스택 & 아키텍처

### 기술 스택
- **Backend / Serverless**: Google Apps Script (JavaScript 기반)
- **Database / Storage**: Google Sheets (SpreadsheetApp API)
- **Frontend / Client**: HTML5, Modern CSS3, Vanilla JavaScript
- **Typography**: Apple SD Gothic Neo, Noto Sans KR

### 데이터 흐름도 (Data Flow)
```
[사용자 입력 폼] 
       │
       ▼ (form submit 이벤트 감지 & 버튼 lock)
[클라이언트 JS: google.script.run]
       │
       ▼ (비동기 함수 호출)
[GAS 백엔드: saveData(data)]
       │
       ▼ (SpreadsheetApp.appendRow)
[구글 스프레드시트 (저장 완료)]
       │
       ▼ (return { success: true })
[클라이언트 SuccessHandler] ───▶ [성공 화면 표시 & 폼 언마운트]
```

---

## 📂 파일 구조

Google Apps Script 프로젝트 편집기 내 파일 구성:

```plaintext
📁 교육자료-신청-시스템/
├── Code.gs             # 웹 앱 서빙(doGet) 및 스프레드시트 데이터 적재 함수(saveData)
├── index.html          # 클라이언트 폼 UI, 피치 코랄 스타일시트, 비동기 스크립트
└── README.md           # 프로젝트 설정 및 사용 매뉴얼
```

---

## 🚀 설치 및 배포 가이드

### 1단계: 저장용 구글 스프레드시트 생성
1. [Google Drive](https://drive.google.com/)에서 새 **Google 스프레드시트**를 생성합니다.
2. 1행에 헤더를 입력합니다:
   - **A1**: `이름`
   - **B1**: `이메일`
   - **C1**: `교수님께 하고 싶은 말`
   *(필요 시 `D1`에 `신청일시` 추가 가능)*
3. 브라우저 주소창의 **스프레드시트 전체 URL**을 복사해 둡니다.

---

### 2단계: Google Apps Script 프로젝트 생성
1. [Google Apps Script](https://script.google.com/) 콘솔로 이동하여 **새 프로젝트**를 만듭니다. (또는 스프레드시트 상단 메뉴 `확장 프로그램` > `Apps Script` 클릭)
2. 기본 생성된 `Code.gs`에 아래 백엔드 코드를 복사해 넣습니다.
3. `SPREADSHEET_URL` 변수에 1단계에서 복사한 스프레드시트 URL을 붙여넣습니다.

```javascript
// Code.gs
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('교육자료 신청')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function saveData(data) {
  try {
    // ⚠️ 아래에 실제 구글 스프레드시트 URL을 입력하세요.
    var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit"; 
    
    var sheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL).getActiveSheet();
    
    // 데이터 추가 (이름, 이메일, 전달 메시지)
    sheet.appendRow([data.name, data.email, data.message]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}
```

---

### 3단계: HTML 파일 추가
1. Apps Script 편집기 좌측의 `+` (파일 추가) 버튼을 눌러 **HTML**을 선택합니다.
2. 파일 이름을 반드시 `index`로 지정합니다 (`.html`은 자동 입력됨).
3. `index_3.html`의 전체 코드를 복사하여 붙여넣고 저장(`Ctrl+S` / `Cmd+S`)합니다.

---

### 4단계: 웹 앱 배포 (Deploy)
1. 상단 우측의 **[배포]** > **[새 배포]**를 클릭합니다.
2. 유형 선택 톱니바퀴 아이콘을 눌러 **[웹 앱(Web app)]**을 선택합니다.
3. 설정을 다음과 같이 지정합니다:
   - **설명**: `교육자료 신청 폼 v1.0`
   - **다음 사용자로 실행**: `나 (내 Google 계정)`
   - **액세스 권한이 있는 사용자**: **`모든 사용자 (Anyone)`** *(중요: 로그인 없이 외부 수강생이 신청할 수 있도록 설정)*
4. **[배포]**를 클릭한 뒤 나타나는 계정 권한 승인 창에서 `고급` > `...으로 이동(안전하지 않음)`을 눌러 스프레드시트 접근 권한을 허용합니다.
5. 발급된 **웹 앱 URL (`https://script.google.com/macros/s/.../exec`)**을 복사하여 수강생들에게 공유합니다.

---

## 🔍 코드 상세 분석

### 1. 백엔드 (`Code.gs`)
- `doGet()`: 사용자가 브라우저로 접속 시 `index.html` 파일을 렌더링하고 브라우저 타이틀과 반응형 뷰포트 메타태그를 주입합니다.
- `saveData(data)`: 클라이언트 폼 객체를 전달받아 `SpreadsheetApp.openByUrl()`을 통해 시트를 열고, `sheet.appendRow()`로 맨 마지막 줄에 새 행을 삽입합니다.

### 2. 프론트엔드 통신 (`index.html`)
```javascript
google.script.run
  .withSuccessHandler(function(response) {
    if (response.success) {
      // 폼 숨김 & 완료 메시지 노출
      document.getElementById('form-container').style.display = 'none';
      document.getElementById('result-message').style.display = 'block';
    } else {
      alert('오류가 발생했습니다: ' + response.error);
    }
  })
  .withFailureHandler(function(err) {
    alert('네트워크 오류: ' + err);
  })
  .saveData(formData); // 백엔드 함수 비동기 호출
```

---

## 🎨 커스터마이징 및 확장 팁

### 1. 신청 일시(타임스탬프) 함께 기록하기
신청한 시간을 자동으로 함께 남기고 싶다면 `Code.gs`의 `saveData`를 다음과 같이 수정하세요:
```javascript
// 현재 한국 표준시 기준 날짜/시간 생성
var now = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");

// [날짜, 이름, 이메일, 메시지] 순으로 기록
sheet.appendRow([now, data.name, data.email, data.message]);
```

### 2. 메인 컬러 테마 변경
`index.html`의 `<style>` 태그 내 컬러 값을 변경하여 브랜드 색상에 맞출 수 있습니다:
- 메인 코랄 포인트: `#FF7A59`
- 호버 색상: `#E86343`
- 배경색: `#FFF5F2`

---

## ❓ 자주 묻는 질문 & 트러블슈팅

**Q1. "오류가 발생했습니다: Exception: You do not have permission to call SpreadsheetApp.openByUrl" 오류가 납니다.**  
👉 Apps Script 최초 배포 시 권한 승인 단계를 거치지 않았거나, 스프레드시트 URL이 올바르지 않은 경우입니다. 새 배포를 다시 진행하며 권한 허용 팝업을 승인해주세요.

**Q2. 코드를 수정했는데 웹 링크에 반영이 안 됩니다.**  
👉 GAS 웹 앱은 코드를 수정한 뒤 반드시 **[배포] > [배포 관리] > [수정(연필 아이콘)] > 버전을 '새 버전'으로 변경 후 배포**해야 실서버에 반영됩니다.

**Q3. 스프레드시트에 로그인하지 않은 일반 사용자도 제출할 수 있나요?**  
👉 네, 배포 설정에서 **"액세스 권한이 있는 사용자"**를 **`모든 사용자 (Anyone)`**로 지정했기 때문에 별도의 구글 로그인 없이 누구나 제출 가능합니다.

---

## 📄 License

- **License**: MIT License. 자유롭게 수정, 배포 및 상업적/비상업적 목적으로 활용할 수 있습니다.