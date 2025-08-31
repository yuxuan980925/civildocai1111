@echo off
echo ========================================
echo    CivilDoc AI - 核心功能演示
echo ========================================
echo.
echo 正在启动演示...
echo.

REM 尝试用默认浏览器打开演示文件
start "" "%~dp0demo.html"

echo 演示已在浏览器中打开！
echo.
echo 如果浏览器没有自动打开，请手动打开以下文件：
echo %~dp0demo.html
echo.
echo 按任意键退出...
pause >nul
