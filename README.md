# NowWhere Frontend 🚌

> 실시간 위치 기반 버스 정보 제공 웹 애플리케이션

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com)

## 📋 프로젝트 개요

NowWhere는 사용자의 현재 위치를 기반으로 주변 버스 정류장과 실시간 버스 도착 정보를 직관적으로 제공하는 웹 애플리케이션입니다.

**핵심 가치:**
- ⚡ **빠른 정보 제공**: 위치 기반 즉시 주변 버스 정보 표시
- 📱 **모바일 최적화**: 반응형 디자인으로 모든 기기에서 편리하게 사용
- 🎨 **직관적인 UI/UX**: 복잡한 교통 정보를 간단명료하게 표현

## 🚀 주요 기능

### 1. 실시간 위치 기반 정보
- **자동 위치 감지**: 브라우저 Geolocation API를 활용한 현재 위치 자동 감지
- **주소 표시**: 현재 위치의 지번/도로명 주소 제공
- **정확한 좌표**: 위도/경도 정보 표시

### 2. 버스 정류장 검색
- **근처 정류장 목록**: 현재 위치 기준 가까운 버스 정류장 자동 검색
- **거리 정보**: 각 정류장까지의 거리 표시
- **정류장 상세**: 정류장 이름, 고유번호(ARS ID) 제공

### 3. 실시간 버스 도착 정보
- **도착 예정 시간**: 각 버스의 도착 예정 시간 실시간 표시
- **남은 정류장 수**: 현재 위치까지 몇 정류장 남았는지 표시
- **버스 번호**: 노선 번호 및 종류 구분

### 4. 지도 통합 (🆕 2026.01.08)
- **Naver Maps 연동**: 네이버 지도를 활용한 정류장 위치 시각화
- **마커 표시**: 현재 위치 및 주변 정류장을 지도에 마커로 표시
- **정류장 선택**: 지도 마커 클릭 시 해당 정류장 정보 표시
- **반응형 지도**: 모바일과 데스크톱 환경에 최적화된 지도 크기 및 레이아웃

### 5. 모바일 방향 센서 (🆕 2026.01.09)
- **사용자 방향 표시**: 모바일 디바이스의 나침반 센서를 활용하여 사용자가 바라보는 방향을 지도에 표시
- **부채꼴 시각화**: 현재 위치에서 사용자가 바라보는 방향을 부채꼴 형태로 시각화
- **iOS 권한 관리**: iOS 디바이스에서 나침반 버튼을 통한 방향 센서 권한 요청
- **크로스 플랫폼**: iOS와 Android 모두 지원 (DeviceOrientationEvent 기반)

## 🛠 기술 스택

### Core Framework
- **Next.js 16.1.1**: React 기반 풀스택 프레임워크
- **React 19**: 최신 React 버전 (Server Components 지원)
- **TypeScript 5**: 타입 안정성 보장

### Styling & UI
- **Tailwind CSS 3.4**: 유틸리티 기반 CSS 프레임워크
- **Radix UI**: 접근성 높은 UI 컴포넌트 라이브러리
- **Shadcn/ui**: 커스터마이징 가능한 컴포넌트 시스템
- **Lucide React**: 모던한 아이콘 라이브러리

### Maps & Geolocation
- **Naver Maps API**: 지도 표시 및 마커 관리
- **Geolocation API**: 브라우저 위치 정보 활용
- **DeviceOrientation API**: 모바일 방향 센서 활용

### State Management & Data Fetching
- **Axios 1.13.2**: HTTP 클라이언트
- **React Hook Form**: 폼 상태 관리
- **Zod**: 스키마 검증

### Development Tools
- **pnpm**: 빠른 패키지 매니저
- **ESLint**: 코드 품질 관리
- **Next Themes**: 다크모드 지원 (향후 구현 예정)

### Deployment
- **Vercel**: 자동 배포 및 CDN
- **GitHub Actions**: CI/CD (향후 구현 예정)

## 📁 프로젝트 구조

```
nowwhere_front/
│
├── app/                      # Next.js App Router
│   ├── page.tsx             # 메인 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   └── loading.tsx          # 로딩 상태 UI
│
├── components/              # React 컴포넌트
│   ├── layout/              # 레이아웃 컴포넌트
│   │   ├── desktop-layout.tsx
│   │   └── mobile-layout.tsx
│   ├── sidebar/             # 사이드바 (정류장 목록)
│   │   ├── sidebar-content.tsx
│   │   ├── bus-stop-list.tsx
│   │   ├── bus-stop-item.tsx
│   │   ├── subway-station-list.tsx
│   │   └── location-info.tsx
│   ├── detail/              # 상세 정보 패널
│   │   ├── detail-content.tsx
│   │   └── bus-stop-detail.tsx
│   ├── map/                 # 지도 컴포넌트
│   │   └── bus-stop-map.tsx
│   └── ui/                  # Shadcn UI 컴포넌트
│
├── hooks/                   # Custom React Hooks
│   ├── use-location.ts     # 위치 정보 훅
│   ├── use-device-heading.ts  # 디바이스 방향 센서 훅
│   ├── use-transit.ts      # 정류장/버스 정보 훅
│   ├── use-detail.ts       # 상세 정보 훅
│   └── use-search.ts       # 검색 기능 훅
│
├── lib/                     # 유틸리티 및 헬퍼
│   ├── api.ts              # API 클라이언트
│   └── utils.ts            # 공통 유틸 함수
│
├── types/                   # TypeScript 타입 정의
│   └── transit.ts          # 교통 관련 타입
│
├── public/                  # 정적 파일
│
└── styles/                  # 전역 스타일
```

## ⚙️ 환경 설정

### 환경 변수

`.env.local` 파일 생성:

```bash
# Backend API URL
NEXT_PUBLIC_SERVER_HOST=https://wheremybbus.co.kr

# Naver Maps API
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your_naver_map_client_id

# 개발 환경
# NEXT_PUBLIC_SERVER_HOST=http://localhost:8080
```

**Naver Maps API 키 발급 방법:**
1. [Naver Cloud Platform](https://www.ncloud.com/) 접속 및 로그인
2. Console → Services → AI·NAVER API → Application 등록
3. Maps 서비스 선택 및 Web Dynamic Map 활성화
4. Client ID를 `.env.local`에 설정

## 🚀 시작하기

### 사전 요구사항

- **Node.js**: 18.x 이상
- **pnpm**: 8.x 이상

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/bitnalchan92/nowwhere_front.git
cd nowwhere_front

# 2. 의존성 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일 편집

# 4. 개발 서버 실행
pnpm dev
```

개발 서버가 http://localhost:3000 에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드된 앱 실행
pnpm start
```

## 🌐 배포

### Vercel 배포 (권장)

#### 초기 배포

1. **Vercel 계정 연결**
   - https://vercel.com 에서 GitHub 계정으로 로그인

2. **프로젝트 Import**
   - "Add New..." → "Project"
   - `nowwhere_front` 저장소 선택

3. **환경 변수 설정**
   ```
   NEXT_PUBLIC_SERVER_HOST=https://wheremybbus.co.kr
   ```

4. **Deploy** 클릭

#### 자동 배포

- `main` 브랜치에 push하면 자동으로 프로덕션 배포
- Pull Request 생성 시 자동으로 Preview 배포

### 커스텀 도메인 설정 (선택사항)

1. Vercel Dashboard → 프로젝트 선택
2. Settings → Domains
3. 도메인 입력 및 DNS 설정

## 📊 성능 최적화

### 이미 적용된 최적화
- ✅ **Server Components**: Next.js 16의 기본 서버 컴포넌트로 초기 로딩 속도 개선
- ✅ **코드 스플리팅**: 자동 코드 분할로 필요한 코드만 로드
- ✅ **Turbopack**: Next.js 16의 고속 번들러 사용

### 향후 적용 예정
- [ ] 이미지 최적화 (Next.js Image 컴포넌트)
- [ ] API 응답 캐싱
- [ ] Service Worker를 통한 오프라인 지원

## 🔄 개발 로드맵

### 현재 완료된 기능 ✅
- [x] 위치 정보 자동 감지
- [x] 주소 정보 표시
- [x] 근처 버스 정류장 목록
- [x] 실시간 버스 도착 정보
- [x] 반응형 디자인
- [x] Vercel 자동 배포
- [x] HTTPS 보안 통신
- [x] **Naver Maps 통합** (2026.01.08)
  - 정류장 위치 시각화
  - 마커 클릭을 통한 정류장 선택
  - 현재 위치 표시
- [x] **Pull-to-Refresh** (2026.01.06)
  - 모바일에서 아래로 당겨서 새로고침
  - 새로고침 버튼 추가
- [x] **모바일 방향 센서** (2026.01.09)
  - 사용자가 바라보는 방향 시각화
  - iOS/Android 크로스 플랫폼 지원
  - iOS 방향 센서 권한 관리

### 향후 개발 예정 🚧

#### Phase 1: 사용자 경험 개선 (단기)
- [ ] **즐겨찾기 시스템**
  - 자주 이용하는 정류장 저장
  - LocalStorage/IndexedDB 활용
  - 즐겨찾기 빠른 접근

- [ ] **검색 기능**
  - 정류장 이름/번호로 검색
  - 자동완성 지원
  - 최근 검색 기록

- [ ] **버스 도착 알림**
  - Web Push Notification
  - 도착 임박 시 알림
  - 알림 설정 커스터마이징

- [x] ~~**지도 통합**~~ ✅ 완료 (2026.01.08)
  - ~~Naver Maps 연동~~
  - ~~정류장 위치 시각화~~
  - [ ] 버스 실시간 위치 표시 (추가 개발 필요)

#### Phase 2: UI/UX 고도화 (중기)
- [ ] **다크 모드**
  - Next Themes 활용
  - 시스템 설정 자동 감지
  - 사용자 선호도 저장

- [ ] **애니메이션 및 트랜지션**
  - Framer Motion 도입
  - 부드러운 페이지 전환
  - 로딩 스켈레톤 UI

- [ ] **접근성 향상**
  - 스크린 리더 지원 강화
  - 키보드 네비게이션 개선
  - ARIA 속성 추가

- [ ] **PWA (Progressive Web App)**
  - 오프라인 지원
  - 홈 화면 추가 기능
  - 앱과 유사한 사용자 경험

#### Phase 3: 기능 확장 (장기)
- [ ] **사용자 계정 시스템**
  - 소셜 로그인 (Google, Kakao)
  - 설정 동기화
  - 즐겨찾기 클라우드 저장

- [ ] **개인화 대시보드**
  - 자주 가는 경로 학습
  - 출퇴근 시간 자동 감지
  - 맞춤형 정보 제공

- [ ] **경로 플래너**
  - 출발지 → 목적지 경로 안내
  - 환승 정보 제공
  - 소요 시간 예측

- [ ] **커뮤니티 기능**
  - 버스 혼잡도 사용자 제보
  - 실시간 교통 상황 공유
  - 리뷰 및 평가 시스템

#### Phase 4: 성능 및 안정성 (지속)
- [ ] **에러 바운더리**
  - 에러 발생 시 폴백 UI
  - 에러 로깅 및 모니터링
  - Sentry 통합

- [ ] **성능 모니터링**
  - Web Vitals 측정
  - Google Analytics/Vercel Analytics
  - 사용자 행동 분석

- [ ] **테스트 자동화**
  - Jest + React Testing Library
  - E2E 테스트 (Playwright)
  - 시각적 회귀 테스트

- [ ] **국제화 (i18n)**
  - 다국어 지원
  - 지역별 설정
  - 날짜/시간 포맷 현지화

## 🧪 테스트

```bash
# 단위 테스트 (향후 구현)
pnpm test

# E2E 테스트 (향후 구현)
pnpm test:e2e

# 린팅
pnpm lint
```

## 🔒 보안

### 적용된 보안 조치
- ✅ HTTPS 통신
- ✅ 환경 변수를 통한 민감 정보 관리
- ✅ CORS 정책 준수
- ✅ 최신 보안 패치 적용

### 취약점 대응
```bash
# 보안 취약점 스캔
pnpm audit

# 자동 수정
pnpm audit fix
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 코딩 컨벤션
- TypeScript 사용 필수
- ESLint 규칙 준수
- 컴포넌트는 함수형으로 작성
- 명확한 변수/함수명 사용

## 📝 라이선스

This project is licensed under the MIT License.

## 📧 문의

프로젝트 관련 문의사항은 Issues를 통해 남겨주세요.

## 📝 최근 업데이트 내역

### 2026.01.09
- **앱 부제 추가**: "추운 겨울 손이 시린데 타이핑은 하기 싫어 만든" 감성적인 부제 추가
- **iOS 방향 센서 권한 관리**: iOS 디바이스에서 나침반 버튼을 통해 방향 센서 권한 요청 기능 추가
- **모바일 방향 표시**: 사용자가 바라보는 방향을 지도에 부채꼴 형태로 시각화

### 2026.01.08
- **Naver Maps 통합**: 네이버 지도 API를 활용한 정류장 위치 시각화 기능 추가
- **지도 마커**: 현재 위치 및 주변 정류장을 지도에 마커로 표시
- **반응형 지도**: 모바일과 데스크톱 환경에 최적화된 지도 레이아웃 구현

### 2026.01.06-07
- **Pull-to-Refresh**: 모바일에서 아래로 당겨서 새로고침 기능 추가
- **새로고침 버튼**: 수동 새로고침을 위한 버튼 UI 추가
- **UX 개선**: Pull-to-Refresh 동작 범위를 전체 콘텐츠 영역으로 확장

## 🔗 관련 링크

- **Live Demo**: https://v0-simple-bus-app.vercel.app
- **Backend Repository**: https://github.com/bitnalchan92/nowwhere_back
- **Backend API**: https://wheremybbus.co.kr

---

Made with ❤️ by bitnalchan92
