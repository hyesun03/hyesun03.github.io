---
layout: post
title: Jekyll에 Disqus와 Google Analytics 붙이기
comments: true
---
사람들이 내 블로그를 봐줘야 포스팅 하는 맛이 난다.  
그래서 댓글을 달 수 있는 disqus와 사용자 통계를 내주는 GA를 붙이기로 했다.

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

`_includes`아래에 `comments.html`라고 파일을 생성하고 disqus에서 제공해 주는 위의 코드를 붙였다.

### 4. disqus 댓글 위치

``` HTML
<div class="container content">
  {{ content }}
  {% include comments.html %}
</div>
```

Lanyon테마를 사용중이어서 `_layouts`폴더 아래의 `default.html`에 위의 코드를 넣었다. `{% include comments.html %}`로 아까 만들었던 comments.html을 불러와 준다.
