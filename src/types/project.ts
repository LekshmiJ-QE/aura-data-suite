export interface Project {
  Project_ID: number;
  Project_Name: string;
  Created_By_Name?: string;
  Created_By_Role?: string;
  Created_By_User_ID?: number;
  Module_Name?: string;
  Scenario_Name?: string;
}

export interface ProjectCreate {
  Project_Name: string;
  Created_By_Name?: string;
  Created_By_Role?: string;
  Created_By_User_ID?: number;
  Module_Name?: string;
  Scenario_Name?: string;
}
