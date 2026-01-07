import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, ChevronRight } from 'lucide-react'
import { Container, Section } from '@/components/layout/Section'
import { Button, Badge, Card } from '@/components/ui'
import { getLatestReleases, getFeaturedArtists, getEvents, supabase } from '@/lib/supabase'
import { formatDate, isUpcoming } from '@/lib/utils'
import VantaBackground from '@/components/layout/VantaBackground'
import { NavLink, useLocation } from 'react-router-dom'
// ===== HERO SECTION =====
function HeroSection() {
  return (
    <Section padding="lg" className="min-h-[92vh] flex items-center justify-center relative hero">
        <VantaBackground />

      {/* Overlay gradient pour lisibilité */}
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
            className="w-32 h-32 md:w-90 md:h-90 mx-auto"
          />
        </motion.div>
        {/* Titre */}
        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-4 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-white bold">MULTIVERSAL</span>
          <br />
          <span className="text-neon-cyan">RECORDS</span>
        </motion.h1>
   

        {/* Tagline */}
        <motion.p
          className="text-white text-lg md:text-xl max-w-xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Label indépendant de musique psytrance
          <br />
          <span className="text-white">Lyon, France • Depuis 2019</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <NavLink to={"/releases"}>
            <Button as={Link} to="/releases" variant="primary">
              Écouter
            </Button>
          </NavLink>
          <NavLink to={"/events"}>
            <Button as={Link} to="/events" variant="secondary">
              Événements
            </Button>
           </NavLink>
        </motion.div>
       
      </Container>

    </Section>
  )
}

// ===== ABOUT SECTION (nouvelle) =====
function AboutSection() {
  const stats = [
    { value: '6+', label: 'Années' },
    { value: '40+', label: 'Releases' },
    { value: '15+', label: 'Artistes' },
    { value: '70+', label: 'Événements' },
  ]

  return (
    <Section className="bg-mvr-darker/50">
      
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      <Container>
              

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Bienvenue dans le <span className="text-neon-cyan">Multiverse</span>
            </h2>
            <p className="text-text-secondary mb-4">
              Multiversal Records est un label indépendant de musique psytrance basé à Lyon, évoluant dans l'univers de la culture psychédélique depuis 2019.
            </p>
            <p className="text-text-secondary mb-6">
              MVR tend à produire des œuvres et des événements axés sur l'être humain, l'éco-responsabilité et la pleine conscience. Notre label réunit un panel d'artistes innovants et talentueux.
            </p>
            <NavLink to={"/about"}>
              <Button as={Link} to="/about" variant="secondary">
                En savoir plus
              </Button>
            </NavLink>
          
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-6 bg-mvr-surface border border-white/5"
                style={{ clipPath: 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)' }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-neon-cyan mb-1">
                  {stat.value}
                </div>
                <div className="text-text-muted text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

// ===== EVENTS SECTION  =====
function EventsSection({ events }) {
  if (!events || events.length === 0) return null

  // Séparer upcoming et past
  const now = new Date()
  const upcomingEvents = events.filter(e => new Date(e.event_date) >= now)
  const pastEvents = events.filter(e => new Date(e.event_date) < now)
  
  // Si pas d'upcoming, utiliser les 3 derniers events passés
  const displayEvents = upcomingEvents.length > 0 
    ? upcomingEvents.slice(0, 3) 
    : pastEvents.slice(0, 3)
  
  const isShowingPast = upcomingEvents.length === 0

  const mainEvent = displayEvents[0]
  if (!mainEvent) return null

  return (
    <Section className="relative">
      {/* Ligne décorative */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
      
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            {isShowingPast ? 'Derniers' : 'Prochains'} <span className="text-neon-cyan">événements</span>
          </h2>
          <Link 
            to="/events" 
            className="text-neon-cyan text-sm font-medium hover:underline hidden sm:flex items-center gap-1"
          >
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link to={`/events/${mainEvent.slug}`} className="block group">
            <Card 
              hover 
              accent 
              padding="none" 
              className="overflow-hidden relative"
            >
              {/* Image de fond */}
              {mainEvent.image_url && (
                <div className="absolute inset-0">
                  <img 
                    src={mainEvent.image_url} 
                    alt={mainEvent.name}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-mvr-dark/80 via-mvr-dark/30 to-transparent" />
                </div>
              )}

              <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                {/* Date box */}
                <div className="flex-shrink-0">
                  <div 
                    className={`w-20 h-20 md:w-24 md:h-24 ${isShowingPast ? 'bg-white/10 border-white/30' : 'bg-neon-cyan/10 border-neon-cyan/30'} border flex flex-col items-center justify-center`}
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  >
                    <span className={`${isShowingPast ? 'text-white' : 'text-neon-cyan'} font-display text-2xl md:text-3xl font-bold`}>
                      {new Date(mainEvent.event_date).getDate()}
                    </span>
                    <span className={`${isShowingPast ? 'text-white/70' : 'text-neon-cyan/70'} text-xs uppercase`}>
                      {new Date(mainEvent.event_date).toLocaleDateString('fr-FR', { month: 'short' })}
                    </span>
                  </div>
                </div>

                {/* Infos */}
                <div className="flex-1">
                  <Badge variant={isShowingPast ? 'default' : 'cyan'} size="sm" className="mb-3">
                    {isShowingPast ? 'Dernier événement' : 'Prochain événement'}
                  </Badge>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                    {mainEvent.name}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-text-secondary text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-neon-cyan" />
                      {formatDate(mainEvent.event_date, { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-neon-cyan" />
                      {mainEvent.venue_name}
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

        {/* Autres events */}
        {displayEvents.length > 1 && (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {displayEvents.slice(1, 3).map((event, index) => (
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
                      className={`w-12 h-12 flex-shrink-0 ${isShowingPast ? 'bg-white/10 border-white/30' : 'bg-neon-purple/10 border-neon-purple/30'} border flex items-center justify-center`}
                      style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                    >
                      <span className={`${isShowingPast ? 'text-white' : 'text-neon-purple'} font-display font-bold`}>
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

        <Link 
          to="/events" 
          className="text-neon-cyan text-sm font-medium hover:underline flex sm:hidden items-center gap-1 justify-center mt-6"
        >
          Tous les événements <ArrowRight className="w-4 h-4" />
        </Link>
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
  
            <img
              src="/logomvrcyan.png"
              alt=""
              className="absolute bottom-[-10vh] left-[-10vw] md:bottom-[-50vh] md:left-[-30vw] sm:bottom-[-20vh] sm:left-[-20vw] lg:bottom-[-95vh] lg:left-[-50vw] transform pointer-events-none opacity-10 z-[-10] scale-50 sm:scale-75 md:scale-90 lg:scale-100"
            />
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

// ===== MAIN HOME PAGE =====
export default function HomePage() {
  const [releases, setReleases] = useState([])
  const [artists, setArtists] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Dans le useEffect de HomePage
useEffect(() => {
  async function loadData() {
    try {
      if (!supabase) {
        setError('Supabase non configuré')
        setLoading(false)
        return
      }

      const [releasesData, artistsData, eventsData] = await Promise.all([
        getLatestReleases(4),
        getFeaturedArtists(4),
        getEvents(),
      ])

      setReleases(releasesData || [])
      setArtists(artistsData || [])
      // Trier par date décroissante et prendre les 6 plus récents
      const sortedEvents = (eventsData || [])
        .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
        .slice(0, 6)
      setEvents(sortedEvents)
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
    
      </>
    )
  }

  return (
    <>
      <HeroSection />
      <AboutSection/>
      <EventsSection events={events} />
      <ReleasesSection releases={releases} />
      <ArtistsSection artists={artists} />
  
    </>
  )
}
