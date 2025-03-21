import { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/arielview.jpg'; // Import background image

const LandingPage = () => {
  const navigate = useNavigate();
  const [anchorElLogin, setAnchorElLogin] = useState(null);
  const [anchorElSignup, setAnchorElSignup] = useState(null);

  // Handle Login Menu
  const handleLoginMenuOpen = (event) => setAnchorElLogin(event.currentTarget);
  const handleLoginMenuClose = () => setAnchorElLogin(null);

  // Handle Signup Menu
  const handleSignupMenuOpen = (event) => setAnchorElSignup(event.currentTarget);
  const handleSignupMenuClose = () => setAnchorElSignup(null);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {/* Square White Box */}
      <Paper
        elevation={5}
        sx={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '20px',
          width: '450px',  // Ensures a square-like design
          height: '450px', // Ensures equal width & height
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Login & Signup Buttons in Top Right Corner */}
        <Box sx={{ position: 'absolute', top: 20, right: 30, display: 'flex', gap: 2 }}>
          <Button 
            variant="text" 
            onMouseEnter={handleLoginMenuOpen}
            sx={{ textTransform: 'none', fontWeight: 600, fontSize: '18px', color: '#333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Login
          </Button>
          <Menu
            anchorEl={anchorElLogin}
            open={Boolean(anchorElLogin)}
            onClose={handleLoginMenuClose}
            MenuListProps={{ onMouseLeave: handleLoginMenuClose }}
          >
            <MenuItem onClick={() => navigate('/student-login')}>Student Login</MenuItem>
            <MenuItem onClick={() => navigate('/professor-login')}>Professor Login</MenuItem>
          </Menu>

          <Button 
            variant="text" 
            onMouseEnter={handleSignupMenuOpen}
            sx={{ textTransform: 'none', fontWeight: 600, fontSize: '18px', color: '#333', fontFamily: 'Montserrat, sans-serif' }}
          >
            Signup
          </Button>
          <Menu
            anchorEl={anchorElSignup}
            open={Boolean(anchorElSignup)}
            onClose={handleSignupMenuClose}
            MenuListProps={{ onMouseLeave: handleSignupMenuClose }}
          >
            <MenuItem onClick={() => navigate('/student-signup')}>Student Signup</MenuItem>
            <MenuItem onClick={() => navigate('/professor-signup')}>Professor Signup</MenuItem>
          </Menu>
        </Box>

        {/* Main Content Inside White Box */}
        <Typography 
          variant="h2" 
          fontWeight="bold" 
          sx={{ color: '#000', fontFamily: 'Montserrat, sans-serif', mb: 2 }}
        >
          Campus Connect
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ mt: 1, mb: 3, color: '#555', fontFamily: 'Montserrat, sans-serif' }}
        >
          A platform that connects students and professors for academic opportunities.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LandingPage;
