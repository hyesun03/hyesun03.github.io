---
layout: post
title: 샤오미 미맥스 개발자 모드 활성화
comments: true
tags:
- Xiaomi Mi Max
---

&nbsp;&nbsp;&nbsp; `설정 > 휴대전화 정보 > MIUI 버전 7회 연타` 로 개발자 모드를 활성화한다. 보통 안드로이드폰에서 빌드번호를 7연타 했던걸로 기억하는데 샤오미는 이렇다.
![Xiaomi Mi Max 개발자 모드 활성화]({{ site.url }}/images/xiaomi_developer_mode.png)
<br/>

&nbsp;&nbsp;&nbsp; `설정 > (시스템 & 기기) > 추가 설정 > 개발자 옵션`에서  `USB 디버깅`및 `USB로 설치`를 허용한다.
![Xiaomi Mi Max 디버그 모드 활성화]({{ site.url }}/images/enable_debug_mode.png)
<br/>

&nbsp;&nbsp;&nbsp; `USB로 설치`를 허용하지 않으면 아래와 같이 `INSTALL_CANCELED_BY_USER`에러가 발생하고 기기에 앱 설치가 안된다.   
<img src="/images/install_canceled_by_user.png" alt="INSTALL_CANCELED_BY_USER" style="width: 400px; margin-left: auto; margin-right: auto; "/>
