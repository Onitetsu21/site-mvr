-- =============================================
-- MULTIVERSAL RECORDS - DATABASE SCHEMA
-- Pour Supabase (PostgreSQL)
-- =============================================

-- Activer l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLE: artists
-- =============================================
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  photo_url TEXT,
  styles TEXT[],
  location TEXT,
  bio_fr TEXT,
  bio_en TEXT,
  
  link_spotify TEXT,
  link_soundcloud TEXT,
  link_bandcamp TEXT,
  link_apple_music TEXT,
  link_beatport TEXT,
  link_youtube TEXT,
  link_instagram TEXT,
  link_facebook TEXT,
  link_presskit TEXT,
  
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE
);

-- Index pour la recherche
CREATE INDEX idx_artists_slug ON artists(slug);
CREATE INDEX idx_artists_featured ON artists(is_featured) WHERE is_featured = TRUE;

-- =============================================
-- TABLE: releases
-- =============================================
CREATE TABLE releases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  release_type TEXT NOT NULL CHECK (release_type IN ('single', 'ep', 'album', 'va')),
  release_date DATE NOT NULL,
  catalog_number TEXT,
  cover_url TEXT,
  
  tracklist JSONB DEFAULT '[]'::jsonb,
  credits_mastering TEXT,
  credits_artwork TEXT,
  description_fr TEXT,
  description_en TEXT,
  
  link_bandcamp TEXT,
  link_spotify TEXT,
  link_beatport TEXT,
  link_soundcloud TEXT,
  embed_code TEXT
);

-- Index
CREATE INDEX idx_releases_slug ON releases(slug);
CREATE INDEX idx_releases_date ON releases(release_date DESC);

-- =============================================
-- TABLE: release_artists (relation N-N)
-- =============================================
CREATE TABLE release_artists (
  release_id UUID REFERENCES releases(id) ON DELETE CASCADE,
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  PRIMARY KEY (release_id, artist_id)
);

-- =============================================
-- TABLE: events
-- =============================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  venue_name TEXT NOT NULL,
  venue_address TEXT,
  image_url TEXT,
  description_fr TEXT,
  description_en TEXT,
  
  link_tickets TEXT,
  link_facebook TEXT,
  aftermovie_url TEXT,
  photos JSONB DEFAULT '[]'::jsonb
);

-- Index
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_date ON events(event_date DESC);

-- =============================================
-- TABLE: event_lineup
-- =============================================
CREATE TABLE event_lineup (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  
  -- Si artiste MVR
  artist_id UUID REFERENCES artists(id) ON DELETE SET NULL,
  
  -- Si artiste externe
  external_name TEXT,
  external_photo_url TEXT,
  external_link TEXT,
  
  display_order INT DEFAULT 0
);

-- Index
CREATE INDEX idx_event_lineup_event ON event_lineup(event_id);

-- =============================================
-- TABLE: team_members
-- =============================================
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  first_name TEXT NOT NULL,
  photo_url TEXT,
  roles TEXT[] DEFAULT '{}',
  poles TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0
);

-- =============================================
-- TABLE: contact_messages
-- =============================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  subject TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE
);

-- Index
CREATE INDEX idx_contact_messages_read ON contact_messages(is_read) WHERE is_read = FALSE;

-- =============================================
-- TRIGGERS pour updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_artists_updated_at
  BEFORE UPDATE ON artists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_releases_updated_at
  BEFORE UPDATE ON releases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
-- Activer RLS sur toutes les tables
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE release_artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_lineup ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Politique: Lecture publique pour le contenu
CREATE POLICY "Public read access" ON artists FOR SELECT USING (true);
CREATE POLICY "Public read access" ON releases FOR SELECT USING (true);
CREATE POLICY "Public read access" ON release_artists FOR SELECT USING (true);
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON event_lineup FOR SELECT USING (true);
CREATE POLICY "Public read access" ON team_members FOR SELECT USING (true);

-- Politique: Insertion publique pour les messages de contact
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);

-- Politique: Accès complet pour les utilisateurs authentifiés (admin)
CREATE POLICY "Admin full access" ON artists FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON releases FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON release_artists FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON event_lineup FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKETS (à créer dans l'interface Supabase)
-- =============================================
-- 1. artists (public) - Photos des artistes
-- 2. releases (public) - Covers des releases
-- 3. events (public) - Visuels et photos des events
-- 4. team (public) - Photos de l'équipe

-- Note: Les buckets doivent être créés via l'interface Supabase Storage
-- et configurés en accès public pour les fichiers.
