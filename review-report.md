# Code Review Report: `index.html`

## 1. Correctness and Potential Bugs

### Finding 1: Invalid HTML nesting

**Priority:** Medium

**1. Place in the code**

The paragraph with `id="topSectionForAddingElementToList"` contains a `<div class="task-row-wrapper">`:

```html
<p id="topSectionForAddingElementToList">
  <label for="new-task">Add Item</label>
  <div class="task-row-wrapper">
    <input id="new-task" class="task" type="text">
    <button>Add</button>
  </div>
</p>
```

**2. Problem**

A `<p>` element cannot contain a `<div>`. The browser automatically adjusts the DOM when parsing this invalid structure, potentially producing a DOM tree different from the one suggested by the source code. This can cause unexpected layout or styling behavior.

**3. Condition of appearance**

The issue exists whenever the browser parses this HTML. Its visible impact depends on the CSS and any JavaScript that relies on the resulting DOM structure.

**4. How to check**

Run the page through the [W3C HTML Validator](https://validator.w3.org/) and inspect the parsed DOM in browser developer tools. Verify that the resulting structure matches the intended layout.

---

## 2. HTML Semantics and Accessibility

### Finding 2: Missing document language

**Priority:** Medium

**1. Place in the code**

Opening document element:

```html
<html></html>
```

**2. Problem**

The document does not declare its primary language using the `lang` attribute. Screen readers may select an incorrect pronunciation, and language-sensitive browser features may not work as expected.

**3. Condition of appearance**

This matters when assistive technologies or browser features need to determine the language of the page.

**4. How to check**

Inspect the root HTML element in developer tools and run an accessibility audit. Confirm that the document language is correctly identified.

### Finding 3: Missing alternative text for the Eisenhower matrix image

**Priority:** Medium

**1. Place in the code**

```html
<img src="./eisenhower-matrix.jpg" />
```

**2. Problem**

The image has no `alt` attribute. If it communicates information about the Eisenhower matrix, users who cannot see it may miss important content.

**3. Condition of appearance**

This affects screen-reader users and users who cannot load or view the image. If the image is purely decorative, it should instead be identified as decorative.

**4. How to check**

Use a screen reader to navigate the page and verify that the image's purpose is conveyed appropriately. Also inspect the image's role and accessible name in browser developer tools.

### Finding 4: Task checkboxes are not associated with their task labels

**Priority:** High

**1. Place in the code**

Examples in both task lists:

```html
<li>
  <input type="checkbox" />
  <label class="task">Pay Bills</label>
  <input type="text" class="task" />
  ...
</li>
```

The completed task has the same issue:

```html
<input type="checkbox" checked /> <label class="task">See the Doctor</label>
```

**2. Problem**

The labels do not reference their corresponding checkboxes using `for` and a unique input `id`, nor do they wrap the checkboxes. Consequently, the task text is not programmatically associated with the checkbox. Screen readers may announce an unlabeled checkbox, and clicking the task label will not toggle it.

**3. Condition of appearance**

This affects keyboard and screen-reader users and anyone who expects to click the task name to mark it complete.

**4. How to check**

Use a screen reader to navigate each checkbox and verify that its associated task name is announced. Click each task label and check whether the corresponding checkbox changes state. Repeat for incomplete and completed tasks.

### Finding 5: Delete buttons have no accessible name

**Priority:** High

**1. Place in the code**

The delete buttons in both lists:

```html
<button class="delete">
  <img src="./remove.svg" />
</button>
```

**2. Problem**

The button contains only an image without alternative text. Therefore, the button may have no meaningful accessible name for assistive technologies. Users who rely on screen readers may be unable to determine its purpose.

**3. Condition of appearance**

This affects users navigating the task controls with a screen reader or other assistive technology.

**4. How to check**

Inspect the delete button's accessible name in browser developer tools and navigate to it using a screen reader. Verify that its purpose is clearly announced.

### Finding 6: Task editing inputs have no accessible labels

**Priority:** High

**1. Place in the code**

Examples:

```html
<input type="text" class="task" />
```

and:

```html
<input type="text" value="Go Shopping" class="task" />
```

These inputs appear in the task list items.

**2. Problem**

The editing text inputs do not have associated labels. The visible task-name labels are separate elements and are not programmatically connected to the editing inputs. As a result, assistive technologies may announce these fields without meaningful names.

**3. Condition of appearance**

This affects users who need to identify which task they are editing, particularly when multiple tasks are present.

**4. How to check**

Navigate through all task editing fields with a screen reader and verify that each field has a meaningful accessible name identifying its purpose and, where appropriate, the relevant task.

### Finding 7: Add button lacks an explicit type

**Priority:** Low

**1. Place in the code**

```html
<button>Add</button>
```

**2. Problem**

The button does not declare its `type`. Buttons default to the submit type when associated with a form. Although this button is not currently inside a form, its behavior could change unexpectedly if the markup is later moved into one.

**3. Condition of appearance**

This becomes relevant if the task-entry controls are placed inside a form or the surrounding structure is refactored.

**4. How to check**

Inspect the button's type in developer tools and, if the controls are later placed in a form, verify that clicking Add performs only the intended action.

---

## 3. Maintainability and HTML Best Practices

### Finding 8: Missing character encoding and viewport declarations

**Priority:** Medium

**1. Place in the code**

The document head:

```html
<head>
  <title>Todo App</title>
  <link
    href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
    rel="stylesheet"
    type="text/css"
  />
  <link
    rel="stylesheet"
    href="style.css"
    type="text/css"
    media="screen"
    charset="utf-8"
  />
</head>
```

**2. Problem**

The document does not explicitly declare its character encoding or viewport settings. This can cause inconsistent text rendering in some circumstances and an unsuitable initial layout on mobile devices. The `charset` attribute on the stylesheet link does not replace the document's character-encoding declaration.

**3. Condition of appearance**

The encoding declaration matters when the page contains non-ASCII characters or is served with an unexpected encoding. The missing viewport declaration is particularly relevant on mobile devices.

**4. How to check**

Inspect the document's response headers and encoding, test the page with non-ASCII text, and open it on a mobile device or in responsive device emulation. Verify that characters render correctly and the page uses the expected viewport width.

### Finding 9: Unclear class name for the image container

**Priority:** Low

**1. Place in the code**

```html
<div class="aaa">
  <img src="./eisenhower-matrix.jpg" />
  <a
    class="more_inf"
    href="https://goal-life.com/page/method/matrix-eisenhower"
  >
    Want more details?
  </a>
</div>
```

**2. Problem**

The class name `aaa` does not describe the element's purpose. This makes it harder for developers to understand the HTML and locate related styling without searching the CSS.

**3. Condition of appearance**

This is a maintainability concern when the page is extended or another developer needs to understand the layout. The severity is low because the class name does not itself cause a functional defect.

**4. How to check**

Review the corresponding CSS selectors and ask whether the purpose of this container can be understood from the HTML without having to trace unrelated files.

---

## 4. Review Summary

The most significant findings concern accessibility: unnamed delete buttons, unlabeled task checkboxes, and unlabeled editing fields. Invalid paragraph nesting is another concrete HTML issue.

| Category                       | Findings                                                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Correctness and HTML structure | Invalid HTML nesting                                                                                              |
| Accessibility                  | Missing document language, image alternative text, checkbox labels, delete-button names, and editing-input labels |
| Maintainability                | Unclear container class name                                                                                      |
| HTML best practices            | Missing encoding and viewport declarations; implicit button type                                                  |

# Code Review Report: `style.css`

## 1. Correctness and Potential Bugs

### Finding 1: Invalid declaration in completed-task styling

**Priority:** Medium

**1. Place in the code**

```css
ul#completed-tasks label {
    text-decoration: line-through
    color: #888;
}
```

**2. Problem**

A semicolon is missing after `text-decoration: line-through`. Consequently, the browser parses the following `color` text as part of the same declaration value, making that declaration invalid. The intended strikethrough and text color may therefore not be applied.

**3. Condition of appearance**

This affects labels inside the completed-tasks list whenever this CSS rule is applied.

**4. How to check**

Open the application, inspect a completed task in browser developer tools, and check the computed `text-decoration` and `color` properties. Verify that the task text is struck through and displayed in the intended color.

---

## 2. Accessibility and Usability

### Finding 2: Default keyboard focus indicators are removed

**Priority:** High

**1. Place in the code**

```css
input,
button {
  outline: none;
}
```

**2. Problem**

The rule removes the browser's default focus outline from all inputs and buttons without defining an alternative focus indicator. Keyboard users may have difficulty identifying which control currently has focus, making the application harder to navigate.

**3. Condition of appearance**

This affects users navigating the application with the keyboard, including users who rely on visible focus indicators.

**4. How to check**

Navigate through the Add button, task checkboxes, editing inputs, Edit buttons, and Delete buttons using the Tab and Shift+Tab keys. Verify that the currently focused element is clearly visible at every step. An automated accessibility audit can supplement this manual test.

### Finding 3: Button hover feedback is not accompanied by equivalent focus feedback

**Priority:** Medium

**1. Place in the code**

```css
button:hover {
  color: #3a3a3a;
}
```

**2. Problem**

The rule provides a visual change when a pointer hovers over a button, but there is no corresponding `:focus` or `:focus-visible` styling. Keyboard users therefore do not receive equivalent visual feedback. This compounds the focus-indicator problem described in Finding 2.

**3. Condition of appearance**

This is relevant when users operate the application with a keyboard rather than a mouse.

**4. How to check**

Compare the appearance of buttons when hovered with a mouse and when focused using the keyboard. Verify that keyboard focus is equally easy to identify.

---

## 3. Responsive Design and Layout

### Finding 4: Fixed-width containers can overflow on narrow screens

**Priority:** High

**1. Place in the code**

```css
.aaa {
  width: 500px;
  margin: 0 auto;
  display: block;
  text-align: right;
}

.centered-main-page-element {
  display: block;
  width: 500px;
  margin: 0 auto 0;
}
```

**2. Problem**

Both primary containers have a fixed width of 500px. The media query adjusts the alignment of `.aaa` on smaller screens but does not reduce either container's width. On viewports narrower than 500px, the content may extend beyond the visible screen and cause horizontal scrolling.

**3. Condition of appearance**

This is likely to occur on mobile devices and in browser windows narrower than 500 CSS pixels.

**4. How to check**

Use browser developer tools to test viewport widths of 375px, 320px, and 500px. Check for horizontal scrolling, clipped content, and misaligned task controls.

### Finding 5: Task rows may overflow or clip their controls on small screens

**Priority:** Medium

**1. Place in the code**

```css
li {
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #eee;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

li > label {
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 18px;
  width: 226px;
}

li > input[type='text'] {
  width: 226px;
}
```

**2. Problem**

Task rows use fixed-width labels and editing inputs, alongside checkboxes and buttons. The `overflow: hidden` declaration may conceal content when the combined width of these elements exceeds the available space. Long task names may also be difficult to read if the layout does not allow sufficient wrapping.

**3. Condition of appearance**

This may occur on narrow screens, with long task names, or when editing a task. The actual impact depends on the available width and the browser's flexbox sizing behavior.

**4. How to check**

Test both normal and edit modes at narrow viewport widths. Create a task with a long name and verify that its text, checkbox, Edit/Save button, and Delete button remain visible and usable.

---

## 4. Maintainability and CSS Effectiveness

### Finding 6: `vertical-align` is ineffective for flex items

**Priority:** Low

**1. Place in the code**

```css
li > * {
  vertical-align: middle;
}
```

**2. Problem**

The parent `li` elements use `display: flex`. The children are therefore flex items, and `vertical-align` does not control their alignment in this layout. The intended alignment is already controlled by `align-items: center` on the parent.

**3. Condition of appearance**

This declaration has no useful effect on the current flex-based task-row layout. It may mislead developers into believing it controls the alignment of task controls.

**4. How to check**

Inspect a task row in developer tools and compare its layout with the `vertical-align` declaration disabled. Verify that the alignment remains controlled by the flex container.

### Finding 7: A shared class applies conflicting width and flex rules

**Priority:** Low

**1. Place in the code**

```css
.task {
  width: 56%;
  display: inline-block;
  flex-grow: 1;
}
```

The `task` class is applied to both labels and text inputs in `index.html`.

**2. Problem**

The class combines a percentage width, inline-block display, and flex growth for multiple element types with different layout requirements. Other selectors later override some of these properties for task labels and inputs. This makes the effective layout harder to understand and maintain.

**3. Condition of appearance**

This is a maintainability concern when changing task-row dimensions or editing behavior. It may also contribute to unexpected sizing if the HTML or related CSS changes.

**4. How to check**

Inspect the computed styles of a task label, an editing input, and the new-task input. Trace which selectors determine their widths and flex behavior. Confirm whether each declaration contributes to the intended layout.

---

## 5. Review Summary

| Category          | Findings                                                                            |
| ----------------- | ----------------------------------------------------------------------------------- |
| Correctness       | Invalid completed-task styling declaration                                          |
| Accessibility     | Removed focus indicators; missing equivalent keyboard focus feedback                |
| Responsive design | Fixed-width containers; potential clipping of task controls                         |
| Maintainability   | Ineffective `vertical-align`; shared class with overlapping layout responsibilities |

# Code Review Report: `script.js`

## 1. Correctness and Potential Bugs

### Finding 1: The Add button has duplicate event handlers for the same function

**Priority:** Medium

**1. Place in the code**

At the bottom of the file:

```js
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);
```

**2. Problem**

The `addTask` function is registered twice for the same click event: once through `onclick` and once through `addEventListener`. Consequently, it executes twice whenever the Add button is clicked.

Currently, the first execution creates the task and clears the input, so the second execution returns because the input is empty. This prevents a duplicate task from being created in the normal case, but the redundant handler causes unnecessary execution and makes the event flow harder to understand.

**3. Condition of appearance**

This occurs every time the Add button is clicked. The second invocation may become problematic if the function's behavior changes or its side effects are expanded.

**4. How to check**

Open the browser console, click Add once with a valid task name, and observe the `Add Task...` log. Verify how many times the function executes per click.

### Finding 2: Whitespace-only task names can be added

**Priority:** Medium

**1. Place in the code**

Inside `addTask`:

```js
if (!taskInput.value) return;
var listItem = createNewTaskElement(taskInput.value);
```

**2. Problem**

The validation checks whether the input value is an empty string, but it does not check whether the value contains meaningful characters. A string consisting only of spaces is truthy in JavaScript and therefore passes the validation.

This can create tasks that appear empty or contain only whitespace, reducing the usability of the task list.

**3. Condition of appearance**

This occurs when the user enters one or more spaces into the new-task input and clicks Add.

**4. How to check**

Enter several spaces into the input and click Add. Verify whether an empty-looking task is added to the incomplete task list.

### Finding 3: Editing allows tasks to be saved with an empty name

**Priority:** Medium

**1. Place in the code**

Inside `editTask`:

```js
if (containsClass) {
  label.innerText = editInput.value;
  editBtn.innerText = 'Edit';
} else {
  editInput.value = label.innerText;
  editBtn.innerText = 'Save';
}
```

**2. Problem**

When the task is in edit mode, the function copies the input value directly into the label without validating it. Users can delete the entire task name and save an empty task. Whitespace-only names are also accepted.

This is inconsistent with the intention to prevent empty tasks during creation.

**3. Condition of appearance**

This occurs when a user edits an existing task, removes its text, and clicks Save.

**4. How to check**

Edit a task, delete all its text, and click Save. Repeat with a value containing only spaces. Verify whether the task can be saved without a meaningful name.

### Finding 4: The AJAX handler executes even when task creation is rejected

**Priority:** Low

**1. Place in the code**

```js
addButton.addEventListener('click', ajaxRequest);
```

The handler is defined as:

```js
var ajaxRequest = function () {
  console.log('AJAX Request');
};
```

**2. Problem**

The `ajaxRequest` handler runs independently of the validation inside `addTask`. Therefore, it logs `"AJAX Request"` even when the input is empty and no task is created. The function currently performs no AJAX request, so its name suggests functionality that does not exist.

If this function is intended to represent future server communication, its current behavior does not reflect a successful task-creation operation.

**3. Condition of appearance**

This occurs whenever the Add button is clicked, including clicks with an empty input.

**4. How to check**

Open the browser console and click Add with an empty input. Verify that `"AJAX Request"` is still logged even though no task is added. Inspect the function to confirm that no network request is actually made.

---

## 2. HTML Semantics and Accessibility

### Finding 5: Dynamically created task checkboxes are not associated with their labels

**Priority:** High

**1. Place in the code**

Inside `createNewTaskElement`:

```js
var checkBox = document.createElement('input');
var label = document.createElement('label');

label.innerText = taskString;
label.className = 'task';
checkBox.type = 'checkbox';
```

The checkbox and label are appended as separate elements, but no association is established between them.

**2. Problem**

The task label does not reference the checkbox through a matching `for` and `id`, nor does it contain the checkbox. This means the checkbox may lack an accessible name, and clicking the task text will not toggle its checkbox.

The issue affects dynamically created tasks in addition to the initially hard-coded tasks in `index.html`.

**3. Condition of appearance**

This affects newly created tasks whenever users navigate with assistive technology or attempt to click the task label to toggle completion.

**4. How to check**

Create a new task, inspect its checkbox's accessible name in browser developer tools, and click the task label. Verify that the checkbox is correctly identified by assistive technology and responds to the label.

### Finding 6: Dynamically created Delete buttons lack an accessible name

**Priority:** High

**1. Place in the code**

Inside `createNewTaskElement`:

```js
var deleteButton = document.createElement('button');
var deleteButtonImg = document.createElement('img');

deleteButton.className = 'delete';
deleteButtonImg.src = './remove.svg';
deleteButton.appendChild(deleteButtonImg);
```

**2. Problem**

The Delete button contains only an image, and the image has no alternative text. As a result, the button may not expose a meaningful accessible name to screen readers.

This makes it difficult for users relying on assistive technology to determine which control deletes a task.

**3. Condition of appearance**

This affects users navigating dynamically created task controls with a screen reader or other assistive technology.

**4. How to check**

Create a new task and inspect the Delete button's accessible name in browser developer tools. Navigate to it with a screen reader and verify that its purpose is announced clearly.

### Finding 7: Dynamically created editing inputs lack accessible labels

**Priority:** High

**1. Place in the code**

Inside `createNewTaskElement`:

```js
var editInput = document.createElement('input');

editInput.type = 'text';
editInput.className = 'task';
```

**2. Problem**

The editing input has no associated label or accessible name. The separate task label is hidden in edit mode by the CSS, so it cannot be relied upon to identify the editing field.

Users relying on screen readers may not know which field is active or which task they are editing.

**3. Condition of appearance**

This affects users when they enter edit mode for a dynamically created task.

**4. How to check**

Create a task, enter edit mode, and navigate to the editing field with a screen reader. Verify that the field has a meaningful accessible name identifying its purpose and, where appropriate, the task being edited.

---

## 3. Readability and Naming

### Finding 8: Variable naming is inconsistent and some names are difficult to interpret

**Priority:** Low

**1. Place in the code**

Examples from the script:

```js
var incompleteTaskHolder = document.getElementById('incompleteTasks');
var completedTasksHolder = document.getElementById('completed-tasks');
```

And inside `editTask`:

```js
var containsClass = listItem.classList.contains('editMode');
```

**2. Problem**

The code uses different naming patterns for related variables, such as `incompleteTaskHolder` and `completedTasksHolder`. The variable `containsClass` is also vague: it does not specify which class is being checked.

These names make it slightly harder to understand the code quickly and maintain consistent terminology.

**3. Condition of appearance**

This is a maintainability concern when developers navigate the file, modify task-state logic, or add related functionality. It does not establish a functional bug by itself.

**4. How to check**

Read the event-handler functions without relying on the comments. Check whether each variable's name clearly identifies the element or state it represents and whether related variables follow consistent naming conventions.

---

## 4. Maintainability and Unnecessary Complexity

### Finding 9: The script contains placeholder logging and unused production behavior

**Priority:** Low

**1. Place in the code**

Examples:

```js
console.log('Add Task...');
console.log('Edit Task...');
console.log("Change 'edit' to 'save'");
console.log('Delete Task...');
console.log('Complete Task...');
console.log('Incomplete Task...');
```

And:

```js
var ajaxRequest = function () {
  console.log('AJAX Request');
};
```

**2. Problem**

The script contains debugging messages and an AJAX placeholder that performs no actual request. These statements add noise to the browser console and may suggest that functionality exists when it has not been implemented.

Debug logging can be useful during development, but unnecessary production logging makes it harder to identify meaningful warnings and errors.

**3. Condition of appearance**

This is relevant whenever users interact with the application and developers inspect the console, particularly when diagnosing actual runtime problems.

**4. How to check**

Open the console and perform the main task operations: adding, editing, deleting, completing, and restoring tasks. Determine which log messages are needed for debugging and verify whether the AJAX placeholder is required for the application's current functionality.

---

## 5. Review Summary

| Category                       | Findings                                                                               |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| Correctness and potential bugs | Duplicate Add handler; whitespace-only tasks; empty task names accepted during editing |
| Event handling                 | AJAX placeholder runs even when task creation fails                                    |
| Accessibility                  | Unassociated checkboxes and labels; unnamed Delete buttons; unlabeled editing inputs   |
| Readability and naming         | Inconsistent or vague variable names                                                   |
| Maintainability                | Debug logging and an unimplemented AJAX placeholder                                    |

### Overall assessment

The most important issues are the missing validation when creating and editing tasks, redundant event registration, and accessibility problems in dynamically created task elements.

Some issues also exist in the static HTML reviewed earlier. The dynamically generated elements reproduce several of the same accessibility problems, so the final report should describe the shared impact without duplicating identical findings unnecessarily.

**Review limitation:** This report covers only the supplied JavaScript. It does not include execution-based testing, and the actual accessibility behavior should be confirmed in the browser. No project files have been modified.
