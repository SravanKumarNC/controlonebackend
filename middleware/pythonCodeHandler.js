const { spawn } = require('child_process');

process.env.PYTHONPATH = '/opt/render/.local/lib/python3.7/site-packages';

let pythonProcess = null;

function startPythonScript(callback) {
    if (!pythonProcess) {
        const pythonScriptPath = './pythonScript/updateData.py'; // Replace with your Python script path

        pythonProcess = spawn('python', [pythonScriptPath]) 
        // {
        //     env: {
        //         PYTHONPATH: '//opt/render/project/src/.venv/lib/python3.7/site-packages',
        //     },
        // });

        pythonProcess.stdout.on('data', (data) => {
            console.log(`Python script stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python script stderr: ${data}`);
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

module.exports = { startPythonScript, stopPythonScript };
