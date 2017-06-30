---
layout: post
title: Ionic2 페이지 이동(navigation)
comments: true
tags:
- Ionic2
---

### **1. 페이지 생성**
&nbsp;&nbsp;&nbsp; 아래의 명령어로 2개의 페이지를 생성한다. `app/pages/`에 생성된다.

``` bash
$ ionic g page pageone
$ ionic g page pagetwo
```
&nbsp;&nbsp;&nbsp; 아래와 같은 구조가 만들어진다.

<pre><code>src
├─── assets
├─── theme
├─── app
|     ├─── app.module.ts
|     ├─── app.html
|     └─── [...]
├─── pages
|      ├─── pageone
|      |       ├─── pageone.html
|      |       ├─── pageone.scss
|      |       └─── pageone.ts
|      ├─── pagetwo
|      |       ├─── pagetwo.html
|      |       ├─── pagetwo.scss
|      |       └─── pagetwo.ts
|      └─── [...]
└─── [...]
</code></pre>

<br>

### **2. 페이지 등록**
&nbsp;&nbsp;&nbsp; `app.module.ts`의 상단에 방금 생성한 두 페이지를 import 한다.   
```typescript
import { PageOne } from '../pages/pageone/pageone';
import { PageTwo } from '../pages/pagetwo/pagetwo';
```

&nbsp;&nbsp;&nbsp; import 하고 나서 `app.module.ts`의 `@NgModule`아래에도 두 페이지를 넣어준다.   
``` typescript
@NgModule({
  declarations: [
    MyApp,
    PageOne,
    PageTwo
    // 기타 등등
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageOne,
    PageTwo
    // 기타 등등
  ],
  providers: [
    // 기타 등등
  ]
})
```

<br>

### **3. 페이지 이동**
&nbsp;&nbsp;&nbsp; `pageone --> pagetwo`로 이동한다고 하자. 아래의 코드와 같이 `pageone.ts`의 상단에`pagetwo`를 import한다.   
``` typescript
import { PageTwo } from '../pagetwo/pagetwo';
```

&nbsp;&nbsp;&nbsp; 아래와 같이 push로 페이지를 이동시킬 수 있다.   
``` typescript
this.navCtrl.push(PageTwo);
```

&nbsp;&nbsp;&nbsp; pop으로 이전 페이지로 돌아 갈 수 있다.   
``` typescript
this.navCtrl.pop();
```

&nbsp;&nbsp;&nbsp; 이런식으로 함수를 만들어 쓸 수 있다.   
``` typescript
export class PageOne {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  nextPage() {
    this.navCtrl.push(PageTwo);
  }

}
```
