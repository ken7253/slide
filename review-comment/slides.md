---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# レビューのやり方を（ちょっと）整理した話
@[IVRyエンジニア忘年LT大会2024](https://connpass.com/event/333537/)

---
src: "../reuse/me.md"
---

---
layout: section
---

## みなさん！レビューしてますか？

---
layout: section
---

## レビューは大変

---
layout: center
---

<p style="font-size: 2rem;">レビュープロセスを見直す機会があったのでその紹介</p>

---

## レビューコメントのラベル

レビューコメントには必ずラベルを付けてもらう運用にしていてた。

| ラベル   | 意味                                         |
| -------- | -------------------------------------------- |
| Must     | 必ず直してほしい箇所                         |
| IMO      | 任意だが自分ならこうする的な意見             |
| NITS     | 直さなくても問題ないが修正したほうが良い箇所 |
| Question | 質問                                         |

- 導入当初は分かりやすくていい印象
- チームでコミュニケーションをしていると改善点が見つかる

---

## レビューコメントのラベル

導入からしばらく経っていたのでちょっと整理してみることに

問題点はなんとなく候補があったので、ドキュメントを書いてチームに共有してみた。

---

## 問題点について

- IMOとNITSの使い方が人によって異なる
- Questionが多用され着地点が分からないコメントがある

<img src="/image/review.png" width="400" style="margin: 64px 0 0 auto; mix-blend-mode: plus-lighter;" alt="人によって利用するラベルが違うことを表した図">

<!-- https://excalidraw.com/#json=3cnobLM0GllkyPjPMpGhp,vWhkxvfQSR1z7fckyMVVaA -->

---
layout: center
---

## 改善しよう

---

### IMOとNITSの変更要望度が人によって異なる

話し合うと、ラベルは変更してほしい度合いで使い分けていたことが分かった。

なのでざっくり下記のような対応を行うことに。

#### IMOとNITSの変更要望度が人によって異なる 

- ラベルの使い分けを変更要望度を軸としたものに
- レイヤーが分かれるようにラベルを定義する

#### Questionが多用され着地点が分からないコメントがある

- 質問っぽい指摘を無くす
- 質問としてコメントされた場合はコードの変更はしない

---

### IMOとNITSの変更要望度が人によって異なる

<img src="/image/label.png" style="background-color: rgb(51 51 51 / 70%);padding: 32px;margin-top: 16px;border-radius: 16px;" alt="ラベルの整理を表した図、Must/IMO/NITS/Questionがバラバラから、Must/Want/IMO or NITS/Askという順になっている">

<!-- https://excalidraw.com/#json=JdU3mJdujM7nVJ8mr9tjw,lWGc1uSH_X9UrSXUQH6pjQ -->

変更要望度に合わせてラベルを整理してみた。

---

### IMOとNITSの変更要望度が人によって異なる

ある程度整理できたので、変更要望度を軸にドキュメントに記載。

| ラベル     | 変更要望度 | 利用シーン                                       |
| ---------- | ---------- | ------------------------------------------------ |
| Must       | 100%       | 明らかなバグ・仕様と実装の乖離・ガイドライン違反 |
| Want       | 99%-50%    | パフォーマンスや可読性など非機能要件的な指摘     |
| IMO / NITS | 49%-1%     | （主観的な）より良い書き方の提案                 |
| Ask        | 0%         | 質問                                             |

どういった場面で利用するのかなどもある程度書いておく。

---
layout: center
---

## Questionが多用され着地点が分からないコメントがある

---

## Questionが多用され着地点が分からないコメントがある

純粋な質問まで禁止してしまうのは厳しいのでラベルは残すことになった。

その上で指摘は指摘として他のラベルを使ってもらうように。

- 難しそうな実装部分はモブレビューを実施してそのログを残す
- 「大丈夫そうですか？」みたいな変更を期待した質問はNGに
- レビューコメントの書き方を工夫して「質問っぽい指摘」になるのを避ける

<img src="/image/question.png" alt="" width="400" style="margin: 0 0 0 auto">

---

### [おまけ] 質問っぽい指摘を避けるための書き方

- 前提として自分の認識
- 前提が正しかった場合にどのような懸念があるか
- それを解決する方法

<div style="background-color: var(--color-bg-code-block);border-radius: 8px;padding: 1rem;margin-top:32px;">
<p style="line-height:1;"></p>
</div>

---

## まとめ

- レビューのラベルは変更要望度を基準に整理するといい
- 質問っぽい指摘は避けてなるべく具体的にコメントを書く
