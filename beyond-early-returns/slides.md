---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# 型ガードの先に何があるのか
[@Mita.ts #6](https://mitats.connpass.com/event/353424/)

---
src: "../reuse/me.md"
---

---
layout: section
---

## 型ガード

---
layout: section
---

### 型ガードがされている＝良いUIか

---

### 型ガードがされている＝良いUIか

```tsx
const UserInfo:FC = () => {
  const { data, status } = useUserData();

  if (status !== 'success' || data == null) {
    return null;
  }

  return <div>{/* ... */}<div>
}
```

悪くはない、TypeErrorは発生しなさそう。

<!--
データ取得とUIの表示を表現しようとするとこのようなコードを書くことがあるような気がします。
これはエラーが起きない（特にTypeError）ので悪いコードではなさそう、でもいいコードでもないと思います。
-->

---

### 型ガードがされている＝良いUIか

```tsx
const ErrorNotice = ({ children, isError, onRetry }) => {
  return (
    <>
      {isError &&
        createPortal(
          <dialog open>
            <h2>データの取得に失敗しました</h2>
            <button type="button" onClick={onRetry}>再読込み</button>
          </dialog>,
          document.body
        )}
      {children}
    </>
  );
};
```

---

### 型ガードがされている＝良いUIか

```tsx
const UserInfo:FC = () => {
  const { data, status } = useUserData();

  if (status === 'loading' || data == null) {
    return null;
  }

  return (
    <ErrorNotice isError={status === 'error'}>
      <div>{/* ... */}<div>
    </ErrorNotice>
  )
}
```

---

### 型ガードがされている＝良いUIか

```tsx{4,9,11}
const UserInfo:FC = () => {
  const { data, status } = useUserData();

  if (status === 'loading' || data == null) {
    return null;
  }

  return (
    <ErrorNotice isError={status === 'error'}>
      <div>{/* ... */}<div>
    </ErrorNotice>
  )
}
```

---

### 型ガードがされている＝良いUIか

```tsx
const UserInfo:FC = () => {
  const { data, status } = useUserData();

  if (status === 'loading' || data == null) {
    return <Loading />;
  }

  return (
    <ErrorNotice isError={status === 'error'}>
      <div>{/* ... */}<div>
    </ErrorNotice>
  )
}
```

---
layout: section
---

## 型ガードは最低限でしかない

---
layout: section
---

## 型ガードがあってもUIは良くならない

---
layout: section
---

## どうする？

---

### Reactコンポーネントの`null`

- とりあえずで返していいものではない
- 何も描画しないという宣言

汎用UIとしての通信エラーダイアログやローディングアイコンは必要

非同期処理が絡む部分は失敗する可能性を常に考えておきたい。

---
layout: section
---

## （おまけ）エラー処理

---

### エラー処理

```tsx{8}
const ErrorNotice = ({ children, isError, onRetry }) => {
  return (
    <>
      {isError &&
        createPortal(
          <dialog open>
            <h2>データの取得に失敗しました</h2>
            <button type="button" onClick={onRetry}>再読込み</button>
          </dialog>,
          document.body
        )}
      {children}
    </>
  );
};
```

---

### エラー処理

```tsx
const UserInfo:FC = () => {
  const { data, status, refetch } = useUserData();
  // Loading ...
  return (
    <ErrorNotice isError={status === 'error'} onRetry={refetch}>
      <div>{/* ... */}<div>
    </ErrorNotice>
  )
}
```

- ブラウザでreloadするとすべてのデータを再取得
- リトライボタンでリロードしたらAPI呼び出しのみ
