// =====================================================
// CONFIGURATION DES TRACKS AUDIO MVR
// =====================================================
// 
// Pour ajouter des tracks, deux options :
//
// OPTION 1 : Fichiers MP3 locaux (recommandé)
// - Place tes fichiers MP3 dans /public/audio/
// - Référence-les avec : src: '/audio/nom-du-fichier.mp3'
//
// OPTION 2 : URLs externes
// - Utilise des liens directs vers des MP3 (pas des pages Bandcamp/SoundCloud)
// - Tu peux utiliser des services comme :
//   - Archive.org (pour des tracks libres)
//   - Ton propre CDN/serveur
//   - AWS S3 / Cloudflare R2 / etc.
//
// IMPORTANT : Les URLs Bandcamp de type "bandcamp.com/track/..." ne marchent pas
// car ce ne sont pas des liens directs vers les fichiers audio.
// =====================================================

export const PLAYLIST = [
  // Track d'exemple (remplace par tes vraies tracks)
  {
    id: 3,
    title: 'Split Theory',
    artist: 'Nidra',
    src: '/audio/split-theory.mp3',
    cover: '/releases/split.jpg',
  },
  {
    id: 4,
    title: 'Welcome In Wonderland',
    artist: 'Unlucide',
    src: '/audio/welcome-in-wonderland.mp3',
    cover: '/covers/welcome-in-wonderland.jpg',
  },
  {
    id: 5,
    title: 'Funkadelic Gates',
    artist: 'Psy Fact',
    src: '/audio/funkadelic-gates.mp3',
    cover: '/covers/funkadelic-gates.jpg',
  },
]

// =====================================================
// POUR TESTER RAPIDEMENT
// =====================================================
// Tu peux utiliser cette track de test libre de droits :
// 
// export const PLAYLIST = [
//   {
//     id: 1,
//     title: 'Test Track',
//     artist: 'MVR Test',
//     src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
//     cover: null,
//   },
// ]
// =====================================================

export default PLAYLIST
