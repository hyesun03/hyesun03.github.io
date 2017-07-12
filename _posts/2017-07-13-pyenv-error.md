---
layout: post
title: Pyenv virtualenv 실행시 오류
comments: true
tags:
- pyenv
- zsh
- error
---

``` text
Failed to activate virtualenv.

Perhaps pyenv-virtualenv has not been loaded into your shell properly.
Please restart current shell and try again.
```

bash에서 zsh로 갈아타고나서 `.zshrc`에 init 해주는 문구를 안넣었다. 아래를 터미널에 입력해주면 잘 된다.

```
echo 'eval "$(pyenv init -)"' >> ~/.zshrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.zshrc
```
