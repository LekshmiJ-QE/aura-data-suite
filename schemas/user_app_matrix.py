from pydantic import BaseModel
from typing import Optional

class UserAppMatrixBase(BaseModel):
    User_ID: int
    User_Name: Optional[str] = None
    User_Role: Optional[str] = None
    Project_ID: int

class UserAppMatrixCreate(UserAppMatrixBase):
    pass

class UserAppMatrix(UserAppMatrixBase):
    Matrix_ID: int

    class Config:
        orm_mode = True