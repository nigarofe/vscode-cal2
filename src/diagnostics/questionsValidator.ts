import * as vscode from 'vscode';
import { validateSnippets } from '../snippets/snippetValidator';
import { HeadingInfo } from '../types';

export function checkQuestionsFile(document: vscode.TextDocument): vscode.Diagnostic[] {
	const text = document.getText();
	const lines = text.split('\n');
	
	const diagnostics: vscode.Diagnostic[] = [];
	
	// Regex pattern for Questions.md first-level headings (allows optional trailing whitespace)
	const questionHeadingRegex = /^Question \d+\s*$/;
	
	// Required second-level headings for Questions.md as specified in Requirements.md
	const requiredSecondLevelHeadings = [
		'Proposition',
		'Step-by-step',
		'Answer',
		'Metadata'
	];
	
	// Track first-level headings and their associated second-level headings
	const firstLevelHeadings: HeadingInfo[] = [];
	let currentFirstLevelIndex = -1;
	
	// Parse the document to find first-level and second-level headings
	lines.forEach((line, index) => {
		const trimmedLine = line.trim();
		
		// Check if this is a first-level heading
		if (trimmedLine.startsWith('# ') && trimmedLine.length > 2) {
			const headingText = trimmedLine.substring(2).trim();
			
			// Check if the heading matches the required regex
			if (!questionHeadingRegex.test(headingText)) {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(index, 0, index, line.length),
					`First-level heading in Questions.md must match the pattern "Question [number]". Found: "${headingText}"`,
					vscode.DiagnosticSeverity.Error
				);
				
				diagnostics.push(diagnostic);
			}
			

			
			// Add to tracking array for second-level heading validation
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

	// Validate snippets in Questions.md files
	const snippetDiagnostics = validateSnippets(document);
	diagnostics.push(...snippetDiagnostics);

	return diagnostics;
}
