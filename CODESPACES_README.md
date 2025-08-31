# 🚀 CivilDoc AI Demo - GitHub Codespaces 快速开始

## 🌟 欢迎使用 GitHub Codespaces！

您正在使用云端开发环境运行 CivilDoc AI Demo。所有依赖已自动安装。

---

## ⚡ 快速启动

### 方法 1: Streamlit 交互应用 (推荐)
```bash
streamlit run streamlit_app.py
```
- 🌐 访问: `http://localhost:8501`
- ✨ 功能: 完整的交互式 AI 文档管理系统

### 方法 2: 静态 HTML 演示
```bash
# 启动简单 HTTP 服务器
python -m http.server 8000

# 或直接打开文件
# 在 VS Code 中右键 public/index.html -> "Open with Live Server"
```
- 🌐 访问: `http://localhost:8000`
- ✨ 功能: 零依赖的纯前端演示

### 方法 3: Next.js 开发服务器
```bash
npm run dev
```
- 🌐 访问: `http://localhost:3000`
- ✨ 功能: 完整的 React/Next.js 应用

---

## 🎯 功能演示

### 📄 智能文档管理
- 创建和编辑工程文档
- AI 写作助手实时建议
- 文档状态管理

### 🤖 AI 代理任务
- 环境影响报告生成
- 建筑图纸数据提取
- 合规性检查

### 📊 数据分析
- 交互式图表
- 项目统计
- 性能监控

### 📁 文件处理
- 多格式文件上传
- 智能内容分析
- 批量处理

---

## 🔧 Codespaces 特定配置

### 端口转发
- **8501**: Streamlit 应用
- **3000**: Next.js 应用  
- **8000**: 静态文件服务器

### 预安装扩展
- Python 支持
- Tailwind CSS 智能提示
- Prettier 代码格式化

### 自动安装依赖
- Python: `pip install -r requirements.txt`
- Node.js: `npm install`

---

## 🧪 测试功能

### Streamlit 应用测试
1. 启动应用: `streamlit run streamlit_app.py`
2. 测试导航: 切换不同页面
3. 测试交互: 文档编辑、AI 任务执行
4. 测试上传: 文件上传和分析

### HTML 演示测试
1. 启动服务: `python -m http.server 8000`
2. 访问: `http://localhost:8000`
3. 测试功能: 所有交互元素
4. 测试响应: 调整浏览器窗口大小

---

## 📱 移动端测试

在 Codespaces 中测试移动端：
1. 打开浏览器开发者工具
2. 切换到移动设备模拟
3. 测试响应式设计

---

## 🚀 部署选项

### 从 Codespaces 部署

#### 部署到 Vercel
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

#### 部署到 Netlify
```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod --dir=public
```

#### 部署到 Streamlit Cloud
1. 将代码推送到 GitHub
2. 访问 [share.streamlit.io](https://share.streamlit.io)
3. 连接仓库并部署 `streamlit_app.py`

---

## 🔍 故障排除

### Streamlit 无法启动
```bash
# 检查 Python 版本
python --version

# 重新安装依赖
pip install -r requirements.txt

# 清除缓存
streamlit cache clear
```

### 端口访问问题
1. 确保端口已转发 (VS Code 底部状态栏)
2. 检查防火墙设置
3. 尝试不同端口

### 依赖安装失败
```bash
# 更新 pip
pip install --upgrade pip

# 清除 npm 缓存
npm cache clean --force
```

---

## 💡 提示和技巧

### 快速命令
- `Ctrl + Shift + P`: VS Code 命令面板
- `Ctrl + ` `: 打开终端
- `Ctrl + Shift + E`: 文件浏览器

### 文件编辑
- 实时预览: 使用 Live Server 扩展
- 代码格式化: `Shift + Alt + F`
- 多光标编辑: `Ctrl + D`

### Git 操作
```bash
# 查看状态
git status

# 添加文件
git add .

# 提交更改
git commit -m "Update from Codespaces"

# 推送到 GitHub
git push origin main
```

---

## 🎉 享受您的 CivilDoc AI Demo 体验！

**🌟 在云端开发环境中探索 AI 驱动的工程文档管理系统**

---

## 📞 需要帮助？

- 📖 查看 `README.md` 了解详细信息
- 🐛 遇到问题请创建 GitHub Issue
- 💬 在 GitHub Discussions 中讨论

**Happy Coding! 🚀**
