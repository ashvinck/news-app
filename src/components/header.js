import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import Button from '@mui/material/Button';
import SearchBar from './searchBar';
import IconButton from '@mui/material/IconButton';
import FeedIcon from '@mui/icons-material/Feed';
import GridViewIcon from '@mui/icons-material/GridView';
import PublicIcon from '@mui/icons-material/Public';
import NewsLogo from '../assets/images/news-Logo.webp';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme } from '../features/theme/themeSlice';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const Header = () => {
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

          {/* ---------- Search ---------- */}
          <Box>
            <Hidden mdDown>
              <Button variant='inherit'>Top Headlines</Button>
              <Button variant='inherit'>Favorites</Button>
              <Button variant='inherit'>Country</Button>
            </Hidden>

            <Hidden mdUp>
              <IconButton size='large' edge='start'>
                <FeedIcon />
              </IconButton>
              <IconButton size='large'>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton size='large'>
                <TravelExploreIcon />
              </IconButton>
            </Hidden>
          </Box>

          {/* --------- NavLinks ---------- */}
          <Box>
            <Hidden mdDown>
              <Button
                variant='inherit'
                startIcon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                onClick={handleThemeToggle}
              >
                {!darkMode ? 'dark' : 'light'} MODE
              </Button>
              <Button variant='inherit' startIcon={<GridViewIcon />}>
                GRID VIEW
              </Button>
              <Button variant='inherit' startIcon={<AccountBoxIcon />}>
                ACCOUNT
              </Button>
            </Hidden>

            <Hidden mdUp>
              <ThemeToggle darkMode={darkMode} onToggle={handleThemeToggle} />
              <IconButton size='large'>
                <GridViewIcon />
              </IconButton>
              <IconButton size='large' edge='end'>
                <AccountBoxIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
