// @flow
import express from 'express';
import taskService, { type Task } from './task-service';

/**
 * Express router containing task methods.
 */
const router: express$Router<> = express.Router();

router.get('/tasks', (request, response) => {
  taskService
    .getAll()
    .then((rows) => response.json(rows))
    .catch((error: Error) => response.status(500).send(error));
});

router.get('/tasks/:id', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .get(id)
    .then((task) => (task ? response.json(task) : response.status(404).send('Task not found')))
    .catch((error: Error) => response.status(500).send(error));
});

router.post('/tasks', (request, response) => {
  if (request.body && typeof request.body.title == 'string')
    taskService
      .create(request.body.title)
      .then((id) => response.send({ id: id }))
      .catch((error: Error) => response.status(400).send(error));
  else response.status(500).send('Missing task title.');
});

router.delete('/tasks/:id', (request, response) => {
  taskService
    .delete(Number(request.params.id))
    .then((result) => response.send())
    .catch((error: Error) => response.status(500).send(error));
});

export default router;
