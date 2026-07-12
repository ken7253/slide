---
theme: ../theme-browser-and-ui
titleTemplate: '%s - ken7253'
layout: intro
---

# Browser and UI #4

---
src: "../theme-browser-and-ui/me.md"
---

---
src: "../theme-browser-and-ui/description.md"
---

---
layout: intro
---

# File System Access APIについて

---
layout: section
---

## デモ！

---

## File System Access API

- ローカルファイルをブラウザ上から操作可能に
  - ファイルの作成・削除
  - ディレクトリの作成・削除

---

![](/img/developer.chrome.com_docs_capabilities_web-apis_file-system-access_hl=ja.png)


---
layout: section
---

## ブラウザの互換性

---
layout: two-cols-header
---

### ブラウザの互換性

::left::

![](/img/FileSystemHandle.png)

::right::

![](/img/FileSystemFileHandle.png)

---
layout: section
---

## 使えそう…？

---

![](/img/mdn_window_showDirectoryPicker.png)

<v-click>
  <div style="position: absolute;bottom:0;left:0;width:100%;background-color: var(--theme-c-background);border: solid 3px var(--theme-c-text);">
    <p style="padding:16px 2rem;">ローカルファイル選択の起点となるpickerはChromeにしか実装されていない。</p>
  </div>
</v-click>

<v-click>
<span v-motion :initial="{ rotate: 0, x: 30 }" :enter="{ rotate: 10, x: 0 }" style="position: absolute;bottom:50px;right:2rem;z-index:10;font-size:8rem;rotate: 10deg;" role="img" aria-label="考える顔">🤔</span>
</v-click>

---
layout: section
---

## どう使うのか

---

## オリジンプライベートファイルシステム(OPFS)

![](/img/developer.mozilla.org_ja_docs_Web_API_File_System_API_Origin_private_file_system.png)

<v-click>
  <div style="position: absolute;bottom:0;left:0;width:100%;background-color: var(--theme-c-background);border: solid 3px var(--theme-c-text);">
    <p style="padding:16px 2rem;">OPFSはすべてのブラウザで実装が行われており、利用可能。</p>
  </div>
</v-click>

---

## オリジンプライベートファイルシステム(OPFS)

- ファイルシステムライクなローカルストレージ
- 実態はブラウザが管理しExplorer,Finder等からは見えない
- 特別なセキュリティチェックが不要なので高速
- localstorageと同じくブラウザ毎に容量制限が存在

---
layout: section
---

## ユースケースはあるのか

---

## ユースケースはあるのか

あるにはあるが、ローカルファイルを触れないので限定的

- ファイルのダウンロード前にちょっとした編集処理を挟みたい場合
- 複数ファイルのダウンロード時のキャッシュとして
- クライアント側でデータを作れるのでキャッシュの混同などがない

<!--
キャッシュの混同の話、サーバー側にはテンプレートファイル的なものを用意しておいてクライアントサイドで実際のファイルを組み立てるとかするとテンプレートファイルは常に静的にできてキャッシュしやすく、ユーザー側にあるデータで組み立てられば見れては行けないデータがダウンロードされる心配もない。
-->

---
layout: section
---

## まとめ

---

### まとめ

- ローカルファイルを触れるのはChromeのみ
- Chromeでもローカルファイルを触るのは避けたほうがよいかも
- オリジンプライベートファイルシステムは複数ブラウザで利用可能
- 刺さるタイミングは少ないが、使えないことはない
- パフォーマンスやセキュリティ面・データモデルとして使いやすいかも？