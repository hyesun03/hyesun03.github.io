---
layout: post
title: iterm2 단어 이동, 삭제
comments: true
tags:
- iterm2
---

iterm2에서는 기본적으로 단어 단위의 이동 및 삭제 단축키를 지원하지 않습니다. 추가로 단축키를 넣어줘야하며 `Preference(⌘ + ,)`에서 관리를 할 수 있습니다.

## **단어 이동**
저는 탭 이동을 `⌘ + 탭 번호`로 하기 때문에 쓰지 않습니다. 단어 이동을 `⌘ + ←`, `⌘ + →`으로 쓰기 위해 먼저 이 두 항목을 없애줍니다. 본인이 편한 다른 단축키를 쓰셔도 상관없습니다.     

`Preference(⌘ + ,) > Keys`에 들어가서 빨간 네모박스 두 개를 지웁니다.
![Preference > keys, 두 항목 삭제]({{ site.url }}/images/iterm2_preference_1.png)

`Preference(⌘ + ,) > Profiles > Keys`에 들어가서 단축키를 추가합니다.
![Preference > keys, 두 항목 추가]({{ site.url }}/images/iterm2_preference_2.png)

### **왼쪽으로 단어 이동**
- Keyboard Shorcut: ⌘ + ←
- Action: Send Escape Sequence
- Esc+: b

### **오른쪽으로 단어 이동**
- Keyboard Shorcut: ⌘ + →
- Action: Send Escape Sequence
- Esc+: f


## **단어와 줄 단위 삭제**
저는 줄 삭제 `⌘ + delete`, 단어 삭제 `⌥ + delete`로 단축키 설정했습니다. 이것 역시 본인이 편한 키로 지정해 주시면 됩니다.   
`Preference(⌘ + ,) > Profiles > Keys`에 들어가서 단축키를 추가합니다.
![Preference > keys, 두 항목 추가]({{ site.url }}/images/iterm2_preference_3.png)

### **줄 삭제**
- Keyboard Shorcut: ⌘ + delete
- Action: Send Hex Code
- 0x15

### **단어 삭제**
- Keyboard Shorcut: ⌥ + delete
- Action: Send Hex Code
- 0x17


## **참고자료**
* https://coderwall.com/p/h6yfda/use-and-to-jump-forwards-backwards-words-in-iterm-2-on-os-x
* https://coderwall.com/p/ds2dha/word-line-deletion-and-navigation-shortcuts-in-iterm2