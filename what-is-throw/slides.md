---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# 「throw」とはなにか

---
src: "../reuse/me.md"
---

---

## よくある使い方

想定していない値を受け取った場合などに例外を投げるために利用される。

```ts
/** 引数をすべて足し合わせる関数 */
export const sum = (...args: number[]) => {
  if (args.some(num => (isFinite(num)))) {
    // NaNやInfinityが引数に含まれていたら例外を投げる
    throw new Error('加算できない数値が含まれています');
  }

  // 加算できる数値であることを確認してからすべての数値を足し合わせる
  return args.reduce((acc, val) => acc + val, 0);
}
```

---

## よくある使い方

想定していない値を受け取った場合などに例外を投げるために利用される。

```ts{4-5}
/** 引数をすべて足し合わせる関数 */
export const sum = (...args: number[]) => {
  if (args.some(num => (isFinite(num)))) {
    // NaNやInfinityが引数に含まれていたら例外を投げる
    throw new Error('加算できない数値が含まれています');
  }

  // 加算できる数値であることを確認してからすべての数値を足し合わせる
  return args.reduce((acc, val) => acc + val, 0);
}
```

---

## 関数を利用する側

関数の呼び出し側では`try...catch`を使うことで例外を受け取って安全に処理ができる。

```ts
import { sum } from "./util/math";
import { userInput } from "./ui/input";

userInput.onChange((inputList: number[]) => {
  // ユーザーの入力がある度に履歴を含めた配列を受け取る
  try {
    const result = sum(inputList);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});
```

---

## 関数を利用する側

関数の呼び出し側では`try...catch`を使うことで例外を受け取って安全に処理ができる。

```ts{9-11}
import { sum } from "./util/math";
import { userInput } from "./ui/input";

userInput.onChange((inputList: number[]) => {
  // ユーザーの入力がある度に履歴を含めた配列を受け取る
  try {
    const result = sum(inputList);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});
```

---
layout: center
---

## 今回はそんな`throw`の話

---

## throwとはなにか

MDNで調べてみるとこのような説明がある。

> `throw`文は、ユーザー定義の例外を発生させます。現在の関数の実行を停止し（`throw`の後の文は実行されません）、コールスタック内の最初の`catch`ブロックに制御を移します。呼び出し元の関数に`catch`ブロックが存在しない場合は、プログラムが終了します。  

[throw - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/throw)より引用

おそらくこれを読んで分かるのはもともと例外を知っている人だと思う。

なので一度意味を整理してみる。

---

## つまりどういうことか

`throw`とは例外を発生させるための構文

### 例外とはなにか

- 関数の実行を停止する
- `catch`されるまでコールスタックをたどる
- 任意の値を`catch`節に渡す

---

## 関数の実行を停止する

基本的には`return`と同じ性質だと思えばいい

```ts
/** 引数をすべて足し合わせる関数 */
export const sum = (...args: number[]) => {
  if (args.some(num => (isFinite(num)))) {
    // NaNやInfinityが引数に含まれていたら例外を投げる
    throw new Error('加算できない数値が含まれています');
  }

  // 加算できる数値であることを確認してからすべての数値を足し合わせる
  return args.reduce((acc, val) => acc + val, 0);
}
```

この関数の中で`throw`に到達した場合はそれ以降の処理は実行されない。

つまりこの関数の場合、値を返すことはなく例外を投げる。

---

## catch されるまでコールスタックをたどる

<Tips title="コールスタック" level="3">
コールスタック ≒ 関数の呼び出し順の記録<br>
関数<code>a()</code>が関数<code>b()</code>を呼んでその中でさらに関数<code>c()</code>を呼んで…
</Tips>
