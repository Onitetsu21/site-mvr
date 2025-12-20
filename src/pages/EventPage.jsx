import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, Clock, Ticket, ExternalLink, Play } from 'lucide-react'
import { Container, Section } from '@/components/layout/Section'
import { Button, Badge, Loader, Card } from '@/components/ui'
import { getEventBySlug, supabase } from '@/lib/supabase'
import { formatDate, isUpcoming } from '@/lib/utils'

export default function EventPage() {
  const { slug } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventBySlug(slug)
        setEvent(data)
      } catch (error) {
        console.error('Error loading event:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  if (!event) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
        <Button as={Link} to="/events" variant="secondary">
          Retour aux événements
        </Button>
      </Container>
    )
  }

  const upcoming = isUpcoming(event.event_date)
  const eventTime = new Date(event.event_date).toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })

  return (
    <>
      {/* Back button */}
      <div className="pt-4 px-4">
        <Button as={Link} to="/events" variant="ghost" size="sm" icon={ArrowLeft}>
          Événements
        </Button>
      </div>

      {/* Hero avec image */}
      <Section padding="sm">
        <Container>
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Image de fond */}
            <div className="aspect-video md:aspect-[21/9] relative">
              <img
                src={event.image_url}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark via-mvr-dark/50 to-transparent" />
            </div>

            {/* Contenu superposé */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              {/* Badge */}
              <div className="mb-4">
                {upcoming ? (
                  <Badge variant="cyan" glow size="lg">
                    À venir
                  </Badge>
                ) : (
                  <Badge variant="purple" size="lg">
                    Événement passé
                  </Badge>
                )}
              </div>

              {/* Titre */}
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                {event.name}
              </h1>

              {/* Meta infos */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-white/90">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-neon-cyan" />
                  {formatDate(event.event_date, { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-neon-cyan" />
                  {eventTime}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-neon-cyan" />
                  {event.venue_name}
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Actions */}
      {upcoming && (
        <Section padding="sm">
          <Container>
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {event.link_tickets && (
                <Button 
                  as="a" 
                  href={event.link_tickets} 
                  target="_blank"
                  variant="primary"
                  size="lg"
                  icon={Ticket}
                >
                  Billetterie
                </Button>
              )}
              {event.link_facebook && (
                <Button 
                  as="a" 
                  href={event.link_facebook} 
                  target="_blank"
                  variant="secondary"
                  size="lg"
                  icon={ExternalLink}
                >
                  Événement Facebook
                </Button>
              )}
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Line-up */}
      {event.event_lineup?.length > 0 && (
        <Section padding="default">
          <Container>
            <motion.h2
              className="font-display text-2xl md:text-3xl font-bold text-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              🎧 Line-up
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {event.event_lineup
                .sort((a, b) => a.display_order - b.display_order)
                .map((item, index) => {
                  const isInternal = !!item.artist
                  const name = item.artist?.name || item.external_name
                  const photo = item.artist?.photo_url || item.external_photo_url
                  const link = isInternal 
                    ? `/roster/${item.artist.slug}` 
                    : item.external_link

                  const CardWrapper = isInternal ? Link : 'a'
                  const cardProps = isInternal 
                    ? { to: link }
                    : { href: link, target: '_blank', rel: 'noopener noreferrer' }

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CardWrapper {...cardProps} className="block group">
                        <Card hover padding="none" className="overflow-hidden">
                          {/* Photo */}
                          <div className="aspect-square relative overflow-hidden">
                            {photo ? (
                              <img
                                src={photo}
                                alt={name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-mvr-elevated flex items-center justify-center">
                                <span className="text-4xl">🎧</span>
                              </div>
                            )}
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark/80 to-transparent" />
                            
                            {/* Badge MVR */}
                            {isInternal && (
                              <Badge 
                                variant="cyan" 
                                size="sm" 
                                className="absolute top-2 right-2"
                              >
                                MVR
                              </Badge>
                            )}
                          </div>

                          {/* Nom */}
                          <div className="p-3 text-center">
                            <h4 className="font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                              {name}
                            </h4>
                          </div>
                        </Card>
                      </CardWrapper>
                    </motion.div>
                  )
                })}
            </div>
          </Container>
        </Section>
      )}

      {/* Description */}
      {event.description_fr && (
        <Section padding="sm">
          <Container size="sm">
            <motion.div
              className="bg-mvr-surface/50 rounded-xl p-6 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-lg font-bold mb-4">À propos</h3>
              <p className="text-text-secondary whitespace-pre-line">
                {event.description_fr}
              </p>
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Lieu */}
      {event.venue_address && (
        <Section padding="sm">
          <Container size="sm">
            <motion.div
              className="bg-mvr-surface/50 rounded-xl p-6 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-neon-cyan" />
                Lieu
              </h3>
              <p className="text-white font-semibold">{event.venue_name}</p>
              <p className="text-text-secondary">{event.venue_address}</p>
              
              <Button
                as="a"
                href={`https://maps.google.com/?q=${encodeURIComponent(event.venue_address)}`}
                target="_blank"
                variant="ghost"
                size="sm"
                className="mt-4"
                icon={ExternalLink}
              >
                Voir sur Google Maps
              </Button>
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Aftermovie */}
      {event.aftermovie_url && (
        <Section padding="default">
          <Container size="sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-display text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                <Play className="w-5 h-5 text-neon-cyan" />
                Aftermovie
              </h3>
              
              <div className="aspect-video rounded-xl overflow-hidden bg-mvr-surface">
                <iframe
                  src={event.aftermovie_url.replace('watch?v=', 'embed/')}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </Container>
        </Section>
      )}

      {/* Galerie photos */}
      {event.photos?.length > 0 && (
        <Section padding="default">
          <Container>
            <motion.h3
              className="font-display text-xl font-bold text-center mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              📸 Photos
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.photos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
