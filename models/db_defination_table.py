from sqlalchemy import Column, Integer, String
from app.database import Base

class DBDefinationTable(Base):
    __tablename__ = "DB_Defination_Table"
    DB_ID = Column(Integer, primary_key=True, index=True)
    DB_Name = Column(String(50), nullable=False)
    DB_P1_Name = Column(String(50))
    DB_P2_Name = Column(String(50))
    DB_P3_Name = Column(String(50))
    DB_P4_Name = Column(String(50))
    DB_P5_Name = Column(String(50))
    DB_P6_Name = Column(String(50))
    DB_P7_Name = Column(String(50))