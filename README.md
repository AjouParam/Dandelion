# Dandelion

### 2021-2학기 파란학기 프로젝트

<b>민들레 : 장소를 기반으로 추억을 기록하고 공유하는 SNS</b>

민들레 서비스는 가게 벽을 채운 낙서들이 모두 게시물이 된다면 어떤 형태일까? 라는 질문에서 시작되었습니다. 

그 게시물들은 가게 근방에서만 확인이 가능할 것입니다. 저희는 이 아이디어를 확장하여 지도 플랫폼과 ‘위치 제한’이라는 기능을 이용하면 차별화된 SNS 포맷을 개발할 수 있겠다고 생각하였고, 온라인 데이터에 오프라인 특성을 접목시켜 데이터의 희소성을 높였습니다.

민들레에서 사용자는 직접 민들레라는 마커를 생성하여 지도에 표시되지 않은 장소에 가치를 부여할 수 있고, 다른 사용자가 만든 민들레를 직접 방문하여 글을 확인할 수 있습니다.


## 목차
1. [바로가기](#바로가기)
2. [Member](#member)
3. [Development Stack](#development-stack)
4. [Prototype](#prototype)
5. [핵심 기능](#핵심-기능)
6. [ERD](#erd)
7. [Architecture](#architecture)
8. [Running Front-End](#running-front-end)
9. [개발 일정](#개발-일정)

## 바로가기

구글 드라이브에는 발표 자료, 회의 자료, 기획 자료, 보고서 등이 있습니다.
- [전체](https://drive.google.com/drive/folders/1haldL7pgfRgwhezaNGSIcNCibqLFe4u0?usp=sharing)
- [발표 자료](https://drive.google.com/drive/folders/1dOzcdonKAwG7FT6ldL3Kwm2X29nZ1_1m?usp=sharing)
- [회의 자료](https://drive.google.com/drive/folders/1c9kNMCT_qYS5pvfOzwcm6RsN4NCkPCIx?usp=sharing)
- [기획 자료](https://drive.google.com/drive/folders/10ANcCYIbCSBJUKrD64f6JYeuXpC5xKMP?usp=sharing)

Server Repo 바로가기
- [Dandelion-Server](https://github.com/AjouParam/Dandelion-Server)

API 명세서
- [API Docs](https://github.com/AjouParam/Dandelion/wiki/API)

## Member

- 제작기간 : 2021-09~2021-12

|                          장병희                           |                          김승은                           |                          이유지                           |                          계준민                           |                          은승균                          |                          차재명                           |
| :-------------------------------------------------------: | :-------------------------------------------------------: | :-------------------------------------------------------: | :-------------------------------------------------------: | :------------------------------------------------------: | :-------------------------------------------------------: |
|                      소프트웨어학과                       |                      소프트웨어학과                       |                        미디어학과                         |                      소프트웨어학과                       |                      소프트웨어학과                      |                      소프트웨어학과                       |
|                    팀장, 프로젝트 총괄                    |                          기획자&백엔드                           |                         디자이너                          |                            AR                             |                        프론트엔드                        |                          프론트엔드                           |
| ![](https://avatars.githubusercontent.com/u/41332873?v=4) | ![](https://avatars.githubusercontent.com/u/52846807?v=4) | ![](https://avatars.githubusercontent.com/u/83522967?v=4) | ![](https://avatars.githubusercontent.com/u/37854961?v=4) | ![](https://avatars.githubusercontent.com/u/2215762?v=4) | ![](https://avatars.githubusercontent.com/u/38166372?v=4) |
|    [@jangByeongHui](https://github.com/jangByeongHui)     |        [@julie0005](https://github.com/julie0005)         |           [@dldbwl](https://github.com/dldbwl)            |         [@Starbead](https://github.com/starbead)          |        [@dmstmdrbs](https://github.com/dmstmdrbs)        |       [@Coreight98](https://github.com/Coreight98)        |

## Development Stack

|  division  |      stack       |
| :--------: | :---------------------------------: |
| Front-end  |   React Native   |
|  Back-end  |     node.js, express.js      |
| Database | mongoDB, mongoose(ORM) |
| Formatting | eslint, prettier |
| Infra      | AWS EC2, Code Pipeline, Code Deploy |

## Prototype

프로토타입은 카카오 오븐을 통해 제작되었습니다. [바로가기](https://ovenapp.io/view/XawT3vVFTw9KcIZTjpC5kA2VTQhhbFPr/Fl4CX)

## 핵심 기능

ex)
- 게시글 및 댓글 관리
- 유저  및 태그 팔로잉
- 태그 시스템
- 신고차단 기능
- 게시글 북마크
- 사용자 맞춤 개인 피드
- 개인 알림 기능 (댓글, 대댓글, 팔로우, 뱃지획득)
- 게시글 북마크
- 개인 피드 조회
- 개인정보 관리

## ERD

<br>

## Architecture

<br>

## Running front-end

``` bash
# go to directory
$ cd client 

$ sudo apt-get update 
$ npm install

# start react-native
$ npm run android
```

<br>

## 개발 일정
1. 계정화면 및 로그인 절차 : 2주(~09/05)
2. 메인화면 : 3주 (~09/19)
3. 민들레 속 기능 : 3주 (~10/10)
4. 마이페이지 : 3주 (~10/31)
5. 핫스팟 : 2주 (~11/14)
6. AR 기능 : 병렬 진행 (~11/21)
7. 리팩토링 : 1주 (~11/28)
8. 배포 및 가출원 : 2주 (~12/12)
