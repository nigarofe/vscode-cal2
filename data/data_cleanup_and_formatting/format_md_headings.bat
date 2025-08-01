@echo off
REM Format Markdown Files - Heading Spacing Batch Script
REM This script runs the Python formatter for markdown files

echo Markdown Heading Formatter (Batch Wrapper)
echo =============================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.x and try again
    pause
    exit /b 1
)

REM Check if the Python script exists
if not exist "format_md_headings.py" (
    echo ERROR: format_md_headings.py not found in current directory
    pause
    exit /b 1
)

REM Run the Python script
echo Running Python formatter...
echo.
python format_md_headings.py

echo.
echo Press any key to exit...
pause >nul
