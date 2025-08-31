@echo off
echo Installing dependencies...

:: Install dependencies
call npm install 

:: Setup complete
echo.
echo Setup complete! Run 'npm run dev' to start the development server.
echo Then open http://localhost:3000 in your browser
pause 