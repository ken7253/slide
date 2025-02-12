---
theme: ../theme-browser-and-ui
titleTemplate: '%s - ken7253'
layout: intro
---

# Browser and UI
\#1 CSS

---
src: "../theme-browser-and-ui/me.md"
---

---
layout: section
---

## Browser and UI とはなにか

---
layout: section
---

### **狭義の**フロントエンドエンジニアの勉強会

<!--
フロントエンドがどんどん発展するに従って、フロントエンドエンジニアがやることもどんどん増えていった。
しかし、僕達はブラウザの上で動くユーザーインターフェースを作ることが目的だったはず。
アプリケーション開発はフレームワークの上で行うことが当たり前になりサーバーサイドのコードも書くようになった
ただ、どんなフレームワークの上で開発していようが自分たちはブラウザというプラットフォームの上にいることは変わらないはずで
どんな環境にいるフロントエンドエンジニア同士でも共通の話題として「狭義のフロントエンド」の話をする場を作りたかった。
-->

---

### **狭義の**フロントエンドエンジニアの勉強会

#### 話していきたいこと

- ブラウザの仕様・標準化の話
- ブラウザの実装について
- UI・デザインの話
- UI実装を支えるツール

---

### **狭義の**フロントエンドエンジニアの勉強会

#### 積極的にはやらないこと

- ライブラリ・フレームワーク論
- （サービス全体の）設計論・アーキテクチャ
- サーバーサイドの話
- 技術以外の話

---
layout: section
---

## お願いしたいこと

---

### お願いしたいこと

- 誰かを不快にさせる行動・発表はしないでください。
- ミニマムな開催にご協力をお願いします。
- 次回以降の会場提供できそうな人は教えて下さい。
- また次回やるので来てください！

<!--
勉強会についての説明はここまででちょっと技術の話をします。
-->

---
layout: section
---

## Opening LT

---
layout: section
---

## 簡単にCSSの動向を追う方法

<!--
わりとライトな感じで仕様の動向を追いたい人向けの情報になると思います。
-->

---

### 最近のCSSの進化

- CSS Basic User Interface Module
- CSS Anchor Positioning
- CSS Scrollbars Styling Module `scrollbar-color` / `scrollbar-width`
- CSS Properties and Values API `@property`
- CSS Values and Units Module `calc-size()` / `interpolate-size`
- CSS View Transitions Module

---
layout: section
---

## 多すぎる…！

---

## intent to ship

- みんな大好きintent to ship
- Twitter or Bluesky で気軽に見れる
- blink-devのページは情報がコンパクトにまとまっているため調査の起点にしやすい
- 仕様を追ってる人は大体見てるイメージ

shisamaさんのブログが分かりやすい。

https://shisama.hatenablog.com/entry/2019/01/24/075701

---

## intent to ship

![](/img/intent-to-ship.png)

---

## intent to ship(blink-dev)

![](/img/blink-dev.png)

---

## CSS WG Minutes

- 週に1回ぐらいの更新
- 提案段階などの早い段階から追いたい人向け
- 議論の内容とかも見れるので経緯とかを知りたい人にも
- APIというよりかは仕様っぽい話が中心
- これだけだとブラウザの実装状況は追えない
- たまにHTMLやARIAとのミーティングがある

---

## CSS WG Minutes

![](/img/csswg-minutes.png)

---

## BCD-watch

- 毎週月曜日に1回更新
- BCD([browser-compat-data](https://github.com/mdn/browser-compat-data))の差分を1週間分出してくれる
- ブラウザに実装されたタイミングとかで知りたい人向け
- CSS以外の情報も入ってくる
- Full Weekly ReportとUniversal Implementations Weekly Reportがある

解説ブログ書きました。

https://zenn.dev/ken7253/articles/browser-compat-data-watch

<!-- 個人的には一番オススメしたい、 -->

---

## BCD-watch

![](/img/bcd-watch.png)

---

## Release Note

- 頻度はリリース依存
- 頻度は少ないが(前の２つと比べると)ボリュームが多い
- ブラウザ毎に追わないといけない
- チームで時間取って読むと楽しいかもしれない

<!-- 自分の場合は議論とShipの段階で抑えておくので、あんまりリリースノートは時間かけて読まない -->

---

## 自分の使い方

定期的にやってること

- 月曜日とかにBCD-watchのFull Weekly Reportを一通り見る
- 同じタイミングぐらいでCSS WGのMinutesも読む
- リリースノートは出てたら軽く流し読み程度

CSS WGのMinutesならissueのリンクが張ってある場合があるのでそれを読む。  
BCD-watchならMDNへのリンクと仕様書のリンクがあるのでそれを読む。

そもそもどういう提案なのか知らなかったらblink-devからExplainerを読みに行く。  
standards-positionsを見ておくと標準化の合意が得られそうかが分かる。
