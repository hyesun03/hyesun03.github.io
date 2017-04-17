---
layout: post
title: Property 'forChild' does not exist on type 'typeof IonicModule'
comments: true
tags:
- Ionic
---
&nbsp;&nbsp;&nbsp; 페이지 이동해보려고 새 페이지를 추가했는데 잘 안되었다. 분명 시키는대로 했는데.. 아래와 같이 에러가 나온다.

```
Property 'forChild' does not exist on type 'typeof IonicModule'.

       L9:  imports: [
      L10:    IonicModule.forChild(OperationRoom),
      L11:  ],
```

&nbsp;&nbsp;&nbsp; 이 에러문구를 구글에 검색하면 근 며칠간의 글들만 나온다. 아무래도 아이오닉 최근 버전에서 생긴 문제인 것 같다. 우선 내가 뭘 잘못했는지를 몰라서 [Basic Navigation or Routing: Ionic 2](https://www.youtube.com/watch?v=VC-drnHG8Gg) 영상을 봤지만 역시 뭐가 문제인지 모르겠다. [이런](https://stackoverflow.com/questions/43248635/property-forchild-does-not-exist-on-type-typeof-ionicmodule/43249252) [저런](https://docs.google.com/document/d/1vGokwMXPQItZmTHZQbTO4qwj_SQymFhRS_nJmiH0K3w/edit#) 것을 해본 결과로는 위의 에러 문구만 없어질 뿐 새 페이지의 모듈을 찾을 수 없다는 새로운 에러 문구가 나온다.

&nbsp;&nbsp;&nbsp; [ionic issue #11082](https://github.com/driftyco/ionic/issues/11082#issuecomment-292552722)의 댓글 중 그냥 `imports:`를 없애니까 잘 동작한다는 댓글이 있어서 없애봤더니 멀쩡하게 동작한다.    

```
imports: [
  IonicModule.forChild(OperationRoom),
],
```

&nbsp;&nbsp;&nbsp; 옳지 않은 해결 방법 같지만 일단 당장 페이지 넘기는 것엔 문제 없으니 이렇게 해결하기로 했다. 하하....ㅜㅜ
