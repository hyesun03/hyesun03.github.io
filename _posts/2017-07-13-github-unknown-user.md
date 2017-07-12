---
layout: post
title: Github에서 사용자 아이콘이 회색(알 수 없는 유저)로 나오는 문제
comments: true
tags:
- github
---

원래 쓰던 기기가 아니라 대여한 기기에서 커밋을 했더니 user인식이 제대로 안되었다. 어쩐지 커밋 할 때 **username** 과 **email** 을 묻더니.. 커밋로그가 이렇게 알 수 없는 유저로 등록이 되었다. 이렇게 되면 `Insights > contributors`에 제대로 누적이 되지않는다. `Create README.md` 커밋은 로컬에서 push한 것이 아니라 github에서 리드미를 작성해서 user인식이 제대로 된 것이다.       
![github gray icon]({{ site.url }}/images/github-gray-usericon.png)

현재 쓰고있는 기기에서 터미널을 열어 아래 명령어를 쳐 본다. 아마 아무것도 안 나올 것 이다.      

```
git config user.email
```

email을 등록한다.      
```
git config user.email “your.email@example.com"
```

여기까지 하고나서 다시 commit한 뒤 push를 하자. 위 사진에서 `Fix typo at README`commit을 보면 user인식이 잘 되는 것을 확인 할 수 있다. 사용자 프로필이 오른쪽에 작게 나오는 이유는 앞에 했던 커밋들을 rebase해서 합치는 작업을 했기 때문이다.     

## **참고자료**
* [http://www.codeblocq.com/2016/10/Github-Avatar-not-showing-on-list-of-commits/](http://www.codeblocq.com/2016/10/Github-Avatar-not-showing-on-list-of-commits/)
