import { ipcMain } from 'electron';
import path from 'path';
import { Options, PythonShell } from 'python-shell';

ipcMain.on('create-packet', (event, args) => {
  console.log('received from renderer: ', args);

  const options: Options = {
    mode: 'text',
    cwd: path.join(__dirname, '../../ns.py/ns'),
    pythonPath: path.join(__dirname, '../../virtualenv/bin/python'),
    pythonOptions: ['-u'],
    scriptPath: path.join(__dirname, './pythonScripts'),
    args,
  };

  PythonShell.run('packet.py', options, (err, results) => {
    if (err) throw err;
    event.reply('reply:create-packet', results);
  });
});
