from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.project import Project, ProjectCreate
from app.crud.project import (
    create_project, get_project, get_projects,
    update_project, delete_project
)

router = APIRouter(prefix="/projects", tags=["Projects"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Project)
def create(project: ProjectCreate, db: Session = Depends(get_db)):
    return create_project(db, project)

@router.get("/{project_id}", response_model=Project)
def read(project_id: int, db: Session = Depends(get_db)):
    db_project = get_project(db, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@router.get("/", response_model=list[Project])
def read_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_projects(db, skip, limit)

@router.put("/{project_id}", response_model=Project)
def update(project_id: int, project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = update_project(db, project_id, project)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@router.delete("/{project_id}", response_model=Project)
def delete(project_id: int, db: Session = Depends(get_db)):
    db_project = delete_project(db, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
