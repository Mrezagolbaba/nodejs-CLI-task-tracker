const fs = require('fs');
const filePath = './tasks.json';

// Load tasks from the JSON file
function loadTasks() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Save tasks to the JSON file
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Function to add a task
function addTask(description) {
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        description,
        status: 'not started',
        date_created: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log('Task added:', description);
}
// Function to update task description
function updateTask(id, newDescription) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        console.error(`Task with ID ${id} not found`);
        return;
    }

    task.description = newDescription;
    saveTasks(tasks);
    console.log('Task updated:', task);
}

// Function to change task status
function updateTaskStatus(id, status) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        console.error(`Task with ID ${id} not found`);
        return;
    }

    task.status = status;
    saveTasks(tasks);
    console.log(`Task ${id} marked as ${status}`);
}
// Function to delete a task
function deleteTask(id) {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter(task => task.id !== parseInt(id));

    if (tasks.length === filteredTasks.length) {
        console.error(`Task with ID ${id} not found`);
        return;
    }

    saveTasks(filteredTasks);
    console.log(`Task ${id} deleted`);
}



// Function to list all tasks
function listTasks() {
    const tasks = loadTasks();
    tasks.forEach(task => {
        console.log(`${task.id}. [${task.status}] - ${task.description}`);
    });
}

// Get the command and arguments from the user input
const args = process.argv.slice(2);
const command = args[0];
const description = args[1];

// Basic command handling
if (command === 'add' && description) {
    addTask(description);
} else if (command === 'list') {
    listTasks();
} else if (command === 'update' && args[1] && args[2]) {
    updateTask(args[1], args[2]);
} else if (command === 'status' && args[1] && args[2]) {
    updateTaskStatus(args[1], args[2]);
} else if (command === 'delete' && args[1]) {
    deleteTask(args[1]);
} else {
    console.log('Usage:');
    console.log('  add "task description"  - Add a new task');
    console.log('  list                    - List all tasks');
    console.log('  update <id> <desc>      - Update task description');
    console.log('  status <id> <status>    - Update task status');
    console.log('  delete <id>             - Delete a task');
}
