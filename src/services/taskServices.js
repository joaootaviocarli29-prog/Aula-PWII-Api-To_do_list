const fs = require('fs');
const path = require('path');
const { createTask } = require('../models/taskModels');

// Caminho onde o arquivo JSON será salvo
const filePath = path.join(__dirname, 'tasks.json');

// Função auxiliar para carregar os dados do arquivo
const loadTasks = () => {
    try {
        if (!fs.existsSync(filePath)) {
            return []; // Se o arquivo não existir, retorna array vazio
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Erro ao ler o arquivo:", error);
        return [];
    }
};

// Função auxiliar para salvar os dados no arquivo
const saveTasks = (tasks) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
    } catch (error) {
        console.error("Erro ao salvar o arquivo:", error);
    }
};

// Inicia o array com o que estiver no JSON
let tasks = loadTasks();


// Criar
const addTask = (title) => {
    const tasks = loadTasks();
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; //gerador de ID
    
    const task = createTask(id, title);
    tasks.push(task);
    
    saveTasks(tasks); //Salva no arquivo
    return task;
};

// Listar
const getTasks = () => {
    return loadTasks(); // Agora ele lê do arquivo toda vez que você pede a lista
};

// Atualizar
const updateTask = (id, { title, completed } = {}) => {
    let tasks = loadTasks();
    const index = tasks.findIndex(t => t.id == id);
    
    if (index === -1) return null;

    if (title !== undefined) tasks[index].title = title;
    if (completed !== undefined) tasks[index].completed = completed;

    saveTasks(tasks);
    return tasks[index];
};

// Deletar
const deleteTask = (id) => {
    let tasks = loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id != id);

    if (tasks.length === initialLength) return false;

    saveTasks(tasks); 
    return true;
};

// Buscar por ID
const getTaskById = (id) => {
    return tasks.find(t => t.id == id);
};

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
    getTaskById
}