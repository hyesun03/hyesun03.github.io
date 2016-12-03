---
layout: post
title: Django selenium으로 iframe 내부에 접근하기
comments: true
tags:
- Python
- Django
- Selenium
---
&nbsp;&nbsp;&nbsp; selenium으로 테스트코드를 짜면서 iframe내부에 접근해야 할 경우가 생겼다.

1. `switch_to_frame`으로 iframe 내부로 접근
2. iframe 내부에서 `find_element_by_xpath`로 원하는 element에 접근
3. 원하는 것을 한 뒤
4. `switch_to.default_content()`로 iframe 밖으로 돌아옴      

&nbsp;&nbsp;&nbsp; 아래예시는 iframe 내부에 class=note-editable 이라는 div에 접근 한다. 그 뒤 'Content of Second Post'라는 문구를 해당 div에 넣고 iframe 밖으로 나오는 것이다.

```python
iframe = self.browser.find_elements_by_tag_name('iframe')[0]
        self.browser.switch_to.frame(iframe)
        contentbox = self.browser.find_element_by_xpath('//div[contains(@class, "note-editable")]')
        contentbox.send_keys('Content of Second Post')
        self.browser.switch_to.default_content()
```
