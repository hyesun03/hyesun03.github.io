---
layout: post
title: django-registration vs django-registration-redux
comments: true
tags:
- Python
- Django
- django-registration
- django-registration-redux
---
&nbsp;&nbsp;&nbsp; 회원가입 및 로그인 기능을 만드는데 이 두가지를 알게 되었다. [django-registration](http://django-registration.readthedocs.io/en/2.1.2/index.html), [django-registration-redux](https://django-registration-redux.readthedocs.io/en/latest/). 문서를 읽어보면 거의 똑같다. 실제로 사용하는 템플릿도 똑같다. 하지만 더 2개의 패키지는 서로 호환이 되지 않는 것이다.

&nbsp;&nbsp;&nbsp; 참고자료의 첫 번째 YouTube 영상을 통해서 자세하게 알게 되었다. **결론은 두 패키지는 별 차이 없으며, 문서를 보고 현재 내 개발환경에 적합한지를 따져서 가져다 쓰면 된다는 것** 이다.      
&nbsp;&nbsp;&nbsp; 영상을 요약하자면 `django-registration`이 원조고 한 동안 업데이트가 이뤄지지 않았다. 그래서 -redux라는 이름으로 새 버전의 장고에 맞게 다른 개발자가 업데이트를 하고 있었는데 원조가 다시 업데이트를 시작했다.

## **참고 자료**
* [What is the difference between Django Registration and Django Registration Redux](https://www.youtube.com/watch?v=1hForFGjvdw)
* [django-registration vs. django-registration-redux? ](https://www.reddit.com/r/djangolearning/comments/3yvqau/djangoregistration_vs_djangoregistrationredux/)
