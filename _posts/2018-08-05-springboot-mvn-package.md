---
layout: post
title: spring boot 'mvn package' 에러
comments: true
tags:
- spring boot
---
날이 덥다, 계절학기 듣는다, 자바써본지가 언젠데 가물가물하다, 뭘 보고 공부해야하나 등의 온갖 핑계를 대다가 방금 시작했다. 결국 [spring boot 문서](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#boot-documentation) + 유튜브에 올라와 있는 [백기선님 강의](https://www.youtube.com/watch?v=CnmTCMRTbxo&list=PLfI752FpVCS8tDT1QEYwcXmkKDz-_6nm3)로 시작했다. 내 상태는 현재 아래와 같다.
- 스프링에 대한 지식없이 스프링부트로 시작
- 2년전에 자바를 공부했던거 같...은데 가물가물

이리저리 핑계대다가 아무것도 못하고 9월을 맞이할듯해서 그냥 시작했다. 내 환경은 아래와 같다.
- java 10.0.1
- maven 3.5.4
- spring boot 2.1.0-SNAPSHOT


## **mvn package 에러**
[11.1 Creating the POM](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#getting-started-first-application-pom) 여기서 `mvn package`를 실행하자 아래와 같은 error가 났다.
``` text
[ERROR] Failed to execute goal org.springframework.boot:spring-boot-maven-plugin:2.1.0.BUILD-SNAPSHOT:repackage (default) on project spring-boot-day001: Execution default of goal org.springframework.boot:spring-boot-maven-plugin:2.1.0.BUILD-SNAPSHOT:repackage failed: Unable to find main class -> [Help 1]
```

처음 `pom.xml`을 만들때 아래 build 관련 내용도 같이 넣었는데 이거 때문이었다. (문서 바로 뒤 11.5에서 build 관련 내용을 넣는게 나온다.) 아래 플러그인이 `Main` 클래스가 있는 java파일을 필요로 하기 때문에 지금 상태(`src/main/java`아래에 어떤 java파일도 없는 상태)에서는 이걸 넣어주면 안된다.   
실행가능한 jar파일을 만들려면 뭔가 실행할게 필요한데 실행할게 아무것도 없는 상태니까 error를 받은 것이다. 따라서 아래 부분을 지우면 문제없이 돌아가는 것을 확인 할 수 있다. 어차피 `src/main/java`아래에 java파일 하나 만들 것이기 때문에 무시하고 넘어가도 된다.
``` xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```
