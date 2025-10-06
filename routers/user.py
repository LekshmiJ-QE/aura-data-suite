from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.user import User, UserCreate
from app.crud.user import (
    create_user, get_user, get_users,
    update_user, delete_user
)

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=User)
def create(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.get("/{user_id}", response_model=User)
def read(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.get("/", response_model=list[User])
def read_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_users(db, skip, limit)

@router.put("/{user_id}", response_model=User)
def update(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = update_user(db, user_id, user)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@router.delete("/{user_id}", response_model=User)
def delete(user_id: int, db: Session = Depends(get_db)):
    db_user = delete_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user