from sqlalchemy import Column, Integer, String
from app.database import Base

class UserRole(Base):
    __tablename__ = "User_Role"
    Role_ID = Column(Integer, primary_key=True, index=True)
    Role_Name = Column(String(50), unique=True, nullable=False)