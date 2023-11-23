const { exec,spawn } = require('child_process');


const pythonScriptPath = 'https://controlonepythonscript.onrender.com/updateData.py'; // Replace with your Python script path
let pythonProcess = null;

function installPymongo(callback) {
    exec('pip install pymongo', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error installing pymongo: ${error.message}`);
            callback('Failed to install pymongo');
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            callback('Failed to install pymongo');
            return;
        }
        console.log(`stdout: ${stdout}`);
        callback('pymongo installed successfully');
    });
}

function startPythonScript(callback) {
    if (!pythonProcess) {
        pythonProcess = spawn('python', [pythonScriptPath]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python script output: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script error: ${data}`);
        });

        pythonProcess.on('close', (code) => {
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

module.exports = { installPymongo, startPythonScript, stopPythonScript };
