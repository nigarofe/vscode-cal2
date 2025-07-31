
# Requirements for [](Requirements.md)
## Generic
The system shall validate Requirements.md and Premises.md files for proper structure and format

## Ubiquitous
The system shall output validation errors to the VS Code Problems panel

## State driven
While a file named `Requirements.md` or `Premises.md` is open, the system shall continuously validate the document structure

## Event driven
When a Requirements.md or Premises.md file is opened or modified, the system shall check if each first level heading starts with "Requirements for"
When a Requirements.md or Premises.md file is opened or modified, the system shall check if each first level heading includes all required second level headings in exact order

## Optional feature

## Unwanted behavior
If a file named `Requirements.md` is open and each first level heading doesn't start with "Requirements for", then the system shall output this in the VS Code Problems panel
If a file named `Requirements.md` is open and each first level heading doesn't include all of the second level headings `Generic`, `Ubiquitous`, `State driven`, `Event driven`, `Optional feature`, `Unwanted behavior` and `Complex` in this exact order, then the system shall output this in the VS Code Problems panel

## Complex
While a Requirements.md or Premises.md file is open, when the document content changes, the system shall parse all headings and validate the complete document structure against the required format




# Requirements for [](Questions.md)

## Generic
The system shall provide live preview functionality for Questions.md files

## Ubiquitous
The system shall validate Questions.md files for proper formatting and structure
The system shall render LaTeX expressions

## State driven
While a file named `Questions.md` is open, the system shall display a webview panel with the rendered markdown of the current question section
While editing a Questions.md file, the system shall preserve the user's cursor position and editor focus

## Event driven
When the user is editing a file named `Questions.md`, the system shall open a VS Code Webview panel with the md rendering of the question specified in the level 1 heading of where the cursor is
When the user moves the cursor to a different question section in a `Questions.md` file, the system shall update the webview panel to show the new question content
When the user edits content in a `Questions.md` file, the system shall update the webview panel in real-time to reflect the changes
When a Questions.md file is opened or modified, the system shall validate first-level headings against the regex pattern
When a Questions.md file is opened or modified, the system shall validate blank line spacing above headings

## Optional feature
Where webview functionality is enabled, the webview panel should open in the "Beside" column to provide a split-view experience
Where webview functionality is enabled, the webview should use VS Code's theme variables for consistent styling with the editor
Where basic markdown support is included, the system should provide formatting support including headings, bold, italic, and bullet points

## Unwanted behavior
If a file named `Questions.md` is open and each first level heading doesn't match the regex `^Question \d+\s*$`, then the system shall output this in the VS Code Problems panel
If a file named `Questions.md` is open and each first level heading doesn't have exactly 10 blank lines above it, then the system shall output this in the VS Code Problems panel
If a file named `Questions.md` is open and each second level heading doesn't have exactly 2 blank lines above it, then the system shall output this in the VS Code Problems panel
If webview updates occur too frequently, then the system shall debounce updates to prevent performance issues
If the webview panel flickers or recreates unnecessarily, then the system shall reuse existing panels
If the webview steals focus from the editor, then the system shall restore focus and cursor position

## Complex
While a Questions.md file is open, when the cursor position changes or content is modified, the system shall automatically detect which question section the cursor is in based on the first-level headings and show the appropriate content in the webview
While providing real-time updates, when content changes occur, the system shall handle markdown-to-HTML conversion and coordinate between multiple event listeners using proper debouncing mechanisms
While managing the webview lifecycle, when panels are created or updated, the system shall handle creation, updates, and disposal without disrupting the user's editing experience





# Requirements for [](Premises.md)

## Generic

## Ubiquitous

## State driven

## Event driven

## Optional feature

## Unwanted behavior

## Complex



Of course! Here are the completed requirements for snippets, following the structure and style of your examples.

***

# Requirements for snippets

## Generic
The system **shall support** reusable content snippets that can be defined in `Questions.md` and `Premises.md` and referenced elsewhere.
Snippets **shall be identified** by unique string identifiers.

***

## Ubiquitous
The system **shall build and maintain** a snippet cache containing all snippet definitions.
The system **shall process** snippet definitions and references during question rendering.

***

## State driven
While a `Questions.md` or `Premises.md` file is open, the system **shall maintain** an up-to-date, in-memory model of all snippet definitions and their content.

***

## Event driven
When a `Questions.md` or `Premises.md` file is **opened, saved, or modified**, the system **shall parse** the document to update the snippet cache.
When a change affects a snippet definition, the system **shall trigger** a re-rendering of all parts of the document that reference that snippet.

***

## Optional feature
The system **could provide autocompletion** for snippet IDs within `<ref id="" />` attributes.
The system **could support a "Go to Definition"** feature, allowing a user to navigate from a `<ref />` tag to its corresponding `<snippet>` definition.

***

## Unwanted behavior
If a file contains **multiple `<snippet>` definitions with the same `id`**, then the system **shall output** a "duplicate snippet ID" error in the VS Code Problems panel.
If a file contains a **`<ref />` tag with an `id` that does not match** any defined snippet, then the system **shall output** an "unresolved snippet reference" error in the VS Code Problems panel.
If resolving snippets leads to a **circular reference**, then the system **shall detect** the loop and report an error.

***

## Complex
While inside `Questions.md` and `Premises.md`, when the line contains the snippet definition `<snippet id="newtons-law">F = ma</snippet>`, the system **shall store** the content "F = ma" with the identifier "newtons-law".
While inside `Questions.md` and `Premises.md`, and a line contains the reference `<ref id="newtons-law" />` in its proposition, when the question is previewed, the system **shall replace** the reference with the content "F = ma" from the snippet cache.
While a question contains both snippet definitions and references, when the question is rendered, the system **shall first resolve** all references with cached content, then **unwrap all snippet definitions** to show only their inner content.
While processing question content for rendering, when a snippet definition `<snippet id="formula">E = mc²</snippet>` is encountered, the system **shall display only** "E = mc²" in the rendered output without the snippet tags.