from pydantic import BaseModel
from datetime import datetime, timedelta

class GenRocketServicesExecutionDetailsBase(BaseModel):
    tool_id: str
    tool_name: str
    service_id: int
    start_time: datetime
    end_time: datetime
    runtime: timedelta
    created_by: str

class GenRocketServicesExecutionDetailsCreate(GenRocketServicesExecutionDetailsBase):
    pass

class GenRocketServicesExecutionDetailsUpdate(GenRocketServicesExecutionDetailsBase):
    pass

class GenRocketServicesExecutionDetailsResponse(GenRocketServicesExecutionDetailsBase):
    job_id: int
    model_config = {"from_attributes": True}  # Pydantic v2