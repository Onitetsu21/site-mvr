import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, MapPin, Calendar, Users, Disc3, Music, Palette, PartyPopper, Lightbulb, Settings } from 'lucide-react'
import { Container, Section, PageHeader } from '@/components/layout/Section'
import { Button, Card, Badge, SectionTitle } from '@/components/ui'

// Configuration des pôles avec leurs membres
const poles = [
  {
    id: 'release',
    name: 'Release',
    icon: Disc3,
    color: 'cyan',
    description: 'Production et sortie des tracks',
    members: [
      { name: 'Hugo', photo: '/team/hugo.jpg' },
      { name: 'Gohu', photo: '/team/gohu.jpg' },
    ],
  },
  {
    id: 'graphisme',
    name: 'Graphisme',
    icon: Palette,
    color: 'purple',
    description: 'Identité visuelle et artworks',
    members: [
      { name: 'Adam', photo: '/team/adam.jpg' },
    ],
  },
  {
    id: 'evenementiel',
    name: 'Événementiel',
    icon: PartyPopper,
    color: 'cyan',
    description: 'Organisation des events',
    members: [
      { name: 'Julien', photo: '/team/julien2.jpg' },
      { name: 'Patou', photo: '/team/patou.jpg' },
    ],
  },
  {
    id: 'sceno',
    name: 'Scénographie',
    icon: Lightbulb,
    color: 'purple',
    description: 'Décors et mise en lumière',
    members: [
      { name: 'Robin', photo: '/team/robin.jpg' },
      { name: 'Guilain', photo: '/team/guilain2.jpg' },
    ],
  },
  {
    id: 'admin',
    name: 'Administration',
    icon: Settings,
    color: 'cyan',
    description: 'Gestion de l\'association',
    members: [
      { name: 'Alix', role: 'Président', photo: '/team/alix.jpg' },
      { name: 'Guilain', role: 'Trésorier', photo: '/team/guilain.jpg' },
      { name: 'Julien', role: 'Vice-trésorier', photo: '/team/julien.jpg' },
    ],
  },
]

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
  { label: 'Années d\'existence', value: '7+', icon: Calendar },
  { label: 'Releases', value: '30+', icon: Disc3 },
  { label: 'Events', value: '70+', icon: Music },
  { label: 'Artistes', value: '15', icon: Users },
]

// Composant photo hexagonale
function HexagonPhoto({ src, name, size = 'md' }) {
const sizeClasses = {
  sm: 'w-24 h-[104px]',
  md: 'w-36 h-[158px]',
  lg: 'w-48 h-[210px]',
}

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Bordure hexagonale */}
      <div 
        className="absolute inset-0 border-2 border-neon-cyan/40 group-hover:border-neon-cyan/70 transition-colors"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      />
      {/* Photo ou placeholder */}
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
      ) : null}
      <div 
        className={`w-full h-full bg-mvr-elevated items-center justify-center text-2xl font-display text-neon-cyan ${src ? 'hidden' : 'flex'}`}
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        {name.charAt(0)}
      </div>
    </div>
  )
}

// Composant membre
function MemberAvatar({ member, index, size = 'lg' }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <HexagonPhoto src={member.photo} name={member.name} size={size} />
      <div className="text-center">
        <p className="font-semibold text-white">{member.name}</p>
        {member.role && (
          <p className="text-text-muted text-sm">{member.role}</p>
        )}
      </div>
    </motion.div>
  )
}

// Composant carte de pôle Admin (full width)
function AdminPoleCard({ pole }) {
  const Icon = pole.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="group"
    >
      <div 
        className="relative p-8 rounded-xl border border-neon-cyan/30 hover:border-neon-cyan/50 bg-neon-cyan/5 transition-all duration-300"
      >
        {/* Header du pôle - centré */}
        <div className="flex flex-col items-center gap-3 mb-6">
          {/* Icône hexagonale */}
            <div className="text-center">
            <h3 className="font-display text-xl font-bold text-neon-cyan">
              {pole.name}
            </h3>
            <p className="text-text-muted text-sm">{pole.description}</p>
          </div>
        </div>

        {/* Membres - en ligne, espacés */}
        <div className="flex flex-wrap justify-around gap-8 md:gap-12 pt-6 border-t border-white/5">
          {pole.members.map((member, idx) => (
            <MemberAvatar key={member.name + idx} member={member} index={idx} size="lg" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Composant carte de pôle
function PoleCard({ pole, index }) {
  const Icon = pole.icon
  const colorClasses = {
    cyan: {
      icon: 'text-neon-cyan',
      border: 'border-neon-cyan/30 hover:border-neon-cyan/50',
      glow: 'group-hover:shadow-neon-cyan',
      bg: 'bg-neon-cyan/5',
    },
    purple: {
      icon: 'text-neon-cyan',
      border: 'border-neon-cyan/30 hover:border-neon-cyan/50',
      glow: 'group-hover:shadow-neon-cyan',
      bg: 'bg-neon-cyan/5',
    },
  }
  const colors = colorClasses[pole.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div 
        className={`relative p-6 rounded-xl border ${colors.border} ${colors.bg} transition-all duration-300 h-full`}
      >
        {/* Header du pôle */}
        <div className="flex items-center gap-3 mb-4">
      
          
          <div>
            <h3 className={`font-display font-bold ${colors.icon}`}>
              {pole.name}
            </h3>
            <p className="text-text-muted text-xs">{pole.description}</p>
          </div>
        </div>

        {/* Membres */}
        <div className="flex flex-wrap justify-around gap-6 pt-4 border-t border-white/5">
          {pole.members.map((member, idx) => (
            <MemberAvatar key={member.name + idx} member={member} index={idx} size="lg" />
          ))}
        </div>
      </div>
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

      

      {/* L'équipe par pôles */}
      <Section className="bg-mvr-darker/50">
        <Container>
          <SectionTitle subtitle="Une équipe organisée en pôles complémentaires">
            L'ÉQUIPE
          </SectionTitle>
          
          {/* Grille de pôles - 2 colonnes */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {poles.filter(p => p.id !== 'admin').map((pole, index) => (
              <PoleCard key={pole.id} pole={pole} index={index} />
            ))}
          </div>

          {/* Pôle Administration - Full width */}
          {poles.filter(p => p.id === 'admin').map((pole, index) => (
            <AdminPoleCard key={pole.id} pole={pole} />
          ))}

          {/* Note */}
          <motion.p 
            className="text-center text-text-muted  mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Et ce ne sont que les responsables de ces pôles! De nombreux autres bénévoles participent à chacun d'entre eux :)
          </motion.p>
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
            <Link to={"/contact"}>
               <Button variant="secondary">
              Nous contacter
            </Button>
            </Link>
         
          </motion.div>
        </Container>
      </Section>
    </>
  )
}