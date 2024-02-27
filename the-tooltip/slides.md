---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# &lt;TheTooltip /&gt;
使いやすいツールチップを実装する方法

---
src: "../reuse/me.md"
---

---
layout: section
---

## TooltipとはどういうUIなのか

<!--
まずはじめに、ツールチップとはどのようなUIなのか軽く振り返ってみましょう。
-->

---

### TooltipとはどういうUIなのか

[ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) の説明が分かりやすい。

> A tooltip is a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

「ツールチップは、要素がキーボードフォーカスを受けたり、マウスカーソルをその上に置いたりしたときに、その要素に関連する情報を表示するポップアップです。」

<!--
とりあえず自分が知る限りではAPGの説明が分かりやすいので引用してみます。
-->

---

## ツールチップの実装時に考慮すること

- Machine readability
- Cancelability
- Selectivity

基本的には [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) や [WCAG](https://www.w3.org/TR/WCAG22)を参考にする。  
その中で関連のありそうな項目を参考にUIを組み立てていく。

- [Tooltip Pattern | APG | WAI | W3C](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [WCAG 2.2 - Success Criterion 1.4.13 Content on Hover or Focus](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus)

今回の対象としては上記を参考にしています。

<!--
なんとなくどういうUIなのかはわかったので次に具体的な実装時の注意点をいくつか考えてみましょう。ツールチップとして「動く」ことは大前提として、使いやすさに焦点を絞っていくつかポイントを見ていきます。そのために参考として下記の２つの資料を参照してみました。
-->

---
layout: center
---

## 実装時の注意点

---

### Machine readability

- `role`と`aria-describedby`を設定する。
- フォーカス可能な要素を含む場合はモードレスダイアログとして実装する。

汎用UIパーツは適切なマークアップをしないとテストコードが汚くなる。  
**見た目だけがUIではない** のでブラウザからもUIが認識できるようにしておく。

<!--
最近だと自動テスト文脈でも当たり前になりつつありますが、「UI」は見た目だけを指すわけではないので、きちんとブラウザにもツールチップであることを通知するために適切なARIA属性を付与します。
-->

---

### Cancelability

`ESC`キーで一時的に非表示にできるようにする。

ARIA APGを見るとインタラクションとして`ESC`キーでのキャンセルが記載されている。

![ARIA APG  disappears when Escape is pressed or on mouse out.](/img/apg-tooltip-patterns.png)

<!--
次にAPGにも記載があるようにESCキーでツールチップの表示状態を一時キャンセルできるようにします。ここでの一時キャンセルとはツールチップを表示させた後にマウスの操作もしくはフォーカスの操作以外の方法で表示を一時的に隠すことができるという状態を指します。
-->

---

### Selectivity

大抵のツールチップはツールチップ内部のテキストをコピペできない  
イベントハンドラーを張る要素に気をつける。

<!--
そして最後はツールチップ内部のテキストを正しく選択できるようにすることです。これは有名なUIライブラリなどでも正しく実装されていないことが多く、多くの場合ツールチップの表示を発火させる要素からツールチップ内部にカーソルを動かすとツールチップ自身が消えてしまい選択できないという状況になる場合が多いです。
-->

---

### Selectivity

#### Bad

```tsx
<div>
  <div role="tooltip" hidden={!open} id={id}>
    {content}
  </div>
  <button aria-describedby={id} onPointerEnter={} onPointerLeave={}>
    {children}
  </button>
</div>
```

#### Good

```tsx
<div onPointerEnter={} onPointerLeave={}>
  <div role="tooltip" hidden={!open} id={id}>
    {content}
  </div>
  <button aria-describedby={id}>
    {children}
  </button>
</div>
```

<!--
原因としてはこのようにイベントハンドラーを設定する要素を少し変えてあげるだけで解決するのですが、初見で下のようなイベントの貼り方ができる人は稀だと思います。
-->

---

### Selectivity

なぜコンポーネント全体に`onPointerEnter`と`onPointerLeave`を設定するのか。  
下記は素直にボタンにだけにイベントハンドラーを貼った場合の例

```tsx{5-7}
<div>
  <div role="tooltip" hidden={!open} id={id}>
    {content}
  </div>
  <button aria-describedby={id} onPointerEnter={} onPointerLeave={}>
    {children}
  </button>
</div>
```

<!--
ざっくりと説明すると下記のようにツールチップの表示をトリガーする要素にだけPointerEnter / PointerLeaveを貼ると…
-->

---

### Selectivity

![ツールチップを表示する要素にだけイベントハンドラーを適用した場合のイベントの発生条件を表した図](/img/bad-tooltip-listener.svg)

トリガーとなる要素だけにイベントハンドラーを貼ると  
ツールチップにポインタが移動した場合`PointerLeave`が発火して消えてしまう。

<!--
この図のようにツールチップの表示をトリガーする要素の外に出た瞬間にPointerLeaveイベントが発火してツールチップが隠れてしまいます。
-->

---

### Selectivity

![ツールチップ全体をラップする要素にイベントハンドラーを適用した場合のイベント発生条件を表した図](/img/good-tooltip-listener.svg)

ツールチップとして認識する範囲を広げてWrapperを用意すると  
ツールチップにポインタが移動しても`PointerLeave`が発火せず選択できる。

<!--
これを防ぐ場合にはこのようにトリガーとなる要素とツールチップ自体をラップする要素全体にEnter/Leaveイベントを付与することでトリガーとなる要素とツールチップ間でポインティングデバイスが移動しても表示を継続できるようになります。これによりツールチップ内部のテキストは無事選択可能になる訳です
-->

---
layout: center
---

## 解説されると分かるけど、普段はあまり気付けない

<!--
こうやって解説されるとその程度のことか、と思うけど実際に実装時に気付けることは少ない。
-->

---
layout: center
---

## どうしてこうなった

---

### どうしてこうなった

- ググって最初に出てきたコードをコピペ
- 既存の実装を参考にする
- UIライブラリの実装を参考にする

これらが本当にユーザビリティの高い実装をしているとは限らない。
