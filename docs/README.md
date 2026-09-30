# 🎨 광기의 취미열차

> 취미 활동을 기록하고, 스탬프로 성취를 확인하며,
> AI를 통해 나의 취미 성향을 분석할 수 있는 취미 기록 서비스

## 📌 프로젝트 소개

광기의 취미열차는 사용자가 자신의 취미 활동을 꾸준히 기록하고
성취 과정을 시각적으로 확인할 수 있도록 만든 웹 서비스입니다.

단순한 기록을 넘어 취미 기록 데이터를 기반으로
AI가 사용자의 취미 성향을 분석하고,
커뮤니티를 통해 다른 사용자와 취미 경험을 공유할 수 있습니다.

---

## ✨ 주요 기능

### 🔐 회원 인증
- 회원가입 / 로그인
- JWT 기반 인증
- Axios Interceptor를 통한 인증 토큰 자동 전달
- 인증된 사용자 전용 API 접근

### ❤️ 취미 관리
- 취미 목록 조회
- 관심 취미 선택
- 인기 취미 조회

### 📝 취미 기록
- 취미 활동 기록 작성
- 기록 목록 / 상세 조회
- 기록 수정 / 삭제
- 사용자별 기록 관리

### 🏆 스탬프
- 취미 활동에 따른 스탬프 조회
- 획득 스탬프 및 진행 상황 확인
- 스탬프 통계 조회

### 💬 커뮤니티
- 게시글 작성 / 조회 / 수정 / 삭제
- 댓글 작성 / 조회 / 수정 / 삭제
- 인기 게시글 조회

### 🤖 AI 기능
- 게시글 AI 3줄 요약
- 사용자의 취미 기록 기반 취미 성향 분석

AI 취미 성향은 다음 5가지 유형으로 분석합니다.

- 🔎 Deep Digger — 한 가지 취미를 깊게 탐구하는 유형
- 🧭 Explorer — 다양한 취미와 새로운 경험을 즐기는 유형
- 🤝 Connector — 취미를 통해 사람들과 교류하는 유형
- 🏆 Achiever — 목표와 성취를 중요하게 생각하는 유형
- 🌿 Healing — 취미를 통해 휴식과 회복을 추구하는 유형

### 👤 마이페이지
- 사용자 프로필 조회
- 취미 수 조회
- 취미 기록 수 조회
- 획득 스탬프 수 조회
- 작성 게시글 / 댓글 통계 조회

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express
- TypeScript
- TypeORM
- MySQL
- JWT

### AI

- Groq API
- GPT-OSS

### Infrastructure

- AWS EC2
- AWS RDS
- AWS S3
- AWS CloudFront
- GitHub Actions

---

## 🏗 Architecture

Frontend

React
↓
API Layer
↓
Axios
↓
JWT Interceptor

Backend

Express Router
↓
Authentication Middleware
↓
Controller
↓
Service
↓
TypeORM
↓
MySQL

AI

Service
↓
Groq API
↓
AI Analysis
↓
Structured Response
↓
Frontend

---

## 📂 프로젝트 구조

### Frontend

src/
├── api/
│   ├── client.ts
│   ├── auth.api.ts
│   ├── hobby.api.ts
│   ├── record.api.ts
│   ├── stamp.api.ts
│   ├── post.api.ts
│   ├── comment.api.ts
│   ├── ai.api.ts
│   └── mypage.api.ts
│
├── components/
├── pages/
├── App.tsx
└── main.tsx

### Backend

src/
├── config/
├── controllers/
├── entities/
├── middlewares/
├── routes/
├── services/
└── app.ts

---

## 🔄 API 요청 흐름

예를 들어 AI 취미 분석 요청은 다음과 같이 처리됩니다.

React AI Page
↓
ai.api.ts
↓
Axios
↓
Authorization: Bearer JWT
↓
Express Router
↓
Authentication Middleware
↓
AI Controller
↓
AI Service
↓
TypeORM → 사용자 취미 기록 조회
↓
Groq AI → 취미 성향 분석
↓
Response
↓
React UI

---

## 🔑 주요 API

### Auth
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me

### Hobby
GET /api/hobbies
POST /api/hobbies/:id/pin
GET /api/hobbies/hot

### Hobby Record
취미 기록 CRUD API

### Stamp
GET /api/stamps
GET /api/stamps/summary

### Community
게시글 CRUD
댓글 CRUD
인기 게시글 조회

### AI
POST /api/ai/posts/:postId/summary
POST /api/ai/me/hobby-analysis

### MyPage
GET /api/mypage

---

## 💡 개발 과정에서 해결한 문제

### 1. Frontend / Backend API Path 불일치

프론트엔드에서 요청하는 API 경로와
Express에 등록된 실제 Router prefix가 달라
404 오류가 발생했습니다.

Express의 `app.use()`에 등록된 경로를 기준으로
프론트 API Layer의 endpoint를 통일하여 해결했습니다.

이를 통해 API endpoint를 프론트와 백엔드에서
일관되게 관리하는 것의 중요성을 경험했습니다.

### 2. JWT 인증 요청 자동화

각 API 요청마다 JWT를 직접 전달하는 대신
Axios Request Interceptor를 사용했습니다.

localStorage에 저장된 JWT가 존재하면

Authorization: Bearer TOKEN

형태로 자동 전달하도록 구성하여
인증 로직의 중복을 줄였습니다.

### 3. AI와 일반 데이터 처리 분리

총 기록 수, 가장 많이 활동한 취미 등
DB에서 정확하게 계산할 수 있는 데이터는
AI에게 생성을 맡기지 않았습니다.

TypeORM을 이용하여 서버에서 계산하고,
취미 성향처럼 자연어 분석이 필요한 부분만
AI 모델에 맡겼습니다.

DB → 정량적 데이터
AI → 정성적 분석

역할을 분리하여 AI 응답의 불확실성을 줄였습니다.

---

## 🚀 Deployment

Frontend
- AWS S3
- AWS CloudFront

Backend
- AWS EC2

Database
- AWS RDS MySQL

CI/CD
- GitHub Actions

Monitoring
- AWS CloudWatch

---

## 🔮 향후 개선 계획

- 프로필 수정 기능
- AI 분석 결과 저장
- AI 응답 Structured Output 적용
- Refresh Token 기반 인증
- API 에러 처리 공통화
- React Query를 활용한 서버 상태 관리
- 테스트 코드 추가
- CI/CD 구축
- CloudWatch 모니터링
- 부하 테스트 및 성능 개선

---

## 👩‍💻 Developer

HobbyStamp는 개인 프로젝트로
기획, DB 설계, Backend API 개발,
Frontend UI 구현, API 연동 및 배포까지
전체 개발 과정을 직접 진행했습니다.
- GPS
- 지도 API
- 위치 기반 추천
- 실시간 기능
