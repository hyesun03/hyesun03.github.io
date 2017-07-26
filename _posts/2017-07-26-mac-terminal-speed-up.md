---
layout: post
title: Mac 터미널 속도 향상
comments: true
tags:
- Mac
- terminal
---

15인치 맥북을 대여해서 쓰는중인데 터미널 속도가 너무 느려져서 zsh을 쓰게되었다. 이전에 쓰던 맥북은 1년을 써도 터미널 느려지는걸 못느꼈는데 왜 인지 모르겠다. 요즘은 `cd`를 사용해서 디렉토리 이동만해도 반응속도가 너무 느려서 찾아보다가 로그파일을 지우면 된다는 글을 보게 되었다.    

`ASL`(Apple System Log)을 지우면 터미널 속도가 빨라진다. 로그가 그리 많이 쌓이지도 않아서 이게 속도 저하의 원인인지는 잘 모르겠지만...여튼 지우고 나서 터미널이 빠릿빠릿해졌다.

```
sudo rm -rf /private/var/log/asl/*.asl
```


## **참고자료**
* [http://osxdaily.com/2010/05/06/speed-up-a-slow-terminal-by-clearing-log-files/](http://osxdaily.com/2010/05/06/speed-up-a-slow-terminal-by-clearing-log-files/)
* [https://superuser.com/questions/31403/how-can-i-speed-up-terminal-app-or-iterm-on-mac-osx](https://superuser.com/questions/31403/how-can-i-speed-up-terminal-app-or-iterm-on-mac-osx)
