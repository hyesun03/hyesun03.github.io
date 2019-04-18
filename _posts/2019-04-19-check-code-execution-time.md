---
layout: post
title: 코드 수행 시간을 어떻게 측정하나요?
comments: true
tags:
- 질문과 답
- 성능
- 측정
---

같은 질문 여러 번 받았기 때문에 DRY 원칙(...)에 의해 한 번 정리를 해 보았다. '자주 질문 받는것들은 정리해두고 링크만 던져줘야지~~' 하면서 정리하기 귀찮아서 미뤄둔다. 별거없는 내용으로 시작하는데, 막상 글 쓰다보면 딴 길로 새고 이것저것 찾아본다고 글 쓰는건 오래 걸림..     

코드 수행 시간을 측정하는 것은 아래의 흐름과 같다.     

1. start 시각 기록
2. 코드를 실행
3. end 시각 기록
4. (end - start)를 계산

# C
`<time.h>`에 있는 time() 혹은 clock()을 쓰면 된다. time()은 s(초) 단위로 측정이 되는 단점이 있다. 아래는 `<time.h>` 에서 **CLOCK_PER_SEC**가 정의 된 부분을 가져온 것이다. Xcode에서 우클릭을 통해 Jump to Definition을 하면 볼 수 있다.     

**CLOCK_PER_SEC** 1초당 클럭 틱이 발생하는 횟수이다. 여기서는 1000000 으로 정의되어 있으며, 클럭틱은 10<sup>-6</sup>초에 한번씩 증가한다. 즉, 1초에 10<sup>6</sup>회 클럭틱이 발생한다. 다른 분들 글을 보면 1000으로 정의되어 있는 것 같던데 직접 찾아보니까 달랐다. `아무래도 OS마다 다른 것 같다.`     

``` c
#if __DARWIN_UNIX03
#define CLOCKS_PER_SEC  1000000	/* [XSI] */
#else /* !__DARWIN_UNIX03 */
```

계속 Jump to Definition을 눌러서 찾아가 보면 **clock_t**는 그냥 **unsigned long** 이라는 것을 알 수 있다. 다른 분들 글을 보면 long 으로 typedef 되어있던데, 이것 역시 OS마다 다른 것 같다.     

``` c
// <../sys/_types/_clock_t.h> 의 일부
typedef __darwin_clock_t        clock_t;

// <usr/include/i386/_types.h> 의 일부
typedef unsigned long		__darwin_clock_t;	/* clock() */
```

아래 코드는 사용 예시이다.     

``` c
#include <stdio.h>
#include <time.h>

int main() {
    clock_t start, end;

    start = clock();
    // 측정 할 코드는 여기에 둔다.
    end = clock();

    printf("%f\n", (double)(end - start));
    // µs(마이크로초)가 아닌 s(초) 단위로 알고 싶으면 아래와 같이 쓴다.
    // printf("%f\n", (double)(end - start) / CLOCKS_PER_SEC);

    return 0;
}
```


# C++
위 C와 쓰는 예가 똑같다. C++ 이니까 `<time.h>` 보단 `<ctime>`을 include 하는 것이 바람직 할 것이다.


# Java
`System.currentTimeMillis()`와 `System.nanoTime()`이 있으며 둘 다 long 타입을 반환한다. 아마 검색해보면 **currentTimeMillis()**를 더 많이 쓰는 것이 느껴질 것인데, 이유는 다음과 같다.     

- **System.currentTimeMillis()** 1970년 1월 1일부터 계산된 현재 시간을 리턴하는 함수이다.     

- **System.nanoTime()** JVM의 high-resolution 시간 값을 ns 단위로 리턴하는 함수이다.     

nanoTime()은 같은 서버내에서 측정한다면 큰 문제가 되지 않으나, 다른 서버에서 성능 측정을 위해 쓴다면 수 초의 오차가 생긴다. **currentTimeMillis()**는 OS에서 시간을 가져오기 때문에, 서버들의 시간 동기화를 잘 맞춰준다면 초 단위의 오차를 없앨 수 있다.     

아래 코드는 사용 예시이다.     

``` java
public class Main {
    public static void main(String[] args) {

        long start = System.currentTimeMillis();
        // 측정 할 코드는 여기에 둔다.
        long end = System.currentTimeMillis();

        System.out.println(end - start);
        // ms(밀리초)가 아닌 s(초) 단위로 알고 싶으면 아래와 같이 쓴다.
        // System.out.println((end - start) / 1000.0);
    }
}
```


# Python
아마 찾아보면 [time](https://docs.python.org/3/library/time.html)과 [timeit](https://docs.python.org/3.7/library/timeit.html)이 나올 것이다. 아래는 공식문서에서 볼 수 있는 두 라이브러리에 붙여져 있는 제목?이다. 코드 수행 시간을 측정하고 싶을때는 timeit을 쓰는 것이 맞는 것 같다.     

> time — Time access and conversions     
> timeit — Measure execution time of small code snippets     

`timeit.default_timer()`는 s(초) 단위로 float 타입을 리턴한다.     

아래 코드는 사용 예시이다.     

``` python
import timeit


start = timeit.default_timer()
# 측정 할 코드는 여기에 둔다.
stop = timeit.default_timer()

# s(초) 단위로 나온다.
print(stop - start)
```

위 코드는 `start 시각 기록 -> 코드를 실행 -> end 시각 기록 -> (end - start)를 계산`의 흐름에 맞춰 쓴 것이고, timeit에서 제공하는 다양한 함수를 쓸 수도 있다.     

또한 timeit을 쓰지 않고 터미널에서 아래와 같이 시간을 측정 할 수도 있다.     

``` bash
$ time python test.py
python test.py  0.05s user 0.06s system 0% cpu 17.453 total
```

# JavaScript
크게 3가지 방법이 있다. Date를 이용한 측정은 브라우저 호환성 문제가 없어서 많이 쓰던 방식이다. 찾아보면 요즘은 **console.time()**을 많이 쓰는 듯 하다. **performance.now()**는 가장 높은 정확도의 timestamp를 얻을 수 있다.     

- [Date.prototype.getTime()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
- [console.time()](https://developer.mozilla.org/ko/docs/Web/API/Console/time)
- [performance.now()](https://developer.mozilla.org/ko/docs/Web/API/Performance/now)

예제 코드는 각 항목의 MDN문서 및 [크롬에서의 측정 및 계산](https://developers.google.com/web/tools/chrome-devtools/console/track-executions?hl=ko) 문서를 참고하자.     


# 참고자료
* [https://extendit.tistory.com/12](https://extendit.tistory.com/12)
* [https://www.programcreek.com/python/example/12982/timeit.default_timer](https://www.programcreek.com/python/example/12982/timeit.default_timer)'
* [http://soen.kr/lecture/ccpp/cpp1/8-3-3.htm](http://soen.kr/lecture/ccpp/cpp1/8-3-3.htm)
* [https://developers.google.com/web/tools/chrome-devtools/console/track-executions?hl=ko](https://developers.google.com/web/tools/chrome-devtools/console/track-executions?hl=ko)
* [https://blog.hyunz.net/18](https://blog.hyunz.net/18)
