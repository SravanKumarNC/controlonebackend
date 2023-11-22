const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskControl');
const  { authenticateToken }  = require('../middleware/authMiddleware');


// router.use('/api/tasks', authenticateToken); 
router.get('/api/tasks', taskController.getTasks);
router.post('/api/tasks', taskController.createTask);
router.get('/api/tasks/:id', taskController.getTaskById);
router.put('/api/tasks/:id', taskController.updateTask);
router.delete('/api/tasks/:id', taskController.deleteTask);

router.get('/protected_route', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
 
