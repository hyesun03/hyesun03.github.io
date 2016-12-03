---
layout: post
title: PyCharm `Unresolved reference` issue
comments: true
tags:
- Python
- PyCharm
---
&nbsp;&nbsp;&nbsp;`클린코드를 위한 테스트 주도 개발`을 볼 때 model 및 view를 import할 때 맞는 위치인데도 red light bulb를 보여줬다. 사실 실제 테스트 및 동작에서는 문제가 없어서 그냥 넘어갔는데 거슬려서 찾아보았다.

1. 프로젝트의 최상단 디렉토리를 루트 디렉토리로 만들어준다.
![root directory로 만들기]({{ site.url }}/images/pycharm_0.png)

2. `Preferences` 에서 **Add source roots to PYTHONPATH** 를 체크한다.
![Add source roots to PYTHONPATH]({{ site.url }}/images/pycharm_1.png)

3. 상단 바에서 `File` >> `Invalidate Caches/Restart`로 재시작한다.

## **참고자료**
* [http://stackoverflow.com/questions/21236824/unresolved-reference-issue-in-pycharm](http://stackoverflow.com/questions/21236824/unresolved-reference-issue-in-pycharm)
