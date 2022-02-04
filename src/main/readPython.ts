import { ipcMain } from 'electron';
import { writeFile } from 'fs/promises';
import { PythonShell } from 'python-shell';
import scriptBuilder from './scriptBuilder';
import jsonBuilder from './jsonBuilder';

ipcMain.on('run', async (event, args) => {
  console.log('received from renderer: ', args);

  const { parameters } = args;

  const tryNewScript = parameters['PacketSink:test_newScript'];

  if (tryNewScript) {
    const jsonData = jsonBuilder(args);
    console.log('Print json data of the network:');
    console.log(jsonData);

    let options = {
      pythonOptions: ['-u'],
      args: [jsonData],
    };

    PythonShell.run('generator.py', options, (err, results) => {
      if (err) throw err;
      event.reply('reply', results);
    });
  } else {
    const pyScript = scriptBuilder(args);
    console.log(pyScript);
    await writeFile('custom.py', pyScript);

    PythonShell.run('custom.py', {}, (err, results) => {
      if (err) throw err;
      event.reply('reply', results);
    });
  }
});
