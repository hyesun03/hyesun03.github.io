---
layout: post
title: JMH를 사용한 gradle 환경에서의 Java 코드 벤치마킹
comments: true
tags:
- java
- gradle
- 성능
- 측정
---

몇 달전에 ["코드 수행 시간을 어떻게 측정하나요?"](https://hyesun03.github.io/2019/04/19/check-code-execution-time/)를 포스팅 했었다. 다양한 Singleton 구현법에 대해 퍼포먼스를 측정하고 싶었지만, 저런 측정 방법이 영 미심쩍었다. 그래서 좀 더 정확하고 괜찮은 방법으로 벤치마킹 하는 법에 대해서 찾아보았다.     

* **이 포스팅에서 진행한 예제 코드는 [여기](https://github.com/hyesun03/jmh-gradle-tutorial)에서 볼 수 있다.**     

* Java 1.8, Gradle 5.2, [jmh-gradle-plugin](https://github.com/melix/jmh-gradle-plugin) 0.4.8 에서 진행했다.     

# stopwatch benchmarking
다들 흔히 알고있고 내가 미심쩍어 하는 "그 방법"인데, 검색을 하다보니 "스톱워치 벤치마킹"이라고 부르는 것을 알게되었다. 간단히 스톱워치 처럼 **(end time - start time)**을 계산하기 때문에 이런 이름이 붙은 듯.     

10년 전 글이지만, [Is stopwatch benchmarking acceptable?](https://stackoverflow.com/questions/410437/is-stopwatch-benchmarking-acceptable)라는 스택오버플로 글을 발견했다. 저 질문 아래에 달린 댓글들을 간략하게 정리하면 아래와 같다.     

1. 반복을 충분히 한다면 스톱워치 벤치마킹도 꽤 괜찮다.
2. 프로세스 스케줄링이나 OS 인터럽트 등의 문제로 측정값이 크게 튈 수 있다.
3. 몇 년 동안 써본 경험으로는 jProfiler가 좋았고 YourKit 라는 것도 있다.
4. 해당 코드를 테스트 하기전에 약 10000번 정도 돌려서 JIT를 "워밍업"하는 것도 고려해 봐라.
5. 프로파일러를 쓰는 게 당연히 좋겠지만, 스톱워치 벤치마킹은 간단하기도 하고 어느 정도의 오차는 신경을 쓰지 않기 때문에 애용한다.

10년이면 강산이 바뀌기 때문에 더 이상 구체적으로 찾아보진 않았고, 최근에는 어떤 벤치마킹을 쓰는지 찾아보다가 [JMH](http://openjdk.java.net/projects/code-tools/jmh/)라는 것을 알게 되었다.     

# JMH(Java Microbenchmark Harness)
OpenJDK에서 만든 micro benchmark 라이브러리이며 같은 기능을 가진 여러 메소드들을 비교하고 싶을때 쓰면 좋다. 간단하게 벤치마킹 할 수 있는 장점이 있고, JVM위에 코드가 수행될때 JIT 컴파일러가 수행하는 최적화 등을 고려해서 워밍업 기능도 제공한다. [JMH 샘플코드들](https://github.com/melix/jmh-gradle-example) 참고. Java 뿐만이 아니라 JVM에서 돌아가는 언어들 전부 쓸 수 있다.     

많은 자료들이 `maven` 환경을 권장하며, `maven` 환경에서 작성된 글들이 많았다. 그래서 나는 `gradle` 환경에서의 JMH 사용법에 대해서 정리를 해 보았다.     

프로젝트 생성부터 시작하면서 의외로 이상한 삽질을 많이 했다. 아래와 같은 과정이 귀찮으면 [이미 있는 JMH 샘플코드 저장소](https://github.com/melix/jmh-gradle-example)를 clone해서 코드를 조금씩 바꿔보며 돌려보는게 좋을 수 있다.     

## 1) 프로젝트 생성
먼저 벤치마크를 적당히 작성 해 볼 프로젝트를 생성한다. 나는 **IntelliJ IDEA**를 사용해서 생성했다.     

좌측 Gradle을 선택한다.     
![IntelliJ 프로젝트 생성]({{ site.url }}/images/jmh-gradle-tutorial-01.png)

테스트용 프로젝트라서 GroupId, ArtifactId는 정석룰을 따르지 않고 적당히 붙인다.     
![IntelliJ 프로젝트 생성]({{ site.url }}/images/jmh-gradle-tutorial-02.png)

별도로 설정하고 싶은게 있으면 하고, 나는 그대로 냅두고 **Next**를 눌렀다. (저렇게 해뒀으나 귀찮아서 뒤에 **Use auto-import**를 체크했다)     
![IntelliJ 프로젝트 생성]({{ site.url }}/images/jmh-gradle-tutorial-03.png)

## 2) build.gradle 설정
[jmh-gradle-plugin](https://github.com/melix/jmh-gradle-plugin)을 사용하며, `build.gradle`에 plugin을 추가 해 준다. 현재 RC버전이 아닌 최신 버전은 `0.4.8`이다.     

``` groovy
plugins {
  id "me.champeau.gradle.jmh" version "0.4.8"
}
```

만약 모든 gradle 버전에서 쓰고 싶다면 아래와 같이 작성한다.     

``` groovy
buildscript {
  repositories {
    maven {
      url "https://plugins.gradle.org/m2/"
    }
  }
  dependencies {
    classpath "me.champeau.gradle:jmh-gradle-plugin:0.4.8"
  }
}

apply plugin: "me.champeau.gradle.jmh"
```

## 3) 디렉토리 구조 변경
위에까지 하고 java파일을 만들어서 돌려봤는데, 제대로 import가 되지 않아서 의아했다. [jmh-gradle-plugin README](https://github.com/melix/jmh-gradle-plugin)에 따르면 특정 구조를 따를 것을 권고하고있다.     

처음에 프로젝트를 생성하면 아래와 같은 구조가 만들어진다.     
``` text
프로젝트 폴더
    └─── src
          ├─── main
          │     ├─── java
          │     └─── resources
          └─── test
                ├─── java
                └─── resources
[기타 생략]
```

이것을 아래와 같이 바꿔주면된다. `src/main/`에 있는 것을 `src/jmh/`로 옮겨주면된다.     
``` text
프로젝트 폴더
    └─── src
          └─── jmh
                ├─── java
                └─── resources
[기타 생략]
```

## 4) 샘플 코드 돌려보기
먼저 [간단한 샘플 코드](https://github.com/melix/jmh-gradle-example/blob/master/src/jmh/java/org/openjdk/jmh/samples/JMHSample_01_HelloWorld.java)를 돌려보자. 여기까지 진행한 모습은 아래와 같다. 좌측에 있는 프로젝트 구조를 확인해보자.     
![IntelliJ 프로젝트 구조]({{ site.url }}/images/jmh-gradle-tutorial-04.png)

이제 코드를 돌려보려고 하면 아래와 같은 에러들을 만날 수도 있다.     

### 만날 수 있는 에러 1
``` text
Exception in thread "main" java.lang.RuntimeException: ERROR: Unable to find the resource: /META-INF/BenchmarkList
	at org.openjdk.jmh.runner.AbstractResourceReader.getReaders(AbstractResourceReader.java:98)
	at org.openjdk.jmh.runner.BenchmarkList.find(BenchmarkList.java:122)
	at org.openjdk.jmh.runner.Runner.internalRun(Runner.java:263)
	at org.openjdk.jmh.runner.Runner.run(Runner.java:209)
	at JMHSample_01_HelloWorld.main(JMHSample_01_HelloWorld.java:19)
```

만약 위와 같은 에러가 나왔다면 `Preferences > Build, Execution, Deployment > Compiler > Annotation Processors`를 확인해보자. **Enable annotation processing**에 체크가 되어있어야한다. [idea-jmh-plugin #13에 달린 댓글](https://github.com/artyushov/idea-jmh-plugin/issues/13#issuecomment-95628473)을 참고했다.     
![IntelliJ 프로젝트 annotation processors 설정]({{ site.url }}/images/jmh-gradle-tutorial-05.png)

### 만날 수 있는 에러 2
``` text
Error:(7, 1) java: Benchmark class should have package other than default.
```

만약 위와 같은 에러가 나왔다면 프로젝트 구조를 확인 해 보자. `src/java/` 아래에 바로 java 클래스 파일을 넣으면 저런 에러가 나오는데, `src/java/` 아래에 적당히 패키지를 만들어서 넣어두면 된다. 나는 `com/hyesun03/` 아래에 넣어놨다.     

### 만날 수 있는 에러 3
``` text
> Task :jmhRunBytecodeGenerator FAILED
Processing 1 classes from /Users/choehyeseon/Documents/jmh-gradle-tutorial/build/classes/java/jmh with "reflection" generator
Writing out Java source to /Users/choehyeseon/Documents/jmh-gradle-tutorial/build/jmh-generated-sources and resources to /Users/choehyeseon/Documents/jmh-gradle-tutorial/build/jmh-generated-resources

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':jmhRunBytecodeGenerator'.
> A failure occurred while executing me.champeau.gradle.JmhBytecodeGeneratorRunnable
   > Generation of JMH bytecode failed with 1 errors:
       - The instantiated @State annotation only supports public classes.
        [com.hyesun03.JMHSample_01_HelloWorld]


* Try:
Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Exception is:
org.gradle.api.tasks.TaskExecutionException: Execution failed for task ':jmhRunBytecodeGenerator'.
        at org.gradle.api.internal.tasks.execution.ExecuteActionsTaskExecuter.execute(ExecuteActionsTaskExecuter.java:95)
        at org.gradle.api.internal.tasks.execution.ResolveTaskOutputCachingStateExecuter.execute(ResolveTaskOutputCachingStateExecuter.java:91)
        at org.gradle.api.internal.tasks.execution.ValidatingTaskExecuter.execute(ValidatingTaskExecuter.java:57)
[이하 생략..]
```

README 문서를 보나 뭘 다른걸 찾아봐도 더 이상 할게 안보였는데, 여기서 몇 시간동안 막힌듯.. 곰곰히 생각하다가 **'gradle 버전 문제인가?'** 하는 생각이 들어서 아래와 같이 버전을 명시적으로 지정해 줬다. 버전 지정하고나니까 위와 같은 에러가 싹 사라졌다.     

``` groovy
wrapper {
    gradleVersion = '5.2'
}
```

### 만날 수 있는 에러 4
또 한가지 주의할 점은 여기서 직접적으로 main 함수를 `Run`하면 안되고 터미널에서 돌려야 된다. IntelliJ를 포함한 IDE 내에서 **Run**을 하면 아래와 같은 에러가 나온다.     
``` text
Error:java: Compiler control generators had thrown the unexpected exception java.lang.AbstractMethodError: org.openjdk.jmh.generators.annotations.APGeneratorDestinaton.newResource(Ljava/lang/String;)Ljava/io/OutputStream;
  	at org.openjdk.jmh.generators.core.CompilerControlPlugin.finish(CompilerControlPlugin.java:103)
  	at org.openjdk.jmh.generators.core.BenchmarkGenerator.complete(BenchmarkGenerator.java:119)
  	at org.openjdk.jmh.generators.BenchmarkProcessor.process(BenchmarkProcessor.java:54)
[이하 생략..]
```

아래 명령어를 IDE내 **Terminal**에 입력하든지, 별도의 쓰고있는 터미널을 열어서 치든지 해야된다.     
``` bash
$ gradle jmh
```

## 완성된 build.gradle 파일
``` groovy
plugins {
    id 'java'
    id 'me.champeau.gradle.jmh' version '0.4.8'
}

group 'hyesun03'
version '1.0-SNAPSHOT'

sourceCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.12'
    jmh 'org.openjdk.jmh:jmh-core:0.9'
    jmh 'org.openjdk.jmh:jmh-generator-annprocess:0.9'
}

wrapper {
    gradleVersion = '5.2'
}

// 여기에 기타 원하는 jmh 관련 설정을 넣는다
jmh {

}
```

## 결과
별도의 설정없이 돌리면 iteration을 5번이나 해서(...) 샘플 하나 돌리는것도 오래걸렸다. 대략 8분 30초 걸림. 적당히 한번 돌려보고 "으음 ㅇㅋㅇㅋ" 하고 말거면 추가 설정을 해 주는것이 좋다.     

`/build/reports/jmh/results.txt`로 결과 파일이 따로 만들어지는것을 알 수 있고, 원하면 파일이 생기지 않게끔 설정 할 수도 있다.     
``` text
[위쪽 생략..]

Result "com.hyesun03.JMHSample_01_HelloWorld.wellHelloThere":
  2732991792.728 ±(99.9%) 154909816.563 ops/s [Average]
  (min, avg, max) = (2150867578.660, 2732991792.728, 2957595782.389), stdev = 206800173.104
  CI (99.9%): [2578081976.165, 2887901609.291] (assumes normal distribution)


# Run complete. Total time: 00:08:23

REMEMBER: The numbers below are just data. To gain reusable insights, you need to follow up on
why the numbers are the way they are. Use profilers (see -prof, -lprof), design factorial
experiments, perform baseline and negative tests that provide experimental control, make sure
the benchmarking environment is safe on JVM/OS/HW level, ask for reviews from the domain experts.
Do not assume the numbers tell you what you want them to tell.

Benchmark                                Mode  Cnt           Score           Error  Units
JMHSample_01_HelloWorld.wellHelloThere  thrpt   25  2732991792.728 ± 154909816.563  ops/s

Benchmark result is saved to /Users/choehyeseon/Documents/jmh-gradle-tutorial/build/reports/jmh/results.txt

```

아래 옵션을 `build.gradle`에 추가 해 주면 30초도 안걸렸다.     
``` groovy
jmh {
    fork = 1
    warmupIterations = 1
    iterations = 1
}
```

이 포스팅에서 진행한 예제 코드는 [https://github.com/hyesun03/jmh-gradle-tutorial/blob/master/build.gradle](https://github.com/hyesun03/jmh-gradle-tutorial/blob/master/build.gradle) 에서 볼 수 있다.     

# 참고자료
* [https://stackoverflow.com/questions/410437/is-stopwatch-benchmarking-acceptable](https://stackoverflow.com/questions/410437/is-stopwatch-benchmarking-acceptable)
* [https://plugins.gradle.org/plugin/me.champeau.gradle.jmh/0.4.8](https://plugins.gradle.org/plugin/me.champeau.gradle.jmh/0.4.8)
