/**
 * Startups & Consortium API Service
 * Handles all API calls related to startups and consortium members
 */

import { API_BASE_URL, apiFetch, buildQueryString } from './apiConfig';

/**
 * Get list of startups and/or consortium members
 * @param {object} filters - Filter options
 * @param {string} filters.type - 'startup' or 'consortium'
 * @param {boolean} filters.featured - Only featured items
 * @param {string} filters.industry - Filter by industry
 * @param {string} filters.incubator - Filter by incubator
 * @param {number} filters.limit - Number of results (default: 100)
 * @param {number} filters.offset - Pagination offset
 * @returns {Promise} - Startups data
 */
export const getStartups = async (filters = {}) => {
  const queryString = buildQueryString(filters);
  const url = `${API_BASE_URL}/startups.php${queryString}`;
  
  return await apiFetch(url);
};

/**
 * Get featured startups only
 * @param {number} limit - Number of results
 * @returns {Promise} - Featured startups data
 */
export const getFeaturedStartups = async (limit = 6) => {
  return await getStartups({ featured: 1, limit });
};

/**
 * Get startups by type
 * @param {string} type - 'startup' or 'consortium'
 * @param {number} limit - Number of results
 * @returns {Promise} - Filtered startups data
 */
export const getStartupsByType = async (type, limit = 100) => {
  return await getStartups({ type, limit });
};

/**
 * Get startups by industry
 * @param {string} industry - Industry name
 * @param {number} limit - Number of results
 * @returns {Promise} - Filtered startups data
 */
export const getStartupsByIndustry = async (industry, limit = 100) => {
  return await getStartups({ industry, limit });
};

/**
 * Get startups by incubator
 * @param {string} incubator - Incubator name
 * @param {number} limit - Number of results
 * @returns {Promise} - Filtered startups data
 */
export const getStartupsByIncubator = async (incubator, limit = 100) => {
  return await getStartups({ incubator, limit });
};

/**
 * Get single startup/consortium by ID
 * @param {number} id - Startup/Consortium ID
 * @returns {Promise} - Single startup data
 */
export const getStartupById = async (id) => {
  const url = `${API_BASE_URL}/startups.php?id=${id}`;
  return await apiFetch(url);
};

/**
 * Get all startups (both types)
 * @returns {Promise} - All startups data
 */
export const getAllStartups = async () => {
  return await getStartups({});
};

/**
 * Get only startup companies (exclude consortium)
 * @returns {Promise} - Startup companies data
 */
export const getStartupCompanies = async () => {
  return await getStartups({ type: 'startup' });
};

/**
 * Get only consortium members (exclude startups)
 * @returns {Promise} - Consortium members data
 */
export const getConsortiumMembers = async () => {
  return await getStartups({ type: 'consortium' });
};

export default {
  getStartups,
  getFeaturedStartups,
  getStartupsByType,
  getStartupsByIndustry,
  getStartupsByIncubator,
  getAllStartups,
  getStartupCompanies,
  getConsortiumMembers,
};
