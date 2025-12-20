import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-neon-cyan text-mvr-dark hover:bg-white',
  secondary: 'bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10',
  ghost: 'bg-transparent text-neon-cyan hover:bg-neon-cyan/5',
  danger: 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  as = 'button',
  href,
  target,
  ...props
}) {
  const Component = as === 'a' ? motion.a : motion.button

  // Clip-path pour forme géométrique (sauf ghost)
  const clipPath = variant !== 'ghost' 
    ? 'polygon(25% 0%, 100% 0px, 100% 60%, 75% 100%, 0px 100%, 0px 40%)'
    : 'none'

  const baseClasses = cn(
    'font-display font-semibold uppercase tracking-wider',
    'inline-flex items-center justify-center gap-2',
    'transition-all duration-200',
    'focus:outline-none focus:ring-1 focus:ring-neon-cyan/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  )

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </>
  )

  if (as === 'a') {
    return (
      <Component
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={baseClasses}
        style={{ clipPath }}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {content}
      </Component>
    )
  }

  return (
    <Component
      disabled={disabled || loading}
      className={baseClasses}
      style={{ clipPath }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {content}
    </Component>
  )
}
