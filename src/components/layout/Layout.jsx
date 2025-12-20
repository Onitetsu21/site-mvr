import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './Navigation'
import Background from './Background'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-mvr-dark text-white relative overflow-hidden">
      {/* Background animé */}
      <Background />
      
      {/* Contenu principal */}
      <main className="relative z-10 pb-24 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
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
