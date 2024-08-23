# <img width="30" align="center" src="https://github.com/user-attachments/assets/4fd4dc80-de87-439a-a297-4a32bbdd3f4c"> REBU

<p align="center">
  <img width="100%" src="https://github.com/user-attachments/assets/d0b26443-1d1c-4ced-bda8-52e356b50b40" alt="Description">
</p>


## 💡 프로젝트 소개

REBU는 리뷰/예약 기반 SNS 플랫폼으로 고객은 리뷰를 직관적으로 볼 수 있고, 즉시 예약을 할 수 있습니다. 


또한 매장과 디자이너는 자신에 맞게 시스템을 커스텀하여 더욱 효율적으로 일정을 관리하고 홍보를 할 수 있습니다.

<br>

- **프로젝트 기간**: 2024.07.02 ~ 2024.08.16
- **개발 인원**: (프론트) 양규현, 윤지원, 노진서 / (백엔드) 이유승, 원승현, 김종덕

<br>

### 📌 주요기능 소개

#### 고객 측면(리뷰)
- 미용, 네일, 에스테틱 등 뷰티 관련 매장 리뷰를 SNS 형식으로 직관적으로 제공
- 위치 기반 주변 매장 리뷰 검색
- 프로필 검색을 통한 매장 리뷰 및 게시글 모아보기
<div>
  <img src="https://github.com/user-attachments/assets/8a6b7264-9eea-4757-9206-7a1becd22f7b" width="30%" />
  <img src="https://github.com/user-attachments/assets/72732668-d339-445e-a9fd-ccd3bc7237e8" width="30%" />
</div>

#### 고객 측면(예약)

  


  <img src="https://github.com/user-attachments/assets/89ea024b-582a-4d07-a2da-1e293a9e40aa" width="90%" />
  <img src="https://github.com/user-attachments/assets/32515e20-339f-4fb2-bc65-52b283bb44af" width="90%" />
  <img src="https://github.com/user-attachments/assets/dbbd2b60-2385-451f-925b-48c6c5c1112b" width="90%" />

<br>


## <img align="center" width="50" src="https://github.com/user-attachments/assets/471435b6-e345-414d-b6eb-2fb11de1eb8f"> 시스템 아키텍처
<p align="center">
  <img width="80%" src="https://github.com/user-attachments/assets/123c0ae6-44ea-4abe-aa29-078e3b1e2e84"> 
</p>

- **Jenkins**: CI/CD 구축
- **Nginx**: Reverse Proxy를 이용하여 클라이언트의 요청 분배
- **Redis**: 리프레시 토큰 저장 및 인증 세션 저장소

### 개발 환경
- **개발 언어**: Java 17
- **빌드 툴**: Gradle
- **프레임워크**: Spring Boot 3.3.2

**프레임워크 및 라이브러리**
<div>
  <span><img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white"/></span>
  <span><img src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white"/></span>
  <span><img src="https://img.shields.io/badge/JPA-007396?style=flat-square&logo=java&logoColor=white"/></span>
  <span><img src="https://img.shields.io/badge/QueryDSL-007396?style=flat-square&logo=java&logoColor=white"/></span>
  <span><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/></span>
  <span><img src="https://img.shields.io/badge/Styled--Component-DB7093?style=flat-square&logo=styled-components&logoColor=white"/></span>
</div>

**데이터베이스**
<div>
  <span><img src="https://img.shields.io/badge/mysql-4479A1.svg?style=flat-square&logo=mysql&logoColor=white"/></span>
  <span><img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white"/></span>
</div>

**인프라 및 배포**
<div>
  <span><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white"/></span>
  <span><img src="https://img.shields.io/badge/jenkins-%232C5263.svg?style=flat-square&logo=jenkins&logoColor=white"/></span>
  <span><img src="https://img.shields.io/badge/AWS EC2-FF9900?style=flat-square&logo=amazonec2&logoColor=white"/></span>
  <span><img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/></span>
</div>

<br>

## 🖨️ ERD
<details>
<summary>ERD 이미지</summary>
<div markdown="1">

<br>

<p align="center"><img src="https://github.com/user-attachments/assets/c951a70f-c8ea-496f-9b25-4d6ebfd74628" width="100%" /></p>

</div>
</details>

## 📊 API 명세서

<a href="https://www.notion.so/REST-API-eb150679fab942c7a17a89bb4d4fc936"> 명세서 링크

