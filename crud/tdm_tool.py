from sqlalchemy.orm import Session
from app.models.tdm_tool import TdmToolName
from app.schemas.tdm_tool import TDMToolCreate, TDMToolUpdate
from fastapi import HTTPException

def get_tools(db: Session, skip: int = 0, limit: int = 100):
    return db.query(TdmToolName).offset(skip).limit(limit).all()

def get_tool(db: Session, tool_id: int):
    return db.query(TdmToolName).filter(TdmToolName.tool_id == tool_id).first()

def create_tool(db: Session, tool: TDMToolCreate):
    existing_tool = db.query(TdmToolName).filter(TdmToolName.tool_name == tool.tool_name).first()
    if existing_tool:
        raise HTTPException(status_code=400, detail="Tool name already exists")
    existing_tool = db.query(TdmToolName).filter(TdmToolName.tool_id == tool.tool_id).first()
    if existing_tool:
        raise HTTPException(status_code=400, detail="Tool id already exists")
    db_tool = TdmToolName(**tool.dict())
    db.add(db_tool)
    db.commit()
    db.refresh(db_tool)
    return db_tool

def update_tool(db: Session, tool_id: int, tool: TDMToolUpdate):
    db_tool = db.query(TdmToolName).filter(TdmToolName.tool_id == tool_id).first()
    if not db_tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    for key, value in tool.dict(exclude_unset=True).items():
        setattr(db_tool, key, value)
    db.commit()
    db.refresh(db_tool)
    return db_tool

def delete_tool(db: Session, tool_id: int):
    db_tool = db.query(TdmToolName).filter(TdmToolName.tool_id == tool_id).first()
    if not db_tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    db.delete(db_tool)
    db.commit()
    return {"message": f"Tool with ID {tool_id} deleted successfully"}