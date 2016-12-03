---
layout: post
title: Jekyll에 Disqus와 Google Analytics 붙이기
comments: true
tags:
- Disqus
- Google Analytics
---
&nbsp;&nbsp;&nbsp; 사람들이 내 블로그를 봐줘야 포스팅 하는 맛이 난다. 그래서 댓글을 달 수 있는 disqus와 사용자 통계를 내주는 GA를 붙이기로 했다.
![tree]({{ site.url }}/images/disqus_0.png)
위는 이번 작업이 끝나고 난 뒤의 디렉토리다.

## **Disqus**  

### 1. 가입하기
[Disqus](https://publishers.disqus.com/)에 들어가서 회원가입을 하자. 가입시에 등록한 메일로 verify를 요구한다.  

### 2. 사이트 등록하기
![Add Disqus To Site]({{ site.url }}/images/disqus_1.png)
우측 톱니바퀴를 클릭하고 'Add Disqus To Site'를 통해 사이트 등록을 한다.  

![Create A New Site]({{ site.url }}/images/disqus_2.png)
적당한 웹사이트 이름과 카테고리를 지정해 주자.  

![Configure Disqus for Your Site]({{ site.url }}/images/disqus_3.png)
웹사이트 이름은 앞서 한 대로 지정해 주고, 웹사이트 URL은 disqus를 붙일 내 블로그 주소를 적는다.  

### 3. Installation
![Admin->Installation->Universal Code]({{ site.url }}/images/disqus_4.png)
좌측의 Installation를 클릭하자. 내가 원하는 항목이 없으므로 맨 아래 'Universal Code'를 클릭한다. (Admin -> 우측의 Settings -> 좌측의 Installation)

```javascript
<div id="disqus_thread"></div>
<script>

/**
 *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
 *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables */
/*
var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = '//hyesun03.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>                          
```

`_includes`폴더 아래에 `comments.html`라고 파일을 생성하고 disqus에서 제공해 주는 위의 코드를 붙였다.

### 4. disqus 댓글 활성화
{% raw %}
``` javascript
<div class="container content">
  {{ content }}
  {% include comments.html %}
</div>
```
{% endraw %}
`_layouts`폴더 아래의 `default.html`에 `comments.html`을 불러와 준다. 꼭 여기에 넣어야 하는건 아니고 적당히 댓글이 나왔으면 싶은곳에 include 해 준다. 여기까지 하고 보면 About, Archive 등.. 모든 글에 댓글시스템이 활성화되어있다. `comments.html` 코드의 위 아래에 `{{ "{% if page.comments " }}%}`, `{{ "{% endif " }}%}`를 붙여주자. 그렇게 하면 [YAML front matter](http://jekyllrb.com/docs/frontmatter/)에서 `comments: true`일 때만 댓글을 활성화 할 수 있다.

## **Google Analytics**  
[Google Analytics](https://www.google.co.kr/intl/ko/analytics/)에 가입하자. 구글 계정이 있으면 그냥 로그인 하면 된다.

설명할건 없고.. 그냥 흐름대로 몇가지 작성하면 된다. GA에서 아래와 같은 코드를 제공 해 준다.

``` javascript
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-83629207-1', 'auto');
  ga('send', 'pageview');

</script>
```

`_includes`폴더 아래에 `google_analytics.html`라고 파일을 생성하고 GA에서 제공해 주는 위의 코드를 붙였다.
{% raw %}
``` javascript
{% include head.html %}
{% include google_analytics.html %}
<body class="theme-base-08">
```
{% endraw %}
앞서 disqus를 붙인 것 처럼 `default.html`의 `<body>`태그 바로 위에 `googld_anaytics.html`을 불러와준다. 아직 내 블로그가 검색이 되지 않아서 딱히 뭐 나오는건 없다.
