from sqlalchemy import Column, Integer, String
from app.database import Base

class Project(Base):
    __tablename__ = "project_table"
    project_id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, nullable=False)
    created_by_name = Column(String)
    created_by_role = Column(String)
    created_by_user_id = Column(Integer)
    module_name = Column(String)
    scenario_name = Column(String)