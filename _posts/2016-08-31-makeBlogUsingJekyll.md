---
layout: post
title: Jekyll과 Github로 블로그 만들기
comments: true
tags:
- Jekyll
- 블로그
---

### **Tumblr**

[텀블러(tumblr)](https://www.tumblr.com/)는 고등학교 다닐때 이미 가입은 했었다. 목적은 연예인 덕질용.
한때 셜록에 빠져서 [베네딕트 컴버배치](https://search.naver.com/search.naver?sm=tab_sug.top&where=nexearch&oquery=%ED%85%80%EB%B8%94%EB%9F%AC&acq=%EB%B2%A0%EB%84%A4&acr=1&qdt=0&ie=utf8&query=%EB%B2%A0%EB%84%A4%EB%94%95%ED%8A%B8+%EC%BB%B4%EB%B2%84%EB%B0%B0%EC%B9%98)가 잘생긴줄알고 덕질용으로 만든건데 주변에 텀블러 하는 사람이 없어서 계정만 남아있다.
SNS인데 같이 하는 사람이 없어서 안끌렸다.
역시 텀블러는 외국연예인 짤모으기가 좋다.(?)

### **Lektor**

[Lektor](https://www.getlektor.com/)는 찾아보니 공홈말고 글이 많이 없다.
[Lektor의 장단점](https://item4.github.io/2015-12-23/Move-to-Lektor/)에 대해서 누군가가 친절하게 적어놨다.

### **Jekyll**
[Jekyll](https://jekyllrb-ko.github.io/). 자료가 빠방하다. [github](https://github.com/)과 연동해서 사용한다.
[여기](http://elinjkim.github.io/web/2016/02/02/how-to-use-github-pages-jekyll)와 [여기](http://kaora.co.kr/jekyll/2016/01/06/jekyll-setting/)를 참고하면서 만들었다.

1. github에 가입.
2. `'내계정이름'.github.io`로 github Repository를 생성. 내 블로그의 주소가 된다.
3. clone해서 로컬에 받는다. 아직 아무것도 없어서 비어있는 상태다.
4. 맥유저라면 이미 ruby가 설치 되어있다. 없으면 설치한다.
5. `gem install jekyll`을 하고 `jekyll serve`를 하면 `http://localhost:4000`에 jekyll로 만든 블로그가 보인다.
`jekyll serve --watch`는 변경된 즉시(command + S) 적용되어서 로컬에서 확인가능하다.
6. `git add --all`, `git commit -m "원하는 메세지 입력"`, `git push`를 해서 원격 저장소에 올린다.
7. `'내계정이름'.github.io`를 주소창에 입력하면 잘 나올 것이다.
8. jekyll 테마는 [여기](http://jekyllthemes.org/)서 원하는걸로 받아 쓴다. 지금 내 블로그는 [Lanyon](https://github.com/poole/lanyon)을 사용중이다. 이 테마도 은근 거슬리는게 있어서 css수정이 약간 필요하다. 영문자 폰트는 이쁜데 한글 폰트는 좀 별로다. 일단 serif없는걸로 해놓으니 좀 나아보여서 이대로 쓰는중.
9. 기존의 내 저장소를 비우고 받은 테마를 그대로 풀어 넣는다.
10. 6번, 7번을 다시 수행. 끝!

Youtube영상을 보면 좀 더 도움이 될 것이다.  
[github로 간단한 사이트 만들기](https://www.youtube.com/watch?v=eVc3S5wk18o), [Jekyll Theme 적용하기](https://www.youtube.com/watch?v=H5h4s7b6XcU)
