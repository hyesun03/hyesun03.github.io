---
layout: post
title: reStructuredText
comments: true
tags:
- reStructuredText
- 미완
---
  &nbsp;&nbsp;&nbsp;[reStructuredText](http://docutils.sourceforge.net/rst.html)(이하 reST)는 읽기 쉽고 WYSIWYG마크업 언어이자 파서 시스템 입니다.
  간단한 웹 페이지를 빠르게 제작 할 때 인라인(in-line) 프로그램의 문서화(Python doctrings와 같은)에 유용하며 단순 문서 작성시에도 좋습니다.
  앱 영역의 확장성을 위해 설계 되었으며 [Docutils](http://docutils.sourceforge.net/index.html)의 요소입니다. 또한 StructuredText의 재해석과 [SeText](http://docutils.sourceforge.net/mirror/setext.html)의 가벼운 마크업 시스템입니다.

  &nbsp;&nbsp;&nbsp;최우선 목표는 Python docstrings와 기타 문서작업에서의 마크업 문법을 정의하고 실현하는 것입니다. 읽기쉽고 단순하지만 강력합니다. 성취하고자 하는 목적은 reST 문서를 유용한 정형화된 데이터 포맷으로 재가공 하는 것 입니다.

  &nbsp;&nbsp;&nbsp;[statemachine.py](http://docutils.sourceforge.net/docutils/statemachine.py)는 reST를 사용한 Python 모듈 예제입니다.

## **배우는 이유**
&nbsp;&nbsp;&nbsp;이번 9월부터 진행하는 프로젝트에서 Python 문서화 도구로 Sphinx를 사용합니다.
여태 문서화라고 한다면 프로젝트가 끝나고 난 뒤에 .hwp 혹은 .pdf로 최종보고서 만들듯이 만드는게 전부였지만 이것은 바람직하지 않은 방법이라고 멘토님께서 말씀 해 주셨습니다.

&nbsp;&nbsp;&nbsp;플젝을 떠나서 소마 사람들이랑 언젠가 몇 시간동안 '문서화'에 대해서 이야기를 한 적이 있어서 동기부여가 된 것도 있습니다.
사실 반년만 지나도 내가 만든 코드를 다시 보면 기억이 가물가물한데 남한테 설명해주는건 더 어려웠습니다.

## **직접 해보기**
별도의 유틸 설치 없이 해 보고 싶으신 분들은 [여기](http://rst.ninjs.org/)에서 하시면 됩니다.

## **Inline Markup**

![Inline Markup 표]({{ site.url }}/images/reST_InlineMarkup.png)

* [anonymous관련한 stackoverflow글](http://stackoverflow.com/questions/5464627/how-to-have-same-text-in-two-links-with-restructured-text)

`*`, `` ` ``, `|`, `_` 는 인라인 구분문자 입니다. 아직 제대로 안써봐서 레퍼런스만 보고는 무슨말인지 감이 잘 안잡힘.
추후 내용 수정 및 덧붙일 예정.

## **Escaping with Backslashes**
reST에서는 `*`, `` ` ``, `\`와 같이 특별한 의미를 가진 마크업 문자 그 자체를 얻기 위해서 backslash("\\")를 사용합니다. `\`를 얻고 싶으면 escaped backslash("\\\\")를 사용합니다.

![Escaping with Backslaches 표1]({{ site.url }}/images/reST_EscapeWithBackslashes_1.png)

Python 문자열에서도 마찬가지입니다. 실질적인 reST의 사용을 위해서 모든 backslash문자들을 escape할 필요가 있습니다.

![Escaping with Backslaches 표2]({{ site.url }}/images/reST_EscapeWithBackslashes_2.png)

번역은 쉽지 않군요.. 과거 고등학생때 수능완성 답지 해석 이상하다고 욕했었는데  
과거의 나를 반성합니다 ㅜㅜ

## **Section Structure**

## **Pharagraphs**

## **Bullet Lists**

## **Enumerated Lists**

## **Definition Lists**

## **Field Lists**

## **Option Lists**

## **Literal Blocks**

## **Line Blocks**

## **Block Quotes**

## **Doctest Blocks**

## **Table**

## **Transitions**

## **Explicit Markup**

##
