import * as vscode from 'vscode';

export interface ExtensionState {
	diagnosticCollection: vscode.DiagnosticCollection;
	currentQuestionPanel?: vscode.WebviewPanel;
	lastQuestionHeading: string;
	debounceTimer?: NodeJS.Timeout;
}

export interface HeadingInfo {
	line: number;
	text: string;
	secondLevelHeadings: string[];
}

export interface SnippetInfo {
	id: string;
	content: string;
	documentPath: string;
}

export interface Dependencies {
	marked?: any;
	katex?: any;
}
