---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# カスタムHooksと単体テストの共通点について

@[CTOA若手エンジニアコミュニティ勉強会 #5](https://ctoa-wakate.connpass.com/event/318007/)

---

## src: "../reuse/me.md"

---

### Hooks（カスタムHooks）とは

- 組み込みのHooks(`useState`/`useEffect`など)を組み合わせて作る関数
- ルールは組み込みHooksと一緒
  - `use***`という命名規則を持つ
  - コンポーネントもしくはHooksのトップレベルでのみ実行できる

サードパーティで有名なHooks

- [useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)(Tanstack Query)
- [useRouter](https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next/router)(next/router)
- [useAtom](https://jotai.org/docs/core/use-atom)(jotai)

特殊な制約を持った関数ぐらいの認識でもOK

https://ja.react.dev/reference/rules/rules-of-hooks

<!--
ちょっといきなりReactの用語を出してしまって申し訳ないのでちょっと軽くHooksの説明だけさせてください。HooksというのはReactが提供しているAPIの一つです。まあいろいろとルールがあったりするのですが今回の説明では特殊な制約を持った関数ぐらいの認識でも大丈夫です。
-->

---

## layout: center

## 関数の単体テストについて簡単に確認

<!--
一回Hooksについては忘れてまずは関数の単体テストについてちょっと振り返ろうと思います。
-->

---

### 単体テストはどのように書くか

例として、引数として与えられた配列を全て足し合わせる`sum`関数を考える。

```ts
export const sum = (array: number[]): number => {
  if (array.some((v) => v === Infinity || v === -Infinity)) {
    return Infinity;
  }

  return array.reduce((a, c) => a + (Number.isNaN(c) ? c : 0), 0);
};
```

- 基本的には配列の加算
- NaNがあった場合`0`として扱う（無視する）
- `Infinity`が含まれていた場合は常に`Infinity`を返す

この関数に対してのテストを書く想定

<!--
今表示されている関数sumなんですが、これは下記のような仕様をもっているのでそれを単体テストで確認する想定で進めていきます。
-->

---

### 単体テストはどのように書くか

よくあるのは関数に引数を渡して、返り値を検査するパターン。

````md magic-move
```ts
import { describe, test, expect } from 'vitest';
import { sum } from './index.ts';

describe('引数として与えられた配列を全て足し合わせるsum関数', () => {
  describe('引数が全て有効な数値の場合', () => {
    test('配列を足し合わせた数値が返却される', () => {
      const array = [1, 2, 3, 4, 5];
      const sumResult = sum(array);

      expect(sumResult).toBe(15);
    });
  });

  describe('計算不能な数値型が含まれている場合', () => {
    test('NaNが含まれていた場合0として扱う', () => {
      /* 略 */
    });
    test('Infinityが含まれていた場合常にInfinityを返却する', () => {
      /* 略 */
    });
  });
});
```

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
````

<!--
ざっとテストを書いてみるとこんな感じになると思います。ちょっとこれはテストを構造化していますが3種類のテストケースが書けます。
-->

---

### 単体テストと純粋関数

このとき関数自体が純粋関数ではない場合テストが書きづらい。  
下記のコードは`Math.random()`は実行毎に値が変わってしまうのでテストしづらい。

```ts
export const sum = (array: number[]) => {
  if (array.some((v) => v === Infinity || v === -Infinity)) {
    return Infinity;
  }

  const sumAll = array.reduce((a, c) => a + (Number.isNaN(c) ? c : 0), 0);

  return sumAll * Math.random();
};
```

<!--
先程の例はめちゃくちゃテストが書きやすい例だったのですが、実際はそんなことは多くありません。実際のプロダクションコードでは実行単位で結果が異なる関数などがあります。Math.random();とかが分かりやすいですね。
-->

---

### 単体テストと純粋関数

このとき関数自体が純粋関数ではない場合テストが書きづらい。  
下記のコードは`Math.random()`は実行毎に値が変わってしまうのでテストしづらい。

````md magic-move
```ts
export const sum = (array: number[]) => {
  if (array.some((v) => v === Infinity || v === -Infinity)) {
    return Infinity;
  }

  const sumAll = array.reduce((a, c) => a + (Number.isNaN(c) ? c : 0), 0);

  return sumAll * Math.random();
};
```

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
````

<!--
なのでそのような場合は、副作用を外部から受け取るようにするとテストが楽になります。今回の場合はこのように（Click）乱数を外部から受け取らせます。
-->

---

### 副作用を除去してテストしやすい関数を作る

副作用は外部から渡して純粋関数にする。  
テストをするときは`randomize`に固定値を入れれば保証したいロジックを検査できる。

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

<!--
そうするとテスト時は乱数を固定して、常に同じ結果を返させることにより簡潔なテストケースをスピーディーに書くことができます。
-->

---

## layout: center

## 単体テストの考え方をHooksにも適用する

<!--
ではこの考え方をReactのHooksにも適用してみましょう。
-->

---

## 単体テストの考え方をHooksにも適用する

- テストしづらい副作用は外部から受け取る
- テストコードが簡潔になるようにI/Fを設計する

<!--
先程までの内容を要約するとこのようになります。
-->

---

## 単体テストの考え方をHooksにも適用する

```ts
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { someAtom } from '@/store/someAtom';

export const useFizzBuzz = () => {
  const { pathname } = useRouter();
  const [fizzBuzz, setFizzBuzz] = useAtom(someAtom);
  const result =
    parseInt(pathname, 10) % 15 === 0
      ? 'FizzBuzz'
      : parseInt(pathname, 10) % 5 === 0
        ? 'Fizz'
        : parseInt(pathname, 10) % 3 === 0
          ? 'Buzz'
          : parseInt(pathname, 10);

  setFizzBuzz([...fizzBuzz, result]);
  return fizzBuzz;
};
```

`pathname`を参照元にFizzBuzzをしてその履歴をstoreに格納するHooks

<!--
いきなりめちゃくちゃ量が多いコードになっちゃって申し訳ないのですが、これは要約すると動的なパスを取得してそれでFizzBuzzを実行して履歴をstoreに保存するって感じです。
-->

---

### 依存を整理する

このHooksをテストしやすいように修正してみる。

````md magic-move
```ts
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { someAtom } from '@/store/someAtom';

export const useFizzBuzz = () => {
  const { pathname } = useRouter();
  const [fizzBuzz, setFizzBuzz] = useAtom(someAtom);
  const result =
    parseInt(pathname, 10) % 15 === 0
      ? 'FizzBuzz'
      : parseInt(pathname, 10) % 5 === 0
        ? 'Fizz'
        : parseInt(pathname, 10) % 3 === 0
          ? 'Buzz'
          : parseInt(pathname, 10);

  setFizzBuzz([...fizzBuzz, result]);
  return fizzBuzz;
};
```

```ts
import { useAtom } from 'jotai';
import { someAtom } from '@/store/someAtom';

export const useFizzBuzz = (pathname: string) => {
  // pathnameは引数として取るように
  const [fizzBuzz, setFizzBuzz] = useAtom(someAtom);
  const result =
    parseInt(pathname, 10) % 15 === 0
      ? 'FizzBuzz'
      : parseInt(pathname, 10) % 5 === 0
        ? 'Fizz'
        : parseInt(pathname, 10) % 3 === 0
          ? 'Buzz'
          : parseInt(pathname, 10);

  setFizzBuzz([...fizzBuzz, result]);
  return fizzBuzz;
};
```

```ts
import { useAtom, type Atom } from 'jotai';

export const useFizzBuzz = <T>(pathname: string, atom: Atom<T>) => {
  // atomも引数として渡す
  const [fizzBuzz, setFizzBuzz] = useAtom(atom);
  const result =
    parseInt(pathname, 10) % 15 === 0
      ? 'FizzBuzz'
      : parseInt(pathname, 10) % 5 === 0
        ? 'Fizz'
        : parseInt(pathname, 10) % 3 === 0
          ? 'Buzz'
          : parseInt(pathname, 10);

  setFizzBuzz([...fizzBuzz, result]);
  return fizzBuzz;
};
```
````

<!--
実際に動かしてみないと分かりづらいんですがこれだとモックを用意したりする必要があってテストが面倒なのでちょっと書き方を変えてみます。（Click）まずはルーターですね、こいつは面倒なので外部からURLの文字列を受け取るようにしちゃいましょう（Click）次はAtomですね、アプリケーション全体で値を持ってくれるオブジェクトみたいなものなんですがこれも面倒なので外部からもらうように変えちゃいます。
-->

---

## layout: center

## 関数とHooksのテストの共通項

<!--
バーっと話してしまいましたが、Hooksの例も出しつつ単体テストの話をしてみました。改めて関数の単体テストとHooksのテストの共通点を探ってみました。
-->

---

## layout: two-cols

### Hooks

```ts
import { useAtom, type Atom } from 'jotai';

export const useFizzBuzz = <T>(pathname: string, atom: Atom<T>) => {
  const [fizzBuzz, setFizzBuzz] = useAtom(atom);
  const result =
    parseInt(pathname, 10) % 15 === 0
      ? 'FizzBuzz'
      : parseInt(pathname, 10) % 5 === 0
        ? 'Fizz'
        : parseInt(pathname, 10) % 3 === 0
          ? 'Buzz'
          : parseInt(pathname, 10);

  setFizzBuzz([...fizzBuzz, result]);
  return fizzBuzz;
};
```

::right::

### Function

```ts
export const sum = (array: number[], randomize: number) => {
  if (array.some((v) => v === Infinity || v === -Infinity)) {
    return Infinity;
  }

  const sumAll = array.reduce((a, c) => a + (Number.isNaN(c) ? c : 0), 0);

  return sumAll * randomize;
};
```

- どちらも副作用は外部から受け取る
- シグニチャーの情報が増え分かりやすい

<div style="background-color: var(--c-main); border-radius: 8px; padding: 4px 8px;">
<p style="font-size: 16px;text-wrap: balance;line-height: 1.6;text-align: center;">
モジュールが持つ<strong>責務が引数の数に現れる</strong><br>のでそれを基準にコード分割のタイミングを探る
</p>
</div>

<!--
2つは全然別のコードですが単体テストし易い関数の作り方のコツとしてはとにかくテストの障害となる副作用は外部から受け取るようにすると非常に評価しやすい関数になります。こうすることで関数が担うべき責務がはっきりしてくるというメリットもあるので、テストコードを通じたリファクタリングなどもやりやすくなるので単体テストとかを書いたことがないよって人の参考になれば幸いです。
-->

---

## まとめ

- Hooksのテストであっても考え方は単体テストと変わらない
- シグニチャーの情報量を増やして意外性のないHooksになる

シグニチャー：関数名、関数の引数の型、返り値の型などの情報のこと
