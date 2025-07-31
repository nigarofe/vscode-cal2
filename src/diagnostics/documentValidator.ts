import * as vscode from 'vscode';
import { checkRequirementsOrPremisesFile } from './requirementsPremisesValidator';
import { checkQuestionsFile } from './questionsValidator';
import { checkPremisesFile } from './premisesValidator';
import { isRequirementsFile, isPremisesFileForValidation, isQuestionsFile } from '../utils';

export function validateDocument(document: vscode.TextDocument, diagnosticCollection: vscode.DiagnosticCollection): void {
	const fileName = document.fileName;
	
	let diagnostics: vscode.Diagnostic[] = [];
	
	if (isRequirementsFile(fileName)) {
		diagnostics = checkRequirementsOrPremisesFile(document);
	} else if (isPremisesFileForValidation(fileName)) {
		diagnostics = checkPremisesFile(document);
	} else if (isQuestionsFile(fileName)) {
		diagnostics = checkQuestionsFile(document);
	}
	
	// Set diagnostics for this document
	diagnosticCollection.set(document.uri, diagnostics);
}
