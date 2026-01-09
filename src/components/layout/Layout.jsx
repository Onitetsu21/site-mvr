import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'
import AudioPlayer from '@/components/audio/AudioPlayer'
import Background from './Background'
export default function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  return (
    <div className="min-h-screen text-white relative">
      {/* PAS de Background ici - le Vanta est géré par EntranceGate */}
      {!isHomePage && <Background />}
      {/* Audio Player rétractable (côté gauche) */}
      <AudioPlayer />
      
      {/* Contenu principal */}
      <main className="relative z-10 pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, z: 150 }}
            animate={{ opacity: 1, z: 0 }}
            exit={{ opacity: 0, z: -20 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Navigation bottom */}
      <Navigation />
    </div>
  )
}
