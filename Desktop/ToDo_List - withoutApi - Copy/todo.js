/*const tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function renderList () {}

function markTaskAsComplete (taskId) {}

function deleteTask (taskId) {}

function addTask (task) {}

function showNotification(text) {}
*/
let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

//console.log("working or not");
function addTaskToDOM(task){
    const li = document.createElement('li');
    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML = '';
    for(let i = 0 ; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;

}

function toggleTask (taskId) {
    const  task = tasks.filter(function (task){
        return task.id === taskId
    });

    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggleed successfully');
        return;
    }

    showNotification('Could not toggled the task');
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function (task){
        return task.id !== taskId
    });
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }

    showNotification('Task can not be added');
}

function showNotification (text) {
    alert(text);
}

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('Task text can not be empty');
            return;
        }

        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }
        e.target.value = '';
        addTask(task);
    }
}
function hadleClickListener(e) {
    const target = e.target;

    if(target.className == 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className == 'custom-checkbox'){
        const  taskId = target.id;
        toggleTask(taskId);
        return;
    }
}
addTaskInput.addEventListener('keyup' , handleInputKeypress);
document.addEventListener('click' , hadleClickListener);

