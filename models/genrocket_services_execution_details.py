from sqlalchemy import Column, Integer, String, TIMESTAMP, Interval
from app.database import Base

class GenRocketServicesExecutionDetails(Base):
    __tablename__ = "genrocket_services_execution_details"

    job_id = Column(Integer, primary_key=True, index=True)
    tool_id = Column(String(10))
    tool_name = Column(String(100))
    service_id = Column(Integer)
    start_time = Column(TIMESTAMP)
    end_time = Column(TIMESTAMP)
    runtime = Column(Interval)
    created_by = Column(String(100))
    