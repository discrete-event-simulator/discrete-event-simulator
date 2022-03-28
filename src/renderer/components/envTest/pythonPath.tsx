import { useEffect, useState } from 'react';

const getPathFromStorage = () => localStorage.getItem('pythonPath');

/**
 * load user's custom python path from localStorage if exists
 */
const usePythonPath = () => {
  const [pythonPath, setPythonPath] = useState(getPathFromStorage());

  useEffect(() => {
    const path = getPathFromStorage();
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
