@echo off
title 3D LUXURY PROPERTY WEB SERVER
cd /d "C:\Users\LENOVO\Downloads\3D WEB SITE PROPERTY"

echo ========================================================
echo        3D LUXURY PROPERTY - WEB SERVER LAUNCHER
echo ========================================================
echo Localhost 1: http://localhost:755 (Native Port)
echo Localhost 2: http://localhost:3000 (Standard Port)
echo ========================================================
echo.

start /b node proxy-3000.js
npx next start -p 755
pause
