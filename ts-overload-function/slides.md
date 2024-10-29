---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# オーバーロード関数の話
@[Mita.ts #2](https://mitats.connpass.com/event/329494/)

---
src: "../reuse/me.md"
---

---
layout: section
---

## オーバーロード関数使ってますか？

---

## オーバーロード関数 is 何？


関数のシグネチャーを複数宣言できる機能

<div style="background-color: var(--color-bg-code-block);border-radius: 8px;padding: 1rem;margin:1rem 0;">
<h3 style="line-height:1;font-size:1rem;">📒 シグネチャー</h3>
<p style="padding:0.5rem 0 0 1.75rem;line-height:1;">関数名・引数の型・返り値の型をまとめた情報のこと。</p>
</div>  

- 関数宣言(`function`)のみで利用可能。
- 引数の型に応じて返り値の型を変えることができる。
- Conditional types を使わないので記述が分かりやすい。



---

## オーバーロード関数 is 何？

こういう感じに定義する。

```tsx twoslash
// シグネチャーのパターンを定義
export function foo(): void;
export function foo(value: number): number;
export function foo(value: string): Error;

// 全てのシグネチャーを満たすように関数を実装
export function foo(value?: number | string): void | number | Error {
    if (typeof value === 'number') {
        return value * 2;
    } else if (typeof value === 'string') {
        return new TypeError('invalid Type');
    };
    console.log("void");
};
```

---
layout: section
---

<div aria-label="考える顔" style="font-size: 10rem;">🤔</div>

---
layout: section
---

## 何が嬉しいんだ…？

---

### オーバーロード関数の使いどころ

例として、任意のオブジェクトをマージする処理を実装したとする。

```ts
function merge(obj1: Obj1, obj2: Obj2): Record<string, unknown>;
function merge(obj1: Obj1 | null, obj2: Obj1 | null): Error | Record<string, unknown>;
function merge(
  obj1: Obj1 | null,
  obj2: Obj1 | null
): Error | Record<string, unknown> {
  // マージ処理を実装
};
```

こうすると関数の利用者側に２つの選択を提示できる。

- 先にオブジェクトの存在チェックを行って安全な状態で渡してもらう。
- とりあえず値を突っ込んで後でエラーハンドリングを行う。

<div style="background-color: var(--color-bg-code-block);border-radius: 8px;padding: 1rem;margin:1rem 0;">
<p style="line-height:1;">存在チェックを行えば返り値から <code>Error</code> 型が除去される。</p>
</div>

---
layout: section
---

## 設計時の注意点

---

## 設計時の注意点


### 💡 神関数にならないように

- 小さいことをうまくやる
- オーバーロードは最小限で


### 💡 型推論のコストに注意

- オーバーロード関数とパターンマッチでTSが型推論を諦めた


### 💡 理由なく使っていいわけではない

- ジェネリクスや単純なunion型で解決できる場合が多い
- [サバイバルTypescript｜オーバーロード以外も検討しよう](https://typescriptbook.jp/reference/functions/overload-functions#%E3%82%AA%E3%83%BC%E3%83%90%E3%83%BC%E3%83%AD%E3%83%BC%E3%83%89%E4%BB%A5%E5%A4%96%E3%82%82%E6%A4%9C%E8%A8%8E%E3%81%97%E3%82%88%E3%81%86)

---
layout: image
image: /img/kansai-tskaigi.png
---

<div style="position:fixed;top:60%;left:73%;">
<div style="display:flex;flex-direction:column;align-items:center;" >
<QRCode text="https://peatix.com/event/4149743"/>
<p>チケット購入はこちら！</p>
</div>
</div>
