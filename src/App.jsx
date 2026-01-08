import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ScrollToTop from './components/ui/ScrollToTop'

// Audio System
import { AudioProvider } from './contexts/AudioContext'
import EntranceGate from './components/audio/EntranceGate'

// Layout
import Layout from './components/layout/Layout'

// Pages
import HomePage from './pages/HomePage'
import RosterPage from './pages/RosterPage'
import ArtistPage from './pages/ArtistPage'
import ReleasesPage from './pages/ReleasesPage'
import ReleasePage from './pages/ReleasePage'
import EventsPage from './pages/EventsPage'
import EventPage from './pages/EventPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminArtists from './pages/admin/AdminArtists'
import AdminReleases from './pages/admin/AdminReleases'
import AdminEvents from './pages/admin/AdminEvents'

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="roster" element={<RosterPage />} />
          <Route path="roster/:slug" element={<ArtistPage />} />
          <Route path="releases" element={<ReleasesPage />} />
          <Route path="releases/:slug" element={<ReleasePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Routes - pas d'EntranceGate */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/artists" element={<AdminArtists />} />
        <Route path="/admin/releases" element={<AdminReleases />} />
        <Route path="/admin/events" element={<AdminEvents />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const location = useLocation()
  
  // Ne pas afficher l'EntranceGate sur les pages admin
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <AppRoutes />
  }

  return (
    <AudioProvider>
      <EntranceGate>
        <AppRoutes />
      </EntranceGate>
    </AudioProvider>
  )
}

export default App
