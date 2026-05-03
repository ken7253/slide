---
theme: ../theme-browser-and-ui
titleTemplate: "%s - ken7253"
layout: intro
---

# Firefoxにコントリビューションして得られた学び

[@フロントエンドカンファレンス名古屋](https://fec-nagoya-org.github.io/2026/) / [#fec_nagoya](https://x.com/search?f=tweets&vertical=default&q=%23fec_nagoya&src=typd)

<!-- prettier-ignore-start -->

---
src: "../reuse/me.md"
---

<!-- prettier-ignore-end -->

---

## 貢献できそうな場所を探す

書きたい言語と、興味のある領域から考えていくとよい。

---

## 言語の軸

---

## 領域の軸

---

自分の場合フロントエンドエンジニアとしてはHTML/CSSに興味があり、Rustを書きたかったのでCSS EngineであるStyloを直すことにした。

---

## 貢献までの流れ

- Bugzillaのアカウント作成
- Phabricatorのアカウント作成
- FirefoxのGitHubリポジトリからコードをClone
- Bugzilla or WPTなどで修正したいバグを探す

---

### Bugzillaのアカウント作成

![firefoxのbugzillaページのスクリーンショット](/img/bugzilla.mozilla.org_home.png)

---

### Phabricatorのアカウント作成

![Phabricatorのホーム画面のスクリーンショット](/img/phabricator.services.mozilla.com.png)

---

### FirefoxのGitHubリポジトリからコードをClone

![firefoxのGitHubページのスクリーンショット](/img/github.com_mozilla-firefox_firefox.png)

---

### Bugzilla or WPTなどで修正したいバグを探す

![WPTのダッシュボードのスクリーンショット](/img/wpt.fyi_results.png)


<!--
普通にフロントエンドエンジニアとして開発をしていると知らない場合もあると思いますが、ブラウザ自体の開発に利用されるWPTという共通のテストがあります。
このスクショのように各ブラウザがどの程度、仕様通りの実装をしているのかやどの機能にバグが残っているのかなどが確認できます。
-->

---

## CSS Engineとはなにか

![](/img/browser-overview.svg)

---

## CSS Engineとはなにか

![](/img/rendering-engine.svg)

---

## CSS Engineとはなにか

WIP: CSS Engineが行っている処理についての図を入れる

---
layout: two-cols-header
---

## 修正したバグについて

`CSSStyleDeclaration`インターフェイスの`getPropertyValue`メソッドの返り値が仕様と異なっていた部分の修正。

::left::  

```ts
`
<!-- html $0 -->
<div style="--foo: var(--bar) ;">
   <p>children</p>
</div>
`

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

## テストの効率的な実行方法を知らなかった

- 修正の度にビルドしてWPTを全件回すというのは現実的ではない
- `mach`コマンドにはWPTを一部・単体で実行することができる方法が用意されていた
- 後述するCIの結果を見て必要なテストだけ回していくというやり方が必要だった

---

## CIの結果が読めなかった

---
layout: section
---

## 書いたコードがどのように動いているのかを知る重要性

---
layout: section
---

## 環境は与えられるものではなく改善に加われる

---

## Browser and UIという勉強会を開催しています。

<QRCode text="https://browser-and-ui.connpass.com/" />
