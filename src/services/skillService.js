import apiClient from './api';

const skillService = {
  getAllSkills: (filters) => apiClient.get('/skills', { params: filters }),
  getSkillById: (id) => apiClient.get(`/skills/${id}`),
  getUserSkills: (userId) => apiClient.get(`/skills/user/${userId}`),
  searchSkills: (query) => apiClient.get('/skills/search', { params: { query } }),
  createSkill: (skillData) => apiClient.post('/skills', skillData),
  updateSkill: (id, skillData) => apiClient.put(`/skills/${id}`, skillData),
  deleteSkill: (id) => apiClient.delete(`/skills/${id}`),
};

export default skillService;
