import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Palette } from 'lucide-react'
import { Container, Section } from '@/components/layout/Section'
import { Button, Badge, Loader, LinkButton } from '@/components/ui'
import { getMockReleaseBySlug } from '@/lib/mockData'
import { formatDate, formatDuration } from '@/lib/utils'
import { getReleaseBySlug, supabase } from '@/lib/supabase'

export default function ReleasePage() {
  const { slug } = useParams()
  const [release, setRelease] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRelease() {
      try {
        const data = await getReleaseBySlug(slug)
        setRelease(data)
      } catch (error) {
        console.error('Error loading release:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRelease()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  if (!release) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Release non trouvée</h1>
        <Button as={Link} to="/releases" variant="secondary">
          Retour aux releases
        </Button>
      </Container>
    )
  }

  const artistNames = release.release_artists?.map(ra => ra.artist.name).join(', ') || 'Various Artists'
  const totalDuration = release.tracklist?.reduce((acc, track) => acc + (track.duration || 0), 0) || 0

  // Liens de streaming
  const streamingLinks = {
    bandcamp: release.link_bandcamp,
    spotify: release.link_spotify,
    beatport: release.link_beatport,
    soundcloud: release.link_soundcloud,
  }

  return (
    <>
      {/* Back button */}
      <div className="pt-4 px-4">
        <Button as={Link} to="/releases" variant="ghost" size="sm" icon={ArrowLeft}>
          Releases
        </Button>
      </div>

      {/* Header avec cover */}
      <Section padding="sm">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Cover */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-neon-cyan/20">
                <img
                  src={release.cover_url}
                  alt={release.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-neon-cyan/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="purple" className="uppercase">
                  {release.release_type}
                </Badge>
                <Badge variant="cyan">
                  {release.catalog_number}
                </Badge>
              </div>

              {/* Titre */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                {release.title}
              </h1>

              {/* Artistes */}
              <div className="flex flex-wrap gap-2 mb-4">
                {release.release_artists?.map(({ artist }) => (
                  <Link
                    key={artist.id}
                    to={`/roster/${artist.slug}`}
                    className="text-neon-cyan hover:text-neon-purple transition-colors font-semibold"
                  >
                    {artist.name}
                  </Link>
                ))}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-text-secondary text-sm mb-6">
                <span className="flex items-center gap-1">
                  📅 {formatDate(release.release_date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDuration(totalDuration)}
                </span>
                <span className="flex items-center gap-1">
                  🎵 {release.tracklist?.length || 0} tracks
                </span>
              </div>

              {/* Description */}
              {release.description_fr && (
                <p className="text-text-secondary mb-6">
                  {release.description_fr}
                </p>
              )}

              {/* Crédits */}
              <div className="space-y-2 mb-6 text-sm">
                {release.credits_mastering && (
                  <p className="flex items-center gap-2 text-text-muted">
                    <User className="w-4 h-4" />
                    <span>Mastering: {release.credits_mastering}</span>
                  </p>
                )}
                {release.credits_artwork && (
                  <p className="flex items-center gap-2 text-text-muted">
                    <Palette className="w-4 h-4" />
                    <span>Artwork: {release.credits_artwork}</span>
                  </p>
                )}
              </div>

              {/* Buy/Stream buttons */}
              <div className="flex flex-wrap gap-3">
                {release.link_bandcamp && (
                  <Button 
                    as="a" 
                    href={release.link_bandcamp} 
                    target="_blank"
                    variant="primary"
                  >
                    Acheter sur Bandcamp
                  </Button>
                )}
                {release.link_spotify && (
                  <Button 
                    as="a" 
                    href={release.link_spotify} 
                    target="_blank"
                    variant="secondary"
                  >
                    Écouter sur Spotify
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Player embed */}
      {release.embed_code && (
        <Section padding="sm">
          <Container size="sm">
            <motion.div
              className="rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              dangerouslySetInnerHTML={{ __html: release.embed_code }}
            />
          </Container>
        </Section>
      )}

      {/* Tracklist */}
      {release.tracklist && release.tracklist.length > 0 && (
        <Section padding="sm">
          <Container size="sm">
            <h2 className="font-display text-xl font-bold mb-6">Tracklist</h2>
            
            <div className="bg-mvr-surface/50 rounded-xl border border-white/5 overflow-hidden">
              {release.tracklist.map((track, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-text-muted font-mono text-sm w-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white font-medium">
                      {track.title}
                    </span>
                  </div>
                  <span className="text-text-muted font-mono text-sm">
                    {formatDuration(track.duration)}
                  </span>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Liens de streaming */}
      <Section padding="sm">
        <Container size="sm">
          <h2 className="font-display text-xl font-bold mb-6 text-center">
            Écouter / Acheter
          </h2>
          
          <div className="flex flex-col gap-3">
            {Object.entries(streamingLinks).map(([platform, url], index) => (
              url && (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LinkButton platform={platform} href={url} />
                </motion.div>
              )
            ))}
          </div>
        </Container>
      </Section>

      {/* Autres releases de l'artiste */}
      {release.release_artists?.length === 1 && (
        <Section padding="default">
          <Container size="sm">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-text-secondary mb-4">
                Découvrir plus de releases de
              </p>
              <Button 
                as={Link} 
                to={`/roster/${release.release_artists[0].artist.slug}`}
                variant="secondary"
              >
                {release.release_artists[0].artist.name}
              </Button>
            </motion.div>
          </Container>
        </Section>
      )}
    </>
  )
}
