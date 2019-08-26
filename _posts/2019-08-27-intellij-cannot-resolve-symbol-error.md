---
layout: post
title: IntelliJ cannot resolve symbol.. 에러 해결
comments: true
tags:
- IntelliJ
- error
---

# 문제
**IntelliJ IDEA**를 쓰고 있으며, 멀쩡히 잘 쓰다가 종종 잊을만하면 **Cannot resolve symbol..** 에러가 나온다. 예를 들면 아래와 같이 `import`가 제대로 안되는 것이다.     

``` java
cannot resolve symbol import org.openjdk.jmh.runner.options.Options;
```

`build.gradle` 설정을 제대로 안해줬나? 싶어서 암만 뒤져봐도 잘못된게 없어보이고, 한참 생각하다가 '아 또 그거냐..하..' 하게 되는에러다. 매번 검색하기 귀찮아서 따로 정리해두기로 했다.     

# 해결
## 1차 시도
상단 메뉴바에서 `Build > Clean Project` 하고나서 `Build > Rebuild Project`를 한다.     

## 2차 시도
1차 시도로 해결이 안되면 캐시를 비우고 재실행 하는것이다. 상단 메뉴바에서 `File > Invalidate Caches / Restart…`를 선택하고 IDE가 재실행되기를 기다리면 해결!

## 기타
과거 경험상 2차 시도로 해결이 안되었으면 IDE를 최신버전으로 업데이트를 하니까 해결이 되었다. "내가 잘못한거겠지?" 보다는 가끔 남탓을 하면서 문제 해결방법을 찾아보는게 시간을 절약하는 길일때가 있다(...)     
