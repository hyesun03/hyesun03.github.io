---
layout: post
title: python selenium 새 탭 열고 닫기
comments: true
tags:
- Python
- Selenium
---
&nbsp;&nbsp;&nbsp; 새 탭을 열고 닫는데 이전의 탭이 닫힌다. 현재 크롬에서는 `command + W`와 같이 키 전송이 제대로 안먹힌다. 그래서 `switch_to_window`를 사용한다. 크롬에서 탭이 3개 열려있다고 하면 각 탭에 0, 1, 2번으로 번호가 붙는다.

``` python
# terms를 눌러서 새 탭 열기
terms = self.browser.find_element_by_id("terms")
terms.click()
# 새 탭으로 이동
self.browser.switch_to_window(self.browser.window_handles[1])
# 새 탭 닫기
self.browser.close()
# 원래 탭으로 이동
self.browser.switch_to_window(self.browser.window_handles[0])
```

## **참고 자료**
* [http://stackoverflow.com/questions/10629815/handle-multiple-window-in-python](http://stackoverflow.com/questions/10629815/handle-multiple-window-in-python)
