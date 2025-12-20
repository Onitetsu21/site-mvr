import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Download, 
  Mail,
  ExternalLink,
  Music2,
  Disc3
} from 'lucide-react'
import { Button, Badge, PageLoader, SectionTitle } from '@/components/ui'
import { useArtist } from '@/hooks/useArtists'
import { platformColors } from '@/lib/utils'
import { ReleaseCard } from '@/components/sections/ReleaseCard'
import { PlatformButton } from '@/components/sections/PlatformButton'

export default function ArtistDetail() {
  const { slug } = useParams()
  const { artist, releases, loading, error } = useArtist(slug)

  if (loading) return <PageLoader />

  if (error || !artist) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-400 mb-4">Artiste non trouvé</p>
        <Button asChild variant="ghost">
          <Link to="/roster">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au roster
          </Link>
        </Button>
      </div>
    )
  }

  // Collecter tous les liens de streaming disponibles
  const streamingLinks = [
    { key: 'spotify', label: 'Spotify', url: artist.link_spotify },
    { key: 'soundcloud', label: 'SoundCloud', url: artist.link_soundcloud },
    { key: 'bandcamp', label: 'Bandcamp', url: artist.link_bandcamp },
    { key: 'apple_music', label: 'Apple Music', url: artist.link_apple_music },
    { key: 'beatport', label: 'Beatport', url: artist.link_beatport },
    { key: 'youtube', label: 'YouTube', url: artist.link_youtube },
  ].filter(link => link.url)

  // Liens réseaux sociaux
  const socialLinks = [
    { key: 'instagram', label: 'Instagram', url: artist.link_instagram },
    { key: 'facebook', label: 'Facebook', url: artist.link_facebook },
  ].filter(link => link.url)

  return (
    <div className="min-h-screen">
      {/* Bouton retour */}
      <div className="container mx-auto px-4 pt-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/roster">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Roster
          </Link>
        </Button>
      </div>

      {/* Header avec photo */}
      <header className="container mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden ring-2 ring-neon-purple/50">
              {artist.photo_url ? (
                <img
                  src={artist.photo_url}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-mvr-surface flex items-center justify-center">
                  <Music2 className="w-16 h-16 text-gray-600" />
                </div>
              )}
            </div>
            {/* Glow */}
            <div className="absolute -inset-4 bg-neon-purple/20 rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-left flex-1"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {artist.name}
            </h1>

            {/* Styles */}
            {artist.styles && artist.styles.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {artist.styles.map((style) => (
                  <Badge key={style}>{style}</Badge>
                ))}
              </div>
            )}

            {/* Localisation */}
            {artist.location && (
              <p className="text-gray-400 mb-6">{artist.location}</p>
            )}

            {/* Bio */}
            {artist.bio_fr && (
              <p className="text-gray-300 leading-relaxed max-w-2xl">
                {artist.bio_fr}
              </p>
            )}
          </motion.div>
        </div>
      </header>

      {/* Liens d'écoute - Style Linktree */}
      {streamingLinks.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <SectionTitle>
            <Disc3 className="inline w-6 h-6 mr-2 text-neon-cyan" />
            Écouter
          </SectionTitle>

          <div className="max-w-md mx-auto md:mx-0 space-y-3">
            {streamingLinks.map((link, i) => (
              <PlatformButton
                key={link.key}
                platform={link.key}
                label={link.label}
                url={link.url}
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      {/* Releases chez MVR */}
      {releases.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <SectionTitle subtitle={`${releases.length} release${releases.length > 1 ? 's' : ''} sur le label`}>
            Releases chez MVR
          </SectionTitle>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {releases.map((release, i) => (
              <ReleaseCard key={release.id} release={release} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Presskit & Réseaux */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Presskit */}
          {artist.link_presskit && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-glass p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Presskit</h3>
              <p className="text-gray-400 text-sm mb-4">
                Photos HD, biographie, rider technique...
              </p>
              <Button asChild className="w-full">
                <a href={artist.link_presskit} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le presskit
                </a>
              </Button>
            </motion.div>
          )}

          {/* Réseaux sociaux */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-glass p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Suivre {artist.name}</h3>
              <div className="space-y-3">
                {socialLinks.map((link, i) => (
                  <PlatformButton
                    key={link.key}
                    platform={link.key}
                    label={link.label}
                    url={link.url}
                    index={i}
                    variant="small"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Booking */}
      <section className="container mx-auto px-4 py-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-glass p-8 text-center max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Booking</h3>
          <p className="text-gray-400 mb-6">
            Vous souhaitez booker {artist.name} pour votre événement ?
          </p>
          <Button asChild variant="primary">
            <Link to="/contact">
              <Mail className="w-4 h-4 mr-2" />
              Nous contacter
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  )
}
