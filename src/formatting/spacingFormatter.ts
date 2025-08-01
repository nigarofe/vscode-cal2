import * as vscode from 'vscode';

interface HeadingInfo {
    line: number;
    level: number;
    text: string;
    currentSpacing: number;
    requiredSpacing: number;
}

export class SpacingFormatter {
    private formatTimer: NodeJS.Timeout | undefined;
    private isFormatting = false;

    /**
     * Schedules automatic spacing formatting after a delay
     */
    public scheduleFormatting(document: vscode.TextDocument, delay: number = 2000): void {
        // console.log(`Scheduling formatting for ${document.fileName} with delay ${delay}ms`);
        
        // Clear any existing timer
        if (this.formatTimer) {
            clearTimeout(this.formatTimer);
        }

        // Don't format if we're already in a formatting operation
        if (this.isFormatting) {
            // console.log('Skipping formatting - already in progress');
            return;
        }

        this.formatTimer = setTimeout(async () => {
            // console.log(`Executing formatting for ${document.fileName}`);
            await this.formatDocument(document);
        }, delay);
    }

    /**
     * Cancels any pending formatting operation
     */
    public cancelFormatting(): void {
        if (this.formatTimer) {
            clearTimeout(this.formatTimer);
            this.formatTimer = undefined;
        }
    }

    /**
     * Formats the document by enforcing proper spacing
     */
    private async formatDocument(document: vscode.TextDocument): Promise<void> {
        // console.log(`Starting formatDocument for ${document.fileName}`);
        
        if (this.isFormatting) {
            // console.log('Already formatting, skipping');
            return;
        }

        this.isFormatting = true;

        try {
            const editor = vscode.window.visibleTextEditors.find(e => e.document === document);
            if (!editor) {
                // console.log('No editor found for document');
                return;
            }

            // Store current cursor position
            const originalPosition = editor.selection.active;
            // console.log(`Original cursor position: line ${originalPosition.line}, char ${originalPosition.character}`);
            
            // Analyze document structure
            const headings = this.analyzeHeadings(document);
            // console.log(`Found ${headings.length} headings`);
            
            // Calculate required edits
            const edits = this.calculateSpacingEdits(document, headings);
            // console.log(`Generated ${edits.length} edit operations`);
            
            if (edits.length === 0) {
                // console.log('No spacing corrections needed');
                return; // No changes needed
            }

            // Apply edits
            const workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.set(document.uri, edits);
            
            const success = await vscode.workspace.applyEdit(workspaceEdit);
            
            if (success) {
                // Calculate new cursor position after edits
                const newPosition = this.calculateNewCursorPosition(originalPosition, edits);
                
                // Restore cursor position
                editor.selection = new vscode.Selection(newPosition, newPosition);
                
                // console.log(`Applied ${edits.length} spacing corrections successfully`);
            } else {
                console.log('Failed to apply workspace edits');
            }
        } catch (error) {
            console.error('Error during automatic spacing formatting:', error);
        } finally {
            this.isFormatting = false;
        }
    }

    /**
     * Analyzes the document to find all headings and their current spacing
     */
    private analyzeHeadings(document: vscode.TextDocument): HeadingInfo[] {
        const headings: HeadingInfo[] = [];
        const lines = document.getText().split('\n');
        // console.log(`Analyzing ${lines.length} lines for headings`);
        
        // Debug: show first 20 lines
        // console.log('First 20 lines of document:');
        // for (let i = 0; i < Math.min(20, lines.length); i++) {
        //     console.log(`Line ${i}: "${lines[i]}"`);
        // }

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].replace(/\r$/, ''); // Remove trailing carriage return
            // More flexible regex - allow optional space after #
            const headingMatch = line.match(/^(#{1,2})\s*(.*)$/);
            
            if (headingMatch && headingMatch[2].trim().length > 0) {
                const level = headingMatch[1].length;
                const text = headingMatch[2].trim();
                
                // console.log(`Checking line ${i}: "${line}" - match: ${!!headingMatch}`);
                
                // Count blank lines before this heading
                let blankLinesBefore = 0;
                for (let j = i - 1; j >= 0; j--) {
                    const prevLine = lines[j].replace(/\r$/, ''); // Remove trailing carriage return
                    if (prevLine.trim() === '') {
                        blankLinesBefore++;
                    } else {
                        break;
                    }
                }

                // Determine required spacing based on level
                const requiredSpacing = level === 1 ? 10 : 2;

                const headingInfo = {
                    line: i,
                    level,
                    text,
                    currentSpacing: blankLinesBefore,
                    requiredSpacing
                };
                
                // console.log(`Found heading: level ${level}, line ${i}, current spacing ${blankLinesBefore}, required ${requiredSpacing}, text: "${text}"`);
                headings.push(headingInfo);
            } else if (line.startsWith('#')) {
                // console.log(`Line ${i} starts with # but doesn't match: "${line}"`);
            }
        }

        return headings;
    }

    /**
     * Calculates the text edits needed to fix spacing
     */
    private calculateSpacingEdits(document: vscode.TextDocument, headings: HeadingInfo[]): vscode.TextEdit[] {
        const edits: vscode.TextEdit[] = [];

        for (const heading of headings) {
            const spacingDiff = heading.requiredSpacing - heading.currentSpacing;
            
            if (spacingDiff !== 0) {
                const headingLineIndex = heading.line;
                
                if (spacingDiff > 0) {
                    // Need to add blank lines
                    const insertPosition = new vscode.Position(headingLineIndex, 0);
                    const blankLines = '\n'.repeat(spacingDiff);
                    edits.push(vscode.TextEdit.insert(insertPosition, blankLines));
                } else {
                    // Need to remove blank lines
                    const linesToRemove = Math.abs(spacingDiff);
                    const startLine = headingLineIndex - heading.currentSpacing;
                    const endLine = startLine + linesToRemove;
                    
                    const range = new vscode.Range(
                        new vscode.Position(startLine, 0),
                        new vscode.Position(endLine, 0)
                    );
                    edits.push(vscode.TextEdit.delete(range));
                }
            }
        }

        return edits;
    }

    /**
     * Calculates the new cursor position after applying edits
     */
    private calculateNewCursorPosition(originalPosition: vscode.Position, edits: vscode.TextEdit[]): vscode.Position {
        let lineOffset = 0;
        
        // Sort edits by position to process them in order
        const sortedEdits = edits.slice().sort((a, b) => {
            return a.range.start.line - b.range.start.line;
        });

        for (const edit of sortedEdits) {
            const editLine = edit.range.start.line;
            
            // Only consider edits that are before the cursor
            if (editLine <= originalPosition.line) {
                if (edit.newText.includes('\n')) {
                    // Count new lines being added
                    const newLineCount = (edit.newText.match(/\n/g) || []).length;
                    lineOffset += newLineCount;
                } else if (edit.range.start.line !== edit.range.end.line) {
                    // Lines being deleted
                    const deletedLines = edit.range.end.line - edit.range.start.line;
                    lineOffset -= deletedLines;
                }
            }
        }

        return new vscode.Position(
            Math.max(0, originalPosition.line + lineOffset),
            originalPosition.character
        );
    }

    /**
     * Disposes of the formatter and cleans up resources
     */
    public dispose(): void {
        this.cancelFormatting();
    }
}

export const spacingFormatter = new SpacingFormatter();
