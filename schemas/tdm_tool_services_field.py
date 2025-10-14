from pydantic import BaseModel

class TDMToolServicesFieldBase(BaseModel):
    tool_id: str
    tool_name: str
    service_field_1: str | None = None
    service_field_2: str | None = None
    service_field_3: str | None = None
    service_field_4: str | None = None
    service_field_5: str | None = None
    service_field_6: str | None = None
    service_field_7: str | None = None
    service_field_8: str | None = None
    service_field_9: str | None = None
    service_field_10: str | None = None

class TDMToolServicesFieldCreate(TDMToolServicesFieldBase):
    pass

class TDMToolServicesFieldUpdate(TDMToolServicesFieldBase):
    pass

class TDMToolServicesFieldResponse(TDMToolServicesFieldBase):
    model_config = {"from_attributes": True}  # Pydantic v2 replacement for orm_mode