---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: dark
fonts:
  sans: M PLUS 2
  mono: M PLUS 1 Code
title: how to use "key" in React
---

# how to use "key" in React

Reactにおけるkeyの効果的な使い方について

---

## src: "../reuse/me.md"

---

## Reactのkeyについて

リストを`map()`とかでレンダリングするときに使う`key`について。

```tsx
const list = ['リンゴ', 'バナナ', 'ゴリラ'];

return (
  <ul>
    {list.map((v) => (
      <li key={v}>{v}</li>
    ))}
  </ul>
);
```

<!--
Reactのkeyというとリストレンダリングの場合にとりあえずLinterに怒られるからつけるという人も多いのでは？今日はこのkeyについてリストレンダリング時以外の使いどころを紹介していきます。
-->

---

## 実際に起きた出来事

```tsx
import { CheckList } from '../CheckList'; // 複数のチェックボックスを管理するコンポーネント
type Process = 'before' | 'after'; // 進行状況

export const App = () => {
  const [process, setProcess] = useState<Process>('before');

  return (
    <>
      {process === 'before' ? (
        <CheckList label="開始前チェックリスト" /> // input[type="checkbox"]が複数並んだコンポーネント
      ) : (
        <CheckList label="終了後チェックリスト" />
      )}
      <button
        onClick={
          // クリックされた場合次のチェックリストに進む
          () => setProcess((prev) => (prev === 'before' ? 'after' : 'before'))
        }
      />
    </>
  );
};
```

<!--
そもそもなんでこんな話をしようかと思ったのかというと、下記のようなコンポーネントを書いていたときに思ったように動かなかったことが原因でした。（コンポーネントの解説をする。）このコンポーネントはチェックリストAが終わって次に進んだら別のチェックリストを表示するというコンポーネントです。このコンポーネントを書いたときに思ったように動かない現象が発生しました、それは…
-->

---

## layout: center

### コンポーネントを切り替えたはずなのにチェック状態が維持されてしまう

---

### 問題があった箇所

コンポーネントを出し分ける部分の書き方に問題があった。

```tsx
{
  process === 'before' ? (
    <CheckList label="開始前チェックリスト" /> // input[type="checkbox"]が複数並んだコンポーネント
  ) : (
    <CheckList label="終了後チェックリスト" />
  );
}
```

- 自分：`CheckList`コンポーネント自体を再レンダリングしてほしい
- React：差分のある`CheckList[label]`のみを更新します

<!--
先に問題の箇所と原因をあげると、下記の部分CheckListコンポーネントを出し分けるロジックの部分に問題がありました。これはReactが考えるレンダリングロジックと自分の解釈に齟齬があったことが問題でした。自分はこの式でCheckListコンポーネント全体を再レンダリングしてほしいと思っていましたが、Reactはこの式をCheckListのラベルのみを更新するという風に解釈していました。
-->

---

### 対処方法

`key`を付けたら治った。

```tsx
{
  process === 'before' ? (
    <CheckList key="before" label="開始前チェックリスト" /> // input[type="checkbox"]が複数並んだコンポーネント
  ) : (
    <CheckList key="after" label="終了後チェックリスト" />
  );
}
```

なぜ`key`を付けてみようと思ったのか

- Reactのレンダリングにおける差分検知の仕組みを知っていたから
- 個人的には対処療法のつもりだった

<!--
当時はかなり謎の現象だなと思ったのですがReactのレンダリングプロセス的に差分検知の部分が怪しいと思いとりあえずkeyを付けてみたらすぐにこの問題は解決しました。このやり方はワークアラウンドっぽくて嫌だな～と思ってたのですが実は正しいkeyの使い方出会ったことが後で発覚します。
-->

---

## keyのもう一つの使い方

公式ドキュメントにも記載がある通り、同じようなコンポーネントを出し分ける場合にStateをリセットする用途としても利用できる。

[state の保持とリセット – React](https://ja.react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key)

<!--
公式ドキュメントにも記載がある通りkeyは同じようなコンポーネントを出し分ける場合にStateをリセットする目的で利用できます。（ドキュメントを開いてデモを動かしてみる）
-->

---

## layout: center

## Reactのレンダリングの仕組みについて

<!--
ここでもう一度Reactレンダリングの仕組みを大雑把に振り返ってみます。
-->

---

## Reactのレンダリングの仕組みについて

<div style="display: flex;justify-content: center;"><img width="750px" src="/img/react-rendering.svg" alt="Reactのレンダリングプロセスを表した図、Stateの更新や親コンポーネントの再レンダリングをきっかけにVDOMの再計算が行われ、差分が比較されて差分のみが更新されるということを表している。"></div>

<!--
Reactは基本的にStateの更新・Propsの更新・親コンポーネントのレンダリングをトリガーとして再レンダリングを行います。再レンダリングを行うとVDOMをすべて再計算して再レンダリング前のVDOMと比較を行い、差分のみをDOMに反映するというプロセスを経てUIが更新されます。
-->

---

## Reactのレンダリングの仕組みについて

<div style="display: flex;justify-content: center;"><img width="750px" src="/img/react-rendering-before.svg" alt="先程のレンダリングプロセスの画像に加えて「keyを使わないと、出し分けているのに同じコンポーネントとして解釈されてしまう」というテキストが追加されている画像"></div>

<!--
今回の場合、このVDOMの差分比較の段階で同じ構造のコンポーネントが同じものだと解釈をされStateが引き継がれてしまいました。（詳しい調査はしていないので想像）そのためkeyをつければコンポーネントの識別子が異なるため別のコンポーネントであることをReactに伝えることができ、正しくStateがリセットされています。
-->

---

## 伝えたいこと

- `key`は識別子として使える
- Reactはレンダリングの仕組みを知ることが大切

<!--
伝えたいことは２つ、keyはリストレンダリング以外にもコンポーネントの識別子としても利用できるということ。Reactはレンダリングの仕組みを知っていると大抵の問題に正しく対処できるということです。
-->
