const express = require('express');
const forkliftController = require('../controller/forkliftControl');

const router = express.Router();

router.post('/api/forklifts', forkliftController.createForklift);

router.get('/api/forklifts', forkliftController.getAllForklifts);

router.get('/api/forklifts/:id', forkliftController.getForkliftById);

router.put('/api/forklifts/:id', forkliftController.updateForklift);

router.delete('/api/forklifts/:id', forkliftController.deleteForklift);

module.exports = router;
