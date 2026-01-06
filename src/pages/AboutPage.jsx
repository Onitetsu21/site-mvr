import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, MapPin, Calendar, Users, Disc3, Music } from 'lucide-react'
import { Container, Section, PageHeader } from '@/components/layout/Section'
import { Button, Card, Badge, Loader, SectionTitle } from '@/components/ui'
import { getMockTeam } from '@/lib/mockData'

// Labels des rôles
const roleLabels = {
  president: 'Président',
  tresorier: 'Trésorier',
  secretaire: 'Secrétaire',
  responsable_pole: 'Responsable',
  suppleant: 'Suppléant',
}

// Labels des pôles
const poleLabels = {
  release: 'Release',
  event: 'Event',
  graphisme: 'Graphisme',
  sceno: 'Scéno',
  admin: 'Admin',
}

// Valeurs de l'association
const values = [
  {
    icon: '🤝',
    title: 'Respect',
    description: 'Nos events sont des safe spaces. Tolérance zéro pour le harcèlement et les discriminations. Chacun·e doit se sentir bienvenu·e.',
    color: 'cyan',
  },
  {
    icon: '🔄',
    title: 'Partage',
    description: 'La musique comme vecteur de connexion. On partage nos connaissances, nos contacts, nos expériences. Le succès de l\'un profite à tous.',
    color: 'purple',
  },
  {
    icon: '📚',
    title: 'Transmission',
    description: 'On soutient les artistes émergents, on forme nos bénévoles, on documente nos process pour les suivants.',
    color: 'pink',
  },
  {
    icon: '🌱',
    title: 'Écoresponsabilité',
    description: 'Gobelets réutilisables, transports groupés, décors récup\', communication digitale. On progresse event après event.',
    color: 'cyan',
  },
  {
    icon: '🚀',
    title: 'Ouverture',
    description: 'Du chill au dark, on ne s\'enferme pas dans un sous-genre. Artistes locaux et internationaux se côtoient.',
    color: 'purple',
  },
]

// Stats du label
const stats = [
  { label: 'Années d\'existence', value: '5+', icon: Calendar },
  { label: 'Releases', value: '30+', icon: Disc3 },
  { label: 'Artistes', value: '15', icon: Music },
  { label: 'Bénévoles actifs', value: '15', icon: Users },
]

function TeamMemberCard({ member, index }) {
  const mainRole = member.roles?.[0]
  const mainPole = member.poles?.[0]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card hover className="text-center h-full">
        {/* Photo */}
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <div 
            className="absolute inset-0 border-2 border-neon-cyan/50"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
          {member.photo_url ? (
            <img
              src={member.photo_url}
              alt={member.first_name}
              className="w-full h-full object-cover"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            />
          ) : (
            <div 
              className="w-full h-full bg-mvr-elevated flex items-center justify-center text-2xl"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              👤
            </div>
          )}
        </div>

        {/* Nom */}
        <h4 className="font-display font-bold text-white mb-2">
          {member.first_name}
        </h4>

        {/* Rôles */}
        <div className="flex flex-wrap justify-center gap-1">
          {mainRole && (
            <Badge variant="cyan" size="sm">
              {roleLabels[mainRole] || mainRole}
            </Badge>
          )}
          {mainPole && (
            <Badge variant="purple" size="sm">
              {poleLabels[mainPole] || mainPole}
            </Badge>
          )}
        </div>
      </Card>
    </motion.div>
  )
}

function ValueCard({ value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card hover className="h-full">
        <h3 className={`font-display text-xl font-bold mb-2 ${
          value.color === 'cyan' ? 'text-neon-cyan' : 
          value.color === 'purple' ? 'text-neon-purple' : 
          'text-neon-pink'
        }`}>
          {value.title}
        </h3>
        <p className="text-text-secondary text-sm">
          {value.description}
        </p>
      </Card>
    </motion.div>
  )
}

export default function AboutPage() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await getMockTeam()
        setTeam(data)
      } catch (error) {
        console.error('Error loading team:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTeam()
  }, [])

  return (
    <>
      <PageHeader
        title="À PROPOS"
        subtitle="Qui sommes-nous ? Une bande de passionné·e·s de musique psychédélique qui fait vibrer Lyon depuis 2019."
      />

      {/* Le projet */}
      <Section padding="sm">
        <Container size="sm">
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              <strong className="text-white">Multiversal Records</strong> est né en 2019 d'une envie simple : 
              créer un espace pour la musique psychédélique à Lyon. Label indépendant et association loi 1901, 
              nous produisons des releases et organisons des événements avec une philosophie centrée sur 
              <strong className="text-neon-cyan"> l'humain</strong>, 
              <strong className="text-neon-purple"> l'écoresponsabilité</strong> et 
              <strong className="text-neon-pink"> la pleine conscience</strong>.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              De la Chillgressive à la Forest, en passant par le Full-on et la Psytrance progressive, 
              nous cultivons un éclectisme assumé au sein de la galaxie psychédélique. Notre roster 
              réunit des artistes locaux et internationaux qui partagent notre vision d'une scène 
              inclusive et bienveillante.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Stats */}
      <Section padding="sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-mvr-surface/50 rounded-xl border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 text-neon-cyan mx-auto mb-3" />
                <p className="font-display text-3xl md:text-4xl font-bold text-gradient-cyan">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Nos valeurs */}
      <Section>
        <Container>
          <SectionTitle subtitle="Ce qui guide nos actions au quotidien">
            NOS VALEURS
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </Container>
      </Section>

      {/* L'équipe */}
      <Section className="bg-mvr-darker/50">
        <Container>
          <SectionTitle subtitle="Les humains derrière le label">
            L'ÉQUIPE
          </SectionTitle>
          
          {loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {team.map((member, index) => (
                <TeamMemberCard key={member.id} member={member} index={index} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* Localisation */}
      <Section padding="sm">
        <Container size="sm">
          <motion.div
            className="text-center bg-mvr-surface/50 rounded-xl p-8 border border-white/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MapPin className="w-10 h-10 text-neon-cyan mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">Basés à Lyon</h3>
            <p className="text-text-secondary">
              Notre cœur bat au rythme de la capitale des Gaules, 
              mais notre musique voyage bien au-delà.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Presskit */}
      <Section padding="default">
        <Container size="sm">
          <motion.div
            className="text-center bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 rounded-xl p-8 border border-neon-cyan/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-xl font-bold text-white mb-2">
              Presskit Label
            </h3>
            <p className="text-text-secondary mb-6">
              Logo, photos, bio et chiffres clés pour la presse et les partenaires.
            </p>
            
            {/* TODO: Remplacer par le vrai lien */}
            <Button 
              variant="primary"
              icon={Download}
              disabled
            >
              Bientôt disponible
            </Button>
            
            <p className="text-text-muted text-sm mt-4">
              Presskit en cours de préparation
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Contact */}
      <Section padding="default">
        <Container size="sm">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-text-secondary mb-4">
              Une question ? Un projet ? Envie de nous rejoindre ?
            </p>
            <Button as={Link} to="/contact" variant="secondary">
              Nous contacter
            </Button>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}
