document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from LocalStorage
    loadTasks();

    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    document.getElementById("newTaskForm").onsubmit = function (event) {
        event.preventDefault();
        const taskTitle = document.getElementById("taskTitle").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;
        const taskDetails = document.getElementById("taskDetails").value;

        const task = {
            id: Date.now(),
            title: taskTitle,
            dueDate,
            priority,
            details: taskDetails,
            completed: false
        };

        // Add task to DOM
        addTaskToDOM(task);

        // Save the task to LocalStorage
        saveTask(task);

        // Clear the form and close the modal
        this.reset();
        modal.style.display = "none";
    };
});

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTaskToDOM(task) {
    const tasksList = document.getElementById('todo-app');
    const taskElement = document.createElement('div');
    taskElement.classList.add("task");
    taskElement.setAttribute('data-id', task.id);
    // taskElement.className = 'to-do'
    // Priority color coding
    let priorityColor = '';
    switch (task.priority) {
        case 'High':
            priorityColor = 'red';
            break;
        case 'Medium':
            priorityColor = 'orange';
            break;
        case 'Low':
            priorityColor = 'green';
            break;
    }

    // Task content with priority indicator
    taskElement.innerHTML = `<span><span class="task-priority ${priorityColor}">  ! </span></span  class="task"><span>${task.title}</span></div>
    <br/>
    <span class="date">${task.dueDate}</span><button class="deleteTask" data-id="${task.id}">Delete</button>`;

    // Append new task
    tasksList.appendChild(taskElement);

    // Delete task event
    taskElement.querySelector('.deleteTask').addEventListener('click', function () {
        deleteTask(task.id);
        taskElement.remove();
    });
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
