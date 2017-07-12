---
layout: post
title: Git Xcode command line tools 의존성 이슈
comments: true
tags:
- git
---

`git --version`뿐만이 아니라 git 명령어를 쓰려고하면 아래의 에러를 뱉으면서 실행이 안된다.

``` bash
$ git --version
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

xcode 재설치 (or 설치가 안되어있었으면 설치)가 답이었다..! 이제 git 명령어들이 잘 먹힌다.

``` bash
$ xcode-select --install
[...설치 중...]

$ xcode-select --version
xcode-select version 2347.
```

## **참고자료**
* [https://stackoverflow.com/questions/32893412/command-line-tools-not-working-os-x-el-capitan-macos-sierra](https://stackoverflow.com/questions/32893412/command-line-tools-not-working-os-x-el-capitan-macos-sierra)
