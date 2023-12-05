const express = require('express');
const router = express.Router();
const driverController = require('../controller/driverControl')
const  { authenticateToken }  = require('../middleware/authMiddleware');





// router.use('/api/driver', authenticateToken); 
router.get('/api/driver', driverController.getAllDriver);
router.post('/api/driver', driverController.createDriver);
router.put('/api/driver/makefalse/:username',driverController.makeFalse)
router.put('/api/driver/maketrue/:username',driverController.makeTrue)
router.get('/api/driver/:username', driverController.getDriverByUsername);
router.put('/api/driver/:username', driverController.updateDriver);
router.delete('/api/driver/:username', driverController.deleteDriver);


router.get('/protected_route', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
