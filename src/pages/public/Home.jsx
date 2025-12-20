import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Disc3, Users, Sparkles } from 'lucide-react'
import { Button, Badge, SectionTitle } from '@/components/ui'
import { useLatestReleases } from '@/hooks/useReleases'
import { useFeaturedArtists } from '@/hooks/useArtists'
import { useNextEvent } from '@/hooks/useEvents'
import { formatDate } from '@/lib/utils'
import { HeroSection } from '@/components/sections/HeroSection'
import { ReleaseCard } from '@/components/sections/ReleaseCard'
import { ArtistCard } from '@/components/sections/ArtistCard'
import { EventCard } from '@/components/sections/EventCard'
import { ValuesSection } from '@/components/sections/ValuesSection'

export default function Home() {
  const { releases, loading: releasesLoading } = useLatestReleases(4)
  const { artists, loading: artistsLoading } = useFeaturedArtists(4)
  const { event: nextEvent, loading: eventLoading } = useNextEvent()

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection />

      {/* Prochain événement */}
      {nextEvent && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 border border-neon-cyan/30 p-8 md:p-12"
          >
            {/* Badge */}
            <Badge variant="cyan" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Prochain événement
            </Badge>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {nextEvent.name}
                </h2>
                <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-neon-cyan" />
                    {formatDate(nextEvent.event_date)}
                  </span>
                  <span>{nextEvent.venue_name}</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {nextEvent.link_tickets && (
                    <Button asChild variant="primary">
                      <a href={nextEvent.link_tickets} target="_blank" rel="noopener noreferrer">
                        Billetterie
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                  <Button asChild variant="outline">
                    <Link to={`/events/${nextEvent.slug}`}>
                      Plus d'infos
                    </Link>
                  </Button>
                </div>
              </div>

              {nextEvent.image_url && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative aspect-video rounded-2xl overflow-hidden"
                >
                  <img
                    src={nextEvent.image_url}
                    alt={nextEvent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mvr-dark/80 to-transparent" />
                </motion.div>
              )}
            </div>

            {/* Effet de glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-cyan/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl" />
          </motion.div>
        </section>
      )}

      {/* Dernières releases */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle subtitle="Nos dernières sorties">
          <Disc3 className="inline w-8 h-8 mr-3 text-neon-cyan" />
          Releases
        </SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {releases.map((release, i) => (
            <ReleaseCard key={release.id} release={release} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button asChild>
            <Link to="/releases">
              Voir toutes les releases
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Artistes à la une */}
      <section className="container mx-auto px-4 py-16">
        <SectionTitle subtitle="Les artistes du label">
          <Users className="inline w-8 h-8 mr-3 text-neon-purple" />
          Roster
        </SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button asChild>
            <Link to="/roster">
              Découvrir le roster
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Valeurs */}
      <ValuesSection />
    </div>
  )
}
