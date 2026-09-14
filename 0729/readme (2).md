# 🌿 이정민 인터랙티브 포트폴리오 대시보드 (Interactive Portfolio Dashboard)

> **"데이터 기반의 문제 해결력과 사용자 중심의 웹 구현력을 갖춘 개발자 이정민입니다."**  
> *"初めまして！データに基づいた問題解決力と、ユーザー中心のWeb実装力を備えたエンジニアの イ・ジョンミン です。"*

---

## 📖 프로젝트 소개 (Overview)

세련되고 차분한 **모던 세이지 그린(Modern Sage Green & Charcoal)** 테마를 기반으로 제작된 대시보드형 1페이지 웹 포트폴리오입니다.  
글래스모피즘(Glassmorphism) 스타일의 상단 배너와 3×2 인터랙티브 카드 그리드를 통해 군더더기 없는 미니멀한 첫 화면을 제공하며, 각 카드를 클릭하면 부드러운 팝업 모달을 통해 세부 이력 및 정보를 탐색할 수 있습니다.

특히 **한국어(KR)와 일본어(JP) 원클릭 다국어 토글 기능**을 기본 내장하여 글로벌 역량을 효과적으로 보여줄 수 있도록 설계되었습니다.

---

## ✨ 주요 기능 (Key Features)

1. **🌐 한/일 다국어 원클릭 토글 (i18n)**
   - 상단 지구본 버튼 클릭 시 페이지 새로고침 없이 한국어(KR)와 일본어(JP) 텍스트가 즉각 전환됩니다.
   - `data-kr`, `data-jp` 커스텀 데이터 속성을 활용한 가볍고 직관적인 자바스크립트 엔진 탑재.
   
2. **🪟 부드러운 글래스모피즘 & 카드 인터랙션**
   - 백드롭 블러(Backdrop Filter) 기반의 고급스러운 반투명 상단 배너.
   - 마우스 오버 시 입체적인 리프트업(Lift-up) 애니메이션과 그라디언트 반전 효과.

3. **📱 반응형 3×2 모달 내비게이션**
   - 데스크톱: 시각적 안정감을 주는 3열 그리드 레이아웃.
   - 태블릿/모바일: 디바이스 해상도에 맞춰 2열 및 1열로 자동 최적화.
   - 모달 바깥 영역 클릭 및 닫기(`×`) 버튼을 통한 간편한 닫기 지원.

4. **🗂️ 6대 핵심 모달 섹션 구성**
   - **기본정보 (Profile)**: 프로필 사진, 인적사항, 학과 사이트 외부 링크
   - **성격 & MBTI (Personality)**: INTP 분석 뱃지, 장점(Strengths) 및 단점(Weaknesses) 상세 분석
   - **기술스택 (Skills)**: SQL, Python, HTML, CSS 등 핵심 역량 카드 UI
   - **경력 & 자격증 (Career)**: 타임라인 뱃지 형태의 직무 활동 및 자격 사항
   - **취미 (Hobby)**: 야구, J-Pop, 게임 등 지원자의 개성을 나타내는 태그 UI
   - **연락처 (Contact)**: Instagram, Naver Blog, 전화 연결 등 원클릭 다이렉트 액션 버튼

---

## 🛠️ 기술 스택 (Tech Stack)

| 분류 | 기술 | 설명 |
| :--- | :--- | :--- |
| **Markup** | HTML5 | 의미론적 시맨틱 태그 및 다국어 `data-*` 속성 기반 구조화 |
| **Styling** | CSS3 (Modern CSS) | CSS 변수(`var`), Flexbox, CSS Grid, Glassmorphism, 모바일 반응형 미디어 쿼리 |
| **Scripting** | Vanilla JavaScript | 모달 팝업 상태 제어(`classList`) 및 DOM 데이터 기반 다국어 변환 로직 |
| **Typography** | Google Fonts | `Noto Sans KR`, `Noto Sans JP` 웹폰트 적용으로 다국어 가독성 극대화 |
| **Iconography** | FontAwesome 6 | 전 섹션 일관된 스타일의 벡터 아이콘 CDN 적용 |

---

## 📂 디렉토리 구조 (Project Structure)

```plaintext
📁 Portfolio-Dashboard/
├── index_2.html        # 대시보드 마크업 및 모달 구조, 다국어 스크립트
├── style.css           # 세이지 그린 테마 스타일시트 및 애니메이션 정의
├── 1.jpg               # 프로필 사진 (모달 내부 노출용)
├── intp.png            # MBTI 대표 이미지 아이콘
└── README.md           # 프로젝트 소개 및 가이드 문서
```

---

## 🎨 디자인 시스템 & 컬러 팔레트 (Design System)

자연의 편안함과 IT 엔지니어의 전문성을 상징하는 **세이지 그린 & 차콜** 중심의 컬러 시스템입니다.

```css
:root {
  --primary-color: #4f772d;      /* 차분한 세이지 그린 */
  --primary-light: #f0f4f0;      /* 소프트 크림 그린 배경 */
  --primary-dark: #2d4f1e;       /* 깊이감 있는 딥 숲색 */
  --accent-color: #90a955;       /* 은은한 올리브 그린 포인트 */
  
  --bg-color: #f8f9fa;           /* 라이트 오프화이트 배경 */
  --text-main: #1d2a1f;          /* 딥 숲 차콜 (본문 텍스트) */
  --text-muted: #627264;         /* 차분한 보조 텍스트 */
}
```

---

## 🚀 실행 및 배포 방법 (Getting Started)

### 1. 로컬 환경에서 실행
1. 저장소를 클론하거나 소스 코드 파일을 다운로드합니다:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```
2. 같은 디렉토리에 `1.jpg`(프로필 사진)와 `intp.png`(MBTI 이미지)를 배치합니다.
3. `index_2.html` 파일을 더블 클릭하여 크롬, 사파리, 엣지 등 최신 브라우저에서 실행합니다.

### 2. GitHub Pages 무료 배포
1. GitHub 저장소의 `Settings` 탭으로 이동합니다.
2. 좌측 메뉴의 **Pages**를 선택합니다.
3. **Build and deployment > Branch** 항목을 `main` (또는 `master`) / `/ (root)`로 선택 후 **Save**를 클릭합니다.
4. 약 1~2분 후 발급된 URL(`https://<username>.github.io/<repo>/`)로 접속하여 웹 포트폴리오를 확인합니다.

---

## ✏️ 커스터마이징 가이드 (Customization)

### 1. 다국어 텍스트 추가 및 변경
새로운 요소나 텍스트를 수정할 때는 `data-kr`과 `data-jp` 속성을 함께 명시해 주면 토글 시 자동으로 반영됩니다:
```html
<span data-kr="한국어 텍스트" data-jp="日本語テキスト">日本語テキスト</span>
```

### 2. 연락처 링크 수정
`#modal-contact` 섹션의 링크 경로를 본인의 채널로 교체합니다:
```html
<a href="https://instagram.com/내아이디" target="_blank" class="contact-btn insta">...</a>
<a href="https://blog.naver.com/내아이디" target="_blank" class="contact-btn blog">...</a>
<a href="tel:010-XXXX-XXXX" class="contact-btn phone">...</a>
```

### 3. 경력 및 자격증 내용 입력
`#modal-career` 섹션의 `<div class="timeline-item">` 내부 텍스트를 본인의 실제 프로젝트 및 취득 자격증 정보로 채워 넣을 수 있습니다.

---

## 📄 License & Author

- **Author**: 이정민 (Jeongmin Lee / イ・ジョンミン)
- **Specialty**: 산업경영공학 (Industrial & Management Engineering)
- **Instagram**: [@j_minni_e](https://instagram.com/j_minni_e)
- **Naver Blog**: [minn_02_](https://blog.naver.com/minn_02_)
- **License**: 개인 포트폴리오 목적으로 자유롭게 수정 및 배포할 수 있습니다.