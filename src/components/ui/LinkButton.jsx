import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  ExternalLink,
  Music,
  Headphones,
  ShoppingBag,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  Download
} from 'lucide-react'

// Icônes et couleurs par plateforme
const platformConfig = {
  spotify: {
    name: 'Spotify',
    color: '#1DB954',
    bgColor: 'rgba(29, 185, 84, 0.15)',
    icon: Music,
  },
  soundcloud: {
    name: 'SoundCloud',
    color: '#ff5500',
    bgColor: 'rgba(255, 85, 0, 0.15)',
    icon: Headphones,
  },
  bandcamp: {
    name: 'Bandcamp',
    color: '#629aa9',
    bgColor: 'rgba(98, 154, 169, 0.15)',
    icon: ShoppingBag,
  },
  apple_music: {
    name: 'Apple Music',
    color: '#fc3c44',
    bgColor: 'rgba(252, 60, 68, 0.15)',
    icon: Music,
  },
  beatport: {
    name: 'Beatport',
    color: '#94d500',
    bgColor: 'rgba(148, 213, 0, 0.15)',
    icon: ShoppingBag,
  },
  youtube: {
    name: 'YouTube',
    color: '#ff0000',
    bgColor: 'rgba(255, 0, 0, 0.15)',
    icon: Youtube,
  },
  instagram: {
    name: 'Instagram',
    color: '#E4405F',
    bgColor: 'rgba(228, 64, 95, 0.15)',
    icon: Instagram,
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    bgColor: 'rgba(24, 119, 242, 0.15)',
    icon: Facebook,
  },
  twitter: {
    name: 'Twitter/X',
    color: '#1DA1F2',
    bgColor: 'rgba(29, 161, 242, 0.15)',
    icon: Twitter,
  },
  presskit: {
    name: 'Télécharger Presskit',
    color: '#00f0ff',
    bgColor: 'rgba(0, 240, 255, 0.15)',
    icon: Download,
  },
  default: {
    name: 'Lien',
    color: '#ffffff',
    bgColor: 'rgba(255, 255, 255, 0.1)',
    icon: ExternalLink,
  }
}

export default function LinkButton({
  platform = 'default',
  href,
  label,
  className,
  ...props
}) {
  const config = platformConfig[platform] || platformConfig.default
  const Icon = config.icon
  const displayName = label || config.name

  if (!href) return null

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-4 w-full px-6 py-4 rounded-xl',
        'border border-white/10 transition-all duration-300',
        'hover:scale-[1.02] hover:border-opacity-50',
        className
      )}
      style={{
        backgroundColor: config.bgColor,
        borderColor: config.color + '40',
      }}
      whileHover={{
        boxShadow: `0 0 20px ${config.color}40, 0 0 40px ${config.color}20`,
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      {...props}
    >
      <div 
        className="flex items-center justify-center w-10 h-10 rounded-lg"
        style={{ backgroundColor: config.color + '30' }}
      >
        <Icon 
          className="w-5 h-5" 
          style={{ color: config.color }}
        />
      </div>
      
      <span className="flex-1 font-semibold text-white">
        {displayName}
      </span>
      
      <ExternalLink 
        className="w-4 h-4 text-text-muted" 
      />
    </motion.a>
  )
}

// Composant pour afficher plusieurs liens
export function LinkButtonGroup({ links, className }) {
  // Filtre les liens vides
  const validLinks = Object.entries(links || {}).filter(([_, url]) => url)

  if (validLinks.length === 0) return null

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {validLinks.map(([platform, url], index) => (
        <LinkButton
          key={platform}
          platform={platform.replace('link_', '')}
          href={url}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  )
}
