from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.tdm_tool_services_field import TDMToolServicesFieldCreate, TDMToolServicesFieldUpdate, TDMToolServicesFieldResponse
from app.crud import tdm_tool_services_field as crud
from app.database import get_db

router = APIRouter(
    prefix="/tdm_tool_services_field",
    tags=["TDM Tool Services Field"]
)

@router.get("/", response_model=list[TDMToolServicesFieldResponse])
def read_tools(db: Session = Depends(get_db)):
    return crud.get_all_tools(db)

@router.get("/{tool_id}", response_model=TDMToolServicesFieldResponse)
def read_tool(tool_id: str, db: Session = Depends(get_db)):
    db_tool = crud.get_tool_by_id(db, tool_id)
    if not db_tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return db_tool

@router.post("/", response_model=TDMToolServicesFieldResponse)
def create_tool(tool: TDMToolServicesFieldCreate, db: Session = Depends(get_db)):
    return crud.create_tool(db, tool)

@router.put("/{tool_id}", response_model=TDMToolServicesFieldResponse)
def update_tool(tool_id: str, tool: TDMToolServicesFieldUpdate, db: Session = Depends(get_db)):
    updated_tool = crud.update_tool(db, tool_id, tool)
    if not updated_tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return updated_tool

@router.delete("/{tool_id}", response_model=TDMToolServicesFieldResponse)
def delete_tool(tool_id: str, db: Session = Depends(get_db)):
    deleted_tool = crud.delete_tool(db, tool_id)
    if not deleted_tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return deleted_tool