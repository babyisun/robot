# 我是一个有趣的小机机

> robot 

## ✨ 项目简介

本项目为 React 项目，使用 [Create React App 2](https://github.com/facebook/create-react-app) 搭建, 在CRA2的基础上定制化了webpack配置，并对ejcet后的config进行了深度优化,同时使用了[ns-common](http://xxx/ns-common)作为子模块。

使用到的技术栈为：

* [React](https://reactjs.org/)
* [Ant Design](https://ant.design/docs/react/introduce-cn)
* [Mobx](https://cn.mobx.js.org/)
* [React Router 4](https://github.com/ReactTraining/react-router)
* [Sass](https://github.com/webpack-contrib/sass-loader)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [webpack](https://webpack.docschina.org/concepts/)
* [jest](http://jestjs.io/docs/zh-Hans/getting-started)
* [nodejs](https://nodejs.org/)

## 🔨 开发构建

clone项目并安装依赖

```bash
`git clone --recursive http://github.com/babyisun/robot.git`
`npm install` or `yarn`
```

开发模式，运行项目

```bash
`npm start` or `yarn start`
```

如果clone下来发现lib缺少文件，执行如下命令

```bash
`cd robot`
`npm run lib:init` or `yarn lib:init`
```

子模块有更新时，拉取子模块文件

```bash
`npm run lib:pull` or `yarn lib:pull`
```

生产模式，构建项目

```bash
`npm run build` or `yarn build`
```

## ⚙️ 子模块

本项目需[ns-common](http://xxx/ns-common)作为子模块

拉取项目后初始化子模块

```bash
`npm run lib:init` or `yarn lib:init`
```

子模块有更新时，拉取子模块

```bash
`npm run lib:pull` or `yarn lib:pull`
```

**我们非常不建议你在业务项目中修改公共lib，如需修改请签出子项目进行修改，然后在业务项目中更新即可**

`git clone -b dev http://xxx/ns-common.git`

`git checkout -b ${yourname}`

修改你要修改的内容，因为是公共模块，要考虑修改的影响范围，建议修改前与使用者进行同步

`git push --set-upstream origin ${yourname}`

测试无误后merge到master分支


## 🔖 目录结构

```
├── README.md
├── build  --项目编译后的目录
├── config --webpack等配置文件目录
├── package-lock.json
├── package.json
├── public   --html模板目录
├── scripts  --npm脚本目录
├── lib --公共子模块
├── src
├── ├── setupProxy.js  --代理配置（原package.json中的proxy配置）
│   ├── index.scss  --公共样式文件
│   ├── App.js  --主业务入口
│   ├── components  --公共组件文件夹
│   ├── index.js  --SPA生成入口文件
│   ├── pages --页面文件夹
│   │   ├── Page1.jsx  --页面文件
│   │   ├── Page1.scss --页面文件样式表
│   ├── assets  --图片图标等资源文件目录
│   ├── stores  --项目自有公用store文件
│   │   ├── BaseStore.js
│   │   └── index.js
│   ├── themes --主题文件夹
│   │   ├── antd.less --ant design主题文件包
│   └── utils  --项目自有工具类
├── yarn-error.log
└── yarn.lock
```

## 📝 命名规范

组件以 [PascalCase](https://baike.baidu.com/item/PascalCase) 命名，文件夹中的组件与其 `.scss` 样式文件名称一致，同样以 PascalCase 命名，放置在文件夹第一层。

页面自有的组件文件夹命名为 `components`（复数，小写），`pages`（复数，小写），`store` 文件夹为pages对应的modal文件。
 
页面用到的公共资源文件（`assets`）、公共工具函数（`utils`）等，放置在 `src` 下建公共目录。

总之，遵循公共组件放置在公共位置，自有组件自组织的原则。

### 页面文件

**`src/pages`**

Good:

```
src
  pages
    pageA
      ComponentA.jsx
      ComponentA.scss
    pageB
      ListPage.jsx
      ListPage.scss
      ItemPage.jsx
      ItemPage.scss
```

Bad:

```
src
  pages
    PageA
      listPage // 文件夹字母大写
        index.jsx //首字母大写
        index.scss  //首字母大写
      ItemPage
        Index.jsx
        style.scss  //对应为Index.scss
      ListPage.jsx
      itemPage.jsx // 应使用 PascalCase
```

### 公共组件

**`src/components`**

本文件夹存放多个页面用到的公共组件，相关公共组件建议存放在一个单独文件夹，与pages文件夹规范一致，组件名称须与其 `.scss` 样式文件名称一致，如需 `store` 可以引入对应文件，以 [PascalCase](https://baike.baidu.com/item/PascalCase) 命名

Good:

```
src
  componenents
    Common
     ComponenetA.jsx
     ComponenetA.scss
     store.js
    ModalFirst
     ModalFirstB.jsx
     ModalFirstB.scss
     store.js
```

Bad:

```
src
  componenents
    ComponenetA.jsx // 不应该全部都堆在根目录
    ComponenetA.scss
    ComponenetAStore.js
    ComponenetB.jsx
    ComponenetB.scss
    ComponenetBStore.js
    
    common // 文件夹首字母大写
     ComponenetD.jsx
     componenetd.scss // 应使用 PascalCase
```

### 工具函数

**`src/utils`**

本文件夹存放该项目的公用工具函数，建议是[纯函数](https://zh.wikipedia.org/wiki/%E7%BA%AF%E5%87%BD%E6%95%B0)，函数文件以 [camelCase](https://baike.baidu.com/item/camelCase) 命名。

Good:

```
src
  utils
    fnA.js
    fnB.js
```

Bad:

```
src
  utils
    FnA.js // 应使用 camelCase
    helloword.js // 应使用 camelCase
    fnB.jsx // 应使用 `.js` 文件
```
