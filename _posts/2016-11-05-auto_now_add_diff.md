---
layout: post
title: Django auto_now vs auto_now_add
comments: true
tags:
- Python
- Django
---
&nbsp;&nbsp;&nbsp; 하단의 참고자료에 설명을 매우 잘 해 놨다. 더 간단히 요약하자면, 블로그를 만든다고 생각해 보자. Post라는 모델에서 `수정일자`에 사용되는것은 `auto_now`이다. 이는 auto_now가 해당 모델이 save 될 때 마다 현재 날짜로 해당 필드를 갱신시키기 때문이다. `생성일자`에 사용되는 것은 `auto_now_add`이다. auto_now_add는 해당 모델이 처음으로 save(모델 생성 시) 될 때 현재 날짜로 추가한다.

## **참고자료**
* [auto_now VS auto_now_add](http://tomining.tistory.com/145)
