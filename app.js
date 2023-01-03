const form = document.querySelector("#task-Form");
const taskList = document.querySelector(".taskList");
const clearBtn = document.querySelector(".clear");
const input = document.querySelector(".inputTask");
// const addTask = document.querySelector('.addTask')
const filter = document.querySelector(".filterTask");

//load All EventListeners
loadEventListeners();

function loadEventListeners(e) {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear tasks
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks
  filter.addEventListener("keyup", filterTask);
}

// get tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create li
    const li = document.createElement("li");
    // add classname
    li.className = "list-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement("a");
    link.className = "delete-item";
    //   add icon html
    link.innerHTML = `<i class="bi bi-x"></i>`;
    li.appendChild(link);

    //  append li to ul
    taskList.appendChild(li);
  });
}

//add task
function addTask(e) {
  if (input.value === "") {
    alert("add a task");
  }

  //    create li
  const li = document.createElement("li");
  // add classname
  li.className = "list-item";
  // create text node and append to li
  li.appendChild(document.createTextNode(input.value));

  // create new link element
  const link = document.createElement("a");
  link.className = "delete-item";
  //   add icon html
  link.innerHTML = `<i class="bi bi-x"></i>`;
  li.appendChild(link);

  //  append li to ul
  taskList.appendChild(li);

  // store in localstorage
  storeTaskInLocalStorage(input.value);

  //  clear input
  input.value = "";

  e.preventDefault();
}

// store task in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure?")) {
      e.target.parentElement.parentElement.remove();

      //remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
//remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks
function clearTasks(e) {
  taskList.innerHTML = "";

  //clear tasks from LS
  clearTasksFromLocalStorage();
}

// clear tasks From LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter tasks
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".list-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
