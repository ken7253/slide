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

## ツールチップで考慮しなければいけない点

- Machine readability
- Cancelability
- Selectivity

---

## 実装時の注意点

---

### Machine readability

- `role`と`aria-describedby`を設定する。
- フォーカス可能な要素を含む場合はモードレスダイアログとして実装する。

---

### Cancelability

`ESC`キーで一時的に非表示にできるようにする。

---

### Selectivity

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

#### Bad

```tsx{5}
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

```tsx{1}
<div onPointerEnter={} onPointerLeave={}>
  <div role="tooltip" hidden={!open} id={id}>
    {content}
  </div>
  <button aria-describedby={id}>
    {children}
  </button>
</div>
```