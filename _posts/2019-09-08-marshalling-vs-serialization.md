---
layout: post
title: 마샬링(Marshalling) vs 직렬화(Serialization)
comments: true
tags:
- 
---

[클린코드 14장](https://hyesun03.github.io/2019/05/09/cleancode-05/)보면서 정리하려고 파일 만들어뒀는데 이제야 쓴다. 직렬화는 많이 들어봐서 그런갑다..하는데, 마샬링이라는 단어를 저때 처음 들어봐서 좀 찾아봤었다. 찾아보면 관련 글들이 꽤 많이 나오지만 사실 잘 와닿진 않아서 내가 보려고 정리해 둠.     


# 직렬화(Serialization)
예를 들어서 Java에는 여러가지의 자료형이 있다. 그 중에서 레퍼런스를 가지고 있는 것들이 있다. 만약 이 객체 정보를 다른곳에서 그대로 쓰고 싶으면 어떻게 해야할까? 당연히 '주소'를 그대로 보내는것은 아무 의미가 없을것이다. 여기서는 `0x0033AA12`가 A객체를 의미하지만, 다른 곳으로 넘어가면 아무 의미가 없는 주소일건 자명하다.     

이 주소값을 쭉쭉 타고 넘어가서 실제로 의미하는 값을 다 끌어오고, Primitive 한 데이터로 전부 변조하는 작업(byte stream으로 바꾸는 작업)을 바로 직렬화라고 한다. 그렇기 때문에 어떠한 객체 정보를 파일로 따로 저장을 하거나, 네트워크 상에서 주고받을때 용이하게 한다.     


# 마샬링(Marshalling)
마샬링은 직렬화랑 비슷한 개념이다. 직렬화와 다른 점이라면 직렬화는 '**byte stream으로 변환**'을 하는 것이지만, 마샬링은 '**변환하는 일련의 과정**'을 뜻한다. 그러므로 마샬링이 좀 더 큰 개념이다.     

직렬화의 과정에 마샬링이 포함이 되며, 실제로 객체 전송은 아래와 같은 순서로 진행된다. 그래서 직렬화를 마샬링이라고 해도 무방하다.     

1. 직렬화된 객체를 바이트 단위로 분해한다. (marshalling)
2. 직렬화 되어 분해된 데이터를 순서에 따라 전송한다.
3. 전송 받은 데이터를 원래대로 복구한다. (unmarshalling)

직렬화와의 가장 큰 차이점은 직렬화는 **객체**가 대상이지만 마샬링은 **변환자체에 목적**이 있기 때문에, 대상과 변환할 오브젝트가 한정되지 않는다. 그렇기 때문에 서로 다른 언어간의 데이터 전송은 직렬화라고 하지 않고 마샬링이라고 한다.     

여기서 좀 더 찾다보니까 managed code와 unmanaged code라는 용어가 나오는데, 이 용어의 뜻은 [이 글](https://medium.com/@nicegirl/marshalling-vs-serialized-252caf70ba9b), [이 글](https://diehard98.tistory.com/entry/Managed-코드-Unmanaged-코드-그리고-Native-코드에-대한-이야기)을 보고 감을 잡았다.     

# 정리
정리하자면 직렬화는 객체 전송을 위해서 byte stream으로 변환하는 것이고, 마샬링은 다른 언어 혹은 다른 플랫폼에서 서로 데이터를 주고 받을 때 쓰는 용어인 것 같다.     

아래 참고자료에 걸린 포스팅들을 읽어보면서 마샬링이 직렬화와 어떻게 다른지 쫌 감을 잡을 수 있었다.     


# 참고자료
* [https://weicomes.tistory.com/63](https://weicomes.tistory.com/63)
* [https://lunaticlobelia.tistory.com/605](https://lunaticlobelia.tistory.com/605)
* [https://diehard98.tistory.com/entry/Managed-코드-Unmanaged-코드-그리고-Native-코드에-대한-이야기](https://diehard98.tistory.com/entry/Managed-코드-Unmanaged-코드-그리고-Native-코드에-대한-이야기)
* [https://medium.com/@nicegirl/marshalling-vs-serialized-252caf70ba9b](https://medium.com/@nicegirl/marshalling-vs-serialized-252caf70ba9b)








