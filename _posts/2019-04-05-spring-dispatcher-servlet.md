---
layout: post
title: Spring Dispatcher Servlet
comments: true
tags:
- spring boot
- java
---

# Dispatcher Servlet이 하는 역할

```
클라이언트에서 HTTP를 통해 요청을 하면 Servlet Container(Tomcat)이 요청을 받는다.     
이 때 제일 앞에서 모든 요청을 처리하는 Front Controller.
```

예를 들어서 아래의 시나리오를 생각해 볼 수가 있다.     

1. `/users/find`에 요청이 오면, Spring에 있는 Dispatcher Servlet으로 가게 된다.
2. Dispatcher Servlet이 `UserContoller.java`에 있는 `getByEmail()`과 같은 적절한 함수를 찾는다.
3. 이 함수를 어떻게 찾냐면, 해당 함수위에 있는 `@GetMapping('/users/find')`와 같은 어노테이션(Handler Mapping)을 보고 찾는다.
4. 함수를 수행하고나서 적절한 view를 리턴한다.

그러니까 Spring MVC에 들어오는 모든 요청과 응답을 관리하는 것이 Dispatcher Servlet이다.     

# Dispatcher Servlet의 장점

나는 부트로 입문을 해서 이것저것 써보고 있고, 옛 스프링을 써본적이 없다. 일단은 그냥 그렇구나 하기로 넘어가기로 했다.     

## MVC 사용 강제

Dispatcher Servlet을 쓴다는 것은 Spring에서 제공하는 `@MVC`를 쓰겠다는 뜻이다.     

## web.xml의 역할 축소

과거에는 모든 URL 매핑을 `web.xml`에 등록했다. Dispatcher Servlet이 모든 요청을 핸들링 하기 때문에 그렇게 하지 않아도 된다.     

(Spring Boot에서는 `@SpringBootApplication` 이라는 어노테이션으로 `web.xml` 파일을 대체할 수 있다.)     


# Dispatcher Servlet의 흐름

참고했던 블로그에 있는 사진들의 글자가 깨져보여서 다시 그렸다.     

![dispatcher servlet의 흐름]({{ site.url }}/images/dispatcher_servlet_01.png)

# Dispatcher Servlet의 위치

전체적으로 그림을 그려보면 이렇게 될 것이다.     

![dispatcher servlet의 위치]({{ site.url }}/images/dispatcher_servlet_02.png)


# 참고자료
* [http://egloos.zum.com/springmvc/v/504151](http://egloos.zum.com/springmvc/v/504151)
* [https://mangkyu.tistory.com/18](https://mangkyu.tistory.com/18)
* [http://www.incodom.kr/spring/dispatcher-servlet](http://www.incodom.kr/spring/dispatcher-servlet)


