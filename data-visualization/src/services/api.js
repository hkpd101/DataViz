import axios from 'axios';

// Get API URL from environment variables with fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // Data endpoints
  async getHistoricalData(dataType, params = {}) {
    return this.client.get(`/api/v1/data/historical/${dataType}`, { params });
  }

  async getRealTimeData(dataType) {
    return this.client.get(`/api/v1/data/real-time/${dataType}`);
  }

  async getDataSummary(dataType) {
    return this.client.get(`/api/v1/data/summary/${dataType}`);
  }

  async exportDataCSV(dataType, params = {}) {
    const response = await this.client.get(`/api/v1/data/export/${dataType}`, {
      params,
      responseType: 'blob',
    });
    return response;
  }

  // Dashboard endpoints
  async createDashboard(data) {
    return this.client.post('/api/v1/dashboard/create', data);
  }

  async getDashboards(params = {}) {
    return this.client.get('/api/v1/dashboard/list', { params });
  }

  async getDashboard(id) {
    return this.client.get(`/api/v1/dashboard/${id}`);
  }

  async updateDashboard(id, data) {
    return this.client.put(`/api/v1/dashboard/${id}`, data);
  }

  async deleteDashboard(id) {
    return this.client.delete(`/api/v1/dashboard/${id}`);
  }

  // Utility methods
  downloadCSV(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}

export default new ApiService();
