import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  CircularProgress,
  Paper,
  Fade
} from '@mui/material';
import { Email, Lock, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const ProfessorAuth = () => {
  const [isSignup, setIsSignup] = useState(true);
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

    if (isSignup && (!name || !email || !password)) {
      setErrorMsg('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Fade in>
        <Paper elevation={4} sx={{ p: 4, maxWidth: 420, width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            {isSignup ? 'Professor Sign Up' : 'Professor Login'}
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isSignup && (
              <>
                <TextField
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Department (optional)"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </>
            )}

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : (isSignup ? 'Sign Up' : 'Log In')}
            </Button>
          </Box>

          <Button onClick={() => setIsSignup(!isSignup)} fullWidth sx={{ mt: 2 }}>
            {isSignup
              ? 'Already have an account? Log In'
              : "Don't have an account? Sign Up"}
          </Button>

          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
};

export default ProfessorAuth;
