# ⚙️ 公共子模块 - 轮子

> NS-Common

## ✨ 项目简介

本项目为 对一些工具类、公共组件、底层架构文件的一些抽离，不建议单独运行，需使用submudule(子模块)与业务项目进行连接。

## 🔨 关联方法

初始化关联

`git clone http://xxx/xxx/业务项目.git`

`git submodule add http://xxx/ns-common.git lib`

拉取方法

`git clone --recursive http://xxx/xxx/业务项目.git` 

or 

`git clone http://xxx/xxx/业务项目.git`

`cd ./业务项目根目录`

`git submodule update --init`


公共项目更新后，在父项目重新拉取所有子模块

`git submodule foreach git pull origin master`

## ⌨️ 修改与更新

**我们非常不建议你在业务项目中修改公共lib，如需修改请签出子项目进行修改，然后在业务项目中更新即可**

`git clone -b dev http://xxx/ns-common.git`

`git checkout -b ${yourname}`

修改你要修改的内容，因为是公共模块，要考虑修改的影响范围，建议修改前与使用者进行同步

`git push --set-upstream origin ${yourname}`

测试无误后merge到master分支

#### 增加快捷入口

建议在业务项目的package.json目录中加入如下快捷命令

初始化：`"lib:init": "git submodule update --init"`

更新子模块：`"lib:pull": "git submodule foreach git pull"`

然后即可执行
`yarn lib:init` or `yarn lib:pull`
进行子模块初始化与更新子模块

## 🔖 目录结构

```
├── README.md
├── components  --公共组件文件夹
├── mobx  --结合mobx的路由封装，基类
├── page  --公共页面
├── components  --公共函数库
└── .eslintrc --代码规范
```

## 📝 命名规范

以 [PascalCase](https://baike.baidu.com/item/PascalCase) 命名，文件夹中的组件与其 `.scss` 样式文件名称一致，同样以 PascalCase 命名，放置在文件夹第一层。

页面自有的文件夹命名为 `components`（公共组件），`page`（公共页面），`mobx`（基类、路由封装）`utils`（工具函数）

`components`和`page`内命名以小写文件夹进行模块区分，内部建议使用`index.jsx`和`index.scss`作为默认入口

`mobx`和`utils`建议使用PascalCase命名的`*.js`文件，`utils`中建议使用[纯函数](https://zh.wikipedia.org/wiki/%E7%BA%AF%E5%87%BD%E6%95%B0)

总之，遵循去中心化原则，每个组件只在自己文件夹内定义。
