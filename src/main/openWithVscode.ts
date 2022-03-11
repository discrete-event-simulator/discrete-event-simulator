import { ipcMain } from 'electron';

const { exec } = require("child_process");

ipcMain.on('open-with-vscode', (event, args) => {
  console.log('received from renderer: ', args);

  let networkGraphPath = args.filePath;

  let command = "code" + " " + networkGraphPath;

  exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });

});