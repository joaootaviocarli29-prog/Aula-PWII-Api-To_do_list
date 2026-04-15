const taskService = require('../services/taskServices');

// Função auxiliar para ler o corpo da requisição (Body)
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = ''; 
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (e) {
                resolve({}); // Evita quebrar se o JSON vier vazio
            }
        });
    });
};

// Criar tarefas
const createTask = async (req, res) => {
    const body = await getRequestBody(req);
    // Note que passamos title para o service
    const tasks = taskService.addTask(body.title);
    
    res.statusCode = 201;
    res.end(JSON.stringify(tasks));    
};

// Listar tarefas
const listTasks = (req, res) => {
    const tasks = taskService.getTasks();
    res.statusCode = 200;
    res.end(JSON.stringify(tasks));    
};

// Atualizar tarefa
const updateTask = async (req, res, id) => {
    const body = await getRequestBody(req);
    // Aqui usamos o 'id' que já veio como parâmetro da função
    const idNumber = parseInt(id); 
    
    const updatedTask = taskService.updateTask(idNumber, body);

    if (updatedTask) {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Tarefa atualizada!", task: updatedTask }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
    }
};

// Deletar tarefa
const deleteTask = (req, res, id) => {
    const idNumber = parseInt(id);
    const success = taskService.deleteTask(idNumber);
    
    if (success) {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Tarefa removida com sucesso!" }));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Erro: Tarefa não encontrada para remover." }));
    }
};

// Procurar por ID
const getTaskById = (req, res, id) => {
    const idNumber = parseInt(id);
    const task = taskService.getTaskById(idNumber);

    if (task) {
        res.statusCode = 200;
        res.end(JSON.stringify(task));
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Tarefa não encontrada" }));
    }
};

module.exports = {
    createTask,
    listTasks,
    updateTask,
    deleteTask,
    getTaskById
};