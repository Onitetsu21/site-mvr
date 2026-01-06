import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Users, Disc3, Calendar, TrendingUp, Plus, AlertCircle } from 'lucide-react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Card, Button, Badge, Loader } from '@/components/ui'
import { getArtists, getReleases, getEvents, getUpcomingEvents, supabase } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

function StatCard({ title, value, icon: Icon, color, to }) {
  const colors = {
    cyan: 'border-neon-cyan/30',
    purple: 'border-neon-purple/30',
    pink: 'border-neon-pink/30',
  }

  const iconColors = {
    cyan: 'bg-neon-cyan/20 text-neon-cyan',
    purple: 'bg-neon-purple/20 text-neon-purple',
    pink: 'bg-neon-pink/20 text-neon-pink',
  }

  return (
    <NavLink to={to}>
      <Card hover className={`border ${colors[color]}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-secondary text-sm">{title}</p>
            <p className="font-display text-3xl font-bold text-white mt-1">
              {value}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-xl ${iconColors[color]} flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </Card>
    </NavLink>
  )
}

function RecentItem({ title, subtitle, badge, badgeVariant = 'default', to }) {
  return (
    <NavLink 
      to={to}
      className="flex items-center justify-between p-4 bg-mvr-surface/50 hover:bg-mvr-surface transition-colors"
      style={{ clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)' }}
    >
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-text-muted">{subtitle}</p>
      </div>
      {badge && (
        <Badge variant={badgeVariant} size="sm">
          {badge}
        </Badge>
      )}
    </NavLink>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    artists: 0,
    releases: 0,
    events: 0,
    upcomingEvents: 0,
  })
  const [recentReleases, setRecentReleases] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      if (!supabase) {
        setError('Supabase non configuré')
        setLoading(false)
        return
      }

      try {
        const [artists, releases, events, upcoming] = await Promise.all([
          getArtists(),
          getReleases(),
          getEvents(),
          getUpcomingEvents(),
        ])

        setStats({
          artists: artists?.length || 0,
          releases: releases?.length || 0,
          events: events?.length || 0,
          upcomingEvents: upcoming?.length || 0,
        })

        setRecentReleases((releases || []).slice(0, 5))
        setUpcomingEvents((upcoming || []).slice(0, 3))
      } catch (err) {
        console.error('Error loading data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (error === 'Supabase non configuré') {
    return (
      <AdminLayout title="Dashboard">
        <Card accent className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-neon-cyan mx-auto mb-4" />
          <p className="text-white mb-2">Base de données non connectée</p>
          <p className="text-text-secondary text-sm">Configurez Supabase dans .env</p>
        </Card>
      </AdminLayout>
    )
  }

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Artistes"
          value={stats.artists}
          icon={Users}
          color="cyan"
          to="/admin/artists"
        />
        <StatCard
          title="Releases"
          value={stats.releases}
          icon={Disc3}
          color="purple"
          to="/admin/releases"
        />
        <StatCard
          title="Événements"
          value={stats.events}
          icon={Calendar}
          color="pink"
          to="/admin/events"
        />
        <StatCard
          title="À venir"
          value={stats.upcomingEvents}
          icon={TrendingUp}
          color="cyan"
          to="/admin/events"
        />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button as={NavLink} to="/admin/artists?new=true" variant="secondary" size="sm" icon={Plus}>
          Nouvel artiste
        </Button>
        <Button as={NavLink} to="/admin/releases?new=true" variant="secondary" size="sm" icon={Plus}>
          Nouvelle release
        </Button>
        <Button as={NavLink} to="/admin/events?new=true" variant="secondary" size="sm" icon={Plus}>
          Nouvel événement
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Dernières releases */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-white">Dernières releases</h2>
            <NavLink to="/admin/releases" className="text-neon-cyan text-sm hover:underline">
              Voir tout
            </NavLink>
          </div>
          
          <div className="space-y-2">
            {recentReleases.length > 0 ? (
              recentReleases.map((release) => (
                <RecentItem
                  key={release.id}
                  title={release.title}
                  subtitle={formatDate(release.release_date, { month: 'short', year: 'numeric' })}
                  badge={release.release_type.toUpperCase()}
                  badgeVariant="purple"
                  to="/admin/releases"
                />
              ))
            ) : (
              <p className="text-text-muted text-sm py-4 text-center">
                Aucune release
              </p>
            )}
          </div>
        </Card>

        {/* Prochains événements */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-white">Prochains événements</h2>
            <NavLink to="/admin/events" className="text-neon-cyan text-sm hover:underline">
              Voir tout
            </NavLink>
          </div>
          
          <div className="space-y-2">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <RecentItem
                  key={event.id}
                  title={event.name}
                  subtitle={`${formatDate(event.event_date)} • ${event.venue_name}`}
                  badge="À venir"
                  badgeVariant="cyan"
                  to="/admin/events"
                />
              ))
            ) : (
              <p className="text-text-muted text-sm py-4 text-center">
                Aucun événement à venir
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Aide rapide */}
      <Card className="mt-8 border-neon-cyan/20">
        <h3 className="font-display font-bold text-white mb-2">💡 Aide rapide</h3>
        <ul className="text-text-secondary text-sm space-y-1">
          <li>• Pour ajouter un artiste, utilisez le bouton "Nouvel artiste" ou allez dans la section Artistes</li>
          <li>• Les images peuvent être des URLs externes ou des chemins locaux (/artists/nom.jpg)</li>
          <li>• N'oubliez pas de remplir les slugs pour les URLs propres</li>
          <li>• Les releases peuvent avoir plusieurs artistes</li>
        </ul>
      </Card>
    </AdminLayout>
  )
}