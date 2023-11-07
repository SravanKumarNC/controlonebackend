const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientControl');

router.get('/api/clients', clientController.getClients);
router.post('/api/clients', clientController.createClient);
router.get('/api/clients/:username', clientController.getClientByUsername);
router.put('/api/clients/:username', clientController.updateClient);
router.delete('/api/clients/:username', clientController.deleteClient);

module.exports = router;
