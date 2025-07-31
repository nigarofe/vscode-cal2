import * as vscode from 'vscode';
import * as path from 'path';
import { markdownRenderer } from './markdownRenderer';

export class QuestionWebview {
	private panel?: vscode.WebviewPanel;
	private lastQuestionHeading: string = '';

	private getLocalResourceRoots(): vscode.Uri[] {
		const roots: vscode.Uri[] = [];
		const workspaceFolders = vscode.workspace.workspaceFolders;
		
		if (workspaceFolders && workspaceFolders.length > 0) {
			// Add the data folder if it exists as a workspace folder
			const dataFolder = workspaceFolders.find(folder => 
				folder.name === 'data' || folder.uri.fsPath.endsWith('\\data')
			);
			
			if (dataFolder) {
				roots.push(dataFolder.uri);
			}
			
			// Also add root workspace folder + data path as fallback
			const rootFolder = workspaceFolders.find(folder => 
				folder.name === 'vscode-cal2' || folder.uri.fsPath.endsWith('vscode-cal2')
			);
			
			if (rootFolder) {
				roots.push(vscode.Uri.file(path.join(rootFolder.uri.fsPath, 'data')));
			}
			
			// Add all workspace folders as potential roots
			workspaceFolders.forEach(folder => {
				if (!roots.some(root => root.fsPath === folder.uri.fsPath)) {
					roots.push(folder.uri);
				}
			});
		}
		
		console.log('Local resource roots:', roots.map(r => r.fsPath));
		return roots;
	}

	async show(document: vscode.TextDocument, cursorPosition: vscode.Position): Promise<void> {
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
			if (!this.panel) {
				this.panel = vscode.window.createWebviewPanel(
					'questionViewer',
					`Question: ${questionHeading}`,
					vscode.ViewColumn.Beside,
					{
						enableScripts: true,
						localResourceRoots: this.getLocalResourceRoots()
					}
				);
				
				// Clear the reference when panel is disposed
				this.panel.onDidDispose(() => {
					this.panel = undefined;
					this.lastQuestionHeading = '';
				});
			}
			
			// Update the title and content (either for new question or content changes)
			if (questionHeading !== this.lastQuestionHeading) {
				this.lastQuestionHeading = questionHeading;
				this.panel.title = `Question: ${questionHeading}`;
			}
			
			// Convert markdown to HTML
			const htmlContent = await markdownRenderer.convertMarkdownToHtml(questionContent, this.panel.webview);
			
			// Update the webview content
			this.panel.webview.html = markdownRenderer.getWebviewContent(htmlContent);
			
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

	async updateContent(document: vscode.TextDocument): Promise<void> {
		if (!this.panel) {
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
			if (questionHeading !== this.lastQuestionHeading) {
				this.lastQuestionHeading = questionHeading;
				this.panel.title = `Question: ${questionHeading}`;
			}
			
			// Convert markdown to HTML and update content
			const htmlContent = await markdownRenderer.convertMarkdownToHtml(questionContent, this.panel.webview);
			this.panel.webview.html = markdownRenderer.getWebviewContent(htmlContent);
		}
	}

	dispose(): void {
		if (this.panel) {
			this.panel.dispose();
			this.panel = undefined;
			this.lastQuestionHeading = '';
		}
	}

	get isActive(): boolean {
		return this.panel !== undefined;
	}
}

// Global instance
export const questionWebview = new QuestionWebview();
