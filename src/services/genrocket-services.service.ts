import { apiClient } from '@/lib/api-client';
import {
  GenRocketService,
  GenRocketServiceCreate,
  GenRocketServiceUpdate,
  GenRocketExecutionDetails,
  GenRocketExecutionCreate,
  GenRocketExecutionUpdate,
} from '@/types/genrocket-services';

export const genRocketServiceService = {
  async getAll() {
    return apiClient.get<GenRocketService[]>('/genrocket_services_details/');
  },

  async getById(id: number) {
    return apiClient.get<GenRocketService>(`/genrocket_services_details/${id}`);
  },

  async create(service: GenRocketServiceCreate) {
    return apiClient.post<GenRocketService>('/genrocket_services_details/', service);
  },

  async update(id: number, service: GenRocketServiceUpdate) {
    return apiClient.put<GenRocketService>(`/genrocket_services_details/${id}`, service);
  },

  async delete(id: number) {
    return apiClient.delete<GenRocketService>(`/genrocket_services_details/${id}`);
  },
};

export const genRocketExecutionService = {
  async getAll() {
    return apiClient.get<GenRocketExecutionDetails[]>('/genrocket_services_execution_details/');
  },

  async getById(id: number) {
    return apiClient.get<GenRocketExecutionDetails>(`/genrocket_services_execution_details/${id}`);
  },

  async create(execution: GenRocketExecutionCreate) {
    return apiClient.post<GenRocketExecutionDetails>('/genrocket_services_execution_details/', execution);
  },

  async update(id: number, execution: GenRocketExecutionUpdate) {
    return apiClient.put<GenRocketExecutionDetails>(`/genrocket_services_execution_details/${id}`, execution);
  },

  async delete(id: number) {
    return apiClient.delete<GenRocketExecutionDetails>(`/genrocket_services_execution_details/${id}`);
  },
};
