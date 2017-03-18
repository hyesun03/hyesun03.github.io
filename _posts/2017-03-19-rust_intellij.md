---
layout: post
title: IntelliJ에서 Rust 사용하기
comments: true
tags:
- Rust
- IntelliJ
---

&nbsp;&nbsp;&nbsp; 괜히 [atom](https://atom.io/)에서 Rust를 쓰겠다고 하다가 잘 안되었다. racer 설치는 잘 된것 같은데 atom에서 racer를 쓸 수가 없었다. 그래서 `IntelliJ`를 쓰기로 했다. [IntelliJ Rust Quickstart](https://intellij-rust.github.io/docs/quick-start.html)를 보고 [Rust 플러그인](https://plugins.jetbrains.com/plugin/8182-rust)을 설치했다. 가장 최근에 나와있는 `2017.03.06`일자의 플러그인을 설치했다.

![IntelliJ Rust Plugin]({{ site.url }}/images/intellij_rust_plugin.png)
<br>

&nbsp;&nbsp;&nbsp; `Preferences(⌘,) > Plugins > Browse Repositories`에서 `Rust`를 검색한 뒤 `Install`버튼을 클릭한다.
![IntelliJ Rust Plugin]({{ site.url }}/images/intellij_rust_plugin_install.png)
<br>

&nbsp;&nbsp;&nbsp; 조금만 기다리면 Install이 완료되고 IntelliJ를 재 실행하면 뭔가 추천은 해 주는데 썩 생각대로 잘 되지는 않는듯..하다.
![IntelliJ Rust Plugin]({{ site.url }}/images/intellij_rust_autocomplete_01.png)

![IntelliJ Rust Plugin]({{ site.url }}/images/intellij_rust_autocomplete_02.png)
