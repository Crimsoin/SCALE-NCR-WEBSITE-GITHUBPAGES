/**
 * Team Members API Service
 * Handles all API calls related to team members
 */

import { API_BASE_URL, apiFetch } from './apiConfig';

/**
 * Get all team members (sorted by display_order)
 * @returns {Promise} - Team members data
 */
export const getTeamMembers = async () => {
  const url = `${API_BASE_URL}/team.php`;
  return await apiFetch(url);
};

/**
 * Get team members by role
 * @param {string} role - Role to filter by
 * @returns {Promise} - Filtered team members data
 */
export const getTeamMembersByRole = async (role) => {
  const data = await getTeamMembers();
  
  if (data.success && data.data) {
    return {
      ...data,
      data: data.data.filter(member => 
        member.role.toLowerCase().includes(role.toLowerCase())
      )
    };
  }
  
  return data;
};

/**
 * Get leadership team members
 * @returns {Promise} - Leadership team data
 */
export const getLeadershipTeam = async () => {
  return await getTeamMembersByRole('Director');
};

/**
 * Get staff members
 * @returns {Promise} - Staff members data
 */
export const getStaffMembers = async () => {
  return await getTeamMembersByRole('Manager');
};

export default {
  getTeamMembers,
  getTeamMembersByRole,
  getLeadershipTeam,
  getStaffMembers,
};
