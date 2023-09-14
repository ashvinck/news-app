import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import GridViewIcon from '@mui/icons-material/GridView';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ViewListIcon from '@mui/icons-material/ViewList';
import { auth } from '../config/firebase/firebase';
import NewsLogo from '../assets/images/news-Logo.webp';
import {
  selectTheme,
  toggleCardsView,
  toggleTheme,
} from '../features/theme/themeSlice';

const Header = () => {
  // Set the card view
  const [gridView, setGridView] = useState(false);

  // handle Click for card
  const handleCardsView = () => {
    setGridView(!gridView);
    dispatch(toggleCardsView(gridView));
  };

  const dispatch = useDispatch();
  const darkMode = useSelector(selectTheme);

  const ThemeToggle = ({ darkMode, onToggle }) => (
    <IconButton onClick={onToggle} edge='start' size='large'>
      {darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );

  const handleThemeToggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <AppBar position='static' height='70px' elevation={0} color='primary'>
      <Toolbar sx={{ width: '100%', height: '70px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '70px',
          }}
        >
          {/* --------- Logo ---------- */}
          <Box>
            <img src={NewsLogo} height='60px' width='60px' />
          </Box>
          <Box></Box>

          {/* --------- NavLinks ---------- */}
          <Box>
            <Hidden mdDown>
              {/* --------- Dark Mode ------------ */}
              <Button
                variant='inherit'
                startIcon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                onClick={handleThemeToggle}
              >
                {!darkMode ? 'dark' : 'light'} MODE
              </Button>
              {/* -------------- List/Grid View ------------- */}
              <Button
                variant='inherit'
                startIcon={gridView ? <GridViewIcon /> : <ViewListIcon />}
                onClick={handleCardsView}
              >
                {!gridView ? 'GRID' : 'LIST'} VIEW
              </Button>
              {/* --------------- Logout ------------- */}
              <Button
                variant='inherit'
                startIcon={<LogoutIcon />}
                onClick={() => {
                  auth.signOut();
                }}
              >
                LOGOUT
              </Button>
            </Hidden>

            {/* -------- small screen Icon Buttons */}
            <Hidden mdUp>
              <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />
              <IconButton size='large' onClick={handleCardsView}>
                {!gridView ? <GridViewIcon /> : <ViewListIcon />}
              </IconButton>
              <IconButton
                size='large'
                edge='end'
                onClick={() => {
                  auth.signOut();
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
