import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function SectionTitle({
  children,
  subtitle,
  align = 'center',
  className,
  glitch = false,
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <motion.div
      className={cn('mb-12', alignClasses[align], className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 
        className={cn(
          'font-display text-4xl md:text-5xl font-bold',
          'text-gradient-cyan',
          glitch && 'animate-flicker'
        )}
      >
        {children}
      </h2>
      
      {subtitle && (
        <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      
      {/* Ligne décorative */}
      <motion.div
        className={cn(
          'mt-6 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent',
          align === 'left' && 'max-w-xs',
          align === 'center' && 'max-w-md mx-auto',
          align === 'right' && 'max-w-xs ml-auto'
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  )
}
