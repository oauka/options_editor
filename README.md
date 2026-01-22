# Product Options Editor

상품 옵션을 편집하고 이미지로 내보낼 수 있는 에디터입니다.

## 🚀 GitHub & Vercel 배포 방법

### 1단계: GitHub에 업로드

1. **GitHub에서 새 저장소 만들기**
   - https://github.com/new 접속
   - Repository name: `product-options-editor` (원하는 이름)
   - Public 또는 Private 선택
   - `Create repository` 클릭

2. **로컬에서 Git 초기화 및 푸시**
   ```bash
   # 프로젝트 폴더로 이동
   cd product-options-editor
   
   # Git 초기화
   git init
   
   # 모든 파일 추가
   git add .
   
   # 커밋
   git commit -m "Initial commit"
   
   # GitHub 저장소 연결 (YOUR-USERNAME을 본인 GitHub 아이디로 변경)
   git remote add origin https://github.com/YOUR-USERNAME/product-options-editor.git
   
   # main 브랜치로 푸시
   git branch -M main
   git push -u origin main
   ```

### 2단계: Vercel에 배포

1. **Vercel 계정 만들기**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - `Add New...` → `Project` 클릭
   - GitHub 저장소 목록에서 `product-options-editor` 선택
   - `Import` 클릭

3. **프로젝트 설정**
   - Framework Preset: `Vite` (자동 감지됨)
   - Build Command: `npm run build` (기본값)
   - Output Directory: `dist` (기본값)
   - **아무것도 변경하지 말고 `Deploy` 클릭**

4. **배포 완료**
   - 2~3분 후 배포 완료
   - `Visit` 버튼으로 사이트 확인
   - 도메인: `https://your-project.vercel.app`

## 📝 로컬 개발 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

## 🛠️ 수정 후 재배포

```bash
# 파일 수정 후
git add .
git commit -m "Update: 설명"
git push

# Vercel이 자동으로 재배포합니다!
```

## 📌 문의

- Email: mujimuji.purity012@aleeas.com
- Store: https://smartstore.naver.com/wg0057

---

Copyright 2026. MUJIMUJI / Options Editor All rights reserved.
