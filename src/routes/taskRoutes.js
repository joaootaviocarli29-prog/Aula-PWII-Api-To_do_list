

const taskController = require('../ontrollers/taskControllers');

module.exports = (req, res) => {
    const url = req.url;
    const method = req.method;
    
// GET /tasks
if(url === '/task' && method === 'GET'){
    return taskController.listTasks(req,res);
}

// POST /tasks
if(url === '/task' && method === 'POST'){
    return taskController.createTask(req,res);
}

// PUT /tasks/:id
if(url.startsWith('/task/') && method === 'PUT'){
    const id = url.split('/')[2];
    return taskController.updateTask(req,res,id);
}

// DELETE /tasks/:id
if(url.startsWith('/task/') && method === 'DELETE'){
    const id = url.split('/')[2];
    return taskController.deleteTask(req,res,id);
}

// Rota não encontrada
res.statusCode = 404;
res.end(JSON.stringify({ message: 'Rota não encontrada' })); 
};
