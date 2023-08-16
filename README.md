# React 单页应用模板

此模板的搭建步骤如下。

## 搭建步骤

### 1. 初始化空间

通过 vite 官方脚手架来初始化应用模板。

```bash
npx create-vite
```

依次输入目录名、选择React、选择TypeScript，然后 `cd` 进入目录，通过 `code .` 打开目录。

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

在 `vite.config.ts` 中添加如下配置：

```ts
export default defineConfig({
	base: '/react-template/'
})
```

#### 6.2 添加 Github Actions 配置文件

在根目录新建 .github/workflows 文件夹，并新建 `deploy.yml` 文件，填入如下内容：

```yaml
name: Deploy
on:
  push:
    branches:
      - master

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2
      with:
        persist-credentials: false

    - name: Install and Build
      run: |
        npm install pnpm@7.24.0 -g
        pnpm install
        pnpm build

    - name: Deploy
      uses: JamesIves/github-pages-deploy-action@releases/v3
      with:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BRANCH: gh-pages
        FOLDER: dist
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

### 9. 接入 react-router, 添加路由支持

#### 9.1 安装依赖：

```shell
pnpm add react-router-dom
```

#### 9.2 创建、配置路由

新建 `src/routers/index` 文件，添加如下内容:

```tsx
import {
  createBrowserRouter,
	Link
} from "react-router-dom";
import App from "../App";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/about",
      element: (
        <div>
          <div>About</div>
					<div>
						<Link className="cursor-pointer" to='/' >回到首页</Link>
					</div>
        </div>
      ),
    },
  ],
  {
    basename: "/react-template",
  }
);

export default router
```

用到的 API:

- 使用 `createBrowserRouter` 创建路由对象
	- 第一个参数为路由列表
	- 第二个参数为配置，有 basename 等
- `path` 属性表示路由, `element` 属性表示组件，可以是任何 JSX
- 使用 `<Link />` 组件进行路由跳转

#### 9.3 替换入口

将入口文件 `main.tsx` 中引用的最外层组件替换为 `<RouterProvider />`, `router` 属性设置为上面声明的 `router` 对象。

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './routers';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```
