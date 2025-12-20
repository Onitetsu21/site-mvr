import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container, Section, PageHeader } from '@/components/layout/Section'
import { Card, Badge, Loader } from '@/components/ui'

import { formatDate } from '@/lib/utils'
import { getReleases, supabase } from '@/lib/supabase'


function ReleaseCard({ release, index }) {
  const artistNames = release.release_artists?.map(ra => ra.artist.name).join(', ') || 'Various Artists'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/releases/${release.slug}`}>
        <Card hover padding="none" className="overflow-hidden group h-full">
          {/* Cover */}
          <div className="aspect-square relative overflow-hidden">
            <img
              src={release.cover_url}
              alt={release.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark via-transparent to-transparent opacity-60" />
            
            {/* Play indicator on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 rounded-full bg-neon-cyan/90 flex items-center justify-center">
                <svg className="w-6 h-6 text-mvr-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            
            {/* Type & Catalog */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
              <Badge variant="purple" size="sm" className="uppercase">
                {release.release_type}
              </Badge>
              <Badge variant="cyan" size="sm">
                {release.catalog_number}
              </Badge>
            </div>
          </div>
          
          {/* Info */}
          <div className="p-4">
            <h4 className="font-display font-bold text-white group-hover:text-neon-cyan transition-colors truncate">
              {release.title}
            </h4>
            <p className="text-sm text-text-secondary truncate mt-1">
              {artistNames}
            </p>
            <p className="text-xs text-text-muted mt-2">
              {formatDate(release.release_date, { month: 'short', year: 'numeric' })}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default function ReleasesPage() {
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function loadReleases() {
      try {
        const data = await getReleases()
        setReleases(data)
      } catch (error) {
        console.error('Error loading releases:', error)
      } finally {
        setLoading(false)
      }
    }

    loadReleases()
  }, [])

  const filteredReleases = filter === 'all' 
    ? releases 
    : releases.filter(r => r.release_type === filter)

  const releaseTypes = ['all', 'single', 'ep', 'album', 'va']

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
        title="RELEASES"
        subtitle={`${releases.length} sorties depuis 2019. Psytrance, Darkpsy, Forest, Progressive et plus encore.`}
      />

      <Section padding="sm">
        <Container>
          {/* Filtres */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {releaseTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide
                  transition-all duration-200
                  ${filter === type 
                    ? 'bg-neon-cyan text-mvr-dark' 
                    : 'bg-mvr-surface text-text-secondary hover:text-white border border-white/10 hover:border-neon-cyan/30'
                  }
                `}
              >
                {type === 'all' ? 'Tout' : type}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredReleases.map((release, index) => (
              <ReleaseCard key={release.id} release={release} index={index} />
            ))}
          </div>

          {filteredReleases.length === 0 && (
            <p className="text-center text-text-secondary py-12">
              Aucune release dans cette catégorie.
            </p>
          )}
        </Container>
      </Section>
    </>
  )
}
