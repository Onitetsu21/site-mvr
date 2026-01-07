import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Vérifier si Supabase est configuré
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co'

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper pour vérifier la connexion
export function checkSupabaseConnection() {
  if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase non configuré. Vérifiez votre fichier .env')
    return false
  }
  return true
}

// =============================================
// ARTISTS
// =============================================

export async function getArtists() {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data
}

export async function getArtistBySlug(slug) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export async function getFeaturedArtists(limit = 4) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('is_featured', true)
    .order('display_order', { ascending: true })
    .limit(limit)
  
  if (error) throw error
  return data
}

export async function createArtist(artistData) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('artists')
    .insert([artistData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateArtist(id, artistData) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('artists')
    .update(artistData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteArtist(id) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { error } = await supabase
    .from('artists')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

export async function getMVRArtists() {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const mvrSlugs = [
    'the-trancemancer', 'psy-fact', 'gohu', 'i-on', 'ulmo', 'anija', 
    'tripshift', 'nidra', 'unlucide', 'solar-drift', 'adramelech',
    'monsieur-le-maire', 'excaetera', 'krauzer', 'hokoda', 'spacey-guana-2'
  ]
  
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .in('slug', mvrSlugs)
    .order('name', { ascending: true }) 
  
  if (error) throw error
  return data
}

// =============================================
// RELEASES
// =============================================

export async function getReleases() {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('releases')
    .select(`
      *,
      release_artists (
        artist:artists (id, name, slug, photo_url)
      )
    `)
    .order('release_date', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getLatestReleases(limit = 4) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('releases')
    .select(`
      *,
      release_artists (
        artist:artists (id, name, slug, photo_url)
      )
    `)
    .order('release_date', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

export async function getReleaseBySlug(slug) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('releases')
    .select(`
      *,
      release_artists (
        artist:artists (id, name, slug, photo_url)
      )
    `)
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export async function getReleasesByArtist(artistId) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('release_artists')
    .select(`
      release:releases (*)
    `)
    .eq('artist_id', artistId)
  
  if (error) throw error
  return data.map(item => item.release)
}

export async function createRelease(releaseData, artistIds = []) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  // Créer la release
  const { data: release, error: releaseError } = await supabase
    .from('releases')
    .insert([releaseData])
    .select()
    .single()
  
  if (releaseError) throw releaseError
  
  // Ajouter les relations artistes
  if (artistIds.length > 0) {
    const relations = artistIds.map(artistId => ({
      release_id: release.id,
      artist_id: artistId
    }))
    
    const { error: relError } = await supabase
      .from('release_artists')
      .insert(relations)
    
    if (relError) throw relError
  }
  
  return release
}

export async function updateRelease(id, releaseData, artistIds = []) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  // Update la release
  const { data: release, error: releaseError } = await supabase
    .from('releases')
    .update(releaseData)
    .eq('id', id)
    .select()
    .single()
  
  if (releaseError) throw releaseError
  
  // Supprimer les anciennes relations
  await supabase
    .from('release_artists')
    .delete()
    .eq('release_id', id)
  
  // Ajouter les nouvelles relations
  if (artistIds.length > 0) {
    const relations = artistIds.map(artistId => ({
      release_id: id,
      artist_id: artistId
    }))
    
    await supabase
      .from('release_artists')
      .insert(relations)
  }
  
  return release
}

export async function deleteRelease(id) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { error } = await supabase
    .from('releases')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// =============================================
// EVENTS
// =============================================

export async function getEvents() {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      event_lineup (
        id,
        display_order,
        external_name,
        external_photo_url,
        external_link,
        artist:artists (id, name, slug, photo_url)
      )
    `)
    .order('event_date', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getUpcomingEvents(limit = 10) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      event_lineup (
        id,
        display_order,
        external_name,
        external_photo_url,
        external_link,
        artist:artists (id, name, slug, photo_url)
      )
    `)
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })
    .limit(limit)
  
  if (error) throw error
  return data
}

export async function getPastEvents(limit = 20) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      event_lineup (
        id,
        display_order,
        external_name,
        external_photo_url,
        external_link,
        artist:artists (id, name, slug, photo_url)
      )
    `)
    .lt('event_date', new Date().toISOString())
    .order('event_date', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

export async function getEventBySlug(slug) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      event_lineup (
        id,
        display_order,
        external_name,
        external_photo_url,
        external_link,
        artist:artists (id, name, slug, photo_url)
      )
    `)
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export async function createEvent(eventData, lineup = []) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data: event, error: eventError } = await supabase
    .from('events')
    .insert([eventData])
    .select()
    .single()
  
  if (eventError) throw eventError
  
  // Ajouter le lineup
  if (lineup.length > 0) {
    const lineupData = lineup.map((item, index) => ({
      event_id: event.id,
      artist_id: item.artist_id || null,
      external_name: item.external_name || null,
      external_photo_url: item.external_photo_url || null,
      external_link: item.external_link || null,
      display_order: index + 1
    }))
    
    await supabase
      .from('event_lineup')
      .insert(lineupData)
  }
  
  return event
}

export async function updateEvent(id, eventData, lineup = []) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error: eventError } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select()
  
  if (eventError) throw eventError
  
  const event = data[0]  // Prendre le premier résultat
  
  // Supprimer l'ancien lineup
  await supabase
    .from('event_lineup')
    .delete()
    .eq('event_id', id)
  
  // Ajouter le nouveau lineup
  if (lineup.length > 0) {
    const lineupData = lineup.map((item, index) => ({
      event_id: id,
      artist_id: item.artist_id || null,
      external_name: item.external_name || null,
      external_photo_url: item.external_photo_url || null,
      external_link: item.external_link || null,
      display_order: index + 1
    }))
    
    await supabase
      .from('event_lineup')
      .insert(lineupData)
  }
  
  return event
}

export async function deleteEvent(id) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

// =============================================
// TEAM MEMBERS
// =============================================

export async function getTeamMembers() {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (error) throw error
  return data
}

// =============================================
// CONTACT MESSAGES
// =============================================

export async function sendContactMessage(message) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([message])
    .select()
  
  if (error) throw error
  return data
}

export async function getContactMessages() {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function markMessageAsRead(id) {
  if (!supabase) throw new Error('Supabase non configuré')
  
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id)
  
  if (error) throw error
  return true
}
