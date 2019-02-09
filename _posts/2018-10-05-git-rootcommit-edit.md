---
layout: post
title: git 첫 번째 커밋 메세지 수정
comments: true
tags:
- git
---

첫 번째 커밋메세지 내용을 수정하려고 했고 로컬에서만 작업한 상태라서 rebase하기로 했다. 보통 쓰던대로 `git rebase -i HEAD~n`을 썼는데 `invalid upstream 'HEAD~6'`라는 에러메세지가 나왔다. root까지 가는 방법은 아래 명령어가 있었다.

```
git rebase -i --root
```


## **참고자료**
* [https://stackoverflow.com/questions/2119480/edit-the-root-commit-in-git](https://stackoverflow.com/questions/2119480/edit-the-root-commit-in-git)
