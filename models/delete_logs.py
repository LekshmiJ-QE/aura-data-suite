from sqlalchemy import Column, Integer, String, Date, Time
from app.database import Base

class DeleteLogs(Base):
    __tablename__ = "delete_logs"

    log_id = Column(Integer, primary_key=True, index=True)
    record_id = Column(Integer)
    deleted_by_user_id = Column(String(100))
    deleted_by_user_name = Column(String(100))
    deleted_date = Column(Date)
    deleted_time = Column(Time)