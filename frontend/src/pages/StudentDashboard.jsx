import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const StudentDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/student-login');
        return;
      }
      setUser(currentUser);

      // Fetch student doc from Firestore
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStudentData(docSnap.data());
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
        Student Dashboard
      </Typography>

      {studentData && (
        <Typography variant="body1" gutterBottom>
          Welcome, {studentData.name || 'Student'}!
        </Typography>
      )}

      <Button variant="outlined" onClick={handleSignOut} sx={{ mt: 2 }}>
        Sign Out
      </Button>
    </Box>
  );
};

export default StudentDashboard;