import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 0,
        padding: 0,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to Campus-Connect
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your portal for academic opportunities.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 3,
          // Optionally constrain button width
          width: '50%',
          maxWidth: '400px',
        }}
      >
        <Button variant="contained" onClick={() => navigate('/professor-login')}>
          Professor Login/Signup
        </Button>
        <Button variant="outlined" onClick={() => navigate('/student-login')}>
          Student Login/Signup
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;