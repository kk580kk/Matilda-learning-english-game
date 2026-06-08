import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LevelSelect from './pages/LevelSelect';
import LevelL1 from './pages/levels/LevelL1';
import LevelL2 from './pages/levels/LevelL2';
import LevelL6 from './pages/levels/LevelL6';
import LevelL10 from './pages/levels/LevelL10';
import AchievementsPage from './pages/AchievementsPage';

function App() {

  return (
    <BrowserRouter basename="/Matilda-learning-english-game">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/levels" element={<LevelSelect />} />
        <Route path="/level/L1" element={<LevelL1 />} />
        <Route path="/level/L2" element={<LevelL2 />} />
        <Route path="/level/L6" element={<LevelL6 />} />
        <Route path="/level/L10" element={<LevelL10 />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
