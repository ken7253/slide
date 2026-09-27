---
theme: ../theme-browser-and-ui
titleTemplate: '%s - ken7253'
---

# フロントエンドカンファレンス福岡 参加レポート

---
src: "../theme-browser-and-ui/me.md"
---

---
layout: section
---

## フロントエンドカンファレンスとは？

---
layout: two-cols-header
---

### フロントエンドカンファレンスとは？

::left::

<img src="/img/vue-fes.png" class="m-auto w-45 h-45" alt="" />

<img src="/img/jsconfjp.png" class="m-auto w-50 h-50" alt="" />

::right::

- VueFes/JSConfが既にあった
- クライアントサイド技術の話
  - CSS/HTML
  - ブラウザ開発
  - a11y
  - i18n

---

### フロントエンドカンファレンスとは？

![](/img/fec-h-2024.png)

<!-- フロントエンドカンファレンスは増えたがその火付け役的なのはやはりフロントエンドカンファレンス北海道2024 -->

---
layout: section
---

## フロントエンドカンファレンス福岡とは？

---

### フロントエンドカンファレンス福岡とは？

![](/img/fe-conf-map.jpg)

---

### フロントエンドカンファレンス福岡とは？

- フロントエンドのエキスパート向け
- エコシステムよりも標準・プラットフォーマー側の話が主体
- 60分セッションのみ、昼食時間なしのストロングスタイルだった

---
layout: default
---

## 参加したセッション

- 杜甫々が語るフロントエンド開発技術の歴史と今後
- なぜJavaScriptは異常なほど速いのか？
- Webプラットフォームで議論されているセキュリティ課題
- Webの地図
- ウェブコンポーネントの進化
- Web エコシステムとサイバースペース地政学


---

## 杜甫々が語るフロントエンド開発技術の歴史と今後

「とほほの〇〇入門」でおなじみの杜甫々さんのセッション

自分はエンジニア始めたときには既にReact+TSでSPA！みたな世界観だったので昔の技術の話は逆に新鮮に思えた。

昔の話だけじゃなくて最新のWeb標準とかの話も一通りしていてキャッチアップ能力すごいなという印象をうけた。

---

## 杜甫々が語るフロントエンド開発技術の歴史と今後

AIの話もしていて、面白かったのはアセンブラから高級言語でのプログラミングになった過程でよりすごいアプリケーションが作れるようになっていった過程と人間の歴史から見た仕事感の変容みたいなのを絡めて語っていたのが印象的だった。

---

![](/img/tohoho-fe-3.png)

---

## なぜJavaScriptは異常なほど速いのか？

- プロパティアクセスの最適化
  - HiddenClass
  - インラインキャッシュ
- 演算子の最適化
  - アセンブラよくわからなかった

---
layout: default
---

### 辞書モードの `a.x`

<MemoryAccess mode="dict" :step="$clicks" />

---
layout: default
---

### Hidden Class 方式の `a.x`

<MemoryAccess mode="hc" :step="$clicks" />

---

### コードを書くうえで注意できる点は？

- 同じ種類のオブジェクトは、クラスかファクトリ関数1か所で作る
- すべてのプロパティを、生成時に同じ順序で初期化する。後から足さない
- オプショナルなプロパティも省略せず、常に定義しておく
- `delete` は使わず `undefined` を代入する（辞書モード化を防ぐ）
- `Object.setPrototypeOf` などで、生成後にプロトタイプを変えない

あくまで同じようなオブジェクトを大量に、繰り返し処理するような場合。

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#performance-and-size-optimizations

---

## Webプラットフォームで議論されているセキュリティ課題

プラットフォーム（ブラウザ）によって行われているセキュリティ対策の話

- DOM Clobbring
- prototype pollution
- Thenable
- TC39 TG3  

---

### DOM Clobbring

[CVE-2024-45389](https://github.com/advisories/GHSA-gprj-6m2f-j9hx)

DOMの古い仕組みを利用したXSSの話。

![](/img/dom-clobbring.png)

---

### DOM Clobbring

これ単体ではあまり意味はなさそうに思えるが下記のコードの場合…？

```html
<img name="currentScript" src="eval.example.com" />
```

```js
const scriptURL = document.currentScript.src;

await import(scriptURL);
```

---

### Prototype pollution

- Prototype汚染は厄介な問題ではある。
- 一方でPrototypeの拡張はpolyfillにも使われている
- `Object.prototype`を`Object.freeze`で凍結してみては？
- override mistake という仕様があり難しい

---

### override mistake

![](/img/override-mistake.png)

<!--
まず、前提として特定のオブジェクトのプロパティディスクリプタがwritable:false;の場合プロパティへの書き込みができなくなる。それがprototypeに適用された場合、それを継承しているオブジェクト全てで同名のプロパティへの代入時にTypeErrorが発生してしまう。

そして、`Object.freeze`は凍結時に`writable:false;`をディスクリプタに設定するのでObject.prototypeを凍結してしまうとコード上すべてで`toString`や`hasOwnProperty`に代入しようとした場合にtype errorが発生する危険性がある。
-->

---

### Prototype pollution

[Stage 1 Secure EcmaScript](https://github.com/tc39/proposal-ses)にて対策が検討されているらしい。

```js
import "/polyfill.js"; // ポリフィルの読み込み

windwo.lockdown(); // 以降はprototypeが書き換え不可能に
```

`npm:ses`でも同じように利用可能。

```js
import "npm:ses";
import "/polyfill.js"; // ポリフィルの読み込み

windwo.lockdown(); // 以降はprototypeが書き換え不可能に
```

---

### Thenable(+A)

あまりに（Thenableの）前提知識が長過ぎるので省略。

仕様として脆弱であるがもう既にコード([Comlink](https://github.com/googlechromelabs/comlink))が流通して動いてしまっているので後方互換性の観点から消せない。

Webの基本原則である後方互換と脆弱性対応をトレードオフではなく両立しようとする努力に感動した。

トレードオフ構造を見出して安易に解決しようとするのではなく両立できる道を探していく。

---

## Webの地図

Webの進化の歴史と標準化団体の分裂の歴史について。

連携のコストは高くなっているがECMAScriptがブラウザ(環境)に依存しない仕様になっていたからこそNode.jsのようなブラウザ以外で動くランタイムが作れたという側面もある。

---

## ウェブコンポーネントの進化

- 個人的に一番楽しみにしていたセッション
- webkitチームでwebの標準化に携わっている[@rniwa](https://rniwa.com/)さんの登壇
- ES6 classやWCの実装・標準化など
- 過去にWCを利用してコンポーネント群を作る仕事をしていたので

---

## ウェブコンポーネントの進化

![](/img/github-wc.png)

- GitHub/YouTube
- ブラウザの組み込み要素(video/audio etc..)
- 拡張機能（安全なDOM挿入）

---

## ウェブコンポーネントの進化

WebComponentの初代（v0）はGoogleが ~~強行実装~~ 推進していた。

- ブラウザベンダーのエンジニアでも扱いに困るほど複雑
- ES6 classとの互換性がない
- ES6 moduleとは別にHTML importという仕様を含む
- 独自のCSSセレクタ(`my-element /deep/ .foo { color: red }`)

改めて複数ベンダーによる協議の結果ある程度使いやすいAPIに

- https://developer.mozilla.org/ja/docs/Web/API/Web_components

<!-- おそらくClassの使い方が分かっていればMDNの記事を見るだけで基本的なコードは書けるぐらいシンプルな設計に収まっているはず -->

---

## ウェブコンポーネントの進化

Webにおいて後方互換性は絶対、一度リリースした仕様は撤回できない。

ベンダー間で議論が正しく行われると時間はかかるが良いものが出来上がる。

### 🤔Webエンジニアとして

- コンセンサスが取れていない仕様を頼りに実装する危うさ
  - Legacy decorator
  - [PEPC](https://github.com/WICG/PEPC/blob/main/explainer.md)
  - [Project Fugu](https://developer.chrome.com/docs/capabilities?hl=ja)?

ex) [Background Fetch API が消えそうだった話](https://blog.jxck.io/entries/2025-12-08/deprecating-background-fetch.html)

---

## Web エコシステムとサイバースペース地政学

---

## 感想

<img src="/img/overall.webp" alt="" class="w-[60%]" >

<a style="text-box-trim: trim-both;font-size: smaller;" href="https://blog.sakupi01.com/dev/articles/organizing-fec-f-2026">
https://blog.sakupi01.com/dev/articles/organizing-fec-f-2026 より引用</a>