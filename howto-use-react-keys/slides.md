---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# how to use "key" in React
Reactにおけるkeyの効果的な使い方について

---
src: "../reuse/me.md"
---

---

## Reactのkeyについて

リストを`map()`とかでレンダリングするときに使う`key`について。

```tsx
const list = ['リンゴ', 'バナナ', 'ゴリラ'];

return (
  <ul>
    {
      list.map((v) => <li key={v}>{v}</li>)
    }
  </ul>
)
```

---

## 実際に起きた出来事

```tsx
import { CheckList } from "../CheckList"; // 複数のチェックボックスを管理するコンポーネント
type Process = "before" | "after"; // 進行状況

export const App = () => {
  const [process, setProcess] = useState<Process>('before');

  return (
    <>
      {
        process === 'before' 
          ? <CheckList label="開始前チェックリスト" /> // input[type="checkbox"]が複数並んだコンポーネント
          : <CheckList label="終了後チェックリスト" />
      }
      <button onClick={
        // クリックされた場合次のチェックリストに進む
        () => setProcess((prev) => prev === 'before' ? 'after' : 'before')
      } />
    </>
  )
}
```

---
layout: center
---

### コンポーネントを切り替えたはずなのにチェック状態が維持されてしまう

---

### 問題があった箇所

コンポーネントを出し分ける部分の書き方に問題があった。

```tsx
{
  process === 'before' 
    ? <CheckList label="開始前チェックリスト" /> // input[type="checkbox"]が複数並んだコンポーネント
    : <CheckList label="終了後チェックリスト" />
}
```

- 自分：`CheckList`コンポーネント自体を再レンダリングしてほしい
- React：差分のある`CheckList[label]`のみを更新します

---

### 対処方法

`key`を付けたら治った。

```tsx
{
  process === 'before'
    ? <CheckList key="before" label="開始前チェックリスト" /> // input[type="checkbox"]が複数並んだコンポーネント
    : <CheckList key="after" label="終了後チェックリスト" />
}
```

なぜ`key`を付けてみようと思ったのか

- Reactのレンダリングにおける差分検知の仕組みを知っていたから
- 個人的には対処療法のつもりだった

---

## keyのもう一つの使い方

公式ドキュメントにも記載がある通り、同じようなコンポーネントを出し分ける場合にStateをリセットする用途としても利用できる。

[state の保持とリセット – React](https://ja.react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key)

---

## Reactのレンダリングの仕組みについて

<div style="display: flex;justify-content: center;"><img width="750px" src="/img/react-rendering.svg" alt="Reactのレンダリングプロセスを表した図、Stateの更新や親コンポーネントの再レンダリングをきっかけにVDOMの再計算が行われ、差分が比較されて差分のみが更新されるということを表している。"></div>

---

## Reactのレンダリングの仕組みについて

<div style="display: flex;justify-content: center;"><img width="750px" src="/img/react-rendering-before.svg" alt="先程のレンダリングプロセスの画像に加えて「keyを使わないと、出し分けているのに同じコンポーネントとして解釈されてしまう」というテキストが追加されている画像"></div>

---

## 伝えたいこと

- `key`は識別子として使える
- Reactはレンダリングの仕組みを知ることが大切
