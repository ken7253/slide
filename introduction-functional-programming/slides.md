---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---
# Introduction Functional Programming
関数型プログラミングの考え方を取り入れて予測しやすいコードを書く

---
src: "../reuse/me.md"
---

---
layout: image-left
image: https://www.seshop.com/original/images/product/25646/L.png
---

## 前日譚

[「なっとく！関数型プログラミング」](https://www.shoeisha.co.jp/book/detail/9784798179803)という本を買って読んでいました。

- 参考になる内容が多かった
- 関数型の考え方を紹介

ガチガチの関数型は難しいけど  
少し取り入れてコードの品質を上げる

---
layout: center
---

関数型プログラミングの考え方を部分的に採用し  
フロントエンドでも馴染み深いライブラリといえば？

---
layout: full
---

![React.devのスクリーンショット（トップページ）](/img/react-dot-dev.png)

<!--
  自分もReactの書き方を調べているうちに関数型プログラミングの情報にたどり着きました。
  関数型プログラミングが分かるとReactの設計思想が理解できるのでReact好きの人にもおすすめです。
-->

---

## 話すこと

- 純粋関数について
- シグニチャーを意識して関数を作る

<!--
  今日話すこととしては関数型プログラミングで重要な２つの概念の説明です。
  関数型プログラミングの考え方を部分的に取り入れて関数の設計をもっと上手にできるようにしようという趣旨です。
-->

---
layout: center
---

## 純粋関数

<!--
まずは、「純粋関数」について軽く紹介します。
-->

---

### 純粋関数とはなにか

関数の分類の一つで特に関数型プログラミングで重要な考え方

下記の条件を**全て満たした関数**のことを純粋関数と呼ぶ

- 引数のみを利用する
- 戻り値は常に一つだけ
- 既存の変数を変更しない

<!--
「純粋関数」というのは引数だけを関数内で利用して、戻り値は常に１つだけ、かつ既存の変数や状態を変更しない関数のことを指します。ちょっと判定が難しいのでReact書いている人でも認識が間違っていることも多々あります。
-->

---

### 純粋関数の条件

「引数のみを利用する」とは下記のようなこと

```ts
// 🙆‍♂ 純粋関数
const pureFunc = (x:number, y:number): number => {
  return x * y;
};

// 🙅‍♂ 純粋関数ではない
let x = 0;
let y = 0;
const notPureFunc = (): number => {
  return x * y;
};
```

グローバル変数を参照したり、時刻に依存するコードなど。

<!--
まず、「引数だけを利用する」ですが、これはそのままで引数以外の値を関数内で使用しません。引数にdocumentが無ければdocument.querySelector()も呼び出しません。
-->

---

### 純粋関数の条件

戻り値は常に１つだけ。

```ts
// 🙅‍♂ 純粋関数ではない
const notPureFunc = (a: number): number | void => {
  if (a === 0) {
    throw new Error('Error');
  } else if (a >= 100) {
    return a
  }
  // 値を返さない場合もある
}
```

状況によってエラーを発生させたり、そもそも値を返さない場合がある関数など。

<!--
「戻り値は常に１つだけ」という特徴ですが、これが若干分かりづらくて、配列やオブジェクトをは１つの値と見なされるのでそういった意味での「１つだけ」ではありません。これはどちらかというと必ず返り値を返す。という意味合いが中心で、例外を投げたり値を返さない関数は純粋関数とは認められない、という感じです。
-->

---

### 純粋関数の条件

既存の変数を変更しない

```ts
let num = 0;
// 🙆‍♂ 純粋関数
const pureFunc = (n:number): number => {
  return n + 1;
};
pureFunc(num); // num => 0
```

```ts
let num = 0;
// 🙅‍♂ 純粋関数ではない
const notPureFunc = (n:number): number => {
  return n++;
};
notPureFunc(num); // num => 1
```

`Array#push()`や`Array#reverse()`などのメソッド、`var`/`let`に対する再代入  
などを関数の内部で呼び出して、既存の値を変更している場合など

<!--
次に「既存の値を変更しない」ですが、これはそのままで与えられた引数の値やグローバルオブジェクト（Windowなど）を関数の内部で変更してはいけない、というルールです。とくに配列のメソッドに多く存在している破壊的メソッドや変数の再代入、インクリメントなどが該当します。これは値のコピーを作成したり、必ず値を返すことを意識的に行うことで回避できます。
-->

---

### 純粋関数だと何が嬉しいか

- テストしやすい
- 意図しない挙動を起こしづらい
- コードの挙動が予測しやすい

副作用を分離することは **「臭いものに蓋をする」** だけに見える。  
実際は、処理同士の繋がりが **型によって可視化** されてわかりやすいコードになる。

<!--
ささっと純粋関数の定義について説明しました。重要な点としてこれら３つの項目を全て守った関数だけが純粋関数であることも重要なルールの一つです。このように純粋関数とそうでない関数に関数を分けることは副作用の分離などと言われますが、これは単に臭いものに蓋をするのではなく、コードを分かりやすくしてくれます。
-->

---
layout: center
---

## シグニチャー

<!--
そのために必要なもう一つの考え方が「シグニチャー」です。
-->

---

## シグニチャーとはなにか

シグニチャー（シグネチャ）とは下記の情報をまとめた呼称

- 関数名
- 引数の型
- 返り値の型

<!--
  いきなり聞き慣れない単語が出てきましたが、定義としては非常に簡単で「関数名」「引数の型」「返り値の型」をまとめてシグニチャーと呼びます。
  シグニチャーからしっかりと情報を読み取れると内部実装を確認しなくても使いやすい関数となるのでシグニチャーに多くの情報を持たせるといいです。
-->

---

### シグニチャーの情報が少ない場合

下記のような関数があるとする。

```ts
export const foo: (a: any, b: any): any => {
  // 外部からは見えない何らかの処理
}
```

この状態で何をしている関数であるか理解できる人は少ない。

<!-- 今どきのエディタは、だいたい裏側でTypeScriptが動いて型推論がある程度効くのでここまで情報が無いことはありえないですが、シグニチャーの情報不足の極端な例として考えてください。 -->

---

### シグニチャーの情報が少ない場合

シグニチャーをより正確にしてみる

```ts
export const sum = (first: number, second: number): number | TypeError => {
  // 外部からは見えない何らかの処理
}
```

これにテストを追加してみる。

```ts
import { sum } from "./sum"

describe('与えられた引数を足し算して返却するsum関数', () => {
  test('自然数同士の足し算が正しく実行されること', () => {/* 省略 */})
  test('引数のどちらかにNaNが渡された場合TypeErrorを返却すること', () => {/* 省略 */})
  test('引数のどちらかにInfinityが渡された場合TypeErrorを返却すること', () => {/* 省略 */})
})
```

こうすることで（テストが無くても）ある程度挙動が推測できる。

<!--
  シグニチャーは「関数名」「引数の型」「返り値の型」ですので、その情報を付与してみます。これだけでも内部実装を気にせず使えそうな気がしてきましたね。
  更にテストもあればどういう状況でTypeErrorが返却されるのかも把握できて完璧です。
-->

---

### 情報の多い関数は適切に使用できる

例としてこの関数を実際に使ってみる。

```ts
import { sum } from "./sum";
import { sendError } from "./sendError";

const [x,y] = [10, 20];
const sumResult = sum(x,y); // number | TypeError

// そのままだと型が合わないので型ガードを利用する。
if (sumResult instanceof TypeError) {
  // sendError = (error: Error) => void;
  sendError(sumResult); // sendError(); はエラー情報をサーバーに送る処理として考える
} else {
  console.log(sumResult);
}
```

このようにシグニチャーから関数の使い方が理解できる。

<!--
関数のシグニチャーから十分な情報が読み取れるので実装を見なくても使い方が分かる。
-->

---

## 具体的なコードで見てみる

複数の要素の中から一番高さを持つ要素を探してコンソールに出力する処理

```ts
// 入出力の情報がないので説明のための関数名が長くなりがち
const displayHighestElementByElementList = () => {
  // 要素の取得
  const elements = document.querySelectorAll('.some-class');
  const elementList = Array.from(elements);
  // 比較とソート
  const sortedFromClientHeight = [...elementList].sort((prev, next) => {
    return next.clientHeight - prev.clientHeight;
  });
  // コンソールへの出力
  console.log(sortedFromClientHeight[0]);
};

displayHighestElementByElementList();
```

一つの関数にいろいろやらせている例  
このようなコードがあった場合、次のように変えてみる。

<!--
次はより具体的なコードを見ながらちょっとずつコードをリファクタしてみましょう。
-->

---

## 具体的なコードで見てみる

複数の要素の中から一番高さを持つ要素を探してコンソールに出力する処理

```ts
// 与えられた要素の配列から一番高さを持つ要素を返す関数
const getHighestElement = (elementList: Element[]): Element => {
  const sorted = [...elementList].sort((prev, next) => {
    return next.clientHeight - prev.clientHeight
  });

  return sorted[0];
};
// 要素の取得
const elementList = Array.from(document.querySelectorAll('.some-class'));
// コンソールへの出力
console.log(getHighestElement(elementList));
```

- 要素の取得 -> 比較関数 -> 出力 という値の流れが掴みやすい。
- 入出力の型情報があることで挙動が推測しやすい関数になる。

<!--
ここまでくると関数の役割が明確になってきます。このコードでも十分ですが個人的にはもっと関数型っぽく書きたいので変えてみます。
-->

---

## 具体的なコードで見てみる

複数の要素の中から一番高さを持つ要素を探してコンソールに出力する処理

```ts
// 与えられた要素の配列から一番高さを持つ要素を返す関数
const getHighestElement = (elementList: Element[]): Element =>
  elementList.reduce((acc, current) =>
    acc.clientHeight >= current.clientHeight ? acc : current
  );
// 要素の取得
const elementList = Array.from(document.querySelectorAll(".some-class"));
// コンソールへの出力
console.log(getHighestElement(elementList));
```

もっと関数型っぽい書き方だとこう。  
配列のメソッドをうまく使って無駄なく宣言的に記述する。

<!--
このようにArray#reduce()など配列のメソッドを的確に使うことでどんどん無駄のないコードが書けるようになってきます。関数型プログラミングでは配列操作もまた重要な要素なのですが、それについてはまた別の機会にお話しようかと思います。
-->

---

## まとめ

関数を設計するときにいくつか持つとよい視点がある。

- 純粋関数という視点を持つ
- 関数の設計を行う場合はシグニチャーに情報を持たせる
