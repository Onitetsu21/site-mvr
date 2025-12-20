import { motion } from 'framer-motion'
import { PageHeader, PageLoader } from '@/components/ui'
import { useArtists } from '@/hooks/useArtists'
import { ArtistCard } from '@/components/sections/ArtistCard'

export default function Roster() {
  const { artists, loading, error } = useArtists()

  if (loading) return <PageLoader />

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-red-400">Erreur lors du chargement des artistes</p>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="ROSTER"
        subtitle={`${artists.length} artistes signés sur le label`}
      />

      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>

        {artists.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400">Aucun artiste pour le moment</p>
          </motion.div>
        )}
      </section>
    </div>
  )
}
