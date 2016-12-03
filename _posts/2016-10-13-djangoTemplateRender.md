---
layout: post
title: Django Template html 코드가 렌더링 되지 않는 문제
comments: true
tags:
- Python
- Django
---
&nbsp;&nbsp;&nbsp; 게시판에 글을 쓰고 보는데 아래와 같이 코드가 렌더링이 되지 않고 나왔다.
![django template html code display in raw]({{ site.url }}/images/djangoRender_0.png)

&nbsp;&nbsp;&nbsp; 이는 `safe`필터를 사용하면 해결된다.

```html
    <div id="id_post_content">{% raw %}{{ post.content|safe }}{% endraw %}</div>
```

## **참고자료**
* [http://stackoverflow.com/questions/4848611/rendering-a-template-variable-as-html](http://stackoverflow.com/questions/4848611/rendering-a-template-variable-as-html)
