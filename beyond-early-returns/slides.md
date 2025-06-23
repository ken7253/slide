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

## 型安全

---
layout: section
---

## 型安全＝安心？

---
layout: section
---

### 型安全はユーザーに安心を届けるのか？

---

### 型安全はユーザーに安心を届けるのか？

```tsx
const UserInfo:FC = () => {
  const { data, status } = useUserData();

  if (status !== 'success' || data == null) {
    return null;
  }

  return <div>{/* ... */}<div>
}
```

---

### 型安全はユーザーに安心を届けるのか？

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

### 型安全はユーザーに安心を届けるのか？

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

### 型安全はユーザーに安心を届けるのか？

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

### 型安全は本当に安全ですか？

```tsx
const UserInfo:FC = () => {
  const { data, status } = useUserData();

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <ErrorNotice isError={status === 'error' || data == null}>
      <div>{/* ... */}<div>
    </ErrorNotice>
  )
}
```

