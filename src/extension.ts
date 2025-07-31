import * as vscode from 'vscode';

let diagnosticCollection: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-cal2" is now active!');

	// Create a diagnostic collection for our extension
	diagnosticCollection = vscode.languages.createDiagnosticCollection('vscode-cal2');
	context.subscriptions.push(diagnosticCollection);

	// Check currently open documents when extension activates
	vscode.workspace.textDocuments.forEach(document => {
		checkRequirementsFile(document);
	});

	// Listen for document open events
	const onDidOpenDisposable = vscode.workspace.onDidOpenTextDocument(document => {
		checkRequirementsFile(document);
	});

	// Listen for document change events
	const onDidChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
		checkRequirementsFile(event.document);
	});

	// Listen for document close events to clear diagnostics
	const onDidCloseDisposable = vscode.workspace.onDidCloseTextDocument(document => {
		if (document.fileName.endsWith('Requirements.md')) {
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
		onDidCloseDisposable
	);
}

function checkRequirementsFile(document: vscode.TextDocument): void {
	// Check if the file is named "Requirements.md"
	if (!document.fileName.endsWith('Requirements.md')) {
		return;
	}

	const text = document.getText();
	const lines = text.split('\n');
	
	// Check if any line contains "# Hello World"
	const hasHelloWorldHeading = lines.some(line => 
		line.trim() === '# Hello World'
	);

	if (!hasHelloWorldHeading) {
		// Create a diagnostic (problem) for the missing heading
		const diagnostic = new vscode.Diagnostic(
			new vscode.Range(0, 0, 0, 0), // Position at the start of the file
			'Requirements.md file must contain the heading "# Hello World"',
			vscode.DiagnosticSeverity.Warning
		);

		diagnosticCollection.set(document.uri, [diagnostic]);
	} else {
		// Clear any existing diagnostics for this file
		diagnosticCollection.delete(document.uri);
	}
}

export function deactivate() {
	if (diagnosticCollection) {
		diagnosticCollection.dispose();
	}
}
