from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.models.user_app_matrix import UserAppMatrix
from fastapi import HTTPException

def create_user(db: Session, user: UserCreate):
    existing_password = db.query(User).filter(User.user_password == user.user_password).first()
    if existing_password:
        raise HTTPException(status_code=400, detail="Password already in use. Choose a different one.")

    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def update_user(db: Session, user_id: int, user: UserCreate):
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user:
        for key, value in user.dict().items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.user_id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

