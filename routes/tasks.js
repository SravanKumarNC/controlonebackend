const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskControl');

router.get('/api/tasks', taskController.getTasks);
router.post('/api/tasks', taskController.createTask);
router.get('/api/tasks/:id', taskController.getTaskById);
router.put('/api/tasks/:id', taskController.updateTask);
router.delete('/api/tasks/:id', taskController.deleteTask);

module.exports = router;
