---
layout: post
title: GoF의 디자인 패턴 3장 Factory 패턴
comments: true
tags:
- GoF 디자인 패턴
- java
---

이 책에서 설명하는 디자인 패턴은 `목적`에 따라 **생성(3장)**, **구조(4장)**, **행위(5장)** 으로 나누고 있으며, `범위`에 따라 **클래스**를 대상으로 하는지, **객체**를 대상으로 하는지로 구분하고 있다.     

3장은 생성 패턴 5가지를 기술하고 있으며, 생성 패턴을 이용하면 **'무엇이 생성되고, 누가 이것을 생성하며, 이것이 어떻게 생성되는지, 언제 생성할 것인지 결정하는 데 유연성을 확보할 수 있다.'**고 책에 적혀져 있다.     

``` text
# 3장 생성패턴
    ├─── 클래스
    │     └─── 3.03 Factory Method
    └─── 객체
          ├─── 3.01 Abstract Factory
          ├─── 3.02 Builder
          ├─── 3.04 Prototype
          └─── 3.05 Singleton
```

여기서 `팩토리 메서드`, `추상 팩토리` 이 두 패턴은 분명 다른 패턴이지만, 이름도 비슷하고 무언가를 감싸서 찍어내는게 비슷해 보여서 헷갈린다. 여튼 둘 다 `팩토리`라는 단어가 있으니 이 단어가 두 패턴의 **공통점**일 것이다. 이 팩토리가 뭔지 먼저 설명해보겠다.     

# Factory..?
디자인 패턴에서 말하는 팩토리는 `객체 생성을 캡슐화`하는 것이라고 보면 된다. 두 패턴 모두 `객체 생성을 캡슐화`를 하기 위해 쓰는 것이며, 이것이 바로 공통점이다.     

여기서 **객체 생성을 캡슐화 한다는게 무슨 말일까?**     

Java나 C++ 등에서는 `new`를 사용해서 구상 클래스(concrete class)의 인스턴스를 만든다. 팩토리 패턴은 `new`로 **인스턴스를 생성하는 부분을 서브클래스에 위임하고, 이 위임을 통해 객체 생성을 캡슐화 하게되며, 구상 클래스에 대한 의존성이 줄어든다.** 이 부분은 뒤에 Factory를 어떻게 쓰는지를 보면 와닿을 것이다.     

이제 **구상클래스에 대한 의존성이 줄어든다는게 무슨 말일까?**     

구상 클래스는 클래스 내부에 구체적으로 정의된 메서드들이 있다. 자기 역할(메서드)들이 이미 세세하게 구현이 되어있는 클래스이며, 이 완성된 구상 클래스를 통해 바로 객체를 생성하는 것은 바람직하지 않다.     

왜 바람직하지 않을까? 이렇게 할일이 구체적으로 정해져 있는 구상 클래스를 그대로 쓴다는 것은, 추후에 수정할 곳이 많아진다는 뜻이다. 당연히 개발자인 내 입장에서는 최소한의 수정으로 바뀐 부분을 개발하는것이 정신건강에 이로울 것이다.     

여튼, 이런 구상 클래스를 사용해서 직접적으로 객체를 생성한다는 것은 **인터페이스가 아닌 특정 구현에 의존하게 된다는 것이다.** 별 생각없이 짜다보면 switch로 분기 처리를 하는(혹은 if-else문으로 떡칠된) 이런 코드가 만들어진다.     

``` java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
    switch (e.type) {
        case COMMISSIONED:
            return calculateCommissionedPay(e);
        case HOURLY:
            return calculateHourlyPay(e);
        case SALARIED:
            return calculateSalariedPay(e);
        default:
            throw new InvalidEmployeeType(e.type);
    }
}
```

> 위의 코드는 `클린코드 p.47 목록 3-4 Payroll.java`의 코드이다. 이 코드가 왜 문제인지는 [클린코드 3장 함수 - p.47 Switch 문](https://hyesun03.github.io/2019/03/25/cleancode-01/)에 상세하게 설명해놨다.     

저 포스팅을 요약하자면, `calculatePay(Employee e)`뿐만이 아니라 곳곳에 해당 인스턴스의 타입을 판별해서 switch(혹은 if-else)로 분기해서 처리하는 메서드들이 잔뜩 있을 것이다. 추후에 새로운 타입(새로운 고용형태)이 추가되거나, 삭제할일이 있으면 하나하나 다 찾아가서 고쳐줘야 하기 때문이다.     

IDE가 아무리 발전해도 우리는 사람이니까 실수를 하게 되는건 어쩔 수 없다. 피곤에 쩔어있는 상태의 나는 나도 신뢰를 하지 못하기 때문에, 내가 실수를 덜 할 수 있게끔 대비해야된다.     

이제 언급된 문제를 개선해보자.     


# 그래서 Factory를 어떻게 쓰는건가요?
위 문제는 **인스턴스를 생성하는 부분(new 쓰는 곳)을 별도로 분리**함으로써 개선할 수 있다.     

위의 경우 처럼 특정 조건(고용형태)에 따라 다른 타입의 객체(고용타입)를 만들어야 할 때가 있다. 사용자의 입력(조건)에 의해 하는 일이 달라지면, switch등의 분기를 통해서 객체를 생성해야한다.     

당연히 하는일이 다르기 때문에 분기를 통해서 객체를 생성하는것 자체는 문제가 없으나, 직접적으로 객체 생성(new 쓰는 곳)을 하는게 아니라, 팩토리로 한번 감싸서 숨김으로써 세부 구현을 노출하지 않는다. 팩토리 클래스가 원하는 조건에 맞는 객체를 리턴하도록 하는 방식이다.     

이제 아래 예제를 통해 **객체 생성을 캡슐화** 하는것을 볼 수 있다.     

``` java
// Employee 추상 클래스.
// 이 Employee를 상속받은 파생 클래스에서 아래의 메서드들이 @override를 통해 구체적으로 구현이 되어있다.
// 파생 클래스에는 CommissionedEmployee, HourlyEmployee, SalariedEmployee가 있다.
public abstract class Employee {
    public abstract boolean isPayday();
    public abstract Money calculatePay();
    public abstract void deliverPay(Money pay);
}

// Employee 객체를 생성하는 팩토리.
// makeEmployee가 Employee를 return하는 것이 보일 것이다.
// 위의 추상 클래스에서 선언된 isPayday(), calculatePay(), deliverPay()는 Employee를 거쳐서 호출된다. OOP에서 말하는 '다형성'이 바로 이것이다.
public interface EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}

// switch..이거 안좋다면서요?
// 하지만 new로 구상 클래스의 객체를 생성하는것은 피할 수 없다. 객체를 생성할 때, 딱 한번만 허용하는 것이다.
// 이렇게 객체 생성을 숨겨놓는다. 객체 생성을 캡슐화하는 것
public class EmployeeFactoryImpl implements EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
        switch(r.type) {
            case COMMISSIONED:
                return new CommissionedEmployee(r) ;
            case HOURLY:
                return new HourlyEmployee(r);
            case SALARIED:
                return new SalariedEmployee(r);
            default:
                throw new InvalidEmployeeType(r.type);
        }
    }
}
```

> 위의 코드는 `클린코드 p.48 목록 3-5 Employee and Factory`의 코드이다.      
책에서는 Abstract Factory라고 언급이 되어있는데 왜 인지 모르겠다. 저번에 저 책을 읽었을때는 Simple Factory아닌가? Factory Method인가? 하고 넘어갔고 지금 봐도 잘 모르겠다. 나는 저게 Simple Factory로 보이는데, 다른 사람들의 생각이 궁금하다.     
Abstact Factory의 특징은 여러개의 객체를 '조합'해서 쓰는게 특징인데, 저 예제는 여러 객체를 '조합'하지 않는다.     

위에서 보이는것 처럼 객체를 생성하는 코드는 딱 하나의 클래스에서 담당한다. 이렇게 하면 구체적으로 어떤 타입의 객체가 생성되었는지 신경 쓸 필요없이 쓸 수 있다.     


# Abstract Factory, Factory Method
이 두 패턴을 비교하는 예제로는 유명한 피자가게 예제를 들고왔다. 수많은 예제가 있지만 이거만 한 게 없는 듯..     

### > Factory Method
![Factory Method]({{ site.url }}/images/factory_method_pizza_01.jpg)

NYPizzaStore를 보면 `createPizza()` 메서드가 NYStyleCheezePizza, NYStyleClamPizza 등을 모두 생성한다. **하나의 메서드가 여러 종류의 Pizza 객체를 생성한다.**     

`createPizza()` 에서는 Pizza 객체를 가지고 `반죽()`, `굽기()`, `데코()` 등.. 여러 작업을 할 것이지만, 실제로 어떤 구체적인 클래스에서 작업이 처리되고 있는지는 전혀 알 수가 없다. PizzaStore와 Pizza 클래스는 완전히 분리되어있다.     

따라서, Factory Method 패턴은 **구체적으로 어떤 클래스의 객체를 생성할지 미리 알지 못할 경우에 유용**하다. 서브 클래스를 추가해나가는 형태니까. 그래서 어떤 객체를 생성할 것인지에 상관없이 개발이 가능하며, 직접 생성자를 호출해 객체를 생성하는 것보다는 유연하고 확장성있는 구조이다.     

하지만 이런 구조 때문에 생기는 단점이 있다. 새로운 객체 타입이 추가 될 때 마다 새로운 서브 클래스를 계속 만들어야 하기 때문에 클래스 수가 많아진다.     
 
### > Abstract Factory
![Factory Method]({{ site.url }}/images/abstract_factory_pizza_02.jpg)

PizzaIngredientFactory 인터페이스를 구현한 NYPizzaIngredientFactory(흰색), ChicagoPizzaIngredientFactory(회색) 가 있다. 우선 눈에 들어오는것은 Factory Method와 달리 객체를 생성하는 메서드가 많이 있다.     

`createDough()`, `createSauce()`, `createCheese()`등.. 이를 통해서 **관련있는 여러 종류의 객체들을 한 그룹으로 묶어서 '제품군'을 만든다**는 사실을 이해할 수 있다. Factory들을 추상화 해서 올려놨기 때문에 Abstract Factory라고 부르는듯.     

그리고 Factory Method 그림에 있는 `createPizza()`와 다르게 `createDough()`는 **한 종류의 객체만을 생성**한다. 그러니까 NYPizzaIngredientFactory에서 `createDough()`를 하면 ThinCrushDough 객체만을 생성한다. `createSauce()`, `createCheese()` 등의 메서드도 똑같다.     

따라서, Abstract Factory 패턴은 생성해야할 객체가 한 가지일 경우 비효율적이다.     


# 정리

## 공통점
* 객체 생성을 캡슐화 함
* 구상 클래스와의 의존성을 줄임

## 차이점
### > Factory Method
* 어떤 구상 클래스를 쓸까?
* 상속을 활용해서 객체 생성을 서브 클래스에 위임

### > Abstract Factory
* 어떤 팩토리를 쓸까?
* 여러 종류의 객체를 조합해서 객체를 생성
* 훨씬 더 크고 복잡한 인터페이스를 가지고 있음
* Factory Method와 함께 쓰이기도 함


# 기타
* DIP(Dependency Inversion Principle)까지 묶어서 정리를 하려고 했는데, 자연스럽게 풀어내기가 힘들어서 이쯤에서 마무리..

* Static Factory Method(정적 팩토리 메서드) 라는 패턴이 있다. 이는 GoF책에 있는 '팩토리 메서드' 패턴과는 다른것이다. 검색하면 같이 섞여서 나오는데, 이름만 아주 유사하게 생겨서 헷갈리니까 주의.     

* 하필 클린 코드책에 있는 예제를 가져와서 다시 보는데, 암만봐도 이게 왜 **GoF의 Abstract Factory**라고 언급이 되었는지 이해가 안가서 애를 많이 먹었다. [스택오버플로에 있는 질문글](https://softwareengineering.stackexchange.com/questions/213571/should-uncle-bobs-example-be-refactored-to-an-abstractfactory-or-a-simplefactor)을 봐도 궁금한게 시원하게 해소가 안됨..     

* 많은 예제들을 찾아보다가 패턴들을 재미있게 설명해 둔 블로그를 찾았다. [newsdu의 네이버 블로그](https://blog.naver.com/newsdu/80115144381)     


# 참고자료
* [https://blog.naver.com/jvioonpe/220227413391](https://blog.naver.com/jvioonpe/220227413391)
* [http://algamza.blogspot.com/2016/04/factory-method.html](http://algamza.blogspot.com/2016/04/factory-method.html)
* [http://friday.fun25.co.kr/blog/?p=280](http://friday.fun25.co.kr/blog/?p=280)
* [https://stackoverflow.com/questions/5739611/what-are-the-differences-between-abstract-factory-and-factory-design-patterns](https://stackoverflow.com/questions/5739611/what-are-the-differences-between-abstract-factory-and-factory-design-patterns)
* [https://whereami80.tistory.com/211](https://whereami80.tistory.com/211)
* [https://www.oreilly.com/library/view/head-first-design/0596007124/ch04.html](https://www.oreilly.com/library/view/head-first-design/0596007124/ch04.html)
