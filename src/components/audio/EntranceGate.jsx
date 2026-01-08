import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '@/contexts/AudioContext'
import VantaBackground from '@/components/layout/VantaBackground'

// Fonction easing pour une animation smooth
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default function EntranceGate({ children }) {
  const { siteUnlocked, unlockSite, setVantaChaos } = useAudio()
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(siteUnlocked)
  const [buttonVisible, setButtonVisible] = useState(!siteUnlocked)

  // Animation du chaos Vanta
  const animateChaos = useCallback(() => {
    const startTime = performance.now()
    const duration = 1500 // 1.5 secondes
    const startChaos = 0
    const endChaos = 2

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const currentChaos = startChaos + (endChaos - startChaos) * easedProgress

      setVantaChaos(currentChaos)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [setVantaChaos])

  // Handler du clic sur le bouton play
  const handleEnter = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)

    // 1. Démarrer l'animation du chaos
    animateChaos()

    // 2. Déverrouiller le site (lance l'audio)
    unlockSite()

    // 3. Faire disparaître le bouton
    setTimeout(() => {
      setButtonVisible(false)
    }, 300)

    // 4. Après l'animation du chaos, afficher le contenu
    setTimeout(() => {
      setShowContent(true)
    }, 800)
  }, [isAnimating, animateChaos, unlockSite])

  // Si déjà déverrouillé, initialiser le chaos
  useEffect(() => {
    if (siteUnlocked) {
      setVantaChaos(2)
      setShowContent(true)
      setButtonVisible(false)
    }
  }, [siteUnlocked, setVantaChaos])

  return (
    <div className="relative min-h-screen bg-mvr-dark">
      {/* Vanta Background - TOUJOURS VISIBLE */}
      <div className="min-h-screen absolute top-1 left-0 right-0 z-0">
        <VantaBackground className="max-h-[80vh]" />
      </div>

      {/* Overlay du bouton Play (par-dessus le Vanta, sous le contenu) */}
      <AnimatePresence>
        {buttonVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            {/* Bouton Play central */}
            <div className="relative flex flex-col items-center">
              {/* Cercles décoratifs animés */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Cercle externe pulsant */}
                <motion.div
                  className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border border-neon-cyan/20"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Cercle moyen */}
                <motion.div
                  className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border border-neon-cyan/30"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.4, 0.2, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.2,
                  }}
                />
              </div>

              {/* Bouton Play */}
              <motion.button
                onClick={handleEnter}
                disabled={isAnimating}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-mvr-surface/50 backdrop-blur-sm border-2 border-neon-cyan/50 flex items-center justify-center group cursor-pointer overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 0 40px rgba(0, 240, 255, 0.3), inset 0 0 30px rgba(0, 240, 255, 0.1)',
                }}
              >
                {/* Glow animé */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
                      '0 0 40px rgba(0, 240, 255, 0.5), 0 0 80px rgba(0, 240, 255, 0.2)',
                      '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Ripple effect au hover */}
               

                {/* Icône Play */}
                <motion.img
                  animate={isAnimating ? { scale: 0, opacity: 0 } : { scale: .8, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  src="/logomvrcyan.png"
                  whileHover={{ scale: 0.5 }}
                />

                {/* Spinner pendant l'animation */}
                {isAnimating && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute"
                  >
                    <motion.div
                      className="w-12 h-12 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                )}
              </motion.button>

              {/* Texte sous le bouton */}
              <motion.div
                className="mt-8 text-center absolute bottom-[-90px] w-full flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-display text-sm md:text-base text-neon-cyan tracking-[0.3em] uppercase">
                  Enter the Multiverse
                </p>
             
              </motion.div>

      

            </div>

     
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu du site (apparaît après déverrouillage) */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
