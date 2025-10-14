import { apiClient } from '@/lib/api-client';
import {
  AccessMatrix,
  AccessMatrixCreate,
  AccessMatrixUpdate,
  FeatureRoleAccessMatrix,
  FeatureRoleAccessMatrixCreate,
} from '@/types/access-matrix';

export const accessMatrixService = {
  async getAll() {
    return apiClient.get<AccessMatrix[]>('/access_matrix/');
  },

  async getById(id: number) {
    return apiClient.get<AccessMatrix>(`/access_matrix/${id}`);
  },

  async create(matrix: AccessMatrixCreate) {
    return apiClient.post<AccessMatrix>('/access_matrix/', matrix);
  },

  async update(id: number, matrix: AccessMatrixUpdate) {
    return apiClient.put<AccessMatrix>(`/access_matrix/${id}`, matrix);
  },

  async delete(id: number) {
    return apiClient.delete<AccessMatrix>(`/access_matrix/${id}`);
  },
};

export const featureRoleAccessMatrixService = {
  async getAll() {
    return apiClient.get<FeatureRoleAccessMatrix[]>('/feature_role_access_matrix/');
  },

  async getById(id: number) {
    return apiClient.get<FeatureRoleAccessMatrix>(`/feature_role_access_matrix/${id}`);
  },

  async create(matrix: FeatureRoleAccessMatrixCreate) {
    return apiClient.post<FeatureRoleAccessMatrix>('/feature_role_access_matrix/', matrix);
  },

  async update(id: number, matrix: FeatureRoleAccessMatrixCreate) {
    return apiClient.put<FeatureRoleAccessMatrix>(`/feature_role_access_matrix/${id}`, matrix);
  },

  async delete(id: number) {
    return apiClient.delete<FeatureRoleAccessMatrix>(`/feature_role_access_matrix/${id}`);
  },
};
