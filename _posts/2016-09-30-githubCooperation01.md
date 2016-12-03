---
layout: post
title: Github과 협업 1
comments: true
tags:
- Github
---

## **Workflow**

1. 내 계정으로 원하는 저장소를 `fork`한다.
2. 로컬에 `clone`한다.
3. 원하는 브랜치(lemon 이라고 하자)를 `checkout`한 뒤 작업한다.
4. 내 fork에 lemon을 `push`한다.
5. github에 들어가서 `pull request`를 만든다.
6. pull 요청이 `merge`되고 lemon 브랜치는 `upstream(target)` 저장소에서 사라진다.

## **원본의 업데이트 내역을 가져오고 합치기**
&nbsp;&nbsp;&nbsp; clone을 하게 되면, github상에 `origin`이라고 디폴트 저장소가 생긴다. 아래의 명령어를 통해 내 remote를 확인 할 수 있다.
<pre>$ git remote -v
origin	https://github.com/hyesun03/k-board.git (fetch)
origin	https://github.com/hyesun03/k-board.git (push)</pre>
&nbsp;&nbsp;&nbsp; 내 저장소는 원본저장소의 fork된 것이다. **항상 작업 전에 원본 저장소의 업데이트된 내역을 가져와야 한다.** 원본의 업데이트 내역을 가지고 오지않은 상태에서 작업을 하면 `push`, `pull`, `merge` 등의 작업을 할 때 conflict가 발생 할 수가 있다. **conflict가 나면 귀찮아 진다.**       
&nbsp;&nbsp;&nbsp; 원본 저장소의 업데이트 내역을 내 로컬에 반영해 주기 위해서 remote 저장소를 추가해 줄 필요가 있다. 보통은 `upstream`을 사용하며 필요하면 다른 이름을 추가해도 무방하다.
<pre>$ git remote add upstream https://github.com/darjeeling/k-board.git</pre>
&nbsp;&nbsp;&nbsp; remote 목록을 보자.
<pre>$ git remote -v
origin	https://github.com/hyesun03/k-board.git (fetch)
origin	https://github.com/hyesun03/k-board.git (push)
upstream	https://github.com/darjeeling/k-board.git (fetch)
upstream	https://github.com/darjeeling/k-board.git (push)</pre>
&nbsp;&nbsp;&nbsp; fetch한 뒤 merge하자.
<pre>$ git fetch upstream
remote: Counting objects: 51, done.
[...]
$ git merge upstream/master
Updating 017b80d..36155f3
Fast-forward
 README.rst                |   3 ++-
 kboard/chromedriver       | Bin 0 -> 10912972 bytes
 kboard/db.sqlite3         | Bin 0 -> 12288 bytes
 kboard/functional_test.py |  26 ++++++++++++++++++++++++++
 4 files changed, 28 insertions(+), 1 deletion(-)
 create mode 100755 kboard/chromedriver
 create mode 100644 kboard/db.sqlite3
 create mode 100644 kboard/functional_test.py
</pre>

## **remote URL 변경**
&nbsp;&nbsp;&nbsp; upstream의 주소를 바꿀 것이다. 아래는 변경 전이다.
<pre>$ git remote -v
origin	https://github.com/hyesun03/k-board.git (fetch)
origin	https://github.com/hyesun03/k-board.git (push)
upstream	https://github.com/darjeeling/k-board.git (fetch)
upstream	https://github.com/darjeeling/k-board.git (push)</pre>
&nbsp;&nbsp;&nbsp; 아래의 명령어를 통해서 url을 변경 할 수 있다.
<pre>$ git remote set-url upstream https://github.com/kboard/kboard.git</pre>
&nbsp;&nbsp;&nbsp; 변경된 것을 확인하자.
<pre>$ git remote -v
origin	https://github.com/hyesun03/k-board.git (fetch)
origin	https://github.com/hyesun03/k-board.git (push)
upstream	https://github.com/kboard/kboard.git (fetch)
upstream	https://github.com/kboard/kboard.git (push)</pre>

## **특정 브랜치 pull 하기**
&nbsp;&nbsp;&nbsp; pull은 fetch하고 merge까지 하는 것이다.
<pre>$ git pull upstream feature/enable_ft</pre>

## **브랜치 가져오기**
&nbsp;&nbsp;&nbsp; **git pull, git fetch** 는 원격저장소의 브랜치를 가져오지 않는다. 원격저장소에 브랜치가 꽤 많을 텐데 그걸 다 가져올 필요가 없다. 작업을 하기 전에 원하는 브랜치를 `checkout`한다. `$ git branch`로 내 저장소에 있는 브랜치를 확인 가능하며 `-r` 옵션으로는 원격 저장소의 브랜치를, `-a` 옵션으로는 원격과 로컬 저장소의 모든 브랜치를 보여준다.    

&nbsp;&nbsp;&nbsp; 아래 명령어는 my-develop이라는 브랜치가 생성됨과 동시에 origin/develop으로 작업트리가 바뀌어서 로컬에서 수정된 내역이 저장된다.
<pre>$ git checkout -b my-develop origin/develop
</pre>
&nbsp;&nbsp;&nbsp; 아래 명령어는 로컬에 원격저장소와 같은 이름으로(develop으로) 브랜치가 생성되며 원격 저장소에 있던 develop으로 작업 트리가 변경된다.
<pre>$ git checkout -t origin/develop
</pre>

## **pull request 요청하기**
&nbsp;&nbsp;&nbsp; 작업을 한 뒤 commit하고 내 저장소에 push까지 했다. 이제 원본 저장소에 내가 작업 한 내역을 합쳐달라고 요청하는 것만 남았다. pull request는 터미널이 아닌 github 홈페이지에 들어가서 하는 것이다. push를 하고 나면 아래와 같이 `Compare & pull request`라는 버튼이 생긴다. 해당 버튼을 누르면 pull request를 요청 할 수 있다.
![Compare & pull request 버튼 생김]({{ site.url }}/images/git_00.png)
&nbsp;&nbsp;&nbsp; full request를 작성하자.
![open a pull request]({{ site.url }}/images/git_01.png)
&nbsp;&nbsp;&nbsp; full request 작성이 끝나면 아래와 같은 화면을 볼 수 있다.
![open a pull request]({{ site.url }}/images/git_02.png)
