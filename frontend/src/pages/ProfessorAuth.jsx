import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Make sure your firebase.js exports auth and db
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const ProfessorAuth = () => {
  const [isSignup, setIsSignup] = useState(true); // toggle between signup and login modes
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (isSignup) {
      // Ensure required fields are filled for signup
      if (!name || !email || !password) {
        setErrorMsg('Please fill in all required fields.');
        setLoading(false);
        return;
      }
      // You can add password complexity validation here if desired

      try {
        // Create the user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Save additional professor info in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          department,
          role: 'professor',
          createdAt: new Date().toISOString(),
        });
        // Optionally, redirect to a professor dashboard
        navigate('/professor-dashboard');
      } catch (error) {
        setErrorMsg(error.message);
      }
    } else {
      // Login mode
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/professor-dashboard');
      } catch (error) {
        setErrorMsg(error.message);
      }
    }
    setLoading(false);
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
        overflowX: 'hidden', // ensures no horizontal scrollbar
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
      
      <Button
        onClick={() => setIsSignup(!isSignup)}
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