@echo off
setlocal

rem Resolve repo root dir
set ROOT_DIR=%~dp0

rem Start API on http://localhost:5112 in a new window
start "API" cmd /k "cd /d %ROOT_DIR%api && dotnet run --urls http://localhost:5112"

rem Start UI (React) on http://localhost:3000 in a new window
start "UI" cmd /k "cd /d %ROOT_DIR%ui && npm start"

endlocal 