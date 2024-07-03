# Java Works 2024
- Java Promgraming 복습
- 2024.07.03

## git repository 생성하기
- 원격(https://github.com/callor/Biz-2024-501-java) 리파지토리 만들기
- 로컬폴더를 로컬리파지토리로 생성하기
```bash
git init
```
- 원격 리파지토리와 로컬 리파지토리 연결하기
```bash
git remote add origin https://github.com/callor/Biz-2024-501-Java.git
```
- 로컬 폴더의 파일과 폴더를 로컬 리파지토리에 압축하여 저장하기
```bash
git add README.md
git add .
```
- 압축된 로컬 리파지토리에 comment 붙이기
```bash
git commit -m "처음으로 업로드 하기"
```
- 로컬 리파지토리를 원격 리파지토리에 업로드 하기
```bash
git push -u origin master
```