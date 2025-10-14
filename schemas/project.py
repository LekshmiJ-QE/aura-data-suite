from pydantic import BaseModel
from typing import Optional

class ProjectBase(BaseModel):
    project_name: str
    created_by_name: Optional[str] = None
    created_by_role: Optional[str] = None
    created_by_user_id: Optional[int] = None
    module_name: Optional[str] = None
    scenario_name: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    project_id: int

    class Config:
        from_attributes = True
