from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.project_config import ProjectConfig, ProjectConfigCreate
from app.crud.project_config import (
    create_project_config, get_project_config, get_project_configs,
    update_project_config, delete_project_config
)

router = APIRouter(prefix="/project_configs", tags=["Project Configs"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProjectConfig)
def create(config: ProjectConfigCreate, db: Session = Depends(get_db)):
    return create_project_config(db, config)

@router.get("/{config_id}", response_model=ProjectConfig)
def read(config_id: int, db: Session = Depends(get_db)):
    db_config = get_project_config(db, config_id)
    if not db_config:
        raise HTTPException(status_code=404, detail="Config not found")
    return db_config

@router.get("/", response_model=list[ProjectConfig])
def read_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_project_configs(db, skip, limit)

@router.put("/{config_id}", response_model=ProjectConfig)
def update(config_id: int, config: ProjectConfigCreate, db: Session = Depends(get_db)):
    db_config = update_project_config(db, config_id, config)
    if not db_config:
        raise HTTPException(status_code=404, detail="Config not found")
    return db_config

@router.delete("/{config_id}", response_model=ProjectConfig)
def delete(config_id: int, db: Session = Depends(get_db)):
    db_config = delete_project_config(db, config_id)
    if not db_config:
        raise HTTPException(status_code=404, detail="Config not found")
