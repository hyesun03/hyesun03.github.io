---
layout: post
title: 파이썬 코딩의 기술 1
comments: true
tags:
- Python
- 파이썬 코딩의 기술
---
<img src="/images/effective_python_book.jpg" alt="클린 코드를 위한 테스트 주도 개발" style="width: 200px; margin-left: auto; margin-right: auto; "/>

&nbsp;&nbsp;&nbsp; [이 책](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791186978825&orderClick=LEA&Kc=)의 부제?가 `Effective PYTHON`이다. 그냥 파이썬 공부를 더 해보고 싶어서 보는 책이다. `Effective`시리즈가 무지 많은것 같다. 내부 목차 또한 비슷하게 구성 되어있다. 책이 비교적 얇은 편(약 300쪽)이고 안내되어있는 `Better way`가 59개 이다. `Effective Java`는 솔직히 기본 문법만 익히고 바로 보기에는 어려운 책이라는 느낌을 많이 받았다. 하지만 이 책은 대충 둘러봤을 때 파이썬 기본 문법 익히고 봐도 아주 어렵진 않을 것 같다. 책의 문제를 찾겠다..는 건 아니고 여태 하듯이 일기쓰는 것 처럼 포스팅 할 예정이다.

## **BETTER WAY 1. 사용 중인 파이썬의 버전을 알자**
&nbsp;&nbsp;&nbsp; `ipython`으로 확인했다.
<pre>In [1]: import sys

In [2]: print(sys.version_info)
sys.version_info(major=3, minor=5, micro=2, releaselevel='final', serial=0)

In [3]: print(sys.version)
3.5.2 (default, Sep 27 2016, 07:32:57)
[GCC 4.2.1 Compatible Apple LLVM 8.0.0 (clang-800.0.38)]</pre>

&nbsp;&nbsp;&nbsp; [파이썬 인터프리터](http://khanrc.tistory.com/entry/%EB%8B%A4%EC%96%91%ED%95%9C-Python%EB%93%A4)
