









# Requirements for document validation and automatic spacing for all markdown files


## Generic
While `any markdown file in the data folder is being edited`, when `structure validation is required`, the `document validation system` shall `validate proper structure and format`
While `any markdown file in the data folder is being edited`, when `spacing rules are violated`, the `automatic spacing system` shall `enforce proper spacing between headings`


## Ubiquitous
The `document validation system` shall `apply to all markdown files in the data folder including Questions.md, Premises.md, Requirements.md, and TEMPLATE.md`
The `automatic spacing system` shall `apply to all markdown files in the data folder including Questions.md, Premises.md, Requirements.md, and TEMPLATE.md`
The `document validation system` shall `output validation errors to the VS Code Problems panel`
The `automatic spacing system` shall `automatically format spacing after the user stops typing`
The `automatic spacing system` shall `enforce 10 blank lines before level 1 headings and 2 blank lines before level 2 headings`
The `automatic spacing system` shall `preserve user cursor position during formatting operations`


## State driven
While `any markdown file in the data folder is open`, the `document validation system` shall `continuously validate the document structure`
While `a user is actively typing in any markdown document in the data folder`, the `automatic spacing system` shall `wait before applying automatic formatting`
While `any markdown file in the data folder is open`, the `automatic spacing system` shall `monitor for spacing violations`


## Event driven
When `any markdown file in the data folder is opened or modified`, the `document validation system` shall `validate document structure according to file-specific rules`
When `a user stops typing for 2 seconds in any markdown file in the data folder`, the `automatic spacing system` shall `automatically add correct spacing before level 1 and level 2 headings`
When `automatic spacing is applied to any markdown file in the data folder`, the `automatic spacing system` shall `preserve the user's cursor position relative to the content`
When `spacing corrections are made in any markdown file in the data folder`, the `automatic spacing system` shall `update the document using VS Code edit operations`


## Optional feature
Where `automatic formatting is enabled`, the `automatic spacing system` shall `provide visual feedback when spacing corrections are applied to any markdown file in the data folder`
Where `automatic formatting is enabled`, the `automatic spacing system` shall `provide configuration options to enable or disable the feature for all markdown files in the data folder`


## Unwanted behavior
If `automatic spacing is applied while the user is still typing in any markdown file in the data folder`, then the `automatic spacing system` shall `cancel the formatting to avoid disrupting the user's flow`
If `automatic spacing changes the user's cursor position unexpectedly in any markdown file in the data folder`, then the `automatic spacing system` shall `restore the cursor to the appropriate location`
If `formatting occurs while user is still typing in any markdown file in the data folder`, then the `automatic spacing system` shall `cancel the operation to prevent workflow disruption`
If `formatting creates infinite loops in any markdown file in the data folder`, then the `automatic spacing system` shall `implement safeguards to prevent recursive formatting`


## Complex
While `any markdown file in the data folder is open`, when `the document content changes`, the `document validation system` shall `parse all headings and validate the complete document structure against the required format for that specific file type`
While `a user is editing any markdown file in the data folder`, when `typing activity stops for 2 seconds`, the `automatic spacing system` shall `debounce the formatting operation, analyze the entire document to identify all level 1 and level 2 headings, calculate current spacing and required spacing for each heading, generate workspace edits that add or remove blank lines as needed, preserve the user's cursor position by calculating line offset changes, apply all edits atomically using VS Code's workspace edit API, and restore focus to the editor without disrupting the user's workflow`










# Requirements for expanded markdown file support


## Generic
While `the VS Code extension previously only supported specific markdown files`, when `broader file support is required`, the `file detection system` shall `extend autoformatting and validation to all markdown files in the data folder`


## Ubiquitous
The `file detection system` shall `recognize all .md files located in the data folder regardless of filename`
The `file detection system` shall `apply autoformatting to TEMPLATE.md, Requirements.md, Questions.md, Premises.md and any other .md files in the data folder`
The `file detection system` shall `use path normalization to handle Windows and Unix path separators consistently`


## State driven
While `any .md file in the data folder is open`, the `file detection system` shall `identify it as a relevant file for processing`
While `file detection logic is executed`, the `file detection system` shall `normalize path separators for cross-platform compatibility`


## Event driven
When `isRelevantFile function is called`, the `file detection system` shall `check if the file path contains '/data/' and has .md extension`
When `needsSpacingFormatting function is called`, the `file detection system` shall `check if the file path contains '/data/' and has .md extension`
When `file path contains backslashes`, the `file detection system` shall `convert them to forward slashes for consistent path matching`


## Optional feature
Where `additional file types need autoformatting support`, the `file detection system` shall `provide extensible logic for adding new file patterns`


## Unwanted behavior
If `non-markdown files in the data folder are processed`, then the `file detection system` shall `exclude them from autoformatting and validation`
If `markdown files outside the data folder are processed`, then the `file detection system` shall `exclude them from autoformatting to maintain scope`
If `path separators cause detection failures`, then the `file detection system` shall `handle both Windows backslashes and Unix forward slashes correctly`


## Complex
While `the extension processes files`, when `determining which files need autoformatting`, the `file detection system` shall `normalize the file path by replacing backslashes with forward slashes, check if the normalized path contains '/data/' substring, verify the file has a .md extension, and return true only if both conditions are met, ensuring that all markdown files in the data folder receive autoformatting regardless of their specific filename while excluding markdown files in other locations`










# Requirements for file-specific validation rules


## Generic
While `specific file types require unique validation rules`, when `document structure validation is performed`, the `document validation system` shall `apply file-type-specific rules in addition to common formatting rules`


## Ubiquitous
The `document validation system` shall `validate Requirements.md files to ensure first level headings start with "Requirements for"`
The `document validation system` shall `validate Requirements.md files to ensure proper section ordering`
The `document validation system` shall `validate Questions.md files to ensure proper question numbering and section structure`
The `document validation system` shall `validate Premises.md files to ensure proper premise set numbering`


## State driven
While `a Requirements.md file is open`, the `document validation system` shall `check for proper heading structure and section ordering`
While `a Questions.md file is open`, the `document validation system` shall `check for proper question numbering format`
While `a Premises.md file is open`, the `document validation system` shall `check for proper premise set numbering format`


## Event driven
When `a Requirements.md file is opened or modified`, the `document validation system` shall `check if each first level heading starts with "Requirements for"`
When `a Requirements.md file is opened or modified`, the `document validation system` shall `check if each first level heading includes all required second level headings in exact order`
When `a Questions.md file is opened or modified`, the `document validation system` shall `validate first-level headings against the regex pattern ^Question \d+\s*$`
When `a Questions.md file is opened or modified`, the `document validation system` shall `validate that each question includes required subsections`
When `a Premises.md file is opened or modified`, the `document validation system` shall `validate first-level headings against the regex pattern ^Premise Set \d+\s*$`


## Optional feature
Where `file-specific rules are defined`, the `document validation system` shall `allow configuration of validation rules per file type`


## Unwanted behavior
If `a file named Requirements.md is open and each first level heading doesn't start with "Requirements for"`, then the `document validation system` shall `output this in the VS Code Problems panel`
If `a file named Requirements.md is open and each first level heading doesn't include all of the second level headings Generic, Ubiquitous, State driven, Event driven, Optional feature, Unwanted behavior and Complex in this exact order`, then the `document validation system` shall `output this in the VS Code Problems panel`
If `a file named Questions.md is open and each first level heading doesn't include all of the second level headings Proposition, Step-by-step, Answer and Metadata in this exact order`, then the `document validation system` shall `output this in the VS Code Problems panel`
If `a file named Questions.md is open and each first level heading doesn't match the regex ^Question \d+\s*$`, then the `document validation system` shall `output this in the VS Code Problems panel`
If `a file named Premises.md is open and each first level heading doesn't match the regex ^Premise Set \d+\s*$`, then the `document validation system` shall `output this in the VS Code Problems panel`


## Complex
While `different file types have different validation requirements`, when `document validation is performed`, the `document validation system` shall `determine the file type from the filename and apply the appropriate validation rules while also applying common spacing and formatting validation to all markdown files in the data folder`










# Requirements for [](Questions.md)


## Generic
While `Questions.md files are being edited`, when `live preview functionality is required`, the `question preview system` shall `provide live preview functionality for Questions.md files`


## Ubiquitous
The `question preview system` shall `render LaTeX expressions using KaTeX library`
The `question preview system` shall `handle both inline ($...$) and display ($$...$$) LaTeX expressions`
The `question preview system` shall `preserve LaTeX rendering during markdown-to-HTML conversion`
The `question preview system` shall `render images referenced in markdown format with relative paths to the images folder`
The `question preview system` shall `convert relative image paths to proper VS Code webview URIs for secure resource access`


## State driven
While `a file named Questions.md is open`, the `question preview system` shall `display a webview panel with the rendered markdown of the current question section`
While `editing a Questions.md file`, the `question preview system` shall `preserve the user's cursor position and editor focus`


## Event driven
When `the user is editing a file named Questions.md`, the `question preview system` shall `open a VS Code Webview panel with the md rendering of the question specified in the level 1 heading of where the cursor is`
When `the user moves the cursor to a different question section in a Questions.md file`, the `question preview system` shall `update the webview panel to show the new question content`
When `the user edits content in a Questions.md file`, the `question preview system` shall `update the webview panel in real-time to reflect the changes`
When `LaTeX expressions are detected in markdown content`, the `question preview system` shall `process them with KaTeX before markdown conversion`
When `markdown conversion occurs`, the `question preview system` shall `use placeholder substitution to prevent LaTeX corruption`
When `images are detected in markdown content`, the `question preview system` shall `process them before markdown conversion to ensure proper URI resolution`
When `relative image paths starting with 'images/' are found`, the `question preview system` shall `convert them to webview-compatible URIs`


## Optional feature
Where `webview functionality is enabled`, the `question preview system` shall `open the webview panel in the "Beside" column to provide a split-view experience`
Where `webview functionality is enabled`, the `question preview system` shall `use VS Code's theme variables for consistent styling with the editor`
Where `basic markdown support is included`, the `question preview system` shall `provide formatting support including headings, bold, italic, and bullet points`
Where `KaTeX library is not available`, the `question preview system` shall `gracefully degrade to showing LaTeX source with error indication`
Where `marked library is not available`, the `question preview system` shall `fall back to basic markdown-to-HTML conversion`
Where `image files exist in the data/images folder`, the `question preview system` shall `display them with responsive styling and VS Code theme integration`
Where `workspace has multiple folders`, the `question preview system` shall `intelligently locate the correct data folder for image resolution`


## Unwanted behavior
If `webview updates occur too frequently`, then the `question preview system` shall `debounce updates to prevent performance issues`
If `the webview panel flickers or recreates unnecessarily`, then the `question preview system` shall `reuse existing panels`
If `the webview steals focus from the editor`, then the `question preview system` shall `prevent focus theft by using preserveFocus: true during panel creation and reveal operations`
If `LaTeX placeholders conflict with markdown syntax`, then the `question preview system` shall `use syntax-neutral placeholder formats`
If `LaTeX expressions fail to render`, then the `question preview system` shall `display error messages instead of raw placeholders`
If `image paths resolve to non-existent files`, then the `question preview system` shall `handle gracefully without breaking the webview rendering`
If `image path resolution creates double folder paths`, then the `question preview system` shall `detect and correct the path construction logic`


## Complex
While `a Questions.md file is open`, when `the cursor position changes or content is modified`, the `question preview system` shall `automatically detect which question section the cursor is in based on the first-level headings and show the appropriate content in the webview`
While `providing real-time updates`, when `content changes occur`, the `question preview system` shall `handle markdown-to-HTML conversion and coordinate between multiple event listeners using proper debouncing mechanisms`
While `managing the webview lifecycle`, when `panels are created or updated`, the `question preview system` shall `handle creation, updates, and disposal without disrupting the user's editing experience`
While `processing LaTeX expressions`, when `markdown conversion occurs`, the `question preview system` shall `use placeholder substitution strategy to prevent markdown parser interference with LaTeX syntax, then restore rendered LaTeX content after HTML conversion is complete`
While `processing images in markdown content`, when `workspace contains multiple folders including data folder`, the `question preview system` shall `implement intelligent folder detection strategy to locate correct image paths by checking for data folders directly in workspace, checking for data subfolders in workspace folders, and providing fallback path construction with proper debugging output for troubleshooting path resolution issues`










# Requirements for [](Premises.md)


## Generic
While `Premises.md files are being edited`, when `live preview functionality is required`, the `premise preview system` shall `provide live preview functionality for Premises.md files`


## Ubiquitous
The `premise preview system` shall `render LaTeX expressions using KaTeX library`
The `premise preview system` shall `handle both inline ($...$) and display ($$...$$) LaTeX expressions`
The `premise preview system` shall `preserve LaTeX rendering during markdown-to-HTML conversion`
The `premise preview system` shall `render images referenced in markdown format with relative paths to the images folder`
The `premise preview system` shall `convert relative image paths to proper VS Code webview URIs for secure resource access`


## State driven
While `a file named Premises.md is open`, the `premise preview system` shall `display a webview panel with the rendered markdown of the current premise set section`
While `editing a Premises.md file`, the `premise preview system` shall `preserve the user's cursor position and editor focus`


## Event driven
When `the user is editing a file named Premises.md`, the `premise preview system` shall `open a VS Code Webview panel with the md rendering of the premise set specified in the level 1 heading of where the cursor is`
When `the user moves the cursor to a different premise set section in a Premises.md file`, the `premise preview system` shall `update the webview panel to show the new premise set content`
When `the user edits content in a Premises.md file`, the `premise preview system` shall `update the webview panel in real-time to reflect the changes`
When `LaTeX expressions are detected in markdown content`, the `premise preview system` shall `process them with KaTeX before markdown conversion`
When `markdown conversion occurs`, the `premise preview system` shall `use placeholder substitution to prevent LaTeX corruption`
When `images are detected in markdown content`, the `premise preview system` shall `process them before markdown conversion to ensure proper URI resolution`
When `relative image paths starting with 'images/' are found`, the `premise preview system` shall `convert them to webview-compatible URIs`


## Optional feature
Where `webview functionality is enabled`, the `premise preview system` shall `open the webview panel in the "Beside" column to provide a split-view experience`
Where `webview functionality is enabled`, the `premise preview system` shall `use VS Code's theme variables for consistent styling with the editor`
Where `basic markdown support is included`, the `premise preview system` shall `provide formatting support including headings, bold, italic, and bullet points`
Where `KaTeX library is not available`, the `premise preview system` shall `gracefully degrade to showing LaTeX source with error indication`
Where `marked library is not available`, the `premise preview system` shall `fall back to basic markdown-to-HTML conversion`
Where `image files exist in the data/images folder`, the `premise preview system` shall `display them with responsive styling and VS Code theme integration`
Where `workspace has multiple folders`, the `premise preview system` shall `intelligently locate the correct data folder for image resolution`


## Unwanted behavior
If `webview updates occur too frequently`, then the `premise preview system` shall `debounce updates to prevent performance issues`
If `the webview panel flickers or recreates unnecessarily`, then the `premise preview system` shall `reuse existing panels`
If `the webview steals focus from the editor`, then the `premise preview system` shall `prevent focus theft by using preserveFocus: true during panel creation and reveal operations`
If `LaTeX placeholders conflict with markdown syntax`, then the `premise preview system` shall `use syntax-neutral placeholder formats`
If `LaTeX expressions fail to render`, then the `premise preview system` shall `display error messages instead of raw placeholders`
If `image paths resolve to non-existent files`, then the `premise preview system` shall `handle gracefully without breaking the webview rendering`
If `image path resolution creates double folder paths`, then the `premise preview system` shall `detect and correct the path construction logic`


## Complex
While `a Premises.md file is open`, when `the cursor position changes or content is modified`, the `premise preview system` shall `automatically detect which premise set section the cursor is in based on the first-level headings and show the appropriate content in the webview`
While `providing real-time updates`, when `content changes occur`, the `premise preview system` shall `handle markdown-to-HTML conversion and coordinate between multiple event listeners using proper debouncing mechanisms`
While `managing the webview lifecycle`, when `panels are created or updated`, the `premise preview system` shall `handle creation, updates, and disposal without disrupting the user's editing experience`
While `processing LaTeX expressions`, when `markdown conversion occurs`, the `premise preview system` shall `use placeholder substitution strategy to prevent markdown parser interference with LaTeX syntax, then restore rendered LaTeX content after HTML conversion is complete`
While `processing images in markdown content`, when `workspace contains multiple folders including data folder`, the `premise preview system` shall `implement intelligent folder detection strategy to locate correct image paths by checking for data folders directly in workspace, checking for data subfolders in workspace folders, and providing fallback path construction with proper debugging output for troubleshooting path resolution issues`










# Requirements for image rendering


## Generic
While `markdown content contains image references with relative paths`, when `webview rendering is requested`, the `image rendering system` shall `convert relative paths to secure webview URIs and display images with responsive styling`


## Ubiquitous
The `image rendering system` shall `support markdown image syntax ![alt](src) for all relative image paths starting with 'images/'`
The `image rendering system` shall `apply consistent styling with borders, shadows, and responsive scaling that integrates with VS Code themes`


## State driven
While `webview is active and displaying markdown content`, the `image rendering system` shall `maintain proper resource access permissions through localResourceRoots configuration`
While `workspace contains multiple folder configurations`, the `image rendering system` shall `intelligently locate the data folder containing images`


## Event driven
When `markdown images are detected during processing`, the `image rendering system` shall `process them before markdown conversion to ensure proper URI resolution`
When `relative image paths starting with 'images/' are found`, the `image rendering system` shall `convert them to VS Code webview-compatible URIs using asWebviewUri method`
When `webview panel is created`, the `image rendering system` shall `configure localResourceRoots to include all potential data folder locations`


## Optional feature
Where `workspace has data folder as direct workspace folder`, the `image rendering system` shall `use the data folder URI directly for optimal performance`
Where `workspace has data as subfolder of root workspace`, the `image rendering system` shall `detect and use the data subfolder path`
Where `debugging is enabled`, the `image rendering system` shall `provide console logging of path resolution strategies and final URIs`


## Unwanted behavior
If `image path resolution creates double folder paths like data/data/images`, then the `image rendering system` shall `implement path validation to prevent duplicate folder segments`
If `image files do not exist at resolved paths`, then the `image rendering system` shall `handle gracefully without breaking webview rendering`
If `workspace folder detection fails`, then the `image rendering system` shall `provide fallback path construction with appropriate error logging`


## Complex
While `processing markdown with image references`, when `multiple workspace folder configurations exist including dedicated data folders and root folders with data subfolders`, the `image rendering system` shall `iterate through workspace folders using multiple detection strategies including direct data folder matching, data subfolder existence checking, and fallback path construction, then convert successful paths to webview URIs while providing comprehensive debugging output for troubleshooting path resolution issues`










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










# Requirements for snippets


## Generic
While `Questions.md or Premises.md files are open`, when `snippet definitions or references are present`, the `snippet system` shall `maintain a cache of all snippet definitions and resolve references during rendering`


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
