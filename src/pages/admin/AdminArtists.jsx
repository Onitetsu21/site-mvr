import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, ExternalLink, AlertCircle } from 'lucide-react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Card, Button, Badge, Loader } from '@/components/ui'
import { Input, Textarea } from '@/components/ui/Form'
import { getArtists, createArtist, updateArtist, deleteArtist, supabase } from '@/lib/supabase'
import { slugify } from '@/lib/utils'

function ArtistForm({ artist, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState({
    name: artist?.name || '',
    slug: artist?.slug || '',
    photo_url: artist?.photo_url || '',
    styles: artist?.styles?.join(', ') || '',
    location: artist?.location || '',
    bio_fr: artist?.bio_fr || '',
    link_spotify: artist?.link_spotify || '',
    link_soundcloud: artist?.link_soundcloud || '',
    link_bandcamp: artist?.link_bandcamp || '',
    link_beatport: artist?.link_beatport || '',
    link_youtube: artist?.link_youtube || '',
    link_instagram: artist?.link_instagram || '',
    link_facebook: artist?.link_facebook || '',
    link_presskit: artist?.link_presskit || '',
    is_featured: artist?.is_featured || false,
    display_order: artist?.display_order || 0,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  useEffect(() => {
    if (!artist && formData.name) {
      setFormData(prev => ({
        ...prev,
        slug: slugify(formData.name),
      }))
    }
  }, [formData.name, artist])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      ...formData,
      styles: formData.styles.split(',').map(s => s.trim()).filter(Boolean),
    }
    onSave(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-mvr-surface rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-mvr-surface border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="font-display font-bold text-white text-lg">
            {artist ? 'Modifier l\'artiste' : 'Nouvel artiste'}
          </h2>
          <button onClick={onCancel} className="p-2 text-text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Nom d'artiste" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} required />
          </div>

          <Input label="Photo URL" name="photo_url" type="url" value={formData.photo_url} onChange={handleChange} />

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Styles (séparés par virgule)" name="styles" value={formData.styles} onChange={handleChange} placeholder="Psytrance, Full-On" />
            <Input label="Localisation" name="location" value={formData.location} onChange={handleChange} placeholder="Lyon, France" />
          </div>

          <Textarea label="Bio (FR)" name="bio_fr" value={formData.bio_fr} onChange={handleChange} rows={4} />

          <div>
            <h3 className="font-medium text-white mb-3">Liens d'écoute</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Spotify" name="link_spotify" type="url" value={formData.link_spotify} onChange={handleChange} />
              <Input label="SoundCloud" name="link_soundcloud" type="url" value={formData.link_soundcloud} onChange={handleChange} />
              <Input label="Bandcamp" name="link_bandcamp" type="url" value={formData.link_bandcamp} onChange={handleChange} />
              <Input label="Beatport" name="link_beatport" type="url" value={formData.link_beatport} onChange={handleChange} />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Réseaux sociaux</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Instagram" name="link_instagram" type="url" value={formData.link_instagram} onChange={handleChange} />
              <Input label="Facebook" name="link_facebook" type="url" value={formData.link_facebook} onChange={handleChange} />
            </div>
          </div>

          <Input label="Lien Presskit" name="link_presskit" type="url" value={formData.link_presskit} onChange={handleChange} />

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-5 h-5 rounded border-white/20 bg-mvr-elevated text-neon-cyan" />
              <span className="text-text-secondary">Mis en avant</span>
            </label>
            <div className="flex items-center gap-2">
              <label className="text-text-secondary">Ordre:</label>
              <input type="number" name="display_order" value={formData.display_order} onChange={handleChange} className="w-20 bg-mvr-elevated border border-white/10 rounded px-3 py-1 text-white" />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <Button type="submit" variant="primary" icon={Save} loading={saving} disabled={saving}>
              {artist ? 'Enregistrer' : 'Créer'}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel}>Annuler</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AdminArtists() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [editingArtist, setEditingArtist] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const loadArtists = async () => {
    try {
      setError(null)
      const data = await getArtists()
      setArtists(data || [])
    } catch (err) {
      console.error('Error loading artists:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (supabase) {
      loadArtists()
    } else {
      setError('Supabase non configuré')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setShowForm(true)
      setEditingArtist(null)
      searchParams.delete('new')
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  const handleSave = async (data) => {
    setSaving(true)
    try {
      if (editingArtist) {
        await updateArtist(editingArtist.id, data)
      } else {
        await createArtist(data)
      }
      setShowForm(false)
      setEditingArtist(null)
      await loadArtists()
    } catch (err) {
      console.error('Error saving artist:', err)
      alert('Erreur: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (artist) => {
    if (!confirm(`Supprimer ${artist.name} ?`)) return
    
    try {
      await deleteArtist(artist.id)
      await loadArtists()
    } catch (err) {
      console.error('Error deleting artist:', err)
      alert('Erreur: ' + err.message)
    }
  }

  if (error === 'Supabase non configuré') {
    return (
      <AdminLayout title="Artistes">
        <Card accent className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
          <p className="text-white mb-2">Base de données non connectée</p>
          <p className="text-text-secondary text-sm">Configurez Supabase dans .env</p>
        </Card>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Artistes">
      <div className="flex justify-between items-center mb-6">
        <p className="text-text-secondary">
          {artists.length} artiste{artists.length > 1 ? 's' : ''} au roster
        </p>
        <Button variant="primary" icon={Plus} onClick={() => { setEditingArtist(null); setShowForm(true) }}>
          Nouvel artiste
        </Button>
      </div>

      {error && (
        <Card className="mb-6 border-red-500/30 bg-red-500/10">
          <p className="text-red-400">{error}</p>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader /></div>
      ) : (
        <div className="grid gap-4">
          {artists.map((artist) => (
            <Card key={artist.id} hover={false} className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0 bg-mvr-elevated overflow-hidden" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                {artist.photo_url ? (
                  <img src={artist.photo_url} alt={artist.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🎧</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white truncate">{artist.name}</h3>
                  {artist.is_featured && <Badge variant="cyan" size="sm">Featured</Badge>}
                </div>
                <p className="text-sm text-text-muted truncate">
                  {artist.styles?.join(', ')} • {artist.location || 'N/A'}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a href={`/roster/${artist.slug}`} target="_blank" className="p-2 text-text-muted hover:text-neon-cyan">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button onClick={() => { setEditingArtist(artist); setShowForm(true) }} className="p-2 text-text-muted hover:text-white">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(artist)} className="p-2 text-text-muted hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <ArtistForm
            artist={editingArtist}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingArtist(null) }}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
