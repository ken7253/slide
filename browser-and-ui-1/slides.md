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

## JSConfのイベントにてPEPCについて話します！

![JSConfJP おかわりイベントのconnpassページのスクリーンショット](/img/pr1.png)

---

## TSKaigiのCfP応募受付中です！

<a style="display:flex;justify-content:center;border:none;" href="https://docs.google.com/forms/d/e/1FAIpQLScKXPc8dLC3QSqu_pMTGJdED3LuuFi0QCVsCMWIrC6nPcxRnA/viewform" target="_blank">
<img width="400" height="400" src="/img/tskaigi-cfp-link.png" alt="TSKaigiのCfP応募フォームへのリンクQRコード">
</a>

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
- フォント・画像とかのアセット系の話とかも

<!--
画像やフォントの話とかもしたい
-->

---

### **狭義の**フロントエンドエンジニアの勉強会

#### 積極的にはやらないこと

- ライブラリ・フレームワーク論
- （サービス全体の）設計論・アーキテクチャ
- サーバーサイドの話
- 技術以外の話

<!--
この話ちょっとネガティブっぽい感じだから話すか迷ったけど、やらないことを決めるのも大切だしこういう話できる場って結構あると思ってるので
最近Denoが面白いと思ってるけど勉強会ではやらない。
ただ、1か0ではないのでそこはアナログな感じで
-->

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

## Opening talk

---
layout: section
---

## 簡単にCSSの動向を追う方法

<!--
わりとライトな感じで仕様の動向を追いたい人向けの情報になると思います。  
普段から仕様を追っている人にとっては当たり前の話が続くかもしれない。
とりあえず、みなさん"最近"のCSSの新機能といえばどんなことが思いつきますか？
-->

---

### 最近のCSSの進化

- CSS View Transitions Module
- CSS Anchor Positioning
- CSS Basic User Interface Module `appearance` / `interactivity`
- CSS Scrollbars Styling Module `scrollbar-color` / `scrollbar-width`
- CSS Properties and Values API `@property`
- CSS Values and Units Module `calc-size()` / `interpolate-size`
- CSS Conditional Rules Module `@container`

<!--
各種仕様の話をざっとさらう。
今日の勉強会で多分出てくる話も多いと思います、楽しみですね。
-->

---
layout: section
---

## 多すぎる…！


---
layout: section
---

## 簡単にCSSの動向を追う方法

---

## 簡単にCSSの動向を追う方法  

- 趣味じゃない人は（たぶん）全部追わなくてもいい
- 自分の場合[mozaic.fm](https://mozaic.fm/)を散歩中に止まらず聞けるようにしたかった
- 提案段階の仕様とかまで追うのは大変
- まとめると大変なので週単位とかで追えるようにしていく

<!-- 仕様を追ったりするのに利用しているサービスと自分の使い方を軽く紹介する -->

---
layout: section
---

## intent to ship

---

## intent to ship

- みんな大好きintent to ship
- Twitter or Bluesky で気軽に見れる
- blink-devは情報がコンパクトにまとまっているため調査の起点に
- 仕様を追ってる人は大体見てるイメージ

shisamaさんのブログが分かりやすい。

https://shisama.hatenablog.com/entry/2019/01/24/075701

---

## intent to ship

![blueskyでのintent-to-shipアカウントの投稿画面のスクリーンショット、Intent to Ship: CSS interactivityについての内容](/img/intent-to-ship.png)

---

## intent to ship(blink-dev)

[![先ほどのintent-to-shipのリンクを辿った先のblink-devの画面のスクリーンショット、仕様についての様々なリンクがあることを確認できる](/img/blink-dev.png)](https://groups.google.com/a/chromium.org/g/blink-dev/c/O5ZmbyRh9LE)

<!--
重要な部分を説明する、これはCSSでhtmlのinert的なのを実現するためのCSS interactivityについての提案なのですが
Explainer（仕様の提案の概要についてまとめられたドキュメントへのリンク・ディスカッションとかも行われている）
TAGReview（W3CのTechnical architecture groupのレビューへのリンク、今回だとCSS interactivityはOpenUIがカルーセルのUIを標準化するために用意した一連の提案の一部だということがわかる）
standards-positionsに関しては、webkitやmozillaがその提案に対してどのようにとらえているかが分かる。ここで合意が得られてないと標準化は遠いなということが分かる。  
-->

---
layout: section
---

## CSS WG Minutes

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

[![](/img/csswg-minutes.png)](https://www.w3.org/blog/CSS/2025/01/24/minutes-2025-01-22/)

---

## CSS WG Minutes

[![](/img/csswg-minutes-2.png)](https://www.w3.org/blog/CSS/2025/01/24/minutes-2025-01-22/)

https://zenn.dev/progfay/articles/visited-selector-privacy

`:visited`疑似クラスの前提についてはこの記事が分かりやすい。

<!--
:visited疑似クラスに対してのセキュリティ面での懸念に対してのさらなる対策が必要そうという議論をしていたりする。
-->

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

---

## 自分の使い方

<img src="/img/watch-list.png" alt="" class="h-full">

<!--
個人的にはintent to prototypeの時点である程度どのような仕様か把握しておくと楽
使えるようになってから教えてくれって人はBCD-watchだけ見ていてればいいと思う。
-->

---
layout: section
---

## 皆さんも楽しい Web標準ライフを！
