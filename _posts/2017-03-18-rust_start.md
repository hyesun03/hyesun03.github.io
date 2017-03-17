---
layout: post
title: Mac OS에 Rust 설치
comments: true
tags:
- Rust
---

&nbsp;&nbsp;&nbsp; `러스트 핵심노트`를 어제부터 보고 있다. Chapter1까지만 읽어본 상태. 책에서는 아래의 명령어로 rust를 설치 할 것을 권장한다.

``` bash
curl -sSL https://static.rust-lang.org/rustup.sh | sh
```
![rust install 01]({{ site.url }}/images/rust_install_01.png)
<br>

&nbsp;&nbsp;&nbsp; 실제로는 이렇게 설치해서 잘 동작해야하는데 `rustup` 명령어가 동작하지 않았다. rustc, cargo 다 되는데 rustup만 안되었다. rust를 uninstall 하고나서 아래의 명령어로 rust를 재 설치 했다. 아래 명령어는 rust 공식홈페이지에 있는 설치 명령어다. rustup은 rust의 툴체인 관리자로 python의 pyenv나 ruby의 rvm과 유사하다. 아래의 명령어를 통해 rust를 설치하면 rustup 명령어도 잘 먹힌다.

``` bash
curl https://sh.rustup.rs -sSf | sh
```
![rust install 01]({{ site.url }}/images/rust_install_02.png)
<br>

&nbsp;&nbsp;&nbsp; 위와같이 쭉쭉나오다가 마지막 부분에 나오는 `source $HOME/.cargo/env`를 통해 현재 셸에서 바로 쓸 수 있다.
![rust install 01]({{ site.url }}/images/rust_install_03.png)
<br>

&nbsp;&nbsp;&nbsp; 하지만 이번 한번만 쓸 것이 아니기 때문에 아래의 `~/.bash_profile`에 아래의 문구를 하나 넣어주자.

``` bash
export PATH="$HOME/.cargo/bin:$PATH"
```
<br>

&nbsp;&nbsp;&nbsp; `rustc --version`, `rustup --version`을 통해 잘 설치된 것을 볼 수 있다.
![rust install 01]({{ site.url }}/images/rust_install_04.png)
<br>

## **참고자료**
* [https://www.rust-lang.org/ko-KR/install.html](https://www.rust-lang.org/ko-KR/install.html)
* [https://github.com/rust-lang-nursery/rustup.rs/issues/686](https://github.com/rust-lang-nursery/rustup.rs/issues/686)
