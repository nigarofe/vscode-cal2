import * as vscode from 'vscode';

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
	let timeoutId: NodeJS.Timeout;
	return ((...args: any[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => func(...args), delay);
	}) as T;
}

export function isMarkdownFile(fileName: string): boolean {
	return fileName.endsWith('.md');
}

export function isRequirementsOrPremisesFile(fileName: string): boolean {
	return fileName.endsWith('Requirements.md') || fileName.endsWith('Premises.md');
}

export function isRequirementsFile(fileName: string): boolean {
	return fileName.endsWith('Requirements.md');
}

export function isPremisesFileForValidation(fileName: string): boolean {
	return fileName.endsWith('Premises.md');
}

export function isQuestionsFile(fileName: string): boolean {
	return fileName.endsWith('Questions.md');
}

export function isPremisesFile(fileName: string): boolean {
	return fileName.endsWith('Premises.md');
}

export function isRelevantFile(fileName: string): boolean {
	return isRequirementsFile(fileName) || isPremisesFileForValidation(fileName) || isQuestionsFile(fileName);
}
