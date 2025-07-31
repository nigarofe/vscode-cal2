import * as vscode from 'vscode';

let diagnosticCollection: vscode.DiagnosticCollection;
let currentQuestionPanel: vscode.WebviewPanel | undefined;
let lastQuestionHeading: string = '';
let debounceTimer: NodeJS.Timeout | undefined;

// Snippet cache to store all snippet definitions
let snippetCache: Map<string, string> = new Map();

// Lazy load dependencies to avoid startup performance issues
let marked: any;
let katex: any;

async function loadDependencies() {
	if (!marked) {
		try {
			marked = require('marked');
		} catch (error) {
			console.warn('Marked library not available, using basic markdown conversion');
		}
	}
	if (!katex) {
		try {
			katex = require('katex');
		} catch (error) {
			console.warn('KaTeX library not available, LaTeX expressions will not be rendered');
		}
	}
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-cal2" is now active!');

	// Load dependencies asynchronously
	loadDependencies();

	// Create a diagnostic collection for our extension
	diagnosticCollection = vscode.languages.createDiagnosticCollection('vscode-cal2');
	context.subscriptions.push(diagnosticCollection);

	// Check currently open documents when extension activates
	vscode.workspace.textDocuments.forEach(document => {
		updateSnippetCache(document);
		checkDocumentFile(document);
	});

	// Listen for document open events
	const onDidOpenDisposable = vscode.workspace.onDidOpenTextDocument(document => {
		checkDocumentFile(document);
	});

	// Listen for document change events
	const onDidChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
		checkDocumentFile(event.document);
		
		// Update webview content in real time for Questions.md files
		if (event.document.fileName.endsWith('Questions.md') && currentQuestionPanel) {
			// Debounce the content updates to prevent excessive firing
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
			debounceTimer = setTimeout(() => {
				updateWebviewContent(event.document);
			}, 300); // Shorter delay for content updates
		}
		
		// If snippet content changed, trigger re-rendering of all Questions.md webviews
		if ((event.document.fileName.endsWith('Questions.md') || event.document.fileName.endsWith('Premises.md')) && currentQuestionPanel) {
			// Check if any snippet definitions were affected
			const hasSnippetChanges = event.contentChanges.some(change => 
				change.text.includes('<snippet') || change.text.includes('<ref') ||
				change.rangeLength > 0 // Something was deleted
			);
			
			if (hasSnippetChanges) {
				// Re-validate all open Questions.md and Premises.md documents
				vscode.workspace.textDocuments.forEach(doc => {
					if (doc.fileName.endsWith('Questions.md') || doc.fileName.endsWith('Premises.md')) {
						updateSnippetCache(doc);
						checkDocumentFile(doc);
					}
				});
			}
		}
	});

	// Listen for cursor position changes in Questions.md files
	const onDidChangeSelectionDisposable = vscode.window.onDidChangeTextEditorSelection(event => {
		const document = event.textEditor.document;
		if (document.fileName.endsWith('Questions.md')) {
			// Debounce the webview updates to prevent constant firing
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
			debounceTimer = setTimeout(() => {
				showQuestionWebview(document, event.selections[0].active);
			}, 500); // Wait 500ms before updating
		}
	});

	// Listen for document close events to clear diagnostics
	const onDidCloseDisposable = vscode.workspace.onDidCloseTextDocument(document => {
		if (document.fileName.endsWith('Requirements.md') || 
			document.fileName.endsWith('Questions.md') || 
			document.fileName.endsWith('Premises.md')) {
			diagnosticCollection.delete(document.uri);
			
			// Clean up snippet cache for closed document
			const documentPath = document.uri.toString();
			const keysToDelete = Array.from(snippetCache.keys()).filter(key => key.startsWith(documentPath + '#'));
			keysToDelete.forEach(key => snippetCache.delete(key));
		}
	});

	let disposable = vscode.commands.registerCommand('vscode-cal2.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from VSCode Cal2!');
	});

	context.subscriptions.push(
		disposable,
		onDidOpenDisposable,
		onDidChangeDisposable,
		onDidCloseDisposable,
		onDidChangeSelectionDisposable
	);
}

function checkDocumentFile(document: vscode.TextDocument): void {
	const fileName = document.fileName;
	
	if (fileName.endsWith('Requirements.md') || fileName.endsWith('Premises.md')) {
		checkRequirementsOrPremisesFile(document);
		updateSnippetCache(document);
	} else if (fileName.endsWith('Questions.md')) {
		checkQuestionsFile(document);
		updateSnippetCache(document);
	}
}

function checkRequirementsOrPremisesFile(document: vscode.TextDocument): void {
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
	const firstLevelHeadings: { line: number, text: string, secondLevelHeadings: string[] }[] = [];
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

	// Set diagnostics for this document
	diagnosticCollection.set(document.uri, diagnostics);
}

function checkQuestionsFile(document: vscode.TextDocument): void {
	const text = document.getText();
	const lines = text.split('\n');
	
	const diagnostics: vscode.Diagnostic[] = [];
	
	// Regex pattern for Questions.md first-level headings (allows optional trailing whitespace)
	const questionHeadingRegex = /^Question \d+\s*$/;
	
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
					`First-level heading in Questions.md must have exactly 10 blank lines above it. Found: ${blankLineCount} blank lines`,
					vscode.DiagnosticSeverity.Error
				);
				
				diagnostics.push(diagnostic);
			}
		}
		// Check if this is a second-level heading
		else if (trimmedLine.startsWith('## ') && trimmedLine.length > 3) {
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
					`Second-level heading in Questions.md must have exactly 2 blank lines above it. Found: ${blankLineCount} blank lines`,
					vscode.DiagnosticSeverity.Error
				);
				
				diagnostics.push(diagnostic);
			}
		}
	});

	// Validate snippets in Questions.md files
	const snippetDiagnostics = validateSnippets(document);
	diagnostics.push(...snippetDiagnostics);

	// Set diagnostics for this document
	diagnosticCollection.set(document.uri, diagnostics);
}

function updateSnippetCache(document: vscode.TextDocument): void {
	const fileName = document.fileName;
	if (!fileName.endsWith('Questions.md') && !fileName.endsWith('Premises.md')) {
		return;
	}

	const text = document.getText();
	
	// Clear existing snippets from this document
	const documentPath = document.uri.toString();
	const existingKeys = Array.from(snippetCache.keys()).filter(key => key.startsWith(documentPath + '#'));
	existingKeys.forEach(key => snippetCache.delete(key));
	
	// Parse snippet definitions
	const snippetRegex = /<snippet\s+id="([^"]+)">\s*([\s\S]*?)\s*<\/snippet>/g;
	let match;
	
	while ((match = snippetRegex.exec(text)) !== null) {
		const snippetId = match[1];
		const snippetContent = match[2].trim();
		const key = `${documentPath}#${snippetId}`;
		
		snippetCache.set(key, snippetContent);
	}
}

function validateSnippets(document: vscode.TextDocument): vscode.Diagnostic[] {
	const text = document.getText();
	const lines = text.split('\n');
	const diagnostics: vscode.Diagnostic[] = [];
	
	// Find all snippet definitions and references
	const snippetDefs = new Map<string, number[]>(); // id -> line numbers
	const snippetRefs = new Map<string, number[]>(); // id -> line numbers
	
	// Parse snippet definitions
	const snippetDefRegex = /<snippet\s+id="([^"]+)">/g;
	let match;
	
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
			const allSnippetIds = Array.from(snippetCache.keys()).map(key => key.split('#')[1]);
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

function showQuestionWebview(document: vscode.TextDocument, cursorPosition: vscode.Position): void {
	const text = document.getText();
	const lines = text.split('\n');
	
	// Find the first-level heading that contains the cursor position
	let questionHeading = '';
	let questionContent = '';
	let currentQuestionStartLine = -1;
	let nextQuestionStartLine = lines.length;
	
	// Find all first-level headings and determine which one contains the cursor
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith('# ') && line.length > 2) {
			if (i <= cursorPosition.line) {
				// This heading is at or before the cursor
				currentQuestionStartLine = i;
				questionHeading = line.substring(2).trim();
			} else if (currentQuestionStartLine >= 0 && nextQuestionStartLine === lines.length) {
				// This is the next heading after our current question
				nextQuestionStartLine = i;
				break;
			}
		}
	}
	
	// Extract the content for the current question
	if (currentQuestionStartLine >= 0) {
		questionContent = lines.slice(currentQuestionStartLine, nextQuestionStartLine).join('\n');
	}
	
	// Store the active editor and cursor position before opening webview
	const activeEditor = vscode.window.activeTextEditor;
	const originalSelection = activeEditor?.selection;
	
	// Only show webview if we found valid content
	if (questionContent) {
		// Create panel if it doesn't exist, otherwise reuse it
		if (!currentQuestionPanel) {
			currentQuestionPanel = vscode.window.createWebviewPanel(
				'questionViewer',
				`Question: ${questionHeading}`,
				vscode.ViewColumn.Beside,
				{
					enableScripts: true
				}
			);
			
			// Clear the reference when panel is disposed
			currentQuestionPanel.onDidDispose(() => {
				currentQuestionPanel = undefined;
				lastQuestionHeading = '';
			});
		}
		
		// Update the title and content (either for new question or content changes)
		if (questionHeading !== lastQuestionHeading) {
			lastQuestionHeading = questionHeading;
			currentQuestionPanel.title = `Question: ${questionHeading}`;
		}
		
		// Convert markdown to HTML (basic conversion)
		const htmlContent = convertMarkdownToHtml(questionContent);
		
		// Update the webview content
		currentQuestionPanel.webview.html = getWebviewContent(htmlContent);
		
		// Restore focus and cursor position to the original editor
		setTimeout(() => {
			if (activeEditor && originalSelection) {
				vscode.window.showTextDocument(activeEditor.document, {
					viewColumn: activeEditor.viewColumn,
					selection: originalSelection,
					preserveFocus: false
				});
			}
		}, 50);
	}
}

function updateWebviewContent(document: vscode.TextDocument): void {
	if (!currentQuestionPanel) {
		return;
	}
	
	const activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor || activeEditor.document !== document) {
		return;
	}
	
	const cursorPosition = activeEditor.selection.active;
	const text = document.getText();
	const lines = text.split('\n');
	
	// Find the first-level heading that contains the cursor position
	let questionHeading = '';
	let questionContent = '';
	let currentQuestionStartLine = -1;
	let nextQuestionStartLine = lines.length;
	
	// Find all first-level headings and determine which one contains the cursor
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith('# ') && line.length > 2) {
			if (i <= cursorPosition.line) {
				// This heading is at or before the cursor
				currentQuestionStartLine = i;
				questionHeading = line.substring(2).trim();
			} else if (currentQuestionStartLine >= 0 && nextQuestionStartLine === lines.length) {
				// This is the next heading after our current question
				nextQuestionStartLine = i;
				break;
			}
		}
	}
	
	// Extract the content for the current question
	if (currentQuestionStartLine >= 0) {
		questionContent = lines.slice(currentQuestionStartLine, nextQuestionStartLine).join('\n');
	}
	
	// Update the webview if we have content
	if (questionContent) {
		// Update title if question changed
		if (questionHeading !== lastQuestionHeading) {
			lastQuestionHeading = questionHeading;
			currentQuestionPanel.title = `Question: ${questionHeading}`;
		}
		
		// Convert markdown to HTML and update content
		const htmlContent = convertMarkdownToHtml(questionContent);
		currentQuestionPanel.webview.html = getWebviewContent(htmlContent);
	}
}

function convertMarkdownToHtml(markdown: string): string {
	// Load dependencies if not already loaded
	loadDependencies();
	
	let html = markdown;
	
	// Process snippets before markdown conversion
	html = processSnippets(html);
	
	// Pre-process custom tags before markdown conversion
	html = preprocessCustomTags(html);
	
	// If marked is available, use it for better markdown conversion
	if (marked) {
		try {
			// Configure marked for better HTML output
			marked.setOptions({
				breaks: true,
				gfm: true
			});
			html = marked.parse(html);
		} catch (error) {
			console.warn('Error parsing markdown with marked, falling back to basic conversion');
			html = basicMarkdownToHtml(html);
		}
	} else {
		html = basicMarkdownToHtml(html);
	}
	
	// Process LaTeX expressions if KaTeX is available
	if (katex) {
		try {
			// Process display math ($$...$$)
			html = html.replace(/\$\$([^$]+)\$\$/g, (match, latex) => {
				try {
					return katex.renderToString(latex.trim(), {
						displayMode: true,
						throwOnError: false
					});
				} catch (error) {
					return `<span class="latex-error">LaTeX Error: ${latex}</span>`;
				}
			});
			
			// Process inline math ($...$) - but avoid double processing
			html = html.replace(/(?<!\$)\$([^$\n]+)\$(?!\$)/g, (match, latex) => {
				try {
					return katex.renderToString(latex.trim(), {
						displayMode: false,
						throwOnError: false
					});
				} catch (error) {
					return `<span class="latex-error">LaTeX Error: ${latex}</span>`;
				}
			});
		} catch (error) {
			console.warn('Error rendering LaTeX expressions');
		}
	}
	
	return html;
}

function processSnippets(content: string): string {
	// First, resolve all snippet references
	content = content.replace(/<ref\s+id="([^"]+)"\s*\/>/g, (match, id) => {
		// Find the snippet content in the cache
		const snippetKey = Array.from(snippetCache.keys()).find(key => key.endsWith('#' + id));
		if (snippetKey) {
			const snippetContent = snippetCache.get(snippetKey);
			return snippetContent || `[Missing snippet: ${id}]`;
		}
		return `[Unresolved snippet: ${id}]`;
	});
	
	// Then, unwrap snippet definitions to show only their content
	content = content.replace(/<snippet\s+id="([^"]+)">\s*([\s\S]*?)\s*<\/snippet>/g, (match, id, snippetContent) => {
		return snippetContent.trim();
	});
	
	return content;
}

function preprocessCustomTags(markdown: string): string {
	// Convert custom snippet tags to HTML
	markdown = markdown.replace(/<snippet\s+id="([^"]+)">\s*([\s\S]*?)\s*<\/snippet>/g, 
		(match, id, content) => {
			return `<snippet id="${id}">\n${content}\n</snippet>`;
		});
	
	// Convert custom ref tags to HTML
	markdown = markdown.replace(/<ref\s+id="([^"]+)"\s*\/>/g, 
		(match, id) => {
			return `<ref id="${id}"></ref>`;
		});
	
	return markdown;
}

function basicMarkdownToHtml(markdown: string): string {
	// Basic markdown to HTML conversion (fallback when marked is not available)
	let html = markdown;
	
	// Convert headings
	html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
	html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
	html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
	
	// Convert bold and italic
	html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
	
	// Convert line breaks
	html = html.replace(/\n/g, '<br>');
	
	// Convert bullet points
	html = html.replace(/^- (.+$)/gim, '<li>$1</li>');
	html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
	
	return html;
}

function getWebviewContent(htmlContent: string): string {
	// Include KaTeX CSS for LaTeX rendering
	const katexCss = katex ? `
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous">
	` : '';
	
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Question Viewer</title>
	${katexCss}
	<style>
		body {
			font-family: var(--vscode-font-family);
			font-size: var(--vscode-font-size);
			color: var(--vscode-foreground);
			background-color: var(--vscode-editor-background);
			line-height: 1.6;
			padding: 20px;
			max-width: none;
		}
		h1, h2, h3 {
			color: var(--vscode-textLink-foreground);
			margin-top: 1.5em;
			margin-bottom: 0.5em;
		}
		h1 {
			border-bottom: 1px solid var(--vscode-textBlockQuote-border);
			padding-bottom: 0.3em;
		}
		ul, ol {
			padding-left: 20px;
		}
		li {
			margin-bottom: 5px;
		}
		p {
			margin-bottom: 1em;
		}
		pre, code {
			font-family: var(--vscode-editor-font-family);
			background-color: var(--vscode-textBlockQuote-background);
			padding: 2px 4px;
			border-radius: 3px;
		}
		pre {
			padding: 10px;
			overflow-x: auto;
		}
		blockquote {
			border-left: 4px solid var(--vscode-textBlockQuote-border);
			padding-left: 16px;
			margin-left: 0;
			color: var(--vscode-textBlockQuote-foreground);
		}
		.katex {
			font-size: 1.1em;
		}
		.latex-error {
			color: var(--vscode-errorForeground);
			background-color: var(--vscode-inputValidation-errorBackground);
			padding: 2px 4px;
			border-radius: 3px;
			font-family: monospace;
		}
	</style>
</head>
<body>
	${htmlContent}
</body>
</html>`;
}

export function deactivate() {
	if (diagnosticCollection) {
		diagnosticCollection.dispose();
	}
	if (currentQuestionPanel) {
		currentQuestionPanel.dispose();
	}
	if (debounceTimer) {
		clearTimeout(debounceTimer);
	}
	// Clear snippet cache
	snippetCache.clear();
}
