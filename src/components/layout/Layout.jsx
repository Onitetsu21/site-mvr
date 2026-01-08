import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'
import AudioPlayer from '@/components/audio/AudioPlayer'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen text-white relative">
      {/* PAS de Background ici - le Vanta est géré par EntranceGate */}
      
      {/* Audio Player rétractable (côté gauche) */}
      <AudioPlayer />
      
      {/* Contenu principal */}
      <main className="relative z-10 pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
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
