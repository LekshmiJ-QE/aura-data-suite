import { apiClient } from '@/lib/api-client';
import { TDMTool, TDMToolCreate, TDMToolUpdate } from '@/types/tdm-tool';

export const tdmToolService = {
  async getAll() {
    return apiClient.get<TDMTool[]>('/tdm-tools/');
  },

  async getById(id: number) {
    return apiClient.get<TDMTool>(`/tdm-tools/${id}`);
  },

  async create(tool: TDMToolCreate) {
    return apiClient.post<TDMTool>('/tdm-tools/', tool);
  },

  async update(id: number, tool: TDMToolUpdate) {
    return apiClient.put<TDMTool>(`/tdm-tools/${id}`, tool);
  },

  async delete(id: number) {
    return apiClient.delete<TDMTool>(`/tdm-tools/${id}`);
  },
};
