---
layout: post
title: Github과 협업 3
comments: true
tags:
- Github
---
## **CONFLICT 해결**
<pre>$ git fetch upstream
[...]
   39e6f5d..371478b  master     -> upstream/master
$ git merge upstream/master
Auto-merging kboard/kboard/urls.py
CONFLICT (content): Merge conflict in kboard/kboard/urls.py
Auto-merging kboard/functional_test.py
CONFLICT (content): Merge conflict in kboard/functional_test.py
Auto-merging kboard/board/views.py
CONFLICT (add/add): Merge conflict in kboard/board/views.py
Auto-merging kboard/board/templates/post_list.html
CONFLICT (add/add): Merge conflict in kboard/board/templates/post_list.html
Automatic merge failed; fix conflicts and then commit the result.</pre>

&nbsp;&nbsp;&nbsp; conflict난 파일이 4개가 있다. 먼저 `kboard/kboard/urls.py`를 보자.
![tree]({{ site.url }}/images/git_03.png)
&nbsp;&nbsp;&nbsp; conflict난 파일을 열어보면 이렇게 되어있다. HEAD와 아까 fetch받은것을 비교해서 보여준다. 꼭 최신것으로 할 필요는 없고 취사선택하면 된다.     

* `<<<<<<< HEAD`: 여기 아래로는 현재 브랜치에 있는 코드      
* `=======`: 구분선     
* `>>>>>>> upstream/master`: 합치려는 다른 브랜치의 코드(여기서는 upstream/master)      


&nbsp;&nbsp;&nbsp; `<<<<<<< HEAD`, `=======`, `>>>>>>> upstream/master`, `지울코드`를 지워주고 저장하면 된다.
<pre><<<<<<< HEAD
[...]
=======
[...]
>>>>>>> upstream/master
</pre>

&nbsp;&nbsp;&nbsp; 여기까지 하고 이대로 merge를 시도하면 안된다. 시키는대로 해보자.
<pre>$ git merge upstream/master
error: Merging is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm &lt;file&gt;'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.</pre>

&nbsp;&nbsp;&nbsp; 수정 된 파일들을 add만 하고 merge를 시도하면 아래와 같은 문제가 생긴다.
<pre>$ git merge upstream/master
fatal: You have not concluded your merge (MERGE_HEAD exists).
Please, commit your changes before you merge.</pre>

&nbsp;&nbsp;&nbsp; commit까지 해야된다고 친절하게 알려준다. 끝!
<pre>$ git commit -m "conflict resolve"
[develop c7ac4a5] conflict resolve</pre>
