from pydantic import BaseModel
from typing import Optional

class EnvironmentBase(BaseModel):
    Env_Name: Optional[str] = None
    Env_Instance: Optional[str] = None
    Env_App_Name: Optional[str] = None
    Env_DB_Type: Optional[str] = None
    DB_P1_Name: Optional[str] = None
    DB_P2_Name: Optional[str] = None
    DB_P3_Name: Optional[str] = None
    DB_P4_Name: Optional[str] = None
    DB_P5_Name: Optional[str] = None
    DB_P6_Name: Optional[str] = None
    DB_P7_Name: Optional[str] = None

class EnvironmentCreate(EnvironmentBase):
    pass

class Environment(EnvironmentBase):
    Env_ID: int

    class Config:
        orm_mode = True