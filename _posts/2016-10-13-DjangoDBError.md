---
layout: post
title: Django sqlite3 table already exists 에러 해결
comments: true
tags:
- Python
- Django
- SQLite3
---
&nbsp;&nbsp;&nbsp; 작업을 끝내고 나서 makemigrations를 시도하니까 `--merge`옵션을 붙여서 진행하라고 빨간 문구가 나왔다. merge를 진행하고 나서 migrate까지 했다. 그러니까 아래의 명령어를 사용했다.
<pre>$ python manage.py makemigrations --merge
$ python manage.py migrate</pre>

&nbsp;&nbsp;&nbsp; 하지만 아래와 같은 에러가 나왔다.
<pre>sqlite3.OperationalError: table "board_summernote" already exists</pre>

## **해결**
* [Django 1.10 문서 ](https://docs.djangoproject.com/en/1.10/ref/django-admin/#cmdoption-migrate--fake-initial)에 나와 있는 대로 `--fake-initial`을 진행했다. 하지만 소용이 없었다. 꽤 오래 삽질 한 거 같았는데 4시간 밖에 삽질 안해서 다행이다. 다른 분이 이 에러를 해결 하는 방법에 대해서 글을 꽤 잘 적어 놨다. [Django Migration Conflict 해결하기](https://blog.weirdx.io/post/28647). 이거 보고 따라했다.

1. `migrations`폴더 아래에 넘버가 같은 파일이 있었다. 0004번 파일이 2개가 있었는데 이전에 생성된 0004번은 놔두고 그 이후에 있는 모든 migration 파일을 날렸다. 파일을 날린 뒤 `makemigrations`를 해 줬다.
2. 위의 포스팅 대로 `migrate`를 하면 다시 에러가 나온다.
3. DB접속해서 이미 존재하는 `board_summernote`를 drop해 주고 나서 `migrate`하면 해결된다!
<pre>$ python manage.py dbshell       # DB 쉘에 접속
> .tables                        # "board_summernote"가 있는지 확인
> drop table board_summernote;
</pre>
