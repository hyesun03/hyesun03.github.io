---
layout: post
title: Github과 협업 2
comments: true
tags:
- Github
---
## **.gitignore**
&nbsp;&nbsp;&nbsp;`.gitignore`는 git에 push할 때 올라가지 않는 파일들을 지정하는 것이다. [gitignore.io](https://www.gitignore.io/)에서 쉽게 만들 수 있으며 `PyCharm`의 경우에는  [.ignore](https://plugins.jetbrains.com/plugin/7495?pr=idea)라는 별도의 플러그인을 설치하면 편리하게 쓸 수 있다.    

&nbsp;&nbsp;&nbsp; 그냥 파일 추가만 한다고해서 이미 push된 파일들이 지워지지않는다. 만약 PyCharm의 `.idea` 디렉토리를 지우고 싶으면 아래와 같은 명령어를 사용하면 된다.
<pre>$ git rm -r --cached .idea
[...]
$ git commit -m "remove PyCharm .idea/"
[...]
$ git push
[...]
</pre>

## **커밋 합치기(rebase)**
&nbsp;&nbsp;&nbsp; jekyll 블로그만 해도 작은 오타 수정 할 때 마다 커밋을 한다. 이를 합쳐보자.
<pre>$ git log --oneline
cc5cbe1 3
55828ce 2
7963fd8 1
38bb9e0 rebase New Commit
5a133bf commit 03
0bc0b56 commit 02
d07bd6e commit 01
bcf5524 first commit</pre>
&nbsp;&nbsp;&nbsp; 최상위 3개(HEAD~3)의 커밋을 합칠 것이다.
<pre>$ git rebase -i HEAD~3</pre>
&nbsp;&nbsp;&nbsp; 위의 명령어를 입력하면 아래와 같이 편집 할 수 있는 화면이 나온다.
<pre>pick 7963fd8 1
pick 55828ce 2
pick cc5cbe1 3

# Rebase 38bb9e0..cc5cbe1 onto 38bb9e0 (3 commands)
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
~
~</pre>
&nbsp;&nbsp;&nbsp; `Commands`라고 적힌 부분을 읽어보자. 수정하고자 하는 commit index 앞에 있는 `pick`를 `squash`로 바꿔준다.
<pre>pick 7963fd8 1
squash 55828ce 2
squash cc5cbe1 3

# Rebase 38bb9e0..cc5cbe1 onto 38bb9e0 (3 commands)
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
~
~</pre>
&nbsp;&nbsp;&nbsp; 위와 같이 변경 한 뒤에 저장(:wq)을 하면 또 다른 텍스트 편집하는 화면이 나온다. 3개의 커밋을 합치고 새로운 커밋 메세지를 입력 하는 것이다.
<pre># This is a combination of 3 commits.
# This is the 1st commit message:
1

# This is the commit message #2:

2

# This is the commit message #3:

3

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Mon Oct 3 12:49:53 2016 +0900
#
# interactive rebase in progress; onto 38bb9e0
# Last commands done (3 commands done):
#    squash 55828ce 2
#    squash cc5cbe1 3
# No commands remaining.
# You are currently editing a commit while rebasing branch 'master' on '38bb9e0'.
#
# Changes to be committed:
#       new file:   abab
#       new file:   asdf
#       new file:   dadfs
#
~
~
~
~</pre>
&nbsp;&nbsp;&nbsp; 여기서 편집을 하지않고 이대로 저장(:wq)하면 3개의 커밋이 사라진다. 나는 아래와 같이 커밋메세지를 입력했다.
<pre>Rebase commit: 1,2,3
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Mon Oct 3 12:49:53 2016 +0900
#
# interactive rebase in progress; onto 38bb9e0
# Last commands done (3 commands done):
#    squash 55828ce 2
#    squash cc5cbe1 3
# No commands remaining.
# You are currently editing a commit while rebasing branch 'master' on '38bb9e0'.
#
# Changes to be committed:
#       new file:   abab
#       new file:   asdf
#       new file:   dadfs
#
~
~
~
~</pre>
&nbsp;&nbsp;&nbsp; git log를 다시 확인해보자.
<pre>$ git log --oneline
36714b6 Rebase commit: 1,2,3
38bb9e0 rebase New Commit
5a133bf commit 03
0bc0b56 commit 02
d07bd6e commit 01
bcf5524 first commit</pre>
&nbsp;&nbsp;&nbsp; push할 때 `-f` 옵션을 줘야한다.
<pre>$ git push -f</pre>

## **참고자료**
* [http://stackoverflow.com/questions/7927230/remove-directory-from-remote-repository-after-adding-them-to-gitignore](http://stackoverflow.com/questions/7927230/remove-directory-from-remote-repository-after-adding-them-to-gitignore)
* [https://help.github.com/articles/changing-a-remote-s-url/](https://help.github.com/articles/changing-a-remote-s-url/)
* [http://ko.gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html](http://ko.gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html)
