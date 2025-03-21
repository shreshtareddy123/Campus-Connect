import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e88e5',
    },
    secondary: {
      main: '#1565c0',
    },
    background: {
      default: '#f5f8fc',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", serif !important', // Force Playfair Display globally
    h1: {
      fontFamily: '"Playfair Display", serif !important',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif !important',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Playfair Display", serif !important',
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
