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

---

### TooltipとはどういうUIなのか

[ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) の説明が分かりやすい。

> A tooltip is a popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

「ツールチップは、要素がキーボードフォーカスを受けたり、マウスカーソルをその上に置いたりしたときに、その要素に関連する情報を表示するポップアップです。」

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

---
layout: center
---

## 実装時の注意点

---

### Machine readability

- `role`と`aria-describedby`を設定する。
- フォーカス可能な要素を含む場合はモードレスダイアログとして実装する。

汎用UIパーツは適切なマークアップをしないとテストコードが汚くなる。  
見た目だけがUIではないのでブラウザからもUIが認識できるようにしておく。

---

### Cancelability

`ESC`キーで一時的に非表示にできるようにする。

ARIA APGを見るとインタラクションとして`ESC`キーでのキャンセルが記載されている。

![ARIA APG  disappears when Escape is pressed or on mouse out.](/img/apg-tooltip-patterns.png)

---

### Selectivity

大抵のツールチップはツールチップ内部のテキストをコピペできない  
イベントハンドラーを張る要素に気をつける。

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

---

### Selectivity

![](/img/bad-tooltip-listener.svg)

トリガーとなる要素だけにイベントハンドラーを貼ると  
ツールチップにポインタが移動した場合`PointerLeave`が発火して消えてしまう。

---

### Selectivity

![](/img/good-tooltip-listener.svg)

ツールチップとして認識する範囲を広げてWrapperを用意すると  
ツールチップにポインタが移動しても`PointerLeave`が発火せず選択できる。

---
layout: center
---

## 解説されると分かるけど、普段はあまり気付けない

---
layout: center
---

## どうしてこうなった

---

## どうしてこうなった

- ググって最初に出てきたコードをコピペ
- 既存の実装を参考にする
- UIライブラリの実装を参考にする

これらが本当にユーザビリティの高い実装をしているとは限らない。
