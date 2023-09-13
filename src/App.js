import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/layout';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/users/userSlice';
import { selectTheme } from './features/theme/themeSlice';
import { Route, Routes, Navigate } from 'react-router-dom';
import UserAuth from './pages/userAuth';
import { auth } from './config/firebase/firebase';

function App() {
  const [mode, setMode] = useState('light');
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const darkMode = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const memoizedDarkMode = useMemo(() => darkMode, [darkMode]);

  useEffect(() => {
    memoizedDarkMode ? setMode('dark') : setMode('light');
  }, [memoizedDarkMode]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            userPic: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  // Adding  a private route for preventing unauhtorized access
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to='/' />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        style={{ borderRadius: 0, minHeight: '100vh', minWidth: '100vw' }}
        elevation={0}
      >
        <div className='App'>
          <Routes>
            <Route path='/' element={<UserAuth />} />
            <Route
              path='/news/*'
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
