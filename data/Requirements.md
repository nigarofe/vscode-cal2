
# Requirements for [](Requirements.md)
## Generic

## Ubiquitous

## State driven

## Event driven

## Optional feature

## Unwanted behavior
- If a file named `Requirements.md` is open and each first level heading doesn't start with "Requirements for", then the system shall output this in the VS Code Problems panel
- If a file named `Requirements.md` is open and each first level heading doesn't include all of the second level headings `Generic`, `Ubiquitous`, `Event driven`, `Optional feature`, `Unwanted behavior` and `Complex` in this exact order, then the system shall output this in the VS Code Problems panel

## Complex




# Requirements for [](Questions.md)

## Generic


## Ubiquitous


## State driven


## Event driven
- When the user is editing a file named `Questions.md`, the system shall open a VS Code Webview panel with the md rendering of the question specified in the level 1 heading of where the cursor is

## Optional feature


## Unwanted behavior
- If a file named `Questions.md` is open and each first level heading doesn't math the regex `^Question \d+\s*$`, then the system shall output this in the VS Code Problems panel
- If a file named `Questions.md` is open and each first level heading doesn't have exactly 10 blank lines above it, then the system shall output this in the VS Code Problems panel
- If a file named `Questions.md` is open and each second level heading doesn't have exactly 2 blank lines above it, then the system shall output this in the VS Code Problems panel

## Complex





# Requirements for [](Premises.md)

## Generic


## Ubiquitous


## State driven


## Event driven


## Optional feature


## Unwanted behavior


## Complex