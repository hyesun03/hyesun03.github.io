---
layout: post
title: Ionic2 적절한 이미지 경로
comments: true
tags:
- Ionic2
---

&nbsp;&nbsp;&nbsp; ionic2에서 이미지를 불러올 때 아래와 같은 경로로 불러 올 수 있다. `assets`앞에 `/`나 `../`를 붙이지 않도록 주의하자. `ionic serve --lab`으로 웹 브라우저상에서 볼때는 이미지가 잘 보였지만 기기에서는 잘 안보였다.

``` html
<img id="next-btn" src="assets/img/next-btn.png" />
```

&nbsp;&nbsp;&nbsp; 실제로 앱이 구동 될 때 `www/assets/img/`에서 이미지(영상, 폰트 ..)를 가져온다. 하지만 이미지(영상, 폰트 ..)는 `src/assets/img/`에 넣는것이 바람직하다. [Ionic CHANGELOG.md](https://github.com/ionic-team/ionic/blob/master/CHANGELOG.md#modifying-your-existing-project)를 참고.

<br>

## **참고자료**
* [https://stackoverflow.com/questions/35987213/where-do-images-go-in-ionic-2](https://stackoverflow.com/questions/35987213/where-do-images-go-in-ionic-2)
