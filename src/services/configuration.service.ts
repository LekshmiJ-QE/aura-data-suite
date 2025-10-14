import { apiClient } from '@/lib/api-client';
import {
  UserRole,
  UserRoleCreate,
  FeatureName,
  FeatureNameCreate,
  ProjectConfig,
  ProjectConfigCreate,
  UserAppMatrix,
  UserAppMatrixCreate,
  DBDefinition,
  DBDefinitionCreate,
  TDMToolServicesField,
  TDMToolServicesFieldCreate,
} from '@/types/configuration';

export const userRoleService = {
  async getAll() {
    return apiClient.get<UserRole[]>('/user_roles/');
  },

  async getById(id: number) {
    return apiClient.get<UserRole>(`/user_roles/${id}`);
  },

  async create(role: UserRoleCreate) {
    return apiClient.post<UserRole>('/user_roles/', role);
  },

  async update(id: number, role: UserRoleCreate) {
    return apiClient.put<UserRole>(`/user_roles/${id}`, role);
  },

  async delete(id: number) {
    return apiClient.delete<UserRole>(`/user_roles/${id}`);
  },
};

export const featureNameService = {
  async getAll() {
    return apiClient.get<FeatureName[]>('/feature_names/');
  },

  async getById(id: number) {
    return apiClient.get<FeatureName>(`/feature_names/${id}`);
  },

  async create(feature: FeatureNameCreate) {
    return apiClient.post<FeatureName>('/feature_names/', feature);
  },

  async update(id: number, feature: FeatureNameCreate) {
    return apiClient.put<FeatureName>(`/feature_names/${id}`, feature);
  },

  async delete(id: number) {
    return apiClient.delete<FeatureName>(`/feature_names/${id}`);
  },
};

export const projectConfigService = {
  async getAll() {
    return apiClient.get<ProjectConfig[]>('/project_configs/');
  },

  async getById(id: number) {
    return apiClient.get<ProjectConfig>(`/project_configs/${id}`);
  },

  async create(config: ProjectConfigCreate) {
    return apiClient.post<ProjectConfig>('/project_configs/', config);
  },

  async update(id: number, config: ProjectConfigCreate) {
    return apiClient.put<ProjectConfig>(`/project_configs/${id}`, config);
  },

  async delete(id: number) {
    return apiClient.delete<ProjectConfig>(`/project_configs/${id}`);
  },
};

export const userAppMatrixService = {
  async getAll() {
    return apiClient.get<UserAppMatrix[]>('/user_app_matrix/');
  },

  async getById(id: number) {
    return apiClient.get<UserAppMatrix>(`/user_app_matrix/${id}`);
  },

  async create(matrix: UserAppMatrixCreate) {
    return apiClient.post<UserAppMatrix>('/user_app_matrix/', matrix);
  },

  async update(id: number, matrix: UserAppMatrixCreate) {
    return apiClient.put<UserAppMatrix>(`/user_app_matrix/${id}`, matrix);
  },

  async delete(id: number) {
    return apiClient.delete<UserAppMatrix>(`/user_app_matrix/${id}`);
  },
};

export const dbDefinitionService = {
  async getAll() {
    return apiClient.get<DBDefinition[]>('/db_definations/');
  },

  async getById(id: number) {
    return apiClient.get<DBDefinition>(`/db_definations/${id}`);
  },

  async create(definition: DBDefinitionCreate) {
    return apiClient.post<DBDefinition>('/db_definations/', definition);
  },

  async update(id: number, definition: DBDefinitionCreate) {
    return apiClient.put<DBDefinition>(`/db_definations/${id}`, definition);
  },

  async delete(id: number) {
    return apiClient.delete<DBDefinition>(`/db_definations/${id}`);
  },
};

export const tdmToolServicesFieldService = {
  async getAll() {
    return apiClient.get<TDMToolServicesField[]>('/tdm_tool_services_field/');
  },

  async getById(id: number) {
    return apiClient.get<TDMToolServicesField>(`/tdm_tool_services_field/${id}`);
  },

  async create(field: TDMToolServicesFieldCreate) {
    return apiClient.post<TDMToolServicesField>('/tdm_tool_services_field/', field);
  },

  async update(id: number, field: TDMToolServicesFieldCreate) {
    return apiClient.put<TDMToolServicesField>(`/tdm_tool_services_field/${id}`, field);
  },

  async delete(id: number) {
    return apiClient.delete<TDMToolServicesField>(`/tdm_tool_services_field/${id}`);
  },
};
