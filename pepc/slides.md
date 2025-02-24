---
theme: default
titleTemplate: '%s - ken7253'
colorSchema: 'dark'
fonts:
  sans: 'M PLUS 2'
  mono: 'M PLUS 1 Code'
---

# PEPCは何を変えようとしているのか

---
src: "../reuse/me.md"
---

---
layout: section
---

## 現在のブラウザにおける権限管理

---

## 現在のブラウザにおける権限管理

<img alt="Google Mapでの例画面右下にある位置情報のボタンをクリックすると反対側でプロンプトが起動している画面をスクリーンショットで表している" src="https://github.com/WICG/PEPC/raw/main/images/image2.png" width="650" style="display: flex; margin: auto;" />
<em style="font-size: 16px;">Chromeの場合、権限が必要なAPIが呼ばれるとオムニボックスの下にプロンプトが現れユーザーに許可を求める。</em>

---

## 現在のブラウザにおける権限管理

> Many user agents implement a "permanent deny" policy, and other user agents offer it as an option in the permission prompt. This means that a site will not be able to ask for permission again after the user has blocked it.

ユーザーが許可するまでプロンプトを出し続けるというスパムができないように、一度拒否した権限リクエストはアプリケーション側から再度リクエストができないようになっている。

https://github.com/WICG/PEPC/blob/main/explainer.md#user-agent-abuse-mitigations

---
layout: section
---

## 権限のリクエスト方式

---

## 現在のパーミッションリクエスト

```mermaid
sequenceDiagram
    participant Application
    participant Browser
    Actor User
    Application--)Browser: 権限のリクエスト
    Browser--)User: プロンプトを表示

    alt 許可
    User--)Browser:権限を許可
    Browser--)Application: アクセスの許可
    Application->>User: 機能の提供
    else 拒否
    User--)Browser:権限を拒否
    Browser--)Application: アクセスの拒否
    Application--xBrowser: 権限のリクエスト
    Note over Browser: 同じ権限は再度リクエストできない
    end
```

---

## PEPCでは

```mermaid
sequenceDiagram
    participant Application
    participant Browser
    Actor User
    User->>Browser: Permission要素をクリック
    Note over User,Browser: ユーザー側から事前に許可を与える
    Browser->>Application: アクセスの許可
    Application->>User: 機能の提供
```

---
