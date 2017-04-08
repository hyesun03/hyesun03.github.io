---
layout: post
title: python int형 리스트 join하기
comments: true
tags:
- Python
---

&nbsp;&nbsp;&nbsp; output 출력 할 때 리스트를 적당히 다듬어서 출력할 일이 종종 있다. 계속 까먹어서 적어둠.

``` python
num_list = [-1, 0, 1, 3, 4, 5, 9]

print(num_list)
# [-1, 0, 1, 3, 4, 5, 9]
print(" ".join(map(str, num_list)))
# -1 0 1 3 4 5 9

# print(" ".join(num_list))
# TypeError: sequence item 0: expected str instance, int found
```

[python 3.6.1 문서](https://docs.python.org/3/library/stdtypes.html#str.join)를 참고.

* *str.join(iterable)*   
Return a string which is the concatenation of the strings in the iterable iterable. A TypeError will be raised if there are any non-string values in iterable, including bytes objects. The separator between elements is the string providing this method.
