import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Ticket, Image } from 'lucide-react'
import { Badge } from '@/components/ui'
import { formatDate } from '@/lib/utils'

export function EventCard({ event, index = 0, variant = 'default' }) {
  const isUpcoming = event.is_upcoming
  const hasPhotos = event.photos && event.photos.length > 0
  const hasAftermovie = !!event.aftermovie_url

  if (variant === 'compact') {
    return <EventCardCompact event={event} index={index} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/events/${event.slug}`} className="group block">
        <div className="card-glass overflow-hidden">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            {event.image_url ? (
              <img
                src={event.image_url}
                alt={event.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-mvr-surface flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-600" />
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark via-mvr-dark/50 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {isUpcoming ? (
                <Badge variant="cyan">À venir</Badge>
              ) : (
                <Badge variant="outline">Passé</Badge>
              )}
              {hasPhotos && <Badge variant="magenta"><Image className="w-3 h-3" /></Badge>}
            </div>

            {/* Date overlay */}
            <div className="absolute bottom-4 left-4">
              <p className="text-2xl font-bold text-white">
                {formatDate(event.event_date, { day: 'numeric', month: 'short' })}
              </p>
              <p className="text-sm text-gray-300">
                {formatDate(event.event_date, { year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors mb-2">
              {event.name}
            </h3>

            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.venue_name}
              </span>
            </div>

            {/* CTA pour events à venir */}
            {isUpcoming && event.link_tickets && (
              <div className="mt-4 pt-4 border-t border-mvr-border">
                <span className="inline-flex items-center gap-2 text-neon-cyan text-sm font-medium group-hover:gap-3 transition-all">
                  <Ticket className="w-4 h-4" />
                  Billetterie disponible
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function EventCardCompact({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/events/${event.slug}`} className="group flex gap-4 p-4 rounded-xl hover:bg-mvr-surface/50 transition-colors">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          {event.image_url ? (
            <img
              src={event.image_url}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-mvr-surface flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-neon-cyan mb-1">
            {formatDate(event.event_date)}
          </p>
          <h4 className="font-semibold text-white group-hover:text-neon-cyan transition-colors truncate">
            {event.name}
          </h4>
          <p className="text-sm text-gray-500 truncate">{event.venue_name}</p>
        </div>
      </Link>
    </motion.div>
  )
}
