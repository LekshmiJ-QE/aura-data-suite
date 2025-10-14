from sqlalchemy.orm import Session
from app.models.tdm_tool_services_field import TDMToolServicesField
from app.schemas.tdm_tool_services_field import TDMToolServicesFieldCreate, TDMToolServicesFieldUpdate

def get_all_tools(db: Session):
    return db.query(TDMToolServicesField).all()

def get_tool_by_id(db: Session, tool_id: str):
    return db.query(TDMToolServicesField).filter(TDMToolServicesField.tool_id == tool_id).first()

def create_tool(db: Session, tool: TDMToolServicesFieldCreate):
    db_tool = TDMToolServicesField(**tool.model_dump())
    db.add(db_tool)
    db.commit()
    db.refresh(db_tool)
    return db_tool

def update_tool(db: Session, tool_id: str, tool: TDMToolServicesFieldUpdate):
    db_tool = db.query(TDMToolServicesField).filter(TDMToolServicesField.tool_id == tool_id).first()
    if db_tool:
        for key, value in tool.model_dump(exclude_unset=True).items():
            setattr(db_tool, key, value)
        db.commit()
        db.refresh(db_tool)
    return db_tool

def delete_tool(db: Session, tool_id: str):
    db_tool = db.query(TDMToolServicesField).filter(TDMToolServicesField.tool_id == tool_id).first()
    if db_tool:
        db.delete(db_tool)
        db.commit()
    return db_tool