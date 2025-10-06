from pydantic import BaseModel

class FeatureRoleAccessMatrixBase(BaseModel):
    Feature_ID: int
    Feature_Name: str
    Role: str
    Action_Type: str
    Action_Flag: bool

class FeatureRoleAccessMatrixCreate(FeatureRoleAccessMatrixBase):
    pass

class FeatureRoleAccessMatrix(FeatureRoleAccessMatrixBase):
    Matrix_ID: int

    class Config:
        orm_mode = True