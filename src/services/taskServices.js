const { title } = require('process');
const { createTask } = require('../models/taskModels');

let tasks = [];
let idCounter = 1;
const getTasks = () => tasks;

// Criar
const addTask= (title) => {
    const task = createTask(idCounter++, title);
    tasks.push(task);
    return task;
};

// Listar
const updateTask = (id, title) => {
    const task = tasks.find(t => t.id == id);
    if(!task) return null;

    task.title = title;
    return task;
};

// Deletar
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id == id);
    if(index === -1) return false;

    tasks.splice(index,1);
    return true;
};

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask
}