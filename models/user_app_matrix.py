from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class UserAppMatrix(Base):
    __tablename__ = "User_App_Matrix"
    Matrix_ID = Column(Integer, primary_key=True, index=True)
    User_ID = Column(Integer, ForeignKey("User_Table.User_ID"))
    User_Name = Column(String(100))
    User_Role = Column(String(50))
    Project_ID = Column(Integer, ForeignKey("Project_Table.Project_ID"))