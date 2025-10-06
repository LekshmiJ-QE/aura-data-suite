import { apiClient } from '@/lib/api-client';
import { Environment, EnvironmentCreate } from '@/types/environment';

export const environmentService = {
  async getAll() {
    return apiClient.get<Environment[]>('/environments/');
  },

  async getById(id: number) {
    return apiClient.get<Environment>(`/environments/${id}`);
  },

  async create(environment: EnvironmentCreate) {
    return apiClient.post<Environment>('/environments/', environment);
  },

  async update(id: number, environment: EnvironmentCreate) {
    return apiClient.put<Environment>(`/environments/${id}`, environment);
  },

  async delete(id: number) {
    return apiClient.delete<Environment>(`/environments/${id}`);
  },
};
