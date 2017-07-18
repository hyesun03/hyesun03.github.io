---
layout: post
title: javascript arrow function 그리고 this
comments: true
tags:
- javascript
---

`bind()`를 써보면서 알게 된 것이있다. `function() {}` 과 `()=>{}`이 마냥 같은 줄 알았는데 아니었다. 아래코드는 a()에 this 바인딩을 해서 화면의 body 태그 영역 내를 누르면 b()가 실행된다.

``` javascript
// 예제 1
var o = {
  a() {
    document.body.addEventListener("click", function() {
      this.b();
    }.bind(this));
  },
  b() {
    console.log("called b()..");
  }
}

o.a();
```
코드 실행 결과는 아래와 같다.
![javascript this binding]({{ site.url }}/images/js-this-binding.png)  

위의 코드를 아래와 같이 하면.. `Uncaught SyntaxError: missing ) after argument list` 에러가 난다.
``` javascript
// 예제 2
var o = {
  a() {
    document.body.addEventListener("click", () => {
      this.b();
    }.bind(this));
  },
  b() {
    console.log("called b()..");
  }
}
```

bind()를 빼보니까 `예제 1`처럼 동작했다.
``` javascript
// 예제 3
var o = {
  a() {
    document.body.addEventListener("click", () => {
      this.b();
    });
  },
  b() {
    console.log("called b()..");
  }
}
```

`예제 2`와 `예제 3`의 결과는 아래와 같다.
![javascript arrow function this binding]({{ site.url }}/images/js-arrow-function-bind.png)  

알고보니 자바스크립트의 arrow function에 bind()가 포함되어있었다. 그리고 arrow function에는 bind()를 쓸 수가 없다. 아래 stackoverflow 답변의 일부다. 참고자료 링크에서 더 볼 수 있다.
> You cannot "rebind" an arrow function. It will always be called with the context in which it was defined. Just use a normal function.


## **참고자료**
* [https://stackoverflow.com/questions/33308121/can-you-bind-arrow-functions](https://stackoverflow.com/questions/33308121/can-you-bind-arrow-functions)
