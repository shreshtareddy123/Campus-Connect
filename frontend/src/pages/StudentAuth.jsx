import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const StudentAuth = () => {
  const [isSignup, setIsSignup] = useState(true); 
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
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
      // Basic validation
      if (!name || !email || !password) {
        setErrorMsg('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          major,
          role: 'student',
          createdAt: new Date().toISOString(),
        });

        // Redirect to Student Dashboard
        navigate('/student-dashboard');
      } catch (error) {
        setErrorMsg(error.message);
      }
    } else {
      // Login mode
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/student-dashboard');
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
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 2,
        overflowX: 'hidden',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isSignup ? 'Student Sign-Up' : 'Student Login'}
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
              label="Major (optional)"
              variant="outlined"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
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

export default StudentAuth;