import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import React from 'react';
import EarthBg from '../assets/images/earth-bgp.webp';
import Form from '../components/form';
import Logo from '../assets/images/news-Logo.webp';
import { Typography } from '@mui/material';

const BackGroundPaper = styled(Paper)(({ theme }) => ({
  backgroundImage: `url(${EarthBg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(3),
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10px)',
  width: '100%',
  height: 'fit-content',
  zIndex: '10',
  borderRadius: '5px',
  color: '#000',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const UserAuth = () => {
  return (
    <>
      <BackGroundPaper>
        <Box
          sx={{
            width: '320px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            margin: '10px',
          }}
        >
          <StyledBox>
            <Box>
              <img src={Logo} height='70px' width='70px' />
            </Box>
            <Form />
          </StyledBox>
        </Box>
      </BackGroundPaper>
    </>
  );
};

export default UserAuth;
