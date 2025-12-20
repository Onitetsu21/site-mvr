// ===== MOCK DATA POUR DÉVELOPPEMENT =====
// Ces données permettent de tester le site sans connexion Supabase

export const mockArtists = [
  {
    id: '1',
    name: 'Psykovsky',
    slug: 'psykovsky',
    photo_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    styles: ['Darkpsy', 'Forest'],
    location: 'Russia',
    bio_fr: "Maître incontesté de la darkpsy, Psykovsky repousse les limites du son depuis plus de deux décennies. Ses productions sont des voyages hallucinés dans les profondeurs de la psyché humaine.",
    bio_en: "Undisputed master of darkpsy, Psykovsky has been pushing the boundaries of sound for over two decades.",
    link_spotify: 'https://spotify.com',
    link_soundcloud: 'https://soundcloud.com',
    link_bandcamp: 'https://bandcamp.com',
    link_instagram: 'https://instagram.com',
    link_presskit: 'https://drive.google.com',
    is_featured: true,
    display_order: 1
  },
  {
    id: '2',
    name: 'Fungus Funk',
    slug: 'fungus-funk',
    photo_url: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=400&h=400&fit=crop',
    styles: ['Forest', 'Darkpsy'],
    location: 'Serbia',
    bio_fr: "Fungus Funk est un projet qui explore les territoires les plus sombres et organiques de la musique psychédélique. Des basses profondes et des textures alien caractérisent son son unique.",
    link_spotify: 'https://spotify.com',
    link_soundcloud: 'https://soundcloud.com',
    is_featured: true,
    display_order: 2
  },
  {
    id: '3',
    name: 'Avalon',
    slug: 'avalon',
    photo_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
    styles: ['Full-on', 'Psytrance'],
    location: 'South Africa',
    bio_fr: "Avalon incarne l'énergie pure du full-on psytrance. Ses productions puissantes et mélodiques font vibrer les dancefloors du monde entier depuis plus de 15 ans.",
    link_spotify: 'https://spotify.com',
    link_beatport: 'https://beatport.com',
    is_featured: true,
    display_order: 3
  },
  {
    id: '4',
    name: 'Vini Vici',
    slug: 'vini-vici',
    photo_url: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=400&fit=crop',
    styles: ['Psytrance', 'Progressive'],
    location: 'Israel',
    bio_fr: "Le duo israélien Vini Vici a propulsé la psytrance vers de nouveaux sommets avec leur son unique mélangeant influences tribales et productions modernes.",
    link_spotify: 'https://spotify.com',
    link_instagram: 'https://instagram.com',
    is_featured: true,
    display_order: 4
  },
  {
    id: '5',
    name: 'Hypogeo',
    slug: 'hypogeo',
    photo_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    styles: ['Darkpsy', 'Hi-Tech'],
    location: 'Italy',
    bio_fr: "Hypogeo explore les confins les plus extrêmes de la musique psychédélique avec des productions hi-tech qui défient les conventions.",
    link_soundcloud: 'https://soundcloud.com',
    link_bandcamp: 'https://bandcamp.com',
    is_featured: false,
    display_order: 5
  },
  {
    id: '6',
    name: 'Arjuna',
    slug: 'arjuna',
    photo_url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    styles: ['Progressive', 'Full-on'],
    location: 'Lyon, France',
    bio_fr: "Artiste local lyonnais, Arjuna mélange les influences progressives et full-on pour créer un son unique qui fait la fierté de la scène française.",
    link_soundcloud: 'https://soundcloud.com',
    link_instagram: 'https://instagram.com',
    is_featured: false,
    display_order: 6
  }
]

export const mockReleases = [
  {
    id: '1',
    title: 'Cosmic Awakening',
    slug: 'cosmic-awakening',
    release_type: 'ep',
    release_date: '2024-11-15',
    catalog_number: 'MVR042',
    cover_url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=500&h=500&fit=crop',
    tracklist: [
      { title: 'Dimensional Shift', duration: 482 },
      { title: 'Neural Network', duration: 445 },
      { title: 'Quantum Leap', duration: 512 }
    ],
    credits_mastering: 'Studio X',
    credits_artwork: 'MVR Design Team',
    description_fr: "Un voyage à travers les dimensions cosmiques de la conscience.",
    link_bandcamp: 'https://bandcamp.com',
    link_spotify: 'https://spotify.com',
    link_beatport: 'https://beatport.com',
    embed_code: '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=123456789/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless></iframe>',
    release_artists: [
      { artist: mockArtists[0] }
    ]
  },
  {
    id: '2',
    title: 'Forest Rituals',
    slug: 'forest-rituals',
    release_type: 'single',
    release_date: '2024-10-20',
    catalog_number: 'MVR041',
    cover_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop',
    tracklist: [
      { title: 'Forest Rituals', duration: 528 }
    ],
    credits_mastering: 'Dark Mastering',
    description_fr: "Un rituel sonore au cœur de la forêt obscure.",
    link_bandcamp: 'https://bandcamp.com',
    link_spotify: 'https://spotify.com',
    release_artists: [
      { artist: mockArtists[1] }
    ]
  },
  {
    id: '3',
    title: 'Multiversal Compilation Vol. 3',
    slug: 'multiversal-compilation-vol-3',
    release_type: 'va',
    release_date: '2024-09-01',
    catalog_number: 'MVR040',
    cover_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=500&fit=crop',
    tracklist: [
      { title: 'Psykovsky - Mind Expander', duration: 492 },
      { title: 'Fungus Funk - Mycelium', duration: 467 },
      { title: 'Avalon - Rise Up', duration: 445 },
      { title: 'Hypogeo - Frequency', duration: 501 }
    ],
    credits_mastering: 'Studio X',
    credits_artwork: 'MVR Design Team',
    description_fr: "La troisième compilation du label réunissant les meilleurs artistes de la scène.",
    link_bandcamp: 'https://bandcamp.com',
    link_spotify: 'https://spotify.com',
    link_beatport: 'https://beatport.com',
    release_artists: [
      { artist: mockArtists[0] },
      { artist: mockArtists[1] },
      { artist: mockArtists[2] },
      { artist: mockArtists[4] }
    ]
  },
  {
    id: '4',
    title: 'Tribal Echoes',
    slug: 'tribal-echoes',
    release_type: 'ep',
    release_date: '2024-07-15',
    catalog_number: 'MVR039',
    cover_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    tracklist: [
      { title: 'Ancient Drums', duration: 456 },
      { title: 'Tribal Echoes', duration: 489 }
    ],
    description_fr: "Des échos tribaux venus d'un autre temps.",
    link_bandcamp: 'https://bandcamp.com',
    link_spotify: 'https://spotify.com',
    release_artists: [
      { artist: mockArtists[3] }
    ]
  }
]

export const mockEvents = [
  {
    id: '1',
    name: 'Multiversal Night #15',
    slug: 'multiversal-night-15',
    event_date: '2025-02-15T22:00:00',
    venue_name: 'La Rayonne',
    venue_address: '26 Rue Gervais Bussière, 69100 Villeurbanne',
    image_url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&h=600&fit=crop',
    description_fr: "La 15ème édition de notre soirée mensuelle ! Line-up exceptionnel pour célébrer cette étape.",
    link_tickets: 'https://shotgun.live',
    link_facebook: 'https://facebook.com/events',
    event_lineup: [
      { id: '1', display_order: 1, artist: mockArtists[0], external_name: null },
      { id: '2', display_order: 2, artist: mockArtists[1], external_name: null },
      { id: '3', display_order: 3, artist: null, external_name: 'Guest DJ', external_photo_url: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=200', external_link: 'https://soundcloud.com' }
    ]
  },
  {
    id: '2',
    name: 'Tech to Psy w/ Outrance',
    slug: 'tech-to-psy-outrance',
    event_date: '2024-12-07T23:00:00',
    venue_name: 'Péniche Loupika',
    venue_address: 'Quai Rambaud, 69002 Lyon',
    image_url: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=800&h=600&fit=crop',
    description_fr: "Collaboration spéciale avec le collectif Outrance pour une soirée mélangeant techno et psytrance.",
    link_tickets: 'https://shotgun.live',
    aftermovie_url: 'https://youtube.com/watch?v=example',
    photos: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'
    ],
    event_lineup: [
      { id: '4', display_order: 1, artist: mockArtists[2], external_name: null },
      { id: '5', display_order: 2, artist: mockArtists[5], external_name: null }
    ]
  },
  {
    id: '3',
    name: 'Forest Gathering',
    slug: 'forest-gathering',
    event_date: '2024-09-21T18:00:00',
    venue_name: 'Secret Location',
    venue_address: 'Monts du Lyonnais',
    image_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
    description_fr: "Notre premier événement outdoor de la saison. Une journée complète dans la nature.",
    aftermovie_url: 'https://youtube.com/watch?v=example2',
    photos: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400',
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400',
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400'
    ],
    event_lineup: [
      { id: '6', display_order: 1, artist: mockArtists[0], external_name: null },
      { id: '7', display_order: 2, artist: mockArtists[1], external_name: null },
      { id: '8', display_order: 3, artist: mockArtists[4], external_name: null }
    ]
  }
]

export const mockTeam = [
  {
    id: '1',
    first_name: 'Alex',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    roles: ['president'],
    poles: ['admin', 'event'],
    display_order: 1
  },
  {
    id: '2',
    first_name: 'Marie',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    roles: ['tresorier'],
    poles: ['admin'],
    display_order: 2
  },
  {
    id: '3',
    first_name: 'Thomas',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    roles: ['secretaire', 'responsable_pole'],
    poles: ['release'],
    display_order: 3
  },
  {
    id: '4',
    first_name: 'Julie',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    roles: ['responsable_pole'],
    poles: ['graphisme'],
    display_order: 4
  },
  {
    id: '5',
    first_name: 'Lucas',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    roles: ['responsable_pole'],
    poles: ['sceno'],
    display_order: 5
  }
]

// ===== FONCTIONS HELPERS POUR LE DEV =====

export function getMockArtists() {
  return Promise.resolve(mockArtists)
}

export function getMockArtistBySlug(slug) {
  const artist = mockArtists.find(a => a.slug === slug)
  return Promise.resolve(artist || null)
}

export function getMockFeaturedArtists() {
  return Promise.resolve(mockArtists.filter(a => a.is_featured).slice(0, 4))
}

export function getMockReleases() {
  return Promise.resolve(mockReleases)
}

export function getMockLatestReleases(limit = 4) {
  return Promise.resolve(mockReleases.slice(0, limit))
}

export function getMockReleaseBySlug(slug) {
  const release = mockReleases.find(r => r.slug === slug)
  return Promise.resolve(release || null)
}

export function getMockReleasesByArtist(artistId) {
  const releases = mockReleases.filter(r => 
    r.release_artists.some(ra => ra.artist.id === artistId)
  )
  return Promise.resolve(releases)
}

export function getMockEvents() {
  return Promise.resolve(mockEvents)
}

export function getMockUpcomingEvents() {
  const upcoming = mockEvents.filter(e => new Date(e.event_date) > new Date())
  return Promise.resolve(upcoming)
}

export function getMockEventBySlug(slug) {
  const event = mockEvents.find(e => e.slug === slug)
  return Promise.resolve(event || null)
}

export function getMockTeam() {
  return Promise.resolve(mockTeam)
}
