# <img width="30" align="center" src="https://github.com/user-attachments/assets/4fd4dc80-de87-439a-a297-4a32bbdd3f4c"> REBU

<p align="center">
  <img width="100%" src="https://github.com/user-attachments/assets/d0b26443-1d1c-4ced-bda8-52e356b50b40" alt="Description">
</p>


## 💡 프로젝트 소개

REBU는 리뷰/예약 기반 SNS 플랫폼으로 고객은 리뷰를 직관적으로 볼 수 있고, 즉시 예약을 할 수 있습니다. 


또한 매장과 디자이너는 자신에 맞게 시스템을 커스텀하여 더욱 효율적으로 일정을 관리하고 홍보를 할 수 있습니다.

<br>

- **프로젝트 기간**: 2024.07.02 ~ 2024.08.16
  
### 👨🏻‍💻 개발 인원

|         <img src="https://github.com/yuseung0429.png" width="150">          |   <img src="https://github.com/hyeon8571.png" width="150">   |    <img src="https://github.com/Kimjongdeok11.png" width="150">     | <img src="https://github.com/altys31.png" width="150">  |   <img src="https://github.com/dbe0717.png" width="150">    |       <img src="https://github.com/Roh-Jinseo.png" width="150">       |
| :----------------------------------------------------------------------: | :---------------------------------------------------------: | :---------------------------------------------------------------: | :---------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------------------: |
| [이유승<br>@yuseung0429](https://github.com/yuseung0429)<br/>`BE`<br/>`Leader` | [원승현<br>@hyeon8571](https://github.com/hyeon8571)<br/>`BE` | [김종덕<br>@Kimjongdeok11](https://github.com/Kimjongdeok11)<br/>`BE` | [양규현<br>@altys31](https://github.com/altys31)<br/>`FE` | [윤지원<br>@dbe0717](https://github.com/dbe0717)<br/>`FE` | [노진서<br>@Roh-Jinseo](https://github.com/Roh-Jinseo)<br/>`FE` |

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
- 리뷰를 보고 실시간 예약 가능
- 팔로우, 즐겨찾기 기능을 통해 관심 매장 등록 후 예약 가능
- 편리한 예약 정보 관리
<div>
  <img src="https://github.com/user-attachments/assets/162b91d5-34d3-4732-955d-238dd7f6c2d9" width="30%" />
  <img src="https://github.com/user-attachments/assets/998249d7-4e7b-4baa-a750-510a22a77765" width="30%" />
  <img src="https://github.com/user-attachments/assets/97220add-56e2-4381-abdb-ef4fa69ef7f4" width="30%" />
</div>

#### 매장/디자이너 측면
- 디자이너 관리 및 시술 정보 관리
- 예약 시간 단위 커스텀 및 시술 시간에 따른 일정 관리
- SNS 형식의 매장 홍보글 작성 가능
<div>
  <img src="https://github.com/user-attachments/assets/c4911886-c02e-4161-ac55-08caaeae5a16" width="30%" />
  <img src="https://github.com/user-attachments/assets/baf110c1-bc6b-4217-a3ae-bacf6fefd917" width="30%" />
  <img src="https://github.com/user-attachments/assets/698d2832-db9e-4ca5-bf42-286469555f35" width="30%" />
</div>

#### 기타
- 전화번호, 이메일 인증을 통한 고객 인증
- 사업자 등록번호 검증을 통한 매장 등록
- 프로필 전환을 통한 다양한 프로필 이용 가능
<div>
  <img src="https://github.com/user-attachments/assets/df85b01d-0e9b-417c-9e0a-e095ddd57fd3" width="30%" />
  <img src="https://github.com/user-attachments/assets/3ee5cb80-f5b7-4207-9997-a06a68c4c729" width="30%" />
</div>

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

#### [명세서 링크](https://www.notion.so/REST-API-eb150679fab942c7a17a89bb4d4fc936)

