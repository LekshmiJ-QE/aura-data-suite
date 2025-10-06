from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "User_Table"
    User_ID = Column(Integer, primary_key=True, index=True)
    User_Name = Column(String, nullable=False)
    User_Emp_ID = Column(String)
    User_Email_ID = Column(String)
    User_Role = Column(String)
    User_Password = Column(String)