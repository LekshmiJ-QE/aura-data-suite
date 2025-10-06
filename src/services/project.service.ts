import { apiClient } from '@/lib/api-client';
import { Project, ProjectCreate } from '@/types/project';

export const projectService = {
  async getAll() {
    return apiClient.get<Project[]>('/projects/');
  },

  async getById(id: number) {
    return apiClient.get<Project>(`/projects/${id}`);
  },

  async create(project: ProjectCreate) {
    return apiClient.post<Project>('/projects/', project);
  },

  async update(id: number, project: ProjectCreate) {
    return apiClient.put<Project>(`/projects/${id}`, project);
  },

  async delete(id: number) {
    return apiClient.delete<Project>(`/projects/${id}`);
  },
};
