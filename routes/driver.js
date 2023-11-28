const express = require('express');
const router = express.Router();
const path = require('path');
const puppeteer = require('puppeteer');
const os = require('os');
const cheerio = require('cheerio');
const driverController = require('../controller/driverControl')
const  { authenticateToken }  = require('../middleware/authMiddleware');
const {startPythonScript,stopPythonScript} = require('../middleware/pythonCodeHandler');

router.get('/performAction', async (req, res) => {
 try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Go to the page where the form is present
    await page.goto('https://awslabs.github.io/amazon-kinesis-video-streams-webrtc-sdk-js/examples/index.html'); // Replace with your URL

    // Fill the form fields
    await page.type('#accessKeyId', 'value1'); // Replace with actual form field IDs and values
    await page.type('#region', 'value2'); // Replace with actual form field IDs and values

    // Click the submit button
    await Promise.all([
      page.waitForNavigation(), // Ensure navigation has finished after clicking
      page.click('#submitButton'), // Replace with the ID of your submit button
    ]);

    const resultingURL = page.url(); // Get the resulting URL after actions

    await browser.close();

    res.status(200).send(resultingURL); // Send the resulting URL to the client
  } catch (error) {
    console.error('Error performing action:', error);
    res.status(500).send('Error performing action');
  }
});

function getChromeProfileDirectory() {
  const platform = os.platform();
  let chromeProfileDir = '';

  if (platform === 'win32') {
    // For Windows
    chromeProfileDir = path.join(os.homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'User Data', 'Profile 1');
  } else if (platform === 'darwin') {
    // For macOS - Update this path according to Chrome's user data directory in macOS
    chromeProfileDir = path.join(os.homedir(), 'Library', 'Application Support', 'Google', 'Chrome', 'Profile 1');
  } else if (platform === 'linux') {
    // For Linux - Update this path according to Chrome's user data directory in Linux
    chromeProfileDir = path.join(os.homedir(), '.config', 'google-chrome', 'Profile 1');
  }

  return chromeProfileDir;
}

router.get('/modified_page', async (req, res) => {
  const relativeHtmlFilePath = '../test/lokesh1.html'; // Relative path to the HTML file
  const absoluteHtmlFilePath = path.resolve(__dirname, relativeHtmlFilePath); // Resolve the relative path
  const HtmlFilePath = 'file://' + absoluteHtmlFilePath;
  const profileDirectory = getChromeProfileDirectory();

  try {
    const browser = await puppeteer.launch({
      userDataDir: profileDirectory,
      args: [
        '--use-fake-ui-for-media-stream',
        '--window-size=1080,720',
        '--disable-gpu'
      ]
    });
    const page = await browser.newPage();

    await page.goto(HtmlFilePath); // Use the correct variable

    const htmlData = await page.content();
    const $ = cheerio.load(htmlData);

    // Modify the webpage using Cheerio
    $('#region').attr('value', 'us-west-2');
    $('#accessKeyId').attr('value', 'lmn');
    $('#secretAccessKey').attr('value', 'xyz');
    $('#channelName').attr('value', 'channel50');

    // Get the modified HTML content
    const modifiedHtml = $.html();

    await browser.close();

    // Send the modified HTML content as a response
    res.send(modifiedHtml);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});






// router.use('/api/driver', authenticateToken); 
router.get('/api/driver', driverController.getAllDriver);
router.post('/api/driver', driverController.createDriver);
router.get('/api/driver/:username', driverController.getDriverByID);
router.put('/api/driver/:username', driverController.updateDriver);
router.delete('/api/driver/:username', driverController.deleteDriver);


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
