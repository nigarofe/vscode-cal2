#!/usr/bin/env python3
"""
Format Markdown Files - Heading Spacing Script

This script processes all .md files in the current directory and formats them with:
- 10 blank lines before each level 1 heading (# Heading)
- 2 blank lines before each level 2 heading (## Heading)

Usage:
    python format_md_headings.py

The script will:
1. Process each .md file in the directory
2. Apply the formatting rules
3. Save the formatted content back to the original files

Note: Make sure your files are committed to git before running this script.
"""

import os
import re
import glob
from typing import List, Tuple



def format_markdown_headings(content: str) -> str:
    """
    Format markdown content with proper spacing before headings:
    - 10 blank lines before level 1 headings
    - 2 blank lines before level 2 headings
    """
    lines = content.split('\n')
    formatted_lines = []
    
    for i, line in enumerate(lines):
        # Check if current line is a heading
        if line.strip().startswith('#'):
            # Determine heading level
            heading_match = re.match(r'^(#{1,6})\s', line.strip())
            if heading_match:
                heading_level = len(heading_match.group(1))
                
                # Remove any existing blank lines before this heading
                while formatted_lines and formatted_lines[-1].strip() == '':
                    formatted_lines.pop()
                
                # Add appropriate number of blank lines based on heading level
                if heading_level == 1:
                    # 10 blank lines before level 1 heading
                    blank_lines_needed = 10
                elif heading_level == 2:
                    # 2 blank lines before level 2 heading
                    blank_lines_needed = 2
                else:
                    # For level 3+ headings, keep minimal spacing (1 blank line)
                    blank_lines_needed = 1
                
                # Add the blank lines
                for _ in range(blank_lines_needed):
                    formatted_lines.append('')
        
        # Add the current line
        formatted_lines.append(line)
    
    return '\n'.join(formatted_lines)

def process_markdown_file(filepath: str) -> bool:
    """
    Process a single markdown file with heading formatting
    Returns True if file was modified, False otherwise
    """
    try:
        # Read the original content
        with open(filepath, 'r', encoding='utf-8') as file:
            original_content = file.read()
        
        # Format the content
        formatted_content = format_markdown_headings(original_content)
        
        # Check if content was actually changed
        if original_content == formatted_content:
            print(f"No changes needed for: {filepath}")
            return False
        
        # Write the formatted content back
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(formatted_content)
        
        print(f"Formatted: {filepath}")
        return True
        
    except Exception as e:
        print(f"Error processing {filepath}: {str(e)}")
        return False

def main():
    """Main function to process all .md files in the current directory"""
    print("Markdown Heading Formatter")
    print("=" * 50)
    print("Looking for .md files in current directory...")
    
    # Get all .md files in current directory
    md_files = glob.glob("*.md")
    
    if not md_files:
        print("No .md files found in current directory.")
        return
    
    print(f"Found {len(md_files)} .md files:")
    for file in md_files:
        print(f"  - {file}")
    print()
    
    # Process each file
    modified_count = 0
    for md_file in md_files:
        if process_markdown_file(md_file):
            modified_count += 1
    
    print()
    print("=" * 50)
    print(f"Processing complete!")
    print(f"Files processed: {len(md_files)}")
    print(f"Files modified: {modified_count}")
    print(f"Files unchanged: {len(md_files) - modified_count}")

if __name__ == "__main__":
    main()
