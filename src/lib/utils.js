import { clsx } from 'clsx'

/**
 * Combine des classes CSS avec clsx
 * @param  {...any} inputs - Classes CSS à combiner
 * @returns {string} Classes CSS combinées
 */
export function cn(...inputs) {
  return clsx(inputs)
}

/**
 * Génère un slug à partir d'un texte
 * @param {string} text - Texte à transformer
 * @returns {string} Slug généré
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

/**
 * Formate une date en français
 * @param {string|Date} date - Date à formater
 * @param {object} options - Options de formatage
 * @returns {string} Date formatée
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  }
  return new Date(date).toLocaleDateString('fr-FR', defaultOptions)
}

/**
 * Formate une durée en mm:ss
 * @param {number} seconds - Durée en secondes
 * @returns {string} Durée formatée
 */
export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * Vérifie si un événement est à venir
 * @param {string|Date} date - Date de l'événement
 * @returns {boolean}
 */
export function isUpcoming(date) {
  return new Date(date) > new Date()
}

/**
 * Tronque un texte avec ellipsis
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
