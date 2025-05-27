import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import NotFoundPage from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;

