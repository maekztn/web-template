# My web template

## overview
[Vite](https://ja.vitejs.dev/) を使用したweb templateです。

## init
```
npm i
```

## develop
```
npm run dev
```

## build
distに出力
```
npm run build
```

## preview
distに出力し、distの内容をserveします
```
npm run build
npm run preview
```

## ファイル構成
```
.
├── includes // ビルド時にhtml上で呼び出すinclude用ejsファイル
├── public // ビルド時にそのまま吐き出すファイル 画像等
└── src // htmlファイルや
    ├── assets
    │   ├── scripts
    │   │   ├── modules
    │   │   └── pages // 各htmlで呼び出すファイル
    │   │       ├── common.ts
    │   │       ├── [下層ページ]
    │   │       │   └── index.ts
    │   │       └── index.ts
    │   └── styles
    │       ├── abstracts // scss変数等
    │       ├── base // 共通スタイル等
    │       ├── components
    │       ├── layout // 共通レイアウトスタイル
    │       ├── main.scss // 全ページで読み込むcss
    │       ├── pages // 各htmlで読み込むファイル
    │       │   ├── [下層ページ]
    │       │   │   └── style.scss
    │       │   └── index
    │       │       └── style.scss
    │       └── utils // ユーティリティースタイル
    ├── [下層ページ]
    │   └── index.html
    └── index.html
```
