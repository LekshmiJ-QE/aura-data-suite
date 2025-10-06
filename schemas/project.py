from pydantic import BaseModel
from typing import Optional

class ProjectBase(BaseModel):
    Project_Name: str
    Created_By_Name: Optional[str] = None
    Created_By_Role: Optional[str] = None
    Created_By_User_ID: Optional[int] = None
    Module_Name: Optional[str] = None
    Scenario_Name: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    Project_ID: int

    class Config:
        orm_mode = True