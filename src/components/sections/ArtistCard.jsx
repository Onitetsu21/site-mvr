import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui'

export function ArtistCard({ artist, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/roster/${artist.slug}`} className="group block">
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
          {/* Photo */}
          {artist.photo_url ? (
            <img
              src={artist.photo_url}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-mvr-surface flex items-center justify-center">
              <span className="text-4xl text-gray-600">👤</span>
            </div>
          )}

          {/* Overlay gradient permanent */}
          <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark via-transparent to-transparent" />

          {/* Overlay au hover avec bio */}
          <div className="absolute inset-0 bg-mvr-dark/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
            <p className="text-sm text-gray-300 line-clamp-4">
              {artist.bio_fr || 'Artiste du label Multiversal Records'}
            </p>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-neon-purple/50 transition-all duration-300" />
        </div>

        {/* Infos */}
        <div>
          <h3 className="font-semibold text-white group-hover:text-neon-purple transition-colors">
            {artist.name}
          </h3>
          {artist.styles && artist.styles.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {artist.styles.slice(0, 2).map((style) => (
                <span key={style} className="text-xs text-gray-500">
                  {style}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

// Version hexagonale alternative
export function ArtistCardHex({ artist, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/roster/${artist.slug}`} className="block">
        <div className="relative w-full aspect-[1/1.15] flex items-center justify-center">
          {/* Hexagone container */}
          <div className="relative w-full h-full clip-hexagon overflow-hidden bg-mvr-surface">
            {artist.photo_url ? (
              <img
                src={artist.photo_url}
                alt={artist.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-gray-600">👤</span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark via-transparent to-transparent opacity-60" />
          </div>

          {/* Border hexagonale */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 115"
            preserveAspectRatio="none"
          >
            <polygon
              points="50,2 98,28 98,87 50,113 2,87 2,28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-mvr-border group-hover:text-neon-purple transition-colors duration-300"
            />
          </svg>
        </div>

        {/* Nom en dessous */}
        <div className="text-center mt-3">
          <h3 className="font-semibold text-white group-hover:text-neon-purple transition-colors">
            {artist.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}
