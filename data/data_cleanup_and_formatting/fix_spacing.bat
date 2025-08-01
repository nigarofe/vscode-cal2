@echo off
REM Batch script to fix heading spacing in markdown files
REM Usage: fix_spacing.bat [--dry-run] [file1.md file2.md ...]

cd /d "%~dp0"

if "%1"=="--help" (
    echo Usage: fix_spacing.bat [--dry-run] [file1.md file2.md ...]
    echo.
    echo Options:
    echo   --dry-run    Show what would be changed without making changes
    echo   --help       Show this help message
    echo.
    echo If no files are specified, will process Questions.md and Premises.md by default
    goto :eof
)

python fix_latex_spacing.py %*
