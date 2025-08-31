# CivilDoc AI 部署指南

## 方法一：使用 Vercel 一键部署（推荐）

这是最简单的方法，无需设置命令行或配置 Git 仓库：

1. 将项目上传到您的 GitHub 仓库
2. 访问以下链接（将用户名和仓库名替换为您的）：
   ```
   https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
   ```
3. 按照 Vercel 网站上的指示完成部署

## 方法二：使用 Vercel CLI

如果您已安装 Node.js，可以使用 Vercel 命令行工具进行部署：

1. 全局安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 在项目根目录下执行以下命令：
   ```bash
   vercel login
   ```

3. 按照提示完成身份验证后，执行：
   ```bash
   vercel
   ```

4. 按照终端中的提示配置项目（大多数情况下使用默认选项即可）

5. 部署完成后，终端会显示您的网站链接

## 方法三：其他托管平台

本项目也可以部署到其他支持 Next.js 的托管平台：

### Netlify 部署
1. 创建 `netlify.toml` 文件：
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   ```
2. 上传到 GitHub 并在 Netlify 中导入您的仓库

### AWS Amplify 部署
1. 在 AWS Amplify 控制台中导入您的 GitHub 仓库
2. 选择 Next.js 框架预设
3. 按照控制台指示完成部署

## 部署后访问

无论使用哪种方法，部署成功后，您将获得一个可公开访问的网址，格式类似：

- Vercel: `https://civildoc-ai.vercel.app`
- Netlify: `https://civildoc-ai.netlify.app`

## 自定义域名

所有上述平台都支持将您自己的域名连接到项目。部署后，在平台控制面板中查找"域设置"或"自定义域"选项，按照指示添加和验证您的域名。 