import express from 'express';
import lists from './data';

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
})

app.get('/api/v1/lists/:listId', (request, response) => {
    const listId = request.params.listId;
    const list = lists.find(l => l.listId == listId);

    if (list) {
        response.json(list);
    } else {
        response.status(404).send(`Task with id ${listId} not found`);
    }
});

app.post('/api/v1/lists', (request, response) => {
    const list = request.body;

    if (!list.hasOwnProperty('listId') ||
        !list.hasOwnProperty('listTitle') ||
        !list.hasOwnProperty('tasks')) {
            response.status(400).send('A list needs the following properties: listId, listTitle and tasks.');
    }

    if (lists.find(l => l.listId == list.listId)) {
        response.status(400).send(`A list with listId ${list.listId} already exists.`);
    } else {
        lists.push(list);
        response.status(201);
        response.location(`lists/${list.listId}`);
        response.send();
    }
});

app.delete('/api/v1/lists/:listId', (request, response) => {
    const listId = request.params.listId;
    const index = lists.findIndex(l => l.listId == listId);

    if (index != -1) {
        lists.splice(index, 1);
        response.status(200).send(`List with listId ${listId} has successfully been deleted.`);
    } else {
        response.status(404).send(`Failed to delete list with listId ${listId}. List not found.`);
    }
});

app.get('/api/v1/lists/:listId/tasks', (request, response) => {
    const listId = request.params.listId;
    const index = lists.findIndex(l => l.listId == listId);

    if (index != -1) {
        response.json(lists[index].tasks);
    } else {
        response.status(404).send(`Failed to get tasks from list with listId ${listId}. List not found.`);
    }
});

app.get('/api/v1/lists/:listId/tasks/:taskId', (request, response) => {
    const listId = request.params.listId;
    const taskId = request.params.taskId;

    const listIndex = lists.findIndex(l => l.listId == listId);

    if (listIndex != -1) {
        const taskIndex = lists[listIndex].tasks.findIndex(t => t.id == taskId)
        if (taskIndex != -1) {
            response.json(lists[listIndex].tasks[taskIndex]);
        } else {
            response.status(404).send(`Failed to get task with taskId ${taskId} from list with listId ${listId}. Task not found.`);
        }
    } else {
        response.status(404).send(`Failed to get task with taskId ${taskId} from list with listId ${listId}. List not found.`);
    }
});

app.post('/api/v1/lists/:listId/tasks', (request, response) => {
    const listId = request.params.listId;
    const task = request.body;

    if (!task.hasOwnProperty('id') || 
        !task.hasOwnProperty('title') ||
        !task.hasOwnProperty('done')) {
            response.status(400).send('A task needs the following properties: id, title and done.');
    } else {
        const listIndex = lists.findIndex(l => l.listId == listId);
    
        if (listIndex != -1) {
            if (lists[listIndex].tasks.find(t => t.id == task.id)) {
                response.status(400).send(`Task with taskId ${task.id} already exists in list with listId ${listId}.`)
            } else {
                lists[listIndex].tasks.push(task);
                response.status(201);
                response.location(`lists/${listId}/tasks/${task.id}`);
                response.send();
            }
        } else {
            response.status(404).send(`Cannot create task with taskId ${task.id} in list with listId ${listId}. List not found.`);
        }
    }
});

app.delete('/api/v1/lists/:listId/tasks/:taskId', (request, response) => {
    const listId = request.params.listId;
    const taskId = request.params.taskId;

    const listIndex = lists.findIndex(l => l.listId == listId);

    if (listIndex != -1) {
        const taskIndex = lists[listIndex].tasks.findIndex(t => t.id == taskId);
        if (taskIndex != -1) {
            lists[listIndex].tasks.splice(taskIndex, 1);
            response.status(200).send(`Task with taskId ${taskId} has successfully been deleted from list with listId ${listId}.`);
        } else {
            response.status(404).send(`Failed to delete task with taskId ${taskId} from list with listId ${listId}. Task not found.`);
        }
    } else {
        response.status(404).send(`Failed to delete task with taskId ${taskId} from list with listId ${listId}. List not found.`);
    }
}); 