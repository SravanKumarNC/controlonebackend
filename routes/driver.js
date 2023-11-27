const express = require('express');
const router = express.Router();
const path = require('path'); // Import the 'path' module
const fs = require('fs').promises; // Import the 'fs' module for file operations
const driverController = require('../controller/driverControl');
const  { authenticateToken }  = require('../middleware/authMiddleware');
const {startPythonScript,stopPythonScript} = require('../middleware/pythonCodeHandler');



// router.use('/api/driver', authenticateToken); 
router.get('/api/driver', driverController.getAllDriver);
router.post('/api/driver', driverController.createDriver);
router.get('/api/driver/:username', driverController.getDriverByID);
router.put('/api/driver/:username', driverController.updateDriver);
router.delete('/api/driver/:username', driverController.deleteDriver);

router.get('/autofill-and-capture', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://awslabs.github.io/amazon-kinesis-video-streams-webrtc-sdk-js/examples/index.html');

    // Perform actions to fill the form using Puppeteer
    // For example:
    await page.type('#inputField1', 'Your value 1');
    await page.type('#inputField2', 'Your value 2');
    // ... Continue filling the form with necessary values

    // Capture the video stream using Puppeteer (example)
    const videoStream = await page.evaluate(() => {
      // Perform actions to capture the video stream and extract necessary data
      // Return the video stream data or relevant information
      // This is a hypothetical example, actual implementation depends on the target site's structure
      const videoElement = document.querySelector('video');
      return videoElement ? videoElement.src : null;
    });

    await browser.close();

    // Send the captured video stream data or information back to the client
    res.status(200).json({ videoStream });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Failed to capture the video stream');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

router.get('/start_code', (req, res) => {
    const urlToOpen = 'https://webrtc.github.io/test-pages/src/audio-and-video/'; // Replace with the URL you want to open
    res.json({ url: urlToOpen });
    // startPythonScript((result) => {
    //     res.send(result);
    // });
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
