import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Container, Section } from '@/components/layout/Section'
import { Button, Badge } from '@/components/ui'
import { getArtistBySlug, getReleasesByArtist } from '@/lib/supabase'

export default function ArtistPage() {
  const { slug } = useParams()
  const [artist, setArtist] = useState(null)
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadArtist() {
      try {
        const artistData = await getArtistBySlug(slug)
        if (artistData) {
          setArtist(artistData)
          const releasesData = await getReleasesByArtist(artistData.id)
          setReleases(releasesData || [])
        } else {
          setError('Artiste non trouvé')
        }
      } catch (err) {
        console.error('Error loading artist:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadArtist()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !artist) {
    return (
      <Section>
        <Container>
          <div className="text-center py-20">
            <p className="text-text-secondary mb-4">{error || 'Artiste non trouvé'}</p>
            <Button as={Link} to="/roster" variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au roster
            </Button>
          </div>
        </Container>
      </Section>
    )
  }

  // Liens streaming
  const streamingLinks = [
    { key: 'link_soundcloud', label: 'SoundCloud', icon: '🔊' },
    { key: 'link_spotify', label: 'Spotify', icon: '🎵' },
    { key: 'link_bandcamp', label: 'Bandcamp', icon: '💿' },
    { key: 'link_beatport', label: 'Beatport', icon: '🎧' },
    { key: 'link_youtube', label: 'YouTube', icon: '▶️' },
  ].filter(link => artist[link.key])

  // Liens sociaux
  const socialLinks = [
    { key: 'link_instagram', label: 'Instagram', icon: '📷' },
    { key: 'link_facebook', label: 'Facebook', icon: '👤' },
  ].filter(link => artist[link.key])

  return (
    <>
      {/* Hero */}
      <Section padding="lg" className="relative">
        <Container>
          <Link 
            to="/roster" 
            className="inline-flex items-center gap-2 text-text-muted hover:text-neon-cyan mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au roster
          </Link>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="md:col-span-1"
            >
              <div 
                className="aspect-square bg-mvr-elevated overflow-hidden border-2 border-neon-cyan"
                style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}
              >
                {artist.photo_url ? (
                  <img 
                    src={artist.photo_url} 
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    🎧
                  </div>
                )}
              </div>
            </motion.div>

            {/* Infos */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                {artist.name}
              </h1>

              {/* Styles */}
              {artist.styles && artist.styles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {artist.styles.map((style) => (
                    <Badge key={style} variant="cyan">{style}</Badge>
                  ))}
                </div>
              )}

              {/* Location */}
              {artist.location && (
                <p className="flex items-center gap-2 text-text-secondary mb-6">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                  {artist.location}
                </p>
              )}

              {/* Bio */}
              {artist.bio_fr && (
                <p className="text-text-secondary leading-relaxed mb-8">
                  {artist.bio_fr}
                </p>
              )}

              {/* Liens streaming */}
              {streamingLinks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
                    Écouter
                  </h3>
                    <div className="flex flex-wrap gap-3">
                    {streamingLinks.map((link) => (
                      <a
                        key={link.key}
                        href={artist[link.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-mvr-surface border border-white/10 text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors"
                        style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)' }}
                      >
                        <span>{link.icon}</span>
                        <span className="text-sm">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Liens sociaux */}
              {socialLinks.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-3">
                    Réseaux
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.key}
                        href={artist[link.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-mvr-surface border border-white/10 text-text-secondary hover:text-neon-purple hover:border-neon-purple/30 transition-colors"
                        style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%)' }}
                      >
                        <span>{link.icon}</span>
                        <span className="text-sm">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Releases */}
      {releases.length > 0 && (
        <Section className="bg-mvr-darker/50">
          <Container>
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Releases
            </h2>

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
                    <div 
                      className="aspect-square mb-3 overflow-hidden bg-mvr-elevated"
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
                    </div>
                    <h4 className="font-semibold text-white truncate group-hover:text-neon-cyan transition-colors">
                      {release.title}
                    </h4>
                    <p className="text-text-muted text-sm">
                      {new Date(release.release_date).getFullYear()}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}