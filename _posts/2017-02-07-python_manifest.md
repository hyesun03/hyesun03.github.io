---
layout: post
title: Python MANIFEST.in 그리고 graft
comments: true
tags:
- Python
- MANIFEST.in
- graft
---

## **MANIFEST.in**

&nbsp;&nbsp;&nbsp; 파이썬 스크립트 외의 파일을 배포할 때 `setup()`에 인자로 넣어서 지정하는 방법이 있다. 플라스크 튜토리얼을 보고 있는 중이기 때문에 그 튜토리얼대로 `MANIFEST.in`을 사용하려고 한다.     

&nbsp;&nbsp;&nbsp; `setuptools`를 쓸 때 패키지에 포함되어야하는 파일들을 `MANIFEST.in`에 지정해야하며 이 경우 정적 및 템플릿 디렉토리뿐만 아니라 스키마도 포함시켜야한다. `MANIFEST.in`파일은 아래와 같이 작성한다. 아래의 예시는 [플라스크 문서](http://flask.pocoo.org/docs/0.12/tutorial/packaging/#tutorial-packaging)에서 가져왔다.

``` python
graft flaskr/templates
graft flaskr/static
include flaskr/schema.sql
```

&nbsp;&nbsp;&nbsp; 아래의 명령을 실행하면 dist 디렉터리가 생기고 배포 판이 만들어진다.

``` bash
python setup.py sdist
```

## **graft**

&nbsp;&nbsp;&nbsp; `MANIFEST.in`파일을 작성할 때 사용한다. 아래 사진과 예제를 보면 이해가 될 것이다.
![recursive-include 대신 graft]({{ site.url }}/images/graft.png)

&nbsp;&nbsp;&nbsp; 예 1

```
# Instead of this
recursive-include tests/functional *
recursive-include tests/unit *
recursive-include tests/old_suite *
recursive-include tests *.txt

# Do this
graft tests
```

&nbsp;&nbsp;&nbsp; 예 2

```
# Instead of this
recursive-exclude docs *.pyc
recursive-exclude docs *.pyo
recursive-exclude tests *.pyc
recursive-exclude tests *.pyo
recursive-exclude examples *.pyc
recursive-exclude examples *.pyo

# Do this
global-exclude *.py[co]
```


## **참고자료**
* [http://www.dreamy.pe.kr/zbxe/CodeClip/164990](http://www.dreamy.pe.kr/zbxe/CodeClip/164990)
* [https://www.reddit.com/r/Python/comments/40s8qw/simplify_your_manifestin_commands/](https://www.reddit.com/r/Python/comments/40s8qw/simplify_your_manifestin_commands/)
