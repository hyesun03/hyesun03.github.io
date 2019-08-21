---
layout: post
title: 기차 충돌(Train Wrek) vs 메서드 체이닝(Method Chaining)
comments: true
tags:
- clean code
- java
---

클린코드 6장에 기차충돌에 관한 내용이 나온다. 메서드 체이닝과 다른것임을 알긴 알겠는데, 명확하게 정리가 되지 않아서 찾아봤다.     

기차 충돌은 좋지 않은 패턴으로, 메서드 체이닝은 좋은 패턴으로 소개가 된다. 참고자료의 링크를 보면 잘 이해가 될 것이다. 참고자료 속의 예제를 좀 더 괜찮은걸로 다듬고 싶었는데 굳이 안다듬어도 이해하는덴 지장이 없는 듯..     

# 기차 충돌
기차 충돌이 좋지 않은 이유는 한 메서드가 `알 필요가 없는 객체의 메서드까지 접근`을 하기 때문이다. 객체의 내부 구조가 숨겨지지 않고, 디미터 법칙을 위반하게 된다.     
``` java
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
```

# 메서드 체이닝
메서드 체이닝은 javascript에서 많이 볼 수 있는 패턴이고, 이를 사용할 시 코드가 많이 깔끔해진다. 기차 충돌과 다른 점은 메서드 체이닝은 `체인된 함수들이 전부 본인 자신을 리턴`한다는 점이다.     

빌더 패턴이 생각나서 찾아보니, 메서드 체인 기법을 쓰는 것이 빌더 패턴이다.     

전에 메서드 체이닝 관련해서 공부할 때, 스택에 계속 쌓아둬서 메모리를 더 많이 먹는 단점이 있다고 들었던 것 같은데, 그건 나중에 찾아봐야겠다..     

# 참고자료
- [http://randomthoughtsonjavaprogramming.blogspot.com/2013/10/trainwreck-vs-method-chaining.html](http://randomthoughtsonjavaprogramming.blogspot.com/2013/10/trainwreck-vs-method-chaining.html)
