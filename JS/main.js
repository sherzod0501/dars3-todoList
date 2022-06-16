let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elList = document.querySelector(".list-group");
let elAllCount = document.querySelector(".all-count");
let elCompleteCount = document.querySelector(".completed-count");
let elUncompleteCount = document.querySelector(".uncompleted-count");
let elAllBtn = document.querySelector(".btn-All");
let elCompleteBtn = document.querySelector(".btn-completed");
let elUncomleteBtn = document.querySelector(".btn-uncompleted");

let todos = [];

elList.addEventListener("click", (event) => {
  let deleteId = Number(event.target.dataset.deleteId);
  let foundIndex = todos.findIndex((todo) => todo.id === deleteId);

  if (event.target.matches(".delete-btn")) {
    todos.splice(foundIndex, 1);
    elList.innerHTML = null;
    renderTodo(todos, elList);
  } else if (event.target.matches(".checkbox-btn")) {
    let checkboxId = Number(event.target.dataset.checkboxId);
    let foundId = todos.find((todo) => todo.id === checkboxId);

    foundId.isComplate = !foundId.isComplate;
  }
  renderTodo(todos, elList);
});
let renderTodo = function (arr, where) {
  elList.innerHTML = null;
  arr.forEach((todo) => {
    let newItem = document.createElement("li");
    let newDiv = document.createElement("div");
    let newCheckbox = document.createElement("input");
    let newDelete = document.createElement("button");
    newDelete.dataset.deleteId = todo.id;
    newCheckbox.dataset.checkboxId = todo.id;

    elAllCount.textContent = todos.length;
    newCheckbox.type = "checkbox";
    newDelete.textContent = "Delete";
    newItem.textContent = todo.title;

    if (todo.isComplate) {
      newCheckbox.checked = true;
      newItem.style.textDecoration = "line-through";
    }

    newCheckbox.setAttribute("class", "checkbox-btn");
    newDelete.setAttribute("class", "delete-btn btn btn-danger ms-3");
    newItem.setAttribute("class", "d-flex justify-content-between fs-3");

    newItem.append(newDiv);
    newDiv.append(newCheckbox, newDelete);
    where.append(newItem);
    where.className = "form-control mt-3";

    elCompleteCount.textContent = todos.filter(
      (todo) => todo.isComplate === true
    ).length;
    elUncompleteCount.textContent = todos.filter(
      (todo) => todo.isComplate === false
    ).length;
  });
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let inputValue = elInput.value.trim();
  elInput.value = " ";

  let todo = {
    id: todos[todos.length - 1]?.id + 1 || 1,
    title: inputValue,
    isComplate: false,
  };
  todos.push(todo);
  elList.innerHTML = null;
  renderTodo(todos, elList);
});

elAllBtn.addEventListener("click", () => {
  elList.innerHTML = null;
  renderTodo(todos, elList);
});

elCompleteBtn.addEventListener("click", () => {
  const CompleteBtn = todos.filter((todo) => todo.isComplate === true);
  renderTodo(CompleteBtn, elList);
});

elUncomleteBtn.addEventListener("click", () => {
  const UncompleteBtn = todos.filter((todo) => todo.isComplate === false);
  renderTodo(UncompleteBtn, elList);
});
