# Introduce

본 문서는 _2022년 1월 24일_ 에 작성하였습니다.

직전의 프로젝트 [22-01-crolling-music-charts](https://github.com/unchaptered/22-01-crolling-music-charts) 에서 <strong>크롤링을 통한 음악 차트 제공</strong> 과 <strong>Jest (테스트 모듈)</strong>를 사용해보았씁니다.

[Github Repository](https://github.com/unchaptered/22-01-express-website)

# WEB!

WEB! 은 보편적인 웹 서비스입니다.
이번 프로젝트에서는 **최대한 간단한 구조**와 이를 통한 **테스트 주도 개발, TDD** 에 도전해보려 합니다.

또한 **Node 내부 모듈** 을 통해서 다음과 같은 기능을 구현해보려고 합니다.

1. 브라우저 외부 사용자(실제 사용자가 아닌 자)의 API 호출 시 중단
2. 브라우저 내부 사용자의 지나친 새로고침(일정 횟수 임의 지정) 시 차단 페이지로 송출

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

1. Jest, Jest --coverage 를 통한 테스트 주도 개발
2. Controller 내부의 **기능부** 의 모듈화
 2.1. 비밀번호 유효성 검사 구문 등
3. Node 내장 모듈을 이용한 기능 개발
 
```json
"scripts": {
  "start": "nodemon ./src/start.js",
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
  "coverage": "node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage"
},
```
<hr>

## ❎ Failure
 
| 구분 | 모듈 | 기능 |
| :--: | :--- | :--- |
| 1 | express | 프레임워크 |
| 2 | morgan | HTTP 로그 표시 |
| 3 | dotenv | 환경변수 사용 |
| 4 | pug | HTML 탬플릿 엔진 |
| 5 | axios | AJAX 호출 모듈러 |
| 6 | express-session | 세션 모듈러 |
| 7 | express-flash | 메세지 모듈러 |
| 8 | connect-mongo | MongoDB 커넥터 |
| 9 | mongoose | MongoDB ODM 모듈러 |
| 10 | nodemon | 코드 추적 및 node 재시작 |
| 11 | jest | 단위 테스트 |
 
<hr>

## ✅ Stacks

## Output
 
### URLs
 
GET /
 
GET,POST /join
 
GET,POST /login
 
GET,POST /search

GET,POST /users/profile/:id

GET,POST /contnet/post/:id
