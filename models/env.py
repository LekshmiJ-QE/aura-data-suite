from sqlalchemy import Column, Integer, String
from app.database import Base

class Environment(Base):
    __tablename__ = "env_details"
    env_id = Column(Integer, primary_key=True, index=True)
    env_name = Column(String)
    env_instance = Column(String)
    env_app_name = Column(String)
    env_db_type = Column(String)
    db_p1_name = Column(String)
    db_p2_name = Column(String)
    db_p3_name = Column(String)
    db_p4_name = Column(String)
    db_p5_name = Column(String)
    db_p6_name = Column(String)
    db_p7_name = Column(String)
