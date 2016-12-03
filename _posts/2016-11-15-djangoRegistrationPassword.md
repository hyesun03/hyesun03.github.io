---
layout: post
title: django-registration password reset, change 템플릿 customize
comments: true
tags:
- Python
- Django
- django-registration
---
&nbsp;&nbsp;&nbsp; `django-registration`을 이용한 패스워드 reset은 아래 파일만 추가해 주면 django에서 기본으로 제공해 주는 기능대로 잘 동작한다. `templates/registration/`에 아래 파일들을 추가 해 준다.

``` plain
password_reset_email.txt
```

&nbsp;&nbsp;&nbsp; 하지만 우리는 Admin 템플릿으로 적용된 것을 원하지 않는다. 그리고 reset이 아닌 change또한 원한다. **reset** 은 비밀번호가 기억이 안날 때 로그인 되지 않은 상태에서 비밀번호 변경이 가능 한 것이고, **change** 는 로그인이 된 상태에서만 비밀번호 변경이 가능하다. 템플릿을 커스터마이징 하기 위해서 아래와 같은 파일들이 필요하다. 이것 역시 `templates/registration/`에 아래 파일들을 추가 해 준다.

``` plain
password_change_done.html
password_change_form.html
password_reset_complete.html
password_reset_confirm.html
password_reset_done.html
password_reset_email.txt
password_reset_form.html
```

&nbsp;&nbsp;&nbsp; 템플릿을 추가해도 Admin 템플릿이 나온다.

![django-registration password change admin template]({{ site.url }}/images/django-registration-password-change-admin.png)

&nbsp;&nbsp;&nbsp; 앞에 로그인/로그아웃/회원가입 기능을 붙일 때 처럼 그냥 될 줄 알았는데 아니었다. 이래저래 시도해 봤는데 다 안되고 허무하게 `settings.py`의 `INSTALLED_APPS`에서 아래와 같이 순서를 바꿔주었다.

``` python
INSTALLED_APPS = [
    'accounts',
    'django.contrib.admin',
    'django.contrib.auth',
    [...]
    'pipeline',
]
```

&nbsp;&nbsp;&nbsp; 처음에는 `accounts`앱이 `django.contrib.admin`의 뒤쪽에 있었다. 앞에 있는 것(django-contrib-admin)들이 뒤에 있는 것(accounts)으로 덮어씌워지는 줄 알았는데 아니었다. template 적용이 url 찾는 방법과 똑같은 것으로 보인다. 위에서 아래로 찾는데 위쪽에 원하는 것이 매칭되면 그걸 띄워서 보여주는 것 같다. 원하는 템플릿으로 적용된 화면은 아래와 같다.

![django-registration password change customize template]({{ site.url }}/images/django-registration-password-change.png)
