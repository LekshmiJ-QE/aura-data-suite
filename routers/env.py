from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.env import Environment, EnvironmentCreate
from app.crud.env import (
    create_environment, get_environment, get_environments,
    update_environment, delete_environment
)

router = APIRouter(prefix="/environments", tags=["Environments"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=Environment)
def create(env: EnvironmentCreate, db: Session = Depends(get_db)):
    return create_environment(db, env)

@router.get("/{env_id}", response_model=Environment)
def read(env_id: int, db: Session = Depends(get_db)):
    db_env = get_environment(db, env_id)
    if not db_env:
        raise HTTPException(status_code=404, detail="Environment not found")
    return db_env

@router.get("/", response_model=list[Environment])
def read_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_environments(db, skip, limit)

@router.put("/{env_id}", response_model=Environment)
def update(env_id: int, env: EnvironmentCreate, db: Session = Depends(get_db)):
    db_env = update_environment(db, env_id, env)
    if not db_env:
        raise HTTPException(status_code=404, detail="Environment not found")
    return db_env

@router.delete("/{env_id}", response_model=Environment)
def delete(env_id: int, db: Session = Depends(get_db)):
    db_env = delete_environment(db, env_id)
    if not db_env:
        raise HTTPException(status_code=404, detail="Environment not found")
    return db_env