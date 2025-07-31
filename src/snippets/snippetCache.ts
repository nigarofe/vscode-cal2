import * as vscode from 'vscode';
import { isQuestionsFile, isRequirementsOrPremisesFile } from '../utils';

export class SnippetCache {
	private cache: Map<string, string> = new Map();

	clear(): void {
		this.cache.clear();
	}

	get size(): number {
		return this.cache.size;
	}

	get(key: string): string | undefined {
		return this.cache.get(key);
	}

	set(key: string, value: string): void {
		this.cache.set(key, value);
	}

	delete(key: string): void {
		this.cache.delete(key);
	}

	keys(): IterableIterator<string> {
		return this.cache.keys();
	}

	entries(): IterableIterator<[string, string]> {
		return this.cache.entries();
	}

	getAllSnippetIds(): string[] {
		return Array.from(this.cache.keys()).map(key => key.split('#')[1]);
	}

	async initialize(): Promise<void> {
		this.clear();
		
		console.log('Initializing snippet cache...');
		
		// First, load snippets from all currently open documents
		vscode.workspace.textDocuments.forEach(document => {
			console.log(`Processing open document for snippets: ${document.fileName}`);
			this.updateFromDocument(document);
		});
		
		// Then, search for and load snippets from all .md files in the workspace
		try {
			const mdFiles = await vscode.workspace.findFiles('**/*.md', '**/node_modules/**');
			console.log(`Found ${mdFiles.length} markdown files in workspace`);
			
			for (const fileUri of mdFiles) {
				// Skip if this file is already open (already processed above)
				const isAlreadyOpen = vscode.workspace.textDocuments.some(doc => doc.uri.toString() === fileUri.toString());
				if (isAlreadyOpen) {
					console.log(`Skipping already open file: ${fileUri.fsPath}`);
					continue;
				}
				
				// Only process Questions.md and Premises.md files
				if (isQuestionsFile(fileUri.fsPath) || isRequirementsOrPremisesFile(fileUri.fsPath)) {
					console.log(`Loading snippets from closed file: ${fileUri.fsPath}`);
					try {
						const document = await vscode.workspace.openTextDocument(fileUri);
						this.updateFromDocument(document);
					} catch (error) {
						console.warn(`Failed to load document ${fileUri.fsPath}:`, error);
					}
				}
			}
		} catch (error) {
			console.warn('Failed to search for markdown files:', error);
		}
		
		console.log(`Snippet cache initialization complete. Total snippets: ${this.size}`);
		console.log('Final snippet cache keys:', Array.from(this.keys()));
	}

	updateFromDocument(document: vscode.TextDocument): void {
		const fileName = document.fileName;
		if (!isQuestionsFile(fileName) && !isRequirementsOrPremisesFile(fileName)) {
			return;
		}

		const text = document.getText();
		
		// Clear existing snippets from this document
		const documentPath = document.uri.toString();
		const existingKeys = Array.from(this.keys()).filter(key => key.startsWith(documentPath + '#'));
		existingKeys.forEach(key => this.delete(key));
		
		console.log(`Updating snippet cache for document: ${fileName}`);
		
		// Parse snippet definitions
		const snippetRegex = /<snippet\s+id="([^"]+)">\s*([\s\S]*?)\s*<\/snippet>/g;
		let match;
		
		while ((match = snippetRegex.exec(text)) !== null) {
			const snippetId = match[1];
			const snippetContent = match[2].trim();
			const key = `${documentPath}#${snippetId}`;
			
			console.log(`Found snippet: ${snippetId} in ${fileName}`);
			this.set(key, snippetContent);
		}
		
		console.log(`Updated snippet cache. Total snippets: ${this.size}`);
		console.log(`Snippet cache keys: ${Array.from(this.keys())}`);
	}

	cleanupForDocument(document: vscode.TextDocument): void {
		const documentPath = document.uri.toString();
		const keysToDelete = Array.from(this.keys()).filter(key => key.startsWith(documentPath + '#'));
		keysToDelete.forEach(key => this.delete(key));
	}

	processSnippets(content: string): string {
		// First, resolve all snippet references
		content = content.replace(/<ref\s+id="([^"]+)"\s*\/>/g, (match, id) => {
			// Find the snippet content in the cache
			const snippetKey = Array.from(this.keys()).find(key => key.endsWith('#' + id));
			if (snippetKey) {
				const snippetContent = this.get(snippetKey);
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
}

// Global instance
export const snippetCache = new SnippetCache();
