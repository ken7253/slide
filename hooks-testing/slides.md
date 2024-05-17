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

- 組み込みのHooks(`useState`/`useEffect`など)を組み合わせて作る関数
- ルールは組み込みHooksと一緒
  - `use***`という命名規則を持つ
  - コンポーネントもしくはHooksのトップレベルでのみ実行できる

サードパーティで有名なHooks

- [useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)(Tanstack Query)
- [useRouter](https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next/router)(next/router)

特殊な制約を持った関数ぐらいの認識でもOK

https://ja.react.dev/reference/rules/rules-of-hooks

---

### シグニチャーとは

- 関数名
- 引数の型
- 返り値の型

これらの情報をまとめてシグニチャーという

シグニチャーが正しく、適切な情報量を持っていれば挙動が推測できる。

---
layout: center
---

## 関数の単体テストについて簡単に確認

---

### 単体テストはどのように書くか

例として、引数として与えられた配列を全て足し合わせる`sum`関数を考える。

```ts
export const sum = (array: number[]): number => {
  if (array.some(v => v === Infinity || v === -Infinity)) {
    return Infinity;
  }

  return array.reduce(
    (a, c) => a + (Number.isNaN(c) ? c : 0), 0
  );
}
```

- 基本的には配列の加算
- NaNがあった場合`0`として扱う（無視する）
- `Infinity`が含まれていた場合は常に`Infinity`を返す

この関数に対してのテストを書く

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

### 単体テストはどのように書くか

よくあるのは関数に引数を渡して、返り値を検査するパターン。

```ts{4-6}
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

### 単体テストはどのように書くか

よくあるのは関数に引数を渡して、返り値を検査するパターン。

```ts{4,14-15}
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

### 単体テストはどのように書くか

よくあるのは関数に引数を渡して、返り値を検査するパターン。

```ts{4,14,16}
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
    (a, c) => a + (Number.isNaN(c) ? c : 0), 0
  );

  return sumAll * Math.random();
}
```

`Math.random()`は実行毎に値が変わってしまうのでテストしづらい。

---

### 副作用を除去してテストしやすい関数を作る

副作用は外部から渡して純粋関数にする。

```ts{1,10}
export const sum = (array: number[], randomize: number) => {
  if (array.some(v => v === Infinity || v === -Infinity)) {
    return Infinity;
  }

  const sumAll = array.reduce(
    (a, c) => a + (Number.isNaN(c) ? c : 0), 0
  );

  return sumAll * randomize;
}
```

テストをするときは`randomize`に固定値を入れれば保証したいロジックを検査できる。

---

## 単体テストの考え方をHooksにも適用する

Hooksのテストは`testing-library`によって提供されているのでそれを使う。  
例えばNext.jsの`pathname`でFizzBuzzをしたい時に利用するHooksを考える。

```ts
import { useRouter } from "next/router";

export const useFizzBuzz = () => {
  const { pathname } = useRouter();
  const pathNumber = parseInt(pathname, 10);

  if (pathNumber % 3 === 0 && pathNumber % 5 === 0) {
    return 'FizzBuzz';
  } else if (pathNumber % 3 === 0) {
    return 'Fizz';
  } else if (pathNumber % 5 === 0) {
    return 'Buzz';
  } else {
    return pathNumber;
  }
};
```

---

### テストしづらい依存の除去

---

### テストケースのラベルを見直して責務も見直す

---

## まとめ

