---
layout: post
title: Django summernote를 admin에 붙이기
comments: true
tags:
- Python
- Django
- Summernote
---
&nbsp;&nbsp;&nbsp; 매우 간단하다. `admin.py`에 아래의 코드를 작성 해 주면 된다. 아래 예시는 `Post`라는 모델에 summernote를 적용하는 것이다. `SummernoteModelAdmin`을 상속 받고 나서 `pass`만 해줘도 된다. 이렇게 해 주면 `Post` 모델의 TextField가 전부 summernote로 적용된다. django-summernote의 문서가 README 밖에 없어서 좀 아쉽긴 하다.

``` python
from django_summernote.admin import SummernoteModelAdmin

from .models import Post


class PostModelAdmin(SummernoteModelAdmin):
     pass

admin.site.register(Post, PostModelAdmin)
```

&nbsp;&nbsp;&nbsp; Post 모델은 아래와 같다. `content` 필드가 summernote로 바뀌어서 나온다.

``` python
class Post(TimeStampedModel):
    [...]
    title = models.CharField(default='', max_length=100)
    content = models.TextField(default='')
    [...]
```
