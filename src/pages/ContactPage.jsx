import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { Container, Section, PageHeader } from '@/components/layout/Section'
import { Button, Card, Input, Textarea, Select } from '@/components/ui'

// Options du select sujet
const subjectOptions = [
  { value: '', label: 'Choisir un sujet...' },
  { value: 'demo', label: '🎵 Envoyer une demo' },
  { value: 'booking', label: '🎧 Booking artiste' },
  { value: 'partenariat', label: '🤝 Proposition de partenariat' },
  { value: 'benevole', label: '💪 Devenir bénévole' },
  { value: 'presse', label: '📰 Demande presse / média' },
  { value: 'autre', label: '💬 Autre demande' },
]

// Liens sociaux
const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/multiversal.records.mvr',
    icon: '📷',
  },
  {
    name: 'SoundCloud',
    url: 'https://soundcloud.com/multiversalrecords-mvr',
    icon: '🔊',
  },
  {
    name: 'Bandcamp',
    url: 'https://multiversalrecords.bandcamp.com',
    icon: '💿',
  },
  {
    name: 'Beatport',
    url: 'https://www.beatport.com/label/multiversal-records/75858',
    icon: '🎹',
  },
]

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const initialSubject = searchParams.get('subject') || ''

  const [formData, setFormData] = useState({
    subject: initialSubject,
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.subject) {
      newErrors.subject = 'Veuillez sélectionner un sujet'
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Veuillez entrer votre nom'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Veuillez entrer votre email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Veuillez entrer un message'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message trop court (minimum 10 caractères)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setStatus('loading')

    try {
      // Simuler l'envoi (à remplacer par l'appel Supabase/API)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // En production, utiliser Supabase ou un service d'email
      // await sendContactMessage(formData)
      
      setStatus('success')
      setFormData({ subject: '', name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader
        title="CONTACT"
        subtitle="Une question ? Un projet ? Une demo à nous soumettre ? On est là."
      />

      <Section padding="sm">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="elevated" className="p-6 md:p-8">
                {status === 'success' ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Merci pour ton message. On te répond dès que possible.
                    </p>
                    <Button 
                      variant="secondary"
                      onClick={() => setStatus('idle')}
                    >
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Select
                      label="Sujet"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      options={subjectOptions.slice(1)}
                      placeholder="Choisir un sujet..."
                      required
                      error={errors.subject}
                    />

                    <Input
                      label="Nom"
                      name="name"
                      type="text"
                      placeholder="Ton nom ou pseudo"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      error={errors.name}
                    />

                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="ton@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      error={errors.email}
                    />

                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Dis-nous tout..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      error={errors.message}
                    />

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Erreur lors de l'envoi. Réessaie ou contacte-nous directement par email.</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      icon={Send}
                      loading={status === 'loading'}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* Infos de contact */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Email direct */}
              <Card variant="glass" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white mb-1">
                      Email direct
                    </h3>
                    <a 
                      href="mailto:multiversal.records.mail@gmail.com"
                      className="text-neon-cyan hover:text-neon-purple transition-colors"
                    >
                      multiversal.records.mail@gmail.com
                    </a>
                    <p className="text-text-muted text-sm mt-2">
                      On répond généralement sous 48-72h
                    </p>
                  </div>
                </div>
              </Card>

              {/* Localisation */}
              <Card variant="glass" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-neon-purple" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white mb-1">
                      Localisation
                    </h3>
                    <p className="text-text-secondary">
                      Lyon, France
                    </p>
                    <p className="text-text-muted text-sm mt-2">
                      Actifs dans toute la région Auvergne-Rhône-Alpes
                    </p>
                  </div>
                </div>
              </Card>

              {/* Réseaux sociaux */}
              <Card variant="glass" className="p-6">
                <h3 className="font-display font-bold text-white mb-4">
                  Nous suivre
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-text-secondary hover:text-white"
                    >
                      <span>{link.icon}</span>
                      <span className="text-sm font-medium">{link.name}</span>
                    </a>
                  ))}
                </div>
              </Card>

              {/* Tips selon le sujet */}
              <Card variant="elevated" className="p-6 border-neon-cyan/20">
                <h3 className="font-display font-bold text-white mb-3">
                  💡 Tips
                </h3>
                <ul className="space-y-2 text-text-secondary text-sm">
                  <li>
                    <strong className="text-neon-cyan">Demos :</strong> Envoie un lien SoundCloud/WeTransfer, pas de pièce jointe
                  </li>
                  <li>
                    <strong className="text-neon-purple">Booking :</strong> Précise les dates et le format d'event
                  </li>
                  <li>
                    <strong className="text-neon-pink">Bénévolat :</strong> Dis-nous quel(s) pôle(s) t'intéresse(nt)
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  )
}
