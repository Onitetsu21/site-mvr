import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// ===== INPUT =====
export const Input = forwardRef(function Input(
  { label, error, className, ...props },
  ref
) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-secondary">
          {label}
          {props.required && <span className="text-neon-pink ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full bg-mvr-elevated border rounded-lg px-4 py-3',
          'text-white placeholder:text-text-muted',
          'focus:outline-none focus:ring-2 focus:ring-neon-cyan/30',
          'transition-all duration-300',
          error ? 'border-red-500/50' : 'border-white/10 focus:border-neon-cyan/50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  )
})

// ===== TEXTAREA =====
export const Textarea = forwardRef(function Textarea(
  { label, error, className, rows = 4, ...props },
  ref
) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-secondary">
          {label}
          {props.required && <span className="text-neon-pink ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'w-full bg-mvr-elevated border rounded-lg px-4 py-3',
          'text-white placeholder:text-text-muted',
          'focus:outline-none focus:ring-2 focus:ring-neon-cyan/30',
          'transition-all duration-300 resize-none',
          error ? 'border-red-500/50' : 'border-white/10 focus:border-neon-cyan/50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  )
})

// ===== SELECT =====
export const Select = forwardRef(function Select(
  { label, error, options = [], placeholder, className, ...props },
  ref
) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-secondary">
          {label}
          {props.required && <span className="text-neon-pink ml-1">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'w-full bg-mvr-elevated border rounded-lg px-4 py-3',
          'text-white',
          'focus:outline-none focus:ring-2 focus:ring-neon-cyan/30',
          'transition-all duration-300',
          'appearance-none cursor-pointer',
          'bg-no-repeat bg-right',
          error ? 'border-red-500/50' : 'border-white/10 focus:border-neon-cyan/50',
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundPosition: 'right 1rem center',
          backgroundSize: '1.5rem',
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-mvr-dark text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  )
})
