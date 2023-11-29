const express = require('express');
const router = express.Router();
// const path = require('path');
// const puppeteer = require('puppeteer');
// const os = require('os');
// const cheerio = require('cheerio');
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

// router.get('/start_code', (req, res) => {
//     const urlToOpen = 'https://webrtc.github.io/test-pages/src/audio-and-video/'; // Replace with the URL you want to open
//     res.json({ url: urlToOpen });
//     // startPythonScript((result) => {
//     //     res.send(result);
//     // });
// });

// router.post('/stop_code', (req, res) => {
//     stopPythonScript((result) => {
//         res.send(result);
//     });
// });


router.get('/protected_route', authenticateToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
