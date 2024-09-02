---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# オーバーロード関数の話
@どこか

---
src: "../reuse/me.md"
---

---
layout: section
---

## オーバーロード関数使ってますか？

---
dragPos:
  foo: Left,Top,Width,Height,Rotate
---

## オーバーロード関数 is 何？

こういう感じに定義する。

```tsx twoslash
export function foo(): void;
export function foo(value: number): number;
export function foo(value: string): Error;

export function foo(value?: number | string): void | number | Error {
    if (typeof value === 'number') {
        return value * 2;
    } else if (typeof value === 'string') {
        return new TypeError('invalid Type');
    };
    console.log("void");
};
```
