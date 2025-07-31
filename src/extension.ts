import * as vscode from 'vscode';

let diagnosticCollection: vscode.DiagnosticCollection;
let currentQuestionPanel: vscode.WebviewPanel | undefined;
let lastQuestionHeading: string = '';
let debounceTimer: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-cal2" is now active!');

	// Create a diagnostic collection for our extension
	diagnosticCollection = vscode.languages.createDiagnosticCollection('vscode-cal2');
	context.subscriptions.push(diagnosticCollection);

	// Check currently open documents when extension activates
	vscode.workspace.textDocuments.forEach(document => {
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
	} else if (fileName.endsWith('Questions.md')) {
		checkQuestionsFile(document);
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

	// Set diagnostics for this document
	diagnosticCollection.set(document.uri, diagnostics);
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
	// Basic markdown to HTML conversion
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
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Question Viewer</title>
	<style>
		body {
			font-family: var(--vscode-font-family);
			font-size: var(--vscode-font-size);
			color: var(--vscode-foreground);
			background-color: var(--vscode-editor-background);
			line-height: 1.6;
			padding: 20px;
		}
		h1, h2, h3 {
			color: var(--vscode-textLink-foreground);
		}
		ul {
			padding-left: 20px;
		}
		li {
			margin-bottom: 5px;
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
}
