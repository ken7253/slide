---
theme: ../theme-browser-and-ui
titleTemplate: "%s - ken7253"
src: ./title.md
---

---
layout: section
---

## ちょっとだけ質問

---
layout: section
---

## フロントエンドエンジニア

---
layout: section
---

## OSSとかにパッチを送ったことがある

---
layout: section
---

## ブラウザにパッチを送ったことがある

---
layout: section
---

## ブラウザ（開発）に興味を持ってくれる人を増やすため

---
src: ./title.md
---

<!-- prettier-ignore-start -->

---
src: "../reuse/me.md"
---

<!-- prettier-ignore-end -->

---

## 今日話すこと

![firefox148のリリースノートページのスクリーンショット、コミュニティコントリビューターの項目に名前が掲載されている。](/img/firefox-148-release.png)

- firefoxのCSSOMのバグを修正した
- ブラウザにコントリビューションした経緯など

---

## 貢献までの流れ

- Bugzillaのアカウント作成
- Phabricatorのアカウント作成
- FirefoxのGitHubリポジトリからコードをClone
- Bugzilla or WPTなどで修正したいバグを探す

---

### Bugzillaのアカウント作成

![firefoxのbugzillaページのスクリーンショット](/img/bugzilla.mozilla.org_home.png)

<!--
Bugzillaはブラウザ開発以外にバグの報告などにも利用されるので利用したことがある人もいるかと思いますが基本的にBugzillaにバグとして起票されていないものはレビューしてもらえないので治したいバグが起票されていない場合はバグ報告を先に行う必要があります。
-->

---

### Phabricatorのアカウント作成

![Phabricatorのホーム画面のスクリーンショット](/img/phabricator.services.mozilla.com.png)

<!--
Phabricator(ファブリケーター)はfirefoxのソースコード管理ツールで、自分も詳しくないですがGitHubのような感じでレビューを行ったりするのに利用されています。
ソースコードの取得自体は公式のGitHubからcloneを行えますが、パッチ自体はこっちにだすひつようがあります。
-->

---

### FirefoxのGitHubリポジトリからコードをClone

![firefoxのGitHubページのスクリーンショット](/img/github.com_mozilla-firefox_firefox.png)

---

### Bugzilla or WPTなどで修正したいバグを探す

![WPTのダッシュボードのスクリーンショット](/img/wpt.fyi_results.png)


<!--
普通にフロントエンドエンジニアとして開発をしていると知らない場合もあると思いますが、ブラウザ自体の開発に利用されるweb-platform-testという共通のテストがあります。
このスクショのように各ブラウザがどの程度、仕様通りの実装をしているのかやどの機能にバグが残っているのかなどが確認できます。
-->

---

## CSS Engineとはなにか

![ブラウザの機能をおおまかにレンダリングとJSEngineとその他の機能に分けた図](/img/browser-overview.svg)

---

## CSS Engineとはなにか

![レンダリングエンジンの簡易的な流れを表した図、取得したHTML/CSSからPaintingまでの流れを列挙している](/img/rendering-engine.svg)

---

## CSS Engineとはなにか

WIP: CSS Engineが行っている処理についての図を入れる

---
layout: two-cols-header
---

## 修正したバグについて

`CSSStyleDeclaration`インターフェイスの`getPropertyValue`メソッドの返り値が仕様と異なっていた部分の修正。

::left::  

```html
<!-- $0 -->
<div style="--foo: var(--bar) ;">
   <p>children</p>
</div>
```

```ts
const pattern1 = $0.style.getPropertyValue("--foo");
const pattern2 = window.getComputedStyle($0).getPropertyValue("--foo");
const pattern3 = window.getComputedStyle($0.children[0]).getPropertyValue("--foo");
```

::right::

<div style="display:flex;flex-direction:column;align-items:center;">
<QRCode text="https://github.com/web-platform-tests/wpt/blob/master/css/css-variables/variable-definition.html" />
<span style="text-align:center;">テストケース(WPT)</span>
</div>

---

## 修正したバグについて

![修正したテストケースのパターンを表した図](/img/test-case.svg)

`getPropertyValue`メソッドは大まかに3つのパターンがある

- `style`属性から直接取得する場合
- `getComputedStyle`を経由して取得した場合
- カスケードした値を`getComputedStyle`経由で解決する場合

---

## 修正したバグについて

`getPropertyValue`の返り値に`<whitespace-token>`（半角スペース）が含まれてしまっていたが、この挙動に仕様との差異があったため修正を行った。

```html
<!-- $0 -->
<div style="--foo: var(--bar) ;">
   <p>children</p>
</div>
```

```ts
const pattern1 = $0.style.getPropertyValue("--foo");

console.log(pattern1);
// 🙅
// "var(--bar) "

// 🙆
// "var(--bar)"
```

---
layout: section
---

### なぜこのバグを修正しようと思ったのか

---
layout: section
---

### 簡単そうだったから

---

## 修正したバグについて

![パッチとして送ったcustom_properties.rsのdiff画面のスクリーンショット、実質的な変更は7行だけ。](/img/patch-diff.png)

これだけを治すのに2,3週間…！

---
layout: section
---

## なぜ時間が掛かってしまったのか

---


## なぜ時間が掛かってしまったのか

- 仕様を十分に理解していなかった
- テストの効率的な実行方法を知らなかった
- CIの結果が読めなかった

---

## 仕様を十分に理解していなかった

<!--
FirefoxではWPTの他にも独自のテストケースを内部に持っているのですが、そのテストケース自体に誤りがあってそれに気づくまでにかなりの時間を要しました。
まあこれもテストケースを書いた人が悪いとかそういうことではなく、ちょっとテストケースが通るように直せばそれでOKみたいな感覚で進めてしまっていたのがよくなかったなと思ってます。
もともと仕様の話が好きだったのにいざ作業を進めてみるとテストケースを通過させることに執着してしまって、きちんと仕様を読むみたいな時間がなくて近視眼的になっていたなと思います。
-->

---

## 仕様を十分に理解していなかった

![CSS Object Model (CSSOM)に記載されたgetPropertyValueメソッドの処理手順、カスタムプロパティの値はシリアライズした結果を返すことが記載されている。](/img/method-steps.png)

<!--
CSSOMの仕様を定めるCSS Object Model (CSSOM) Module Level 1には getPropertyValue メソッドを実行した場合の処理が記載されています。
最初のstepはカスタムプロパティではないビルドインのプロパティを処理する場合なのでスキップしてstep2へ向かいます。
そしてカスタムプロパティの場合は定義されているプロパティとcase-sensitiveな比較を行います。
それでマッチした場合、シリアライズした値を返すという風にメソッドが定義されていることが分かります。
-->

---

## 仕様を十分に理解していなかった

![CSS Object Model (CSSOM)に記載されたCSS valueのシリアライズ手順の一部、ホワイトスペースの除去が明示的に書かれている。](/img/serialize-css-value-rules.png)

[CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1) より引用

<!--
そしてこのシリアライズした値というのがポイントで、これもまたシリアライズ手順が仕様に定義されている。
手順が長いので抜粋していますが、step3にてホワイトスペースの除去を行うことが明示的に書かれています。
-->

---

## テストの効率的な実行方法を知らなかった

- 修正の度にビルドしてWPTを全件回すというのは現実的ではない
- `mach`コマンドではWPTを一部（単体）で実行することができる
- CIの結果を見て必要なテストだけ回していくというやり方が必要だった

<hr/>

```sh
./mach wpt test_list <directory | file> --headless
# or
./mach test <directory | file> --headless
```

---

## テストの効率的な実行方法を知らなかった

---

## CIの結果が読めなかった

---

## 修正を終えてみて

- 小さなバグから始められたのは非常によかった
- 何を修正するのか、関連する仕様の調査が重要（思っている以上に！）
- リリースノートに自分の名前が載るのはテンションが上がる

---

## Browser and UIという勉強会を開催しています。

<QRCode text="https://browser-and-ui.connpass.com/" />
