---
layout: post
title: django-registration form customize
comments: true
---
&nbsp;&nbsp;&nbsp; `AbstractUser`로 상속받아서 확장하고 뭐..어떻게 하다가 잘 안되었다. github에서 `django-registration`을 사용하는 사람들의 코드를 꽤 찾아봤는데 버전별로 상이하고 버전과는 별개로 모델확장하는 방법이 다 달랐다. `kboard`프로젝트에서 별도의 `accounts`라는 이름의 앱을 만들고 `accounts`에서 작업했다. 요약을 하면 아래와 같다.

* **accounts/forms.py**     
&nbsp;&nbsp;&nbsp; Email 필드를 `unique`하게 하기 위해서 아래를 import하였음.
``` python
from registration.forms import RegistrationFormUniqueEmail
```

* **accounts/views.py**      
&nbsp;&nbsp;&nbsp; `RegistrationView`를 상속 및 오버라이딩
``` python
from registration.backends.hmac.views import RegistrationView
```

* **accounts/models.py**      
&nbsp;&nbsp;&nbsp; 각 계정을 관리하기 위해 `Account` 모델 생성
``` python
from django.db import models
class Account(models.Model):
    [...]
```

<br/>

## **Form 확장**
&nbsp;&nbsp;&nbsp; 새로 만드는 것이 아닌 기존의 것을 확장한다. [Django의 User모델 필드 ](https://docs.djangoproject.com/en/1.10/ref/contrib/auth/#fields)를 보면 내가 원하는 필드가 전부 있지 않다. 그래서 원하는 필드를 아래와 같이 추가 해 준다.

``` python
class RegistrationForm(RegistrationFormUniqueEmail):
    fullName = forms.CharField(max_length=150)
    terms = forms.BooleanField(error_messages={'required': _(u'You must agree to the terms to register')})
```

&nbsp;&nbsp;&nbsp; 기존의 User모델이 제공하는 필드를 사용하기 위해서 `__init__`을 사용한다.

``` python
[...]
def __init__(self, *args, **kwargs):
    super(RegistrationFormUniqueEmail, self).__init__(*args, **kwargs)
    if 'username' in self.fields:
        self.fields['username'].widget.attrs.update({'placeholder': _(u'Your ID'), 'autofocus': ''})
    if 'fullName' in self.fields:
        self.fields['fullName'].widget.attrs.update({'placeholder': _(u'Your name')})
    if 'email' in self.fields:
        self.fields['email'].widget.attrs.update({'placeholder': _(u'Your email')})
    if 'password1' in self.fields:
        self.fields['password1'].widget.attrs.update({'placeholder': _(u'Enter password')})
    if 'password2' in self.fields:
        self.fields['password2'].widget.attrs.update({'placeholder': _(u'Confirm password')})
```

&nbsp;&nbsp;&nbsp; 위의 `__init__`함수를 오버라이딩하고 나서 registration form의 필드는 아래와 같다. 블로그 적으면서 **fullName** 이 이질적이라는 생각이 들었다. **fullname** 이 좀 더 나을 듯..

``` plain
username, email, password1, password2, fullName, terms
```

&nbsp;&nbsp;&nbsp; 필요한 것들이 더 있으면 `save`나 `clean_password2` 등..을 오버라이딩 해 주면 된다. 생각없이 남들 코드짠거 보고 만들어서 `save`랑 `clean_password2`등을 오버라이딩 했는데 굳이 지금은 필요없는듯하다.

## **View**
&nbsp;&nbsp;&nbsp; 여기서는 `register`함수를 오버라이딩 해 준다.
``` python
from registration.backends.hmac.views import RegistrationView as BaseRegistrationView
from .forms import RegistrationForm
from .models import Account
[...]
class RegistrationView(BaseRegistrationView):
    form_class = RegistrationForm

    def register(self, form):
        new_user = BaseRegistrationView.register(self, form)
        acc = Account()
        acc.fullName = form.cleaned_data['fullName']
        acc.user = new_user
        acc.status = 'created'
        acc.save()
```

## **Model**
&nbsp;&nbsp;&nbsp; `settings.AUTH_USER_MODEL`은 기본이 User모델로 되어있다. 이를 ForeignKey로 연결 해 준다. `__str__`함수는 admin페이지에서 `Account object` 이런식으로 나오는게 싫어서 오버라이딩 해 줬다.

``` python
class Account(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
    )
    fullName = models.CharField(max_length=150)
    status = models.CharField(max_length=20)
    created_time = models.DateTimeField(auto_now_add=True)
    modified_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.fullName
```

&nbsp;&nbsp;&nbsp; admin 페이지에서 이를 적용해 주려면 `accounts/admin.py`에 딱 아래 한 줄만 넣어주면 된다.

``` python
admin.site.register(Account)
```

## **끝?**
&nbsp;&nbsp;&nbsp; 일단 DB에 잘 들어가고 form이 잘 나온다. 포스팅 하다보니까 수정하고 더 추가해야 할 것들이 눈에 보인다. Aㅏ... 조잡한 코드를 보고 싶으면 [여기](https://github.com/hyesun03/k-board/tree/462d3b2b6643cfac1ece0cbe7bf763e7527c83e3)를 참고하면 된다.
