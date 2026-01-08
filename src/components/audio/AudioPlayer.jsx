import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronRight, ChevronLeft, Music2 } from 'lucide-react'
import { useAudio } from '@/contexts/AudioContext'
import { cn } from '@/lib/utils'

// Composant Equalizer animé (indicateur quand le player joue)
function Equalizer({ isPlaying }) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-neon-cyan rounded-full"
          animate={isPlaying ? {
            height: ['4px', '16px', '8px', '14px', '4px'],
          } : {
            height: '4px',
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Barre de progression
function ProgressBar({ progress, duration, onSeek }) {
  const percent = duration > 0 ? (progress / duration) * 100 : 0

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = (x / rect.width) * 100
    onSeek(percent)
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full">
      <div
        className="h-1 bg-white/10 rounded-full cursor-pointer group relative"
        onClick={handleClick}
      >
        {/* Progress */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-neon-cyan rounded-full"
          style={{ width: `${percent}%` }}
        />
        {/* Hover indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-neon-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-neon-cyan"
          style={{ left: `calc(${percent}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-text-muted mt-1 font-mono">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}

// Slider de volume
function VolumeSlider({ volume, onChange }) {
  const [isMuted, setIsMuted] = useState(false)
  const [prevVolume, setPrevVolume] = useState(volume)

  const toggleMute = () => {
    if (isMuted) {
      onChange(prevVolume)
      setIsMuted(false)
    } else {
      setPrevVolume(volume)
      onChange(0)
      setIsMuted(true)
    }
  }

  const handleChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    onChange(newVolume)
    if (newVolume > 0) setIsMuted(false)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMute}
        className="text-text-muted hover:text-neon-cyan transition-colors"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleChange}
        className="w-16 h-1 appearance-none bg-white/10 rounded-full cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-2
          [&::-webkit-slider-thumb]:h-2
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-neon-cyan
          [&::-webkit-slider-thumb]:shadow-neon-cyan
          [&::-webkit-slider-thumb]:cursor-pointer
        "
      />
    </div>
  )
}

export default function AudioPlayer() {
  const {
    siteUnlocked,
    isPlaying,
    isLoading,
    currentTrack,
    volume,
    progress,
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    seekPercent,
    setVolume,
  } = useAudio()

  const [isExpanded, setIsExpanded] = useState(false)

  // Ne pas afficher si le site n'est pas déverrouillé
  if (!siteUnlocked) return null

  return (
    <>
      {/* Version rétractée (indicateur) */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => setIsExpanded(true)}
            className="fixed left-0 top-3 -translate-y-1/2 z-[150] flex items-center gap-2 pl-3 pr-2 py-3 bg-mvr-surface/90 backdrop-blur-md border border-white/10 border-l-0 rounded-r-lg cursor-pointer group hover:border-neon-cyan/30 transition-colors"
            style={{
              boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Equalizer ou icône */}
            <div className="flex flex-col items-center gap-2">
              <Equalizer isPlaying={isPlaying} />
              <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-neon-cyan transition-colors" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Version étendue (player complet) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-2 -translate-y-1/2 z-[150] w-72 bg-mvr-surface/95 backdrop-blur-md border border-white/10 border-l-0 rounded-r-2xl overflow-hidden"
            style={{
              boxShadow: '8px 0 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.05)',
            }}
          >
            {/* Header avec bouton fermer */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs font-display text-text-secondary uppercase tracking-wider">
                  Now Playing
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/5 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            {/* Contenu du player */}
            <div className="p-4">
              {currentTrack ? (
                <>
                  {/* Cover */}
                  <div className="relative aspect-square w-full mb-4 rounded-lg overflow-hidden bg-mvr-elevated">
                    {currentTrack.cover ? (
                      <img
                        src={currentTrack.cover}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music2 className="w-16 h-16 text-neon-cyan/30" />
                      </div>
                    )}
                    
                    {/* Overlay glow quand ça joue */}
                    {isPlaying && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{
                          boxShadow: [
                            'inset 0 0 20px rgba(0, 240, 255, 0.1)',
                            'inset 0 0 40px rgba(0, 240, 255, 0.2)',
                            'inset 0 0 20px rgba(0, 240, 255, 0.1)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Info track */}
                  <div className="mb-4 text-center">
                    <h4 className="font-semibold text-white truncate">
                      {currentTrack.title}
                    </h4>
                    <p className="text-sm text-text-muted truncate">
                      {currentTrack.artist}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <ProgressBar
                    progress={progress}
                    duration={duration}
                    onSeek={seekPercent}
                  />

                  {/* Contrôles */}
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <button
                      onClick={prevTrack}
                      className="p-2 text-text-muted hover:text-white transition-colors"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                      onClick={togglePlay}
                      disabled={isLoading}
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                        "bg-neon-cyan/10 border border-neon-cyan/50 hover:bg-neon-cyan/20",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                      style={{
                        boxShadow: isPlaying ? '0 0 20px rgba(0, 240, 255, 0.3)' : 'none',
                      }}
                    >
                      {isLoading ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      ) : isPlaying ? (
                        <Pause className="w-5 h-5 text-neon-cyan" />
                      ) : (
                        <Play className="w-5 h-5 text-neon-cyan ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={nextTrack}
                      className="p-2 text-text-muted hover:text-white transition-colors"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Volume */}
                  <div className="flex justify-center mt-4">
                    <VolumeSlider volume={volume} onChange={setVolume} />
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-text-muted">
                  <Music2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucune track</p>
                </div>
              )}
            </div>

            {/* Footer décoratif */}
            <div className="h-[2px] bg-gradient-to-r from-neon-cyan/50 via-neon-purple/50 to-neon-cyan/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
