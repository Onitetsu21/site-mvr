import { useEffect, useRef, useState } from 'react'

export default function VantaBackground({ className = '' }) {
  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)

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

    // Initialiser l'effet
    if (vantaRef.current && window.VANTA) {
      const effect = window.VANTA.TRUNK({
        el: vantaRef.current,
        p5: window.p5,  // <-- Passer p5 explicitement
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00f0ff,
        backgroundColor: 0x050508,
        spacing: 11.00,
        chaos: 6.00,
        waveSpeed: 0.5  
      })
      setVantaEffect(effect)
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
  }, [])

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
      className={`absolute inset-0 -z-10 ${className}`}
      style={{ minHeight: '100%' }}
    />
  )
}
