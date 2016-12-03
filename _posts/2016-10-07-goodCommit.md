---
layout: post
title: 바람직한 Git 커밋 메시지를 위하여
comments: true
tags:
- Git
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

## **특정한 커밋 메시지 수정**
&nbsp;&nbsp;&nbsp; 특정한 과거 커밋 메시지를 수정 하고 싶을 때 `rebase`를 사용하면 된다. 며칠 전 커밋을 합칠 때 `rebase`를 쓰면 된다고 포스팅 한 적이 있다. 먼저 깃 로그를 보자.
<pre>$ git log --oneline
ccd25cf Add water
6993d06 I love chicken
14cf512 add test2.txt
081ece1 add test.txt
36714b6 Rebase commit: 1,2,3
38bb9e0 rebase New Commit
</pre>
&nbsp;&nbsp;&nbsp; HEAD로 부터 상위 4개의 커밋 내역을 수정하기 위해 아래의 명령어를 사용하자.
<pre>$ git rebase -i HEAD~4</pre>

&nbsp;&nbsp;&nbsp; 그러면 아래와 같은 텍스트 편집기가 열린다. 가장 최근 커밋이 `ccd25cf`이므로 커밋 로그의 역순으로 나온다는 것을 알 수 있다.
<pre>pick 081ece1 add test.txt
pick 14cf512 add test2.txt
pick 6993d06 I love chicken
pick ccd25cf Add water

# Rebase 36714b6..ccd25cf onto 36714b6 (4 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
~
~</pre>

&nbsp;&nbsp;&nbsp; 주석 처리 된 부분에서 `Commands:` 이하를 읽어보자. `pick`을 `edit`으로 바꾸면 해당 커밋 메시지를 수정한다는 뜻이다. `edit`대신 `e`만 적어도 된다. 나는 위 4개의 커밋 중에서 2개만 수정 해 보기로 했다.
<pre>pick 081ece1 add test.txt
edit 14cf512 add test2.txt
edit 6993d06 I love chicken
pick ccd25cf Add water
[...]</pre>

&nbsp;&nbsp;&nbsp; `:wq`로 편집기 저장 및 종료를 하면 아래와 같은 메시지가 나온다.
<pre>$ git rebase -i HEAD~4
Stopped at 14cf512... add test2.txt
You can amend the commit now, with

	git commit --amend

Once you are satisfied with your changes, run

	git rebase --continue
</pre>

&nbsp;&nbsp;&nbsp; 여태 했던 대로 친절한 메시지가 안내하는 대로 해보자. 위의 말은 `git commit --amend`와 `git rebase --continue`로 rebase를 진행 할 수 있다는 말이다. **rebase는 edit으로 변경한 커밋 순서대로 이루어진다.** 따라서 `14cf512`에 대한 rebase를 진행하고 continue를 한 뒤 `6993d06`에 대한 rebase가 진행된다.

&nbsp;&nbsp;&nbsp; 아래 명령어를 사용하면 `14cf512`에 대한 커밋 메시지를 수정 할 수 있는 화면이 나온다.
<pre>$ git commit --amend</pre>
&nbsp;&nbsp;&nbsp; 편집 화면은 아래와 같다.
<pre>add test2.txt

# Please enter the commit message for your changes. Lines starting
[...]</pre>

&nbsp;&nbsp;&nbsp; 'add text2.txt'를 'test for rebase: add text2.txt'로 바꿀 것이다. 물론 이것은 의미도 없고 이런식으로 커밋 메시지를 작성하면 안된다. 메시지 변경 후 저장 및 종료(:wq)를 하자. 성공했다는 메시지가 아래와 같이 나온다.
<pre>$ git commit --amend
[detached HEAD 9e7a9cc] test for rebase: add text2.txt
 Date: Fri Oct 7 20:16:12 2016 +0900
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 test2.txt</pre>

&nbsp;&nbsp;&nbsp; 이어서 rebase를 진행하자. 아래와 같이 메시지가 나온다. `6993d06`의 커밋 메시지가 나오고 amend를 할 수 있다고 한다.
<pre>$ git rebase --continue
Stopped at 6993d06... I love chicken
You can amend the commit now, with

	git commit --amend

Once you are satisfied with your changes, run

	git rebase --continue
</pre>

&nbsp;&nbsp;&nbsp; 커밋 메시지를 수정하자. 역시 커밋 메시지를 편집 할 수 있는 화면이 나오고 앞서 했던대로 수정하면 된다.
<pre>$git commit --amend</pre>

&nbsp;&nbsp;&nbsp; 마지막 커밋 메시지를 수정하고 다시 continue를 하면 아래와 같은 메시지가 나온다.
<pre>$ git rebase --continue
Successfully rebased and updated refs/heads/master.</pre>

&nbsp;&nbsp;&nbsp; 끝이 났다. 확인 차 다시 git log를 확인하자.
<pre>$ git log --oneline
2cc4411 Add water
73f0f63 test for rebase: I love chicken
9e7a9cc test for rebase: add text2.txt
081ece1 add test.txt
36714b6 Rebase commit: 1,2,3
[...]</pre>

&nbsp;&nbsp;&nbsp; `-f` 옵션을 줘서 push까지 하면 원격 저장소에도 커밋이 수정된다.
<pre>$ git push -f</pre>

&nbsp;&nbsp;&nbsp; rebase를 할 때 현재 HEAD로 부터의 커밋이 아닌 이미 merge 했거나 너무 오래전의 커밋을 수정하면 브랜치가 꼬여버릴 수 있다. 조심하자.

## **참고자료**
* [https://b.ssut.me/55](https://b.ssut.me/55)
* [http://www.haruair.com/blog/2683](http://www.haruair.com/blog/2683)
* [http://www.haruair.com/blog/2738](http://www.haruair.com/blog/2738)
* [https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EB%8B%A8%EC%9E%A5%ED%95%98%EA%B8%B0](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EB%8B%A8%EC%9E%A5%ED%95%98%EA%B8%B0)
