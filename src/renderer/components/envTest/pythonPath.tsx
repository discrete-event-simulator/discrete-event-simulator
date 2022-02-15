import { useEffect, useState } from 'react';

/**
 * load user's custom python path from localStorage if exists
 */
const usePythonPath = () => {
  const [pythonPath, setPythonPath] = useState('');

  useEffect(() => {
    const path = localStorage.getItem('pythonPath');
    if (path) {
      setPythonPath(path);
    }
  }, [setPythonPath]);

  useEffect(() => {
    localStorage.setItem('pythonPath', pythonPath);
  }, [pythonPath]);

  return [pythonPath, setPythonPath] as const;
};

export default usePythonPath;
