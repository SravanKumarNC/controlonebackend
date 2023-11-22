const express = require('express');
const forkliftController = require('../controller/forkliftControl');
const  { authenticateToken }  = require('../middleware/authMiddleware');


const router = express.Router();

router.use('/api/forklifts', authenticateToken); 

router.post('/api/forklifts', forkliftController.createForklift);

router.get('/api/forklifts', forkliftController.getAllForklifts);

router.get('/api/forklifts/:id', forkliftController.getForkliftById);

router.put('/api/forklifts/:id', forkliftController.updateForklift);

router.delete('/api/forklifts/:id', forkliftController.deleteForklift);

router.get('/protected_route', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
