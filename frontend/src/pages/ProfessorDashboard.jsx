// frontend/src/pages/ProfessorDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Avatar
} from '@mui/material';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function TabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `dashboard-tab-${index}`,
    'aria-controls': `dashboard-tabpanel-${index}`,
  };
}

const ProfessorDashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/professor-login');
        return;
      }
      setUser(currentUser);

      // Fetch professor's document
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f3f2ef', // LinkedIn-like background
    }}>
      
      {/* Header / Top Bar */}
      <Box
        sx={{
          backgroundColor: '#fff',
          boxShadow: 1,
          py: 2,
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Campus-Connect
        </Typography>
        <Button 
          variant='contained' 
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          maxWidth: '1000px',
          margin: '0 auto',
          mt: 5,
          px: 2,
        }}
      >
        {/* Greeting */}
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Professor Dashboard
          </Typography>
          {professorData && (
            <Typography variant="body1">
              Welcome, {professorData.name || 'Professor'}!
            </Typography>
          )}
        </Box>

        {/* Card-like container for the tab layout */}
        <Paper elevation={2} sx={{ p: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            centered
            aria-label="Professor Dashboard Tabs"
            textColor="primary"
            indicatorColor="secondary"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Research & Interests" {...a11yProps(1)} />
            <Tab label="Courses Offered" {...a11yProps(2)} />
            <Tab label="Discussion" {...a11yProps(3)} />
          </Tabs>

          {/* Profile Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box
              sx={{
                position: 'relative',
                height: 200,
                mb: 15, // Increase space for avatar
                backgroundImage: "url('https://source.unsplash.com/random/1200x300/?abstract')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 1,
              }}
            >
              {/* Profile avatar */}
              <Avatar
                src="https://via.placeholder.com/150"
                alt="Profile Picture"
                sx={{
                  width: 130,
                  height: 130,
                  position: 'absolute',
                  bottom: -55,
                  left: 20,
                  border: '3px solid white',
                  backgroundColor: '#ccc'
                }}
              />
            </Box>

            {/* Profile Info */}
            <Box sx={{ 
              textAlign: 'left', 
              mt: -5,  // shift up to be closer to avatar
              ml: 2 
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {professorData?.name || 'Professor Name'}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Headline or Job Title
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                Pronouns: They/Them
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                This is a placeholder about section. Write a short bio or summary here.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque 
                euismod, neque eget aliquam ultricies, nunc elit varius velit, eu egestas 
                magna quam quis enim.
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Important Links: [Placeholder for personal website, LinkedIn, etc.]
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Edit Profile
              </Button>
            </Box>
          </TabPanel>

          {/* Research & Interests Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>Research & Interests</Typography>
            <Typography variant="body2">
              This tab displays your Research & Interests details.
            </Typography>
          </TabPanel>

          {/* Courses Offered Tab */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>Courses Offered</Typography>
            <Typography variant="body2">
              List your Courses Offered here.
            </Typography>
          </TabPanel>

          {/* Discussion Tab */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h6" gutterBottom>Discussion</Typography>
            <Typography variant="body2">
              Here you can view and manage discussions with interested students.
            </Typography>
          </TabPanel>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfessorDashboard;