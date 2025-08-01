#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Batch script to fix encoding issues in multiple markdown files.
This script will process all .md files in the current directory.
"""

import os
import sys
import glob
from fix_encoding_simple import fix_encoding_in_file

def fix_encoding_batch(directory: str = ".") -> None:
    """
    Fix encoding issues in all .md files in the specified directory.
    
    Args:
        directory (str): Directory to search for .md files
    """
    # Find all .md files in the directory
    md_pattern = os.path.join(directory, "*.md")
    md_files = glob.glob(md_pattern)
    
    if not md_files:
        print(f"No .md files found in {directory}")
        return
    
    print(f"Found {len(md_files)} .md files to process:")
    for file in md_files:
        print(f"  - {os.path.basename(file)}")
    print()
    
    # Process each file
    total_fixes = 0
    processed_files = 0
    
    for file_path in md_files:
        print(f"Processing: {os.path.basename(file_path)}")
        print("-" * 50)
        
        success = fix_encoding_in_file(file_path, backup=True)
        if success:
            processed_files += 1
        
        print()
    
    print("=" * 50)
    print(f"Batch processing complete!")
    print(f"Processed {processed_files} out of {len(md_files)} files")

def main():
    """Main function to run the batch encoding fix script."""
    if len(sys.argv) > 1:
        directory = sys.argv[1]
    else:
        directory = "."
    
    print("Batch Encoding Fix Script")
    print("=" * 50)
    print(f"Searching for .md files in: {os.path.abspath(directory)}")
    print()
    
    fix_encoding_batch(directory)

if __name__ == "__main__":
    main()
