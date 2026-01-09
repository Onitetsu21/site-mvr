import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {  Users, Disc3, Calendar, Info, Mail, Hexagon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAudio } from '@/contexts/AudioContext'

const navItems = [
  { path: '/', label: 'Home', icon: Hexagon },
  { path: '/roster', label: 'Roster', icon: Users },
  { path: '/releases', label: 'Releases', icon: Disc3 },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/about', label: 'About', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
]

export default function Navigation() {
  const location = useLocation()
  const { siteUnlocked } = useAudio()
  const [isVisible, setIsVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = 100 // Commence à montrer après 100px de scroll
      
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        // Scroll vers le bas ET on a passé le seuil → montrer
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY) {
        // Scroll vers le haut → cacher
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Reset visibility quand on change de page
  useEffect(() => {
    setIsVisible(false)
    setLastScrollY(0)
  }, [location.pathname])

  const shouldShow = siteUnlocked && isVisible

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.nav 
          className="fixed bottom-0 left-0 right-0 z-nav"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30
          }}
        >
          {/* Background avec forme géométrique */}
          <div 
            className="absolute inset-0 bg-mvr-darker/95 backdrop-blur-md"
          />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/90 to-transparent" />

          {/* Navigation items */}
          <div className="relative flex items-center justify-around px-2 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center gap-1 px-3 py-1"
                >
                  {/* Indicateur actif */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -top-3 w-1 h-1 bg-neon-cyan"
                      style={{ 
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' 
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Icône */}
                  <item.icon 
                    className={cn(
                      'w-5 h-5 transition-colors duration-200',
                      isActive ? 'text-neon-cyan' : 'text-text-muted'
                    )}
                  />

                  {/* Label - visible sur desktop */}
                  <span 
                    className={cn(
                      'text-[10px] font-medium uppercase tracking-wide transition-colors duration-200',
                      'hidden sm:block',
                      isActive ? 'text-neon-cyan' : 'text-text-muted'
                    )}
                  >
                    {item.label}
                  </span>
                </NavLink>
              )
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}