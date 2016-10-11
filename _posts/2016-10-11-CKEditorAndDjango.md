---
layout: post
title: Django 프로젝트에 CKEditor 붙이기
comments: true
---
&nbsp;&nbsp;&nbsp; [KBoard](https://github.com/kboard/kboard)라는 프로젝트를 하는 중이다. Django기반의 게시판(커뮤니티)를 만드는 것인데 글 작성 할 때 쓰는 에디터를 붙이기로 했다. 뭘 써야할지 여러가지를 찾아봤는데 선택 기준은 아래와 같다.     
<pre>1. 이쁘고 편함
2. 관련 커뮤니티가 활발함
3. 커스터마이징
4. 무료</pre>

&nbsp;&nbsp;&nbsp; 위 4개의 기준에 따라서 `CKEditor`를 선택했다. 사실 여태 뭐 만들면서 라이센스에 대해 제대로 생각해본적이 없었다. 팀원이 얼마전에 [오픈소스 소프트웨어 라이센스 관련 포스팅](http://guswnsxodlf.github.io/blog/develop/software-license)을 했기때문에 라이센스에 대해서 꽤 찾아보았다. 라이센스 관련글을 많이 찾아봐도 적용이 어떻게 되는지 감이 잘 안온다. [CKEditor의 라이센스](http://ckeditor.com/about/license) 페이지에 아래와 같이 안내가 되어있다.     
<pre>CKEditor is distributed under the GPL, LGPL and MPL Open Source licenses.</pre>

&nbsp;&nbsp;&nbsp; KBoard 프로젝트가 현재 깃헙에 소스코드가 전부 공개되어있으므로 가져다 쓰기로 했다. `README`파일에 명시하고 소스코드 공개로 충분한건지는 잘 모르겠다. (소심..)
