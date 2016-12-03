---
layout: post
title: python selenium alert내부 텍스트 가져오기
comments: true
tags:
- Python
- Selenium
---
&nbsp;&nbsp;&nbsp; iframe에 접근했던 것 처럼 `switch_to`를 해 주면 된다.

``` python
# alert로 접근
alert = self.browser.switch_to_alert()
# alert의 텍스트 출력
print(alert.text)
```

## **참고 자료**
* [python_selenium_way_to_detect_if_alert_box_exists](https://www.reddit.com/r/selenium/comments/2uopot/python_selenium_way_to_detect_if_alert_box_exists/)
