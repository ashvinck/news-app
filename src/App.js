import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/layout';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/theme/themeSlice';

function App() {
  const [mode, setMode] = useState('light');

  const darkMode = useSelector(selectTheme);
  const memoizedDarkMode = useMemo(() => darkMode, [darkMode]);

  useEffect(() => {
    memoizedDarkMode ? setMode('dark') : setMode('light');
  }, [memoizedDarkMode]);

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        style={{ borderRadius: 0, minHeight: '100vh', minWidth: '100vw' }}
        elevation={0}
      >
        <div className='App'>
          <Layout />
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
