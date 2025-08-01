#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to fix encoding issues in Premises.md file.
Converts corrupted UTF-8 characters back to their correct form.
"""

import os
import sys
import shutil
from typing import Dict

def create_replacement_mapping() -> Dict[str, str]:
    """
    Create a mapping of corrupted characters to their correct UTF-8 equivalents.
    
    Returns:
        Dict[str, str]: Mapping of corrupted -> correct characters
    """
    # Common encoding issues where UTF-8 was incorrectly decoded as Latin-1
    replacements = {
        # Portuguese characters
        'Ã¡': 'á',  # a with acute
        'Ã£': 'ã',  # a with tilde
        'Ã§': 'ç',  # c with cedilla
        'Ã©': 'é',  # e with acute
        'Ã­': 'í',  # i with acute
        'Ã³': 'ó',  # o with acute
        'Ãµ': 'õ',  # o with tilde
        'Ãº': 'ú',  # u with acute
        'Ã ': 'à',  # a with grave
        'Ã¢': 'â',  # a with circumflex
        'Ãª': 'ê',  # e with circumflex
        'Ã´': 'ô',  # o with circumflex
        'Ã¼': 'ü',  # u with diaeresis
        'Ã±': 'ñ',  # n with tilde
        
        # Capital letters
        'Á': 'Á',
        'À': 'À',
        'Â': 'Â',
        'Ã': 'Ã',
        'Ç': 'Ç',
        'É': 'É',
        'Ê': 'Ê',
        'Í': 'Í',
        'Ó': 'Ó',
        'Ô': 'Ô',
        'Õ': 'Õ',
        'Ú': 'Ú',
        
        # Special symbols and punctuation
        'â€™': "'",  # right single quotation mark
        'â€œ': '"',  # left double quotation mark
        'â€': '"',  # right double quotation mark
        'â€"': '—',  # em dash
        'â€"': '–',  # en dash
        'â€¢': '•',  # bullet
        'â€¦': '…',  # horizontal ellipsis
        'Â°': '°',   # degree symbol
        'Â': '',     # non-breaking space (often incorrectly encoded)
        
        # Math symbols - using escape sequences to avoid encoding issues
        '\\u2211': '∑',  # summation
        '\\u221a': '√',  # square root
        '\\u221e': '∞',  # infinity
        '\\u222b': '∫',  # integral
        '\\u2202': '∂',  # partial derivative
        '\\u2206': 'Δ',  # delta
        '\\u03b1': 'α',  # alpha
        '\\u03b2': 'β',  # beta
        '\\u03b3': 'γ',  # gamma
        '\\u03b4': 'δ',  # delta (lowercase)
        '\\u03b5': 'ε',  # epsilon
        '\\u03b8': 'θ',  # theta
        '\\u03bb': 'λ',  # lambda
        '\\u03bc': 'μ',  # mu
        '\\u03c0': 'π',  # pi
        '\\u03c3': 'σ',  # sigma
        '\\u03c4': 'τ',  # tau
        '\\u03c6': 'φ',  # phi
        '\\u03c9': 'ω',  # omega
        
        # Common compound errors
        'domÃ­nio': 'domínio',
        'TensÃ£o': 'Tensão',
        'DeformaÃ§Ã£o': 'Deformação',
        'IntroduÃ§Ã£o': 'Introdução',
        'mediÃ§Ã£o': 'medição',
        'forÃ§a': 'força',
        'FaÃ§a': 'Faça',
        'esboÃ§o': 'esboço',
        'Ã¢ngulos': 'ângulos',
        'rotaÃ§Ã£o': 'rotação',
        'eixoÂ°': 'eixo°',
        'thetaÂ°': 'theta°',
        '30Â°': '30°',
        'orientationâ€independentâ€': 'orientation-independent',
    }
    
    return replacements

def fix_encoding_in_file(file_path: str, backup: bool = True) -> bool:
    """
    Fix encoding issues in a file.
    
    Args:
        file_path (str): Path to the file to fix
        backup (bool): Whether to create a backup of the original file
        
    Returns:
        bool: True if fixes were applied, False otherwise
    """
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} does not exist")
        return False
    
    # Create backup if requested
    if backup:
        backup_path = file_path + '.backup'
        shutil.copy2(file_path, backup_path)
        print(f"Created backup: {backup_path}")
    
    # Read the file
    try:
        with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return False
    
    # Apply replacements
    replacements = create_replacement_mapping()
    original_content = content
    fixes_applied = 0
    
    for corrupted, correct in replacements.items():
        if corrupted in content:
            count = content.count(corrupted)
            content = content.replace(corrupted, correct)
            fixes_applied += count
            if count > 0:
                print(f"Fixed {count} instances of '{corrupted}' → '{correct}'")
    
    # Write the fixed content back
    if content != original_content:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Successfully applied {fixes_applied} fixes to {file_path}")
            return True
        except Exception as e:
            print(f"Error writing file: {e}")
            return False
    else:
        print("No encoding issues found in the file")
        return False

def main():
    """Main function to run the encoding fix script."""
    if len(sys.argv) < 2:
        # Default to Premises.md if no file specified
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, 'Premises.md')
    else:
        file_path = sys.argv[1]
    
    print(f"Fixing encoding issues in: {file_path}")
    
    success = fix_encoding_in_file(file_path, backup=True)
    
    if success:
        print("Encoding fix completed successfully!")
    else:
        print("No changes were made to the file.")

if __name__ == "__main__":
    main()
