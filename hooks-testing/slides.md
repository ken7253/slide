---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# テストを通じてHooksのシグニチャーを再考する
@[CTOA若手エンジニアコミュニティ勉強会 #5](https://ctoa-wakate.connpass.com/event/318007/)

---
src: "../reuse/me.md"
---
---

## 用語の整理

- Hooks
- シグニチャー

---

### Hooks（カスタムHooks）とは

---

### シグニチャーとは

- 関数名
- 引数の型
- 返り値の型

これらの情報をまとめてシグニチャーという

---
layout: center
---

## 関数の単体テストについて簡単に復習
---

### 単体テストはどのように書くか

よくあるのは関数に引数を渡して、返り値を検査するパターン。

```ts
import { describe, test, expect } from "vitest";
import { sum } from "./index.ts";

describe('引数として与えられた配列を全て足し合わせるsum関数', () => {
  describe('引数が全て有効な数値の場合', () => {
    test('配列を足し合わせた数値が返却される', () => {
      const array = [1, 2, 3, 4, 5];
      const sumResult = sum(array);

      expect(sumResult).toBe(15);
    })
  });

  describe('計算不能な数値型が含まれている場合', () => {
    test('NaNが含まれていた場合0として扱う', () => { /* 略 */ });
    test('Infinityが含まれていた場合常にInfinityを返却する', () => { /* 略 */  });
  });
});
```

---

### 単体テストと純粋関数

このとき関数自体が純粋関数ではない場合テストが書きづらい。

```ts
export const sum = (array: number[]) => {
  if (array.some(v => v === Infinity || v === -Infinity)) {
    return Infinity;
  }

  const sumAll = array.reduce(
    (a, c) => Number.isNaN(c) ? a + 0 : a + c, 0
  );

  return sumAll * Math.random();
}
```

---

### 副作用を除去してテストしやすい関数を作る

---

## 単体テストの考え方をHooksにも適用する

---

### テストしづらい依存の除去

---

### テストケースのラベルを見直して責務も見直す

---

## まとめ

