from pydantic import BaseModel

class FeatureNamesBase(BaseModel):
    Feature_Name: str

class FeatureNamesCreate(FeatureNamesBase):
    pass

class FeatureNames(FeatureNamesBase):
    Feature_ID: int

    class Config:
        orm_mode = True