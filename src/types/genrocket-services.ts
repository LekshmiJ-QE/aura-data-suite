export interface GenRocketService {
  id: number;
  service_name: string;
  project_id?: number;
  module_name?: string;
  scenario_name?: string;
  tool_id?: number;
  created_date?: string;
  updated_date?: string;
}

export interface GenRocketServiceCreate {
  service_name: string;
  project_id?: number;
  module_name?: string;
  scenario_name?: string;
  tool_id?: number;
}

export interface GenRocketServiceUpdate {
  service_name?: string;
  project_id?: number;
  module_name?: string;
  scenario_name?: string;
  tool_id?: number;
}

export interface GenRocketExecutionDetails {
  execution_id: number;
  service_id: number;
  execution_status: string;
  start_time?: string;
  end_time?: string;
  created_by?: string;
  runtime_duration?: number;
}

export interface GenRocketExecutionCreate {
  service_id: number;
  execution_status: string;
  start_time?: string;
  end_time?: string;
  created_by?: string;
}

export interface GenRocketExecutionUpdate {
  execution_status?: string;
  end_time?: string;
  runtime_duration?: number;
}
