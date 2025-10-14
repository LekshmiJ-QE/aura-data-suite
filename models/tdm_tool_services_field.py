from sqlalchemy import Column, String
from app.database import Base  # import your Base

class TDMToolServicesField(Base):
    __tablename__ = "tdm_tool_services_field"

    tool_id = Column(String(10), primary_key=True, index=True)
    tool_name = Column(String(100))
    service_field_1 = Column(String(50))
    service_field_2 = Column(String(50))
    service_field_3 = Column(String(50))
    service_field_4 = Column(String(50))
    service_field_5 = Column(String(50))
    service_field_6 = Column(String(50))
    service_field_7 = Column(String(50))
    service_field_8 = Column(String(50))
    service_field_9 = Column(String(50))
    service_field_10 = Column(String(50))