# 건강기능식품 소비자용 홈페이지

## 1. 디렉토리 구조 (개발자 담당)

- /service/backend : HSIN 서버 (Nest.js)
- /service/frontend : HSIN 프론트앤드 코드 (Next.js)
- /food-photo-upload/backend : 제품 이미지 업로드 서브 (Nest.js)
- /food-photo-upload/frontend : 제품 이미지 업로드 프론트엔드 (Next.js)
- /hsin-admin : HSIN 게시판 CMS (Strapi, Splite3)
- /macro : HSIN 데이터베이스 업데이트 매크로(Node.js)
- /db-uploader : HSIN 데이터베이스 서버 동기화 앱(Node.js)

---

## 2. MongoDB Collection 설명 (개발자 담당)

### 2.1 건강기능식품 관련

- C003 : [식약처 공공데이터] 건강기능식품 품목제조 신고사항 현황
- I0030 : [식약처 공공데이터] 건강기능식품 품목제조신고(원재료)
- \_foreign-food-list: 수입 건기식 목록 크롤링
- \_foreign-food-detail: 수입 건기식 세부정보 크롤링
- \_domestic-food-materials: 국내/수입 식품과 원료 매핑
- \_map-foodMats-to-mats: 원료이름과 신고번호 매핑
- \_functionality-materials: 원료 데이터
- \_functionalities: 기능성 데이터
- \_integration-food-list: 원료, 기능성, 섭취시 주의사항 연결된 국내/수입 식품 데이터
- \_eat_together: 의약품 병용섭취 주의사항

### 2.2 위해정보 관련

- \_false_advertising: 회수 판매 중지 제품 정보
- I2715: 해외직구 위해 식품 차단 정보

### 2.3 건강계산기 관련

- I2790: 칼로리 사전

---

## 3. AWS S3 버킷 디렉토리 관련

**S3/buckets/health-functional-food** HSIN에 사용되는 문서나 대용량 파일들이 디렉토리별로 저장되어있음.

- assets/main-animation: 메인화면 애니메이션 출력물 (Adobe Animate CC 작업)
- concomitant_use: 의약품 병용섭취 원료 아이콘
- data: db-uploader 사용시 추출되는 DB 데이터 파일
- docs: 기능성 원료에 대한 공전, 소비자 리포트 파일
- docs/prevent-materials: 사용불가원료 상세정보
- docs/warn-cases: 원료 섭취 이상사례 상세정보
- physiology: 기능성 생리활성기능 아이콘
- saved: 건강기능식품 썸네일 이미지 (썸네일 업로드시 이곳에 파일 저장됨 : 신고번호/난수)
- static: CMS에서 업로드된 파일 저장소
- warns: 섭취시 주의사항 아이콘

---

## 4. HSIN 데이터베이스 업데이트 매크로 사용법

정보가 잘못된 데이터는 수동으로 수정

### 4.1 사전 설치

- [VSCode](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Node.js](https://nodejs.org/dist/v16.13.2/node-v16.13.2-x64.msi)
- [Git](https://git-scm.com/download/win)
- [Zip](http://stahlworks.com/dev/zip.exe) Global 환경변수 설치
- [Unzip](http://stahlworks.com/dev/unzip.exe) Global 환경변수 설치
- [AWS-cli](https://awscli.amazonaws.com/AWSCLIV2.msi) 설치후 configure에 ACCESS_KEY로 로그인
- [Mongorestore](https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools&_ga=2.195061548.1625644956.1643957660-647069388.1627284808) Global 환경변수 설치

진행 전에 위 프로그램들 설치후 아래 순서대로 진행.

### 4.2 기능성 업데이트 (필요시에만)

`data/$functionalities.xlsx`, `data/$functionality_details.xlsx` 파일 수정 후 아래 명령어 실행

```cmd
# /macro 폴더
npm run func
```

### 4.3 의약품 병용섭취 업데이트 (필요시에만)

`data/$eat-together-details.xlsx` 파일 수정 후 아래 명령어 실행

```cmd
# /macro 폴더
npm run eat-together
```

### 4.4 섭취시 주의사항 업데이트 (필요시에만)

`data/$warns.xlsx` 파일 수정 후 아래 명령어 실행

```cmd
# /macro 폴더
npm run warns
```

### 4.5 원료 업데이트
`data/$materials.xlsx`, `data/$mat-description.xlsx` **새 원료 업데이트** 파일 수정 후 아래 명령어 실행   

**이미 생성된 원료**의 각 필드 데이터값은 수동으로 수정

```cmd
# /macro 폴더
npm run mats
```


### 4.6 수입 건기식 수동업데이트 (필요시에만)

작업전 `hsin._foreign-food-detail`, `hsin._foreign-food-list`, `hsin._integration-food-list`에서 해당 신고번호의 건기식이 없어야 정상적으로 입력가능
`data/$foreign-food.xlsx` 파일 수정 후 아래 명령어 실행

```cmd
# /macro 폴더
npm run food-manual
```

### 4.7 건기식 업데이트

아래 명령어 실행시 API에서 원료 가져오고 수입식품은 크롤링 진행

```cmd
# /macro 폴더
npm run food
npm run food
```

명령어 실행 후 `/macro` 폴더 내에 연결정보가 없는 원료이름을 모아서 `all-no-names.txt` 파일이 생성되는데 해당파일을

```
...
원료이름\\신고번호
원료이름\\신고번호
원료이름\\신고번호
...
```

형태로 수정한 후 다시 실행

### 4.8 칼로리사전 업데이트

아래 명령어 실행시 API에서 원료 가져옴

```cmd
# /macro 폴더
npm run kcal
```

### 4.9 회수판매중지 데이터 업데이트

`$stop_selling.xlsx` 파일 수정 후 아래 명령어 실행

```cmd
# /macro 폴더
npm run stop

해외직구 데이터 (API)도 동일 명령어
```

### 4.10 중복섭취 확인 사례추가 (개발자 담당)

`/service/frontend/pages/intake.tsx` 파일에서 `warnCase` 배열에 데이터 추가

```ts
// 사례 이름, 파일이름(s3://health-functional-food/docs/warn-cases/ 업로드), 해당 원료신고번호 목록
const warnCase: [string, string, string[]][] = [];
```

---

## 5. db-uploader 사용법

매크로 작업끝난 후 서버에 동기화시킬때 사용

### 5.1 hsin DB 추출 명령어

아래 명령어 입력시 숫자가 나오고 S3 버킷 `s3://health-functional-food/data/` 위치에 해당 숫자를 써서 업로드된 zip이 생성되는데 해당파일명을 import할때 사용. 로컬에 동기화를 위해 서버에서도 사용할 수 있음

```cmd
# /db-uploader 폴더
npm run export-h
```

### 5.2 hsin-food-photo DB 추출 명령어

아래 명령어 입력시 숫자가 나오고 S3 버킷 `s3://health-functional-food/data/` 위치에 해당 숫자를 써서 업로드된 zip이 생성되는데 해당파일명을 import할때 사용. 로컬에 동기화를 위해 서버에서도 사용할 수 있음

```cmd
# /db-uploader 폴더
npm run export-p
```

### 5.2 추출된 DB 동기화 불러오는 명령어

매크로 사용이나 건기식 관련 DB데이터를 로컬에서 수정했을때 서버에 동기화시키는 명령어. 각 서버별로 다른 명령어를 입력해서 DB데이터를 동기화시킬 수 있음.     
서버에서 export한 DB 데이터를 로컬에 동기화 할때도 사용     

파일명은 export 출력값에 맞게 변경

_hsin DB 동기화 작업 명령어_
```cmd
cd hsin/db-uploader
npm run import 1643959758579_hsin.zip
```

_hsin-food-photo DB 동기화 작업 명령어_
```cmd
cd hsin/db-uploader
npm run import 1643959758579_hsin-food-photo.zip # 파일명은 export 출력값에 맞게 변경
```

**export 할 때, 완료된 거 확인하고 서버에 업로드**

### (예시) 제품 이미지 동기화 과정

1. [photo-upload.hsinportal.com](photo-upload.hsinportal.com) 에서 제품 이미지 업로드

2. **hsin-food-uploader 서버**에서 데이터 export 추출
- db-uploader 폴더에서 명령어 실행
```cmd
$ cd hsin/db-uploader
$ npm run export-photo
```

3. 생성된 데이터 폴더를 로컬에서 동기화 (import)
- **작업자 로컬 db-uploader 폴더**에서 명령어 실행
- `0000000000000`는 2번 과정에서 `export` 한 폴더명

```cmd
$ npm run import 0000000000000_hsin-food-photo.zip
```

4. 로컬에서 동기화한 제품 이미지, url 데이터(hsin-food-photo)를 hsin (건강기능식품) 데이터로 복제하기
- **작업자 로컬 macro 폴더**에서 명령어 실행

```cmd
# 이미지, URL 등록한 제품만 동기화
$ npm run food-t

# 모든 제품 동기화
$ npm run food-t-all
```

5. 로컬 몽고디비에 제품 이미지 데이터가 생성되었는지 확인

- `hsin/_integration-food-list` 테이블 확인
- 제품 이미지는 `thumbnails`라는 곳에 저장됨.

```json
// 예시
{
  "_id": { "$oid": "61e620b88bdc2d2c1a7f86c1" },
  "type": "domestic",
  "report_no": "20040015110988",
  "name": "요로엔 크랜베리",
  "company": "주)팜크로스",
  "functionalities": ["3-20"],
  "materials": ["2014-34"],
  "materialNames": ["파크랜 크랜베리 분말"],
  "thumbnail": "",
  "warn": ["23"],
  "created_date": { "$date": "2021-04-26T09:00:00.000Z" },
  "hidden": false,
  "thumbnails": ["gdYZbOal5NloBibiU0tjs"] // 제품 이미지
}
```

6. 제품 이미지 데이터 복제가 완료되면 작업자 로컬에서 데이터 export 추출
- **작업자 로컬 db-uploader 폴더**에서 명령어 실행
```cmd
$ cd ~/hsin/db-uploader
$ npm run export-hsin
```

7. 추출 된 폴더를 **hsin-portal 서버**에서 동기화 (import)
- db-uploader 폴더에서 명령어 실행
- `0000000000000`는 6번 과정에서 `export` 한 폴더명
```cmd
$ npm run import 0000000000000_hsin.zip
```

**주의 할 점**  
* 로컬 디비에 \_Integration-food-list 데이터가 있는 상황에서 모든 동기화 및 데이터 추출 과정을 진행해야 함.  
* hsin-food-uploader 서버에선 0000000000000_hsin-food-photo.zip  
* hsin-portal 서버에선 0000000000000_hsin.zip  
* 구분해서 import / export 가 실행되어야 함.

---

## 6. 조회수 추출

hsin-portal 서버에서 DB export후 해당 데이터 로컬에서 동기화시키는 과정 먼저 진행하고, 아래명령어 입력시 `C:/Users/[유저이름]/.hsin-db` 폴더에 엑셀 파일 생성

```
# hsin-portal 서버
cd hsin/db-uploader
npm run export # 종료 후 날짜 복사

# 로컬 폴더
# /db-uploader 폴더
npm run import [날짜]_hsin.zip

# /macro 폴더
## 건기식 조회수
npm run export-food
## 원료 조회수
npm run export-mats
```

---

## 7. 프로젝트 관리 및 배포 관련 (개발자 담당)

### hsin-portal 서버

수정완료 후 `/hsin-admin`, `service/backend`, `service/frontend` 폴더에서 `npm run build` 명령어 에러 없이 작동하는지 확인.
레포지토리에 push 후 서버 접속해서 아래 명령어 입력.

```cmd
cd ~/hsin
git pull

# CMS 수정사항
cd ~/hsin/hsin-admin
pm2 stop hsin-admin
npm run build
pm2 start hsin-admin

# Backend 수정사항
cd ~/hsin/service/backend
pm2 stop hsin-backend
npm run build
pm2 start hsin-backend

# Frontend 수정사항
cd ~/hsin/service/frontend
pm2 stop hsin-frontend
npm run build
pm2 start hsin-frontend
```

### hsin-food-uploader 서버
```cmd
cd ~/hsin
git pull

# Backend 수정사항
cd ~/hsin/food-photo-upload/backend
pm2 stop backend
npm run build
pm2 start backend

# Frontend 수정사항
cd ~/hsin/food-photo-upload/frontend
pm2 stop frontend
npm run build
pm2 start frontend
```

### pm2 구동 등록 명령어 
```cmd
# 구동할 디렉토리에서 명려어 실행
pm2 start npm --name "your desired app name" -- start
```

---
