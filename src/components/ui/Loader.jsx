import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Loader({ size = 'md', className }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        className={cn(
          'relative',
          sizes[size]
        )}
      >
        {/* Hexagone animé */}
        <motion.div
          className="absolute inset-0 border-2 border-neon-cyan"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        
        {/* Centre lumineux */}
        <motion.div
          className="absolute inset-2 bg-neon-cyan/20"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}

// Loader plein écran
export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-mvr-dark flex flex-col items-center justify-center gap-4 z-50">
      <Loader size="lg" />
      <motion.p
        className="text-text-secondary text-sm font-display uppercase tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Chargement...
      </motion.p>
    </div>
  )
}
