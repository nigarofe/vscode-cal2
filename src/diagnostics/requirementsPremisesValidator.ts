import * as vscode from 'vscode';
import { validateSnippets } from '../snippets/snippetValidator';
import { HeadingInfo } from '../types';

export function checkRequirementsOrPremisesFile(document: vscode.TextDocument): vscode.Diagnostic[] {
	const text = document.getText();
	const lines = text.split('\n');
	
	const diagnostics: vscode.Diagnostic[] = [];
	
	// Required second-level headings as specified in Requirements.md (including State driven which appears in the actual structure)
	const requiredSecondLevelHeadings = [
		'Generic',
		'Ubiquitous',
		'State driven',
		'Event driven',
		'Optional feature',
		'Unwanted behavior',
		'Complex'
	];
	
	// Track first-level headings and their associated second-level headings
	const firstLevelHeadings: HeadingInfo[] = [];
	let currentFirstLevelIndex = -1;
	
	// Parse the document to find headings
	lines.forEach((line, index) => {
		const trimmedLine = line.trim();
		
		// Check if this is a first-level heading
		if (trimmedLine.startsWith('# ') && trimmedLine.length > 2) {
			const headingText = trimmedLine.substring(2).trim();
			
			// Check if the heading starts with "Requirements for"
			if (!headingText.startsWith('Requirements for')) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(index, 0, index, line.length),
					`First-level heading must start with "Requirements for". Found: "${headingText}"`,
					vscode.DiagnosticSeverity.Error
				);
				
				diagnostics.push(diagnostic);
			}
			
			// Add to tracking array
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
		}
	});
	
	// Check each first-level heading for required second-level headings in exact order
	firstLevelHeadings.forEach(firstLevel => {
		// Check if all required headings are present
		const missingHeadings = requiredSecondLevelHeadings.filter(required => 
			!firstLevel.secondLevelHeadings.includes(required)
		);
		
		if (missingHeadings.length > 0) {
			const diagnostic = new vscode.Diagnostic(
				new vscode.Range(firstLevel.line, 0, firstLevel.line, lines[firstLevel.line].length),
				`First-level heading "${firstLevel.text}" must include ALL second-level headings. Missing: ${missingHeadings.join(', ')}`,
				vscode.DiagnosticSeverity.Error
			);
			
			diagnostics.push(diagnostic);
		}
		
		// Check if the headings are in the exact order
		if (firstLevel.secondLevelHeadings.length >= requiredSecondLevelHeadings.length) {
			let orderCorrect = true;
			let expectedIndex = 0;
			
			for (let i = 0; i < firstLevel.secondLevelHeadings.length; i++) {
				const currentHeading = firstLevel.secondLevelHeadings[i];
				
				// If this is one of the required headings
				if (requiredSecondLevelHeadings.includes(currentHeading)) {
					// Check if it's in the correct position
					if (currentHeading !== requiredSecondLevelHeadings[expectedIndex]) {
						orderCorrect = false;
						break;
					}
					expectedIndex++;
				}
			}
			
			if (!orderCorrect && missingHeadings.length === 0) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(firstLevel.line, 0, firstLevel.line, lines[firstLevel.line].length),
					`First-level heading "${firstLevel.text}" must have second-level headings in exact order: ${requiredSecondLevelHeadings.join(', ')}`,
					vscode.DiagnosticSeverity.Error
				);
				
				diagnostics.push(diagnostic);
			}
		}
	});

	// Validate snippets in Requirements.md and Premises.md files
	const snippetDiagnostics = validateSnippets(document);
	diagnostics.push(...snippetDiagnostics);

	return diagnostics;
}
