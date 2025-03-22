import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import { jwtDecode } from "jwt-decode";

import {GoogleLogin, googleLogout} from "@react-oauth/google"

const ProfessorAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPath = location.pathname.includes('login');
  const isSignup = !isLoginPath;

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignup) {
        if (!name || !email || !password) {
          setErrorMsg('Please fill in all required fields.');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          department,
          role: 'professor',
          createdAt: new Date().toISOString(),
        });

        navigate('/professor-dashboard');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/professor-dashboard');
      }
    } catch (error) {
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

const handleGoogleLoginSuccess = async (credentialResponse) => 
{
  try 
  {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

    const { sub, name, email, picture } = credentialResponseDecoded; 

    const credential = GoogleAuthProvider.credential(credentialResponse.credential);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) 
    {
      await setDoc(userRef, 
      {
        name,
        email,
        department: "",
        role: "professor",
        createdAt: new Date().toISOString(),
      });
    } 
    navigate("/professor-dashboard");
  } 
  catch (error)
  {
    console.error("Google Sign-In Error:", error);
  }
};


  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isSignup ? 'Professor Sign-Up' : 'Professor Login'}
      </Typography>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: '400px',
        }}
      >
        {isSignup && (
          <>
            <TextField
              label="Name"
              variant="outlined"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Department (optional)"
              variant="outlined"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </>
        )}
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" disabled={loading}>
          {isSignup ? 'Sign Up' : 'Log In'}
        </Button>
      </Box>
      
      <GoogleLogin
        clientId="972463573659-a33gied87s4vnj158cj48mtd8afv6jf4.apps.googleusercontent.com"
        onSuccess={handleGoogleLoginSuccess}
        onError={() => setErrorMsg('Google login failed.')}
        // auto_select={true}
      />

      <Button
        onClick={() =>
          navigate(isSignup ? '/professor-login' : '/professor-signup')
        }
        sx={{ mt: 2 }}
        variant="text"
      >
        {isSignup
          ? 'Already have an account? Log In'
          : "Don't have an account? Sign Up"}
      </Button>

      <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 2 }}>
        Back to Landing
      </Button>
    </Box>
  );
};

export default ProfessorAuth;
