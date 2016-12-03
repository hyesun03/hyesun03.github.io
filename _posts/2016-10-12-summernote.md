---
layout: post
title: Django 프로젝트에 summernote 붙이기
comments: true
tags:
- Python
- Django
- Summernote
- 에디터
---
&nbsp;&nbsp;&nbsp; [KBoard](https://github.com/kboard/kboard)라는 프로젝트를 하는 중이다. Django기반의 게시판(커뮤니티)를 만드는 것인데 글 작성 할 때 쓰는 에디터를 붙이기로 했다. 뭘 써야할지 여러가지를 찾아봤는데 선택 기준은 아래와 같다.     
<pre>1. 이쁘고 편함
2. 관련 커뮤니티가 활발함
3. 커스터마이징
4. 무료</pre>

&nbsp;&nbsp;&nbsp; 위 4개의 기준에 따라서 `CKEditor`를 선택했다. **사실은 CKEditor 다 붙여놓고 보니 파일(사진)업로드를 위해 쓰는 모듈이 유료라서 summernote를 선택했다.** 사실 여태 뭐 만들면서 라이센스에 대해 제대로 생각해본적이 없었다. 팀원이 얼마전에 [오픈소스 소프트웨어 라이센스 관련 포스팅](http://guswnsxodlf.github.io/blog/develop/software-license)을 했기때문에 라이센스에 대해서 꽤 찾아보았다. 라이센스 관련글을 많이 찾아봐도 적용이 어떻게 되는지 감이 잘 안온다. [CKEditor의 라이센스](http://ckeditor.com/about/license) 페이지에 아래와 같이 안내가 되어있다.     
<pre>CKEditor is distributed under the GPL, LGPL and MPL Open Source licenses.</pre>       
<br/>

## **django-summernote 붙이기**

* `django-summernote`는 아래의 명령어로 설치 할 수 있다.

```bash
$ pip install django-summernote
```

* `settings.py`에서 `INSTALLED_APP`에 `django_summernote`를 추가 해 준다.

```python
INSTALLED_APPS = [
'django.contrib.admin',
[...],
'django_summernote',
]
```

* `urls.py`에 경로를 추가 해 준다.

```python
urlpatterns = [
    [...],
    url(r'^summernote/', include('django_summernote.urls')),
]
```

* `settings.py`에 `MEDIA_URL`을 적당히 지정 해 준다. `SUMMERNOTE_CONFIG`는 일단 비워두었다.

```python
[...]
MEDIA_URL='/media/'
SUMMERNOTE_CONFIG = {}
```

* 앱(board)을 생성하고 `board/models.py`에 아래의 모델을 추가 해 준다.    

```python
from django_summernote import models as summer_model
from django_summernote import fields as summer_fields
[...]
class SummerNote(summer_model.Attachment):
    summer_field = summer_fields.SummernoteTextField(default='')
```

* `board/forms.py`파일을 추가한다.

```python
from django_summernote import fields as summer_fields
from .models import SummerNote
[...]
class PostForm(forms.ModelForm):
     fields = summer_fields.SummernoteTextFormField(error_messages={'required':(u'데이터를 입력해주세요'),})
     class Meta:
           model = SummerNote
           fields = ('fields', )
```

* 테스트를 위한 `board/template/new_post.html`파일이다. `{% raw %}{{ form|safe }}{% endraw %}`로 summernote를 가져 올 수 있다.

```html
[...]
<form method="post" action="{% raw %}{% url 'board:post_list' board.id %}{% endraw %}">
    {% raw %}{% csrf_token %}{% endraw %}
    <input id="id_new_post_title" name="post_title_text" placeholder="Insert Title"/><br/>
    {% raw %}{{ form|safe }}{% endraw %}
    <br/>
    <button type="submit">등록</button>
</form>
[...]
```

* `board/views.py`에 form을 렌더링 해 준다.

```python
from django.shortcuts import render, redirect
from board.models import Post
from board.forms import PostForm
[...]
def new_post(request):
    form = PostForm()
    return render(request, 'new_post.html', {'form': form})
```

* `board/urls.py`에 추가 해 준다.

```python
urlpatterns = [
    url(r'^posts/new/$', views.new_post, name='new_post'),
    [...],
]
```

* `makemigrations`와 `migrate`를 한다.

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

* 결과물은 아래와 같다. summernote 붙여만 놓은  [kboard](https://github.com/hyesun03/k-board/tree/d1498d997ce2d98bc3532ea334864df0a48b99be).
![summernote 적용]({{ site.url }}/images/summernote_0.png)

* 테스트 돌릴 때 에디터가 안보이면 `StaticLiveServerTestCase`를 사용하면 된다.
