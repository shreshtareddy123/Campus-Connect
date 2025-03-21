import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

import LandingPage from './pages/LandingPage';
import ProfessorAuth from './pages/ProfessorAuth';
import ProfessorDashboard from './pages/ProfessorDashboard';
import StudentAuth from './pages/StudentAuth';
import ProfessorCourses from './pages/ProfessorCourses';
import StudentDashboard from './pages/StudentDashboard';

// const App = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline /> {/* Applies global Material UI reset styles */}
//       <Routes>
//         <Route path="/" element={<LandingPage />} />

//         {/* Professor routes */}
//         <Route path="/professor-login" element={<ProfessorAuth />} />
//         <Route path="/professor-dashboard" element={<ProfessorDashboard />} />

//         {/* Student routes */}
//         <Route path="/student-login" element={<StudentAuth />} />
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//       </Routes>
//     </ThemeProvider>
//   );
// };

const App = () => {
  return (
    <Routes>
      {/* Temporarily set ProfessorCourses as the default page */}
      <Route path="/" element={<ProfessorCourses />} />
    </Routes>
  );
};

export default App;
