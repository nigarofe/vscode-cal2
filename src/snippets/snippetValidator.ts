import * as vscode from 'vscode';
import { snippetCache } from './snippetCache';

export function validateSnippets(document: vscode.TextDocument): vscode.Diagnostic[] {
	const text = document.getText();
	const lines = text.split('\n');
	const diagnostics: vscode.Diagnostic[] = [];
	
	// Find all snippet definitions and references
	const snippetDefs = new Map<string, number[]>(); // id -> line numbers
	const snippetRefs = new Map<string, number[]>(); // id -> line numbers
	
	lines.forEach((line, index) => {
		// Find snippet definitions
		let defMatch;
		const defRegex = /<snippet\s+id="([^"]+)">/g;
		while ((defMatch = defRegex.exec(line)) !== null) {
			const snippetId = defMatch[1];
			if (!snippetDefs.has(snippetId)) {
				snippetDefs.set(snippetId, []);
			}
			snippetDefs.get(snippetId)!.push(index);
		}
		
		// Find snippet references
		let refMatch;
		const refRegex = /<ref\s+id="([^"]+)"\s*\/>/g;
		while ((refMatch = refRegex.exec(line)) !== null) {
			const snippetId = refMatch[1];
			if (!snippetRefs.has(snippetId)) {
				snippetRefs.set(snippetId, []);
			}
			snippetRefs.get(snippetId)!.push(index);
		}
	});
	
	// Check for duplicate snippet IDs
	snippetDefs.forEach((lineNumbers, snippetId) => {
		if (lineNumbers.length > 1) {
			lineNumbers.forEach(lineNumber => {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(lineNumber, 0, lineNumber, lines[lineNumber].length),
					`Duplicate snippet ID "${snippetId}". Snippet IDs must be unique within the document.`,
					vscode.DiagnosticSeverity.Error
				);
				diagnostics.push(diagnostic);
			});
		}
	});
	
	// Check for unresolved snippet references
	snippetRefs.forEach((lineNumbers, snippetId) => {
		if (!snippetDefs.has(snippetId)) {
			// Check if the snippet exists in other open documents
			const allSnippetIds = snippetCache.getAllSnippetIds();
			// console.log(`Validating snippet reference "${snippetId}". Available snippets in cache:`, allSnippetIds);
			// console.log(`Snippet cache contents:`, Array.from(snippetCache.entries()));
			
			if (!allSnippetIds.includes(snippetId)) {
				lineNumbers.forEach(lineNumber => {
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(lineNumber, 0, lineNumber, lines[lineNumber].length),
						`Unresolved snippet reference "${snippetId}". No snippet definition found with this ID.`,
						vscode.DiagnosticSeverity.Error
					);
					diagnostics.push(diagnostic);
				});
			}
		}
	});
	
	// Check for circular references (basic check)
	const checkCircularReferences = (snippetId: string, visited: Set<string>): boolean => {
		if (visited.has(snippetId)) {
			return true; // Circular reference detected
		}
		
		visited.add(snippetId);
		
		// Find the content of this snippet
		const snippetKey = Array.from(snippetCache.keys()).find(key => key.endsWith('#' + snippetId));
		if (snippetKey) {
			const content = snippetCache.get(snippetKey);
			if (content) {
				// Check if this snippet references other snippets
				const refRegex = /<ref\s+id="([^"]+)"\s*\/>/g;
				let refMatch;
				while ((refMatch = refRegex.exec(content)) !== null) {
					const referencedId = refMatch[1];
					if (checkCircularReferences(referencedId, new Set(visited))) {
						return true;
					}
				}
			}
		}
		
		visited.delete(snippetId);
		return false;
	};
	
	snippetDefs.forEach((lineNumbers, snippetId) => {
		if (checkCircularReferences(snippetId, new Set())) {
			lineNumbers.forEach(lineNumber => {
				const diagnostic = new vscode.Diagnostic(
					new vscode.Range(lineNumber, 0, lineNumber, lines[lineNumber].length),
					`Circular reference detected in snippet "${snippetId}". Snippets cannot reference themselves directly or indirectly.`,
					vscode.DiagnosticSeverity.Error
				);
				diagnostics.push(diagnostic);
			});
		}
	});
	
	return diagnostics;
}
