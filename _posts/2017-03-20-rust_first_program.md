---
layout: post
title: Rust로 간단한 프로그램 작성해보기
comments: true
tags:
- Rust
---

## **rustc로 컴파일 하기**
&nbsp;&nbsp;&nbsp; rust로 간단한 프로그램을 작성하고 실행을 해 본다. `hello.rs`로 파일을 생성 한 뒤 아래의 코드를 작성하고 저장한다.

``` rust
fn main() {
  println!("Hello World!");
}
```

&nbsp;&nbsp;&nbsp; 네이티브 코드로 컴파일하기 위해 터미널에서 아래의 명령을 친다.

``` bash
$ rustc hello.rs
```

&nbsp;&nbsp;&nbsp; 실행가능한 프로그램인 `hello`가 만들어진다. 내가 쓰는 OS는 mac OS로 아래의 명령을 터미널에서 입력해서 해당프로그램을 실행 시킬 수 있다. 윈도우의 경우는 `hello.exe`가 만들어진다.

``` bash
$ ./hello
Hello World!
```

&nbsp;&nbsp;&nbsp; 소스파일의 이름과 다르게 실행파일을 만들고 싶다면 아래와 같이 `-o 실행 파일 이름` 옵션을 사용한다.

``` bash
$ rustc hello.rs -o first
```

&nbsp;&nbsp;&nbsp; `rustc -O` 명령은 실행 속도에 최적화된 네이티브 코드를 생성한다. 이 명령은 `rustc -C opt-level=2;`와 같으며 가장 최적화 된 코드는 `rustc -C -opt-level=3;`을 통해 생성된다.   

&nbsp;&nbsp;&nbsp; python처럼 컴파일과 실행이 한 단계로 수행되는 동적 언어들과 다르게 rust는 컴파일과 실행이 분리되어 연속적인 단계로 수행된다.
<br>

## **cargo로 작업**

&nbsp;&nbsp;&nbsp; `Cargo`는 러스트의 패키지 및 종속성 관리자 이며 npm, pip와 비슷하다.

```
* cargo new 명령으로 폴더 구조 및 일부 템플릿을 만듦
* cargo build 명령으로 빌드
* cargo run 명령으로 프로젝트 실행
* cargo test 명령으로 프로젝트의 단위테스트를 실행
* cargo update 명령으로 프로젝트가 의존하고 있는 패키지들을 내려받고 빌드 할 수 있음
```
<br>

1. 아래 명령으로 `welcomec`라는 이름의 프로젝트 생성
``` bash
$ cargo new welcomecg --bin
```
&nbsp;&nbsp;&nbsp; `--bin`은 카고에 실행 프로그램(바이너리)를 만든다는 옵션이다. 위 명령을 실행하고 나면 아래와 같은 구조가 만들어진다.
![cargo basic structure]({{ site.url }}/images/cargo_basic_structure.png)
&nbsp;&nbsp;&nbsp; `Cargo.toml`파일은 프로젝트의 설정 파일이다.

2. 아래 명령으로 프로젝트를 빌드
``` bash
$ cargo build
```
&nbsp;&nbsp;&nbsp; 빌드를 하고 나면 아래와 같은 구조가 만들어진다.
![cargo basic structure]({{ site.url }}/images/cargo_build.png)

3. 아래 명령으로 프로그램을 실행
``` bash
$ cargo run
```
&nbsp;&nbsp;&nbsp; `Cargo.lock`은 애플리케이션의 종속성을 추적하기 위해 카고에서 사용하는 파일이다. 프로젝트에 의존하는 라이브러리 및 패키지 버전을 잠그는데 사용된다.   
<br>

## **참고자료**
* [Cargo Guide](http://doc.crates.io/guide.html)
* [The Rust Programming Language](https://doc.rust-lang.org/book/getting-started.html)
