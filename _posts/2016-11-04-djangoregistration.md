---
layout: post
title: django-registration 으로 HMAC 사용하기
comments: true
tags:
- Python
- Django
- django-registration
- HMAC
---
&nbsp;&nbsp;&nbsp; `django-registration`은 **가입 즉시 계정이 활성화** 되는 방법 과 **메일로 인증을 거친 뒤 계정이 활성화** 되는 방법 2가지를 제공한다. [django-registration 문서](http://django-registration.readthedocs.io/en/2.1.1/index.html)를 참고하여 원하는 방향으로 만들 수 있다. 여기서는 메일 인증을 통한 회원 가입을 구현 해 볼 것이다.

### **설치**

``` bash
$ pip install django-registration
```

### **url 추가**

``` python
from django.conf.urls import include, url

urlpatterns = [
    # Other URL patterns ...
    url(r'^accounts/', include('registration.backends.hmac.urls')),
    # More URL patterns ...
]
```

### **template 추가**
&nbsp;&nbsp;&nbsp; model, view, form 쪽에서는 아무것도 하지 않아도 된다. 기본 폼을 제공해 주기 때문에 템플릿만 넣으면 되는데 위치를 아래와 같이 지정해 줘야한다.

```
template
└───registration
        └───activation_complete.html
        └───activation_email.txt
        └───[...]
```

&nbsp;&nbsp;&nbsp; 템플릿은 직접 만들어도 무관하지만 기본의 것을 가져다 쓰기 위해서 파일 이름은 똑같이 맞춰 줘야 할 필요가 있다. 예를 들면 `activation_complete.html`을 `my_activation_completed.html` 이런식으로 바꿔 쓰면 안된다.    
&nbsp;&nbsp;&nbsp; [공식 문서의 자주하는 질문](http://django-registration.readthedocs.io/en/2.1.1/faq.html)에서 템플릿 예시를 제공 해 주지 않는다고 하지만 github에 검색을 하면 쉽게 얻을 수 있다. [템플릿 예시 1](https://github.com/macropin/django-registration/tree/master/registration/templates/registration), [템플릿 예시 2](https://github.com/macdhuibh/django-registration-templates/tree/master/registration).        
&nbsp;&nbsp;&nbsp; 위 템플릿 예시에서 그대로 가져와 써도 되고 필요한 것만 가져와서 붙여써도 된다. 또한 에러메세지가 어떤 파일이 없다고 친절하게 안내 해 줄 것이다.

### **확인해보자**
&nbsp;&nbsp;&nbsp; 로컬에서 돌리면 `accounts`아래에서 로그인 및 회원가입등을 할 수 있다.

```
http://localhost:8000/accounts/login/
http://localhost:8000/accounts/register/
[...]
```

### **회원가입 인증 메일 보내기**
&nbsp;&nbsp;&nbsp; 인증 메일을 보내려면 `settings.py`에 아래와 같은 설정을 넣어 줘야한다. `EMAIL_HOST_USER`, `SERVER_EMAIL`, `DEFAULT_FROM_MAIL`은 인증 메일을 보낼 주체가 되는 메일이다. 그냥 넣어준다고 되는 건 아니고 **구글 메일 정책에 따라서 메일 전송을 막 못하게 막아놨다.**        
&nbsp;&nbsp;&nbsp; 오랜만에 포스팅을 해서 어떻게 해결했는지 기억은 안나지만 에러메세지를 그대로 구글에 검색하면 바로 나왔던걸로 기억한다. 코드작성을 더 할 필요는 없고 인증메일을 보내는 gmail 보안관련 문제다. [아마 이글](https://www.wpsitecare.com/gmail-smtp-settings/) 을 보면 도움이 될 것이다.     

``` python
[...]
# Registration
# https://django-registration.readthedocs.io/en/2.1.2/index.html

ACCOUNT_ACTIVATION_DAYS = 7


# Email Activation

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'chsun0303@gmail.com'
EMAIL_HOST_PASSWORD = os.environ.get('KBOARD_PASSWORD')
SERVER_EMAIL = 'chsun0303@gmail.com'
DEFAULT_FROM_MAIL = 'KBoard_Developer'


# When Login success, go to main page.

LOGIN_REDIRECT_URL = "/"
[...]
```

&nbsp;&nbsp;&nbsp; `EMAIL_HOST_PASSWORD`는 현재 테스트용으로 각자 계정을 쓰고 있는데 공개적으로 github에 비밀번호 올리기 껄끄러워서 `~/.bash_profile`에 환경변수로 넣어놓고 가져오는 방식으로 했다.

``` bash
export KBOARD_PASSWORD=my_gmail_password
```

### **인증메일**
&nbsp;&nbsp;&nbsp; registration을 하고 나면 이렇게 메일이 온다. 인증 링크를 클릭 해주면 로그인이 가능하다.
![django 인증메일]({{ site.url }}/images/django-registration.png)

&nbsp;&nbsp;&nbsp; 아래와 같이 설정을 해 놨기 때문에 로그인 성공하면 root로 페이지 이동을 한다.

``` python
LOGIN_REDIRECT_URL = "/"
```

&nbsp;&nbsp;&nbsp; 일단 여기 까지 하면 기본으로 제공되는 form으로 회원가입하고 계정생성하고 로그인 하는 것 까지 할 수 있다.

### **해결 하지 못한 것들**
* Registration form 커스터마이징       
&nbsp;&nbsp;&nbsp; `AbstractUser`로 User를 확장하는 방법이 있다. 하지만 요즘 추세가 메일형식으로 ID를 쓰기 때문에 `AbstractBaseUser`로 할 수도 있다. AbstractUser로 Form을 커스터 마이징 하는 것 까진 할 수 있는데 로그인이 안되어서 실패했다.
