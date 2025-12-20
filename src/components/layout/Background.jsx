import { motion } from 'framer-motion'

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-mvr-dark via-mvr-darker to-[#030306]" />
      
      {/* Grid pattern subtil */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Quelques formes géométriques flottantes - très subtiles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Hexagone en haut à droite */}
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 opacity-[0.03]"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
            scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <div 
            className="w-full h-full border border-neon-cyan"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          />
        </motion.div>

        {/* Hexagone en bas à gauche */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 opacity-[0.02]"
          animate={{ 
            rotate: -360,
          }}
          transition={{ 
            duration: 180, 
            repeat: Infinity, 
            ease: 'linear'
          }}
        >
          <div 
            className="w-full h-full border border-neon-purple"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          />
        </motion.div>

        {/* Lignes diagonales subtiles */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/5 to-transparent transform -rotate-12" />
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-purple/5 to-transparent transform rotate-6" />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,2,4,0.5)_100%)]" />
    </div>
  )
}
