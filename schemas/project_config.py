from pydantic import BaseModel

class ProjectConfigBase(BaseModel):
    Config_Type: str

class ProjectConfigCreate(ProjectConfigBase):
    pass

class ProjectConfig(ProjectConfigBase):
    Config_ID: int

    class Config:
        orm_mode = True