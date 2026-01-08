import { useEffect, useRef, useState } from 'react'
import { useAudio } from '@/contexts/AudioContext'

export default function VantaBackground({ className = '' }) {
  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)
  const { siteUnlocked, setVantaRef } = useAudio()

  useEffect(() => {
    // Charger les scripts dynamiquement
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Vérifier si le script existe déjà
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const initVanta = async () => {
      try {
        // Charger p5.js (requis pour TRUNK)
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js')
        
        // Puis Vanta TRUNK
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.trunk.min.js')

        // Initialiser l'effet avec chaos = 0 si pas encore déverrouillé, 2 sinon
        if (vantaRef.current && window.VANTA) {
          const initialChaos = siteUnlocked ? 2 : 0
          
          const effect = window.VANTA.TRUNK({
            el: vantaRef.current,
            p5: window.p5,
            mouseControls: true,
            touchControls: true,
            gyroControls: true,
            minHeight: 300.00,
            minWidth: 300.00,
            scale: 1.0,
            scaleMobile: 1.00,
            color: 0x00f0ff,
            backgroundColor: 0x030306,
            spacing: 2.50,
            chaos: initialChaos,
          })
          
          setVantaEffect(effect)
          
          // Exposer la ref au contexte audio pour le contrôle externe
          setVantaRef(effect)
        }
      } catch (error) {
        console.error('Failed to load Vanta.js:', error)
      }
    }

    initVanta()

    // Cleanup
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, []) // Ne recharger que au mount

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect) {
        vantaEffect.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [vantaEffect])

  return (
    <div 
      ref={vantaRef} 
      className={`absolute inset-0 ${className}`}
      style={{ minHeight: '100%' }}
    />
  )
}
