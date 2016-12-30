---
layout: post
title: Android ResourceType Error
comments: true
tags:
- Android
- Android Studio
---

&nbsp;&nbsp;&nbsp; 아래와 같은 에러가 나왔다. 이는 아래의 참고자료 대로 해당 리소스가 존재하지 않아서 생기는 에러다.

``` text
[...]
W/ResourceType: Failure getting entry for 0x010804ca (t=7 e=1226) (error -75)
[...]
```

&nbsp;&nbsp;&nbsp; 현재 돌리는 가상머신이 `API 23(Marshmello)`인데 targetSdkVersion이 `API 25(Nougat)`이라서 그런걸로 추측했다. 시스템 이미지를 덜 받은 것일수도..? 일단 targetSdkVersion을 변경해주니 해당 에러가 사라졌다. `build.gradle (Module:app)`에서 설정했다.

![build.gradle (Module:app)]({{ site.url }}/images/android_build_gradle.png)

&nbsp;&nbsp;&nbsp; 안드로이드를 14년도 겨울에 앱하나 만들어보고 한 번도 해본적이 없었는데 정말 많은게 달라져 있었다. 가상머신이 빠릿빠릿하고, 프로젝트 내부에 테스트 코드 예시가 들어있다. 안드로이드 테스트 짜는것도 찾아봐야겠다.


## **참고자료**
* [http://csjung.tistory.com/184](http://csjung.tistory.com/184)
