const express = require('express');
const router = express.Router();
const driverController = require('../controller/driverControl');

router.get('/api/driver', driverController.getAllDriver);
router.post('/api/driver', driverController.createDriver);
router.get('/api/driver/:username', driverController.getDriverByUsername);
router.put('/api/driver/:username', driverController.updateDriver);
router.delete('/api/driver/:username', driverController.deleteDriver);

module.exports = router;
