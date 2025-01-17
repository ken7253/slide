---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# Keep learning
学び続けるための方法

---
src: "../reuse/me.md"
---

---

## なぜこのスライドを作ったのか

- そろそろフロントエンド５年目になる
- 持論を展開するようなスライドを書きたくなった
- いちおう中堅エンジニアぐらいにはなれたような気がする
- じゃあ中堅になるまでにどういう勉強方法したっけってまとめを書いてみる

---

## 話すこと

- 勉強法を模索して気付いたことをまとめます
- あくまで個人の体感の話です
- 学習方法は人それぞれなので自分に合ったやり方を探すきっかけに

---
layout: center
---

## 知識のアップデートで気をつけていること

<!--
まずはちょっとした注意点というかどういう時に学び方を見直さないといけないだっけ？みたいな話から
-->

---
layout: center
---

### 学習における負のループ

---

### 学習における負のループ

**学習における負のループ**とは下記のような状態  

1. キャリアが増えるにつれ、知らないといけないことが増えてくる気がする
2. 不安から技術的な発言や質問を控えるようになってしまう
3. 学習の機会が減る
4. 学習効率の悪化によって更にキャッチアップが難しくなる

業務が回せるようになった時期、知らないことを**質問する機会が減る**ので陥りやすい。

<!--
最初の関門だと思っているのが一人で業務を回せるようになった頃で、ある程度自分でできるようになるとインプットが減ってしまう。レビューとかがあればそこまで心配いらないけどレビューでの指摘事項とかが減ってきたタイミングもそうかも。
-->

---

### 負のループへの対処

自分が想像しているコミュニティのレベル感と自分自身のレベル感との乖離が原因  
「コミュニティのレベルを下げる」ということはできないので基本的に学ぶしかない

- インプットの習慣化で軽減できる（気がする）
- アウトプットの習慣化で軽減できる（気がする）
- どれだけ勉強しても質問はし忘れるし、アウトプットも怖いので諦める
- 恐怖心があるからこそきちんと調べてからアウトプットできる

<!--
上には上がいるのでアウトプットに慣れるしかない。
-->

---
layout: center
---

## 木こりのジレンマ

---

### 木こりのジレンマ

<img style="width:90%;" alt="目の前の作業をこなすのに精一杯で、効率化する余裕がない様子の例えである木こりのジレンマについての説明" src="https://cdn-ak.f.st-hatena.com/images/fotolife/u/unifa_tech/20210228/20210228123440.png">

※[【神様がいれば「ふりかえり」はいらない。 - ユニファ開発者ブログ】](https://tech.unifa-e.com/entry/2021/03/01/202443)より引用

<!--
有名な逸話で木こりのジレンマというものがある。（次のスライドで解説）
-->

---

### 木こりのジレンマ

**目の前の作業をこなすのに精一杯** で余裕がない状況  
先程とは違い中堅以降で起こりがちな現象だと思っています。

- 仕事に精一杯取り組むのは偉い
- 休み方や斧の研ぎ方を教えるのも仕事のうち
- 「業務が忙しくて勉強ができない」という理由づくりを（自分に）させない

学びと同時に業務の効率化と自動化を進めてチームに余裕を持たせないといけない。

<!--
いかに普段の業務だけでなく学ぶため（斧を研ぐ）ための時間を確保しているか。目の前のことに精一杯なのと目の前しか見えていないのは別で今の作業量ではなく未来の効率を重視するべきだと思っている。CI/CDの導入や無駄なルールをなくして極限までチームに余裕（Slack）を持たせないといけない。
-->

---
layout: center
---

## どう学ぶか

---

### 業務時間内で学ぶ習慣づけをする

いきなり業務時間外でも「バリバリコード書いてアウトプット」は正直敷居が高い。  
できないことを目標にしてはいけない、**できる範囲で確実に**

<v-clicks>

- 毎日30分、技術動向を追うために記事を見る
- 基礎知識を深めるために毎日MDNを読む
- 集中力が切れたらX（Twitter）を見る

</v-clicks>

<div v-click style="background-color: var(--color-bg-code-block);border-radius: 8px;padding: 1rem;margin-top:3rem;">
<p style="line-height:1;margin-bottom:1rem;">毎日30分学習している人とそうでない人では年間120時間程度の差が出る</p>
<pre>30(m) * 245(d) / 60(m) = 122.5(h) / 8(h) = 15.31(営業日)</pre>
</div>

<!--
人の話を聞くとかより、自分で調べることを推奨したい。120時間って結構な差じゃないですか？毎日継続していると自信がついてくる。
-->

---

### 必ず業務時間より先に学習時間を確保する

<div v-click>

**パーキンソンの法則 第一法則** より業務の空き時間で勉強することはできない。  
そのため、学習時間は業務時間よりも先に確保する必要がある。

> パーキンソンの法則とは、イギリスの歴史学者・政治学者であるシリル・ノースコート・パーキンソンが当時の行政組織を研究するなかで、組織・運営と人間の心理作用に関する非合理的な行動の分析を説いた法則を指す。
>
> パーキンソンの法則は以下の2つの法則から成り立つ。
>
> - 第一法則：「仕事の量は、完成のために与えられた時間をすべて満たすまで膨張する」
> - 第二法則：「支出の額は、収入の額に達するまで膨張する」

※ [パーキンソンの法則 | 三菱UFJリサーチ&コンサルティング](https://www.murc.jp/library/terms/ha/parkinsons-law/) より引用。

</div>

<!--
壺に岩と砂を入れる話をする。
-->

---

### アウトプットを行う

インプットの習慣がついたらアウトプットもする。  
アウトプットも絶対にできることから始めてみる。  
まずは、読んだ記事のURLとかをX（Twitter）や自分のtimesにポストするだけでいい。

<v-clicks>

- なるべくパブリックなチャンネルにポストする
- 読み始めにURLを貼って読みながらスレッドをつなげるとよい
- 記事以外にも業務の中で学んだことなどを書き留めておく

</v-clicks>

<div v-click style="border-radius: 8px;padding: 1rem;margin-top:3rem;">
<p style="line-height:1;margin-bottom:1rem;">（忘れるので）何かしらの形で <strong>学んだことを残しておく</strong></p>
</div>

---

### アウトプットを行う

[Zenn.dev](https://zenn.dev/)のスクラップ機能などもおすすめ。

![zenn.devのスクラップ機能画面のスクリーンショット 数件のスクラップ（投稿）が既に作成されている](/img/zenn-scrap.png)

---

### 習慣がついてきたら

習慣化ができてきたら、たまに質を上げてみる。

<div v-click>

#### インプット

- 社外の勉強会に参加してみる
- 難しめの技術書を買ってみる（オライリー・技評）

</div>

<div v-click>

#### アウトプット

- LTで話してみる
- 記事を書いてみる

</div>

<div v-click style="background-color: var(--color-bg-code-block);border-radius: 8px;padding: 1rem;margin-top:3rem;">
<p style="line-height:1;">💡 インプットの質を先に上げたほうがスムーズに進みやすい。</p>
</div>

<!--
オフラインの勉強会が敷居が高いなと思う人はとりあえずオンラインで見てみる。
-->

---
layout: center
---

# 何を学ぶべきか


---

## 3つの軸

勉強する対象は色々あるので分割してみる。

- 仕事に必要なこと
- エンジニアとしての基礎知識
- 自分が興味がある領域・技術

<!--
ひとまずはハードスキルに絞ってその中で分割してみます。
-->

---

### 仕事に必要なこと

おそらくみんなもうやってると思うので割愛

---

### エンジニアとしての基礎知識

OSの話であったり、プロトコルの話だったり、プログラミングパラダイムだったり。  
基礎知識があるかないかで学習効率がかなり変わってくる。

Reactを例にすると…

<div v-click style="background-color: var(--color-bg-code-block);border-radius: 8px;padding: 1rem;margin-top:1rem;margin-bottom:1rem;">
<ul style="margin:0;">
<li>Reactを学ぶ前に関数型言語の考え方を知っていると理解がかなり短縮される。</li>
<li>オブジェクト指向しか知らないでReactを触ると勘違いで挙動の理解に苦しむ。</li>
</ul>
</div>

<div v-click>

自分の進みたい先が分からない時はとにかく基礎を学ぶといい。

</div>

<!--
Tips集みたいなインプットばかりしてしまってなぜこのコードがこういう動きをするのかという原理原則が分からないまま暗記するのはアンチパターン、使う人から作る人にならないといけない。「〇〇行で〇〇を実装するコード」とかがあったらそこが何を行っているかを気にする癖をつける。
-->

---

### 自分の興味ある領域・技術

基礎を徹底的に学ぶのもいいが、興味ある分野が見つかったら調べてみるといい。  
小さな知識でも知っている人が少ない知識を持っていると凄そうに見える。  
インプットコストや前提知識は大きくなるが安定したポジションを取れるとリターンも大きい。

<v-clicks>

<div style="background-color: var(--color-bg-code-block);border-radius: 8px;padding: 1rem;margin-top:1rem;margin-bottom:1rem;">
<p style="line-height:1.5;">フロントエンドエンジニアで、領域としては${特定の技術領域}などをやってます。</p>
</div>

<div style="background-color: var(--color-bg-code-block);border-radius: 8px;padding: 1rem;margin-top:1rem;margin-bottom:1rem;">
<p style="line-height:1.5;">フロントエンドエンジニアで、${特定の技術領域}が好きです。</p>
</div>

最終的に**自信を持ってこういう挨拶**ができるように勉強を続ける。

</v-clicks>

<!--
フロントエンドの領域は広いので早めに自分の得意（好きな）分野を見つけたほうがいい。
-->

---
layout: center
---

## まとめ

---

### まとめ

- まずはインプットの習慣化を業務時間内で
- 学習時間は業務時間より先に確保しておく
- アウトプットも最小限でやってみる
- 慣れてきたら質を上げてみる
- 学ぶべきことが分からない時は、エンジニアとして抑えておくべきことを学ぶ
- 興味が湧く領域があったら自信を持って話せるまで学んでみる
