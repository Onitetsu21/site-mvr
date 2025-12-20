import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, X, Save, ExternalLink, Calendar, AlertCircle } from 'lucide-react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Card, Button, Badge, Loader } from '@/components/ui'
import { Input, Textarea } from '@/components/ui/Form'
import { getEvents, getArtists, createEvent, updateEvent, deleteEvent, supabase } from '@/lib/supabase'
import { slugify, formatDate, isUpcoming } from '@/lib/utils'

function EventForm({ event, artists, onSave, onCancel, saving }) {
  const [formData, setFormData] = useState({
    name: event?.name || '',
    slug: event?.slug || '',
    event_date: event?.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : '',
    venue_name: event?.venue_name || '',
    venue_address: event?.venue_address || '',
    image_url: event?.image_url || '',
    description_fr: event?.description_fr || '',
    link_tickets: event?.link_tickets || '',
    link_facebook: event?.link_facebook || '',
    aftermovie_url: event?.aftermovie_url || '',
    lineup: event?.event_lineup?.map(item => ({
      artist_id: item.artist?.id || null,
      external_name: item.external_name || '',
      external_link: item.external_link || '',
    })) || [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!event && formData.name) {
      setFormData(prev => ({ ...prev, slug: slugify(formData.name) }))
    }
  }, [formData.name, event])

  const handleLineupChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      lineup: prev.lineup.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addLineupItem = () => {
    setFormData(prev => ({
      ...prev,
      lineup: [...prev.lineup, { artist_id: null, external_name: '', external_link: '' }]
    }))
  }

  const removeLineupItem = (index) => {
    setFormData(prev => ({
      ...prev,
      lineup: prev.lineup.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { lineup, ...eventData } = formData
    onSave(eventData, lineup)
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
            {event ? 'Modifier l\'événement' : 'Nouvel événement'}
          </h2>
          <button onClick={onCancel} className="p-2 text-text-muted hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Nom de l'événement" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Slug (URL)" name="slug" value={formData.slug} onChange={handleChange} required />
          </div>

          <Input label="Date et heure" name="event_date" type="datetime-local" value={formData.event_date} onChange={handleChange} required />

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Nom du lieu" name="venue_name" value={formData.venue_name} onChange={handleChange} required />
            <Input label="Adresse" name="venue_address" value={formData.venue_address} onChange={handleChange} />
          </div>

          <Input label="Image URL" name="image_url" type="url" value={formData.image_url} onChange={handleChange} />

          <Textarea label="Description" name="description_fr" value={formData.description_fr} onChange={handleChange} rows={3} />

          {/* Line-up */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-text-secondary">Line-up</label>
              <Button type="button" variant="ghost" size="sm" onClick={addLineupItem} icon={Plus}>Ajouter</Button>
            </div>

            <div className="space-y-3">
              {formData.lineup.map((item, index) => (
                <div key={index} className="p-4 bg-mvr-elevated border border-white/5" style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)' }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="text-xs text-text-muted block mb-1">Artiste MVR (ou vide si externe)</label>
                        <select
                          value={item.artist_id || ''}
                          onChange={(e) => handleLineupChange(index, 'artist_id', e.target.value || null)}
                          className="w-full bg-mvr-surface border border-white/10 px-3 py-2 text-white text-sm"
                        >
                          <option value="">-- Artiste externe --</option>
                          {artists.map(artist => (
                            <option key={artist.id} value={artist.id}>{artist.name}</option>
                          ))}
                        </select>
                      </div>

                      {!item.artist_id && (
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Nom de l'artiste"
                            value={item.external_name}
                            onChange={(e) => handleLineupChange(index, 'external_name', e.target.value)}
                            className="bg-mvr-surface border border-white/10 px-3 py-2 text-white text-sm"
                          />
                          <input
                            type="url"
                            placeholder="Lien (SoundCloud, etc.)"
                            value={item.external_link}
                            onChange={(e) => handleLineupChange(index, 'external_link', e.target.value)}
                            className="bg-mvr-surface border border-white/10 px-3 py-2 text-white text-sm"
                          />
                        </div>
                      )}
                    </div>

                    <button type="button" onClick={() => removeLineupItem(index)} className="p-2 text-text-muted hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {formData.lineup.length === 0 && (
                <p className="text-text-muted text-sm text-center py-4">Aucun artiste</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Lien billetterie" name="link_tickets" type="url" value={formData.link_tickets} onChange={handleChange} />
            <Input label="Événement Facebook" name="link_facebook" type="url" value={formData.link_facebook} onChange={handleChange} />
          </div>

          <Input label="Aftermovie (YouTube URL)" name="aftermovie_url" type="url" value={formData.aftermovie_url} onChange={handleChange} />

          <div className="flex gap-3 pt-4 border-t border-white/10">
            <Button type="submit" variant="primary" icon={Save} loading={saving} disabled={saving}>
              {event ? 'Enregistrer' : 'Créer'}
            </Button>
            <Button type="button" variant="ghost" onClick={onCancel}>Annuler</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function EventCard({ event, onEdit, onDelete }) {
  const upcoming = isUpcoming(event.event_date)

  return (
    <Card hover={false} className="flex items-center gap-4">
      <div 
        className="w-20 h-16 flex-shrink-0 bg-mvr-elevated overflow-hidden"
        style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)' }}
      >
        {event.image_url ? (
          <img src={event.image_url} alt={event.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🎉</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-white truncate">{event.name}</h3>
          <Badge variant={upcoming ? 'cyan' : 'default'} size="sm">
            {upcoming ? 'À venir' : 'Passé'}
          </Badge>
        </div>
        <p className="text-sm text-text-muted truncate">
          {formatDate(event.event_date)} • {event.venue_name}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {event.event_lineup?.length || 0} artiste{(event.event_lineup?.length || 0) > 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <a href={`/events/${event.slug}`} target="_blank" className="p-2 text-text-muted hover:text-neon-cyan">
          <ExternalLink className="w-4 h-4" />
        </a>
        <button onClick={onEdit} className="p-2 text-text-muted hover:text-white">
          <Edit className="w-4 h-4" />
        </button>
        <button onClick={onDelete} className="p-2 text-text-muted hover:text-red-400">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  )
}

export default function AdminEvents() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [events, setEvents] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [editingEvent, setEditingEvent] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const loadData = async () => {
    try {
      setError(null)
      const [eventsData, artistsData] = await Promise.all([
        getEvents(),
        getArtists(),
      ])
      setEvents(eventsData || [])
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
      setEditingEvent(null)
      searchParams.delete('new')
      setSearchParams(searchParams)
    }
  }, [searchParams, setSearchParams])

  const handleSave = async (eventData, lineup) => {
    setSaving(true)
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData, lineup)
      } else {
        await createEvent(eventData, lineup)
      }
      setShowForm(false)
      setEditingEvent(null)
      await loadData()
    } catch (err) {
      console.error('Error saving event:', err)
      alert('Erreur: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (event) => {
    if (!confirm(`Supprimer "${event.name}" ?`)) return
    
    try {
      await deleteEvent(event.id)
      await loadData()
    } catch (err) {
      console.error('Error deleting event:', err)
      alert('Erreur: ' + err.message)
    }
  }

  const upcomingEvents = events.filter(e => isUpcoming(e.event_date))
  const pastEvents = events.filter(e => !isUpcoming(e.event_date))

  if (error === 'Supabase non configuré') {
    return (
      <AdminLayout title="Événements">
        <Card accent className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
          <p className="text-white mb-2">Base de données non connectée</p>
          <p className="text-text-secondary text-sm">Configurez Supabase dans .env</p>
        </Card>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Événements">
      <div className="flex justify-between items-center mb-6">
        <p className="text-text-secondary">
          {events.length} événement{events.length > 1 ? 's' : ''} ({upcomingEvents.length} à venir)
        </p>
        <Button variant="primary" icon={Plus} onClick={() => { setEditingEvent(null); setShowForm(true) }}>
          Nouvel événement
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader /></div>
      ) : (
        <div className="space-y-8">
          {upcomingEvents.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-neon-cyan mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> À venir ({upcomingEvents.length})
              </h3>
              <div className="grid gap-4">
                {upcomingEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onEdit={() => { setEditingEvent(event); setShowForm(true) }}
                    onDelete={() => handleDelete(event)}
                  />
                ))}
              </div>
            </div>
          )}

          {pastEvents.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-text-secondary mb-4">Passés ({pastEvents.length})</h3>
              <div className="grid gap-4">
                {pastEvents.map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event}
                    onEdit={() => { setEditingEvent(event); setShowForm(true) }}
                    onDelete={() => handleDelete(event)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <EventForm
            event={editingEvent}
            artists={artists}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingEvent(null) }}
            saving={saving}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
