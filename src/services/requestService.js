import apiClient from './api';

const requestService = {
  createRequest: (requestData) => apiClient.post('/requests', requestData),
  getMyRequests: (filters) => apiClient.get('/requests', { params: filters }),
  getRequestById: (id) => apiClient.get(`/requests/${id}`),
  updateStatus: (id, status) => apiClient.patch(`/requests/${id}/status`, { status }),
  cancelRequest: (id) => apiClient.delete(`/requests/${id}`),
  getSkillRequests: (skillId) => apiClient.get(`/requests/skill/${skillId}`),
};

export default requestService;
