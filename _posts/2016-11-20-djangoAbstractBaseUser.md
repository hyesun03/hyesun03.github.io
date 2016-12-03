---
layout: post
title: Django AbstractBaseUser를 이용한 User모델 확장
comments: true
tags:
- Python
- Django
- AbstractBaseUser
- User
---
&nbsp;&nbsp;&nbsp; 더 이상은 미룰 수가 없다고 적어놓고 발표준비한다며 못적었다. 이제 한시름 놓았으니 슬슬 다시 글을 적어야겠다.    
&nbsp;&nbsp;&nbsp; **과거의 잘못 된 포스팅...** [잘못 된 방법으로 User모델 확장]({{ site.url }}2016/11/12/customizeDjangoRegistrationForm/)
을 바로잡고자 한다. 사실 이게 매우 올바른 방법인지 확신이 안서지만 앞에 했던 포스팅보다는 맞는 방법으로 한 것같다. `accounts_account` 테이블에 수퍼유저랑 일반유저가 모두 들어간다.     

&nbsp;&nbsp;&nbsp; 새로 작업한 model 파일은 [여기](https://github.com/kboard/kboard/blob/master/kboard/accounts/models.py)에서 볼 수 있다.

&nbsp;&nbsp;&nbsp; [django 1.10 auth customizing](https://docs.djangoproject.com/en/1.10/topics/auth/customizing/#a-full-example)을 보고 따라 했다. 문서를 아래까지 안내려봐서 Full Example이 있는지 몰랐다.

## **BaseUserManager 상속**

&nbsp;&nbsp;&nbsp; 일반 유저를 생성하는 `create_user`, 수퍼 유저를 생성하는 `create_superuser` 함수를 만든다. 회원가입시 입력받는 폼이 `username, password, email, name`이다. `admin 페이지` 만들때 `name`이 꼭 있어야 된대서 `fullname`에서 `name`으로 바꿨다. 메일인증기반을 사용하는데 슈퍼유저는 생성시 바로 계정을 사용할 수 있어야 한다. 따라서 `is_active`를 비롯한 관리자 관련한 필드를 `True`로 준다.

``` python
class AccountManager(BaseUserManager):
    def create_user(self, username, email, name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, name, password=None):
        user = self.create_user(
            email=email,
            username=username,
            name=name,
            password=password,
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user
```

<br/>

## **AbstractBaseUser 상속**

&nbsp;&nbsp;&nbsp; [Django 1.10 문서]((https://docs.djangoproject.com/en/1.10/topics/auth/customizing/#a-full-example))에 있는 `Full Example`에서 `MyUser`모델의 `get_full_name`, `get_short_name`, `has_perm` 등등.. 이런걸 그냥 넣은 줄 알았는데 꼭 필요한 것이었다. 처음 모델 만들었을때 몰랐는데 `admin 페이지` 만들다 보니까 위의 인자들이 없다는 에러가 나왔다. 시간관련된 필드들은 따로 모델을 빼놨다. `TimeStampedModel`이 그 따로 뺀 모델이다.      
&nbsp;&nbsp;&nbsp; `email_user`는 이메일 인증을 사용하기 때문에 넣은 것이다.


``` python
class Account(AbstractBaseUser, TimeStampedModel):
    username = models.CharField(max_length=30, default="", unique=True)
    email = models.EmailField(max_length=255, default="", unique=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    name = models.CharField(max_length=100, default="")

    objects = AccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name']

    def __str__(self):
        return "username: " + self.username

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

    def email_user(self, subject, message, from_email=None):
        send_mail(subject, message, from_email, [self.email])

    def has_module_perms(self, app_label):
        # Active superusers have all permissions.
        if self.is_active and self.is_superuser:
            return True
        return auth_models._user_has_module_perms(self, app_label)

    def has_perm(self, perm, obj=None):
        if self.is_active and self.is_superuser:
            return True

        return auth_models._user_has_perm(self, perm, obj)

    def get_short_name(self):
        return self.name
```

&nbsp;&nbsp;&nbsp; `TimeStampedModel`은 아래와 같다.

``` python
class TimeStampedModel(models.Model):
    created_time = models.DateTimeField(auto_now_add=True)
    modified_time = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
```

&nbsp;&nbsp;&nbsp; admin페이지를 수정하기 위해서 `admin.py`를 수정한다. Django 문서와 거의 비슷하므로 작업한 파일 링크만 걸어두겠다. [accounts/admin.py](https://github.com/kboard/kboard/blob/master/kboard/accounts/admin.py)
