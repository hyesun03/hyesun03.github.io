---
layout: post
title: DELETE_FAILED_INTERNAL_ERROR Error while Installing APK.
comments: true
tags:
- Android Studio
---

&nbsp;&nbsp;&nbsp; 디버깅 모드를 활성화 하고 나서 보니 연결된 기기에 앱을 설치 할 수 없다는 에러가 나왔다.   
<img src="/images/Application_Installation_Failed.png" alt="Application_Installation_Failed" style="width: 400px; margin-left: auto; margin-right: auto; "/>

&nbsp;&nbsp;&nbsp; 안드로이드 스튜디오 버전이 2점대로 올라가면서 Instant Run 이라는게 생겼는데 Instant Run이 무엇인지는 [안드로이드 공식문서](https://developer.android.com/studio/run/index.html?hl=ko#instant-run)를 참고한다. 이 Instant Run을 disable하면 기기에 앱이 정상적으로 설치된다. `Preferences(⌘,) > Build, Execution, Deployment > Instant Run`에서 disable 할 수 있다.

![Disable Instant Run]({{ site.url }}/images/disable-instant-run.png)


## **참고자료**
* [stackoverflow: DELETE_FAILED_INTERNAL_ERROR Error while Installing APK](http://stackoverflow.com/questions/38892270/delete-failed-internal-error-error-while-installing-apk)
