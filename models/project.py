from sqlalchemy import Column, Integer, String
from app.database import Base

class Project(Base):
    __tablename__ = "Project_Table"
    Project_ID = Column(Integer, primary_key=True, index=True)
    Project_Name = Column(String, nullable=False)
    Created_By_Name = Column(String)
    Created_By_Role = Column(String)
    Created_By_User_ID = Column(Integer)
    Module_Name = Column(String)
    Scenario_Name = Column(String)