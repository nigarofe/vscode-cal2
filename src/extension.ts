import * as vscode from 'vscode';
import { ExtensionState } from './types';
import { isRelevantFile, isQuestionsFile, debounce } from './utils';
import { snippetCache } from './snippets/snippetCache';
import { validateDocument } from './diagnostics/documentValidator';
import { questionWebview } from './webview/questionWebview';
import { markdownRenderer } from './webview/markdownRenderer';

let state: ExtensionState;

export async function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-cal2" is now active!');

	// Initialize state
	state = {
		diagnosticCollection: vscode.languages.createDiagnosticCollection('vscode-cal2'),
		lastQuestionHeading: ''
	};
	context.subscriptions.push(state.diagnosticCollection);

	// Load dependencies asynchronously
	await markdownRenderer.loadDependencies();

	// Initialize snippet cache
	await snippetCache.initialize();

	// Check currently open documents when extension activates
	vscode.workspace.textDocuments.forEach(document => {
		if (isRelevantFile(document.fileName)) {
			validateDocument(document, state.diagnosticCollection);
		}
	});

	// Create debounced functions
	const debouncedUpdateWebview = debounce((document: vscode.TextDocument) => {
		questionWebview.updateContent(document);
	}, 300);

	const debouncedShowWebview = debounce((document: vscode.TextDocument, position: vscode.Position) => {
		questionWebview.show(document, position);
	}, 500);

	// Listen for document open events
	const onDidOpenDisposable = vscode.workspace.onDidOpenTextDocument(document => {
		if (isRelevantFile(document.fileName)) {
			// Update snippet cache for all relevant documents
			vscode.workspace.textDocuments.forEach(doc => {
				if (isRelevantFile(doc.fileName)) {
					snippetCache.updateFromDocument(doc);
				}
			});
			
			// Then validate all relevant documents
			vscode.workspace.textDocuments.forEach(doc => {
				if (isRelevantFile(doc.fileName)) {
					validateDocument(doc, state.diagnosticCollection);
				}
			});
		} else if (isRelevantFile(document.fileName)) {
			validateDocument(document, state.diagnosticCollection);
		}
	});

	// Listen for document change events
	const onDidChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
		if (isRelevantFile(event.document.fileName)) {
			// Check if any snippet definitions were affected
			const hasSnippetChanges = event.contentChanges.some(change => 
				change.text.includes('<snippet') || change.text.includes('<ref') ||
				change.rangeLength > 0 // Something was deleted
			);
			
			if (hasSnippetChanges) {
				// Update snippet cache for all relevant documents
				vscode.workspace.textDocuments.forEach(doc => {
					if (isRelevantFile(doc.fileName)) {
						snippetCache.updateFromDocument(doc);
					}
				});
				
				// Re-validate all relevant documents
				vscode.workspace.textDocuments.forEach(doc => {
					if (isRelevantFile(doc.fileName)) {
						validateDocument(doc, state.diagnosticCollection);
					}
				});
			} else {
				// For other changes, update cache for this document and then validate
				snippetCache.updateFromDocument(event.document);
				validateDocument(event.document, state.diagnosticCollection);
			}
		} else {
			validateDocument(event.document, state.diagnosticCollection);
		}
		
		// Update webview content in real time for Questions.md files
		if (isQuestionsFile(event.document.fileName) && questionWebview.isActive) {
			debouncedUpdateWebview(event.document);
		}
	});

	// Listen for cursor position changes in Questions.md files
	const onDidChangeSelectionDisposable = vscode.window.onDidChangeTextEditorSelection(event => {
		const document = event.textEditor.document;
		if (isQuestionsFile(document.fileName)) {
			debouncedShowWebview(document, event.selections[0].active);
		}
	});

	// Listen for document close events to clear diagnostics
	const onDidCloseDisposable = vscode.workspace.onDidCloseTextDocument(document => {
		if (isRelevantFile(document.fileName)) {
			state.diagnosticCollection.delete(document.uri);
			snippetCache.cleanupForDocument(document);
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

export function deactivate() {
	if (state?.diagnosticCollection) {
		state.diagnosticCollection.dispose();
	}
	questionWebview.dispose();
	if (state?.debounceTimer) {
		clearTimeout(state.debounceTimer);
	}
	snippetCache.clear();
}
