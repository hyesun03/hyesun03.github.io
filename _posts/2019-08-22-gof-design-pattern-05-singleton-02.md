---
layout: post
title: GoF의 디자인 패턴 3장 Singleton 패턴 (2) thread-safe한 사용법
comments: true
tags:
- GoF 디자인 패턴
---

[앞 포스팅](https://hyesun03.github.io/2019/08/16/gof-design-pattern-05-singleton-01/)에서 `멀티 쓰레드` 환경에서는 Singleton을 주의해서 사용해야 한다고 마무리 지었다.     

Singleton을 쓰는 방법은 매우 다양하며, 이 포스팅에서는 **Eager Initialization**과 **Static Block Initialization**, **Weak Singleton** 등 에 대해서는 다루지 않는다.     

1. [Singleton 왜 쓰는지와 문제점](https://hyesun03.github.io/2019/08/16/gof-design-pattern-05-singleton-01/)
2. **Singleton 인스턴스가 1개만 존재하도록 보장하는 방법** (<- 이번 포스팅 내용)
3. 2번에서 소개된 방법들 퍼포먼스 비교
4. Singleton 인스턴스가 여러 개일 수 있다고?
5. static class랑은 뭐가 다르지?


# Thread-safe한 Singleton 사용법

## 1. Lazy Initialization (Draconian Synchronization)

단순하게 `synchronized` 키워드를 사용해서 동기화 시키는 것이다. 하지만 `synchronized`는 성능저하가 심하기 때문에 그다지 **권장하지 않는 방법이다.**     

``` java
public class Singleton {
    private static Singleton instance;
    // 기타 인스턴스 변수

    private Singleton() {}

    public static synchronized Singleton getInstance() {
        if(instance == null) {
            instance = new Singleton();
        }

        return instance;
    }
    // 기타 메소드
}
```

## 2. DCL(Double Checked Locking)
위 첫 번째 방법에서 성능 개선을 한 것이다. 그냥 한번 더 `null` 체크하고 단계를 한번 더 거치는건데, 성능차이가 많이 나나? 싶을텐데, 1번 방법에 비해 꽤 빠르다.       

이 방법이 의도하고자 한 것은 메서드에 `synchronized`를 쓰지 않고, 임계 구역(critical section)에만 동기화를 걸어서 동기화 오버헤드를 줄이는 것이다.    

``` java
public class Singleton {
    private static volatile Singleton instance;
    // 기타 인스턴스 변수

    private Singleton() {}

    public static Singleton getInstance() {
        if(instance == null) {
            synchronized (Singleton.class) {
                if(instance == null)
                    instance = new Singleton();
            }
        }

        return instance;
    }
    // 기타 메소드
}
```

위 코드에 있는 `volatile` 키워드는 Java 5부터 유효하며, **이 키워드를 붙이지 않으면 제대로 동작하지 않는다.**     

`volatile`에 대해서 설명하자면 길지만.. 일단 간략하게 설명하자면 main memory가 있고 각 스레드 마다 working memory가 있다. **main memory <-> working memory** 이렇게 두 메모리간 데이터 이동이 있으며, 두 메모리간 동기화가 진행되는 동안 빈틈이 생기게 되기 때문에 `volatile`을 쓰는 것이다.     

`volatile` 키워드 없이 DCL을 구현하면 **생성이 되다만 객체를 다른 스레드에서 참조 할 수 있는 문제가** 있다. 쓰레드 2개를 `T1`, `T2`라고 가정하고, 아래의 시나리오를 생각 해 보자.     

1. `T1`이 인스턴스를 생성하고 synchronized 블록을 나옴
2. `T2`가 synchronized 블록에 들어와서 null 체크를 하는 시점에서
3. `T1`에서 만든 인스턴스가 working memory에만 존재하고 main memory에 없을 때 (혹은 main memory에 있으나 working memory에는 없을 때)
4. `T2`는 두 번째 인스턴스를 생성한다. (두 메모리간 완전히 동기화가 되지 않았기 때문)

## 3. Enum
Joshua Bloch가 작성한 Effective Java 2판에 소개된 방법이다. Enum은 상수들만 모아놓은 특별한 클래스이며, 일반 클래스처럼 메소드와 생성자(private)를 가질 수 있다. 런타임이 아닌 컴파일 타임에 모든 값을 알고 있어야 하는 특징이 있다.     

Lazy Loading이 아니어서 유연성이 좀 떨어질 수 있지만 강력한 장점들을 가지고 있다.     

### - 구현이 매우 단순
딱봐도 단순하게 생김

### - 직렬화/역직렬화를 자동으로 해줌
`Serializable`를 implements하면 Singleton 패턴이 파괴된다. 역직렬화가 진행 될 때 `readObject()`를 호출하면서 새로운 인스턴스를 만들기 때문이다.     

`Serializable`를 implements 하면서 Singleton 패턴이 정상적으로 동작하게 할 수도있다. Enum을 쓰면 아래와 같이 번거로운 과정을 거치지 않아도 된다.     
1. 모든 필드에 `transient` 키워드 붙이기
2. `readResolve()` 메소드 구현

### - Enum 자체가 thread-safe 함
그렇지만 Enum 내부에 구현한 메서드들도 thread-safe 하지는 않으니 주의해야한다.     

### - Reflection 공격에 안전
Reflection의 `setAccessible(true)`를 사용하면 모든 private 생성자와 메소드에 접근할 수 있다. `newInstance()` 메소드를 통해서 계속해서 새로운 인스턴스들을 만들 수 있는데, 이 같은 문제도 해결 할 수도 있다.     

``` java
public enum Singleton {
  INSTANCE;  
}

// 이렇게 메소드를 추가 할 수 있다.
public enum EnumSingleton {
    INSTANCE;
    
    public void someMethod(String param) {
        
    }
}
```

하지만 이 방법 역시 단점이 있는데, Singleton 초기화 과정에서 다른 의존성이 낄 수 있다. 안드로이드 같은 경우는 `Context`라는 의존성이 낄 수 있는데, Enum은 컴파일 타임에 초기화가 이루어지기 때문에 매번 메서드를 호출 할 때 `Context`를 계속 넘겨줘야 하는 상황이 생길 수 있다.     

## 4. LazyHolder

Singleton 클래스 안에 Holder 클래스를 두고, JVM의 Class loader 규칙에 의해 Lazy Loading 하는 것을 보장한다. Java는 동적으로 클래스를 로딩하며 2가지 방식이 있다.     

1. 로드타임 동적 로딩(Load-time Dynamic Loading)
2. 런타임 동적 로딩(Run-time Dynamic Loading)

`로드타임 동적 로딩`은 클래스 내부에 다른 클래스 정보가 있다면 모두 로드하는 방식이고, `런타임 동적 로딩`은 실제 클래스 정보를 필요로 할 때 로드하는 방식이다. 여기서 LazyHolder는 `런타임 로드`이기 때문에, 실제로 필요로 하기 전 까지 JVM에 올라오지 않는다.     

여러 쓰레드에서 LazyHolder를 호출해도 JVM이 알아서 하나만 올려주기 때문에 `synchronized`, `volatile`과 같이 동기화를 위한 키워드를 쓰지 않아도 되고 Java 버전을 타지도 않는 장점이 있다.     

``` java
public class Singleton {
    private Singleton() {}

    public static Singleton getInstance() {
        return LazyHolder.INSTANCE;
    }

    private static class LazyHolder {
        private static final Singleton INSTANCE = new Singleton();
    }
}
```

Java 버전을 타지 않으며 성능도 준수하지만, 다른 방법에서 나오는 단점들을 가지고 있다. 위에서 언급된 Reflection 공격과 역직렬화 할 때 새로운 인스턴스가 생성되는 문제로 인해 번거로운 과정을 거쳐야 하는 점이 있다.     


# 각 방법의 성능 비교
이번 포스팅에서 여기까지 쓸랬는데 생각보다 길어져서 분리하기로 했다. 시리즈가 계속 길어질까봐 쫌 걱정된다(...)     


# 참고자료
* [https://medium.com/@joongwon/multi-thread-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C%EC%9D%98-%EC%98%AC%EB%B0%94%EB%A5%B8-singleton-578d9511fd42](https://medium.com/@joongwon/multi-thread-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C%EC%9D%98-%EC%98%AC%EB%B0%94%EB%A5%B8-singleton-578d9511fd42)
* [https://yaboong.github.io/design-pattern/2018/09/28/thread-safe-singleton-patterns/](https://yaboong.github.io/design-pattern/2018/09/28/thread-safe-singleton-patterns/)
* [https://defacto-standard.tistory.com/39](https://defacto-standard.tistory.com/39)
