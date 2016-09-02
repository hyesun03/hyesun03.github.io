---
layout: page
title: Archive
---

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
