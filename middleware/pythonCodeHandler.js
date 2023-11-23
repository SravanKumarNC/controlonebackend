const { PythonShell } = require('python-shell');

let pythonProcess = null; // Define the variable to hold the PythonShell instance

function startPythonScript(callback) {
    if (!pythonProcess) {
        const pythonScriptPath = './pythonScript/updateData.py'; // Replace with your Python script path

        let options = {
            mode: 'text',
            pythonPath: 'python', // or specify your Python interpreter path if needed
            pythonOptions: ['-u'], // get print results in real-time
            scriptPath: pythonScriptPath // path to your Python script
        };

        pythonProcess = PythonShell.run('your_script.py', options, (err, result) => {
            if (err) {
                console.error('Error starting Python script:', err);
            } else {
                console.log('Python script output:', result);
            }
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
        pythonProcess.childProcess.kill(); // Terminate the PythonShell process
        pythonProcess = null; // Reset the process variable
        callback('Python script stopped');
    } else {
        callback('No running Python script to stop');
    }
}

module.exports = { startPythonScript, stopPythonScript };
