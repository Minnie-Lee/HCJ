# 🌿 이정민의 웹 이력서 (Web Resume & Study Portfolio)

> **"데이터 기반의 문제 해결력과 사용자 중심의 웹 구현력을 갖춘 개발자 이정민입니다."**

산업경영공학 전공 배경의 최적화 역량과 웹 퍼블리싱 기술을 결합하여 제작된 반응형 1페이지 웹 이력서 겸 학습 포트폴리오 웹사이트입니다. 편안하고 신뢰감을 주는 **몽글몽글 파스텔 민트** 디자인 테마를 기반으로, 가독성 높은 레이아웃과 감성적인 인터랙션을 제공합니다.

---

## ✨ 주요 특징 (Key Features)

- **🎨 몽글몽글 파스텔 민트 테마**: 눈의 피로를 덜어주는 부드러운 그린/민트 톤과 라운드 카드 레이아웃 적용.
- **🔤 선명한 타이포그래피**: 산돌 Pretendard 웹폰트와 정교한 레터스페이싱으로 최상의 한글 가독성 확보.
- **🖼️ 시각적 프로필 섹션 (My Info)**: 프로필 이미지(`1.jpg`)와 깔끔한 테이블 스타일의 기본 인적 사항 연동.
- **🏷️ 인터랙티브 스킬 뱃지 (Skills)**: 마우스 오버 시 입체적으로 반응하는 호버 애니메이션 칩 UI.
- **📞 다이렉트 소통 링크 (Contact)**: 전화(`tel:`), 이메일(`mailto:`), SNS 링크(인스타그램) 원클릭 연결.
- **📺 멀티미디어 학습 아카이브 (Study)**: YouTube 임베드 플레이어를 활용한 프로그래밍 및 어학 학습 기록 정리.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 사용 기술 | 설명 |
| :--- | :--- | :--- |
| **Markup** | HTML5 | 시맨틱 태그 구조(`section`, `ol`, `ul`, `table` 등) |
| **Styling** | CSS3 | Flexbox 레이아웃, Box Shadow, CSS 트랜지션 및 반응형 스타일링 |
| **Typography** | Pretendard CDN | 범용적인 고품질 한글 웹 폰트 |
| **Icons** | Native Unicode Emoji | 별도 라이브러리 없이 가볍고 직관적인 이모지 UI 적용 |

---

## 📂 파일 및 폴더 구조 (Project Structure)

```text
📁 Web-Resume/
├── index.html       # 웹 이력서의 뼈대를 이루는 마크업 파일
├── mystyle.css      # 파스텔 민트 감성의 커스텀 스타일시트
├── 1.jpg            # 프로필 사진 (180x225 권장 규격)
└── README.md        # 프로젝트 소개 및 가이드 문서
```

---

## 🎨 디자인 시스템 & 컬러 팔레트 (Color Palette)

`mystyle.css`에서 중심을 이루는 파스텔 민트 및 딥 그린 톤의 컬러 가이드입니다.

| 색상 코드 | 이름/용도 | 적용 영역 |
| :--- | :--- | :--- |
| `#f4f9f7` | **Soft Mint Background** | 페이지 전체 배경 (`body`) |
| `#ffffff` | **Card White** | 카드 박스, 섹션 제목 배지 배경 |
| `#52b788` | **Mint Point Accent** | 메인 제목 (`h1`), 프로필 그림자 등 |
| `#40916c` | **Forest Green** | 섹션 타이틀 (`h2`), 텍스트 링크 |
| `#2d5a44` | **Deep Forest Mint** | 부제목, 표 머리글(`th`), 스킬 태그 글자색 |
| `#b7e4c7` | **Pastel Mint** | 표 헤더 배경, 스킬 태그 호버 배경 |
| `#4a5552` | **Charcoal Green Body** | 기본 본문 텍스트 색상 |

---

## 🚀 실행 및 배포 방법 (Getting Started)

### 1. 로컬 환경에서 실행하기
1. 레포지토리를 클론하거나 파일을 한 폴더에 다운로드합니다.
2. `index.html`과 같은 폴더 위치에 자신의 프로필 사진을 `1.jpg` 파일명으로 배치합니다.
3. `index.html` 파일을 더블 클릭하여 크롬(Chrome), 사파리(Safari), 엣지(Edge) 등의 웹 브라우저에서 바로 확인합니다.

### 2. 무료 웹 호스팅으로 배포하기
- **GitHub Pages**:
  1. GitHub 레포지토리에 `index.html`, `mystyle.css`, `1.jpg`를 커밋 & 푸시합니다.
  2. 레포지토리 **Settings > Pages** 메뉴로 이동합니다.
  3. Branch를 `main` (또는 `master`)으로 설정하고 저장하면 무료 도메인으로 즉시 배포됩니다.
- **Vercel / Netlify**: 드래그 앤 드롭만으로 3초 만에 웹 사이트로 배포 가능합니다.

---

## ✏️ 커스터마이징 가이드 (Customization)

1. **프로필 사진 교체**:
   - `1.jpg` 파일을 본인의 사진으로 교체하거나, `index.html`의 `<img src="1.jpg">` 경로를 수정합니다.
2. **기술 스택 추가/수정 (`#skill`)**:
   - `index.html`의 `<ul class="skill-tags">` 아래에 원하는 항목을 추가합니다:
     ```html
     <li><span>⚡</span> JavaScript</li>
     <li><span>🌱</span> Spring Boot</li>
     ```
3. **학습 동영상 링크 변경 (`#Study`)**:
   - `iframe`의 `src` 속성값(`https://www.youtube.com/embed/...`)을 본인이 공부한 유튜브 영상 ID로 교체합니다.
4. **연락처 정보 변경 (`#contact`)**:
   - 전화번호(`tel:`), 메일 주소(`mailto:`), SNS 프로필 링크를 본인의 정보에 맞게 갱신합니다.

---

## 📄 License & Author

- **Author**: 이정민 (Lee Jeongmin)
- **Contact**: [dad101@naver.com](mailto:dad101@naver.com) / [@j_minni_e](https://www.instagram.com/j_minni_e/)
- **License**: 개인 포트폴리오 및 자유 학습 목적으로 자유롭게 활용 가능합니다.
