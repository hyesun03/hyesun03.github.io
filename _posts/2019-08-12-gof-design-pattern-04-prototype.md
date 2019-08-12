---
layout: post
title: GoF의 디자인 패턴 3장 Prototype 패턴
comments: true
tags:
- GoF 디자인 패턴
---

지난주에 싱글턴까지 쓸랬는데 흑흑.. 벌써 스터디가 거의 다 끝나가고있다.     

> 객체를 새로 생성하는 것 보다, 복사하는 것이 더 효율적이거나 인스턴스를 만드는 과정이 복잡할 때 사용하는 패턴이다.     

`new` 키워드를 사용해서 새로운 객체를 만들면, 기존에 만들어진 객체와 비슷하긴해도 모든 속성을 새로 설정 해 줘야 하는 번거로움이 있다. 하지만 복사를 통해서 만들게 되면 바뀐 부분만 바꿔서 만들어주면 된다.     

# p.170 - p.171 구조
170쪽에 나와있는 구조에는 **Graphic Tool**에 흰 마름모가 달려있고, 171쪽에 나와있는것은 그렇지 않다. 171쪽에 있는 구조가 좀 더 일반화 된 구조이기 때문에 그렇고, 굳이 두 관계가 aggregation일 필요는 없다.     

## p.170에 있는 구조 
![Prototype p.170]({{ site.url }}/images/prototype_pattern_01.gif)

## p.171에 있는 구조 
![Prototype p.171]({{ site.url }}/images/prototype_pattern_02.gif)

# 구현방법
Java에서는 [Cloneable](https://github.com/JetBrains/jdk8u_jdk/blob/master/src/share/classes/java/lang/Cloneable.java)을 implements 해서 프로토타입 패턴을 구현할 수 있으며, 아래와 같이 `clone()`을 오버라이드 해서 구현해준다.     

[Cloneable 코드](https://github.com/JetBrains/jdk8u_jdk/blob/master/src/share/classes/java/lang/Cloneable.java)를 보면 알겠지만 속이 비어있다. 이런 인터페이스를 `marker interface`라고 한다. 코드를 딱 봤을 때 `이 클래스는 clone()이 구현되어있다~`의 의미만 전달 해 준다.     

 ``` java
 class Graphic implements Cloneable {
        @Override
        protected Object clone() throws CloneNotSupportedException {
            // 여기에 구현
            return super.clone();
        }
    }
 ```

1. 위 코드에서 보는것과 같이 `java.lang.Object`에 있는 clone()은 **protected**로 선언이 되어 있기 때문에 **public**으로 오버라이드하지 않으면 외부에서 호출할 수 없다.      

2. Java에서 `clone()`을 구현 할 때, 반드시 Cloneable 인터페이스를 구현해야한다. 만약 이것을 구현하지 않고 `clone()`을 호출 하면, **CloneNotSupportedException**이 나온다.     

3. 여기서 `clone()`은 값이 아닌 **참조(reference)**가 복사되어서 들어가기 때문에 신경을 써 줘야 한다. 예를 들면 클래스 내부에 배열이나 객체 레퍼런스가 있다고 가정하자. reference만을 복사하기 때문에 값 자체가 복사되지 않는다. 한쪽이 바뀌게 되면 원본과 복사본 모두 영향을 끼치게 된다.     

4. `clone()`을 제대로 구현하기가 어려우며 책에서는 `환형 참조`의 문제를 예로 들고있다. JPA 쓸 때도 많이 겪는 일이고, JSON 다룰 때 환형 참조 때문에 콜 스택 쌓여서 크롬 뻗는것을 생각해보자(...)    

5. 모든 패턴이 그렇지만 이 프로토타입 패턴 역시 다른 패턴들과 함께 쓰일 수 있다. 예를 들면 복사해서 복사본을 리턴해주는 부분을 `팩토리 패턴`으로 구현할 수 있다.     

# 기타
1. 직렬화(serialization)가 생각나는데, deep cloning하는 대표적인 예가 될 것같다. **직렬화 역시 환형 참조 등의 문제가 생길 수 있기 때문에 그냥 벤더가 만들어둔거 써라(...)**고 책에 적혀져 있다. 한 달 전이라 뭔 상황이었는지 구체적으로 생각은 안나는데, 스터디 하다가 직렬화에 대해서 잠깐 언급 되었나봄..     

2. 이상하게 [Cloneable](https://github.com/JetBrains/jdk8u_jdk/blob/master/src/share/classes/java/lang/Cloneable.java)이 아니라 [Object](https://github.com/JetBrains/jdk8u_jdk/blob/master/src/share/classes/java/lang/Object.java)에 `clone()`이 들어있는지 의문이 들었다. [이런 글](http://iilii.egloos.com/4022941)을 찾았는데, Java에서 clone 동작에 대해서 좀 더 찾아보고 정리 해 봐야겠다.     

3. 그리고 **CloneNotSupportedException**은 checked exception 이다. 왜인지 모르겠지만 이것도 함께 찾아보고 정리를 ㅜㅜ

# 참고자료
* [http://www.cs.unc.edu/~stotts/GOF/hires/pat3dfso.htm](http://www.cs.unc.edu/~stotts/GOF/hires/pat3dfso.htm)
* [http://egloos.zum.com/iilii/v/4062738](http://egloos.zum.com/iilii/v/4062738)
