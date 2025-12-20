import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Badge } from '@/components/ui'
import { releaseTypes } from '@/lib/utils'

export function ReleaseCard({ release, index = 0 }) {
  const artistNames = release.artists?.map(a => a.name).join(', ') || 'Unknown Artist'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/releases/${release.slug}`} className="group block">
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
          {/* Cover */}
          {release.cover_url ? (
            <img
              src={release.cover_url}
              alt={release.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-mvr-surface flex items-center justify-center">
              <span className="text-4xl text-gray-600">📀</span>
            </div>
          )}

          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark via-mvr-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 rounded-full bg-neon-cyan/90 flex items-center justify-center"
            >
              <Play className="w-6 h-6 text-mvr-dark ml-1" fill="currentColor" />
            </motion.div>
          </div>

          {/* Badge type */}
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="bg-mvr-dark/80 backdrop-blur-sm">
              {releaseTypes[release.release_type] || release.release_type}
            </Badge>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-neon-cyan/50 transition-all duration-300" />
        </div>

        {/* Infos */}
        <div>
          <h3 className="font-semibold text-white group-hover:text-neon-cyan transition-colors truncate">
            {release.title}
          </h3>
          <p className="text-sm text-gray-400 truncate">{artistNames}</p>
          {release.release_date && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(release.release_date).getFullYear()}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
