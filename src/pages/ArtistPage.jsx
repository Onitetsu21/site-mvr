import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Mail } from 'lucide-react'
import { Container, Section } from '@/components/layout/Section'
import { Button, Badge, Loader, SectionTitle, LinkButton } from '@/components/ui'
import { getMockArtistBySlug, getMockReleasesByArtist } from '@/lib/mockData'

export default function ArtistPage() {
  const { slug } = useParams()
  const [artist, setArtist] = useState(null)
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadArtist() {
      try {
        const artistData = await getMockArtistBySlug(slug)
        if (artistData) {
          setArtist(artistData)
          const releasesData = await getMockReleasesByArtist(artistData.id)
          setReleases(releasesData)
        }
      } catch (error) {
        console.error('Error loading artist:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArtist()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  if (!artist) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Artiste non trouvé</h1>
        <Button as={Link} to="/roster" variant="secondary">
          Retour au roster
        </Button>
      </Container>
    )
  }

  // Préparer les liens d'écoute
  const streamingLinks = {
    spotify: artist.link_spotify,
    soundcloud: artist.link_soundcloud,
    bandcamp: artist.link_bandcamp,
    apple_music: artist.link_apple_music,
    beatport: artist.link_beatport,
    youtube: artist.link_youtube,
  }

  const socialLinks = {
    instagram: artist.link_instagram,
    facebook: artist.link_facebook,
  }

  return (
    <>
      {/* Back button */}
      <div className="pt-4 px-4">
        <Button as={Link} to="/roster" variant="ghost" size="sm" icon={ArrowLeft}>
          Roster
        </Button>
      </div>

      {/* Header avec photo */}
      <Section padding="sm">
        <Container size="sm">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Photo hexagonale */}
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-48 h-48 md:w-56 md:h-56 relative mx-auto">
                <div 
                  className="absolute inset-0 border-2 border-neon-cyan animate-glow-pulse"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                />
                <img
                  src={artist.photo_url}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Nom */}
            <motion.h1
              className="font-display text-4xl md:text-5xl font-bold text-gradient-cyan mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {artist.name}
            </motion.h1>

            {/* Styles */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {artist.styles?.map((style) => (
                <Badge key={style} variant="purple">
                  {style}
                </Badge>
              ))}
            </motion.div>

            {/* Location */}
            {artist.location && (
              <motion.p
                className="flex items-center justify-center gap-2 text-text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <MapPin className="w-4 h-4" />
                {artist.location}
              </motion.p>
            )}
          </motion.div>
        </Container>
      </Section>

      {/* Bio */}
      <Section padding="sm">
        <Container size="sm">
          <motion.div
            className="bg-mvr-surface/50 rounded-xl p-6 border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-text-secondary leading-relaxed whitespace-pre-line">
              {artist.bio_fr}
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Liens d'écoute */}
      <Section padding="sm">
        <Container size="sm">
          <motion.h2
            className="font-display text-xl font-bold text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            🎧 Écouter
          </motion.h2>

          <div className="flex flex-col gap-3">
            {Object.entries(streamingLinks).map(([platform, url], index) => (
              url && (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <LinkButton platform={platform} href={url} />
                </motion.div>
              )
            ))}
          </div>
        </Container>
      </Section>

      {/* Releases chez MVR */}
      {releases.length > 0 && (
        <Section padding="sm">
          <Container size="sm">
            <motion.h2
              className="font-display text-xl font-bold text-center mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              📀 Releases chez MVR
            </motion.h2>

            <div className="grid grid-cols-2 gap-4">
              {releases.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/releases/${release.slug}`}>
                    <div className="group">
                      <div className="aspect-square rounded-lg overflow-hidden mb-2">
                        <img
                          src={release.cover_url}
                          alt={release.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="font-semibold text-sm text-white group-hover:text-neon-cyan transition-colors truncate">
                        {release.title}
                      </h4>
                      <p className="text-xs text-text-muted">
                        {new Date(release.release_date).getFullYear()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Presskit & Réseaux */}
      <Section padding="sm">
        <Container size="sm">
          {/* Presskit */}
          {artist.link_presskit && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <LinkButton 
                platform="presskit" 
                href={artist.link_presskit}
                label="Télécharger le Presskit"
              />
            </motion.div>
          )}

          {/* Réseaux sociaux */}
          {Object.values(socialLinks).some(Boolean) && (
            <>
              <motion.h2
                className="font-display text-xl font-bold text-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                🌐 Réseaux
              </motion.h2>

              <div className="flex flex-col gap-3">
                {Object.entries(socialLinks).map(([platform, url], index) => (
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
            </>
          )}
        </Container>
      </Section>

      {/* Booking CTA */}
      <Section padding="default">
        <Container size="sm">
          <motion.div
            className="text-center bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 rounded-xl p-8 border border-neon-cyan/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Booker {artist.name} ?
            </h3>
            <p className="text-text-secondary mb-4">
              Contacte-nous pour toute demande de booking
            </p>
            <Button 
              as={Link} 
              to="/contact?subject=booking" 
              variant="primary"
              icon={Mail}
            >
              Nous contacter
            </Button>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
