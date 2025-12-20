import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Share2, GraduationCap, Leaf, Compass, ArrowRight } from 'lucide-react'
import { Button, SectionTitle } from '@/components/ui'

const values = [
  {
    icon: Heart,
    title: 'Respect',
    description: 'Un dancefloor safe et bienveillant pour tous·tes',
    color: 'text-red-400',
  },
  {
    icon: Share2,
    title: 'Partage',
    description: 'La musique comme vecteur de connexion',
    color: 'text-neon-cyan',
  },
  {
    icon: GraduationCap,
    title: 'Transmission',
    description: 'Accompagner les artistes émergents',
    color: 'text-yellow-400',
  },
  {
    icon: Leaf,
    title: 'Écoresponsabilité',
    description: 'Réduire notre impact, soirée après soirée',
    color: 'text-green-400',
  },
  {
    icon: Compass,
    title: 'Ouverture',
    description: 'Explorer sans frontières sonores ni humaines',
    color: 'text-neon-purple',
  },
]

export function ValuesSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <SectionTitle align="center" subtitle="Ce qui nous guide">
        Nos valeurs
      </SectionTitle>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-10">
        {values.map((value, i) => {
          const Icon = value.icon
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="card-glass p-6 text-center h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-mvr-darker flex items-center justify-center ${value.color}`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button asChild variant="ghost">
          <Link to="/about">
            En savoir plus sur nous
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
