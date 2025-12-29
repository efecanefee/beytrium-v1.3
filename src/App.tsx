// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './_components/Layout'
import Login from './pages/Login'
import Register from './pages/Register' // YENİ
import Welcome from './pages/Welcome'   // YENİ
import Feed from './pages/Feed'
import ClubProfile from './pages/ClubProfile'
import Explore from './pages/Explore'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import ClubManagement from './pages/ClubManagement' // YENİ
import AdminDashboard from './pages/AdminDashboard' // YENİ
import Settings from './pages/Settings' // YENİ
import About from './pages/About' // YENİ

function App() {
  return (
    <Router>
      <Routes>
        {/* Halka Açık Sayfalar */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* YENİ */}

        {/* Ana Uygulama (Giriş Yapıldıktan Sonra) */}
        {/* Tüm iç rotalar artık /home ile başlıyor */}
        <Route path="/home" element={<Layout />}>
          <Route index element={<Feed />} /> {/* /app açılınca Feed gelir */}
          <Route path="explore" element={<Explore />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="user/:id" element={<UserProfile />} />
          <Route path="club-management" element={<ClubManagement />} /> {/* YENİ */}
          <Route path="club/:id" element={<ClubProfile />} />

          <Route path="settings" element={<Settings />} /> {/* YENİ */}
          <Route path="about" element={<About />} /> {/* YENİ */}
        </Route>

        {/* Bilinmeyen rotaları başa yönlendir */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App