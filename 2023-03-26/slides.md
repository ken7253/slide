---
theme: default
titleTemplate: '%s - ken7253'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# slide sample

sample

---
src: "../reuse/me.md"
---

---

## 見出し2

### 見出し3

#### 見出し4

##### 見出し5

---
layout: two-cols
---

## リスト

- foo
- bar
  - piyo
  - fuga
    - hoge
- buzz

::right::

## 順序つきリスト

1. foo
2. bar
   1. piyo
   2. fuga
      1. hoge
3. buzz

---

## テキスト

てすとてすと`slidev`てすと

テキスト~~てすとてすと~~テキスト

テキスト*てすとてすとてすと*テキスト

テキスト**てすとてすとてすと**テキスト

> テストテストテストテストテストテストテストテストテストテストテストテスト

[リンクテキスト](https://ja.sli.dev/)

---

## テーブル

| Header | Header | 見出し |
| ------ | ------ | ------ |
| Sell   | Sell   | セル   |
| Sell   | Sell   | セル   |

| Header | Header | 見出し |
| :----- | :----: | -----: |
| Sell   |  Sell  |   セル |
| Sell   |  Sell  |   セル |

---
layout: section
---

## セクション見出し Level 2

---
layout: section
---

### セクション見出し Level 3

---
layout: center
---

## 中央揃え見出し Level 2

---
layout: center
---

### 中央揃え見出し Level 3

---
layout: image-left
image: public/img/logo-slidev.png
---

## 画像組み合わせ

---
layout: quote
---

> 引用文

---

## TypeScript

```ts
import path from "node:path";
import { readdir } from "node:fs";

/**
 * @ref https://ja.sli.dev/
 */
export type Foo<T extends {}> = {
  dirList: T[] | string;
  bar: Readonly<T>;
};

export class SomeError extends Error {};

// exec
((args: string) => {
  const dirList = readdir(path.join(process.cwd(), args));
})('src');
```

---

## CSS

```css
/* セクション見出し用 */
#app .slidev-layout.section[data-page] {
  & h2 {
    font-size: 2.5rem;
    line-height: 1.4;
    color: var(--c-main);

    &::after {
      width: 100%;
      margin: 0.25em auto 0 auto;
      opacity: 0.5;
    }
  }

  & h3 {
    padding: 0;
  }
}
```

---

## HTML

```html
<script>
  const foo = (prefix) => `${prefix}-foo`;
  class SomeError extends Error {};
</script>
<div style="display: flex; justify-content: space-between;">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <h1 style="margin: 0 0 0 -3px; line-height: 1;">ken7253</h1>
    <p style="margin: 0;">Frontend developer</p>
  </div>
  <!-- アイコン画像 -->
  <img alt="" src="https://dairoku-studio.com/ogp-thumbnail.png" style="position:fixed;">
</div>

<div>
  <p style="font-size: 1rem; line-height: 2.1;">
    技術記事を書いたりするのが趣味。<br>
    最近はNext.jsを使ったアプリケーションを書いています。<br>
    インターフェイス設計やアクセシビリティ・SSG関連の技術に興味があります。
  </p>
</div>
```
