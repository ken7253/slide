---
theme: ../theme-browser-and-ui
titleTemplate: '%s - ken7253'
layout: intro
---

# Browser and UI
\#2 Network/Performance

---
src: "../theme-browser-and-ui/me.md"
---

---
src: "../theme-browser-and-ui/description.md"
---

---
layout: intro
---

# バンドルサイズを減らした話
\#2 Network/Performance

---

## プロジェクトの前提

- 組み込みブラウザ上で動作するアプリケーション
- 古いモデルでChromium 58ぐらいで、一部Safari 11ぐらいの環境も
- webpack/babelで素朴なSPAを構築

---
layout: section
---

## Q:サイズを削減しやすい環境とは？

---
layout: section
---

## A:元のバンドルサイズが大きい

<!--
バンドルサイズを削減したりする知見があまりなかった。
自分がプロジェクトに入ったタイミングで各種設定を眺めたりして怪しいところを見繕った。
-->

---

## やったこと

- コンパイルターゲットをES5からES6に
- Terserの設定で`mangle:false`になっていたのを解消
- 重複しているコードの削除

作業としては上の2つがメイン、コードの削除は段階的に実施

---

### コンパイルターゲットをES5からES6に

1. webpackを利用しているのでwebpackの設定を変更
2. 大きめのリリースに混ぜてQAが実施されるのでそれに混ぜてリリース

```diff
// webpack.config.js
{
  // ...
- target: ['web', 'es5'],
+ target: ['web', 'es6'],
  // ...
}
```
<!-- 
理想を言うとes2020までは上げたかった
-->

この対応で`6.1MB`->`3.74MB`にバンドルサイズを削減。

---
layout: section
---

## なぜES5はサイズが大きくなるか

---

## なぜES5はサイズが大きくなるか

- Generatorがない
- 関数宣言への変換が地味に効く
- moduleがないのでHelper関数の共通化が行いづらい

ほとんどのサービスでは意味がないので`ES5`へのトランスパイルはやめるべき

<!-- Generatorに関してはasyncなどの非同期処理を置き換えるためのhelper関数がGeneratorで書かれているため -->

---
layout: section
---

## 一般的なアプリケーションの指標は？

---
layout: section
---

## ES2020を最低ラインになるべく最新に

---

## 一般的なアプリケーションの指標は？

今回のバンドルサイズ調整でもES2020を目指していた。

- Optional chaining(オプショナルチェーン)
- Nullish coalescing(Null 合体演算子)

上記の機能はES2020で追加されたものだがよく使われている一方で、トランスパイル時のサイズが増えがちだった。

<!-- どうしてもならasync/awaitが変換されないES2017以上という選択肢もあるが… -->

---

## 一般的なアプリケーションの指標は？

### Optional chaining(オプショナルチェーン)

```ts
// src: 9 Bytes
a?.b?.c
// downlevel: 100 Bytes
var _a;
(_a = a) === null || _a === void 0 || (_a = _a.b) === null || _a === void 0 ? void 0 : _a.c;
// minfy: 64 Bytes
var l;null===(l=a)||void 0===l||null===(l=l.b)||void 0===l||l.c;
```

### Nullish coalescing(Null 合体演算子)

```ts
// src: 7 Bytes
a ?? b;
// downlevel: 52 Bytes
var _a;
(_a = a) !== null && _a !== void 0 ? _a : b;
// minfy: 34 Bytes
var l;null!==(l=a)&&void 0!==l||b;
```

---

## 一般的なアプリケーションの指標は？

一方でアプリケーションのバージョンを固定してしまうと、新機能を使うたびにpolyfillやトランスパイルでバンドルサイズが増えてしまう。

基本的には定期的になるべく最新に引き上げてあげる必要がありそう。

---
layout: section
---

## Terserの設定で`mangle:false`になっていたのを解消

---

## Terserとmangleとは？

![](/img/terser.org_.png)

---

## Terserとmangleとは？

### Terser

JSのminifyを行うツール

### mangle

変数名などを短くしてminifyを行う方法
