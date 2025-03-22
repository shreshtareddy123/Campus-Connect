import { useState } from 'react';
import { Box, Typography, Paper, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/arielview.jpg'; // Background image

const LandingPage = () => {
  const navigate = useNavigate();
  const [anchorElLogin, setAnchorElLogin] = useState(null);
  const [anchorElSignup, setAnchorElSignup] = useState(null);

  // Open dropdown menu
  const handleMenuOpen = (event, type) => {
    if (type === 'login') setAnchorElLogin(event.currentTarget);
    if (type === 'signup') setAnchorElSignup(event.currentTarget);
  };

  // Close dropdown menu
  const handleClose = () => {
    setAnchorElLogin(null);
    setAnchorElSignup(null);
  };

  // Force Navigation
  const handleNavigate = (path) => {
    console.log("Navigating to:", path); // Debugging output
    handleClose();
    setTimeout(() => {
      navigate(path, { replace: true }); // Force replace to make sure navigation happens
    }, 200);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {/* White Box in the Center */}
      <Paper
        elevation={4}
        sx={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '20px',
          maxWidth: '700px',
          width: '85%',
          minHeight: '420px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Login & Signup Buttons in Top Right */}
        <Box sx={{ position: 'absolute', top: 20, right: 30, display: 'flex', gap: 2 }}>
          {/* Login Button */}
          <Button
            variant="text"
            onClick={(e) => handleMenuOpen(e, 'login')}
            sx={{ textTransform: 'none', fontWeight: 600, fontSize: '16px', color: '#333' }}
          >
            Login
          </Button>
          <Menu anchorEl={anchorElLogin} open={Boolean(anchorElLogin)} onClose={handleClose}>
            <MenuItem onClick={() => handleNavigate('/student-login')}>Student Login</MenuItem>
            <MenuItem onClick={() => handleNavigate('/professor-login')}>Professor Login</MenuItem>
          </Menu>

          {/* Signup Button */}
          <Button
            variant="text"
            onClick={(e) => handleMenuOpen(e, 'signup')}
            sx={{ textTransform: 'none', fontWeight: 600, fontSize: '16px', color: '#333' }}
          >
            Signup
          </Button>
          <Menu anchorEl={anchorElSignup} open={Boolean(anchorElSignup)} onClose={handleClose}>
            <MenuItem onClick={() => handleNavigate('/student-signup')}>Student Signup</MenuItem>
            <MenuItem onClick={() => handleNavigate('/professor-signup')}>Professor Signup</MenuItem>
          </Menu>
        </Box>

        {/* Heading Styled Like the Reference Image */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            color: '#000',
            fontFamily: '"Playfair Display", serif',
            mb: 2,
            textAlign: 'center',
          }}
        >
          Campus Connect
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 1,
            mb: 3,
            color: '#555',
            fontFamily: '"Playfair Display", serif',
            maxWidth: '500px',
            textAlign: 'center',
          }}
        >
          Connecting students and professors for a better academic experience.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LandingPage;
