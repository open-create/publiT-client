# Publit

개발자들을 위한 지식 공유 플랫폼입니다. 기술 블로그, 튜토리얼, 프로젝트 경험을 공유하고 다른 개발자들과 함께 성장하세요.

## 주요 기능

- **✍️ 쉬운 글쓰기**: 마크다운 에디터로 깔끔하고 읽기 쉬운 글 작성
- **🤝 지식 공유**: 다른 개발자들과 경험과 지식을 나누고 함께 성장
- **빠른 성장**: 다양한 기술과 경험을 통해 개발 실력 향상
- **📊 관리자 대시보드**: 공지사항, 문의, 신고 관리 및 통계 확인

## 🛠️ 기술 스택

### Frontend

- **Next.js 15.4.5** - React 기반 풀스택 프레임워크
- **React 19.1.0** - 사용자 인터페이스 라이브러리
- **TypeScript 5** - 정적 타입 검사
- **Tailwind CSS 4.1.11** - 유틸리티 우선 CSS 프레임워크

### UI/UX

- **Chakra UI 3.23.0** - 접근성 높은 React 컴포넌트 라이브러리
- **Framer Motion 12.23.12** - 애니메이션 라이브러리
- **Emotion** - CSS-in-JS 라이브러리

### Data Management

- **Apollo Client 3.13.9** - GraphQL 클라이언트
- **React Query 5.83.0** - 서버 상태 관리
- **GraphQL 16.11.0** - API 쿼리 언어

### Rich Text Editor

- **TipTap 3.0.7** - 확장 가능한 리치 텍스트 에디터
- **TipTap Starter Kit** - 기본 확장 기능
- **TipTap Link Extension** - 링크 기능

### Development Tools

- **ESLint 9** - 코드 품질 관리
- **PostCSS 8.5.6** - CSS 후처리기
- **Autoprefixer 10.4.21** - CSS 벤더 프리픽스 자동 추가

## 📁 프로젝트 구조

```
publit-client/
├── .env.local                    # 환경 변수
├── next.config.mjs              # Next.js 설정
├── tailwind.config.cjs          # Tailwind CSS 설정
├── postcss.config.cjs           # PostCSS 설정
├── package.json                 # 프로젝트 의존성
├── tsconfig.json               # TypeScript 설정
├── README.md                   # 프로젝트 문서
│
├── public/                     # 정적 파일
│   └── favicon.ico            # 브라우저 탭 아이콘
│
└── src/
    ├── app/                    # Next.js App Router
    │   ├── layout.tsx         # 루트 레이아웃
    │   ├── page.tsx           # 홈(랜딩) 페이지
    │   ├── globals.css        # 전역 스타일
    │   ├── favicon.ico        # 앱 아이콘
    │   │
    │   ├── admin/             # 관리자 섹션
    │   │   ├── layout.tsx     # Admin 전용 레이아웃
    │   │   ├── page.tsx       # 관리자 대시보드
    │   │   ├── notices/       # 공지사항 관리
    │   │   │   ├── page.tsx   # 공지사항 목록
    │   │   │   ├── create/    # 공지사항 작성
    │   │   │   └── [id]/      # 공지사항 상세/수정
    │   │   ├── inquiries/     # 문의 관리
    │   │   │   ├── page.tsx   # 문의 목록
    │   │   │   └── [id]/      # 문의 상세/답변
    │   │   ├── reports/       # 신고 관리
    │   │   │   ├── page.tsx   # 신고 목록
    │   │   │   └── [id]/      # 신고 상세/처리
    │   │   └── stats/         # 통계 대시보드
    │   │       └── page.tsx   # 통계 페이지
    │   │
    │   ├── publit/            # Publit 섹션
    │   │   ├── layout.tsx     # Publit 전용 레이아웃
    │   │   ├── page.tsx       # 게시글 작성
    │   │   ├── [id]/          # 게시글 상세
    │   │   └── settings/      # 사용자 설정
    │   │
    │   ├── auth/              # 인증
    │   │   └── page.tsx       # 로그인/회원가입
    │   ├── feed/              # 피드
    │   │   └── page.tsx       # 게시글 피드
    │   ├── search/            # 검색
    │   │   └── page.tsx       # 검색 페이지
    │   ├── notifications/     # 알림
    │   │   └── page.tsx       # 알림 목록
    │   └── profile/           # 프로필
    │       ├── page.tsx       # 프로필 조회
    │       └── edit/          # 프로필 수정
    │
    ├── components/            # React 컴포넌트
    │   ├── common/            # 공통 컴포넌트
    │   │   ├── Button.tsx     # 버튼 컴포넌트
    │   │   ├── Modal.tsx      # 모달 컴포넌트
    │   │   ├── Layout.tsx     # 레이아웃 컴포넌트
    │   │   └── index.ts       # 컴포넌트 내보내기
    │   │
    │   ├── admin/             # 관리자 전용 컴포넌트
    │   │   ├── Sidebar.tsx    # 관리자 사이드바
    │   │   ├── DataTable.tsx  # 데이터 테이블
    │   │   ├── NoticeForm.tsx # 공지사항 폼
    │   │   └── index.ts       # 컴포넌트 내보내기
    │   │
    │   └── publit/            # Publit 전용 컴포넌트
    │       ├── PostCard.tsx   # 게시글 카드
    │       ├── Editor.tsx     # 리치 텍스트 에디터
    │       ├── FeedList.tsx   # 피드 리스트
    │       └── index.ts       # 컴포넌트 내보내기
    │
    ├── graphql/               # GraphQL 관련
    │   ├── schema.ts          # 타입 정의
    │   ├── queries/           # GraphQL 쿼리
    │   │   └── index.ts       # 쿼리 모음
    │   └── mutations/         # GraphQL 뮤테이션
    │       └── index.ts       # 뮤테이션 모음
    │
    ├── hooks/                 # 커스텀 훅
    │   ├── useAuth.ts         # 인증 관련 훅
    │   ├── useNotices.ts      # 공지사항 관련 훅
    │   └── useResponsive.ts   # 반응형 관련 훅
    │
    ├── lib/                   # 라이브러리 설정
    │   ├── apolloClient.ts    # Apollo Client 설정
    │   └── queryClient.ts     # React Query 설정
    │
    ├── styles/                # 스타일 관련
    │   └── theme.ts           # 테마 설정
    │
    ├── utils/                 # 유틸리티 함수
    │   ├── formatDate.ts      # 날짜 포맷 함수
    │   └── validators.ts      # 유효성 검사 함수
    │
    └── types/                 # TypeScript 타입 정의
        └── index.ts           # 공용 타입
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

1. **저장소 클론**

   ```bash
   git clone https://github.com/your-username/publit-client.git
   cd publit-client
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**

   ```bash
   cp .env.example .env.local
   ```

   `.env.local` 파일을 편집하여 필요한 환경 변수를 설정하세요:

   ```env
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

5. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

## 📝 사용법

### 일반 사용자

- **피드 보기**: `/feed` - 다른 개발자들의 게시글을 확인
- **글쓰기**: `/publit` - 새로운 게시글 작성
- **검색**: `/search` - 게시글 및 사용자 검색
- **프로필**: `/profile` - 개인 프로필 관리

### 관리자

- **대시보드**: `/admin` - 전체 통계 및 관리 메뉴
- **공지사항**: `/admin/notices` - 공지사항 관리
- **문의 관리**: `/admin/inquiries` - 사용자 문의 처리
- **신고 관리**: `/admin/reports` - 신고된 게시글 처리
- **통계**: `/admin/stats` - 상세 통계 확인

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📝 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**Publit** - 개발자들과 함께 성장하는 지식 공유 플랫폼 🚀
