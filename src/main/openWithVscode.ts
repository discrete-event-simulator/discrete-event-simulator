import { ipcMain } from 'electron';

const { exec } = require('child_process');

ipcMain.on('openVscode', (event, args) => {
  let fileName = args.fileName ?? 'network_graph.py';
  let filePath = __dirname + '/../../' + fileName;

  // __dirname = ./src/main
  // filepath = ./network_graph.py

  console.log('opening script at:', filePath);
  let command = 'code' + ' ' + filePath;

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
