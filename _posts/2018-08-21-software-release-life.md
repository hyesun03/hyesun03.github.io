---
layout: post
title: software release life cycle
comments: true
tags:
- software release life cycle
---

별 생각 없이 스프링부트 그냥 최신버전 받았는데, 버전뒤에 붙은 snapshot이 무슨 뜻인지 찾다가 release period중 하나임을 알게 되었다.
<img src="/images/release_period.png" alt="release period" style="width: 300px; margin-left: auto; margin-right: auto; "/>

### **Snapshot**
거의 매일 찍어내는 버전. 데일리 빌드버전이라고 생각하면 된다.     

### **M (Milestone)**
팀이나 프로젝트마다 정해진 주기마다 배포하는 버전. M2라고 되어있으면 프로젝트 '마일스톤 2번째것'이라는 뜻이다. 주요 기능이 구현될 때마다 릴리즈하고 개발자들에게 피드백을 받는다.     

### **RC (Release Candidate)**
milestone에서 좀 더 정리를 잘 해서 내놓는 버전. 정식 릴리즈 버전이 아니라서 안정적으로 동작하는 것을 보장하진 않는다.     

### **GA (General Availability)**
정식 릴리즈 버전. 안정적인 버전이다. 상용 프로덕트 개발할때 이거 써야한다. GA버전만 maven 중앙저장소에 올라가고 RC, M등은 안올라간다.     

snapshot과 m버전은 인터페이스가 확정되지 않았기 때문에 바뀔 수 있고, RC버전 부터는 어지간해선 바뀌지 않는다. 그리고 이 RC버전을 지나서 GA로 배포된다.       
<br>

## **현재**
현재 스프링부트는 2.0.4가 GA 최신이다. 되도록이면 GA버전을 쓰라고 했으나, 귀찮으니 2.1.0-snapshot 문서를 계속 읽을 것이다. 사실 조금 밖에 안봐서 그런가 그다지 차이가 안나는 것 같은데, 나중에 이상한 삽질로 이어지면 그건 그때가서 고민하는걸로.       

![spring boot current release]({{ site.url }}/images/springboot_current_release.png)

## **참고자료**
* [https://stackoverflow.com/questions/2107484/what-is-the-difference-between-springs-ga-rc-and-m2-releases](https://stackoverflow.com/questions/2107484/what-is-the-difference-between-springs-ga-rc-and-m2-releases)
* [https://stackoverflow.com/questions/46786486/alpha-beta-snapshot-release-nightly-milestone-release-candidaterc-whe?rq=1](https://stackoverflow.com/questions/46786486/alpha-beta-snapshot-release-nightly-milestone-release-candidaterc-whe?rq=1)
* [https://en.wikipedia.org/wiki/Software_release_life_cycle](https://en.wikipedia.org/wiki/Software_release_life_cycle)
* [https://www.youtube.com/watch?v=PicKx3lDGLk&index=2&list=PLfI752FpVCS8tDT1QEYwcXmkKDz-_6nm3](https://www.youtube.com/watch?v=PicKx3lDGLk&index=2&list=PLfI752FpVCS8tDT1QEYwcXmkKDz-_6nm3)
