---
layout: post
title: __str__과 __repr__의 차이
comments: true
tags:
- Python
- Special Method
- 전문가를 위한 파이썬
---
&nbsp;&nbsp;&nbsp; '전문가를 위한 파이썬'을 보고 있다. 사실 'Effective Python'을 먼저 보고싶은데 책이 수중에 없다. 그래서 e-book 으로산 이 책을 보고있다. `p.46-47`에 있는 `1.2.2 문자열 표현` 챕터를 보고 포스팅 한다.

&nbsp;&nbsp;&nbsp; 얼마전에 끝난 Django를 사용한 프로젝트에서 관리자 페이지를 위해 **__str__** 을 사용한 적이 있었다. `Board`모델을 admin페이지에 붙였더니 `Board Object`가 나와서 **__str__** 을 구현했었다.

&nbsp;&nbsp;&nbsp; 하지만 이 책을 보고 잘못한 점을 깨닫게 되었다. **__str__** 만 하는 것이 아니라 **__repr__** 도 구현을 했어야 하고 둘 중 하나만 구현을 해야한다면 **__repr__** 을 구현하는 것이 맞다고 한다.

&nbsp;&nbsp;&nbsp; 그 이유는 파이썬 인터프리터가 **__str__** 이 구현되지 않았을 경우 **__repr__** 을 호출하기 때문이다. 그 반대로 **__repr__** 이 구현되지 않고 **__str__** 만 구현 했을 경우, **__str__** 이 **__repr__** 을 호출하지 않는다.

* *Object.__ str__(self)*   
`적당히` 사용자가 보기 쉬운 형태로 출력 할 때 사용

* *Object.__ repr__(self)*    
`파이썬 인터프리터`가 해당 객체를 인식 할 수 있는 공식적인 문자열을 나타낼 때 사용

## **참고자료**
* [http://pinocc.tistory.com/168](http://pinocc.tistory.com/168)
