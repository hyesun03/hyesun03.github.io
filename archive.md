---
layout: page
title: Archive
---
<!-- ### 2016 8월
* 27일, [Markdown 문법](/page3)
* 28일, [reStructuredText](/page2)
* 31일, [Jekyll과 Github로 블로그 만들기](/) -->

{% for post in site.posts %}
{% capture currentyear %}{{ post.date | date: "%Y" }}{% endcapture %}
{% if currentyear != year %}
  {% unless forloop.first %}
    <ul>
  {% endunless %}
  <h1>{{ currentyear }}</h1>
    {% capture year %}{{ currentyear }}{% endcapture %}
  {% endif %}

  <li>{{ post.date | date: "%m. %d" }} — <a href="{{ post.url }}">{{ post.title }}</a></li>

{% endfor %}
