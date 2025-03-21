import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import LandingPage from './pages/LandingPage';
import ProfessorAuth from './pages/ProfessorAuth';
import ProfessorDashboard from './pages/ProfessorDashboard';
import StudentAuth from './pages/StudentAuth';
import StudentDashboard from './pages/StudentDashboard';

const App = () => {
  return (
    <>
      <CssBaseline /> {/* Normalizes Material UI styles */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Professor Routes */}
        <Route path="/professor-login" element={<ProfessorAuth />} />
        <Route path="/professor-signup" element={<ProfessorAuth />} />
        <Route path="/professor-dashboard" element={<ProfessorDashboard />} />

        {/* Student Routes */}
        <Route path="/student-login" element={<StudentAuth />} />
        <Route path="/student-signup" element={<StudentAuth />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </>
  );
};

export default App;
