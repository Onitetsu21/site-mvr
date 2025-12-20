import { cn } from '@/lib/utils'

const variants = {
  cyan: 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30',
  purple: 'bg-neon-purple/15 text-neon-purple border-neon-purple/30',
  pink: 'bg-neon-pink/15 text-neon-pink border-neon-pink/30',
  default: 'bg-white/10 text-white/80 border-white/20',
}

const sizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) {
  // Clip-path hexagonal pour les badges
  const clipPath = 'polygon(6px 0%, calc(100% - 6px) 0%, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0% 50%)'

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium uppercase tracking-wide',
        'border',
        variants[variant],
        sizes[size],
        className
      )}
      style={{ clipPath }}
      {...props}
    >
      {children}
    </span>
  )
}
