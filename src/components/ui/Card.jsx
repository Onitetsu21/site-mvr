import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Card({
  children,
  className,
  hover = true,
  accent = false,
  variant = 'default',
  padding = 'md',
  ...props
}) {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const variants = {
    default: 'bg-mvr-surface',
    elevated: 'bg-mvr-elevated',
    glass: 'glass',
  }

  // Clip-path avec coins coupés
  const clipPath = 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)'

  return (
    <motion.div
      className={cn(
        'relative transition-all duration-200',
        'border border-white/5',
        variants[variant],
        paddingSizes[padding],
        hover && 'hover:border-neon-cyan/20',
        className
      )}
      style={{ clipPath }}
      whileHover={hover ? { y: -2 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Accent lines en haut à gauche */}
      {accent && (
        <>
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-neon-cyan" />
          <div className="absolute top-0 left-0 w-[2px] h-16 bg-neon-cyan" />
        </>
      )}
      {children}
    </motion.div>
  )
}

// Sous-composants
Card.Header = function CardHeader({ children, className }) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}

Card.Title = function CardTitle({ children, className }) {
  return (
    <h3 className={cn('font-display text-xl font-bold text-white', className)}>
      {children}
    </h3>
  )
}

Card.Description = function CardDescription({ children, className }) {
  return (
    <p className={cn('text-text-secondary text-sm mt-1', className)}>
      {children}
    </p>
  )
}

Card.Content = function CardContent({ children, className }) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  )
}

Card.Footer = function CardFooter({ children, className }) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-white/5', className)}>
      {children}
    </div>
  )
}
