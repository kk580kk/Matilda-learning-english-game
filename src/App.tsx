import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import SettingsPage from './pages/SettingsPage'
import AchievementToast from './components/ui/AchievementToast'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <AchievementToast />
    </>
  )
}

export default App
