import { cn } from '@/lib/utils'

export function Container({ children, className, size = 'default' }) {
  const sizes = {
    sm: 'max-w-2xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div className={cn('mx-auto px-4 sm:px-6', sizes[size], className)}>
      {children}
    </div>
  )
}

export function Section({ children, className, padding = 'default' }) {
  const paddings = {
    none: '',
    sm: 'py-8 md:py-12',
    default: 'py-12 md:py-20',
    lg: 'py-16 md:py-28',
  }

  return (
    <section className={cn(paddings[padding], className)}>
      {children}
    </section>
  )
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="pt-8 pb-8 md:pt-12 md:pb-12">
      <Container>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-secondary text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
        {children}
        
        {/* Ligne décorative */}
        <div className="mt-6 h-[2px] w-24 bg-neon-cyan" />
      </Container>
    </div>
  )
}
