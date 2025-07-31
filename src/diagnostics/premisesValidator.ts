import * as vscode from 'vscode';
import { validateSnippets } from '../snippets/snippetValidator';
import { HeadingInfo } from '../types';

export function checkPremisesFile(document: vscode.TextDocument): vscode.Diagnostic[] {
	const text = document.getText();
	const lines = text.split('\n');
	
	const diagnostics: vscode.Diagnostic[] = [];
	
	// Regex pattern for Premises.md first-level headings (allows optional trailing whitespace)
	const premiseSetHeadingRegex = /^Premise Set \d+\s*$/;
	
	// Track first-level headings for spacing validation
	const firstLevelHeadings: HeadingInfo[] = [];
	let currentFirstLevelIndex = -1;
	
	// Parse the document to find first-level and second-level headings
	lines.forEach((line, index) => {
		const trimmedLine = line.trim();
		
		// Check if this is a first-level heading
		if (trimmedLine.startsWith('# ') && trimmedLine.length > 2) {
			const headingText = trimmedLine.substring(2).trim();
			
			// Check if the heading matches the required regex
			if (!premiseSetHeadingRegex.test(headingText)) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(index, 0, index, line.length),
					`First-level heading in Premises.md must match the pattern "Premise Set [number]". Found: "${headingText}"`,
					vscode.DiagnosticSeverity.Error
				);
				
				diagnostics.push(diagnostic);
			}
			
			// Check if there are exactly 10 blank lines above this heading
			let blankLineCount = 0;
			for (let i = index - 1; i >= 0; i--) {
				if (lines[i].trim() === '') {
					blankLineCount++;
				} else {
					break;
				}
			}
			
			if (blankLineCount !== 10) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(index, 0, index, line.length),
					`First-level heading in Premises.md must have exactly 10 blank lines above it. Found: ${blankLineCount} blank lines`,
					vscode.DiagnosticSeverity.Error
				);
				
				diagnostics.push(diagnostic);
			}
			
			// Add to tracking array for potential future use
			firstLevelHeadings.push({
				line: index,
				text: headingText,
				secondLevelHeadings: []
			});
			currentFirstLevelIndex = firstLevelHeadings.length - 1;
		}
		// Check if this is a second-level heading
		else if (trimmedLine.startsWith('## ') && trimmedLine.length > 3) {
			const headingText = trimmedLine.substring(3).trim();
			
			// If we have a current first-level heading, add this second-level heading to it
			if (currentFirstLevelIndex >= 0) {
				firstLevelHeadings[currentFirstLevelIndex].secondLevelHeadings.push(headingText);
			}
			
			// Check if there are exactly 2 blank lines above this heading
			let blankLineCount = 0;
			for (let i = index - 1; i >= 0; i--) {
				if (lines[i].trim() === '') {
					blankLineCount++;
				} else {
					break;
				}
			}
			
			if (blankLineCount !== 2) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(index, 0, index, line.length),
					`Second-level heading in Premises.md must have exactly 2 blank lines above it. Found: ${blankLineCount} blank lines`,
					vscode.DiagnosticSeverity.Error
				);
				
				diagnostics.push(diagnostic);
			}
		}
	});

	// Validate snippets in Premises.md files
	const snippetDiagnostics = validateSnippets(document);
	diagnostics.push(...snippetDiagnostics);

	return diagnostics;
}
