const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientControl');
const { login } = require('../middleware/loginMiddleware');
const { register } = require('../middleware/registrationMiddleware');
const  { authenticateToken }  = require('../middleware/authMiddleware');

router.post('/api/clients/register', register);
router.post('/api/clients/login', login);

router.use('/api/clients', authenticateToken); 


router.get('/api/clients', clientController.getClients);
router.post('/api/clients', clientController.createClient);
router.get('/api/clients/:username', clientController.getClientByUsername);
router.put('/api/clients/:username', clientController.updateClient);
router.delete('/api/clients/:username', clientController.deleteClient);



router.get('/protected_route', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
