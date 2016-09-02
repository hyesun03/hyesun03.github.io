---
layout: post
title: Jekyll에 Disqus와 Google Analytics 붙이기
comments: true
---
사람들이 내 블로그를 봐줘야 포스팅 하는 맛이 난다.  
그래서 댓글을 달 수 있는 disqus와 사용자 통계를 내주는 GA를 붙이기로 했다.

## **Disqus**  

### 1. 가입하기
[Disqus](https://publishers.disqus.com/)에 들어가서 회원가입을 하자.  
가입시에 등록한 메일로 verify를 요구한다.

### 2. 사이트 등록하기
![Add Disqus To Site]({{ site.url }}/images/disqus_1.png)
우측 톱니바퀴를 클릭하고 'Add Disqus To Site'를 통해 사이트 등록을 한다.  

![Create A New Site]({{ site.url }}/images/disqus_2.png)
적당한 웹사이트 이름과 카테고리를 지정해 주자.

![Configure Disqus for Your Site]({{ site.url }}/images/disqus_3.png)
웹사이트 이름은 앞서 한 대로 지정해 주고, 웹사이트 URL은 disqus를 붙일 내 블로그 주소를 적는다.

![Admin->Installation->Universal Code]({{ site.url }}/images/disqus_4.png)
좌측의 Installation를 클릭하자. 내가 원하는 항목이 없으므로 맨 아래 'Universal Code'를 클릭한다.  
(Admin -> 우측의 Settings -> 좌측의 Installation)
