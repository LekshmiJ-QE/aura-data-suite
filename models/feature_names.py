from sqlalchemy import Column, Integer, String
from app.database import Base

class FeatureNames(Base):
    __tablename__ = "Feature_Names"
    Feature_ID = Column(Integer, primary_key=True, index=True)
    Feature_Name = Column(String(100), unique=True, nullable=False)