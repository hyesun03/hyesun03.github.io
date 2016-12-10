---
layout: post
title: Jekyll 블로그 태그 기능 붙이기
comments: true
tags:
- Jekyll
- 블로그
- Github
---
&nbsp;&nbsp;&nbsp; 포스트 글이 많아지면서 블로그를 다듬어야겠다는 생각이 들었다. 일단 생각하는것은 아래와 같다.     

1. 포스트 태그 기능
2. 검색기능
3. `Archive`쪽 출력 다듬기
4. 메인 페이지 단장

&nbsp;&nbsp;&nbsp; 썩 아주 맘에 드는 테마가 없어서 아예 자체 테마를 만들까 했는데 흠.. 일단은 `Lanyon`의 테마를 계속 쓰기로 했다. `3번` 항목은 간단하게 월별로 끊어서 출력하는걸로 끝냈다. `1번` 포스트 태그 기능은 아래의 `참고자료`에 있는 두 블로그를 참고해서 만들었다.

&nbsp;&nbsp;&nbsp; 내가 쓰는 테마의 경우에는 root에 있는 마크다운 파일들이 사이드 바의 메뉴로 간다. 내 블로그 폴더 구조는 아래와 같다.

<pre><code>hyesun03.github.io
├─── _includes
├─── _layouts
├─── _posts
├─── css
├─── images
├─── public
|       └─── css
|             ├─── lanyon.css
|             ├─── poole.css
|             └─── syntax.css
├─── archive.md
└─── [...]
</code></pre>


### **tags.md**
&nbsp;&nbsp;&nbsp; 블로그 root 폴더에 넣어준다. 이는 모든 태그들을 출력해주는 페이지다.
![태그들이 출력된 페이지]({{ site.url }}/images/tags.png)

{% raw %}
``` html
---
layout: page
permalink: /tags/
title: Tags
---

<ul class="tag-cloud">
{% for tag in site.tags %}
  <span style="font-size: {{ tag | last | size | times: 100 | divided_by: site.tags.size | plus: 70  }}%">
    <a href="#{{ tag | first | slugize }}">
      {{ tag | first }}
    </a> &nbsp;&nbsp;
  </span>
{% endfor %}
</ul>

<div id="archives">
{% for tag in site.tags %}
  <div class="archive-group">
    {% capture tag_name %}{{ tag | first }}{% endcapture %}
    <h3 id="#{{ tag_name | slugize }}">{{ tag_name }}</h3>
    <a name="{{ tag_name | slugize }}"></a>
    {% for post in site.tags[tag_name] %}
    <article class="archive-item">
      <h4><a href="{{ root_url }}{{ post.url }}">{{post.title}}</a></h4>
    </article>
    {% endfor %}
  </div>
{% endfor %}
</div>
```
{% endraw %}


### **_includes/post_tags.html**
&nbsp;&nbsp;&nbsp; 포스트의 상단에 태그들을 출력해 주는 페이지다.

{% raw %}
``` html
<img src="/images/tag-256.png" alt="Tags: " class="tag-img"/>
<div class="post-tags">
  {% if post %}
    {% assign tags = post.tags %}
  {% else %}
    {% assign tags = page.tags %}
  {% endif %}
  {% for tag in tags %}
  <a href="/tags/#{{tag|slugize}}">{{tag}}</a>{% unless forloop.last %},{% endunless %}
  {% endfor %}
</div>
<br/>

```
{% endraw %}


### **_layouts/post.html**
&nbsp;&nbsp;&nbsp; `post` 레이아웃에 태그가 나오도록 바로 위에서 만든 파일을 include 해 준다.

{% raw %}
``` html
---
layout: default
---

<div class="post">
  <h1 class="post-title">{{ page.title }}</h1>
  <span class="post-date">{{ page.date | date_to_string }}</span>
  {% include post_tags.html %}
  <br/>
  {{ content }}
</div>
[...]
```
{% endraw %}

### **public/css/lanyon.css**
&nbsp;&nbsp;&nbsp; lanyon 테마의 css가 아니라서 별도의 파일에 넣는것이 맞지만 일단 여기에 넣어뒀다.

{% raw %}
``` html
// for tag cloud and archives
.tag-cloud {
  list-style: none;
  padding: 0;
  text-align: justify;
  font-size: 16px;
  li {
    display: inline-block;
    margin: 0 12px 12px 0;
  }
}
#archives {
  padding: 5px;
}
.archive-group {
  margin: 5px;
  border-top: 1px solid #ddd;
}
.archive-item {
  margin-left: 5px;
}
.post-tags {
  float: left;
}
.tag-img {
  width: 23px;
  float: left;
  margin: 0 10px 0 0;
  padding: 5px 0 0 0;
}
```
{% endraw %}

### **사용**
&nbsp;&nbsp;&nbsp; 아래와 같이 포스트에 태그를 붙일 수 있다.

``` text
---
layout: post
title: Jekyll 블로그 태그 기능 붙이기
comments: true
tags:
- Jekyll
- 블로그
- Github
---
```

&nbsp;&nbsp;&nbsp; 여기 까지 하면 이렇게 나온다. 사이드 바에 `Tags`항목이 들어가 있고, 포스트의 상단에 태그들이 잘 나온다.
![태그 사이드 바 및 상단 출력]({{ site.url }}/images/tag_side.png)

&nbsp;&nbsp;&nbsp; 테마도 새빨갛고 링크도 새빨갛고 눈이 좀 피곤한듯하다. `2번`과 `4번` 항목까지 끝나면 css파일을 좀 다듬어야겠다.


## **참고자료**
* [https://djey9538.github.io/2016/04/11/github-jekyll-tags.2.html](https://djey9538.github.io/2016/04/11/github-jekyll-tags.2.html)
* [https://blog.meinside.pe.kr/Adding-tag-cloud-and-archives-page-to-Jekyll/](https://blog.meinside.pe.kr/Adding-tag-cloud-and-archives-page-to-Jekyll/)
