import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfessorAuth from './pages/ProfessorAuth';
import ProfessorDashboard from './pages/ProfessorDashboard';
import StudentAuth from './pages/StudentAuth';
import StudentDashboard from './pages/StudentDashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Professor routes */}
      <Route path="/professor-login" element={<ProfessorAuth />} />
      <Route path="/professor-dashboard" element={<ProfessorDashboard />} />

      {/* Student routes */}
      <Route path="/student-login" element={<StudentAuth />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
    </Routes>
  );
};

export default App;