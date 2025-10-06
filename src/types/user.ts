export interface User {
  User_ID: number;
  User_Name: string;
  User_Emp_ID?: string;
  User_Email_ID?: string;
  User_Role?: string;
}

export interface UserCreate {
  User_Name: string;
  User_Emp_ID?: string;
  User_Email_ID?: string;
  User_Role?: string;
  User_Password: string;
}
