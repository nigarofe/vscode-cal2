import * as vscode from 'vscode';
import { ExtensionState } from './types';
import { isRelevantFile, isQuestionsFile, isPremisesFile, debounce, needsSpacingFormatting } from './utils';
import { snippetCache } from './snippets/snippetCache';
import { validateDocument } from './diagnostics/documentValidator';
import { questionWebview } from './webview/questionWebview';
import { premiseWebview } from './webview/premiseWebview';
import { markdownRenderer } from './webview/markdownRenderer';
import { spacingFormatter } from './formatting/spacingFormatter';

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
	const debouncedUpdateWebview = debounce(async (document: vscode.TextDocument) => {
		await questionWebview.updateContent(document);
	}, 300);

	const debouncedShowWebview = debounce(async (document: vscode.TextDocument, position: vscode.Position) => {
		await questionWebview.show(document, position);
	}, 500);

	const debouncedUpdatePremiseWebview = debounce(async (document: vscode.TextDocument) => {
		await premiseWebview.updateContent(document);
	}, 300);

	const debouncedShowPremiseWebview = debounce(async (document: vscode.TextDocument, position: vscode.Position) => {
		await premiseWebview.show(document, position);
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
			
			// Schedule automatic spacing formatting for Questions.md and Premises.md
			if (needsSpacingFormatting(event.document.fileName)) {
				spacingFormatter.scheduleFormatting(event.document);
			}
		} else {
			validateDocument(event.document, state.diagnosticCollection);
		}
		
		// Update webview content in real time for Questions.md files
		if (isQuestionsFile(event.document.fileName) && questionWebview.isActive) {
			debouncedUpdateWebview(event.document);
		}
		
		// Update webview content in real time for Premises.md files
		if (isPremisesFile(event.document.fileName) && premiseWebview.isActive) {
			debouncedUpdatePremiseWebview(event.document);
		}
	});

	// Listen for cursor position changes in Questions.md and Premises.md files
	const onDidChangeSelectionDisposable = vscode.window.onDidChangeTextEditorSelection(event => {
		const document = event.textEditor.document;
		if (isQuestionsFile(document.fileName)) {
			debouncedShowWebview(document, event.selections[0].active);
		} else if (isPremisesFile(document.fileName)) {
			debouncedShowPremiseWebview(document, event.selections[0].active);
		}
	});

	// Listen for active editor changes to cancel pending formatting
	const onDidChangeActiveEditorDisposable = vscode.window.onDidChangeActiveTextEditor(editor => {
		// Cancel any pending formatting when switching between editors
		spacingFormatter.cancelFormatting();
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

	// Add a manual formatting command for testing
	let formatCommand = vscode.commands.registerCommand('vscode-cal2.formatSpacing', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor && needsSpacingFormatting(editor.document.fileName)) {
			console.log('Manual formatting triggered');
			spacingFormatter.scheduleFormatting(editor.document, 100); // Short delay for manual trigger
			vscode.window.showInformationMessage('Spacing formatting triggered!');
		} else {
			vscode.window.showWarningMessage('Please open a Questions.md or Premises.md file to format spacing.');
		}
	});

	context.subscriptions.push(
		disposable,
		formatCommand,
		onDidOpenDisposable,
		onDidChangeDisposable,
		onDidCloseDisposable,
		onDidChangeSelectionDisposable,
		onDidChangeActiveEditorDisposable
	);
}

export function deactivate() {
	if (state?.diagnosticCollection) {
		state.diagnosticCollection.dispose();
	}
	questionWebview.dispose();
	premiseWebview.dispose();
	spacingFormatter.dispose();
	if (state?.debounceTimer) {
		clearTimeout(state.debounceTimer);
	}
	snippetCache.clear();
}
