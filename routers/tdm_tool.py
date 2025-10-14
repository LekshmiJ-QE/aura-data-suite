from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.tdm_tool import TDMToolCreate, TDMToolUpdate, TDMToolResponse
from app.crud import tdm_tool
from app.database import get_db

router = APIRouter(
    prefix="/tdm-tools",
    tags=["TDM Tools"]
)

# GET all
@router.get("/", response_model=List[TDMToolResponse])
def read_tools(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return tdm_tool.get_tools(db=db, skip=skip, limit=limit)

# GET one
@router.get("/{tool_id}", response_model=TDMToolResponse)
def read_tool(tool_id: str, db: Session = Depends(get_db)):
    db_tool = tdm_tool.get_tool(db, tool_id)
    if not db_tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    return db_tool

# POST
@router.post("/", response_model=TDMToolResponse)
def create_tool(tool: TDMToolCreate, db: Session = Depends(get_db)):
    return tdm_tool.create_tool(db=db, tool=tool)

# PUT
@router.put("/{tool_id}", response_model=TDMToolResponse)
def update_tool(tool_id: str, tool: TDMToolUpdate, db: Session = Depends(get_db)):
    return tdm_tool.update_tool(db=db, tool_id=tool_id, tool=tool)

# DELETE
@router.delete("/{tool_id}")
def delete_tool(tool_id: str, db: Session = Depends(get_db)):
    return tdm_tool.delete_tool(db=db, tool_id=tool_id)