from pydantic import BaseModel
from datetime import date, time

class DeleteLogsBase(BaseModel):
    record_id: int
    deleted_by_user_id: str
    deleted_by_user_name: str
    deleted_date: date
    deleted_time: time

class DeleteLogsCreate(DeleteLogsBase):
    pass

class DeleteLogsUpdate(DeleteLogsBase):
    pass

class DeleteLogsResponse(DeleteLogsBase):
    log_id: int
    model_config = {"from_attributes": True}  # Pydantic v2