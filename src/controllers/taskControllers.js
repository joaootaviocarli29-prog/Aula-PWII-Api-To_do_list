const { json } = require('node:stream/consumers');
const taskService = require('../services/taskServices');

// Função auxiliar para ler body
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
            let body = ''; 


            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            req.on('end', () => {
                resolve(JSON.parse(body));
            });

        });

};


// Criar tareja
const createTask = async(req, res) => {
    const body = await getRequestBody (req);
    const task = taskService.addTask (body.title);
    
    res.statusCode = 201;
    res.end(JSON.stringify(task));    

};

// Listar tarejas
const listTasks = (req, res) => {
    const tasks = taskService.getTasks();

    res.statusCode = 200;
    res.end(JSON.stringify(tasks));    

};

// Atualizar tarefa

const updateTask = async(req,res,id) => {
    const body = await getRequestBody(req);

    const taks = taskService.updateTask(id, body.title);

    if (!task ){
        res.statusCode = 404;
        return res.end(JSON.stringify(
            { message: 'Não encontrado' })
        );
    }
    res.end(JSON.stringify(task));

};

// Deletar tarefa

const deleteTask = (req,res,id) => {
    const sucess = taskService.deleteTask(id);

    if(!sucess){
        res.statusCode = 404;
        return res.end(JSON.stringify(
            {  message:' Não encontrada 67' })
        );
    }
    res.end(JSON.stringify( 
        { message:' Removida ' })
        );
};
module.exports = {
    createTask,
    listTasks,
    updateTask,
    deleteTask
};

