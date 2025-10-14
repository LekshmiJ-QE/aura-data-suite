export interface TDMTool {
  TDM_Tool_ID: number;
  Tool_Name: string;
  Tool_Description?: string;
  Created_Date?: string;
  Updated_Date?: string;
}

export interface TDMToolCreate {
  Tool_Name: string;
  Tool_Description?: string;
}

export interface TDMToolUpdate {
  Tool_Name?: string;
  Tool_Description?: string;
}
