function lockCheck(checkbox, index) {
 
  const tasksStatus = JSON.parse(localStorage.getItem("tasksStatus")) || [];
  
  if (checkbox.checked) {
    checkbox.disabled = true;
    checkbox.nextElementSibling.classList.add("done");
    
   
    tasksStatus[index] = true;
    localStorage.setItem("tasksStatus", JSON.stringify(tasksStatus));
  }
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const tasksStatus = JSON.parse(localStorage.getItem("tasksStatus")) || [];
  const list = document.getElementById("listinghere");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
   
    if (tasksStatus.length <= index) {
      tasksStatus.push(false);
    }
    
   
    const isChecked = tasksStatus[index] ? 'checked disabled' : '';
    const isDone = tasksStatus[index] ? 'class="done"' : '';
    
    list.innerHTML += `
      <div class="task">
        <input id="check" type="checkbox" onclick="lockCheck(this, ${index})" ${isChecked}>
        <span id="b" ${isDone}>${task}</span>
        <button id="delete" onclick="deleteTask(${index})">Delete</button>
      </div>`;
  });
  
  
  localStorage.setItem("tasksStatus", JSON.stringify(tasksStatus));
}

function addTask(event) {
  event.preventDefault();
  const input = document.getElementById("add");
  const task = input.value.trim();

  if (task === "") {
    alert("Invalid task. Please enter a valid task.");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const tasksStatus = JSON.parse(localStorage.getItem("tasksStatus")) || [];
  
  tasks.push(task);
  tasksStatus.push(false); 
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("tasksStatus", JSON.stringify(tasksStatus));

  input.value = "";
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let tasksStatus = JSON.parse(localStorage.getItem("tasksStatus")) || [];
  
  
  tasks.splice(index, 1);
  tasksStatus.splice(index, 1);
  
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("tasksStatus", JSON.stringify(tasksStatus));
  
  loadTasks();
}

window.onload = loadTasks;

function clearthelist() {
  document.getElementById("listinghere").innerHTML = " ";
  localStorage.clear();
}