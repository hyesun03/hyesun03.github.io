---
layout: post
title: GoF의 디자인 패턴 3장 Builder 패턴
comments: true
tags:
- GoF 디자인 패턴
- java
---

이 부분 스터디 한지 한 달이나 지나서 글을 쓰게 되었다. GoF책에서 적혀져 있는 이 패턴의 정의는 아래와 같다.     

> 복합 객체의 생성 과정과 표현 방법을 분리하여 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있게 하는 패턴입니다.     

뭔가 말이 어렵지만 Java에서 객체 생성할 때 자주 쓰는 패턴 중 하나다. 아래와 같이 자주 쓰는 이런 형태가 Builder 패턴을 적용한 예이다.     

``` java
Member member = Member.builder()
                .email("test@gmail.com")
                .name("테스터")
                .password("asdf1234")
                .build();
```

객체 생성을 저렇게 하면 아래와 같은 장점을 얻을 수 있다.     

1. 각 인자가 어떤 의미인지 쉽게 코드로 알 수 있다. 인자 순서를 신경 쓸 필요가 없다.     

2. 불필요한 생성자들을 만들지 않아도 된다.     

Java에서 객체 생성은 크게 3가지 방법이 있다. **점층적 생성자 패턴**, **자바빈 패턴** 그리고 **빌더 패턴**이다.     

- **점층적 생성자 패턴**     
인자수가 많을 수록 쓸데없는 생성자가 많이 생긴다는 단점이 있다.     

- **자바빈 패턴**     
setter로 각 인자 값을 설정한다. setter 한번의 호출로 객체 생성이 온전하게 되지 않아서, 객체 일관성(consistency)가 깨지는 단점이 있으며 immutable 클래스를 생성할 수 없는 단점이 있다.     

빌더 패턴을 사용하면 위 2개의 단점을 피할 수 있다. 사실 객체 생성 할 때 말고는 해본 게 없는 듯.. 딱히 기억나는게 없다.     
