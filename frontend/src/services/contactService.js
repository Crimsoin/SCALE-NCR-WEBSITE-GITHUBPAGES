/**
 * Contact Form API Service
 * Handles contact form submission
 */

import { API_BASE_URL, apiFetch } from './apiConfig';

/**
 * Send contact form data
 * @param {object} formData - Contact form data
 * @param {string} formData.name - Sender's name
 * @param {string} formData.email - Sender's email
 * @param {string} formData.subject - Email subject
 * @param {string} formData.message - Email message
 * @returns {Promise} - Response data
 */
export const sendContactForm = async (formData) => {
  const url = `${API_BASE_URL}/send-email.php`;
  
  // Validate required fields
  const requiredFields = ['name', 'email', 'subject', 'message'];
  const missingFields = requiredFields.filter(field => !formData[field]);
  
  if (missingFields.length > 0) {
    return {
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return {
      success: false,
      message: 'Invalid email format'
    };
  }
  
  // Send POST request
  return await apiFetch(url, {
    method: 'POST',
    body: JSON.stringify(formData)
  });
};

/**
 * Validate contact form data
 * @param {object} formData - Contact form data
 * @returns {object} - Validation result
 */
export const validateContactForm = (formData) => {
  const errors = {};
  
  // Name validation
  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  // Email validation
  if (!formData.email || formData.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
  }
  
  // Subject validation
  if (!formData.subject || formData.subject.trim().length === 0) {
    errors.subject = 'Subject is required';
  } else if (formData.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }
  
  // Message validation
  if (!formData.message || formData.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  sendContactForm,
  validateContactForm,
};
