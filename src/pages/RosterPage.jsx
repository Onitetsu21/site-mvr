import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Section, PageHeader } from '@/components/layout/Section'
import { Card, Badge, Loader } from '@/components/ui'
import { getMockArtists } from '@/lib/mockData'
import { getArtists, supabase } from '@/lib/supabase'

function ArtistCard({ artist, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/roster/${artist.slug}`}>
        <Card hover padding="none" className="overflow-hidden group h-full">
          {/* Photo */}
          <div className="aspect-square relative overflow-hidden">
            <img
              src={artist.photo_url}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark via-mvr-dark/20 to-transparent" />
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-neon-cyan/10" />
            
            {/* Styles badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {artist.styles?.slice(0, 2).map((style) => (
                <Badge key={style} variant="purple" size="sm">
                  {style}
                </Badge>
              ))}
            </div>
            
            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                {artist.name}
              </h3>
              {artist.location && (
                <p className="text-sm text-text-secondary mt-1">
                  📍 {artist.location}
                </p>
              )}
            </div>
          </div>
          
          {/* Bio preview on larger screens */}
          <div className="p-4 hidden md:block">
            <p className="text-sm text-text-secondary line-clamp-2">
              {artist.bio_fr}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default function RosterPage() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadArtists() {
      try {
        const data = await getArtists()
        setArtists(data)
      } catch (error) {
        console.error('Error loading artists:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArtists()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="ROSTER"
        subtitle="Les artistes qui font vibrer Multiversal Records. Une famille d'explorateurs sonores unis par la passion du psychédélique."
      />

      <Section padding="sm">
        <Container>
          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <p className="font-display text-3xl font-bold text-neon-cyan">{artists.length}</p>
              <p className="text-text-secondary text-sm">Artistes</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="font-display text-3xl font-bold text-neon-purple">30+</p>
              <p className="text-text-secondary text-sm">Releases</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="font-display text-3xl font-bold text-neon-pink">5+</p>
              <p className="text-text-secondary text-sm">Années</p>
            </div>
          </motion.div>

          {/* Grid d'artistes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist, index) => (
              <ArtistCard key={artist.id} artist={artist} index={index} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
