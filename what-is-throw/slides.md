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
