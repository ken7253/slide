---
theme: default
titleTemplate: '%s - ken7253'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# slide sample

sample

---
src: "../reuse/me.md"
---

---

## 見出し2

- foo
- bar

1. foo
2. bar

### 見出し3

#### 見出し4

てすとてすと`slidev`てすと

~~てすとてすと~~

---

```ts
import path from "node:path";
import { readdir } from "node:fs";

type Foo = {
  dirList: string[];
}

// exec
(() => {
  const dirList = readdir(path.join(process.cwd(), 'src'));
})();
```

てすとてすとてすと  
*てすとてすとてすと*  
**てすとてすとてすと**

---

## てすと

| Header | Header | 見出し |
| ------ | ------ | ------ |
| Sell   | Sell   | セル   |
