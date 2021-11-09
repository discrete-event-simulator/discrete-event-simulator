import { useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const Hello = () => {
  useEffect(() => {
    (window as any).electron.ipcRenderer.on(
      'reply:create-packet',
      (data: any) => {
        console.log('received', data);
      }
    );
  }, []);

  const handleClickCreatePacket = () => {
    (window as any).electron.ipcRenderer.send('create-packet', [
      'hello',
      'test',
      'any number here',
    ]);
  };
  return (
    <div>
      <button type="button" onClick={handleClickCreatePacket}>
        create a packet
      </button>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
