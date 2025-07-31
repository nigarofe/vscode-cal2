
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
The system shall render LaTeX expressions using KaTeX library
The system shall handle both inline ($...$) and display ($$...$$) LaTeX expressions
The system shall preserve LaTeX rendering during markdown-to-HTML conversion

## State driven
While a file named `Questions.md` is open, the system shall display a webview panel with the rendered markdown of the current question section
While editing a Questions.md file, the system shall preserve the user's cursor position and editor focus

## Event driven
When the user is editing a file named `Questions.md`, the system shall open a VS Code Webview panel with the md rendering of the question specified in the level 1 heading of where the cursor is
When the user moves the cursor to a different question section in a `Questions.md` file, the system shall update the webview panel to show the new question content
When the user edits content in a `Questions.md` file, the system shall update the webview panel in real-time to reflect the changes
When a Questions.md file is opened or modified, the system shall validate first-level headings against the regex pattern
When a Questions.md file is opened or modified, the system shall validate blank line spacing above headings
When LaTeX expressions are detected in markdown content, the system shall process them with KaTeX before markdown conversion
When markdown conversion occurs, the system shall use placeholder substitution to prevent LaTeX corruption

## Optional feature
Where webview functionality is enabled, the webview panel should open in the "Beside" column to provide a split-view experience
Where webview functionality is enabled, the webview should use VS Code's theme variables for consistent styling with the editor
Where basic markdown support is included, the system should provide formatting support including headings, bold, italic, and bullet points
Where KaTeX library is not available, the system should gracefully degrade to showing LaTeX source with error indication
Where marked library is not available, the system should fall back to basic markdown-to-HTML conversion

## Unwanted behavior
If a file named `Questions.md` is open and each first level heading doesn't include all of the second level headings `Proposition`, `Step-by-step`, `Answer` and `Metadata` in this exact order, then the system shall output this in the VS Code Problems panel
If a file named `Questions.md` is open and each first level heading doesn't match the regex `^Question \d+\s*$`, then the system shall output this in the VS Code Problems panel
If a file named `Questions.md` is open and each first level heading doesn't have exactly 10 blank lines above it, then the system shall output this in the VS Code Problems panel
If a file named `Questions.md` is open and each second level heading doesn't have exactly 2 blank lines above it, then the system shall output this in the VS Code Problems panel
If webview updates occur too frequently, then the system shall debounce updates to prevent performance issues
If the webview panel flickers or recreates unnecessarily, then the system shall reuse existing panels
If the webview steals focus from the editor, then the system shall restore focus and cursor position
If LaTeX placeholders conflict with markdown syntax, then the system shall use syntax-neutral placeholder formats
If LaTeX expressions fail to render, then the system shall display error messages instead of raw placeholders

## Complex
While a Questions.md file is open, when the cursor position changes or content is modified, the system shall automatically detect which question section the cursor is in based on the first-level headings and show the appropriate content in the webview
While providing real-time updates, when content changes occur, the system shall handle markdown-to-HTML conversion and coordinate between multiple event listeners using proper debouncing mechanisms
While managing the webview lifecycle, when panels are created or updated, the system shall handle creation, updates, and disposal without disrupting the user's editing experience
While processing LaTeX expressions, when markdown conversion occurs, the system shall use placeholder substitution strategy to prevent markdown parser interference with LaTeX syntax, then restore rendered LaTeX content after HTML conversion is complete




# Requirements for markdown renderer

## Generic
While `markdown content contains LaTeX expressions`, when `conversion to HTML is required`, the `markdown renderer` shall `process LaTeX before markdown conversion and restore rendered content afterward`

## Ubiquitous
The `markdown renderer` shall `support both KaTeX and marked libraries with graceful degradation when dependencies are unavailable`

## State driven
While `dependencies are loading`, the `markdown renderer` shall `wait for async dependency loading before processing content`
While `LaTeX expressions are present`, the `markdown renderer` shall `maintain placeholder mappings to prevent content loss during conversion`

## Event driven
When `convertMarkdownToHtml is called`, the `markdown renderer` shall `load dependencies asynchronously before processing`
When `LaTeX expressions are detected`, the `markdown renderer` shall `create syntax-neutral placeholders that won't trigger markdown parsing`
When `markdown conversion is complete`, the `markdown renderer` shall `restore all LaTeX placeholders with their rendered KaTeX content`

## Optional feature
Where `KaTeX library is available`, the `markdown renderer` shall `render both inline and display math expressions with proper styling`
Where `marked library is available`, the `markdown renderer` shall `use enhanced markdown parsing with GitHub Flavored Markdown support`
Where `dependencies fail to load`, the `markdown renderer` shall `log warnings and provide fallback functionality`

## Unwanted behavior
If `LaTeX placeholders use markdown syntax characters`, then the `markdown renderer` shall `avoid underscore-based placeholders that trigger emphasis parsing`
If `placeholder restoration fails`, then the `markdown renderer` shall `log warnings and maintain placeholder visibility for debugging`
If `dependencies are not loaded`, then the `markdown renderer` shall `not attempt to process content until dependencies are available`

## Complex
While `processing markdown with embedded LaTeX`, when `content conversion is requested`, the `markdown renderer` shall `first extract and render LaTeX expressions using KaTeX with syntax-neutral placeholders, then process remaining markdown using marked library, and finally restore all rendered LaTeX content by replacing placeholders in the resulting HTML`





# Requirements for [](Premises.md)

## Generic
The system shall validate Premises.md files using the same validation rules as Requirements.md files

## Ubiquitous
The system shall apply consistent validation across all supported markdown file types

## State driven
While a file named `Premises.md` is open, the system shall continuously validate the document structure

## Event driven
When a Premises.md file is opened or modified, the system shall check if each first level heading starts with "Requirements for"
When a Premises.md file is opened or modified, the system shall validate the presence and order of required second level headings

## Optional feature

## Unwanted behavior
If a file named `Premises.md` violates the structural requirements, then the system shall output errors to the VS Code Problems panel

## Complex
While a Premises.md file is open, when the document content changes, the system shall apply the same complex validation logic used for Requirements.md files




# Requirements for snippets

## Generic
While `Questions.md` or `Premises.md` files are open, when `snippet definitions or references are present`, the `snippet system` shall `maintain a cache of all snippet definitions and resolve references during rendering`

## Ubiquitous
The `snippet system` shall `support reusable content snippets identified by unique string identifiers across Questions.md and Premises.md files`

## State driven
While `Questions.md or Premises.md files are open`, the `snippet system` shall `maintain an up-to-date in-memory cache of all snippet definitions and their content`

## Event driven
When `Questions.md or Premises.md files are opened, saved, or modified`, the `snippet system` shall `parse the document to update the snippet cache and trigger re-validation of all relevant documents`

## Optional feature
Where `autocompletion is implemented`, the `snippet system` shall `provide autocompletion for snippet IDs within ref id attributes`
Where `navigation features are implemented`, the `snippet system` shall `support Go to Definition functionality from ref tags to their corresponding snippet definitions`

## Unwanted behavior
If `multiple snippet definitions exist with the same id`, then the `snippet system` shall `output a duplicate snippet ID error in the VS Code Problems panel`
If `a ref tag references an id that does not match any defined snippet`, then the `snippet system` shall `output an unresolved snippet reference error in the VS Code Problems panel`
If `resolving snippets leads to a circular reference`, then the `snippet system` shall `detect the loop and report a circular reference error`

## Complex
While `Questions.md and Premises.md files contain snippet definitions like <snippet id="newtons-law">F = ma</snippet>`, when `the extension initializes or files are modified`, the `snippet system` shall `parse all workspace markdown files, store content with identifiers in cache, and resolve references during question rendering by replacing <ref id="newtons-law" /> with cached content while unwrapping snippet definitions to show only inner content`




# Requirements for snippet cache initialization

## Generic
While `the extension activates`, when `workspace contains Questions.md or Premises.md files`, the `snippet cache initialization system` shall `load all snippet definitions before validation occurs`

## Ubiquitous
The `snippet cache initialization system` shall `search the entire workspace for markdown files and load snippets even from files that are not currently open`

## State driven
While `the extension is starting up`, the `snippet cache initialization system` shall `ensure all snippet definitions are loaded into memory before any document validation begins`

## Event driven
When `the extension activates`, the `snippet cache initialization system` shall `asynchronously search for all .md files in the workspace and parse snippet definitions`
When `new markdown files are opened`, the `snippet cache initialization system` shall `update the cache for all relevant documents before validation`

## Optional feature
Where `debugging is enabled`, the `snippet cache initialization system` shall `provide console logging of cache loading progress and final cache contents`

## Unwanted behavior
If `validation occurs before snippet cache is fully loaded`, then the `snippet cache initialization system` shall `prevent validation until all workspace snippets are loaded`
If `files are not found during workspace search`, then the `snippet cache initialization system` shall `log warnings but continue with available files`

## Complex
While `the extension initializes`, when `both open documents and workspace files need to be processed`, the `snippet cache initialization system` shall `first load snippets from currently open documents, then search workspace for additional markdown files, load snippets from closed files, and only then proceed with validation to ensure cross-document snippet references work correctly`