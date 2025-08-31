@echo off
echo ========================================
echo    CivilDoc AI Demo - 快速启动
echo ========================================
echo.

echo [选项 1] HTML 演示版本 (推荐 - 零配置)
echo 功能: 完整的前端交互演示
start demo.html
echo ✅ HTML 演示已在浏览器中打开
echo.

echo [选项 2] 静态网站版本
echo 功能: 项目主页和导航
start public\index.html
echo ✅ 静态网站已在浏览器中打开
echo.

echo [选项 3] 启动简单 HTTP 服务器
echo 功能: 本地 Web 服务器访问
echo 启动中...
start /min python -m http.server 8000
timeout /t 3 /nobreak >nul
start http://localhost:8000
echo ✅ HTTP 服务器已启动: http://localhost:8000
echo.

echo ========================================
echo    所有演示版本已启动完成！
echo ========================================
echo.
echo 📋 可用的访问方式:
echo   • HTML 演示: 直接在浏览器中运行
echo   • 静态网站: 项目主页和导航
echo   • HTTP 服务器: http://localhost:8000
echo.
echo 💡 如需停止 HTTP 服务器，请关闭命令行窗口
echo.
pause
