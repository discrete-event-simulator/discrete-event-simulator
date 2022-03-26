import { app } from "electron";
import { platform } from "os";
import path from "path";

const { ipcMain } = require('electron');
const { writeFile } = require('fs/promises');
const { PythonShell } = require('python-shell');

const scriptBuilder = require('./scriptBuilder.ts');
const jsonBuilder = require('./jsonBuilder.ts');
let userPythonPath = '';

const appBasePath = platform() === 'darwin' ? path.join(app.getAppPath(), '/../../') : '';
const getAppPath = (fileName: string) => `${appBasePath}${fileName}`;
// https://www.electronjs.org/docs/latest/api/app#appgetpathname
const getUserDocumentPath = (fileName: string) => `${app.getPath('documents')}/${fileName}`;

ipcMain.on('test', (event, args) => {
  console.log('received from renderer: ', args);

  const options = {};
  if (args.pythonPath) {
    //@ts-ignore
    options.pythonPath = args.pythonPath;
  }

  const shell = new PythonShell(getAppPath('test.py'), args);

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

    userPythonPath = args.pythonPath; // stores user's python path in memory

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

    const options = {
      pythonOptions: ['-u'],
      args: [jsonData],
    };

    // if (args.pythonPath || userPythonPath) {
    //   options.pythonPath = args.pythonPath || userPythonPath;
    //   console.log('currently using python path:', options.pythonPath);
    // }

    PythonShell.run(getAppPath('generator.py'), options, (err, results) => {
      if (err) throw err;
      event.reply('reply', results);
    });
  } else {
    const pyScript = scriptBuilder(args);
    console.log(pyScript);
    await writeFile(getUserDocumentPath('custom.py'), pyScript);

    PythonShell.run(getUserDocumentPath('custom.py'), {}, (err, results) => {
      if (err) throw err;
      event.reply('reply', results);
    });
  }
});
