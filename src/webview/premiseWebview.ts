import * as vscode from 'vscode';
import * as path from 'path';
import { markdownRenderer } from './markdownRenderer';

export class PremiseWebview {
	private panel?: vscode.WebviewPanel;
	private lastPremiseSetHeading: string = '';

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
		let premiseSetHeading = '';
		let premiseSetContent = '';
		let currentPremiseSetStartLine = -1;
		let nextPremiseSetStartLine = lines.length;
		
		// Find all first-level headings and determine which one contains the cursor
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line.startsWith('# ') && line.length > 2) {
				if (i <= cursorPosition.line) {
					// This heading is at or before the cursor
					currentPremiseSetStartLine = i;
					premiseSetHeading = line.substring(2).trim();
				} else if (currentPremiseSetStartLine >= 0 && nextPremiseSetStartLine === lines.length) {
					// This is the next heading after our current premise set
					nextPremiseSetStartLine = i;
					break;
				}
			}
		}
		
		// Extract the content for the current premise set
		if (currentPremiseSetStartLine >= 0) {
			premiseSetContent = lines.slice(currentPremiseSetStartLine, nextPremiseSetStartLine).join('\n');
		}
		
		// Store the active editor and cursor position before opening webview
		const activeEditor = vscode.window.activeTextEditor;
		const originalSelection = activeEditor?.selection;
		
		// Only show webview if we found valid content
		if (premiseSetContent) {
			// Create panel if it doesn't exist, otherwise reuse it
			if (!this.panel) {
				this.panel = vscode.window.createWebviewPanel(
					'premiseViewer',
					`Premise Set: ${premiseSetHeading}`,
					{ viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
					{
						enableScripts: true,
						localResourceRoots: this.getLocalResourceRoots()
					}
				);
				
				// Clear the reference when panel is disposed
				this.panel.onDidDispose(() => {
					this.panel = undefined;
					this.lastPremiseSetHeading = '';
				});
			}
			
			// Update the title and content (either for new premise set or content changes)
			if (premiseSetHeading !== this.lastPremiseSetHeading) {
				this.lastPremiseSetHeading = premiseSetHeading;
				this.panel.title = `Premise Set: ${premiseSetHeading}`;
			}
			
			// Convert markdown to HTML
			const htmlContent = await markdownRenderer.convertMarkdownToHtml(premiseSetContent, this.panel.webview);
			
			// Update the webview content without taking focus
			this.panel.webview.html = markdownRenderer.getWebviewContent(htmlContent);
			
			// Ensure the panel is visible but doesn't take focus
			this.panel.reveal(vscode.ViewColumn.Beside, true);
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
		let premiseSetHeading = '';
		let premiseSetContent = '';
		let currentPremiseSetStartLine = -1;
		let nextPremiseSetStartLine = lines.length;
		
		// Find all first-level headings and determine which one contains the cursor
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line.startsWith('# ') && line.length > 2) {
				if (i <= cursorPosition.line) {
					// This heading is at or before the cursor
					currentPremiseSetStartLine = i;
					premiseSetHeading = line.substring(2).trim();
				} else if (currentPremiseSetStartLine >= 0 && nextPremiseSetStartLine === lines.length) {
					// This is the next heading after our current premise set
					nextPremiseSetStartLine = i;
					break;
				}
			}
		}
		
		// Extract the content for the current premise set
		if (currentPremiseSetStartLine >= 0) {
			premiseSetContent = lines.slice(currentPremiseSetStartLine, nextPremiseSetStartLine).join('\n');
		}
		
		// Update the webview if we have content
		if (premiseSetContent) {
			// Update title if premise set changed
			if (premiseSetHeading !== this.lastPremiseSetHeading) {
				this.lastPremiseSetHeading = premiseSetHeading;
				this.panel.title = `Premise Set: ${premiseSetHeading}`;
			}
			
			// Convert markdown to HTML and update content
			const htmlContent = await markdownRenderer.convertMarkdownToHtml(premiseSetContent, this.panel.webview);
			this.panel.webview.html = markdownRenderer.getWebviewContent(htmlContent);
			
			// Reveal the panel without taking focus
			this.panel.reveal(vscode.ViewColumn.Beside, true);
		}
	}

	dispose(): void {
		if (this.panel) {
			this.panel.dispose();
			this.panel = undefined;
			this.lastPremiseSetHeading = '';
		}
	}

	get isActive(): boolean {
		return this.panel !== undefined;
	}
}

// Global instance
export const premiseWebview = new PremiseWebview();
