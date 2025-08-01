import * as vscode from 'vscode';
import * as path from 'path';
import { Dependencies } from '../types';
import { snippetCache } from '../snippets/snippetCache';

export class MarkdownRenderer {
	private marked?: any;
	private katex?: any;

	async loadDependencies(): Promise<void> {
		if (!this.marked) {
			try {
				this.marked = require('marked');
			} catch (error) {
				console.warn('Marked library not available, using basic markdown conversion');
			}
		}
		if (!this.katex) {
			try {
				this.katex = require('katex');
			} catch (error) {
				console.warn('KaTeX library not available, LaTeX expressions will not be rendered');
			}
		}
	}

	async convertMarkdownToHtml(markdown: string, webview?: vscode.Webview): Promise<string> {
		// Load dependencies if not already loaded
		await this.loadDependencies();
		
		let html = markdown;
		
		// Process snippets before markdown conversion
		html = snippetCache.processSnippets(html);
		
		// Process images before markdown conversion
		html = this.processImages(html, webview);
		
		// Pre-process custom tags before markdown conversion
		html = this.preprocessCustomTags(html);
		
		// Process LaTeX expressions BEFORE markdown conversion to prevent corruption
		const latexPlaceholders = new Map<string, string>();
		let placeholderIndex = 0;
		
		if (this.katex) {
			try {
				// console.log('Processing LaTeX with KaTeX...');
				
				// Process display math ($$...$$) - supports multi-line expressions
				html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
					try {
						// console.log('Rendering display LaTeX:', latex.trim());
						const rendered = this.katex.renderToString(latex.trim(), {
							displayMode: true,
							throwOnError: false
						});
						const placeholder = `LATEXPLACEHOLDER${placeholderIndex++}LATEXPLACEHOLDER`;
						// console.log('Created placeholder:', placeholder, 'for rendered content:', rendered.substring(0, 50) + '...');
						latexPlaceholders.set(placeholder, rendered);
						return placeholder;
					} catch (error) {
						console.warn('Error rendering display LaTeX:', latex, error);
						return `<span class="latex-error">LaTeX Error: ${latex}</span>`;
					}
				});
				
				// Process inline math ($...$) - but avoid double processing
				html = html.replace(/(?<!\$)\$([^$\n]+)\$(?!\$)/g, (match, latex) => {
					try {
						// console.log('Rendering inline LaTeX:', latex.trim());
						const rendered = this.katex.renderToString(latex.trim(), {
							displayMode: false,
							throwOnError: false
						});
						const placeholder = `LATEXPLACEHOLDER${placeholderIndex++}LATEXPLACEHOLDER`;
						// console.log('Created placeholder:', placeholder, 'for rendered content:', rendered.substring(0, 50) + '...');
						latexPlaceholders.set(placeholder, rendered);
						return placeholder;
					} catch (error) {
						console.warn('Error rendering inline LaTeX:', latex, error);
						return `<span class="latex-error">LaTeX Error: ${latex}</span>`;
					}
				});
			} catch (error) {
				console.warn('Error rendering LaTeX expressions');
			}
		} else {
			console.warn('KaTeX not available for LaTeX rendering');
		}
		
		// If marked is available, use it for better markdown conversion
		if (this.marked) {
			try {
				// Configure marked for better HTML output
				this.marked.setOptions({
					breaks: true,
					gfm: true
				});
				html = this.marked.parse(html);
			} catch (error) {
				console.warn('Error parsing markdown with marked, falling back to basic conversion');
				html = this.basicMarkdownToHtml(html);
			}
		} else {
			html = this.basicMarkdownToHtml(html);
		}
		
		// console.log('HTML before LaTeX restoration:', html);
		// console.log('LaTeX placeholders to restore:', Array.from(latexPlaceholders.keys()));
		
		// Restore LaTeX content after markdown processing
		latexPlaceholders.forEach((rendered, placeholder) => {
			// console.log('Restoring placeholder:', placeholder);
			const beforeReplace = html.includes(placeholder);
			
			// Direct replacement
			html = html.split(placeholder).join(rendered);
			
			const afterReplace = html.includes(placeholder);
			// console.log('Placeholder found before replacement:', beforeReplace, 'Still exists after:', afterReplace);
			if (afterReplace) {
				console.warn('Placeholder still exists after replacement:', placeholder);
			}
		});
		
		// console.log('Final HTML after LaTeX restoration:', html);
		
		return html;
	}

	private preprocessCustomTags(markdown: string): string {
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

	private processImages(markdown: string, webview?: any): string {
		// Process markdown images and convert relative paths to webview URIs
		return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
			// Check if it's a relative path to images folder
			if (src.startsWith('images/')) {
				if (webview) {
					// Convert to webview URI when webview is available
					const workspaceFolders = vscode.workspace.workspaceFolders;
					if (workspaceFolders && workspaceFolders.length > 0) {
						let imagePath: vscode.Uri;
						
						// Try different strategies to find the correct path
						for (const folder of workspaceFolders) {
							const folderPath = folder.uri.fsPath;
							// console.log('Checking workspace folder:', folderPath);
							
							// Strategy 1: If this folder ends with 'data', use it directly
							if (folderPath.endsWith('data')) {
								imagePath = vscode.Uri.file(path.join(folderPath, src));
								// console.log('Strategy 1 - Using data folder directly:', imagePath.fsPath);
								break;
							}
							
							// Strategy 2: If this folder contains 'data' subfolder, use that
							const dataSubfolder = path.join(folderPath, 'data');
							try {
								// Check if data subfolder exists
								const fs = require('fs');
								if (fs.existsSync(dataSubfolder)) {
									imagePath = vscode.Uri.file(path.join(dataSubfolder, src));
									// console.log('Strategy 2 - Using data subfolder:', imagePath.fsPath);
									break;
								}
							} catch (error) {
								// Continue to next strategy
							}
						}
						
						// Fallback: use first folder + data + src
						if (!imagePath!) {
							const fallbackPath = path.join(workspaceFolders[0].uri.fsPath, 'data', src);
							imagePath = vscode.Uri.file(fallbackPath);
							// console.log('Fallback strategy:', imagePath.fsPath);
						}
						
						const webviewUri = webview.asWebviewUri(imagePath);
						// console.log('Final image URI:', webviewUri.toString());
						return `![${alt}](${webviewUri})`;
					}
				} else {
					// For now, keep the relative path - will be processed later in webview
					return `<img src="${src}" alt="${alt}" style="max-width: 100%; height: auto; display: block; margin: 1em 0;">`;
				}
			}
			// Keep absolute URLs or other formats as-is
			return match;
		});
	}

	private getDataFolderPath(): string {
		// Get the workspace folder and construct path to data folder
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (workspaceFolders && workspaceFolders.length > 0) {
			return path.join(workspaceFolders[0].uri.fsPath, 'data');
		}
		return '';
	}

	private basicMarkdownToHtml(markdown: string): string {
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

	getWebviewContent(htmlContent: string): string {
		// Include KaTeX CSS for LaTeX rendering
		const katexCss = this.katex ? `
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
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			font-size: 16px;
			color: var(--vscode-foreground);
			background-color: var(--vscode-editor-background);
			line-height: 1.7;
			padding: 32px 40px;
			max-width: 800px;
			margin: 0 auto;
		}
		
		h1, h2, h3, h4, h5, h6 {
			color: var(--vscode-textLink-foreground);
			font-weight: 600;
			line-height: 1.3;
			margin-top: 2em;
			margin-bottom: 0.8em;
		}
		
		h1 {
			font-size: 2em;
			border-bottom: 2px solid var(--vscode-textBlockQuote-border);
			padding-bottom: 0.5em;
			margin-top: 0;
		}
		
		h2 {
			font-size: 1.5em;
			margin-top: 2.5em;
		}
		
		h3 {
			font-size: 1.25em;
			margin-top: 2em;
		}
		
		p {
			margin-bottom: 1.2em;
			text-align: justify;
		}
		
		ul, ol {
			padding-left: 28px;
			margin-bottom: 1.2em;
		}
		
		li {
			margin-bottom: 0.6em;
			line-height: 1.6;
		}
		
		li p {
			margin-bottom: 0.6em;
		}
		
		strong {
			font-weight: 600;
			color: var(--vscode-textLink-foreground);
		}
		
		em {
			font-style: italic;
			color: var(--vscode-descriptionForeground);
		}
		
		code {
			font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
			background-color: var(--vscode-textCodeBlock-background);
			color: var(--vscode-textPreformat-foreground);
			padding: 3px 6px;
			border-radius: 4px;
			font-size: 0.9em;
			border: 1px solid var(--vscode-textBlockQuote-border);
		}
		
		pre {
			font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
			background-color: var(--vscode-textCodeBlock-background);
			color: var(--vscode-textPreformat-foreground);
			padding: 16px 20px;
			border-radius: 6px;
			overflow-x: auto;
			margin: 1.2em 0;
			border: 1px solid var(--vscode-textBlockQuote-border);
			line-height: 1.5;
		}
		
		pre code {
			background: none;
			padding: 0;
			border: none;
			border-radius: 0;
		}
		
		blockquote {
			border-left: 4px solid var(--vscode-textLink-foreground);
			padding: 16px 20px;
			margin: 1.2em 0;
			background-color: var(--vscode-textBlockQuote-background);
			color: var(--vscode-textBlockQuote-foreground);
			border-radius: 0 4px 4px 0;
			font-style: italic;
		}
		
		blockquote p {
			margin-bottom: 0.8em;
		}
		
		blockquote p:last-child {
			margin-bottom: 0;
		}
		
		table {
			border-collapse: collapse;
			width: 100%;
			margin: 1.2em 0;
		}
		
		th, td {
			border: 1px solid var(--vscode-textBlockQuote-border);
			padding: 8px 12px;
			text-align: left;
		}
		
		th {
			background-color: var(--vscode-textBlockQuote-background);
			font-weight: 600;
		}
		
		hr {
			border: none;
			border-top: 1px solid var(--vscode-textBlockQuote-border);
			margin: 2em 0;
		}
		
		.katex {
			font-size: 1.1em;
		}
		
		.katex-display {
			margin: 1.2em 0;
		}
		
		.latex-error {
			color: var(--vscode-errorForeground);
			background-color: var(--vscode-inputValidation-errorBackground);
			padding: 4px 8px;
			border-radius: 4px;
			font-family: monospace;
			border: 1px solid var(--vscode-inputValidation-errorBorder);
		}
		
		/* Improve readability with better spacing for nested content */
		li ul, li ol {
			margin-top: 0.4em;
			margin-bottom: 0.4em;
		}
		
		/* Better spacing for consecutive headings */
		h1 + h2, h2 + h3, h3 + h4 {
			margin-top: 1em;
		}
		
		/* Ensure proper spacing around math elements */
		.katex + p, p + .katex {
			margin-top: 1em;
		}
		
		/* Image styling */
		img {
			max-width: 100%;
			height: auto;
			display: block;
			margin: 1em auto;
			border-radius: 4px;
			border: 1px solid var(--vscode-textBlockQuote-border);
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		}
		
		/* Responsive design for smaller screens */
		@media (max-width: 768px) {
			body {
				padding: 20px 24px;
				font-size: 15px;
			}
			
			h1 {
				font-size: 1.75em;
			}
			
			h2 {
				font-size: 1.35em;
			}
		}
	</style>
</head>
<body>
	${htmlContent}
</body>
</html>`;
	}
}

// Global instance
export const markdownRenderer = new MarkdownRenderer();
