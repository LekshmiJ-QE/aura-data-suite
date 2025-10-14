
from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    user_name: str
    user_emp_id: Optional[str] = None
    user_email_id: Optional[str] = None
    user_role: Optional[str] = None

class UserCreate(UserBase):
    user_password: str

class User(UserBase):
    user_id: int

    class Config:
        from_attributes = True
