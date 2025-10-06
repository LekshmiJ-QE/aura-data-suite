from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.database import Base

class FeatureRoleAccessMatrix(Base):
    __tablename__ = "Feature_Role_Access_Matrix"
    Matrix_ID = Column(Integer, primary_key=True, index=True)
    Feature_ID = Column(Integer, ForeignKey("Feature_Names.Feature_ID"))
    Feature_Name = Column(String(100))
    Role = Column(String(50))
    Action_Type = Column(String(50))
    Action_Flag = Column(Boolean)