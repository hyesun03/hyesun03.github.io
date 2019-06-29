---
layout: post
title: Body parameters cannot be used with form or multi-part encoding.
comments: true
tags:
- android
- kotlin
- retrofit2
---

안드로이드 쪽에서 이런 에러메세지가 나왔다.     

> java.lang.IllegalArgumentException: @Body parameters cannot be used with form or multi-part encoding.

kotlin으로 retrofit2을 사용하고 있으며 문제가 되는 부분은 아래와 같다.
``` kotlin
interface ApiService {

    // 이전 코드들 ...
    
    @FormUrlEncoded
    @Headers("Content-Type: application/json")
    @POST("accounts/signup")
    fun signupRequest(
        @Body body: Map<String, String>
    ): Call<ResponseBody>
}
```

해결방법은 저기에서 `@FormUrlEncoded`를 없애주면 된다. 스택오버플로 글을 보고나서야 해당 내용이 [retrofit 문서](http://devflow.github.io/retrofit-kr/)에 있다는것을 인지했다. 문서가 너무 짧고 불친절하다..     


# 참고자료
* [https://stackoverflow.com/questions/27317096/retrofit-body-parameters-cannot-be-used-with-form-or-multi-part-encoding](https://stackoverflow.com/questions/27317096/retrofit-body-parameters-cannot-be-used-with-form-or-multi-part-encoding)
