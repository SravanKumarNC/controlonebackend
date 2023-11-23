const express = require('express');
const router = express.Router();
const driverController = require('../controller/driverControl');
const  { authenticateToken }  = require('../middleware/authMiddleware');
const {startPythonScript,stopPythonScript} = require('../middleware/pythonCodeHandler');



// router.use('/api/driver', authenticateToken); 
router.get('/api/driver', driverController.getAllDriver);
router.post('/api/driver', driverController.createDriver);
router.get('/api/driver/:username', driverController.getDriverByID);
router.put('/api/driver/:username', driverController.updateDriver);
router.delete('/api/driver/:username', driverController.deleteDriver);

router.post('/start_code', (req, res) => {
    startPythonScript((result) => {
        res.send(result);
    });
});

router.post('/stop_code', (req, res) => {
    stopPythonScript((result) => {
        res.send(result);
    });
});


router.get('/protected_route', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
