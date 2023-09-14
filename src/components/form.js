import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../config/firebase/firebase';

// News Article Image
const TextInput = styled(TextField)(() => ({
  marginBottom: '10px',
}));

const Form = () => {
  // To toggle between signup and login screen;
  const [register, setRegister] = useState(false);

  // For resetting password
  const [resetlink, setResetLink] = useState(false);

  // various states for authorization of credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // for ux
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Google Sign In
  const handleSignInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate('/news');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // for form validation of Email
  const validateEmail = (email) => {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      return false;
    } else return true;
  };

  // Function for handling Sign In
  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (email === '' || password === '') {
      setError('Required field is missing');
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError('Error');
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password, username)
        .then((res) => {
          navigate('/news');
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  // Function for handling register
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setLoading(false);
    if (email === '' || password === '' || username === '') {
      setError('Required email and password');
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError('Email is malformed');
      setLoading(false);
    } else if (password !== confirmPassword) {
      setError('Password and confirm password do not match');
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password, username)
        .then((res) => {
          navigate('/news');
          setLoading(false);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  // Reset password through email
  const handleForgotPassword = () => {
    // e.preventDefault();
    setError('');
    setLoading(false);
    if (email === '') {
      setError('Please provide the registered Email');
      setLoading(false);
    } else {
      sendPasswordResetEmail(auth, email)
        .then((res) => {
          setLoading(false);
          console.log(res);
          setResetLink(true);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
          setLoading(false);
        });
    }
  };

  return (
    <>
      {register ? (
        <>
          <TextInput
            label='Username'
            variant='outlined'
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            label='Email'
            variant='outlined'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label='Password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            label='Confirm Password'
            variant='outlined'
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleRegister} variant='contained' fullWidth>
            {loading ? 'Registering...' : 'Register '}
          </Button>
          {error !== '' && (
            <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
          )}
        </>
      ) : (
        <>
          <TextInput
            label='Email'
            variant='outlined'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label='Password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant='contained' fullWidth onClick={handleSignIn}>
            {loading ? 'Logging  In' : 'Login '}
          </Button>
          <Divider sx={{ borderHeight: '5px' }} />
          <Box>
            <Typography>Sign in using</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleSignInWithGoogle}>
              <GoogleIcon />
            </IconButton>
          </Box>
          {error !== '' && (
            <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
          )}
          <Link onClick={handleForgotPassword} className='link'>
            <p>
              {resetlink
                ? 'Email sent. Please check spam folder'
                : 'Forgot Password'}
            </p>
          </Link>
        </>
      )}
      {/* Toogle between login and register pages */}
      <Typography>
        <Link className='link' onClick={() => setRegister(!register)}>
          {' '}
          {register ? 'Login' : 'New User? Register Here'}
        </Link>
      </Typography>
    </>
  );
};

export default Form;
