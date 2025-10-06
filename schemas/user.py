from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    User_Name: str
    User_Emp_ID: Optional[str] = None
    User_Email_ID: Optional[str] = None
    User_Role: Optional[str] = None

class UserCreate(UserBase):
    User_Password: str

class User(UserBase):
    User_ID: int

    class Config:
        orm_mode = True