# React 单页应用模板

React 应用模板，用于个人项目的基座，免去每次初始化项目的繁琐过程，使用的框架/库包括 React、TypeScript、TailwindCSS、Pure React Router、Ant Design、AHooks，依赖管理工具为 PNPM，构建工具为 Rsbuild，具备 Jest 单测和 React Testing Library 组件测试能力，支持 Github Actions 部署，Github Pages 访问。

## 相关仓库

| 仓库名         | 仓库地址                                     | 说明               |
|----------------|----------------------------------------------|--------------------|
| vue-template | https://github.com/lexmin0412/vue-template | vue 单页应用模板 |

## 技术栈

- React V18
- TypeScript V5
- TailwindCSS V3
- Pure React Router V0
- Ant Design V5
- AHooks V3
- PNPM V7
- Rsbuild V1
- Jest V29

## 搭建步骤

此模板的搭建步骤如下，记录下来用于后续其他项目的开发。

### 1. 初始化空间

通过 Rsbuild 官方脚手架来初始化应用模板。

```bash
npx create-rsbuild
```

依次输入目录名、选择 React、选择 TypeScript，然后 `cd` 进入目录，通过 `code .` 打开目录。

### 2. 配置 npm 源

在根目录创建 `.npmrc` 文件，然后填入以下内容：

```bash
registry=https://registry.npmmirror.com/
```

### 3. 安装依赖

使用 pnpm 安装依赖：

```bash
pnpm install
```

### 4. 初始化 Git 配置

```
git init
git remote add origin git@github.com:lexmin0412/react-template.git
git add .
git commit -m 'feat: init project'
git push -u origin master
```

### 5. TypeScript 配置调整

配置文件调整:
- 删除 tsconfig.node.json, 并去除 tsconfig.json 中对它的引用。—— 没必要
- 将 compilerOptions.moduleResolution 选项值改为 `"Node"` —— 解析JSX
- 添加 `allowSyntheticDefaultImports` 选项并设置为 true —— 确保 `import React from 'react'` 不会报错

代码调整:
- 去除 main.tsx 中对 App 文件引用的后缀：`import App from './App.tsx` => `import App from './App`


做完以上调整的 tsconfig.json 文件完整内容：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "Node",
	 "allowSyntheticDefaultImports": true,
	 "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
}
```

### 6. 初始化 Github Actions 配置

#### 6.1 修改 baseURL

在 `rsbuild.config.ts` 中添加如下配置：

```ts
export default defineConfig({
  server: {
    base: '/react-template'
  }
})
```

#### 6.2 添加 Github Actions 配置文件

在根目录新建 .github/workflows 文件夹，并新建 `deploy.yml` 文件，填入如下内容：

```yaml
name: Deploy Site to Pages

on:
  push:
    branches: [master]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Not needed if lastUpdated is not enabled
      - uses: pnpm/action-setup@v2 # pnpm is optional but recommended, you can also use npm / yarn
        with:
          version: 8
          cache: pnpm
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Install dependencies
        run: pnpm install
      - name: Build with Rsbuild
        run: |
          pnpm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: dist

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2

```

其中，`on.push.branches` 表示触发 action 的分支，选择初始化 Git 时使用的分支即可。

#### 6.3 在 Github 上添加配置

##### 获取 token

进入 Github 点击右上角头像，进入 Settings => Developer Settings => Personal access tokens => Tokens(classic) => Generate new token，保存生成的 token。

##### 设置 token

进入 repo 页面，进入 Settings => Secrets and variables => Actions => New repository secret，命名为 ACCESS_TOKEN（配置文件中的 `secrets.` 后面的 key ），值为刚刚生成的 token。

#### 6.4 推送代码，查看效果

推送代码到 master，查看 repo 的 Actions 面板，等待 CI 流程执行完毕后，进入 Settings => Pages，稍等片刻（一两分钟）后，上方就会出现类似如下的文案：

```txt
Your site is live at https://lexmin0412.github.io/react-template/
```

点击链接即可访问，后续只要推送代码，就会触发 action 重新部署。

### 7. 设置为模板仓库

进入 repo 页面，进入 Settings => General, 把 `Template repository` 一项勾上即可，再次切换到 repo 的默认页面，就会出现 `Use this template` 按钮，可以基于此创建一个新仓库。

### 8. 添加 tailwindcss 支持

#### 8.1 安装依赖

```shell
# 安装依赖
pnpm add tailwindcss postcss autoprefixer -D
# 初始化配置文件
npx tailwindcss init -p
```

执行完成后，根目录会新增 `tailwind.config.js` 和 `postcss.config.js` 两个文件。

#### 8.2 修改配置文件

在 `tailwind.config.js` 中添加如下内容，使对应的文件能够被 tailwind 识别。

```ts
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

#### 8.3 引入基础类

在入口 css 文件的顶部添加如下内容，这是书写 `tailwind` class 的基础。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 8.4 添加 tailwind 类名，查看效果

在 html 标签上添加一个类名，即可看到效果：

```html
<h1 className="bg-blue">
  Hello world!
</h1>
```

现在我们可以用 `tailwindcss` 来控制绝大部分的样式，`index.css` 和 `App.css` 文件中的样式可以全部删除掉了。

### 9. 接入 pure-react-router, 添加路由支持

> [为什么不使用 react-router-dom ?](https://github.com/lexmin0412/pure-react-router?tab=readme-ov-file#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89-pure-react-router)

#### 9.1 安装依赖：

```shell
pnpm add pure-react-router
```

#### 9.2 创建、配置路由

新建 `src/routers/index` 文件，添加如下内容:

```tsx
import {
  Link
} from "pure-react-router";
import App from "../App";

export const routes = [
  {
    path: "/",
    component: () => <App />,
  },
  {
    path: "/about",
    component: () => (
      <div>
        <div>About</div>
	    <div>
          <Link className="cursor-pointer" to='/' >回到首页</Link>
        </div>
      </div>
    ),
  },
]
```

#### 9.3 替换入口

将入口文件 `main.tsx` 中引用的最外层组件替换为 `<BrowserRouter />`, `routes` 属性设置为上面声明的 `routes` 数组。

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route } from "pure-react-router";
import { routes } from './routers';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter routes={routes} basename="/">
      <Route />
    </BrowserRouter>
  </React.StrictMode>,
)
```

### 10. 引入 Ant Design

#### 10.1 安装依赖

时间相关的组件要用到 dayjs, 顺便一起安装了。

```shell
pnpm add antd dayjs
```

#### 10.2 国际化

AntD 的默认语言是英文，要切换为中文时需要进行国际化配置。

在入口组件的最外层嵌套 `ConfigProvider`, 添加 locale 配置:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import router from "./routers";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
```

放到路由容器外层的原因是路由容器组件中也可能会用到 Antd组件（例如弹窗）。

#### 10.3 配置主题

AntD V5 采用了 DesignToken 设计，配置主题非常简单。

上面在国际化中已经引入了 `ConfigProvider` 组件，这一步中使用它来修改主题色，给入口文件的 ConfigProvider 添加 theme 属性：

```tsx
// main.tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: "#ff4a4a",
    },
  }}
>
```

`token.colorPrimary` 即为整个系统的主题色。如果要修改其他属性，请查看 [官方文档](https://ant.design/docs/react/customize-theme-cn)。

#### 10.4 规避 tailwind 的样式覆盖

tailwind 的基础类中对标签默认样式进行了重置，会影响 AntD 组件的基础样式，所以我们需要把入口中的基础类引用去掉：

```css
/* @tailwind base; */  // 干掉这一行
@tailwind components;
@tailwind utilities;
```

### 11. 添加自动化测试支持

#### 11.1 安装 jest

```shell
pnpm add jest @types/jest @jest/types
```

#### 11.2 初始化 jest 配置文件

```shell
npx jest --init
```

按照下面的示例依次选择：
- add running test script —— yes
- use TypeScript —— yes
- test environment —— jsdom(browser-like)
- add coverage reports —— no
- provider -- babel
- clear -- yes

完成选择后，将会在根目录初始化 `jest.config.ts` 文件。

#### 11.3 配置 babel

由于在 proivder 项选择了 babel，所以需要安装 babel 相关依赖：

```shell
pnpm add babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript -D
```

然后新增 `babel.config.cjs` 文件：

```js
// ./babel.config.cjs
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react",{ runtime: "automatic" }], // 自动导入react
    "@babel/preset-typescript",
  ],
};
```

文件后缀为 `.cjs` 是因为 `package.json` 中的 `type` 为 `"module"`

#### 11.4 安装附加依赖

根据以上的配置，还需要安装以下依赖：

```shell
pnpm add ts-node jest-environment-jsdom -D
```

原因：

- jest 在编译 ts 时使用了 ts-node 进行编译
- 初始化配置时 test enviroment 选择了 jsdom, 所以 jest-environment-jsdom 需要手动安装

#### 11.5 特殊文件格式支持

`jest.config.ts` 中添加如下内容：

```ts
export default {
  transform: {
		// 声明额外扩展名识别转换器：jest 不知道如何加载除 js/jsx 之外的其他扩展名
    "^.+.(js|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
		// mock 自定义 svg 转换
		"^.+.svg$": "<rootDir>/scripts/svg-transform.js",
  },
};
```

其中，引用的 `scripts/svg-transform.js` 文件内容如下：

```js
export default {
  process() {
    return { code: "module.exports = {};" };
  },
  getCacheKey() {
    return "svgTransform"; // SVG固定返回这个字符串
  },
};
```

#### 11.6 CSS 代理

先安装代理库：

```shell
pnpm add identity-obj-proxy
```

在 jest.config.ts 中添加如下配置：

```ts
export default {
  moduleNameMapper: {
		// 告诉 Jest 将此对象模拟为导入的 CSS 模块
    "\.(css|less)$": "identity-obj-proxy"
  }
};
```

### 12. 配置 React Testing Library

#### 12.1 安装相关依赖

```shell
pnpm add @testing-library/jest-dom @testing-library/react @testing-library/user-event -D
```

#### 12.2 全局导入 `@testing-library/jest-dom`

在 jest.config.ts 中添加如下依赖：

```ts
export default {
  // ... other config
  setupFilesAfterEnv: ["<rootDir>/scripts/jest-dom-setup.js"],
};
```

新建 `scripts/jest-dom-setup.js` 文件，填入如下内容：

```js
import '@testing-library/jest-dom'
```

#### 第一个测试用例

新建 `src/App.test.tsx`, 填入以下内容：

```tsx
// 这里文件后缀修改为 tsx，因为需要测试 dom
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("test", () => {
  test("first unit test", () => {
    render(<App />);
    expect(screen.getByText("Rsbuild + React")).toBeInTheDocument();
  });
});
```

### 13. 引入 ahooks

为了能够做到开箱即用，引入 ahooks 提供大量的常用 hooks，如 `useRequest`。

```shell
pnpm add ahooks
```
