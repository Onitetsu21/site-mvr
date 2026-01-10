import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio } from '@/contexts/AudioContext'

// Fonction easing pour une animation smooth
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default function EntranceGate({ children }) {
  const { siteUnlocked, unlockSite, setVantaChaos } = useAudio()
  const [isAnimating, setIsAnimating] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(!siteUnlocked)

  // Gérer le scroll (désactivé tant que locked)
  useEffect(() => {
    if (siteUnlocked) {
      document.body.classList.remove('scroll-locked')
    } else {
      document.body.classList.add('scroll-locked')
    }

    return () => {
      document.body.classList.remove('scroll-locked')
    }
  }, [siteUnlocked])

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

    // 3. Faire disparaître le bouton après un délai
    setTimeout(() => {
      setButtonVisible(false)
    }, 600)
  }, [isAnimating, animateChaos, unlockSite])

  // Si déjà déverrouillé
  useEffect(() => {
    if (siteUnlocked) {
      setButtonVisible(false)
    }
  }, [siteUnlocked])

  return (
    <>
      {/* Le site est TOUJOURS rendu - le Vanta de la Home sera visible */}
      {children}

      {/* Overlay du bouton Play (par-dessus tout) */}
      <AnimatePresence>
        {buttonVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex min-h-screen-safe items-center justify-center pointer-events-auto"
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
                transition={{ duration: 0.5, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
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
               <motion.div
                  animate={isAnimating ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className="w-10 h-10 md:w-12 md:h-12 text-neon-cyan"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>

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

    </>
  )
}