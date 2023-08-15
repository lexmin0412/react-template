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

