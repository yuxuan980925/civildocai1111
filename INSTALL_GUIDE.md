# CivilDoc AI 安装指南

## 必备条件

在安装 CivilDoc AI 网站之前，请确保您的系统上已安装：

1. **Node.js** (14.x 或更高版本)：
   - 从 [Node.js 官网](https://nodejs.org/) 下载并安装

## 安装步骤

### Windows 系统

1. 下载并安装 Node.js
2. 打开命令提示符或 PowerShell，进入项目目录
3. 运行以下命令安装依赖：
   ```
   npm install
   ```
4. 安装完成后，启动开发服务器：
   ```
   npm run dev
   ```
5. 打开浏览器，访问 http://localhost:3000 即可查看网站

### macOS/Linux 系统

1. 下载并安装 Node.js
2. 打开终端，进入项目目录
3. 运行以下命令安装依赖：
   ```
   npm install
   ```
4. 安装完成后，启动开发服务器：
   ```
   npm run dev
   ```
5. 打开浏览器，访问 http://localhost:3000 即可查看网站

## 疑难解答

如果遇到安装问题，请尝试以下步骤：

1. 确保 Node.js 已正确安装，运行 `node -v` 查看版本
2. 如果依赖安装失败，尝试使用 `npm ci` 命令进行清洁安装
3. 如果项目启动失败，检查是否有端口冲突，可以尝试修改 package.json 中的 dev 脚本，使用不同端口：
   ```
   "dev": "next dev -p 3001"
   ```

## 项目结构

完成安装后，您可以在代码编辑器中查看和编辑项目文件：

- **pages/**: 网站页面文件
- **components/**: 可复用组件
- **styles/**: CSS 样式文件
- **public/**: 静态资源
- **utils/**: 工具函数

## 开发和部署

- 在开发过程中，对代码的任何修改都会自动重新加载
- 如需构建生产版本，请运行 `npm run build`
- 构建完成后，使用 `npm start` 启动生产服务器 