![image](https://github.com/user-attachments/assets/39957791-2a1c-40aa-b0f9-a929b50d30ab)# 🧑🏻‍🎓 Eedututor - 우리반 완전학습 플랫폼  
  <img src="https://github.com/user-attachments/assets/5b911f5d-a462-415f-bcb9-a95d122f2057" alt="메인" width="80%">

## 🔗 **[Edututor 서비스 바로가기](https://edututor.site)**  
## 🧪 테스트 계정
- **선생님 계정**  
  - **ID**: `teacher1`  
  - **비밀번호**: `qwer1234!!`  

- **학생 계정**  
  - **ID**: `student1_1`  
  - **비밀번호**: `qwer1234!!`  

- **관리자 계정**  
  - **ID**: `admin`  
  - **비밀번호**: `qwer1234!!`  
  - **[관리자 페이지 링크](https://edututor.site/admin/login)**  

<br>

## 📢 프로젝트 소개 <a name="about-project">

## 👨‍👩‍👦‍👦 개발팀 <a name="authors"></a>

|      김혁진       |       이수완    |   한유리         |
| :----------------: | :-----------------: | :-----------------: |
| <img src="https://github.com/user-attachments/assets/25e52caa-196d-44c0-b9d0-8269e8419105" width="200" /> | <img src="https://github.com/user-attachments/assets/b99e243e-19ec-4c9b-9bda-450b075a606f" width="200" /> | <img src="https://github.com/user-attachments/assets/42cb937f-0f3c-48f9-a220-45dc875d09e9" width="200" /> |
|   [@hyoekjin](https://github.com/HS-hyeokjin)   |   [@ssuwwann](https://github.com/ssuwwann)  | [@YUL554](https://github.com/YUL554)  |
|  학습/단원/차시 기능 개발 <br> 시험지 생성 및 문제풀이 개발  <br> 관리자 기능 및 CI/CD인프라 담당 | 회원 인증 및 인가 서비스 <br> 클래스룸 관리 및 학생 관리 <br> 메인페이지 및 프론트 UI 개발 담당 | 공지사항/QnA/1:1문의 게시판 개발 <br> 학생/선생 리포트 개발 <br> 데이터베이스 설계 및 관리  |


- **프로젝트 기간**
  - 2024.10.15 - 2024.11.11

- **프로젝트 설명**
  - Edututor는 차시별 형성 평가를 통한 즉각적 인 피드백과 맞춤 학습을 통한 체계적인 학습 서비스입니다.
  - 학생들은 교과서와 학습 목차를 따라 학습하며 형성 평가를 통해 본인의 학습 성과를 확인할 수 있습니다.
  - 교사들은 손쉽게 온라인 평가를 생성하고 학습 자료를 공유하며 학생 개개인의 학습 취약점을 파악해 개선할 수 있는 방법을 제시합니다.
 
- **관련 URL**
  - [Edututor 서비스 바로가기](https://edututor.site)
  - [TLS 팀 노션 바로가기](https://rumbling-crest-74d.notion.site/12149e109b2b8010be35cc2987939cbc?pvs=4)
  - [PPT 자료 바로가기](https://www.canva.com/design/DAGWBDun3gI/zdrTQ5OL6RLVWQNyqVEWWQ/edit?utm_content=DAGWBDun3gI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
    

<p align="right"><a href="#readme-top">⬆️ Top ⬆️</a></p>



## 🔑 주요 기능 <a name="key-features"></a>

## 일반

### 1. 로그인 및 회원가입

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/980a2c70-8447-414c-ad98-6aaf1c31cb05" alt="로그인 회원가입" width="45%">
  <img src="https://github.com/user-attachments/assets/bb9ba0fa-9a8c-4dfc-8c01-578098f802e1" alt="로그인 회원가입" width="45%">
</div>
<br>


- **기능**: JWT 기반 인증 및 OAuth 소셜 로그인 기능 제공
- **설명**: 사용자는 간단한 절차를 통해 계정을 생성할 수 있으며, 보안을 강화한 JWT(JSON Web Token)를 활용해 안전한 인증을 제공합니다.<br> 또한 Google, Naver 등과 같은 소셜 플랫폼 계정을 이용한 OAuth 로그인도 지원하여 더 빠르고 편리한 접근을 제공합니다.<br>이를 통해 사용자는 번거로운 과정 없이 시스템에 접근할 수 있습니다.

---

### 2. 메인화면 및 게시판

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/1c2994f7-5a20-41bb-a7a8-440b33e23559" alt="메인화면 및 게시판" width="45%">
  <img src="https://github.com/user-attachments/assets/e89a8983-9c2d-4ec1-a313-d047bed940c7" alt="메인화면 및 게시판" width="45%">
</div>
<br>

- **기능**: 메인pdf 다운 및 공지사항/FAQ/1:1 질의 서비스 제공
- **설명**: 사용자는 서비스 이용 중 발생하는 문제나 궁금증을 해결하기 위해 고객센터를 이용할 수 있습니다.<br> 공지사항을 통해 최신 정보를 확인하고 FAQ에서 자주 묻는 질문을 빠르게 검색하거나 1:1 문의를 통해 구체적인 문제를 상담받을 수 있습니다.

---

## 선생님

### 1. 우리반 과정등록 및 학생등록

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/a8b65fcc-1eca-4b00-a3a1-98378d81759e" alt="우리반 과정등록 및 학생등록" width="45%">
  <img src="https://github.com/user-attachments/assets/6c10f12e-9127-4970-bb99-301389357e7c" alt="우리반 과정등록 및 학생등록" width="45%">
</div>
<br>

- **기능**: 생성된 과정을 반에 등록하고 학생을 등록하는 기능 제공
- **설명**:
 교사는 먼저 학습 과정을 생성한 후, 이를 특정 반(우리반)에 등록할 수 있습니다.<br>
 이후 학생들을 해당 반에 등록하면, 등록된 학생들은 우리반에 설정된 학습 과정을 열람하고 활용할 수 있습니다.<br>
 이 과정은 교사와 학생 간의 학습 연결을 효율적으로 관리하며, 학생 개개인의 학습 참여도를 높일 수 있습니다.

---

### 2. 시험 공유, 시험지/학습자료 미리보기, 리포트

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/817c9cf3-60e8-41b3-94cf-c8844f1b70f6" alt="미리보기" width="45%">
  <img src="https://github.com/user-attachments/assets/8b8b6588-4368-4cf2-9620-a5cc8a78c6d9" alt="미리보기" width="45%">
</div>
<br>

### 학습자료
- **기능**: 교과서 학습 목차에 맞춘 형성평가, 학습자료 제공
- **설명**: 사용자는 교과서와 성취 기준에 부합하는 체계적인 학습자료를 제공합니다.<br> 교사는 학생 개개인의 수준에 맞춘 맞춤형 학습 경로를 설계할 수 있으며 이를 통해 학생들은 학습 자료를 사용하여 효과적으로 학습할 수 있습니다.

### 시험공유
- **기능**: 학습자료에 기반한 형성평가 공유
- **설명**: 교사는 간단한 클릭만으로 수업 중 사용한 학습자료를 기반으로 평가 과제를 생성하고 배포할 수 있습니다.<br> 학생들에게 개별적으로 맞춤화된 형성평가를 제공하여 학습 내용을 복습하고 이해도를 높이는 데 기여합니다.

### 리포트
- **기능**: 실질적 성취 기준 도달 여부를 리포트로 확인
- **설명**: 학생들의 학습 성과를 보여주는 리포트를 제공합니다.<br>  이를 기반으로 학생들의 성취도를 진단하고 학습 효율성을 높이기 위한 개인 맞춤형 학습 관리를 가능하게 합니다.

---

## 학생

### 1. 학습자료 및 학습자료Ai 요약

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/4872bf52-dd98-403e-bc82-993e9b74e716" alt="학습자료 및 학습자료Ai" width="45%">
  <img src="https://github.com/user-attachments/assets/18432335-194a-4b8b-a395-c8db008146a4" alt="학습자료 및 학습자료Ai" width="45%">
</div>
<br>

- **기능**: 학생 학습자료 페이지 제공 및 학습자료 요약 Ai 서비스 제공
- **설명**: KoGPT2 (한국어 GPT 모델)과 flask를 활용하여 학습자료를 분석하고 텍스트 기반 질문을 생성할 수 있습니다.

---

### 2. 문제풀이 및 채점 리포트

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/99e39562-265b-4d8d-b7f2-4b7a40f78bf7" alt="문제풀이 및 채점 리포트" width="45%">
  <img src="https://github.com/user-attachments/assets/6353406b-ea00-4f9a-a4c6-fd2de4401b6c" alt="문제풀이 및 채점 리포트" width="45%">
</div>
<br>

- **기능**: AI 기반 주관식 채점 및 학습 리포트 제공
- **설명**: lask 서버를 활용하여 학생이 입력한 주관식 답안을 AI 모델로 채점합니다,<br> 채점 결과는 학습 리포트로 시각화되어 학생의 학습 성취도를 진단하고 부족한 부분을 확인할 수 있습니다.

---

## 관리자

### 1. 관리자 메인페이지 및 과정 생성

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/968807ff-6abe-46fc-9704-58fb406bd55e" alt="관리자 메인페이지 및 과정 생성" width="45%">
  <img src="https://github.com/user-attachments/assets/c9a67d13-aaed-458b-af9d-cdac1f573165" alt="관리자 메인페이지 및 과정 생성" width="45%">
</div>
<br>

- **기능**: 관리자 메인페이지에서 학습 과정을 생성하고 관리.
- **설명**: 과정을 학급, 학년, 학기, 과목에 맞게 생성하여 교사와 학생 간의 학습 경로를 체계적으로 설계 할 수 있도록 합니다.

---

### 2. 학습자료 및 시험지 관리

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/30e76829-b36d-444d-a250-eeea6f6ce23b" alt="학습자료 및 시험지 관리" width="45%">
  <img src="https://github.com/user-attachments/assets/0f1c2fb7-8869-4eaa-a659-2961f6906c50" alt="학습자료 및 시험지 관리" width="45%">
</div>
<br>

- **기능**: 학습자료와 시험지 등록 및 관리.
- **설명**: 관리자는 학습 자료와 시험지/시험문제/보기/해설 등을 만들면서 체계적인 학습 기능을 제공합니다.

---

### 3. 회원관리 및 통계

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/cc4bdf4f-06aa-4e2b-ab9f-b8fef48a9fab" alt="회원관리 및 통계" width="45%">
  <img src="https://github.com/user-attachments/assets/67c96fe4-e08b-4333-81d3-4596a1965cef" alt="회원관리 및 통계" width="45%">
</div>
<br>

- **기능**: 사용자 관리 및 학습 통계 제공.
- **설명**: 학생 및 교사의 계정을 관리하고 회원별 통계를 제공하여 회원 상태를 효과적으로 모니터링 할 수 있도록 했습니다.

---

### 4. 문제 오류신고 관리

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/f1a68799-cdd0-4133-a94a-5a89686a68c6" alt="문제 오류신고 관리" width="45%">
  <img src="https://github.com/user-attachments/assets/71171dab-b108-4ee4-8bc8-9737e6bd51c0" alt="문제 오류신고 관리" width="45%">
</div>
<br>

- **기능**: 문제에 대한 오류 문항 신고
- **설명**: 교사는 문제 오류나 오탈자, 정답의 정확성에 대해 쉽게 신고할 수 있는 기능을 제공합니다.<br> 신고된 내용은 관리자가 검토 및 수정할 수 있어 학습 자료의 신뢰성과 정확성을 높이는 데 기여합니다.

---

<p align="right"><a href="#readme-top">⬆️ Top ⬆️</a></p>



# 🛠 개발 환경 <a name="built-with"></a>

## **Front-End**  
<p>
  <img src="https://img.shields.io/badge/react-20232a.svg?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

## **Back-End**  
<p>
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white">
</p>

## **Build Tools**  
<p>
  <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />
</p>

## **Database**  
<p>
  <img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white">
</p>

## **Deployment & CI/CD**  
<p>
  <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

## **Server**  
<p>
  <img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/ec2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white">
  <img src="https://img.shields.io/badge/s3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white">
  <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />
</p>

## **Collaboration**  
<p>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" />
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
</p>

## **Authentication**  
<p>
  <img src="https://img.shields.io/badge/oauth2-3EAAAF?style=for-the-badge&logo=oauth&logoColor=white" />
  <img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" />
  <img src="https://img.shields.io/badge/googleauth-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/naver-03C75A?style=for-the-badge&logo=naver&logoColor=white" />
  <img src="https://img.shields.io/badge/java%20mail%20service-007396?style=for-the-badge&logo=java&logoColor=white" />
</p>


<p align="right"><a href="#readme-top">⬆️ Top ⬆️</a></p>



# 🗼 아키텍처 <a name="architecture"></a>
<img src="https://github.com/user-attachments/assets/a1177abd-f59f-401f-9f1d-f06cd9d714a6" width=100% />
<br><br>

## Frontend
- **기술 스택**: React와 Vite
- **배포**: [Vercel](https://vercel.com)을 통해 배포
- **버전 관리**: 개발자는 GitHub에 코드를 업로드하며, 이를 통해 배포 및 버전 관리를 수행


## Backend
- **호스팅**: AWS EC2 인스턴스
- **Docker 컨테이너**:
  - Spring Boot 애플리케이션이 각각 **8080 포트**와 **8081 포트**에서 실행됩니다.
  - 블루-그린 배포 방식을 사용하여 서비스 중단 없이 안정적으로 배포를 수행합니다.
    - **블루 서버(8080)**: 기존 버전의 안정적인 서비스를 제공.
    - **그린 서버(8081)**: 새로운 버전의 서비스를 제공하며 배포 후 테스트 진행.
    - 배포 완료 후 트래픽을 새로운 서버(8081)로 전환하여 사용자에게 최신 버전을 제공합니다.
- **연동 서버**: Flask 서버와 백엔드가 통합되어 다양한 데이터 처리를 수행.
- **CI/CD**:
  - **Jenkins**를 통해 GitHub 변경 사항을 감지하여 자동으로 Docker 이미지를 빌드 및 배포.
  - 서비스 중단 없이 **블루-그린 서버** 전환 과정을 관리.

## CI/CD (Jenkins)
- **트리거**: GitHub에서 코드 변경 시 Jenkins가 자동으로 빌드 및 배포 프로세스를 작동.
- **작업**:
  - Docker 컨테이너 생성 및 업데이트.
  - 블루-그린 배포 방식으로 8080/8081 서버를 교체하면서 새로운 버전을 서비스에 적용.

## Authentication
- **인증 방법**:
  - OAuth2 및 JWT 기반 인증
  - 외부 인증 서비스: NaverAuth, GoogleAuth
  - 이메일 인증: Java Mail Service 사용

## Database & Storage
- **데이터베이스**: AWS RDS에서 MariaDB 사용
- **스토리지**: AWS S3를 통해 파일 및 데이터 관리

## Proxy & Load Balancing
- **리버스 프록시**: Nginx
- **로드 밸런싱**:
  - Nginx가 8080 및 8081 포트로 들어오는 요청을 분배.
  - 블루-그린 배포 시, 트래픽을 기존 서버(8080)에서 새로운 서버(8081)로 안전하게 전환.


<p align="right"><a href="#readme-top">⬆️ Top ⬆️</a></p>



# 📊 Eedututor 데이터베이스 ERD 
![image](https://github.com/user-attachments/assets/6affac3d-a04b-4fe8-9033-9f640ef3a301)
<br><br>

## 1. 주요 테이블 그룹 설명

### 1️⃣ **과정 - 단원 - 차시 - 학습자료**
- **구성 테이블**: `COURSE`, `SECTION`, `UNIT`, `MATERIAL`
- **설명**:
  - **COURSE(과정)**: 학습의 기본 단위로 수업명 및 관련 정보를 저장.
  - **SECTION(단원)**: 각 과정(course) 내에서 주제를 나눈 단위.
  - **UNIT(차시)**: 단원 내 세부 학습 주제를 정의.
  - **MATERIAL(학습자료)**: 각 차시에 대한 학습 자료(파일, 콘텐츠 등)를 저장.

---

### 2️⃣ **유저 - 학교 - 학급 - 시험공유**
- **구성 테이블**: `USER`, `SCHOOL`, `CLASSROOM`, `SHARE_TEST`
- **설명**:
  - **USER(사용자)**: 학생, 선생님, 관리자 등 사용자 정보를 저장.
  - **SCHOOL(학교)**: 학교 정보를 저장하며, 각 사용자는 특정 학교에 소속될 수 있음.
  - **CLASSROOM(학급)**: 특정 학교에 속한 학급 정보.
  - **SHARE_TEST(시험 공유)**: 선생님 간 시험지를 공유하기 위한 정보 관리.

---

### 3️⃣ **카테고리 - 게시판 - 일대일문의답변**
- **구성 테이블**: `CATEGORY`, `BOARD`, `ANSWER`
- **설명**:
  - **CATEGORY(카테고리)**: 게시판을 그룹으로 묶는 단위.
  - **BOARD(게시판)**: 각 카테고리에 속한 게시글을 저장.
  - **ANSWER(일대일문의 답변)**: 게시글 또는 사용자 문의에 대한 답변을 관리.

---

### 4️⃣ **시험지 - 문제 - 보기 - 유저시험 - 문제신고**
- **구성 테이블**: `TEST_PAPER`, `QUESTION`, `OPTION`, `USER_TEST`, `ISSUE`
- **설명**:
  - **TEST_PAPER(시험지)**: 시험에 포함된 문제 정보를 저장.
  - **QUESTION(문제)**: 시험지의 각 문제를 관리.
  - **OPTION(보기)**: 각 문제에 대한 보기(선택지) 데이터를 관리.
  - **USER_TEST(유저 시험)**: 특정 사용자가 응시한 시험 정보를 기록.
  - **ISSUE(문제 신고)**: 학생이 문제에 대해 신고한 내용을 기록.

---

### 5️⃣ **공통코드그룹 - 공통코드**
- **구성 테이블**: `COMMON_CODE_GROUP`, `COMMON_CODE`
- **설명**:
  - **COMMON_CODE_GROUP(공통코드그룹)**: 코드의 그룹화를 통해 관리.
  - **COMMON_CODE(공통코드)**: 다양한 데이터에서 사용되는 공통적인 코드 값 저장.

---

## 2. 데이터베이스 구조의 주요 특징

1. **모듈화된 설계**:
   - 테이블이 기능별로 세분화되어 있어 독립적으로 확장 가능.
   - 과정, 학습 자료, 게시판, 시험 등 각각의 기능을 별도로 설계.

2. **유연한 관계 설정**:
   - 모든 주요 엔터티는 서로 적절히 연결되어 있으며, N:M 관계를 효과적으로 관리.
   - 예: `USER_TEST`를 통해 사용자와 시험 간의 관계를 효율적으로 처리.

3. **데이터 무결성 유지**:
   - 외래 키 제약 조건을 통해 데이터의 일관성 유지.
   - 삭제/업데이트 시 참조 무결성을 보장.

4. **재사용 가능한 데이터**:
   - 공통 코드(`COMMON_CODE`)와 공통 코드 그룹(`COMMON_CODE_GROUP`)을 활용해 중복 데이터를 최소화.
   - 반복적인 데이터 값을 코드로 관리하여 효율적 데이터 처리.

5. **확장성**:
   - 학교, 학급, 시험 공유 기능을 통해 새로운 기능을 쉽게 추가 가능.
   - 대규모 데이터를 처리할 수 있도록 확장 가능 설계.


<p align="right"><a href="#readme-top">⬆️ Top ⬆️</a></p>

<br>

# 프로젝트 관리

![깃 플로우 (1)](https://github.com/user-attachments/assets/98d0d7a1-45d6-4458-9108-383aaf81d3fe)

### 1. flow 전략

1. **rdev 브랜치와 feat 브랜치 기반 개발**  
   - `rdev` 브랜치를 메인 개발 브랜치로 사용합니다.
   - 각 기능별로 독립된 `feat/<기능명>` 브랜치를 생성하여 기능을 구현합니다.
   
2. **테스트 완료 후 release 브랜치 생성**  
   - 모든 기능 개발 및 테스트가 완료되면 `release/x.0` 브랜치를 생성합니다.
   - 이 브랜치는 안정적인 버전을 위한 브랜치로 사용됩니다.

3. **자동화 배포**  
   - `release/x.0` 브랜치로 병합된 코드는 **Jenkins**를 통해 자동으로 배포됩니다.
   - 이를 통해 수동 작업을 최소화하고, 빠르고 안정적인 배포를 보장합니다.

4. **브랜치 정리**  
   - 병합이 완료되면 해당 `feat/<기능명>` 브랜치를 삭제하여 깔끔한 브랜치 관리를 유지합니다.

## 2. Merge

<img src="https://github.com/user-attachments/assets/1d6e9270-1c18-477b-ab9d-966bd7bc6041" width=35% /> 
<img src="https://github.com/user-attachments/assets/17430f87-77f2-4d78-9fa3-991fd99fe814" width=30% /> 
<img src="https://github.com/user-attachments/assets/9d52f825-2bf9-431c-8f85-d62e2cfeacac" width=34% />

1. **기능 개발 완료 후 PR 작성**  
   - 변경사항과 추가된 기능을 명확히 기록하여 PR을 생성합니다.
   - 코드 변경과 관련된 설명(코드 추가 이유, 해결된 이슈 번호 등)을 포함하여 팀원에게 전달합니다.

2. **변경사항 및 전달사항 공유**  
   - PR 메시지를 통해 주요 변경 내용을 간결하게 설명합니다.
   - 팀원들이 리뷰를 쉽게 이해할 수 있도록 코드에 주석을 추가하거나 추가적인 문서를 첨부합니다.

3. **병합 후 관리**  
   - 병합 완료 후 관련된 브랜치를 삭제하여 깔끔한 브랜치 관리를 유지합니다.
   - 해당 PR에 Label을 달아 기능 목록별 확인 가능하도록 합니다.

<img src="https://github.com/user-attachments/assets/92fa1d1e-c5bd-4722-84e6-919587344c0c" width="70%" />

## 3. 일정관리 - WBS

## 일정 관리: WBS 기반 진행 상황

프로젝트는 **WBS(Work Breakdown Structure)**를 활용하여 작업을 세분화하고 중요도와 작업 단계를 관리했습니다.  

- **구분**: 작업의 범주 (예: 유저, 백엔드, 프론트엔드 등)
- **중요도**: 작업의 우선 순위를 나타내며, 1에서 5로 평가.
- **작업**: 작업의 카테고리 (예: 시험지, 계정, 게시판 등)
- **기능 상세**: 각 작업의 세부적인 구현 내용.
- **담당자**: 해당 작업을 수행하는 팀원.
- **완료 여부**: "진행 전", "진행 중", "구현 완료"로 구분.
- **일정**: 각 작업의 주별 진행 상황.

---

### WBS 작업 및 진행 상황 예시

| 구분          | 중요도 | 작업   | 기능 상세                        | 담당자  | 완료 여부   |
| ------------- | ------- | ------ | ------------------------------- | ------- | ----------- |
| 유저          | 5       | 시험지 | 학생 과정 학습 현황 구현        | 한유리  | 구현 완료   |
| 백엔드        | 4       | 계정   | 회원 가입 및 인증 기능 개발     | 김혁진  | 구현 완료   |
| 백엔드        | 3       | 게시판 | FAQ 게시판 구현                 | 한유리  | 진행 중     |
| 프론트엔드    | 5       | 과정   | 과정별 단원 생성 페이지 구현    | 이수완  | 진행 중     |
| 관리자        | 4       | 시험지 | 시험지 자동 생성 기능 구현      | 김혁진  | 구현 완료   |

---

### WBS 엑셀 파일 예시

<img src="https://github.com/user-attachments/assets/98d0d7a1-45d6-4458-9108-383aaf81d3fe" width="80%" />

---

### 일정 관리 방법

1. **작업 분해**  
   - WBS를 통해 프로젝트를 구분별로 세분화하여 관리.  
     예: 유저 → 학습 현황 구현, 시험지 기능 개발 등
     
2. **진행 상태 모니터링**  
   - 각 작업별 상태를 주차별로 업데이트하여 시각화(위 이미지처럼)했습니다.
   - 상태는 "진행 전", "진행 중", "구현 완료"로 표시했습니다.

3. **담당자 배정 및 중요도 설정**  
   - 작업별 담당자를 명시하고, 중요도를 설정하여 우선순위를 명확히 했습니다.

4. **주차별 관리**  
   - WBS에서 주차별로 각 작업의 진행 상황을 기록하여 일정 관리의 가시성을 높였습니다.

---


### 공통 Response API 설계

 **공통 Response API**를 통해 모든 API 응답 형식을 통일하여 응답에 대한 일관성을 확보합니다.  

-응답 데이터
```json
{
  "status": 0,
  "message": "string",
  "data": {}
}
```

- 사용예시
```java
@GetMapping("/example")
public CommonApiResponse<String> exampleEndpoint() {
    return CommonApiResponse.createCreated("요청이 성공적으로 처리되었습니다.", "Example Data");
}
```

- **`status`**: HTTP 상태 코드를 나타냅니다.  
  - 예: `200` (OK), `400` (Bad Request), `404` (Not Found) 등

- **`message`**: 응답 상태에 대한 설명을 제공합니다.  
  - 예: `"요청이 성공적으로 처리되었습니다."`, `"잘못된 요청입니다."`

- **`data`**: 응답 데이터의 본문을 포함합니다. 데이터가 없는 경우 빈 객체 `{}`로 반환됩니다.

![image](https://github.com/user-attachments/assets/8b9b8d17-be1c-4ad8-a935-daeeb41556d5)



# 주요 기능 다이어그램

## 1. OAuth2 로그인
![image](https://github.com/user-attachments/assets/a6eb5e52-1c31-4df4-b0fe-b8e9888309d0)
status: HTTP 상태 코드를 나타냅니다.
예: 200 (OK), 400 (Bad Request), 404 (Not Found) 등
message: 응답 상태에 대한 설명을 제공합니다.
예: "요청이 성공적으로 처리되었습니다.", "잘못된 요청입니다."
data: 응답 데이터의 본문을 포함합니다. 데이터가 없는 경우 빈 객체 {}로 반환됩니다.

로그인 성공 처리(LoginSuccessHandler):
LoginSuccessHandler가 액세스 토큰과 리프레시 토큰을 수신하고, 이를 OAuth2User와
localStorage에 저장합니다. 이 과정에서 사용자 정보도 함께 저장됩니다.Edututor – 프로그램 설계서
9
보호된 리소스 접근:
클라이언트는 저장된 액세스 토큰을 사용하여 보호된 리소스에 접근합니다.
서버는 요청을 검증하고 필요한 경우 리소스를 반환합니다.
로그인 성공 처리 완료:
최종적으로 클라이언트는 보호된 리소스에 접근할 수 있으며, 이로써 로그인 과정이
성공적으로 완료됩니다.

