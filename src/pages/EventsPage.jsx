import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Ticket } from 'lucide-react'
import { Container, Section, PageHeader } from '@/components/layout/Section'
import { Card, Badge, Button, Loader, SectionTitle } from '@/components/ui'
import { getMockEvents } from '@/lib/mockData'
import { formatDate, isUpcoming } from '@/lib/utils'
import { getEvents, supabase } from '@/lib/supabase'


function EventCard({ event, index, featured = false }) {
  const upcoming = isUpcoming(event.event_date)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <Link to={`/events/${event.slug}`}>
        <Card 
          hover 
          padding="none" 
          className={`overflow-hidden group h-full ${featured ? 'md:flex' : ''}`}
        >
          {/* Image */}
          <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : 'aspect-video'}`}>
            <img
              src={event.image_url}
              alt={event.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark/90 via-mvr-dark/30 to-transparent" />
            
            {/* Badge statut */}
            <div className="absolute top-3 left-3">
              {upcoming ? (
                <Badge variant="cyan" glow>
                  À venir
                </Badge>
              ) : event.aftermovie_url || event.photos?.length ? (
                <Badge variant="purple">
                  📸 Photos dispo
                </Badge>
              ) : (
                <Badge variant="default">
                  Passé
                </Badge>
              )}
            </div>
          </div>
          
          {/* Info */}
          <div className={`p-5 ${featured ? 'md:w-1/2 md:flex md:flex-col md:justify-center' : ''}`}>
            <h3 className={`font-display font-bold text-white group-hover:text-neon-cyan transition-colors mb-3 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
              {event.name}
            </h3>
            
            <div className="space-y-2 text-sm text-text-secondary mb-4">
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-cyan" />
                {formatDate(event.event_date, { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neon-cyan" />
                {event.venue_name}
              </p>
            </div>
            
            {/* Line-up preview */}
            {event.event_lineup?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {event.event_lineup.slice(0, 4).map((item) => (
                  <span 
                    key={item.id} 
                    className="text-xs px-2 py-1 bg-white/5 rounded text-text-secondary"
                  >
                    {item.artist?.name || item.external_name}
                  </span>
                ))}
                {event.event_lineup.length > 4 && (
                  <span className="text-xs px-2 py-1 bg-white/5 rounded text-text-muted">
                    +{event.event_lineup.length - 4}
                  </span>
                )}
              </div>
            )}
            
            {/* CTA */}
            {upcoming && event.link_tickets && (
              <Button 
                as="span"
                variant="primary" 
                size="sm"
                icon={Ticket}
                className="inline-flex"
              >
                Billetterie
              </Button>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents()
        setEvents(data)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const upcomingEvents = events.filter(e => isUpcoming(e.event_date))
  const pastEvents = events.filter(e => !isUpcoming(e.event_date))

  // Grouper les events passés par année
  const pastEventsByYear = pastEvents.reduce((acc, event) => {
    const year = new Date(event.event_date).getFullYear()
    if (!acc[year]) acc[year] = []
    acc[year].push(event)
    return acc
  }, {})

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
        title="ÉVÉNEMENTS"
        subtitle="Soirées, festivals et rencontres psychédéliques à Lyon et au-delà."
      />

      {/* Events à venir */}
      {upcomingEvents.length > 0 && (
        <Section padding="sm">
          <Container>
            <SectionTitle align="left">
              🚀 À venir
            </SectionTitle>
            
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  index={index}
                  featured={index === 0}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Events passés */}
      {pastEvents.length > 0 && (
        <Section>
          <Container>
            <SectionTitle align="left" subtitle="Retour sur nos événements">
              📸 Passés
            </SectionTitle>
            
            {Object.entries(pastEventsByYear)
              .sort(([a], [b]) => b - a)
              .map(([year, yearEvents]) => (
                <div key={year} className="mb-12">
                  <h3 className="font-display text-2xl font-bold text-neon-purple mb-6">
                    {year}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yearEvents.map((event, index) => (
                      <EventCard key={event.id} event={event} index={index} />
                    ))}
                  </div>
                </div>
              ))}
          </Container>
        </Section>
      )}

      {events.length === 0 && (
        <Section>
          <Container className="text-center">
            <p className="text-text-secondary">
              Aucun événement pour le moment. Restez connectés !
            </p>
          </Container>
        </Section>
      )}
    </>
  )
}
