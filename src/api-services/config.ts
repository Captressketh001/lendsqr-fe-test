export const API_CONFIG = {
  BASE_URL: 'http://localhost:5174',
  ENDPOINTS: {
    USERS: '/users',
    STATS: '/stats',
  }
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};