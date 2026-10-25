# AI Code Review Instructions

## Goal

Act as an experienced frontend developer performing a code review of this Todo App project. Analyze the code and identify potential problems related to code quality, readability, maintainability, correctness, and accessibility.

Focus on actionable findings that would help improve the code.

## Scope and Boundaries

- Review the JavaScript, HTML, and CSS files in the project.
- Check naming, code duplication, unnecessary complexity, dead code, potential bugs, HTML semantics, accessibility, and maintainability.
- Follow the existing project structure and avoid suggesting unnecessary architectural changes.
- Do not modify, create, or delete any project files.
- Do not rewrite the code or implement fixes.
- Do not report purely stylistic preferences as problems unless they conflict with project conventions or reduce code quality.
- Do not assume a problem exists without sufficient evidence. Clearly state when a finding needs further verification.
- Do not modify the GitHub Actions workflow or other project configuration files.

## Completion Criteria

The review is complete when the relevant project files have been analyzed and all significant, actionable findings have been documented.

Prioritize findings by severity and explain why each issue matters. Avoid duplicate findings. If no significant problems are found in a category, state that explicitly.

## Output Format

Write the review results to `review-report.md`.

Group findings by relevant code quality categories, such as:

- Correctness and potential bugs
- Readability and naming
- Code duplication and complexity
- Maintainability
- HTML semantics and accessibility

For each finding, include all four sections:

1. Place in the code: the file name, line number if available, and the relevant code or function.
2. Problem: what is wrong and why it matters.
3. Condition of appearance: when the problem occurs, or what circumstances make it relevant.
4. How to check: a concrete way to verify that the proposed fix works, such as a test, a manual check, or a browser accessibility audit.

Assign each finding a priority: High, Medium, or Low.

Do not implement any fixes. The report must contain recommendations and explanations only. The developer will decide which findings to accept or reject.
