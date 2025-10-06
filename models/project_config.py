from sqlalchemy import Column, Integer, String
from app.database import Base

class ProjectConfig(Base):
    __tablename__ = "Project_Config"
    Config_ID = Column(Integer, primary_key=True, index=True)
    Config_Type = Column(String(50), nullable=False)