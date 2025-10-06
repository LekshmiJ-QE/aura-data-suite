from sqlalchemy import Column, Integer, String
from app.database import Base

class Environment(Base):
    __tablename__ = "Env_Details"
    Env_ID = Column(Integer, primary_key=True, index=True)
    Env_Name = Column(String)
    Env_Instance = Column(String)
    Env_App_Name = Column(String)
    Env_DB_Type = Column(String)
    DB_P1_Name = Column(String)
    DB_P2_Name = Column(String)
    DB_P3_Name = Column(String)
    DB_P4_Name = Column(String)
    DB_P5_Name = Column(String)
    DB_P6_Name = Column(String)
    DB_P7_Name = Column(String)
