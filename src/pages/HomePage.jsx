import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, ChevronRight } from 'lucide-react'
import { Container, Section } from '@/components/layout/Section'
import { Button, Badge, Card } from '@/components/ui'
import { getLatestReleases, getFeaturedArtists, getUpcomingEvents, supabase } from '@/lib/supabase'
import { formatDate, isUpcoming } from '@/lib/utils'

// ===== HERO SECTION =====
function HeroSection() {
  return (
    <Section padding="lg" className="min-h-[70vh] flex items-center justify-center relative hero">
      <Container className="text-center">
        {/* Logo MVR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <img 
            src="/mvr_logo_blanc.png" 
            alt="Multiversal Records" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto"
          />
        </motion.div>

        {/* Titre */}
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-white">MULTIVERSAL</span>
          <br />
          <span className="text-neon-cyan">RECORDS</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-text-secondary text-lg md:text-xl max-w-xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Label indépendant de musique psytrance
          <br />
          <span className="text-text-muted">Lyon, France • Depuis 2019</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button as={Link} to="/releases" variant="primary">
            Écouter
          </Button>
          <Button as={Link} to="/events" variant="secondary">
            Événements
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ 
            opacity: { delay: 1, duration: 0.6 },
            y: { delay: 1, duration: 2, repeat: Infinity }
          }}
        >
          <div className="w-[2px] h-8 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
        </motion.div>
      </Container>
    </Section>
  )
}

// ===== UPCOMING EVENT SECTION =====
function UpcomingEventSection({ events }) {
  if (!events || events.length === 0) return null

  const nextEvent = events[0]

  return (
    <Section className="relative">
      {/* Ligne décorative */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link to={`/events/${nextEvent.slug}`} className="block group">
            <Card 
              hover 
              accent 
              padding="none" 
              className="overflow-hidden relative"
            >
              {/* Image de fond */}
              {nextEvent.image_url && (
                <div className="absolute inset-0">
                  <img 
                    src={nextEvent.image_url} 
                    alt={nextEvent.name}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-mvr-dark via-mvr-dark/90 to-mvr-dark/70" />
                </div>
              )}

              <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                {/* Date box */}
                <div className="flex-shrink-0">
                  <div 
                    className="w-20 h-22 md:w-[100px] md:h-[110px] bg-neon-cyan/10 border-l-4 border-r-4 border-neon-cyan/30 flex flex-col items-center justify-center"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  >
                    <span className="text-neon-cyan font-display text-2xl md:text-3xl font-bold">
                      {new Date(nextEvent.event_date).getDate()}
                    </span>
                    <span className="text-neon-cyan/70 text-xs uppercase">
                      {new Date(nextEvent.event_date).toLocaleDateString('fr-FR', { month: 'short' })}
                    </span>
                  </div>
                </div>

                {/* Infos */}
                <div className="flex-1">
                  <Badge variant="cyan" size="sm" className="mb-3">
                    Prochain événement
                  </Badge>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                    {nextEvent.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-text-secondary text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-neon-cyan" />
                      {formatDate(nextEvent.event_date, { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-neon-cyan" />
                      {nextEvent.venue_name}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center">
                  <ChevronRight className="w-6 h-6 text-text-muted group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Autres events à venir */}
        {events.length > 1 && (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {events.slice(1, 3).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/events/${event.slug}`} className="block group">
                  <Card hover className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12  flex-shrink-0 bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center"
                      style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                    >
                      <span className="text-neon-purple font-display font-bold">
                        {new Date(event.event_date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white truncate group-hover:text-neon-cyan transition-colors">
                        {event.name}
                      </h4>
                      <p className="text-text-muted text-sm truncate">
                        {event.venue_name}
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Link to all events */}
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/events" 
            className="text-neon-cyan text-sm font-medium hover:underline inline-flex items-center gap-1"
          >
            Tous les événements <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}

// ===== RELEASES SECTION =====
function ReleasesSection({ releases }) {
  if (!releases || releases.length === 0) return null

  return (
    <Section>
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Dernières <span className="text-neon-cyan">releases</span>
          </h2>
          <Link 
            to="/releases" 
            className="text-neon-cyan text-sm font-medium hover:underline hidden sm:flex items-center gap-1"
          >
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {releases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/releases/${release.slug}`} className="block group">
                {/* Cover */}
                <div 
                  className="aspect-square mb-3 overflow-hidden bg-mvr-elevated relative"
                  style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)' }}
                >
                  {release.cover_url ? (
                    <img 
                      src={release.cover_url} 
                      alt={release.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      📀
                    </div>
                  )}
                  
                  {/* Badge type */}
                  <Badge 
                    variant="purple" 
                    size="sm" 
                    className="absolute top-2 right-2 h-26!"
                  >
                    {release.release_type}
                  </Badge>
                </div>

                {/* Info */}
                <h4 className="font-semibold text-white truncate group-hover:text-neon-cyan transition-colors">
                  {release.title}
                </h4>
                <p className="text-text-muted text-sm truncate">
                  {release.release_artists?.map(ra => ra.artist.name).join(', ') || 'V.A'}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link 
          to="/releases" 
          className="text-neon-cyan text-sm font-medium hover:underline flex sm:hidden items-center gap-1 justify-center mt-6"
        >
          Voir tout <ArrowRight className="w-4 h-4" />
        </Link>
      </Container>
    </Section>
  )
}

// ===== ARTISTS SECTION =====
function ArtistsSection({ artists }) {
  if (!artists || artists.length === 0) return null

  return (
    <Section className="bg-mvr-darker/50">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Le <span className="text-neon-purple">roster</span>
          </h2>
          <Link 
            to="/roster" 
            className="text-neon-purple text-sm font-medium hover:underline hidden sm:flex items-center gap-1"
          >
            Tous les artistes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/roster/${artist.slug}`} className="block group text-center">
                {/* Photo hexagonale */}
                <div className="relative w-[100px] h-[110px] md:w-[200px] md:h-[220px] mx-auto mb-4">
                  <div 
                    className="absolute inset-0  border-8  border-double border-white/10 group-hover:border-neon-purple/50 transition-colors duration-300"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  />
                  <div 
                    className="absolute inset-1 overflow-hidden bg-mvr-elevated"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  >
                    {artist.photo_url ? (
                      <img 
                        src={artist.photo_url} 
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        🎧
                      </div>
                    )}
                  </div>
                </div>

                {/* Nom */}
                <h4 className="font-display font-bold text-white group-hover:text-neon-purple transition-colors">
                  {artist.name}
                </h4>
                <p className="text-text-muted text-sm">
                  {artist.styles?.[0] || 'Psytrance'}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link 
          to="/roster" 
          className="text-neon-purple text-sm font-medium hover:underline flex sm:hidden items-center gap-1 justify-center mt-6"
        >
          Tous les artistes <ArrowRight className="w-4 h-4" />
        </Link>
      </Container>
    </Section>
  )
}

// ===== VALUES SECTION =====
function ValuesSection() {
  const values = [
    { icon: '🤝', label: 'Respect' },
    { icon: '🔄', label: 'Partage' },
    { icon: '📚', label: 'Transmission' },
    { icon: '🌱', label: 'Écoresponsabilité' },
    { icon: '🚀', label: 'Ouverture' },
  ]

  return (
    <Section padding="sm">
      <Container>
        <motion.div 
          className="flex flex-wrap justify-center gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-mvr-surface/50 border border-white/5"
              style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)' }}
            >
              <span>{value.icon}</span>
              <span className="text-text-secondary text-sm font-medium">{value.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}

// ===== MAIN HOME PAGE =====
export default function HomePage() {
  const [releases, setReleases] = useState([])
  const [artists, setArtists] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        // Vérifier si Supabase est configuré
        if (!supabase) {
          setError('Supabase non configuré')
          setLoading(false)
          return
        }

        const [releasesData, artistsData, eventsData] = await Promise.all([
          getLatestReleases(4),
          getFeaturedArtists(4),
          getUpcomingEvents(3),
        ])

        setReleases(releasesData || [])
        setArtists(artistsData || [])
        setEvents(eventsData || [])
      } catch (err) {
        console.error('Error loading home data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Afficher un message si Supabase n'est pas configuré
  if (error === 'Supabase non configuré') {
    return (
      <>
        <HeroSection />
        <Section>
          <Container>
            <Card accent className="text-center py-12">
              <p className="text-neon-cyan mb-2">⚠️ Base de données non connectée</p>
              <p className="text-text-secondary text-sm">
                Configurez vos variables d'environnement Supabase dans le fichier .env
              </p>
            </Card>
          </Container>
        </Section>
        <ValuesSection />
      </>
    )
  }

  return (
    <>
      <HeroSection />
      <UpcomingEventSection events={events} />
      <ReleasesSection releases={releases} />
      <ArtistsSection artists={artists} />
      <ValuesSection />
    </>
  )
}
