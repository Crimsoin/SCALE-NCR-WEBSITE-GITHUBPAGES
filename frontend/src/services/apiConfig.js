/**
 * API Configuration
 * Central configuration for all API calls
 */

// Determine API base URL based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// API Base URLs
export const API_BASE_URL = isDevelopment || isLocalhost
  ? 'http://localhost:8000/api'
  : '/api'; // Production: assumes API is in same domain

// Upload Base URL for images
export const UPLOAD_BASE_URL = isDevelopment || isLocalhost
  ? 'http://localhost:8000/uploads'
  : '/uploads';

/**
 * Fetch wrapper with error handling
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options
 * @returns {Promise} - Response data
 */
export const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Build query string from params object
 * @param {object} params - Query parameters
 * @returns {string} - Query string
 */
export const buildQueryString = (params) => {
  const query = Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  return query ? `?${query}` : '';
};

export default {
  API_BASE_URL,
  UPLOAD_BASE_URL,
  apiFetch,
  buildQueryString,
};
