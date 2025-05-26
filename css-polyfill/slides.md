---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# CSS polyfill とその未来

---
src: "../reuse/me.md"
---

---
layout: center
---

## CSSの新機能 **プロダクションで** 使えていますか？

---
layout: center
---

![Baselineのロゴ](/img/baseline-wordmark.png)

---

## Baseline Widely available

- `:is()` / `:where()`
- `width: fit-content / min-content;`
- `@layer`
- `display: block flex;` (display Multi-keyword values)
- `clamp()` / `min()` / `max()`

---

<div style="display: flex; height: 100%; padding: 32px; gap: 16px;">
<img src="/img/js-logo.png" alt="">
<img src="/img/ts-logo-512.png" alt="">
</div>

---

<div style="display: flex; height: 25%; padding: 8px; gap: 8px;">
<img src="/img/js-logo.png" alt="">
<img src="/img/ts-logo-512.png" alt="">
</div>

- 構文のトランスパイル
  - typescript / babel
- 組み込みオブジェクトのサポート
  - core-js / promise-polyfill
- 利用できないAPIの制限
  - @eslint/compat / typescript(lib option)

---

<img src="/img/css.svg" style="height: 25%; padding:8px;" alt="">

- 構文のトランスパイル
  - post-css plugins
- プロパティのサポート
  - ❌️ => polyfillが必要
- 利用できないAPIの制限
  - stylelint-browser-compat

---

```css
@scope (.root) to (.end) {
  :scope {
    display: block flex;
    foo-bar: inherit;

    &.end {
      background-color: red;
    }
  }
}
```

- `@scope`をサポートしていないブラウザではどう解釈されるか
- 存在しないプロパティ`foo-bar`はどのように解釈されるか

---
