import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Hexagon, Users, Disc3, Calendar, Info, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/', label: 'Accueil', icon: Hexagon },
  { path: '/roster', label: 'Artistes', icon: Users },
  { path: '/releases', label: 'Label', icon: Disc3 },
  { path: '/events', label: 'Evénements', icon: Calendar },
  { path: '/about', label: 'L\'asso', icon: Info },
  { path: '/contact', label: 'Contact', icon: Mail },
]

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-nav">
      {/* Background avec forme géométrique */}
            

      <div 
        className="absolute inset-0 bg-mvr-darker/95 backdrop-blur-md "
      />
<div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/90 to-transparent" />
      {/* Ligne décorative en haut */}
      

      {/* Navigation items */}
      <div className="relative flex items-center justify-around px-2 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
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
                <motion.img
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
    </nav>
  )
}
