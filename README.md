# Introduce

본 문서는 _2022년 1월 24일_ 에 작성하였습니다.
프로젝트는 _2022년 2월 7일_ 에 종료되었습니다.

직전의 프로젝트 [22-01-crolling-music-charts](https://github.com/unchaptered/22-01-crolling-music-charts) 에서 <strong>크롤링을 통한 음악 차트 제공</strong> 과 <strong>Jest (테스트 모듈)</strong>를 사용해보았씁니다.

[Github Repository](https://github.com/unchaptered/22-01-express-website)

# WEB!

WEB! 은 보편적인 웹 서비스입니다.
Jest 와 Class 를 사용하여 **최대한 간단한 구조를 통한 테스트 주도 개발** 을 경험해보았습니다.

1. User CRUD
2. Post CRUD

<hr>

## ❎ Processs

혼자서 작업하는 관계로 프론트앤드 및 백앤드파트를 동시 작업하였습니다.<br>
프로젝트의 목적 상, 작업의 비중은 각각 1 : 9 로 잡았습니다.

### ❎ Frontend

작년부터 진행한 모든 토이에서 **CSS, BEM 명명법** 과 **반응형, 컴포넌트 위주 설계** 를 하였습니다.

하지만, 이러한 길은 **MSA 와 같이 높은 수준의 세분화 설계** 에 적합하며,<br>
규모가 작거나 개인으로 작업하는 프로젝트에서는 **지나치게 프론트앤드 작업량을 늘리는 단점** 이 발생했습니다.

따라서 이러한 설계에 나름의 가이드라인을 완성하였습니다.<br>
[<strong>간단하게 만드는 반응형 웹 디자인
</strong>](https://velog.io/@unchapterd/%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-%EB%A7%8C%EB%93%9C%EB%8A%94-%EB%B0%98%EC%9D%91%ED%98%95-%EC%9B%B9-%EB%94%94%EC%9E%90%EC%9D%B8) 을 통해서 이번 프로젝트는 다음과 같이 컴포넌트를 구분하였습니다.

| 구분 | 예시 | 폴더구성 |
| :--- | :--- | :------ |
| All Screen Components | <nav id="nav_top"\> | ./assets/css/components/ |
| One Screen Components | <section class="content"\> | ./assets/css/screen/ |

또한 **확장성 및 유지보수성의 강화**를 위하여 다음을 준수하였습니다.

1. CSS 변수 사용
2. CSS no-padding, no-margin (최대한)

### ❎ Backend

백앤드 파트에서는 두 가지 중점사항을 두었습니다.

1. Class 위주의 Controllers 기능부 구현
 1.1. User.js
 1.2. Post.js
 1.2. CustomDate.js
2. Session, Custom Middleware 구현
 2.1. 세션 -> 쿠키 저장 미들웨어
 2.2. 로그인 유저 차단 미들웨어
 2.3. 미로그인 유저 차단 미들웨어
 2.4. 소유주 확인 미들웨어
3. Jest, Jest --coverage 를 통한 테스트 주도 개발
 3.1. User.test.js
 3.2. Post.test.js
 3.3. CustomDate.test.js
 3.4. Middleware.test.js

 
