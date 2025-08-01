@echo off
REM Batch script to fix encoding issues in markdown files
REM This script runs the Python encoding fix script

echo Fixing encoding issues in markdown files...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python and try again.
    pause
    exit /b 1
)

REM Run the encoding fix script
echo Running encoding fix on all .md files...
python fix_encoding_batch.py

echo.
echo Encoding fix completed!
pause
