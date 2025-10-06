export interface Environment {
  Env_ID: number;
  Env_Name?: string;
  Env_Instance?: string;
  Env_App_Name?: string;
  Env_DB_Type?: string;
  DB_P1_Name?: string;
  DB_P2_Name?: string;
  DB_P3_Name?: string;
  DB_P4_Name?: string;
  DB_P5_Name?: string;
  DB_P6_Name?: string;
  DB_P7_Name?: string;
}

export interface EnvironmentCreate {
  Env_Name?: string;
  Env_Instance?: string;
  Env_App_Name?: string;
  Env_DB_Type?: string;
  DB_P1_Name?: string;
  DB_P2_Name?: string;
  DB_P3_Name?: string;
  DB_P4_Name?: string;
  DB_P5_Name?: string;
  DB_P6_Name?: string;
  DB_P7_Name?: string;
}
