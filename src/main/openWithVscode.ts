import { ipcMain } from 'electron';

const { exec } = require('child_process');
const os = require('os');
// @ts-ignore
const path = require('path');

ipcMain.on('openVscode', (event, args) => {
  const fileName = args.fileName ?? 'network_graph.py';
  const filePath = path.join(os.tmpdir(), fileName);

  // console.log('opening script at:', filePath);
  let command = 'code';
  if (os.platform() === 'darwin') {
    command = '/usr/local/bin/code';
  }
  command += ' ' + filePath;
  event.reply('edit_success', 'opening script using:' + command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      event.reply('edit_error', error);
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      event.reply('edit_stderr', stderr);
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
