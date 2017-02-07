---
layout: post
title: pip 모든 패키지 업그레이드
comments: true
tags:
- pip
---

&nbsp;&nbsp;&nbsp; `pyenv`, `pyenv-virtualenv` 로 가상환경을 프로젝트마다 만들어 쓰지만 귀찮아서 이것저것 테스트할 명목으로 잡다한 패키지들을 설치한 가상환경을 별도로 두고 쓰는편이다. 터미널에서 아래 한줄로 모두 최신버전으로 올릴 수 있다.

```
pip freeze --local | grep -v '^\-e' | cut -d = -f 1  | xargs -n1 pip install -U
```

## **참고자료**
* [http://stackoverflow.com/questions/2720014/upgrading-all-packages-with-pip](http://stackoverflow.com/questions/2720014/upgrading-all-packages-with-pip)
