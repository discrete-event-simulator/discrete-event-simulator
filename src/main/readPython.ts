import { ipcMain } from 'electron';
import { writeFile } from 'fs/promises';
import { Options, PythonShell } from 'python-shell';
import jsonBuilder from './jsonBuilder';
import scriptBuilder from './scriptBuilder';

ipcMain.on('test', (event, args) => {
  console.log('received from renderer: ', args);

  const options: Options = {};
  if (args.pythonPath) {
    options.pythonPath = args.pythonPath;
  }

  const shell = new PythonShell('test.py', args);

  shell.on('error', (err) => {
    console.log('error', err);
    event.reply('reply:test', { err: err?.message || String(err) });
  });
  shell.end(async (err) => {
    let errMsg = err?.message || '';
    if (errMsg.includes("No module named 'ns'")) {
      errMsg = 'ns.py module not installed';
    }

    const pythonVersion = await PythonShell.getVersion();

    event.reply('reply:test', { err: errMsg, success: !err, pythonVersion });
  });
});

ipcMain.on('run', async (event, args) => {
  console.log('received from renderer: ', args);

  const { parameters } = args;

  const tryNewScript = parameters['PacketSink:test_newScript'];

  if (tryNewScript) {
    const jsonData = jsonBuilder(args);
    console.log('Print json data of the network:');
    console.log(jsonData);
    console.log('Print string json data of the network:');
    console.log(JSON.stringify(jsonData));

    let options: Options = {
      pythonOptions: ['-u'],
      args: [jsonData],
    };

    if (args.pythonPath) {
      options.pythonPath = args.pythonPath;
    }

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
