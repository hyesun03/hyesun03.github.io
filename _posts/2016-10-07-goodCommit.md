---
layout: post
title: 바람직한 Git 커밋 메시지를 위하여
comments: true
---
&nbsp;&nbsp;&nbsp; 멘토님께서 바람직한 깃 커밋 메시지 작성법에 대한 포스트를 주셨다. 그러면 어떻게하면 기존의 커밋들을 변경 할 수 있는지에 대해서 알아보자.       

## **바로 직전의 커밋 메시지 수정**
&nbsp;&nbsp;&nbsp; 아래의 명령어를 사용하면 바로 직전의 커밋 메시지를 수정 할 수 있다. 바로 직전의 커밋 내용이 'add chicken'이다. git 공부를 위해서 테스트로 만든 repo라서 커밋 내용을 아무렇게 적은 것이다.
<pre>$ git commit --amend</pre>
&nbsp;&nbsp;&nbsp; 커밋 메시지를 편집 할 수 있는 창이 나온다. 두 번째 줄이 비어있는것이 보인다. 여태 rebase하면서 두 번째 줄을 비우지 않고 내용만 적었었다. 왜 커밋 메시지를 작성 할 때 두 번째 줄을 비워야 하는지에 대한 내용은 아래의 참고자료에 걸린 링크를 읽어보면 좋다. 수정 후 저장하면 커밋 메시지 수정이 끝난다.
<pre>add chicken

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Fri Oct 7 20:16:30 2016 +0900
#
# On branch master
# Your branch is ahead of 'origin/master' by 4 commits.
#   (use "git push" to publish your local commits)
#
# Changes to be committed:
#       new file:   chicken
#</pre>

&nbsp;&nbsp;&nbsp; 수정하고자 했던 커밋이 이미 push되어있으면 아래와 같은 에러가 나온다.
<pre>$ git push
To https://github.com/hyesun03/Study.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/hyesun03/Study.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.</pre>

&nbsp;&nbsp;&nbsp; 이럴 때는 push할 때 `-f` 옵션을 주면 된다.
<pre>$ git push -f
[...]
 + e5ee1e5...ccd25cf master -> master (forced update)</pre>

## **rebase**
&nbsp;&nbsp;&nbsp; 특정한 과거 커밋 메시지를 수정 할 때 `rebase`를 쓸 수 있다. 며칠 전 커밋을 합칠 때 `rebase`를 쓰면 된다고 포스팅 한 적이 있다.



## **참고자료**
* [https://b.ssut.me/55](https://b.ssut.me/55)
* [http://www.haruair.com/blog/2683](http://www.haruair.com/blog/2683)
* [http://www.haruair.com/blog/2738](http://www.haruair.com/blog/2738)
