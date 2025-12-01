/**
 * Events API Service
 * Handles all API calls related to news and events
 */

import { API_BASE_URL, apiFetch, buildQueryString } from './apiConfig';

/**
 * Get list of events
 * @param {object} filters - Filter options
 * @param {string} filters.status - 'published' or 'draft' (only published by default)
 * @param {string} filters.from_date - Filter events from this date (YYYY-MM-DD)
 * @param {string} filters.to_date - Filter events to this date (YYYY-MM-DD)
 * @param {string} filters.search - Search term for title/description
 * @param {number} filters.limit - Number of results (default: 50)
 * @param {number} filters.offset - Pagination offset
 * @returns {Promise} - Events data
 */
export const getEvents = async (filters = {}) => {
  const queryString = buildQueryString(filters);
  const url = `${API_BASE_URL}/events.php${queryString}`;
  
  return await apiFetch(url);
};

/**
 * Get single event by ID
 * @param {number} id - Event ID
 * @returns {Promise} - Single event data
 */
export const getEventById = async (id) => {
  const url = `${API_BASE_URL}/events.php?id=${id}`;
  return await apiFetch(url);
};

/**
 * Get single event by slug (SEO-friendly)
 * @param {string} slug - Event slug
 * @returns {Promise} - Single event data
 */
export const getEventBySlug = async (slug) => {
  const url = `${API_BASE_URL}/events.php?slug=${slug}`;
  return await apiFetch(url);
};

/**
 * Get published events only (default view)
 * @param {number} limit - Number of results
 * @returns {Promise} - Published events data
 */
export const getPublishedEvents = async (limit = 50) => {
  return await getEvents({ status: 'published', limit });
};

/**
 * Get upcoming events (from today onwards)
 * @param {number} limit - Number of results
 * @returns {Promise} - Upcoming events data
 */
export const getUpcomingEvents = async (limit = 50) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return await getEvents({ 
    status: 'published', 
    from_date: today, 
    limit 
  });
};

/**
 * Get past events (before today)
 * @param {number} limit - Number of results
 * @returns {Promise} - Past events data
 */
export const getPastEvents = async (limit = 50) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return await getEvents({ 
    status: 'published', 
    to_date: today, 
    limit 
  });
};

/**
 * Search events by term
 * @param {string} searchTerm - Search query
 * @param {number} limit - Number of results
 * @returns {Promise} - Search results data
 */
export const searchEvents = async (searchTerm, limit = 50) => {
  return await getEvents({ 
    search: searchTerm, 
    status: 'published', 
    limit 
  });
};

/**
 * Get events in date range
 * @param {string} fromDate - Start date (YYYY-MM-DD)
 * @param {string} toDate - End date (YYYY-MM-DD)
 * @param {number} limit - Number of results
 * @returns {Promise} - Events in date range
 */
export const getEventsByDateRange = async (fromDate, toDate, limit = 50) => {
  return await getEvents({ 
    from_date: fromDate, 
    to_date: toDate, 
    status: 'published', 
    limit 
  });
};

/**
 * Get recent events (latest first)
 * @param {number} limit - Number of results
 * @returns {Promise} - Recent events data
 */
export const getRecentEvents = async (limit = 10) => {
  return await getEvents({ 
    status: 'published', 
    limit 
  });
};

export default {
  getEvents,
  getEventById,
  getPublishedEvents,
  getUpcomingEvents,
  getPastEvents,
  searchEvents,
  getEventsByDateRange,
  getRecentEvents,
};
