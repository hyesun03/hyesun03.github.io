---
layout: post
title: AndroidStudio gitignore 플러그인 사용
comments: true
tags:
- Git
- AndroidStudio
---
&nbsp;&nbsp;&nbsp; 글을 정말 오랜만에 쓴다. 연말 연초라고 너무 놀았다. 안드로이드 프로젝트에도 TDD를 적용할 수 있다는 것을 알고 적용해 보려고 했다. 찾아만 보고 repo생성한건 오늘이다 후..     

&nbsp;&nbsp;&nbsp; 다른 IDE와 마찬가지로 안드로이드 스튜디오도 `gitignore`를 쉽게 설정할 수 있는 플러그인이 있었다. Preference에 들어가서 좌측 `Plugins`를 클릭한다. `Command + ,`로 preference에 들어 갈 수 있다.

![prefernce-plugins]({{ site.url }}/images/androidstudio-plugins.png)

&nbsp;&nbsp;&nbsp; plugins의 하단에 `Browse repositories...`를 클릭하고 `.ignore`를 설치하면된다.

![ignore install]({{ site.url }}/images/androidstudio-ignore.png)

&nbsp;&nbsp;&nbsp; `.ignore`설치 후 안드로이드 스튜디오를 재 실행하면 된다. 플러그인이 자동으로`.gitignore`에 들어가는 리스트를 만들어 주며 맥을 쓰기 때문에 `*.DS_Store`을 추가 해 줬다. 

![create ignore file]({{ site.url }}/images/androidstudio-createignore.png)
