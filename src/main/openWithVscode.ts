import { ipcMain } from 'electron';

const { exec } = require('child_process');
const os = require('os');
//@ts-ignore
const path = require('path');

ipcMain.on('openVscode', (event, args) => {
  let fileName = args.fileName ?? 'network_graph.py';
  let filePath = path.join(os.tmpdir(), fileName);

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
