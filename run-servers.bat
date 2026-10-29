@echo off
cd /d "C:\Users\LENOVO\Downloads\3D WEB SITE PROPERTY"
start /min cmd /c "npx next start -p 755"
timeout /t 3 /nobreak >nul
start /min cmd /c "node proxy-3000.cjs"
