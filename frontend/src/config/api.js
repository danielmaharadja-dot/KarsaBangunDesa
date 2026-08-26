/**
 * Base URL API Backend diambil dari Vite Environment Variable VITE_API_BASE_URL.
 * Jika VITE_API_BASE_URL tidak disetel, secara otomatis akan menggunakan relatif path ('').
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Helper function untuk menghasilkan URL API lengkap.
 * @param {string} path - contoh: '/api/programs' atau '/api/contact'
 * @returns {string} - contoh: 'http://localhost:4000/api/programs'
 */
export function getApiUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}
