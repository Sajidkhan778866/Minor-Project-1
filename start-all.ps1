Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "🚀 AI Study Strategist - Enterprise MERN Stack PowerShell Launcher" -ForegroundColor Yellow
Write-Host "🏛️ Parul Institute of Technology (CSE Department - AY 2025-2026)" -ForegroundColor Green
Write-Host "👨‍💻 Team: Sajid Khan, Repaka Himanshu Raj, Siddesh Surti, Anuj N. Pandey" -ForegroundColor White
Write-Host "👩‍🏫 Guide: Mrs. Gayatri Devraj Naidu" -ForegroundColor Magenta
Write-Host "==============================================================================" -ForegroundColor Cyan

$baseDir = $PSScriptRoot

Write-Host "[1/3] Launching Python AI Microservice on Port 8000..." -ForegroundColor Yellow
Start-Process "powershell" -ArgumentList "-NoExit", "-Command", "cd '$baseDir\python-ai-service'; python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

Write-Host "[2/3] Launching Node.js Express Backend on Port 5000..." -ForegroundColor Yellow
Start-Process "powershell" -ArgumentList "-NoExit", "-Command", "cd '$baseDir\backend'; node server.js"

Write-Host "[3/3] Launching React Vite Frontend on Port 5174..." -ForegroundColor Yellow
Start-Process "powershell" -ArgumentList "-NoExit", "-Command", "cd '$baseDir\frontend'; npm run dev -- --port 5174 --host"

Write-Host ""
Write-Host "✅ All microservices launched successfully in independent PowerShell windows!" -ForegroundColor Green
Write-Host "🌐 Access your portal at: http://localhost:5174" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan
