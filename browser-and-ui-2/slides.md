---
theme: ../theme-browser-and-ui
titleTemplate: '%s - ken7253'
layout: intro
---

# Browser and UI
\#2 HTML/ARIA

---
src: "../theme-browser-and-ui/me.md"
---

---
src: "../theme-browser-and-ui/description.md"
---
---
layout: section
---

# Opening Talk

---
layout: section
---

## HTML Parser Quiz!!

---

### HTML Parser Quiz!!

- 賞品はありません🙇
- 基本的には頭の中で考えるだけで🙆‍♂️
- 余裕があったらハッシュタグでポスト🙆‍♂️
- 簡潔にするために解説では手順をスキップしている箇所があります🙇

---

## Q0: Example

```html
<div data-foo="foo" data-foo="bar"></div>
```

例題：同一の属性値を複数記述した場合どうなるのか？

---

## A0: Example

```html
<div data-foo="foo"></div>
```

最初に定義した属性値が採用される。
（重複した属性値は無視される）

---
layout: section
---

## Q1: Skip Element

---

## Q1: Skip Element

```html
<!DOCTYPE html>
<meta charset="utf-8">
<div>Hello World.</div>
```

### point

- `<html>`/`<head>`/`<body>`などを書いていない

---

## A1: Skip Element

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div>Hello World.</div>
  </body>
</html>
```

- `<html>`/`<head>`/`<body>`が挿入される
- 特定の要素については書かれていなくても補完される

※`<div>`の後に`<title>`などを入れた場合は`<body>`内部に入る

---

## A1: Skip Element

head内部の処理

- `doctype`が終了(`before html`状態)のときに`html`以外の開始タグが出現
  - `<html>`をDOMに挿入する
  - `before head`に移行する
- `before head`の状態で`head`以外のタグが出現した
  - `head`をDOMに挿入する
  - `in head`に移行する
- `meta[charset="UTF-8"]`を挿入する

---
layout: section
---

## Q2: HTML Comment with inline script

---

## Q2: HTML Comment with inline script

```html{*}{lines:true}
<!doctype html>
<html lang="ja">
  <head>
    <script>
      <!-- console.log("html comment");
      console.log("Hello, world!");
    </script>
    -->
  </head>
  <body></body>
</html>
```

### point

- `<!-- console.log("html comment");` はどのように解釈されるか
- `-->`はどのように解釈されるか

---

## A2: HTML Comment with inline script

![ブラウザの画面に<!--というHTMLコメントが表示されコンソールにはHello, world!と表示しているスクリーンショット](/img/q2-answer.png)

1. `<script>`内部はすべてテキストトークンとして扱われる。
2. `<script>`内部のテキストはすべてJSのParserに渡される。
3. HTMLコメントは単行のコメントなので最初のログは出力されない。
4. `console.log("Hello, world!");`は実行される。
5. `in head`状態の場合に開始タグ以外を発見したので`in body`に移行する。
6. `-->`はテキストとして解釈され画面に表示される。

---
layout: section
---

## Q3: Formatting Elements

---

## Q3: Formatting Elements

```html
<!-- // -->
<body>
  <p>foo<b>bar<a href="#top">buzz</b>qux</a>foobar</p>
</body>
<!-- // -->
```

- `<a>`を開いたが先に`<b>`の閉じタグが来ている
- `<b>`の閉じタグの後に`<a>`が閉じられている
- 閉じタグの順番がぐちゃぐちゃ
- HTML LSにも乗っている有名(?)な問題

---

## A3: Formatting Elements

```html{*|7}{lines:true}
<!-- // -->
<body>
  <p>foo
    <b>bar
      <a href="#top">buzz</a>
    </b>
    <a href="#top">qux</a>
    foobar
  </p>
</body>
<!-- // -->
```

1. `qux`の部分に`<a>`の開始タグが挿入される
2. これはFormatting Elements特有の挙動

---

## Formatting Elements

> The following HTML elements are those that end up in the list of active formatting elements: a, b, big, code, em, font, i, nobr, s, small, strike, strong, tt, and u.

HTML LSに定義されている下記の要素

`a`/`b`/`big`/`code`/`em`/`font`/`i`/`nobr`/`s`/`small`/`strike`/`strong`/`tt`/`u`

これらの要素が出現している間は自動閉じタグ挿入の仕組みが特別なものになる。

自動的に閉じタグが挿入されるが、本当に閉じタグがある場所まではフォーマットを維持するためにタグで囲われていない部分も囲ったり、開始タグを挿入したりする。



