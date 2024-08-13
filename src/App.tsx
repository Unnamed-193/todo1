import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import ProgressPage from './pages/ProgressPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/progress' element={<ProgressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
