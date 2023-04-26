# 건강기능식품 사진 업로드 페이지

## 유저생성

기본적으로 비활성화 시키며 필요할때 `backend/src/users/users.controller.ts`에서 주석을 풀고 활성화시켜서 사용해야 한다.

## 저장 프로세스

## 서버와 DB 동기화

MongoDB에서 제공하는 [database-tools](https://www.mongodb.com/try/download/database-tools)을 사용해서 동기화한다.

```
mongodump --db <db_name> --collection <collection_name> // 백업본 생성
mongorestore <directory> // 덤프된 루트 디렉토리 입력시 작동, 백업 동기화
```
