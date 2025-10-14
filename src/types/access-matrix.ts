export interface AccessMatrix {
  id: number;
  role_name: string;
  sub_functionality_name: string;
  action_type: string;
  action_flag: boolean;
}

export interface AccessMatrixCreate {
  role_name: string;
  sub_functionality_name: string;
  action_type: string;
  action_flag: boolean;
}

export interface AccessMatrixUpdate {
  role_name?: string;
  sub_functionality_name?: string;
  action_type?: string;
  action_flag?: boolean;
}

export interface FeatureRoleAccessMatrix {
  matrix_id: number;
  feature_id?: number;
  role_id?: number;
  can_read: boolean;
  can_write: boolean;
  can_execute: boolean;
  can_delete: boolean;
}

export interface FeatureRoleAccessMatrixCreate {
  feature_id?: number;
  role_id?: number;
  can_read: boolean;
  can_write: boolean;
  can_execute: boolean;
  can_delete: boolean;
}
