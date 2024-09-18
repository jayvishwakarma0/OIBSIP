
let tasks = [];
let editingTaskId = null;

// Add a new task
function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    if (taskTitle === '' || taskDescription === '') {
        alert("Please enter both a title and a description.");
        return;
    }
    const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };
    tasks.push(newTask);
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    renderTasks();
}

// Render tasks on the page
function renderTasks() {
    const pendingTasksDiv = document.getElementById('pendingTasks');
    const completedTasksDiv = document.getElementById('completedTasks');
    pendingTasksDiv.innerHTML = '<h3>Pending Tasks</h3>';
    completedTasksDiv.innerHTML = '<h3>Completed Tasks</h3>';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <div>
                <p><strong>Title:</strong> ${task.title}</p>
                <p><strong>Description:</strong> ${task.description}</p>
                <span class="timestamp">Added: ${task.createdAt}</span>
                ${task.completed ? `<span class="timestamp"> | Completed: ${task.completedAt}</span>` : ''}
            </div>
            <div class="task-actions">
                ${!task.completed ? `<button onclick="markAsComplete(${task.id})">Complete</button>` : ''}
                <button onclick="showEdit(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
            <div class="edit-container" id="editContainer${task.id}">
                <textarea id="editTitle${task.id}" rows="2">${task.title}</textarea>
                <textarea id="editDescription${task.id}" rows="4">${task.description}</textarea>
                <button onclick="saveEdit(${task.id})">Save</button>
                <button onclick="cancelEdit(${task.id})">Cancel</button>
            </div>
        `;

        if (task.completed) {
            taskDiv.classList.add('complete');
            completedTasksDiv.appendChild(taskDiv);
        } else {
            pendingTasksDiv.appendChild(taskDiv);
        }
    });
}

// Mark task as complete
function markAsComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = true;
            task.completedAt = new Date().toLocaleString();
        }
        return task;
    });
    renderTasks();
}

// Show edit interface
function showEdit(taskId) {
    const editContainer = document.getElementById(`editContainer${taskId}`);
    editContainer.style.display = 'block';
    editingTaskId = taskId;
}

// Save edited task
function saveEdit(taskId) {
    const newTitle = document.getElementById(`editTitle${taskId}`).value;
    const newDescription = document.getElementById(`editDescription${taskId}`).value;
    if (newTitle === '' || newDescription === '') {
        alert("Title and description cannot be empty.");
        return;
    }
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.title = newTitle;
            task.description = newDescription;
        }
        return task;
    });
    renderTasks();
    editingTaskId = null;
}

// Cancel edit
function cancelEdit(taskId) {
    const editContainer = document.getElementById(`editContainer${taskId}`);
    editContainer.style.display = 'none';
    editingTaskId = null;
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Initial render
renderTasks();
