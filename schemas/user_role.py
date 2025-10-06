from pydantic import BaseModel

class UserRoleBase(BaseModel):
    Role_Name: str

class UserRoleCreate(UserRoleBase):
    pass

class UserRole(UserRoleBase):
    Role_ID: int

    class Config:
        orm_mode = True
