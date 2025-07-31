import * as vscode from 'vscode';
import { checkRequirementsOrPremisesFile } from './requirementsPremisesValidator';
import { checkQuestionsFile } from './questionsValidator';
import { isRequirementsOrPremisesFile, isQuestionsFile } from '../utils';

export function validateDocument(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection): void {
	const fileName = document.fileName;
	
	let diagnostics: vscode.Diagnostic[] = [];
	
	if (isRequirementsOrPremisesFile(fileName)) {
		diagnostics = checkRequirementsOrPremisesFile(document);
	} else if (isQuestionsFile(fileName)) {
		diagnostics = checkQuestionsFile(document);
	}
	
	// Set diagnostics for this document
	diagnosticCollection.set(document.uri, diagnostics);
}
