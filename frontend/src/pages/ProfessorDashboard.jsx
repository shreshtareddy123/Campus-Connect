import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const ProfessorDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);  // Correctly destructure the user state
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // If not logged in, redirect to login
        navigate('/professor-login');
        return;
      }
      setUser(currentUser);

      // Fetch professor's document from Firestore
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfessorData(docSnap.data());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
        Professor Dashboard
      </Typography>

      {professorData && (
        <Typography variant="body1" gutterBottom>
          Welcome, {professorData.name || 'Professor'}!
        </Typography>
      )}

      <Button variant="outlined" onClick={handleSignOut} sx={{ mt: 2 }}>
        Sign Out
      </Button>
    </Box>
  );
};

export default ProfessorDashboard;