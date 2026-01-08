import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import { Howl, Howler } from 'howler'
import PLAYLIST from '@/config/playlist'

const AudioContext = createContext(null)

export function AudioProvider({ children }) {
  // État du site (verrouillé/déverrouillé)
  const [siteUnlocked, setSiteUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('mvr-unlocked') === 'true'
    }
    return false
  })

  // État du player
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [playlist, setPlaylist] = useState(PLAYLIST)
  const [volume, setVolume] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mvr-volume')
      return saved ? parseFloat(saved) : 0.7
    }
    return 0.7
  })
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Refs
  const howlRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const vantaRef = useRef(null)

  // Track courante
  const currentTrack = playlist[currentTrackIndex] || null

  // Sauvegarder le volume
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mvr-volume', volume.toString())
    }
    Howler.volume(volume)
  }, [volume])

  // Sauvegarder l'état déverrouillé
  useEffect(() => {
    if (siteUnlocked && typeof window !== 'undefined') {
      sessionStorage.setItem('mvr-unlocked', 'true')
    }
  }, [siteUnlocked])

  // Nettoyer le Howl précédent et créer un nouveau
  const loadTrack = useCallback((track) => {
    if (howlRef.current) {
      howlRef.current.unload()
    }

    if (!track?.src) {
      console.warn('No track source provided')
      return
    }

    setIsLoading(true)

    howlRef.current = new Howl({
      src: [track.src],
      html5: true,
      volume: volume,
      onload: () => {
        setDuration(howlRef.current.duration())
        setIsLoading(false)
      },
      onplay: () => {
        setIsPlaying(true)
        progressIntervalRef.current = setInterval(() => {
          if (howlRef.current && howlRef.current.playing()) {
            setProgress(howlRef.current.seek())
          }
        }, 1000)
      },
      onpause: () => {
        setIsPlaying(false)
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
      },
      onstop: () => {
        setIsPlaying(false)
        setProgress(0)
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
      },
      onend: () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length)
      },
      onloaderror: (id, error) => {
        console.error('Error loading audio:', error)
        setIsLoading(false)
      },
      onplayerror: (id, error) => {
        console.error('Error playing audio:', error)
        setIsLoading(false)
        if (howlRef.current) {
          howlRef.current.once('unlock', () => {
            howlRef.current.play()
          })
        }
      },
    })
  }, [volume, playlist.length])

  // Charger la track quand elle change
  useEffect(() => {
    if (currentTrack && siteUnlocked) {
      loadTrack(currentTrack)
      if (howlRef.current) {
        howlRef.current.once('load', () => {
          howlRef.current.play()
        })
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [currentTrackIndex, siteUnlocked, loadTrack, currentTrack])

  // Contrôles
  const play = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.play()
    }
  }, [])

  const pause = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.pause()
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length)
  }, [playlist.length])

  const prevTrack = useCallback(() => {
    if (progress > 3 && howlRef.current) {
      howlRef.current.seek(0)
      setProgress(0)
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
    }
  }, [playlist.length, progress])

  const seek = useCallback((time) => {
    if (howlRef.current) {
      howlRef.current.seek(time)
      setProgress(time)
    }
  }, [])

  const seekPercent = useCallback((percent) => {
    if (howlRef.current && duration) {
      const time = (percent / 100) * duration
      seek(time)
    }
  }, [duration, seek])

  const unlockSite = useCallback(() => {
    setSiteUnlocked(true)
    
    setTimeout(() => {
      if (currentTrack) {
        loadTrack(currentTrack)
        setTimeout(() => {
          if (howlRef.current) {
            howlRef.current.play()
          }
        }, 200)
      }
    }, 100)
  }, [currentTrack, loadTrack])

  const setVantaRef = useCallback((ref) => {
    vantaRef.current = ref
  }, [])

  const setVantaChaos = useCallback((chaos) => {
    if (vantaRef.current && vantaRef.current.setOptions) {
      vantaRef.current.setOptions({ chaos })
    }
  }, [])

  const value = {
    siteUnlocked,
    setSiteUnlocked,
    unlockSite,
    isPlaying,
    isLoading,
    currentTrack,
    currentTrackIndex,
    playlist,
    volume,
    progress,
    duration,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    seekPercent,
    setVolume,
    setPlaylist,
    vantaRef,
    setVantaRef,
    setVantaChaos,
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

export default AudioContext
