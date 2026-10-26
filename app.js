const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-new-task');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');
const taskStatus = document.getElementById('task-status');

const announceTaskStatus = function (message) {
  taskStatus.textContent = message;
};

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  listItem.classList.add('todo__item');
  const id = crypto.randomUUID();

  const checkboxLabel = document.createElement('label');
  checkboxLabel.innerText = `Checkbox for task ${taskString}`;
  checkboxLabel.classList.add('hidden');
  checkboxLabel.htmlFor = `task-${id}`;

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.id = `task-${id}`;
  checkBox.classList.add('todo__checkbox');

  const label = document.createElement('label');
  label.innerText = taskString;
  label.classList.add('todo__label');
  label.htmlFor = id;

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.classList.add('todo__input');
  editInput.id = id;
  editInput.value = taskString;

  const errorText = document.createElement('p');
  errorText.innerText = 'Task cannot be empty';
  errorText.classList.add('todo__error');

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit-btn';
  editButton.type = 'button';
  editButton.ariaLabel = `Edit ${taskString} task`;

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');
  deleteButton.className = 'delete-btn';
  deleteButton.type = 'button';
  deleteButton.ariaLabel = `Delete ${taskString} task`;

  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete Task';
  deleteButton.append(deleteButtonImg);

  listItem.append(
    checkboxLabel,
    checkBox,
    label,
    editInput,
    errorText,
    editButton,
    deleteButton,
  );

  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value.trim()) return;
  const listItem = createNewTaskElement(taskInput.value.trim());

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.append(listItem);

  const label = listItem.querySelector('.todo__label');
  const taskName = label.textContent;
  announceTaskStatus(`Created new task ${taskName}`);

  taskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;
  const checkboxLabel = listItem.querySelector('label.hidden');
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('.todo__label');
  const editBtn = listItem.querySelector('.edit-btn');
  const errorText = listItem.querySelector('.todo__error');

  const isEditing = listItem.classList.contains('edit-mode');

  if (isEditing) {
    if (!editInput.value.trim()) {
      errorText.classList.add('todo__error_visible');
      editInput.focus();
      return;
    }
    label.innerText = editInput.value;
    announceTaskStatus(`Task was updated: ${editInput.value}.`);
    checkboxLabel.innerText = `Checkbox for task ${editInput.value}`;
    editBtn.innerText = 'Edit';
    editBtn.ariaLabel = `Edit ${editInput.value} task`;
    errorText.classList.remove('todo__error_visible');
  } else {
    announceTaskStatus(`Editing task: ${label.innerText}.`);
    editInput.value = label.innerText;
    checkboxLabel.innerText = `Checkbox for task ${editInput.value}`;
    editBtn.innerText = 'Save';
    editBtn.ariaLabel = `Save ${editInput.value} task`;
  }

  listItem.classList.toggle('edit-mode');

  if (!isEditing) {
    editInput.focus();
  } else {
    editBtn.focus();
  }
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  const label = listItem.querySelector('.todo__label');
  const taskName = label.textContent;
  announceTaskStatus(`Deleted task ${taskName}`);

  listItem.remove();
};

//Mark task completed
const taskCompleted = function () {
  const listItem = this.parentNode;
  const label = listItem.querySelector('.todo__label');
  const taskName = label.textContent;

  completedTasksHolder.append(listItem);
  announceTaskStatus(`${taskName} marked as completed.`);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  const label = listItem.querySelector('.todo__label');
  const taskName = label.textContent;

  incompleteTaskHolder.append(listItem);
  announceTaskStatus(`${taskName} marked as incomplete.`);
};

addButton.addEventListener('click', addTask);

window.addEventListener('click', function (e) {
  const editBtn = e.target.closest('.edit-btn');
  const deleteBtn = e.target.closest('.delete-btn');
  if (deleteBtn) {
    deleteTask.call(e.target.closest('.delete-btn'));
  } else if (editBtn) {
    editTask.call(e.target.closest('.edit-btn'));
  }
});

window.addEventListener('input', function (e) {
  const input = e.target.closest('.todo__input');
  if (input?.value.trim()) {
    const listItem = e.target.closest('.todo__item');
    const errorText = listItem.querySelector('.todo__error');
    errorText.classList.remove('todo__error_visible');
  }
});

window.addEventListener('change', function (e) {
  const checkbox = e.target.closest('.todo__checkbox');
  if (checkbox) {
    if (checkbox.checked) {
      taskCompleted.call(checkbox);
    } else {
      taskIncomplete.call(checkbox);
    }
  }
});
