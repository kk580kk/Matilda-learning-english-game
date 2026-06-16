import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LevelSelect from './pages/LevelSelect';
import LevelL1 from './pages/levels/LevelL1';
import LevelL2 from './pages/levels/LevelL2';
import LevelL3 from './pages/levels/LevelL3';
import LevelL4 from './pages/levels/LevelL4';
import LevelL5 from './pages/levels/LevelL5';
import LevelL6 from './pages/levels/LevelL6';
import LevelL10 from './pages/levels/LevelL10';
import AchievementsPage from './pages/AchievementsPage';
import AchievementUnlockModal from './components/AchievementUnlockModal';
import { useAchievementStore } from './store';

function App() {
  const { checkLoginStreak } = useAchievementStore();
  
  // 应用启动时检查登录连续
  useEffect(() => {
    checkLoginStreak();
  }, []);

  return (
    <HashRouter>
      {/* 成就解锁弹窗 - 全局显示 */}
      <AchievementUnlockModal />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/levels" element={<LevelSelect />} />
        <Route path="/level/L1" element={<LevelL1 />} />
        <Route path="/level/L2" element={<LevelL2 />} />
        <Route path="/level/L3" element={<LevelL3 />} />
        <Route path="/level/L4" element={<LevelL4 />} />
        <Route path="/level/L5" element={<LevelL5 />} />
        <Route path="/level/L6" element={<LevelL6 />} />
        <Route path="/level/L10" element={<LevelL10 />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
