import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Disc3, Calendar, TrendingUp, Plus } from 'lucide-react'
import AdminLayout from '@/components/layout/AdminLayout'
import { Card, Button, Badge } from '@/components/ui'
import { 
  getMockArtists, 
  getMockReleases, 
  getMockEvents, 
  getMockUpcomingEvents 
} from '@/lib/mockData'
import { formatDate, isUpcoming } from '@/lib/utils'

function StatCard({ title, value, icon: Icon, color, to }) {
  const colors = {
    cyan: 'from-neon-cyan/20 to-neon-cyan/5 border-neon-cyan/30',
    purple: 'from-neon-purple/20 to-neon-purple/5 border-neon-purple/30',
    pink: 'from-neon-pink/20 to-neon-pink/5 border-neon-pink/30',
  }

  return (
    <Link to={to}>
      <Card 
        hover 
        className={`bg-gradient-to-br ${colors[color]} border`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-secondary text-sm">{title}</p>
            <p className="font-display text-3xl font-bold text-white mt-1">
              {value}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-${color === 'cyan' ? 'neon-cyan' : color === 'purple' ? 'neon-purple' : 'neon-pink'}/20 flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${color === 'cyan' ? 'text-neon-cyan' : color === 'purple' ? 'text-neon-purple' : 'text-neon-pink'}`} />
          </div>
        </div>
      </Card>
    </Link>
  )
}

function RecentItem({ title, subtitle, badge, badgeVariant = 'default', to }) {
  return (
    <Link 
      to={to}
      className="flex items-center justify-between p-4 rounded-lg bg-mvr-surface/50 hover:bg-mvr-surface transition-colors"
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
    </Link>
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

  useEffect(() => {
    async function loadData() {
      try {
        const [artists, releases, events, upcoming] = await Promise.all([
          getMockArtists(),
          getMockReleases(),
          getMockEvents(),
          getMockUpcomingEvents(),
        ])

        setStats({
          artists: artists.length,
          releases: releases.length,
          events: events.length,
          upcomingEvents: upcoming.length,
        })

        setRecentReleases(releases.slice(0, 5))
        setUpcomingEvents(upcoming.slice(0, 3))
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

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
        <Button as={Link} to="/admin/artists?new=true" variant="secondary" size="sm" icon={Plus}>
          Nouvel artiste
        </Button>
        <Button as={Link} to="/admin/releases?new=true" variant="secondary" size="sm" icon={Plus}>
          Nouvelle release
        </Button>
        <Button as={Link} to="/admin/events?new=true" variant="secondary" size="sm" icon={Plus}>
          Nouvel événement
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Dernières releases */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-white">Dernières releases</h2>
            <Link to="/admin/releases" className="text-neon-cyan text-sm hover:underline">
              Voir tout
            </Link>
          </div>
          
          <div className="space-y-2">
            {recentReleases.map((release) => (
              <RecentItem
                key={release.id}
                title={release.title}
                subtitle={formatDate(release.release_date, { month: 'short', year: 'numeric' })}
                badge={release.release_type.toUpperCase()}
                badgeVariant="purple"
                to={`/admin/releases?edit=${release.id}`}
              />
            ))}
          </div>
        </Card>

        {/* Prochains événements */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-white">Prochains événements</h2>
            <Link to="/admin/events" className="text-neon-cyan text-sm hover:underline">
              Voir tout
            </Link>
          </div>
          
          <div className="space-y-2">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <RecentItem
                  key={event.id}
                  title={event.name}
                  subtitle={formatDate(event.event_date)}
                  badge="À venir"
                  badgeVariant="cyan"
                  to={`/admin/events?edit=${event.id}`}
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
      <Card className="mt-8 bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5 border-neon-cyan/20">
        <h3 className="font-display font-bold text-white mb-2">💡 Aide rapide</h3>
        <ul className="text-text-secondary text-sm space-y-1">
          <li>• Pour ajouter un artiste, utilisez le bouton "Nouvel artiste" ou allez dans la section Artistes</li>
          <li>• Les images sont stockées sur Supabase Storage ou via lien externe</li>
          <li>• N'oubliez pas de remplir les slugs pour les URLs propres</li>
          <li>• Les releases peuvent avoir plusieurs artistes (relation many-to-many)</li>
        </ul>
      </Card>
    </AdminLayout>
  )
}
