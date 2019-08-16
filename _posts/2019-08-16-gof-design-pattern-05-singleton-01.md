---
layout: post
title: GoF의 디자인 패턴 3장 Singleton 패턴 (1)
comments: true
tags:
- GoF 디자인 패턴
---

어디서 많이 들어보기도 하고 어렴풋하게 다들 알고 있는 패턴일 듯. 3번은 이 책을 읽으면서 처음 알게된 사실이고, 4번은 같이 정리해두면 좋을 듯 해서 넣어봤다. 글이 너무 길어질 듯 해서 쪼개서 올릴 예정.     

1. **Singleton 왜 쓰는지와 문제점** (<- 이번 포스팅 내용)
2. Singleton 인스턴스가 1개만 존재하도록 보장하는 방법
3. Singleton 인스턴스가 여러 개일 수 있다고?
4. static class랑은 뭐가 다르지?


# Singleton 왜 쓰는지
객체 중에는 시스템 혹은 프로세스에서 딱 하나만 존재해야 좋은 것들이 있다. 스레드 풀, 로거, 환경 설정을 위해 존재하는 것들이 예가 될 것이다.     

Python 모듈같은 경우는 단 하나만 생성되는데, 이 자체를 Singleton 처럼 쓰기도 한다. 모듈 하나에 전역변수 하나 선언해두고 해당 모듈을 여러 군데에서 `import` 해보면, 해당 변수가 공유가 되는 것을 확인 할 수 있다. [(전역변수를 이렇게 쓰는건 권장하지 않는듯)](https://umbum.tistory.com/176)     

안드로이드 같은 경우에도 여러 액티비티에서 써야 하는 파라미터들을 여기저기 넘겨주면서 더러워지는 경우가 있는데, 이 때도 Singleton을 사용하면 편하다.     

이 책(p.183)이나 [기타 글](https://stackoverflow.com/a/48526534)들을 보면, 인스턴스가 **하나 이상 존재할 수도 있으며** 개수 제한을 걸어서 쓸 수 있는 것으로 설명되어 있지만, **일반적으로는 하나의 인스턴스가 존재하도록 보장하기 위해서 쓴다.**     


# 고전적인 Singleton 구현

아래는 Singleton 인스턴스가 `null`이면 `new`로 생성해서 리턴하고, 아니면 이미 생성된 것을 돌려주는 단순한 코드다.     

주의 할 점은 아래 코드는 여러 문제점을 가지고 있으며, **Singleton 구현을 위해 이대로 쓰면 안된다.**     

``` java
public class Singleton {
    private static Singleton instance;
    // 기타 인스턴스 변수
    private Singleton() {}

    public static Singleton getInstance() {
        if(instance == null) {
            instance = new Singleton();
        }

        return instance;
    }

    // 기타 메소드
}
```

# Singleton 주의할 점
싱글 쓰레드에서는 별 문제가 없지만, `멀티 쓰레드` 환경에서는 Singleton 인스턴스가 1개만 생성된다는 보장이 안된다.     

여러 쓰레드에서 `getInstance()`를 호출 할 때를 생각해보자. 쓰레드 A에서는 `null`임을 확인하고 인스턴스를 생성했으나, 쓰레드 B에서는 이미 생성이 된 줄 모르고 `null`로 판단하여 두 번째 인스턴스를 생성할 수 있다.     

이 내용은 다음 포스팅에 이어서..     
