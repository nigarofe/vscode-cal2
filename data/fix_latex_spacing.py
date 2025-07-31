#!/usr/bin/env python3
"""
Script to fix spacing around headings in Markdown files.

This script ensures proper spacing based on Requirements.md specifications:

For Questions.md files:
- 10 blank lines before each # (h1) heading (except at the beginning of file)
- 2 blank lines before each ## (h2) heading
- 1 blank line after each heading

For other markdown files:
- 2 blank lines before each # (h1) heading (except at the beginning of file)
- 1 blank line before each ## (h2) heading
- 1 blank line after each heading

Additional features:
- Removes multiple consecutive blank lines (max 2)
- Preserves content within code blocks and LaTeX math blocks
"""

import re
import sys
import argparse
from pathlib import Path


def fix_heading_spacing(content: str, file_name: str = "") -> str:
    """
    Fix spacing around headings in markdown content.
    
    Args:
        content: The markdown content as a string
        file_name: Name of the file being processed (used for specific rules)
        
    Returns:
        The content with fixed spacing
    """
    lines = content.split('\n')
    result = []
    i = 0
    in_code_block = False
    in_math_block = False
    
    # Check if this is a Questions.md file (special spacing requirements)
    is_questions_file = file_name.lower().endswith('questions.md')
    
    while i < len(lines):
        line = lines[i].rstrip()
        
        # Track code blocks (``` or ~~~)
        if re.match(r'^```|^~~~', line):
            in_code_block = not in_code_block
            result.append(line)
            i += 1
            continue
            
        # Track LaTeX math blocks ($$)
        if line.strip() == '$$':
            in_math_block = not in_math_block
            result.append(line)
            i += 1
            continue
            
        # Skip processing if we're inside code or math blocks
        if in_code_block or in_math_block:
            result.append(line)
            i += 1
            continue
            
        # Check if current line is a heading
        h1_match = re.match(r'^# ', line)
        h2_match = re.match(r'^## ', line)
        
        if h1_match or h2_match:
            # Determine required blank lines before heading based on file type
            if is_questions_file:
                # Questions.md specific requirements from Requirements.md:
                # - 10 blank lines before # headings
                # - 2 blank lines before ## headings
                required_blanks = 10 if h1_match else 2
            else:
                # Default spacing for other files
                required_blanks = 2 if h1_match else 1
            
            # Don't add blank lines if this is the first content line
            if result and any(l.strip() for l in result):
                # Remove trailing blank lines from result
                while result and not result[-1].strip():
                    result.pop()
                
                # Add the required number of blank lines
                for _ in range(required_blanks):
                    result.append('')
            
            # Add the heading
            result.append(line)
            
            # Look ahead to see if there's already a blank line after
            next_i = i + 1
            if next_i < len(lines) and lines[next_i].strip():
                # Add one blank line after heading if next line has content
                result.append('')
        else:
            result.append(line)
        
        i += 1
    
    # Clean up multiple consecutive blank lines 
    # For Questions.md files, allow up to 10 consecutive blank lines (for heading spacing)
    # For other files, keep max 2
    max_blanks = 10 if is_questions_file else 2
    final_result = []
    blank_count = 0
    
    for line in result:
        if not line.strip():
            blank_count += 1
            if blank_count <= max_blanks:
                final_result.append(line)
        else:
            blank_count = 0
            final_result.append(line)
    
    # Remove trailing blank lines
    while final_result and not final_result[-1].strip():
        final_result.pop()
    
    return '\n'.join(final_result)


def process_file(file_path: Path, dry_run: bool = False) -> bool:
    """
    Process a single markdown file.
    
    Args:
        file_path: Path to the markdown file
        dry_run: If True, don't write changes, just show what would be changed
        
    Returns:
        True if changes were made (or would be made in dry run)
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        fixed_content = fix_heading_spacing(original_content, file_path.name)
        
        if original_content != fixed_content:
            if dry_run:
                print(f"Would fix spacing in: {file_path}")
                return True
            else:
                # Create backup
                backup_path = file_path.with_suffix(file_path.suffix + '.backup')
                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.write(original_content)
                
                # Write fixed content
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                
                print(f"Fixed spacing in: {file_path}")
                print(f"Backup created: {backup_path}")
                return True
        else:
            print(f"No changes needed: {file_path}")
            return False
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description='Fix spacing around headings in Markdown files')
    parser.add_argument('files', nargs='*', help='Markdown files to process')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be changed without making changes')
    parser.add_argument('--recursive', '-r', action='store_true', help='Process all .md files in current directory recursively')
    
    args = parser.parse_args()
    
    files_to_process = []
    
    if args.recursive:
        # Find all .md files recursively
        for md_file in Path('.').rglob('*.md'):
            files_to_process.append(md_file)
    elif args.files:
        # Process specified files
        for file_arg in args.files:
            file_path = Path(file_arg)
            if file_path.exists():
                files_to_process.append(file_path)
            else:
                print(f"File not found: {file_path}")
    else:
        # Default to Questions.md if it exists
        default_file = Path('Questions.md')
        if default_file.exists():
            files_to_process.append(default_file)
        else:
            print("No files specified and Questions.md not found.")
            print("Use --help for usage information.")
            sys.exit(1)
    
    if not files_to_process:
        print("No files to process.")
        sys.exit(1)
    
    print(f"Processing {len(files_to_process)} file(s)...")
    
    changes_made = 0
    for file_path in files_to_process:
        if process_file(file_path, args.dry_run):
            changes_made += 1
    
    if args.dry_run:
        print(f"\nDry run complete. {changes_made} file(s) would be modified.")
    else:
        print(f"\nProcessing complete. {changes_made} file(s) were modified.")


if __name__ == '__main__':
    main()