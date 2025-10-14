from pydantic import BaseModel

class FeatureNamesBase(BaseModel):
    feature_name: str

class FeatureNamesCreate(FeatureNamesBase):
    pass

class FeatureNames(FeatureNamesBase):
    feature_id: int

    class Config:
        from_attributes = True
