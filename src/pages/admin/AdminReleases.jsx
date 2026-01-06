import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, ExternalLink, AlertCircle } from 'lucide-react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Card, Button, Badge, Loader } from '@/components/ui'
import { Input, Textarea, Select } from '@/components/ui/Form'
import { getReleases, getArtists, createRelease, updateRelease, deleteRelease, supabase } from '@/lib/supabase'
import { slugify, formatDate } from '@/lib/utils'

const releaseTypes = [
  { value: 'single', label: 'Single' },
  { value: 'ep', label: 'EP' },
  { value: 'album', label: 'Album' },
  { value: 'va', label: 'VA (Compilation)' },
]

function ReleaseForm({ release, artists, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState({
    title: release?.title || '',
    slug: release?.slug || '',
    release_type: release?.release_type || 'single',
    release_date: release?.release_date || new Date().toISOString().split('T')[0],
    catalog_number: release?.catalog_number || '',
    cover_url: release?.cover_url || '',
    description_fr: release?.description_fr || '',
    credits_mastering: release?.credits_mastering || '',
    credits_artwork: release?.credits_artwork || '',
    link_bandcamp: release?.link_bandcamp || '',
    link_spotify: release?.link_spotify || '',
    link_beatport: release?.link_beatport || '',
    link_soundcloud: release?.link_soundcloud || '',
    embed_code: release?.embed_code || '',
    tracklist: release?.tracklist || [{ title: '', duration: '' }],
    artist_ids: release?.release_artists?.map(ra => ra.artist.id) || [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!release && formData.title) {
      setFormData(prev => ({ ...prev, slug: slugify(formData.title) }))
    }
  }, [formData.title, release])

  const handleTrackChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      tracklist: prev.tracklist.map((track, i) => 
        i === index ? { ...track, [field]: value } : track
      )
    }))
  }

  const addTrack = () => {
    setFormData(prev => ({
      ...prev,
      tracklist: [...prev.tracklist, { title: '', duration: '' }]
    }))
  }

  const removeTrack = (index) => {
    setFormData(prev => ({
      ...prev,
      tracklist: prev.tracklist.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { artist_ids, ...releaseData } = formData
    onSave(releaseData, artist_ids)
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
        className="bg-mvr-surface rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-mvr-surface border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-bold text-white text-lg">
            {release ? 'Modifier la release' : 'Nouvelle release'}
          </h2>
          <button onClick={onCancel} className="p-2 text-text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Titre" name="title" value={formData.title} onChange={handleChange} required />
            <Input label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} required />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Select label="Type" name="release_type" value={formData.release_type} onChange={handleChange} options={releaseTypes} required />
            <Input label="Date de sortie" name="release_date" type="date" value={formData.release_date} onChange={handleChange} required />
            <Input label="N° Catalogue" name="catalog_number" value={formData.catalog_number} onChange={handleChange} placeholder="MVR047" />
          </div>

          <Input label="Cover URL" name="cover_url" type="text" value={formData.cover_url} onChange={handleChange} />

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Artiste(s)</label>
            <div className="flex flex-wrap gap-2">
              {artists.map(artist => (
                <label
                  key={artist.id}
                  className={`px-3 py-2 cursor-pointer transition-colors border ${
                    formData.artist_ids.includes(artist.id)
                      ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan'
                      : 'bg-mvr-elevated border-white/10 text-text-secondary hover:text-white'
                  }`}
                  style={{ clipPath: 'polygon(6px 0%, calc(100% - 6px) 0%, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0% 50%)' }}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.artist_ids.includes(artist.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({ ...prev, artist_ids: [...prev.artist_ids, artist.id] }))
                      } else {
                        setFormData(prev => ({ ...prev, artist_ids: prev.artist_ids.filter(id => id !== artist.id) }))
                      }
                    }}
                  />
                  {artist.name}
                </label>
              ))}
            </div>
          </div>

          <Textarea label="Description (FR)" name="description_fr" value={formData.description_fr} onChange={handleChange} rows={3} />

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-text-secondary">Tracklist</label>
              <Button type="button" variant="ghost" size="sm" onClick={addTrack} icon={Plus}>Ajouter</Button>
            </div>
            <div className="space-y-2">
              {formData.tracklist.map((track, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="text-text-muted w-6 text-sm">{index + 1}.</span>
                  <input
                    type="text"
                    placeholder="Titre du track"
                    value={track.title}
                    onChange={(e) => handleTrackChange(index, 'title', e.target.value)}
                    className="flex-1 bg-mvr-elevated border border-white/10 px-3 py-2 text-white text-sm"
                    style={{ clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)' }}
                  />
                  <input
                    type="number"
                    placeholder="Durée (sec)"
                    value={track.duration}
                    onChange={(e) => handleTrackChange(index, 'duration', parseInt(e.target.value) || 0)}
                    className="w-24 bg-mvr-elevated border border-white/10 px-3 py-2 text-white text-sm"
                  />
                  {formData.tracklist.length > 1 && (
                    <button type="button" onClick={() => removeTrack(index)} className="p-2 text-text-muted hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Mastering" name="credits_mastering" value={formData.credits_mastering} onChange={handleChange} />
            <Input label="Artwork" name="credits_artwork" value={formData.credits_artwork} onChange={handleChange} />
          </div>

          <div>
            <h3 className="font-medium text-white mb-3">Liens</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Bandcamp" name="link_bandcamp" type="url" value={formData.link_bandcamp} onChange={handleChange} />
              <Input label="Spotify" name="link_spotify" type="url" value={formData.link_spotify} onChange={handleChange} />
              <Input label="Beatport" name="link_beatport" type="url" value={formData.link_beatport} onChange={handleChange} />
              <Input label="SoundCloud" name="link_soundcloud" type="url" value={formData.link_soundcloud} onChange={handleChange} />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <Button type="submit" variant="primary" icon={Save} loading={saving} disabled={saving}>
              {release ? 'Enregistrer' : 'Créer'}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel}>Annuler</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function AdminReleases() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [releases, setReleases] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [editingRelease, setEditingRelease] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const loadData = async () => {
    try {
      setError(null)
      const [releasesData, artistsData] = await Promise.all([
        getReleases(),
        getArtists(),
      ])
      setReleases(releasesData || [])
      setArtists(artistsData || [])
    } catch (err) {
      console.error('Error loading data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (supabase) {
      loadData()
    } else {
      setError('Supabase non configuré')
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setShowForm(true)
      setEditingRelease(null)
      searchParams.delete('new')
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  const handleSave = async (releaseData, artistIds) => {
    setSaving(true)
    try {
      if (editingRelease) {
        await updateRelease(editingRelease.id, releaseData, artistIds)
      } else {
        await createRelease(releaseData, artistIds)
      }
      setShowForm(false)
      setEditingRelease(null)
      await loadData()
    } catch (err) {
      console.error('Error saving release:', err)
      alert('Erreur: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (release) => {
    if (!confirm(`Supprimer "${release.title}" ?`)) return
    
    try {
      await deleteRelease(release.id)
      await loadData()
    } catch (err) {
      console.error('Error deleting release:', err)
      alert('Erreur: ' + err.message)
    }
  }

  if (error === 'Supabase non configuré') {
    return (
      <AdminLayout title="Releases">
        <Card accent className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
          <p className="text-white mb-2">Base de données non connectée</p>
          <p className="text-text-secondary text-sm">Configurez Supabase dans .env</p>
        </Card>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Releases">
      <div className="flex justify-between items-center mb-6">
        <p className="text-text-secondary">
          {releases.length} release{releases.length > 1 ? 's' : ''} au catalogue
        </p>
        <Button variant="primary" icon={Plus} onClick={() => { setEditingRelease(null); setShowForm(true) }}>
          Nouvelle release
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader /></div>
      ) : (
        <div className="grid gap-4">
          {releases.map((release) => (
            <Card key={release.id} hover={false} className="flex items-center gap-4">
              <div 
                className="w-16 h-16 flex-shrink-0 bg-mvr-elevated overflow-hidden"
                style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)' }}
              >
                {release.cover_url ? (
                  <img src={release.cover_url} alt={release.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">📀</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white truncate">{release.title}</h3>
                  <Badge variant="purple" size="sm">{release.release_type.toUpperCase()}</Badge>
                  {release.catalog_number && <Badge variant="cyan" size="sm">{release.catalog_number}</Badge>}
                </div>
                <p className="text-sm text-text-muted truncate">
                  {release.release_artists?.map(ra => ra.artist.name).join(', ') || 'V.A'} • {formatDate(release.release_date, { month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <a href={`/releases/${release.slug}`} target="_blank" className="p-2 text-text-muted hover:text-neon-cyan">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button onClick={() => { setEditingRelease(release); setShowForm(true) }} className="p-2 text-text-muted hover:text-white">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(release)} className="p-2 text-text-muted hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <ReleaseForm
            release={editingRelease}
            artists={artists}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingRelease(null) }}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
