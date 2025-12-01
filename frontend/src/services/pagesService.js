/**
 * Pages API Service
 * Handles all API calls related to page content (Home, About, etc.)
 */

import { API_BASE_URL, apiFetch } from './apiConfig';

/**
 * Get Home page content
 * @returns {Promise} - Home page data with parsed JSON content
 */
export const getHomePage = async () => {
  const url = `${API_BASE_URL}/pages.php?slug=home`;
  return await apiFetch(url);
};

/**
 * Get About page content
 * @returns {Promise} - About page data with parsed JSON content
 */
export const getAboutPage = async () => {
  const url = `${API_BASE_URL}/pages.php?slug=about`;
  return await apiFetch(url);
};

/**
 * Get Contact page content
 * @returns {Promise} - Contact page data with parsed JSON content
 */
export const getContactPage = async () => {
  const url = `${API_BASE_URL}/pages.php?slug=contact`;
  return await apiFetch(url);
};

/**
 * Get specific page section content
 * @param {string} pageName - Page name ('home' or 'about')
 * @param {string} sectionKey - Section key to extract
 * @returns {Promise} - Specific section data
 */
export const getPageSection = async (pageName, sectionKey) => {
  const data = await apiFetch(`${API_BASE_URL}/pages.php?slug=${pageName}`);
  
  if (data.success && data.data && data.data.content) {
    return {
      success: true,
      data: data.data.content[sectionKey] || null
    };
  }
  
  return data;
};

/**
 * Get Home page hero section
 * @returns {Promise} - Hero section data
 */
export const getHomeHero = async () => {
  return await getPageSection('home', 'hero');
};

/**
 * Get Home page about section
 * @returns {Promise} - About section data
 */
export const getHomeAbout = async () => {
  return await getPageSection('home', 'about');
};

/**
 * Get Home page services section
 * @returns {Promise} - Services section data
 */
export const getHomeServices = async () => {
  return await getPageSection('home', 'services');
};

/**
 * Get About page mission section
 * @returns {Promise} - Mission section data
 */
export const getAboutMission = async () => {
  return await getPageSection('about', 'mission');
};

/**
 * Get About page vision section
 * @returns {Promise} - Vision section data
 */
export const getAboutVision = async () => {
  return await getPageSection('about', 'vision');
};

export default {
  getHomePage,
  getAboutPage,
  getContactPage,
  getPageSection,
  getHomeHero,
  getHomeAbout,
  getHomeServices,
  getAboutMission,
  getAboutVision,
};
