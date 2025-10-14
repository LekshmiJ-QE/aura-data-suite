from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "user_table"
    user_id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, nullable=False)
    user_emp_id = Column(String)
    user_email_id = Column(String)
    user_role = Column(String)
    user_password = Column(String)