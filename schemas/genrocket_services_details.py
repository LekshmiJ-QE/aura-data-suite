from pydantic import BaseModel

class GenRocketServicesDetailsBase(BaseModel):
    tool_id: str
    project_name: str
    domain_name: str
    scenario_name: str
    environment: str
    clientappid: str
    clientuserid: str
    scenario: str

class GenRocketServicesDetailsCreate(GenRocketServicesDetailsBase):
    pass

class GenRocketServicesDetailsUpdate(GenRocketServicesDetailsBase):
    pass

class GenRocketServicesDetailsResponse(GenRocketServicesDetailsBase):
    service_id: int
    model_config = {"from_attributes": True}  # Pydantic v2