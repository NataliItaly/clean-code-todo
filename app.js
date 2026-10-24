const taskInput = document.getElementById('new-task');
const addButton = document.getElementById('add-new-task');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

//New task list item
const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
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

  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit-btn';

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');
  deleteButton.className = 'delete-btn';
  deleteButtonImg.src = './remove.svg';
  deleteButton.alt = 'Delete Task';
  deleteButton.append(deleteButtonImg);

  listItem.append(
    checkboxLabel,
    checkBox,
    label,
    editInput,
    editButton,
    deleteButton,
  );

  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit-btn');
  const containsClass = listItem.classList.contains('edit-mode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  listItem.remove();
};

//Mark task completed
const taskCompleted = function () {
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('.edit-btn');
  const deleteButton = taskListItem.querySelector('.delete-btn');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (const task of incompleteTaskHolder.children) {
  bindTaskEvents(task, taskCompleted);
}

for (const task of completedTasksHolder.children) {
  bindTaskEvents(task, taskIncomplete);
}
