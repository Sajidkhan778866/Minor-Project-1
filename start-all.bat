@echo off
title AI Study Strategist - One-Click Launcher (Parul University Minor Project)
echo ==============================================================================
echo 🚀 AI Study Strategist - Enterprise MERN Stack Launcher
echo 🏛️ Parul Institute of Technology (CSE Department - AY 2025-2026)
echo 👨‍💻 Team: Sajid Khan, Repaka Himanshu Raj, Siddesh Surti, Anuj N. Pandey
echo 👩‍🏫 Guide: Mrs. Gayatri Devraj Naidu
echo ==============================================================================

echo [1/3] Launching Python AI Microservice on Port 8000...
start "AI Engine (Port 8000)" /D "%~dp0python-ai-service" cmd /k "python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo [2/3] Launching Node.js Express Backend on Port 5000...
start "Backend API (Port 5000)" /D "%~dp0backend" cmd /k "set PORT=5000&& set AI_SERVICE_URL=http://localhost:8000&& node server.js"

echo [3/3] Launching React Vite Frontend on Port 5174...
start "Frontend UI (Port 5174)" /D "%~dp0frontend" cmd /k "set VITE_API_URL=http://localhost:5000&& set VITE_AI_URL=http://localhost:8000&& npm run dev -- --port 5174 --host"

echo.
echo ✅ All microservices initiated in separate terminal windows!
echo 🌐 Open your browser and navigate to: http://localhost:5174
echo ==============================================================================
pause
