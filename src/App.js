import React from 'react';
import './App.css';
import TopHeadlines from './pages/top-headlines';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  // const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ borderRadius: 0, minHeight: '100vh' }} elevation={0}>
        <div className='App'>
          <TopHeadlines />
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
