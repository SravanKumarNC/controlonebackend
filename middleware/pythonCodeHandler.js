const { exec } = require('child_process');
process.env.PYTHONPATH = '/opt/render/.local/lib/python3.7/site-packages';

let pythonProcess = null; // Define the variable to hold the Python process

function startPythonScript(callback) {
    if (!pythonProcess) {
        const pythonScriptPath = './pythonScript/updateData.py'; // Replace with your Python script path

        pythonProcess = exec(`sudo python ${pythonScriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error starting Python script: ${error.message}`);
            }
            if (stderr) {
                console.error(`Python script error: ${stderr}`);
            }
            console.log(`Python script output: ${stdout}`);
        });

        pythonProcess.on('exit', (code) => {
            console.log(`Python script process exited with code ${code}`);
            pythonProcess = null; // Reset the process variable after completion
        });

        callback('Python script started');
    } else {
        callback('Python script is already running');
    }
}

function stopPythonScript(callback) {
    if (pythonProcess) {
        pythonProcess.kill(); // Terminate the Python process
        pythonProcess = null; // Reset the process variable
        callback('Python script stopped');
    } else {
        callback('No running Python script to stop');
    }
}

module.exports = { startPythonScript, stopPythonScript };
