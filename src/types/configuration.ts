export interface UserRole {
  role_id: number;
  role_name: string;
  role_description?: string;
}

export interface UserRoleCreate {
  role_name: string;
  role_description?: string;
}

export interface FeatureName {
  feature_id: number;
  feature_name: string;
  feature_description?: string;
}

export interface FeatureNameCreate {
  feature_name: string;
  feature_description?: string;
}

export interface ProjectConfig {
  config_id: number;
  project_id?: number;
  config_key: string;
  config_value: string;
}

export interface ProjectConfigCreate {
  project_id?: number;
  config_key: string;
  config_value: string;
}

export interface UserAppMatrix {
  matrix_id: number;
  user_id?: number;
  app_name?: string;
  access_level?: string;
}

export interface UserAppMatrixCreate {
  user_id?: number;
  app_name?: string;
  access_level?: string;
}

export interface DBDefinition {
  db_id: number;
  db_name: string;
  db_type?: string;
  connection_string?: string;
}

export interface DBDefinitionCreate {
  db_name: string;
  db_type?: string;
  connection_string?: string;
}

export interface TDMToolServicesField {
  field_id: number;
  service_id?: number;
  field_name: string;
  field_value?: string;
  field_type?: string;
}

export interface TDMToolServicesFieldCreate {
  service_id?: number;
  field_name: string;
  field_value?: string;
  field_type?: string;
}
