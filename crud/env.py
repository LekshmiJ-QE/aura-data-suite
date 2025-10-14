from sqlalchemy.orm import Session
from app.models.env import Environment
from app.schemas.env import EnvironmentCreate

def create_environment(db: Session, env: EnvironmentCreate):
    db_env = Environment(**env.dict())
    db.add(db_env)
    db.commit()
    db.refresh(db_env)
    return db_env

def get_environment(db: Session, env_id: int):
    return db.query(Environment).filter(Environment.env_id == env_id).first()

def get_environments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Environment).offset(skip).limit(limit).all()

def update_environment(db: Session, env_id: int, env: EnvironmentCreate):
    db_env = db.query(Environment).filter(Environment.env_id == env_id).first()
    if db_env:
        for key, value in env.dict().items():
            setattr(db_env, key, value)
        db.commit()
        db.refresh(db_env)
    return db_env

def delete_environment(db: Session, env_id: int):
    db_env = db.query(Environment).filter(Environment.env_id == env_id).first()
    if db_env:
        db.delete(db_env)
        db.commit()
    return db_env