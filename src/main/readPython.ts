import { ipcMain } from 'electron';
import { writeFile } from 'fs/promises';
import { PythonShell } from 'python-shell';
import scriptBuilder from './scriptBuilder';

ipcMain.on('run', async (event, args) => {
  console.log('received from renderer: ', args);

  const pyScript = scriptBuilder(args);

  console.log(pyScript);

  await writeFile('custom.py', pyScript);

  PythonShell.run('custom.py', {}, (err, results) => {
    if (err) throw err;
    event.reply('reply', results);
  });
});
