@echo off
echo ========================================
echo    CivilDoc AI - 本地测试脚本
echo ========================================
echo.

echo [1] 检查Python环境...
python --version
if %errorlevel% neq 0 (
    echo [错误] Python未安装或不在PATH中
    pause
    exit /b 1
)
echo [OK] Python环境正常

echo.
echo [2] 检查Streamlit安装...
python -c "import streamlit; print('Streamlit版本:', streamlit.__version__)"
if %errorlevel% neq 0 (
    echo [错误] Streamlit未正确安装
    pause
    exit /b 1
)
echo [OK] Streamlit安装正常

echo.
echo [3] 检查应用文件...
if not exist "streamlit_app.py" (
    echo [错误] 找不到streamlit_app.py文件
    pause
    exit /b 1
)
echo [OK] 应用文件存在

echo.
echo [4] 语法检查...
python -m py_compile streamlit_app.py
if %errorlevel% neq 0 (
    echo [错误] 应用文件有语法错误
    pause
    exit /b 1
)
echo [OK] 语法检查通过

echo.
echo [5] 检查端口占用...
netstat -an | findstr :8501 >nul
if %errorlevel% equ 0 (
    echo [警告] 端口8501已被占用，将尝试终止现有进程
    taskkill /f /im python.exe >nul 2>&1
    timeout /t 2 /nobreak >nul
)

echo.
echo [6] 启动Streamlit应用...
echo 应用将在 http://localhost:8501 启动
echo 请等待浏览器自动打开，或手动访问上述地址
echo 按 Ctrl+C 可停止应用
echo.

streamlit run streamlit_app.py --server.port 8501 --browser.gatherUsageStats false

echo.
echo 应用已停止运行
pause
