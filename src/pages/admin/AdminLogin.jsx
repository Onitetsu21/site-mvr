import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Pour le développement, on simule une connexion
      // En production, utiliser Supabase Auth
      if (email === 'admin@mvr.fr' && password === 'admin') {
        // Simulation de connexion réussie
        localStorage.setItem('mvr_admin_logged', 'true')
        navigate('/admin/dashboard')
        return
      }

      // Tentative de connexion Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

      navigate('/admin/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError('Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-mvr-dark flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-mvr-dark via-mvr-darker to-[#0a0515]" />
      <div className="fixed inset-0 bg-grid opacity-20" />
      
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card variant="elevated" className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div 
                className="absolute inset-0 border-2 border-neon-cyan"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              />
              <div 
                className="absolute inset-1 bg-neon-cyan/10 flex items-center justify-center"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                <Lock className="w-6 h-6 text-neon-cyan" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Admin MVR
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              Backoffice Multiversal Records
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-mvr-surface border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-mvr-surface border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              Se connecter
            </Button>
          </form>

          {/* Dev mode notice */}
          <div className="mt-6 p-4 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
            <p className="text-neon-purple text-xs font-medium mb-1">
              Mode développement
            </p>
            <p className="text-text-muted text-xs">
              Email: admin@mvr.fr<br />
              Password: admin
            </p>
          </div>
        </Card>

        {/* Back to site */}
        <p className="text-center mt-6">
          <a 
            href="/" 
            className="text-text-secondary hover:text-neon-cyan transition-colors text-sm"
          >
            ← Retour au site
          </a>
        </p>
      </motion.div>
    </div>
  )
}
