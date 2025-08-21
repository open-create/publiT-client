# Publit Client - 프로젝트 문서

## 1. 프로젝트 개요

**Publit Client**는 Next.js 15와 Chakra UI v3를 기반으로 한 현대적인 웹 애플리케이션입니다. 사용자들이 콘텐츠를 작성하고 공유할 수 있는 플랫폼으로, OAuth 소셜 로그인, 실시간 에디터, 스마트 품질 검사 등의 기능을 제공합니다.

### 주요 기술 스택

- **Frontend**: Next.js 15.4.5, React 19.1.0, TypeScript
- **UI Framework**: Chakra UI v3.24.2
- **State Management**: @tanstack/react-query v5.83.0
- **Rich Text Editor**: TipTap v3
- **Deployment**: Google Cloud Run
- **Build Tool**: Docker

## 2. 프로젝트 주요 기능 및 구조도

### 2.1 핵심 기능

#### 🔐 인증 시스템

- **OAuth 소셜 로그인**: Google, Kakao, Naver 지원
- **자동 로그인**: localStorage 기반 토큰 관리
- **권한 관리**: 사용자/관리자 역할 구분

#### ✍️ 콘텐츠 관리

- **리치 텍스트 에디터**: TipTap 기반 고급 에디터
- **이미지 업로드**: 드래그 앤 드롭 지원
- **실시간 미리보기**: 작성 중 실시간 렌더링

#### 🔍 검색 및 추천

- **실시간 검색**: 키워드 기반 검색
- **스마트 추천**: AI 기반 콘텐츠 추천
- **인기 콘텐츠**: 트렌딩 게시물 표시

#### 👤 사용자 프로필

- **프로필 관리**: 개인정보 수정, 프로필 이미지 변경
- **활동 내역**: 작성한 게시물, 방문 통계
- **구독 관리**: 다른 사용자 구독/구독 해제

#### 🛡️ 관리자 기능

- **신고 관리**: 부적절한 콘텐츠 신고 처리
- **공지사항**: 관리자 공지 작성 및 관리
- **통계 대시보드**: 사용자 활동 통계

### 2.2 프로젝트 구조도

```
publit-client/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # 인증 관련 페이지
│   │   ├── admin/             # 관리자 페이지
│   │   ├── profile/           # 사용자 프로필
│   │   ├── pubble/            # 콘텐츠 작성/상세
│   │   ├── search/            # 검색 페이지
│   │   └── notifications/     # 알림 페이지
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── auth/             # 인증 관련 컴포넌트
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   ├── main/             # 메인 페이지 컴포넌트
│   │   ├── pubble/           # 콘텐츠 관련 컴포넌트
│   │   ├── profile/          # 프로필 관련 컴포넌트
│   │   ├── search/           # 검색 관련 컴포넌트
│   │   └── ui/               # 기본 UI 컴포넌트
│   ├── apis/                 # API 통신 로직
│   ├── hooks/                # 커스텀 훅
│   ├── lib/                  # 유틸리티 라이브러리
│   ├── styles/               # 스타일 관련
│   ├── types/                # TypeScript 타입 정의
│   └── utils/                # 유틸리티 함수
├── public/                   # 정적 파일
├── Dockerfile               # Docker 설정
├── cloudbuild.yaml          # Google Cloud Build 설정
└── next.config.mjs          # Next.js 설정
```

## 3. 개발 과정 (주요 단계와 방법)

### 3.1 초기 설정 및 환경 구성

#### 1단계: 프로젝트 초기화

```bash
# Next.js 프로젝트 생성
npx create-next-app@latest publit-client --typescript --tailwind --app

# Chakra UI 설치 및 설정
npm install @chakra-ui/react @chakra-ui/next-js @emotion/react @emotion/styled framer-motion
```

#### 2단계: 개발 환경 설정

- **ESLint & Prettier**: 코드 품질 관리
- **Husky & lint-staged**: Git 훅을 통한 자동 린팅
- **TypeScript**: 타입 안정성 확보

### 3.2 핵심 기능 구현

#### OAuth 인증 시스템 구현

```typescript
// src/app/auth/login-[provider]/route.ts
export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const url = new URL(`/auth/login-${provider}`, API_BASE);
  return NextResponse.redirect(url.toString(), 302);
}
```

**주요 도전과제 및 해결방법:**

- **문제**: SSR 하이드레이션 에러 (localStorage 접근)
- **해결**: `mounted` 상태를 통한 클라이언트 사이드 렌더링 제어

#### 리치 텍스트 에디터 구현

```typescript
// src/components/pubble/Editor.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const editor = useEditor({
  extensions: [StarterKit, Image, Link, Table],
  content: initialContent,
});
```

**주요 기능:**

- 이미지 드래그 앤 드롭 업로드
- 테이블 생성 및 편집
- 링크 삽입
- 실시간 미리보기

### 3.3 UI/UX 개선 과정

#### 반응형 디자인 구현

```typescript
// src/hooks/useResponsive.ts
export const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return { isMobile, isTablet, isDesktop };
};
```

#### 다크모드 지원

```typescript
// src/components/ui/ColorMode.tsx
import { useColorMode, useColorModeValue } from '@chakra-ui/react';

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  );
};
```

### 3.4 배포 및 DevOps

#### Docker 컨테이너화

```dockerfile
# Dockerfile
FROM node:20-bookworm-slim AS builder
ENV NODE_ENV=production
ENV HUSKY=0
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts

COPY . .
RUN npm run build

FROM node:20-bookworm-slim AS runner
ENV NODE_ENV=production
ENV PORT=8080
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 8080
CMD ["node", "server.js"]
```

#### Google Cloud Run 배포

```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/publit-client:$COMMIT_SHA', '.']

  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'publit-client'
      - '--set-env-vars'
      - 'NEXT_PUBLIC_API_BASE=${_API_BASE}'
```

## 4. 결과물에 대한 설명 및 화면

### 4.1 메인 페이지

- **반응형 그리드 레이아웃**: 다양한 화면 크기에 최적화
- **스마트 추천 탭**: AI 기반 콘텐츠 추천
- **인기 콘텐츠**: 트렌딩 게시물 표시
- **실시간 업데이트**: React Query를 통한 데이터 동기화

### 4.2 콘텐츠 작성 페이지

- **고급 에디터**: TipTap 기반 리치 텍스트 에디터
- **실시간 미리보기**: 작성 중 실시간 렌더링
- **이미지 업로드**: 드래그 앤 드롭 지원
- **자동 저장**: 작성 중 자동 저장 기능

### 4.3 사용자 프로필

- **활동 통계**: 작성한 게시물, 방문자 수
- **프로필 편집**: 개인정보 수정, 프로필 이미지 변경
- **구독 관리**: 다른 사용자 구독/구독 해제

### 4.4 관리자 대시보드

- **신고 관리**: 부적절한 콘텐츠 신고 처리
- **통계 대시보드**: 사용자 활동 통계
- **공지사항 관리**: 관리자 공지 작성 및 관리

## 5. 프로젝트 실행 및 테스트 방법

### 5.1 로컬 개발 환경 설정

#### 1. 저장소 클론

```bash
git clone <repository-url>
cd publit-client
```

#### 2. 의존성 설치

```bash
npm install
```

#### 3. 환경변수 설정

```bash
# .env.local 파일 생성
NEXT_PUBLIC_API_BASE=https://publit2-image-531771359911.asia-northeast1.run.app
```

#### 4. 개발 서버 실행

```bash
npm run dev
```

### 5.2 테스트 방법

#### 기능 테스트

1. **OAuth 로그인 테스트**
   - `/auth` 페이지 접속
   - Google/Kakao/Naver 로그인 버튼 클릭
   - 로그인 성공 후 메인 페이지 리다이렉트 확인

2. **콘텐츠 작성 테스트**
   - `/pubble` 페이지 접속
   - 제목, 내용 입력
   - 이미지 업로드 테스트
   - 발행 버튼 클릭

3. **검색 기능 테스트**
   - `/search` 페이지 접속
   - 키워드 입력
   - 검색 결과 확인

#### 성능 테스트

```bash
# 빌드 테스트
npm run build

# 타입 체크
npm run typecheck

# 린팅
npm run lint
```

### 5.3 배포 테스트

#### Docker 빌드 테스트

```bash
# Docker 이미지 빌드
docker build -t publit-client .

# 로컬에서 컨테이너 실행
docker run -p 3000:8080 publit-client
```

#### Google Cloud Run 배포

```bash
# Cloud Build 트리거 설정 후 자동 배포
# 환경변수 _API_BASE 설정 필요
```

### 5.4 모니터링 및 디버깅

#### 환경변수 확인

```bash
# 배포된 서비스의 환경변수 확인
curl https://publit-client-50435321099.asia-northeast3.run.app/api/debug/env
```

#### 로그 확인

```bash
# Google Cloud Run 로그 확인
gcloud run services logs read publit-client --region=asia-northeast3
```

## 6. 향후 개선 계획

### 6.1 기능 개선

- **실시간 채팅**: 사용자 간 실시간 소통
- **푸시 알림**: 웹 푸시 알림 기능
- **오프라인 지원**: PWA 기능 추가

### 6.2 성능 최적화

- **이미지 최적화**: WebP 포맷 지원
- **코드 스플리팅**: 동적 임포트 최적화
- **캐싱 전략**: Redis 캐싱 도입

### 6.3 보안 강화

- **JWT 토큰**: 보안 토큰 관리 개선
- **Rate Limiting**: API 요청 제한
- **CORS 설정**: 보안 헤더 추가

---

**프로젝트 기간**: 2024년 8월 ~ 현재  
**개발 언어**: TypeScript, JavaScript  
**프레임워크**: Next.js 15, React 19  
**배포 환경**: Google Cloud Run  
**버전 관리**: Git, GitHub
