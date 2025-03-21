import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

import LandingPage from './pages/LandingPage';
import ProfessorAuth from './pages/ProfessorAuth';
import ProfessorDashboard from './pages/ProfessorDashboard';
import StudentAuth from './pages/StudentAuth';
import StudentDashboard from './pages/StudentDashboard';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applies global Material UI reset styles */}
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Professor Routes */}
        <Route path="/professor-login" element={<ProfessorAuth />} />
        <Route path="/professor-signup" element={<ProfessorAuth />} /> 
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />

        {/* Fix: Make sure these Student routes exist */}
        <Route path="/student-login" element={<StudentAuth />} />
        <Route path="/student-signup" element={<StudentAuth />} />
        {/* Professor routes */}
        <Route path="/professor-login" element={<ProfessorAuth />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />

        {/* Student routes */}
        <Route path="/student-login" element={<StudentAuth />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </ThemeProvider>
  );
};


export default App;
