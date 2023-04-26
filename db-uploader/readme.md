# DB 동기화 매크로

#### DB 추출

```
npm run export
```

명령어 실행시 폴더가 열리고 해당폴더에 0000000000000_hsin.zip, 0000000000000_hsin-food-photo.zip 파일 생성
해당 파일이름으로 서버에서 DB동기화명령어를 만들어서 동기화

#### DB 동기화

```
# hsinportal
npm run import 0000000000000_hsin.zip

# hsin-food-uploader
npm run import 0000000000000_hsin-food-photo.zip
```

`DB 추출`명령어 실행 이후 서버에서 실행시켜야함. 서버별로 다른 명령어를 실행
