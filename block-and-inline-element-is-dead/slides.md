---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# HTMLにブロック・インライン要素なんてものはない
"block-element" and "inline-element" is DEAD

---
src: "../reuse/me.md"
---

---

## A要素のルールを見てみよう

A要素を使う場合、どのような構造なら大丈夫なのか確認してみる。

> 許可されている内容：透過的コンテンツ、ただし子孫に 対話型コンテンツ または a 要素をがないもの、および tabindex 属性が指定された子孫がないもの。

[&lt;a&gt;: アンカー要素 - HTML: ハイパーテキストマークアップ言語 | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/a#%E6%8A%80%E8%A1%93%E7%9A%84%E6%A6%82%E8%A6%81)より引用


---

### 透過的コンテンツとは

その要素を消しても、HTMLの構造化に影響を与えない要素のこと。

つまり、`a > p` や `a > h2` とかは成立しない。

> 要素が透過的コンテンツモデル (transparent content model) を持っている場合、透過的な要素が削除されたり、子要素で置き換えられたりしても、それ自身のコンテンツが必ず妥当な HTML 5 として構造化されているものです。

[コンテンツカテゴリー - HTML: ハイパーテキストマークアップ言語 | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Content_categories#%E9%80%8F%E9%81%8E%E7%9A%84%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84)より引用

---

## まとめ

- HTMLの最新仕様にはインライン・ブロック要素という種別はない
- あるのはコンテンツカテゴリーと要素固有のルール
- HTMLは2つのカテゴリだけで親子構造を規定できるほど単純な言語ではない
